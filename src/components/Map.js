import React, { useContext, useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import HttpInterceptor from '../services/HttpInterceptor';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL_HIDRANT } from '../config';
import { Button, Dialog } from 'react-native-elements';
import { lightTheme, darkTheme } from '../styles/ThemesStyle';
import ThemeContext from '../context/ThemeContext';



export default function Map() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [nadzemni, setNadzemni] = useState(false);
  const [status, setStatus] = useState('');

  const { userInfo } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [toggleDialog, seToggleDialog] = useState(false);


  const toggleDialogFunction = () => {
    seToggleDialog(!toggleDialog);
  };


  console.log(lat, "MArker")
  console.log(lng, "MArker22")
  useEffect(() => {
    HttpInterceptor(userInfo.accessToken);
    api.get(`${BASE_URL_HIDRANT}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [toggleDialog]);


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


  const { isDarkModeEnabled } = useContext(ThemeContext);




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
            image={x.nadzemni == false ? (require("../../assets/icons/hidrant64.png")) : (require("../../assets/icons/podzemni64.png"))}


          />
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

          <Text style={[isDarkModeEnabled ? darkTheme.optionText : lightTheme.optionText, { marginBottom: 8 }]}>Status:</Text>
          <TextInput
            value={status}
            onChangeText={text => setStatus(text)}
            style={[isDarkModeEnabled ? darkTheme.textInputDark : lightTheme.textInputLight, { marginBottom: 16 }]}
          />
          <TouchableOpacity onPress={() => {
            handleSubmit();
            toggleDialogFunction();
          }} style={{ borderWidth: 2, borderColor: 'blue', padding: 12, borderRadius: 8, marginTop: 24 }}>
            <Text style={isDarkModeEnabled ? darkTheme.optionText : lightTheme.optionText}>Submit</Text>
          </TouchableOpacity>
        </View>

      </Dialog>
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
});