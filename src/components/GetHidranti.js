import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

import HttpInterceptor from '../services/HttpInterceptor';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL_HIDRANT } from '../config';
import { ListItem } from "@react-native-material/core";

export default function GetHidranti() {

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
    }, []);

    console.log("DATA HIDRANTI", data)

    return (
        <>
            {data && data.map((x) => (
                <ListItem
                    title={x.location}
                    secondaryText={x.description}
                />
            ))}
        </>
    );
};

