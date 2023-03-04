import React, { useState } from 'react';
import { View, Text} from 'react-native';
import { Button, Dialog, Input, ButtonGroup } from '@rneui/themed';
import api from '../../services/api';
import { BASE_URL_PREGLED } from '../../config';

export default function DialogPregled({visible, setVisible, selectedMarkerId}) {
  const [opis, setOpis] = useState('');
  const [status, setStatus] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        opis,
        status
      }

      await api.post(`${BASE_URL_PREGLED}/${selectedMarkerId}`, data);
      console.log("Data submitted successfully!");
      setOpis('');
      setStatus('');
      setSelectedIndex(null);
      setVisible(false);
    } catch (error) {
      console.error(error);
    }
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
        vertical={true}
        containerStyle={{ marginBottom: 20 }}
      />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </Dialog>
  );
};