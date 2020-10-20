import React, { useState } from 'react';

import { FiMapPin, FiAlertCircle, FiPower } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import logoImg from '../../../images/map-marker.svg';

import RegisteredOrphanages from './RegisteredOrphanages';
import PendingOrphanages from './PendingOrphanages';

import '../../../styles/pages/admin/dashboard/dashboard.css';

export default function Dashboard() {
    const history = useHistory();
    const [selected, setSelected] = useState<'registered' | 'pending'>('registered');
    const [alertCircle, setAlertCircle] = useState(false);

    function handleLogoutButton() {
        localStorage.clear();
        sessionStorage.clear();

        history.push('/');
    }

    return (
        <div className="dashboard-container">
            <div className="container">
                <img src={logoImg} alt="Happy"/>

                <div className="pages">
                    <button
                        type="button"
                        className={
                            selected === 'registered'
                            ? 'registered-orphanages-page selected'
                            : 'registered-orphanages-page'
                        }
                        onClick={() => { setSelected('registered') }}
                    >
                        <FiMapPin size={24} />
                    </button>

                    <button
                        type="button"
                        className={
                            selected === 'pending'
                            ? 'pending-orphanages-page selected'
                            : 'pending-orphanages-page'
                        }
                        onClick={() => { setSelected('pending') }}
                    >
                        <div
                            style={{ display: alertCircle ? 'block' : 'none' }}
                            className="alert-circle"
                        />
                        <FiAlertCircle size={24} />
                    </button>
                </div>

                <button onClick={handleLogoutButton} type="button" className="logout-button">
                    <FiPower size={24} />
                </button>
            </div>
            
            {selected === 'registered' ? <RegisteredOrphanages /> : <PendingOrphanages />}
        </div>
    );
};