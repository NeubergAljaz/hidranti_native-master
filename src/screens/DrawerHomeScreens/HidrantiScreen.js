import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import api from '../../services/api';
import { BASE_URL_HIDRANT } from '../../config';
import { Button, List, MD3Colors, Surface } from 'react-native-paper';
import { View } from 'react-native';
import { Image } from 'react-native-elements';
// redux hooks
import { useSelector } from 'react-redux';

export default function HidrantiScreen({navigation}) {
    const theme = useSelector(state => state.theme);

    const [data, setData] = useState(null);

    useEffect(() => {

        api.get(`${BASE_URL_HIDRANT}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    console.log("DATA HIDRANTI", data)

const a ="aaaa"

    return (
        <ScrollView style={theme.style.container}>
            <List.Section style={theme.style.container}>
                {data && data.map((x, index) => (

                    <List.Item
                    onPress={() => {navigation.navigate('Hidrant', {hidrant: x}); console.log(x)}}
                        style={{
                            borderColor: 'rgb(119,136,153)', marginBottom: 5, marginLeft: 10, marginRight: 10,
                            borderWidth: 1, borderRadius: 10
                        }}
                        key={index}
                        title={x.title}
                        left={() => (
                            <View
                                style={{
                                    borderRadius: 50,
                                    borderWidth: 2,
                                    backgroundColor: x.status == "IZPRAVEN" ? ('rgba(152,251,152, 0.2)') : x.status == "NEIZPRAVEN" ? ('rgba(255, 0, 0, 0.2)') : ("rgba(255, 255, 0, 0.2)"),
                                    padding: 4,
                                    borderWidth: 1,
                                    marginBottom: 2,
                                    marginLeft: 10

                                }}
                            >
                                <Image
                                    source={x.nadzemni ? require('../../../assets/icons/hidrant32.png') : require('../../../assets/icons/podzemni32.png')}
                                    style={{ width: 32, height: 32 }}
                                />
                            </View>
                        )}
                    />

                ))}
            </List.Section>
        </ScrollView>
    );
};