import React, {useContext, useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import styles from '../styles/RegisterStyle';
const signInStyles = styles.signInStyles;


const RegisterScreen = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const {isLoading, register} = useContext(AuthContext);

  return (
    <View style={signInStyles.container}>
      <Spinner visible={isLoading} />
      <View style={signInStyles.formContainer}>
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

        <TouchableOpacity style={signInStyles.buttonContainer} onPress={() => {
            if(password.length<6 || password.length>50){
              alert("Geslo mora vsebovati med 6 in 50 znakov");
              return;
            }
            if (!/[A-Z]/.test(password)) {
              alert("Geslo naj vsebuje vsaj eno veliko črko");
              return;
            }
            if (!/[a-z]/.test(password)) {
              alert("Geslo naj vsebuje vsaj eno majhno črko");
              return;
            }
            if (!/[0-9]/.test(password)) {
              alert("Geslo naj vsebuje vsaj eno številko");
              return;
            }
            if (!/[!@#\$%^&*(),.?":{}|<>]/.test(password)) {
              alert("Geslo naj vsebuje vsaj en poseben znak");
              return;
            }
            register(name, password);
            navigation.navigate('Login')
          }}>
            <Text style={signInStyles.buttonText}>Registracija</Text>
        </TouchableOpacity>

        <View style={signInStyles.switchContainer}>
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