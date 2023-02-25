import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import api from '../services/api';
import { BASE_URL_HIDRANT } from '../config';
import { ListItem } from '@rneui/themed';
import { List, MD3Colors } from 'react-native-paper';

export default function GetHidranti() {

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

    const handlePress = (index) => {
        setData(prevData => {
            const newData = [...prevData];
            newData[index].expanded = !newData[index].expanded;
            return newData;
        });
    };

    return (
       
        <List.Section>
            {data && data.map((x, index) => (
                <List.Accordion
                    key={index}
                    title={x.title}
                    left={props => <List.Icon {...props} icon={x.nadzemni?(require('../../assets/icons/hidrant32.png')):(require('../../assets/icons/podzemni32.png'))} />}
                    expanded={x.expanded}
                    onPress={() => handlePress(index)}>
                    <List.Item title={x.description} />
                </List.Accordion>
            ))}
        </List.Section>
                
    );
};