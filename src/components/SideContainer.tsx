import React from 'react';
import logo from '../images/logo-column.svg';

import '../styles/components/sidecontainer.css';

function SideContainer() {
    return (
        <div className="informations">
            <img src={logo} alt="Happy"/>

            <div className="location">
                <strong>Guidoval</strong>
                <span>Minas Gerais</span>
            </div>
        </div>
    );
}

export default SideContainer;