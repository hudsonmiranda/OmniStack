import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {MdArrowBack} from 'react-icons/md'

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongID = localStorage.getItem('ongID');
    const history = useHistory();

    async function handleNewIncident(event){
        event.preventDefault();

        const dados ={
            title,
            description,
            value,
        }

        try {
            await api.post('incidents', dados, {
                headers:{
                    Authorization: ongID,
                }
            })
            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastar novo caso.')
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    
                    <h1>Cadastrar novo casos</h1>
                    <p>Descreva o caso detalhadamente para encontrar um heroi.</p>

                    <Link className="link" to="/profile">
                        <MdArrowBack size={18} color="#BE193E" />
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleNewIncident} >
                    <input 
                        placeholder="Titulo do Caso"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                    <input 
                        placeholder="Valor em reias"
                        value={value}
                        onChange={event => setValue(event.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}