import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Button, Dialog } from '@rneui/themed';


export default function DialogPregled({visible, setVisible}) {
    
 
    const toggleOverlay = () => {
        setVisible(!visible);
      };
    

    return (
       
<Dialog isVisible={visible} onBackdropPress={toggleOverlay}>
      <Text >Pregled hidrantov:</Text>
      <Text >
        Welcome to React Native Elements
      </Text>
      <Button
     
        
        title="Start Building"
        onPress={toggleOverlay}
      />
    </Dialog>

       
    );
};

