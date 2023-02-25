import React, { useContext, useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { Button, Dialog } from '@rneui/themed';
import { Divider } from '@rneui/themed';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import DialogPregled from './Dialogues/DialogPregled';
import { BASE_URL_HIDRANT } from '../config';

export default function Map() {

  const [data, setData] = useState([]);
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState(null);
  const [location, setLocation] = useState('');
  const [lng, setLng] = useState(null);
  const [nadzemni, setNadzemni] = useState(false);
  const [status, setStatus] = useState('');
  const [title, setTitle] = useState('');
  const [toggleDialog, setToggleDialog] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleDialogFunction = () => {
    setToggleDialog(!toggleDialog);
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    api.get(`${BASE_URL_HIDRANT}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  },[toggleDialog]);


  const handleSubmit = async () => {
    const data = {
      title,
      description,
      location,
      lat,
      lng,
      nadzemni,
      status
    };
  
    try {
      const response = await api.post(BASE_URL_HIDRANT, data);
      console.log("Map.js--> add hidrant", response.data);
      setTitle("");
      setDescription("");
      setLocation("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };
 
  

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        onPress={(event) => {
          setLat(
            event.nativeEvent.coordinate.latitude
          )
          setLng(
            event.nativeEvent.coordinate.longitude
          )
        }

        }
        initialRegion={{
          latitude: 46.55472,
          longitude: 15.64667,
          latitudeDelta: 0.9922,
          longitudeDelta: 0.0421,
        }}>

        {lat && lng && <Marker
          coordinate={{
            latitude: lat,
            longitude: lng
          }}
         
        />
        }


        {data && data.map((x) => (
          <Marker
            coordinate={{
              latitude: x.lat,
              longitude: x.lng
            }}
            title={x.title}
            description={x.location}
          
            
          >
              <View style={{
               backgroundColor: x.status == "NEPREGLEDAN" ? ('rgba(255, 0, 0, 0.2)') : ('rgba(152,251,152, 0.2)'),
            borderRadius: 15,
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Image
            source={x.nadzemni == false ? (require("../../assets/icons/hidrant32.png")) : (require("../../assets/icons/podzemni32.png"))}
            style={{ width: 20, height: 20 }}
          />
          </View>
             <Callout style={{ width: 250, height: 200 }} onPress={toggleOverlay}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Naziv: {x.title}</Text>
        <Divider />
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>Lokacija: {x.location}</Text>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>Opis: {x.description}</Text>
          <Text style={{ fontSize: 14 }}>Status: {x.status}</Text>
        </View>
      </View>
    </Callout>
          </Marker>
        ))}

      </MapView>
      <Button
        title="Dodajte hidrant"
        onPress={toggleDialogFunction}
      />

      <Dialog
        isVisible={toggleDialog}
        onBackdropPress={toggleDialogFunction}
      >
        <Dialog.Title title="Dialog Title" />
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={{ marginBottom: 8 }}>Title:</Text>
          <TextInput
            value={title}
            onChangeText={text => setTitle(text)}
            style={{ marginBottom: 16 }}
          />
          <Text style={{ marginBottom: 8 }}>Description:</Text>
          <TextInput
            value={description}
            onChangeText={text => setDescription(text)}
            style={{ marginBottom: 16 }}
          />
          <Text style={{ marginBottom: 8 }}>Location:</Text>
          <TextInput
            value={location}
            onChangeText={text => setLocation(text)}
            style={{ marginBottom: 16 }}
          />

          <Text style={{ marginBottom: 8 }}>Status:</Text>
          <TextInput
            value={status}
            onChangeText={text => setStatus(text)}
            style={{ marginBottom: 16 }}
          />
          <TouchableOpacity onPress={() => {
            handleSubmit();
            toggleDialogFunction();
          }} style={{ borderWidth: 2, borderColor: 'blue', padding: 12, borderRadius: 8, marginTop: 24 }}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>

      </Dialog>

     <DialogPregled visible = {visible} setVisible={setVisible}/>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  map: {
    width: '100%',
    height: '92%',
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(130,4,150, 0.9)',
  },
  ring: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'rgba(130,4,150, 0.3)',
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(130,4,150, 0.5)',
  },
});