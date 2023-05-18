import React, { useState } from 'react';
import { View, Text} from 'react-native';
import { Button, Dialog, Input, ButtonGroup } from '@rneui/themed';
import api from '../../services/api';
import { BASE_URL_HIDRANT_PREGLED } from '../../config';
import { CustomToast } from '../Toasts/CustomToast';
import { useSelector } from 'react-redux';

interface DialogPregledProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMarkerId: number | null;
  onSubmit: () => void;
}

const DialogPregled: React.FC<DialogPregledProps> = ({
  visible,
  setVisible,
  selectedMarkerId,
  onSubmit,
}) => {
  const [opis, setOpis] = useState('');
  const [status, setStatus] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number>(null);
  
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        opis,
        status
      }
      await api.post(`${BASE_URL_HIDRANT_PREGLED}/${selectedMarkerId}`, data);
      console.log("Data submitted successfully!", data);
      setOpis('');
      setStatus('');
      setSelectedIndex(0);
      setVisible(false);
      onSubmit();
      CustomToast('Dodali ste pregled.', 'success');
    } catch (error) {
      console.error(error);
    }
  };

  const buttons = ['IZPRAVEN', 'NEIZPRAVEN', 'NEPREGLEDAN'];
  const theme = useSelector((state: any) => state.theme);

  const handleButtonPress = (value:number) => {
    setSelectedIndex(value);
    console.log(`Selected button: ${buttons[value]}`);
    setStatus(buttons[value])
  };
  
  return (
    <Dialog
      overlayStyle={theme.style.dialogContainer}
      isVisible={visible}
      onBackdropPress={toggleOverlay}>
      <Text style={theme.style.dialogText}> Pregled hidranta:</Text>
      <View >
        <Input
          inputStyle={theme.style.dialogText}
          placeholder="Opis"
          value={opis}
          onChangeText={text => setOpis(text)}
        />
      <ButtonGroup
        buttons={buttons}
        selectedIndex={selectedIndex}
        onPress={handleButtonPress}
        vertical={true}
        containerStyle={[{ marginBottom: 20 }, theme.style.dialogContainer]}
        selectedButtonStyle={{ backgroundColor: '#FC8A17' }} // background color for selected button
        //buttonStyle={theme.style} // custom background color style
        textStyle={theme.style.dialogText} // custom text color style
      />
        <Button title="Potrdi" buttonStyle={theme.style.buttonStyle} onPress={handleSubmit} />
      </View>
    </Dialog>
  );
};

export default DialogPregled;