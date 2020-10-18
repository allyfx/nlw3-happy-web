import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import SideContainer from '../../components/SideContainer';

import '../../styles/pages/admin/forgot-password.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    async function handleSubmitLogin(event: FormEvent) {
        
    }

    return (
        <div className="content">
            <SideContainer />

            <aside className="form-container">
                <Link to="/" className="goback-button">
                    <FiArrowLeft size={24} color="#15C3D6" />
                </Link>

                <form onSubmit={handleSubmitLogin} className="forgot-password-form">
                    <div>
                        <legend>Esqueci a senha</legend>
                        <p>Sua redefinição de senha será enviada para o e-mail cadastrado.</p>

                        <div className="input-container">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        className="confirm-button"
                        type="submit"
                        style={{
                            opacity: email !== '' ? 1 : 0.5,
                            cursor: email !== '' ? 'pointer' : 'default'
                        }}
                    >
                        Enviar
                    </button>
                </form>
            </aside>
        </div>
    );
}

export default ForgotPassword;