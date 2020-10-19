import React, { useState, FormEvent } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import SideContainer from '../../components/SideContainer';

import '../../styles/pages/admin/reset-password.css';

function ResetPassword() {
    const history = useHistory();
    const location = useLocation();

    const [newPassword, setNewPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [differentPassword, setDifferentPassword] = useState(false);

    async function handleSubmitResetPassword(event: FormEvent) {
        event.preventDefault();

        const token = location.search.replace('?token=', '');

        if(!token) {
            alert('Ocorreu um erro, tente novamente mais tarde.');
        }

        if(newPassword !== passwordConfirm) {
            setDifferentPassword(true);
            return;
        }

        setDifferentPassword(false);

        await api.post('/user/reset', { token, password: newPassword });

        history.push('/');
    }

    return (
        <div className="content">
            <SideContainer />

            <aside className="form-container">
                <Link to="/" className="goback-button">
                    <FiArrowLeft size={24} color="#15C3D6" />
                </Link>

                <form onSubmit={handleSubmitResetPassword} className="reset-password-form">
                    <div>
                        <legend>Redefinição de senha</legend>
                        <p>Escolha uma nova senha para você acessar o dashboard do Happy</p>

                        <div className="input-container">
                            <label htmlFor="email">Nova senha</label>
                            <input
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                value={newPassword}
                                onChange={event => setNewPassword(event.target.value)}
                                required
                            />

                            <label htmlFor="email">Repetir senha</label>
                            <input
                                type="password"
                                name="passwordConfirm"
                                id="passwordConfirm"
                                value={passwordConfirm}
                                onChange={event => setPasswordConfirm(event.target.value)}
                                required
                            />

                            <span
                                style={{
                                    display: differentPassword ? 'inline' : 'none'
                                }}
                            >
                                Senhas diferentes
                            </span>
                        </div>
                    </div>

                    <button
                        className="confirm-button"
                        type="submit"
                        style={{
                            opacity: newPassword !== '' && passwordConfirm !== '' ? 1 : 0.5,
                            cursor: newPassword !== '' && passwordConfirm !== '' ? 'pointer' : 'default'
                        }}
                    >
                        Enviar
                    </button>
                </form>
            </aside>
        </div>
    );
}

export default ResetPassword;