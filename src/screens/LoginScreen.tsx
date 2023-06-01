  const signInStyles = styles.signInStyles;
  import React, { FC, useContext, useState } from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/LoginStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const LoginScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const { isLoading, login } = useContext(AuthContext);


  return (
  <ImageBackground
    source={require('../../assets/img/ozadje_temno.webp')}
    style={signInStyles.backgroundImage}
  >
    <View style={signInStyles.container}>
      <View style={signInStyles.logoContainer}>
        <Image style={signInStyles.logo} source={require('../../assets/img/LOGO_PGD_LOVRENC_crna.png')} />
      </View>
      <Spinner visible={isLoading} />
      <View style={signInStyles.formContainer}>
  <View >
    <TextInput
      style={signInStyles.input}
      value={name}
      placeholder="Uporabniško ime"
      onChangeText={(text) => setName(text)}
    />
  </View>

    <View style={signInStyles.passwordInputContainer}>
      <TextInput
        style={signInStyles.passwordInput}
        value={password}
        placeholder="Geslo"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={!isPasswordVisible}
      />
      <View style={signInStyles.eyeIconContainer}>
        <TouchableOpacity
          style={signInStyles.eyeIcon}
          onPress={() => setPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? (
            <FontAwesome name="eye" size={24} color="black" /> // Open eye icon
          ) : (
            <FontAwesome name="eye-slash" size={24} color="black" /> // Closed eye icon
          )}
        </TouchableOpacity>
      </View>
    </View>
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