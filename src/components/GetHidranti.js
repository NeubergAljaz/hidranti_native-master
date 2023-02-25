import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL_HIDRANT } from '../config';
import { ListItem } from '@rneui/themed';
export default function GetHidranti() {

    const { userInfo } = useContext(AuthContext);
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

    return (
        <>
            
        {data && data.map((x) => (

        <ListItem style={listItemStyle}>
        <ListItem.Content>
            <ListItem.Title>{x.title}</ListItem.Title>
            <ListItem.Subtitle>{x.description}</ListItem.Subtitle>
        </ListItem.Content>
        </ListItem>

        ))}
                </>
    );
};


