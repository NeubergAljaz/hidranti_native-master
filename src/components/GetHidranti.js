import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import { lightTheme, darkTheme } from '../styles/ThemesStyle';
import ThemeContext from '../context/ThemeContext';
import HttpInterceptor from '../services/HttpInterceptor';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL_HIDRANT } from '../config';
import { ListItem } from '@rneui/themed';
export default function GetHidranti() {

    const { userInfo } = useContext(AuthContext);
    const [data, setData] = useState(null);

    const { isDarkModeEnabled} = useContext(ThemeContext);

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

    const listItemStyle = isDarkModeEnabled ? darkListItemStyle : {};

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

const darkListItemStyle = {
    backgroundColor: darkTheme.container,
    color: darkTheme.text,
  };

