import React, { useContext, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import HttpInterceptor from '../services/HttpInterceptor';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import {BASE_URL_DRUSTVO} from '../config';
import axios from 'axios';

export default function CreateDrustvo () {
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
            <Text>Naziv:</Text>
            <TextInput
                value={naziv}
                onChangeText={text => setNaziv(text)}
            />
            <Text>Email:</Text>
            <TextInput
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Text>Naslov:</Text>
            <TextInput
                value={naslov}
                onChangeText={text => setNaslov(text)}
            />

            <TouchableOpacity onPress={handleSubmit}>
                <Text>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

