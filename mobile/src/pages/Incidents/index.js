import React, {useState,useEffect} from 'react';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import api from "../../services/api";

import {MaterialIcons} from '@expo/vector-icons';
import styles from './styles';
import logoImg from '../../assets/logo.png';

export default function Incidents(){
    const nav = useNavigation();
    const [total,setTotal] = useState(0);
    const [incidents, setIncidents] = useState([]);
    const [page,setPages] = useState(1);
    const [loading  ,setLoading] = useState(false);

    function navigatoToDetail(incident){
        nav.navigate('Details',{incident});
    }

    async function loadIncidents(){
        if(loading){ // se load true, retorna para evitar a chamada de outra requisição enquanto se excetua uma
            return;
        }

        if(total>0 && incidents.length === total){ //para que não ocorra requisição, quando já houver carregado todas
            return;
        }

        setLoading(true); // antes da requisição
        const resp = await api.get('incidents',{params:{page}}); //pagina do back-end como vista no Insomnia
        

        setIncidents([...incidents,...resp.data]); // [...array1,...array2] - anexa dois vetores em um vetor
        setTotal(resp.headers['x-total-count']);

        setPages(page+1);
        setLoading(false); // depois da requisição
    }

    useEffect(()=>{
        loadIncidents();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                {/* Header */}
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.textBold}>casos: {total}</Text>.
                </Text>
            </View>

                {/* Title */}
                <Text style={styles.title}>Bem vindo!</Text>
                <Text style={styles.descriptions}>Escolha um dos casos, e salve o dia.</Text>

                {/* List */}
            <FlatList 
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incidents => String(incidents.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents} //dispara uma função automaticamente quando chega ao final da lista
                onEndReachedThreshold={0.2} //corresponde a quantos % é preciso estar do final da lista, para que se carrege os novos itns, no caso 0.2 = 20%
                renderItem={({item:incidents})=>(
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG</Text>
                    <Text style={styles.incidentValue}>{incidents.name}</Text>

                    <Text style={styles.incidentProperty}>Caso</Text>
                    <Text style={styles.incidentValue}>{incidents.title}</Text>

                    <Text style={styles.incidentProperty}>Valor</Text>
                    <Text style={styles.incidentValue}>
                        {Intl.NumberFormat(
                            'pt-BR', 
                            {style:'currency', currency:'BRL'}
                        ).format(incidents.value)
                        }
                    </Text>

                    <TouchableOpacity 
                        style={styles.detailsButton} 
                        onPress={()=>navigatoToDetail(incidents)}
                    >
                        <Text style={styles.detailsButtonText}>Ver mais detalhes.</Text>

                        <MaterialIcons name="arrow-forward" size={16} color="#E02041" />
                    </TouchableOpacity>
                </View>
                )}
            />
        </View>
    );
}