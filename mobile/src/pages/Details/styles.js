import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:24,
        paddingTop:Constants.statusBarHeight + 20,
    },

    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },

    incident:{
        padding:24,
        borderRadius:8,
        backgroundColor:'#FFF',
        marginBottom:16,
        marginTop:40,
    },

    incidentProperty:{
        fontSize:14,
        color:'#41414d',
        fontWeight:'bold',
    },

    incidentValue:{
        marginTop:8,
        marginBottom:8,
        fontSize:15,
        color:'#737380',
    },

    contactBox:{
        padding:24,
        borderRadius:8,
        backgroundColor:'#FFF',
        marginBottom:16,
    },

    title:{
        fontWeight:'bold',
        fontSize:20,
        color:'#13131A',
        lineHeight:30
    },

    description:{
        fontSize:15,
        marginTop:16,
        color:'#737380',
    },

    actions:{
        marginTop:16,
        flexDirection:'row',
        justifyContent:'space-between',
    },

    actionsButton:{
        backgroundColor:'#E02041',
        borderRadius: 8,
        height:40,
        width: '48%',
        justifyContent:'center',
        alignItems:'center'
    },

    actionsText:{
        color:'#FFF',
        fontSize:16,
        fontWeight:'bold'
    },

});