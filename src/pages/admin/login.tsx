import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import api from '../../services/api';

import '../../styles/pages/admin/login.css';
import logo from '../../images/logo-column.svg';

function Login() {
    const [rememberCheck, setRememberCheck] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmitLogin(event: FormEvent) {
        event.preventDefault();

        const response = await api.post('/user/authenticate', { email, password });

        const { user, token } = response.data;

        if (rememberCheck) {
            localStorage.setItem('@Happy:token', token);
        }

        console.log(response.data);
    }

    function handleSelectButtomCheck() {
        setRememberCheck(!rememberCheck);
    }

    return (
        <div className="content">
            <div className="informations">
                <img src={logo} alt="Happy"/>

                <div className="location">
                    <strong>Guidoval</strong>
                    <span>Minas Gerais</span>
                </div>
            </div>

            <aside className="form-container">
                <Link to="/" className="goback-button">
                    <FiArrowLeft size={24} color="#15C3D6" />
                </Link>

                <form onSubmit={handleSubmitLogin} className="login-form">
                    <div>
                        <legend>Fazer login</legend>

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

                        <div className="input-container">
                            <label htmlFor="password">Senha</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                required
                            />
                        </div>

                        <div className="form-footer">
                            <div className="remember-check">
                                <button
                                    type="button"
                                    name="remember"
                                    style={{
                                        backgroundColor: rememberCheck ? '#37C77F' : '#F5F8FA',
                                    }}
                                    onClick={handleSelectButtomCheck}
                                >
                                    <FiCheck
                                        className="checkIcon"
                                        size={16}
                                        color="#FFF"
                                        style={{
                                            display: rememberCheck ? 'block' : 'none',
                                        }}
                                    />
                                </button>
                                <span>Lembrar-me</span>
                            </div>
                            
                            <Link to="">Esqueci minha senha</Link>
                        </div>
                    </div>

                    <button
                        className="confirm-button"
                        type="submit"
                        style={{
                            opacity: email !== '' && password !== '' ? 1 : 0.5,
                            cursor: email !== '' && password !== '' ? 'pointer' : 'default'
                        }}
                    >
                        Entrar
                    </button>
                </form>
            </aside>
        </div>
    );
}

export default Login;