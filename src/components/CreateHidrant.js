import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';

const CreateHidranti = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [nadzemni, setNadzemni] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = () => {
    const data = {
      title,
      description,
      location,
      lat,
      lng,
      nadzemni,
      status
    };

    axios.post('http://10.0.2.2:3001/api/hidrant', data)
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