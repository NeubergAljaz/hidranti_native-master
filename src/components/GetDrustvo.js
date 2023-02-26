import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL_DRUSTVO } from '../config';
//import CreateDrustvo from './CreateDrustvo';
import {
    Provider,
    Portal,
    List,
    Button,
    Dialog,
    TextInput
} from 'react-native-paper';
// redux hooks
import { useSelector} from 'react-redux'; 

const GetDrustvo = () => {
    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const { userInfo } = useContext(AuthContext);
    const [data, setData] = useState(null);

    const [naziv, setNaziv] = useState('');
    const [email, setEmail] = useState('');
    const [naslov, setNaslov] = useState('');

    const theme = useSelector(state => state.theme);

    const handleSubmit = () => {
        
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

        hideDialog();
    };
 
    useEffect(() => {
   
        api.get(`${BASE_URL_DRUSTVO}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [visible]);

    return (
        <Provider>
            <View style={theme.style.container}>
                <Button mode="contained" onPress={showDialog}>Dodaj društvo</Button>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Novo društvo</Dialog.Title>
                        <Dialog.Content>
                            <TextInput label="Naziv" value={naziv} mode='flat'
                                    onChangeText={text => setNaziv(text)}/>

                            <TextInput label="Email" value={email}
                                onChangeText={text => setEmail(text)} />

                            <TextInput label="Naslov" value={naslov}
                                onChangeText={text => setNaslov(text)} />

                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button compact variant="text" onPress={hideDialog}>Cancel</Button>
                            <Button compact variant="text" onPress={handleSubmit}>Submit</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
                    {data && data.map((x) => (
                        <List.Item
                            key={x.naziv}
                            title={x.naziv}
                            description={x.naslov}
                            titleStyle={theme.style.listTitle}
                            descriptionStyle={theme.style.listDescription}
                        />
                    ))}
                
            </View>
        </Provider>
    );
};

export default GetDrustvo;