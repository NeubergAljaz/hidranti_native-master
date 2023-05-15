import React, { useState, useEffect} from 'react';
import { View } from 'react-native';
import api from '../../services/api';
import { BASE_URL_DRUSTVO } from '../../config';
//import CreateDrustvo from './CreateDrustvo';
import { Dialog, Input, Button, Divider } from '@rneui/themed';
import { List } from 'react-native-paper';
// redux hooks
import { useSelector} from 'react-redux'; 

export default function DrustvoScreen()  {
    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    
    const [data, setData] = useState<any[]>([]);

    const [naziv, setNaziv] = useState('');
    const [email, setEmail] = useState('');
    const [naslov, setNaslov] = useState('');

    const theme = useSelector((state : any) => state.theme);

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
        
            <View style={theme.style.containerOptions}>
                <Button 
                    buttonStyle={theme.style.buttonStyle} 
                    onPress={showDialog}>DODAJ DRUŠTVO
                </Button>
                <Divider style={{padding: 10}}/>
                {data && data.map((x:any) => (
                        <List.Item
                            key={x.naziv}
                            title={x.naziv}
                            description={x.naslov}
                            titleStyle={theme.style.listTitle}
                            descriptionStyle={theme.style.listDescription}
                           
                        />
                        
                ))}
                
                        <Dialog isVisible={visible} onDismiss={hideDialog}>
                            <Dialog.Title title="Dodajanje društva"/>
                            
                                <Input label="Naziv" value={naziv}
                                        onChangeText={text => setNaziv(text)}/>

                                <Input label="Email" value={email}
                                    onChangeText={text => setEmail(text)} />

                                <Input label="Naslov" value={naslov}
                                    onChangeText={text => setNaslov(text)} />

                            <Dialog.Actions>
                                <Dialog.Button 
                                    onPress={handleSubmit}>Potrdi</Dialog.Button>
                                <Dialog.Button 
                                    onPress={hideDialog}>Prekliči</Dialog.Button>
                            </Dialog.Actions>
                        </Dialog>
    
            </View>
        
    );
};
