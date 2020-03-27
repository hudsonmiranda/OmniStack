import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {MdArrowBack} from 'react-icons/md';
import './styles.css';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory(); // serve para fazer navegação através de uma função JS quando não se pode user o Link do Router DOM
    
    async function handleSubmit(event){
        event.preventDefault();

        const data={
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try {
            const response = await api.post('ongs',data);
        
            alert(`Seu ID: ${response.data.id}`); // Acento grave (crase `) ao invés do apostrofo '     
            history.push('/');
        } catch (error) {
            alert('Erro no cadastro, tente novamente.');
        }
       
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude mais pessoas a encontrarem os casos de sua ONG.</p>
                    <Link className="link" to="/">
                        <MdArrowBack size={18} color="#BE193E" />
                        Já tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleSubmit}>
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={event=>setName(event.target.value)}
                    />
                    <input 
                        type="email" placeholder="E-mail"
                        value={email}
                        onChange={event=>setEmail(event.target.value)}
                    />
                    <input 
                        type="tel" placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={event=>setWhatsapp(event.target.value)}
                    />
                    
                    <div className="input-city">
                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={event=>setCity(event.target.value)}
                        />
                        <input 
                            placeholder="UF" style={{width:80}} 
                            value={uf}
                            onChange={event=>setUf(event.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}