import React, {useContext, useState, useEffect} from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import HttpInterceptor from '../services/HttpInterceptor';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL_HIDRANT } from '../config';

export default function Map() {

    const { userInfo } = useContext(AuthContext);
    const [data, setData] = useState(null);
 

    useEffect(() => {
        HttpInterceptor(userInfo.accessToken);
        api.get(`${BASE_URL_HIDRANT}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    },[]);

    console.log("DATA DRUSTVO", data)


    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: 46.55472,
                    longitude: 15.64667,
                    latitudeDelta: 0.9922,
                    longitudeDelta: 0.0421,
                }}>

{data && data.map((x) => (
                <Marker
                    coordinate={{
                        latitude: x.lat,
                        longitude: x.lng
                    }}
                    title={x.title}
                    description={x.location}
                    image = { x.nadzemni == false?(require("../../assets/icons/hidrant64.png")):(require("../../assets/icons/podzemni64.png"))}
                        
                        
                />
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});