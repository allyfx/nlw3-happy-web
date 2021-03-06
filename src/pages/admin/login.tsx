import React, { useState, FormEvent, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import api from '../../services/api';

import SideContainer from '../../components/SideContainer';

import '../../styles/pages/admin/login.css';

interface Request {
    user: {
        id: number;
        name: string;
        email: string;
    },
    token: string;
}

function Login() {
    const history = useHistory();
    const [rememberCheck, setRememberCheck] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (localStorage.getItem('@Happy:user')) {
            return history.push('/dashboard');
        }
    }, [history]);

    async function logIn() {
        const response = await api.post('/user/authenticate', { email, password });

        const { user, token } = response.data as Request;

        if (rememberCheck) {
            localStorage.setItem('@Happy:token', token);
            localStorage.setItem('@Happy:user', JSON.stringify(user));
        }

        sessionStorage.setItem('@Happy:token', token);
        sessionStorage.setItem('@Happy:user', JSON.stringify(user));
    }

    async function handleSubmitLogin(event: FormEvent) {
        event.preventDefault();

        await logIn();

        history.push('/dashboard');
    }

    function handleSelectButtomCheck() {
        setRememberCheck(!rememberCheck);
    }

    return (
        <div className="content">
            <SideContainer />

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
                            
                            <Link to="/forgot-password">Esqueci minha senha</Link>
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