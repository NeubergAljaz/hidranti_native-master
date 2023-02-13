import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import HttpInterceptor from '../services/HttpInterceptor';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL_DRUSTVO } from '../config';
import { Stack, TextInput, IconButton, Button } from "@react-native-material/core";

export default function CreateDrustvo() {
    const { userInfo } = useContext(AuthContext);

    const [naziv, setNaziv] = useState('');
    const [email, setEmail] = useState('');
    const [naslov, setNaslov] = useState('');

    const handleSubmit = () => {
        HttpInterceptor(userInfo.accessToken);
        const data = {
            naziv,
            email,
            naslov
        }


        api.post(`${BASE_URL_DRUSTVO}`, data)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <View>

            <TextInput label="Naziv" value={naziv}
                onChangeText={text => setNaziv(text)} sx={{ color: "blue" }} />

            <TextInput label="Email" value={email}
                onChangeText={text => setEmail(text)} />

            <TextInput label="Naslov" value={naslov}
                onChangeText={text => setNaslov(text)} />

            <Button onPress={handleSubmit} variant="outlined" title="Poslji" />

        </View>
    );
};

