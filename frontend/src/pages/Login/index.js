import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import {MdInput} from 'react-icons/md';

import './styles.css';

import api from '../../services/api';
import heroImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Login(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(event){
        event.preventDefault();

        try {
            const response = await api.post('session', {id}); // "session" é a rota de login do back-end, conforme pode ser verificado no Insomnia
            localStorage.setItem('ongID', id); //Salvar o ID no Storage do Browser
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');
        } catch (error) {
            alert('Falha no Login.');
        }
    }

    return (
        <div className="login-container">
            <img src={heroImg} alt="Heroes"/>
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />
                
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Login</h1>
                    <input 
                        placeholder="Seu ID"
                        value={id}
                        onChange={event => setId(event.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    
                    <Link className="link" to="/register">
                        <MdInput size={18} color="#BE193E" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
        </div>
    );
}