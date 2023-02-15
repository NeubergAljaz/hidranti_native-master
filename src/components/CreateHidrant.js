import React, { useContext,useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import HttpInterceptor from '../services/HttpInterceptor';
import api from '../services/api';
import {AuthContext} from '../context/AuthContext';
import {BASE_URL_HIDRANT} from '../config';
import axios from 'axios';

const CreateHidranti = () => {
  const {userInfo} = useContext(AuthContext);
  const [title, setTitle] = useState('Pri ovinku');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Gasilski dom, Lovrenc 7');
  const [lat, setLat] = useState(46.373915);
  const [lng, setLng] = useState(15.776436);
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

  return (
    <View>
      <Text>Title:</Text>
      <TextInput
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <Text>Description:</Text>
      <TextInput
        value={description}
        onChangeText={text => setDescription(text)}
      />
      <Text>Location:</Text>
      <TextInput
        value={location}
        onChangeText={text => setLocation(text)}
      />
      <Text>Latitude:</Text>
      <TextInput
        value={lat}
        onChangeText={text => setLat(text)}
      />
      <Text>Longitude:</Text>
      <TextInput
        value={lng}
        onChangeText={text => setLng(text)}
      />
    
      <Text>Status:</Text>
      <TextInput
        value={status}
        onChangeText={text => setStatus(text)}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateHidranti;