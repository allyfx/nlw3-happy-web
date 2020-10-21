import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { useHistory, useParams } from 'react-router-dom';

import { FiCheck, FiXCircle } from "react-icons/fi";

import Sidebar from '../../../components/Sidebar';
import mapIcon from '../../../utils/mapIcon';
import api from '../../../services/api';

import '../../../styles/pages/admin/dashboard/edit-orphanage.css';

interface OrphanageParams {
  id: string;
}

interface Orphanage {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    url: string;
  }>
}

export default function EditOrphanage() {
  const history = useHistory();
  const params = useParams<OrphanageParams>();

  const [position, setPosition] = useState({latitude: 0, longitude: 0});
  const [orphanage, setOrphanage] = useState<Orphanage>();

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpening_hours] = useState('');
  const [open_on_weekends, setOpen_on_weekends] = useState(true);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
      api.get(`/orphanages/${params.id}`).then(response => {
          const orph = response.data as Orphanage;
          
          setOrphanage(orph);
          setPosition({ latitude: orph.latitude, longitude: orph.longitude });
          setName(orph.name);
          setAbout(orph.about);
          setInstructions(orph.instructions);
          setOpening_hours(orph.opening_hours);
          setOpen_on_weekends(orph.open_on_weekends);

          const images = orph.images.map(image => image.url);
          
          setPreviewImages(images);
      });
  }, [params.id]);

  if (!orphanage) {
    return <p>Carregando...</p>
  }

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }
  
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = {
      id: params.id,
      name: name && name,
      about: about && about,
      latitude: longitude && longitude,
      longitude: latitude && latitude,
      instructions: instructions && instructions,
      opening_hours: opening_hours && opening_hours,
      open_on_weekends: open_on_weekends && open_on_weekends
    };

    await api.put(`/orphanages/update`, data);
    await api.post(`/admin/pending/${params.id}`);

    history.push('/dashboard');
  }

  async function handleRefuseButton() {
    await api.delete(`/orphanages/${params.id}`);

    history.push('/dashboard');
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      
      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <div className="map-container">
              <Map 
                center={[orphanage.latitude, orphanage.longitude]} 
                style={{ width: '100%', height: 280 }}
                zoom={15}
                onClick={handleMapClick}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                <Marker
                    interactive={false}
                    icon={mapIcon}
                    position={[position.latitude, position.longitude]}
                />
              </Map>

              <p>Clique no mapa para alterar a localização</p>
            </div>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image">

              </div>

              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={orphanage.name} />
                  );
                })}

                {/* <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label> */}
              </div>

              <input multiple onChange={handleSelectImages} type="file" id="image[]" />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={event => setOpening_hours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => {setOpen_on_weekends(true)}}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => {setOpen_on_weekends(false)}}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <div className="buttons">
            <button onClick={handleRefuseButton} className="refuse-button" type="button">
              <FiXCircle size={24} color="#FFF" /> Recusar
            </button>

            <button className="confirm-button" type="submit">
              <FiCheck size={24} color="#FFF" /> Aceitar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
