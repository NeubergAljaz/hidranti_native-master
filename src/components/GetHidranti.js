import React, { useState, useEffect } from 'react';
import {ScrollView } from 'react-native';
import api from '../services/api';
import { BASE_URL_HIDRANT } from '../config';
import { List } from 'react-native-paper';
// redux hooks
import { useSelector} from 'react-redux'; 

export default function GetHidranti() {
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

    const handlePress = (index) => {
        setData(prevData => {
            const newData = [...prevData];
            newData[index].expanded = !newData[index].expanded;
            return newData;
        });
    };

    return (
        <ScrollView style={theme.style.container}>
        <List.Section style={theme.style.container}>
            {data && data.map((x, index) => (
                <List.Accordion
                    style={[theme.style.listAccordion, {borderColor: x.status == "IZPRAVEN" ? ('rgba(152,251,152, 0.2)') :  x.status == "NEIZPRAVEN" ?('rgba(255, 0, 0, 0.2)'):("rgba(255, 255, 0, 0.2)")} ]} 
                    key={index}
                    title={x.title}
                    titleStyle={theme.style.listTitle}
                    left={props => <List.Icon {...props} icon={x.nadzemni?(require('../../assets/icons/hidrant32.png')):(require('../../assets/icons/podzemni32.png'))} />}
                    expanded={x.expanded}
                    onPress={() => handlePress(index)}>
                    <List.Item titleStyle={theme.style.listTitle} title={x.description} />
                </List.Accordion>
                
            ))}
        </List.Section>
        </ScrollView> 
    );
};