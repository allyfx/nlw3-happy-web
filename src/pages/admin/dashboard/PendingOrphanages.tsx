import React, { useEffect, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiEdit, FiTrash } from 'react-icons/fi';
import api from '../../../services/api';

import '../../../styles/pages/admin/dashboard/pending-orphanages.css';

import mapIcon from '../../../utils/mapIcon';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

export default function PendingOrphanages() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>();

    useEffect(() => {
        api.get('/orphanages').then(response => setOrphanages(response.data));
    }, []);

    return (
        <div className="page-container">
            <header>
                <h1>Orfanatos cadastrados</h1>
                <small>{orphanages?.length} orfanatos</small>
            </header>

            <div className="line"></div>

            <div className="orphanages-list">
                
                {orphanages?.map(orphanage => {
                    return (
                        <div key={orphanage.id} className="orphanage">
                            <Map 
                            center={[orphanage.latitude,orphanage.longitude]} 
                            style={{ width: '100%', height: 280 }}
                            zoom={16}
                            >
                            <TileLayer 
                                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                            />
                                <Marker
                                interactive={false}
                                icon={mapIcon}
                                position={[orphanage.latitude, orphanage.longitude]}
                                />
                            </Map>

                            <div className="orphanage-content">
                                <h2>{orphanage.name}</h2>

                                <div className="buttons">
                                    <div className="edit-button">
                                        <FiEdit size={24} color="#15C3D6" />
                                    </div>

                                    <div className="trash-button">
                                        <FiTrash size={24} color="#15C3D6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    );
};