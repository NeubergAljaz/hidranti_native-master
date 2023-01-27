import React, {useContext, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import styles from '../styles/LoginStyle';
const signInStyles = styles.signInStyles;

const LoginScreen = ({navigation}) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const {isLoading, login} = useContext(AuthContext);

  return (
    <View style={signInStyles.container}>
      <View style={signInStyles.logoContainer}>
        <Image 
          style={signInStyles.logo}
          source={require('../../assets/img/pdg-lovrenc.png')} 
        />
      </View>
      <Spinner visible={isLoading} />
      <View style={signInStyles.wrapper}>
        <TextInput
          style={signInStyles.input}
          value={name}
          placeholder="Uporabniško ime"
          onChangeText={text => setName(text)}
        />

        <TextInput
          style={signInStyles.input}
          value={password}
          placeholder="Geslo"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <Button
          title="Prijava"
          onPress={() => {
            login(name, password);
          }}
        />

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text style={[signInStyles.link, signInStyles.whiteText]}>Še nimate računa? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={signInStyles.link}>Registracija</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  
};



export default LoginScreen;