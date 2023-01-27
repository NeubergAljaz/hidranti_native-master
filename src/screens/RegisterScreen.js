import React, {useContext, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import styles from '../styles/RegisterStyle';
const signInStyles = styles.signInStyles;

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const {isLoading, register} = useContext(AuthContext);

  return (
    <View style={signInStyles.container}>
      <Spinner visible={isLoading} />
      <View style={signInStyles.wrapper}>
        <TextInput
          style={signInStyles.input}
          value={name}
          placeholder="Enter name"
          onChangeText={text => setName(text)}
        />


        <TextInput
          style={signInStyles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <Button
          title="Registracija"
          onPress={() => {
            register(name, password);
          }}
        />

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Že imate račun? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={signInStyles.link}>Prijava</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;