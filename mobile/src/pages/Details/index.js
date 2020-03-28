import React from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';
import logoImg from '../../assets/logo.png';
import {MaterialIcons} from '@expo/vector-icons';

export default function Details(){
    const nav=useNavigation();
    const route=useRoute();
    const incident = route.params.incident;
    const message = `Olá ${incident.name}, gostaria de ajudar no caso "${incident.title}", no valor de ${Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL'}).format(incident.value)}.`;

    function navigateBack(){
        nav.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            recipients: [incident.email], //(array) -- An array of e-mail addressess of the recipients.
            subject: `Heroi da causa: ${incident.title}`, //(string) -- Subject of the mail.
            body: message, //(string) -- Body of the mail.
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return(
        <View style={styles.container}>
            {/* Heder */}
            <View style={styles.header}>
                <Image source={logoImg} />
                
                <TouchableOpacity onPress={navigateBack}>
                    <MaterialIcons name="arrow-back" size={28} color="#E02041" />
                </TouchableOpacity>
            </View>
            {/* Details */}
            <View style={styles.incident}>
                <Text style={[styles.incidentProperty,{marginBottom:0}]}>ONG</Text>
                <Text style={styles.incidentValue}>{incident.name} - {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>Caso</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>Valor</Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat(
                        'pt-BR', 
                        {style:'currency', currency:'BRL'}
                    ).format(incident.value)
                    }
                </Text>
            </View>
            {/* Contact */}
            <View style={styles.contactBox}>
                <Text style={styles.title}>Salve o dia!</Text>
                <Text style={styles.title}>Seja o herói desse caso.</Text>

                <Text style={styles.description}>Entre em contato:</Text>
                
                {/* Buttons */}
                <View style={styles.actions}>
                    <TouchableOpacity 
                        style={styles.actionsButton} 
                        onPress={sendWhatsapp}
                    >
                        <Text style={styles.actionsText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.actionsButton} 
                        onPress={sendMail}
                    >
                        <Text style={styles.actionsText}>E-mail</Text>
                    </TouchableOpacity>
                </View>


            </View>

        </View>
    );
}