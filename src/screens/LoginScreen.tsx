import React, { FC, useContext, useState } from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/LoginStyle';

const LoginScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading, login } = useContext(AuthContext);
  const signInStyles = styles.signInStyles;

  return (
    <ImageBackground
    source={require('../../assets/img/ozadje_temno.webp')}
    style={signInStyles.backgroundImage}
  >
    <View style={signInStyles.container}>
      <View style={signInStyles.logoContainer}>
        <Image style={signInStyles.logo} source={require('../../assets/img/pdg-lovrenc.png')} />
      </View>
      <Spinner visible={isLoading} />
      <View style={signInStyles.formContainer}>
        <TextInput
          style={signInStyles.input}
          value={name}
          placeholder="Uporabniško ime"
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          style={signInStyles.input}
          value={password}
          placeholder="Geslo"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <TouchableOpacity
          style={signInStyles.buttonContainer}
          onPress={() => {
            login(name, password);
          }}
        >
          <Text style={signInStyles.buttonText}>Prijava</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text style={[signInStyles.link, signInStyles.whiteText]}>Še nimate računa? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={signInStyles.link}>Registracija</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </ImageBackground>
  );
};

export default LoginScreen;