import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { Marker, Callout } from 'react-native-maps';

export default function Map() {
    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: 46.55472,
                    longitude: 15.64667,
                    latitudeDelta: 0.9922,
                    longitudeDelta: 0.0421,
                }}>


                <Marker
                    coordinate={{
                        latitude: 46.55472,
                        longitude: 15.64667
                    }}
                />
                   
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