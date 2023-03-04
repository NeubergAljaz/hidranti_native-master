import React, { useState, useEffect } from 'react';Button
import { Image, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import api from '../../services/api';
import DialogPregled from '../../components/Dialogues/DialogPregled';
import { BASE_URL_HIDRANT } from '../../config';
import { FAB, Divider, Button} from 'react-native-paper';
import { Dialog, Input, ButtonGroup, CheckBox} from '@rneui/themed';


export default function HidrantiMapScreen() {

  const [data, setData] = useState([]);
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState(null);
  const [location, setLocation] = useState('');
  const [lng, setLng] = useState(null);
  const [nadzemni, setNadzemni] = React.useState(false);
  const [status, setStatus] = useState(0);
  const [title, setTitle] = useState('');
  const [visible, setVisible] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [visible2, setVisible2] = React.useState(false);

  const buttons = ['IZPRAVEN', 'NEIZPRAVEN', 'NEPREGLEDAN'];

  const handleButtonPress = (value) => {
    setSelectedIndex(value);
    console.log(`Selected button: ${buttons[value]}`);
    setStatus(()=>buttons[value])
  };
  
  const toggleOverlay = () => {
    setVisible2(!visible2);
  };

  useEffect(() => {
    api.get(`${BASE_URL_HIDRANT}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  },[]);


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


        {data && data.map((x, index) => (
          <Marker
            coordinate={{
              latitude: x.lat,
              longitude: x.lng
            }}
            key={index}
            title={x.title}
            description={x.location}
          >
              <View style={{
                backgroundColor: x.status == "IZPRAVEN" ? ('rgba(152,251,152, 0.2)') :  x.status == "NEIZPRAVEN" ?('rgba(255, 0, 0, 0.2)'):("rgba(255, 255, 0, 0.2)"),
                borderRadius: 15,
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor:'rgb(119,136,153)',
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
        ))}

      </MapView>
      
        <Dialog
            visible={visible} 
            onDismiss={hideDialog}
            onBackdropPress={hideDialog}
          >
          <Dialog.Title title="Dodajanje hidranta"/>

              <Input
                label="Naziv"
                value={title}
                onChangeText={text => setTitle(text)}
                style={{ marginBottom: 16 }}
              />
              <Input
                label="Opis"
                value={description}
                onChangeText={text => setDescription(text)}
                style={{ marginBottom: 16 }}
              />
              <Input
                label="Lokacija"
                value={location}
                onChangeText={text => setLocation(text)}
                style={{ marginBottom: 16 }}
              />

              <ButtonGroup
                  buttons={buttons}
                  selectedIndex={selectedIndex}
                  onPress={handleButtonPress}
                  selectedButtonStyle={{
                    backgroundColor: '#4682B4',
                    }} 
                  vertical={true}
                  containerStyle={{ marginBottom: 20 }}
                />
              <Text style={{ marginBottom: 8 }}>Nadzemni:</Text>
              <CheckBox
                checked={nadzemni}
                onPress={() => setNadzemni(!nadzemni)}
                style={{ marginBottom: 16 }}
              />
            
            <Dialog.Actions>
            <Dialog.Button compact variant="text" onPress={() => {
                  handleSubmit();
                  hideDialog();}}>Potrdi</Dialog.Button>
              </Dialog.Actions>
        </Dialog>
               
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={showDialog}
      />

     <DialogPregled visible = {visible2} setVisible={setVisible2} selectedMarkerId={13}/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  map: {
    width: '100%',
    height: '100%',
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
  fab: {
    position: 'absolute',
    margin: 16,
    alignSelf: 'center',
    bottom: 0,
    
  }
});