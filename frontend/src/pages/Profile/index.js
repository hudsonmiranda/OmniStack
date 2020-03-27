import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {MdPowerSettingsNew,MdDelete} from 'react-icons/md';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Profile(){
    const [incident, setIncident] = useState([]);
    const history = useHistory();

    const ongID = localStorage.getItem('ongID'); //o "ongId" do getItem corresponde ao campo no Storage do Browser, carregado pela page Login 
    const ongName = localStorage.getItem('ongName'); //o "ongName" do getItem corresponde ao campo no Storage do Browser, carregado pela page Login 

    

    useEffect(() => {           //serve para disparar função em algum determinado momento do componente, no caso, assim que ele for mostrado em tela
        api.get('profile', {    // "profile" é a rota de Perfil da Ong do back-end, conforme pode ser verificado no Insomnia
            headers:{
                //Authorization: 'e0c78914cce9',
                Authorization: ongID,
            }
        }).then(response=>{
            setIncident(response.data);
        })
    }, [ongID]);                //1º parametro= qual função a ser execudata, 2ª quando a função vai ser executada
               
    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {headers:{Authorization: ongID,}
            });
            setIncident(incident.filter(inc => inc.id !== id));
        } catch (error) {
            alert('Erro ao deletar caso.');
        }

    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-content">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vindo, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                
                <button onClick={handleLogout} type="button">
                    <MdPowerSettingsNew size={22} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            
            <ul>
                {incident.map(caso=>(
                    <li key={caso.id} >
                        <strong>CASO:</strong>
                        <p>{caso.title}</p>

                        <strong>DESCRIÇÂO:</strong>
                        <p>{caso.description}</p>
                        
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(caso.value)}</p>
                        
                        <button onClick={()=>handleDeleteIncident(caso.id)} type="button">
                            <MdDelete size={20} color="#999999" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}