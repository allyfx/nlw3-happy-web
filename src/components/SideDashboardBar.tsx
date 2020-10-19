import React from 'react';
import { FiMapPin, FiAlertCircle, FiPower } from 'react-icons/fi';

import logoImg from '../images/map-marker.svg';

import '../styles/components/sidedashboardbar.css';

interface SideDashboardBarProps {
    selected: 'registered' | 'pending';
    alertCircle?: boolean;
}

export default function SideDashboardBar({ selected, alertCircle }: SideDashboardBarProps) {
    return (
        <div className="container">
            <img src={logoImg} alt="Happy"/>

            <div className="pages">
                <button
                    type="button"
                    className={
                        selected === 'registered'
                        ? 'registered-orphanages-page selected'
                        : 'registered-orphanages-page'
                }>
                    <FiMapPin size={24} />
                </button>

                <button
                    type="button"
                    className={
                        selected === 'pending'
                        ? 'pending-orphanages-page selected'
                        : 'pending-orphanages-page'
                    }
                >
                    <div
                        style={{ display: alertCircle ? 'block' : 'none' }}
                        className="alert-circle"
                    />
                    <FiAlertCircle size={24} />
                </button>
            </div>

            <button type="button" className="logout-button">
                <FiPower size={24} />
            </button>
        </div>
    );
}