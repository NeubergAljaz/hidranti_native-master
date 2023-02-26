import React, { useContext, useState } from 'react';
import { View, Text} from 'react-native';
import { Button, Dialog, Input, ButtonGroup } from '@rneui/themed';
import api from '../../services/api';
import { BASE_URL_HIDRANT_PREGLED } from '../../config';
import { AuthContext } from '../../context/AuthContext';

export default function DialogPregled({visible, setVisible, selectedMarkerId}) {
  const { userInfo } = useContext(AuthContext);
  const [opis, setOpis] = useState('');
  const [status, setStatus] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleSubmit = () => {
    
    const data = {
      opis,
      status
    }

    api.post(`${BASE_URL_HIDRANT_PREGLED}/${selectedMarkerId}`, data)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });

      setOpis("")
      setOpis("")
  };
  const buttons = ['IZPRAVEN', 'NEIZPRAVEN', 'NEPREGLEDAN'];


  const handleButtonPress = (value) => {
    setSelectedIndex(value);
    console.log(`Selected button: ${buttons[value]}`);
    setStatus(buttons[value])
  };
  
  return (
    <Dialog
      isVisible={visible}
      onBackdropPress={toggleOverlay}>
      <Text> Pregled hidranta:</Text>
      <View >
        <Input
          placeholder="Opis"
          value={opis}
          onChangeText={text => setOpis(text)}
        />
      <ButtonGroup
        buttons={buttons}
        selectedIndex={selectedIndex}
        onPress={handleButtonPress}
        containerStyle={{ marginBottom: 20 }}
      />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </Dialog>
  );
};