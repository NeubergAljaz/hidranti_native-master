import React, { useState, useEffect, useMemo } from 'react';
import { Image, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import api from '../../services/api';
import DialogPregled from '../../components/Dialogues/DialogPregled';
import { BASE_URL_HIDRANT } from '../../config';
import { FAB } from 'react-native-paper';
import { Dialog, Input, CheckBox, Divider } from '@rneui/themed';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { CustomToast } from '../../components/Toasts/CustomToast';
import * as Location from 'expo-location';
import { UseLocationPermission } from '../../Hooks/UseLocationPermission';

export default function HidrantiMapScreen() {

  const [data, setData] = useState([]);
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [location, setLocation] = useState('');
  const [nadzemni, setNadzemni] = React.useState(false);
  const [status, setStatus] = useState<string>('');
  const [title, setTitle] = useState('');
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);

  const [currentPosition, setCurrentPosition] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const theme = useSelector((state: any) => state.theme);
  const isLocationEnabled = UseLocationPermission();

  console.log(isLocationEnabled, "location")

  const toggleOverlay = () => {
    setVisible2(!visible2);
  };


  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (currentPosition) {
    text = JSON.stringify(currentPosition);
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentPosition(location);
    })();
  }, []);

  useEffect(() => {
    if (data.length === 0) {
      api.get(`${BASE_URL_HIDRANT}`)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [data]);

  const fetchData = () => {
    api.get(`${BASE_URL_HIDRANT}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleSubmit = async () => {
    const data = {
      title,
      description,
      location,
      lat,
      lng,
      status,
      nadzemni,
    };
    try {
      const response = await api.post(BASE_URL_HIDRANT, data);
      console.log("Map.js--> add hidrant", response.data);
      setTitle("");
      setDescription("");
      setLocation("");
      setData([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkerPress = (markerId: number) => {
    setSelectedMarkerId(markerId);
  };

  const MarkerMemo = React.memo(Marker);
  const markers = useMemo(() => data.map((x: any, index: number) => (
    <Marker
      onPress={() => handleMarkerPress(x.id)}
      coordinate={{
        latitude: x.lat,
        longitude: x.lng
      }}
      key={index}
      title={x.title}
      description={x.location}
    >
      <View style={{
        backgroundColor: x.status == "IZPRAVEN" ? ('rgba(152,251,152, 0.6)') : x.status == "NEIZPRAVEN" ? ('rgba(255, 0, 0, 0.3)') : ("rgba(255, 255, 0, 0.6)"),
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'rgb(119,136,153)',
        borderWidth: 1,
      }}>
        <Image
          source={x.nadzemni == true ? (require("../../../assets/icons/hidrant32.png")) : (require("../../../assets/icons/podzemni32.png"))}
          style={{ width: 20, height: 20 }}
        />
      </View>
      <Callout style={{ width: 250, height: 200 }} onPress={toggleOverlay}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
            Naziv: {x.title}</Text>
          <Divider />
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 14, marginBottom: 5 }}>Lokacija: {x.location}</Text>
            <Text style={{ fontSize: 14, marginBottom: 5 }}>Opis: {x.description}</Text>
            <Text style={{ fontSize: 14 }}>Status: {x.status}</Text>
          </View>
        </View>
      </Callout>
    </Marker>
  )), [data]);

  return (

    <View style={theme.style.containerMap}>
      <MapView style={theme.style.map}
        onPress={(event) => {
          setLat(event.nativeEvent.coordinate.latitude);
          setLng(event.nativeEvent.coordinate.longitude);
        }}
        initialRegion={{
          latitude: currentPosition ? currentPosition.coords.latitude : 46.55472,
          longitude: currentPosition ? currentPosition.coords.longitude : 15.64667,
          latitudeDelta: 0.9922,
          longitudeDelta: 0.0421,
        }}>

        {lat && lng &&
          <Marker
            coordinate={{
              latitude: lat,
              longitude: lng
            }}
            draggable
            onDragEnd={(e) => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              setLat(latitude);
              setLng(longitude);
            }}
          >
            <Icon name="add-circle-outline" size={40} color="#900" />
          </Marker>
        }



        {currentPosition &&  
          <Marker
            coordinate={{
              latitude: currentPosition.coords.latitude,
              longitude: currentPosition.coords.longitude,
            }}
            title="Moja lokacija"
          >
            <Octicons name="dot-fill" size={30} color="blue" />
          </Marker>
        }

        {markers}

      </MapView>

      <Dialog
        isVisible={visible}
        onDismiss={hideDialog}
        onBackdropPress={hideDialog}
        overlayStyle={theme.style.dialogContainer}

      >
        <Dialog.Title title="Dodajanje hidranta" titleStyle={theme.style.dialogText} />

        <Input
          label="Naziv"
          value={title}
          onChangeText={text => setTitle(text)}
          inputStyle={theme.style.dialogText}
          style={{ marginBottom: 1 }}
        />
        <Input
          label="Opis"
          value={description}
          onChangeText={text => setDescription(text)}
          inputStyle={theme.style.dialogText}
          style={{ marginBottom: 1 }}
        />
        <Input
          label="Lokacija"
          value={location}
          onChangeText={text => setLocation(text)}
          inputStyle={theme.style.dialogText}
          style={{ marginBottom: 1 }}
        />


        <Text style={[{ marginBottom: 8 }, theme.style.dialogText]}>Nadzemni:</Text>
        <CheckBox
          checked={nadzemni}
          onPress={() => setNadzemni(!nadzemni)}
          checkedColor={'#FC8A17'}
          containerStyle={theme.style.dialogContainer}
          style={{ marginBottom: 16 }}
        />

        <Dialog.Actions>
          <Dialog.Button
            titleStyle={{ color: '#FC8A17' }}
            onPress={() => {
              handleSubmit();
              hideDialog();
              CustomToast('Dodali ste društvo.', 'success');
            }}>Potrdi</Dialog.Button>
        </Dialog.Actions>
      </Dialog>

      <FAB
        icon="plus"
        style={theme.style.fab}
        onPress={showDialog}
      />

      <DialogPregled visible={visible2} setVisible={setVisible2} selectedMarkerId={selectedMarkerId} onSubmit={fetchData} />

    </View>

  );
}
