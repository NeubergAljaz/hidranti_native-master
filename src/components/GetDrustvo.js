import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import HttpInterceptor from '../services/HttpInterceptor';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL_DRUSTVO } from '../config';
import { ListItem } from "@react-native-material/core";
import CreateDrustvo from './CreateDrustvo';
import {
    Provider,
    Text,
    Stack,
    Button,
    Dialog,
    DialogHeader,
    DialogContent,
    DialogActions,
    TextInput,
} from "@react-native-material/core";

const Drustvo = () => {
    const [visible, setVisible] = useState(false);
    const { userInfo } = useContext(AuthContext);
    const [data, setData] = useState(null);
 

    useEffect(() => {
        HttpInterceptor(userInfo.accessToken);
        api.get(`${BASE_URL_DRUSTVO}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [visible]);

    console.log("DATA DRUSTVO", data)

    return (
        <>
            <Button
                title="Dodajte društvo"
                style={{ margin: 16 }}
                onPress={() => setVisible(true)}
            />
            <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                <DialogHeader title="Dialog Header" />
                <DialogContent>

                    <CreateDrustvo />

                </DialogContent>
                <DialogActions>
                    <Button
                        title="Cancel"
                        compact
                        variant="text"
                        onPress={() => setVisible(false)}
                    />
                    <Button
                        title="Ok"
                        compact
                        variant="text"
                        onPress={() => setVisible(false)}
                    />
                </DialogActions>
            </Dialog>
            {data && data.map((x) => (
                <ListItem
                    title={x.naziv}
                    secondaryText={x.naslov}
                />
            ))}
        </>
    );
};

const GetDrustvo = () => (
    <Provider>
        <Drustvo />
    </Provider>
);

export default GetDrustvo;