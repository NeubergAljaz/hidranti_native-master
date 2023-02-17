import React, { useContext,useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import HttpInterceptor from '../services/HttpInterceptor';
import api from '../services/api';
import {AuthContext} from '../context/AuthContext';
import {BASE_URL_HIDRANT} from '../config';
import { lightTheme, darkTheme } from '../styles/ThemesStyle';
import ThemeContext from '../context/ThemeContext';
import axios from 'axios';

const CreateHidranti = () => {
  const {userInfo} = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [nadzemni, setNadzemni] = useState(false);
  const [status, setStatus] = useState('IZPRAVEN');



  const handleSubmit = () => {
    HttpInterceptor(userInfo.accessToken);
    const data = {
      title,
      description,
      location,
      lat,
      lng,
      nadzemni,
      status
    };

    api.post(`${BASE_URL_HIDRANT}`, data)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const { isDarkModeEnabled} = useContext(ThemeContext);

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Text style={[isDarkModeEnabled ? darkTheme.optionText : lightTheme.optionText, { marginBottom: 8 }]}>Title:</Text>
      <TextInput
        value={title}
        onChangeText={text => setTitle(text)}
        style={[isDarkModeEnabled ? darkTheme.textInputDark : lightTheme.textInputLight, { marginBottom: 16 }]}
      />
      <Text style={[isDarkModeEnabled ? darkTheme.optionText : lightTheme.optionText, { marginBottom: 8 }]}>Description:</Text>
      <TextInput
        value={description}
        onChangeText={text => setDescription(text)}
        style={[isDarkModeEnabled ? darkTheme.textInputDark : lightTheme.textInputLight, { marginBottom: 16 }]}
      />
      <Text style={[isDarkModeEnabled ? darkTheme.optionText : lightTheme.optionText, { marginBottom: 8 }]}>Location:</Text>
      <TextInput
        value={location}
        onChangeText={text => setLocation(text)}
        style={[isDarkModeEnabled ? darkTheme.textInputDark : lightTheme.textInputLight, { marginBottom: 16 }]}
      />
      <Text style={[isDarkModeEnabled ? darkTheme.optionText : lightTheme.optionText, { marginBottom: 8 }]}>Latitude:</Text>
      <TextInput
        value={lat}
        onChangeText={text => setLat(text)}
        style={[isDarkModeEnabled ? darkTheme.textInputDark : lightTheme.textInputLight, { marginBottom: 16 }]}
      />
      <Text style={[isDarkModeEnabled ? darkTheme.optionText : lightTheme.optionText, { marginBottom: 8 }]}>Longitude:</Text>
      <TextInput
        value={lng}
        onChangeText={text => setLng(text)}
        style={[isDarkModeEnabled ? darkTheme.textInputDark : lightTheme.textInputLight, { marginBottom: 16 }]}
      />
      <Text style={[isDarkModeEnabled ? darkTheme.optionText : lightTheme.optionText, { marginBottom: 8 }]}>Status:</Text>
      <TextInput
        value={status}
        onChangeText={text => setStatus(text)}
        style={[isDarkModeEnabled ? darkTheme.textInputDark : lightTheme.textInputLight, { marginBottom: 16 }]}
      />
      <TouchableOpacity onPress={handleSubmit} style={{ borderWidth: 2, borderColor: 'blue', padding: 12, borderRadius: 8, marginTop: 24 }}>
        <Text style={isDarkModeEnabled ? darkTheme.optionText : lightTheme.optionText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateHidranti;