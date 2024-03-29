import React, { useState, useEffect, useMemo } from 'react';
import { Image, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import api from '../../services/api';
import { BASE_URL_HIDRANT, BASE_URL_HIDRANT_SLIKA } from '../../config';
import { FAB } from 'react-native-paper';
import { Dialog, Input, CheckBox, Divider, Button } from '@rneui/themed';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconBack from 'react-native-vector-icons/Ionicons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import User from 'react-native-vector-icons/FontAwesome';
import { CustomToast } from '../../components/Toasts/CustomToast';
import * as Location from 'expo-location';
import { UseLocationPermission } from '../../Hooks/UseLocationPermissionHook';
import DialogPregled from '../../components/Dialogues/DialogPregled';
import { UseConnectivity } from '../../Hooks/UseConnectivityHook';
import * as SQLite from 'expo-sqlite';
import { CameraComponent } from '../../components/Camera/CameraComponent';


export default function HidrantiMapScreen() {
  const [data, setData] = useState([]);
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [location, setLocation] = useState('');
  const [nadzemni, setNadzemni] = React.useState(true);
  const [status, setStatus] = useState<string>('');
  const [title, setTitle] = useState('');
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);

  const [currentPosition, setCurrentPosition] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [izpraven, setIzpraven] = useState(true);
  const [neizpraven, setNeizpraven] = useState(true);
  const [nepregledan, setNepregledan] = useState(true);

  const [isIzpravenPressed, setIzpravenPressed] = useState(false);
  const [isNeizpravenPressed, setNeizpravenPressed] = useState(false);
  const [isNepregledanPressed, setNepregledanPressed] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [step, setStep] = useState(0);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const theme = useSelector((state: any) => state.theme);
  const isLocationEnabled = UseLocationPermission();
  const isConnected = UseConnectivity();
  const db = SQLite.openDatabase('pregled_hidrantov.db');
  ////console.log(isLocationEnabled, "location")

  //date formatting
  const formatDate = (dateString: string): string => {
    if (dateString.includes('Z')) {
      const dateObj = new Date(dateString);
      const day = dateObj.getDate().toString().padStart(2, '0');
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const year = dateObj.getFullYear().toString();
      return `${day}. ${month}. ${year}`;
    } else {
      const parts = dateString.split(/[- :]/); // Split the date string by '-', ':', and ' ' characters
      const year = parts[0];
      const month = parts[1];
      const day = parts[2];
      return `${day}. ${month}. ${year}`;
    }
  };

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
      fetchData();
      //console.log("Fetchan data ===0: " + data);
    }
  }, [data]);

  const fetchData = () => {
    if (isConnected) {
      // Fetch data from API
      api.get(`${BASE_URL_HIDRANT}`)
        .then(response => {
          setData(response.data);
          //console.log("Fetchan data: " + data);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      // Fetch data from SQLite database
      //console.log("fetching from SQLite")
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM hidrant',
          [],
          (_, result) => {
            const rows = result.rows;
            const fetchedData = [];
        
            for (let i = 0; i < rows.length; i++) {
              fetchedData.push(rows.item(i));
            }
        
            ////console.log("Fetched data from SQLite:", fetchedData);
        
            setData(fetchedData);
            //console.log("Updated data:", data);
          }, 
          (_, error) => {
            console.error('Error fetching data from SQLite database:', error);
            return false;
          }
        );
      });
    }
  };

  useEffect(() => {
    fetchData();
    //console.log(data);
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

    if (isConnected) {
      try {
        const response = await api.post(BASE_URL_HIDRANT, data);
        //console.log("Map.js --> add hydrant", response.data);
        try {
          if (step === 1) {
            await api.post(`${BASE_URL_HIDRANT_SLIKA}/${response.data.id}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
          }
        } catch (error) {
          console.error('Error while uploading the image:', error);
          // If image uploading fails, don't reset the form
          throw error;
        }
        setTitle("");
        setDescription("");
        setLocation("");
        setData([]);
        hideDialog();
        setStep(0);
        CustomToast('Dodali ste hidrant.', 'success');
      } catch (error) {
        console.error(error);
      }
    } else {
      // Save data to SQLite table
      db.transaction((tx) => {

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 23).replace('T', ' ');

        tx.executeSql(
          `INSERT INTO hidrant (title, location, description, status, nadzemni, lat, lng, zadnjiPregled, createdDate) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            data.title,
            data.location,
            data.description,
            "NEPREGLEDAN",
            data.nadzemni ? 1 : 0,
            data.lat,
            data.lng,
            formattedDate,
            formattedDate
          ],
          (_, result) => {
            //console.log('Data saved to SQLite table:', result);
            setTitle("");
            setDescription("");
            setLocation("");
            setData([]);
            hideDialog();
            // Retrieve the inserted data
            db.transaction((tx) => {
              tx.executeSql(
                'SELECT * FROM hidrant WHERE id = ?',
                [result.insertId],
                (_, resultSet) => {
                  //console.log('Inserted data:', resultSet.rows.item(0));
                },
                (_, error) => {
                  console.error('Error retrieving inserted data:', error);
                  return false;
                }
              );
            });
          },
          (_, error) => {
            console.error('Error saving data to SQLite table:', error);
            return false;
          }
        );
      });
    }
  };

  const handleMarkerPress = (markerId: number) => {
    setSelectedMarkerId(markerId);
  };

  const renderStatusCards = () => {
    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: isIzpravenPressed ? '#D3D3D3' : '#fff' }]}
          onPress={() => {
            setIzpraven(!izpraven);
            setIzpravenPressed(!isIzpravenPressed);
          }}
          activeOpacity={1}
        >
          <Text style={styles.cardTitle}>IZPRAVEN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: isNeizpravenPressed ? '#D3D3D3' : '#fff' }]}
          onPress={() => {
            setNeizpraven(!neizpraven);
            setNeizpravenPressed(!isNeizpravenPressed);
          }}
          activeOpacity={1}
        >
          <Text style={styles.cardTitle}>NEIZPRAVEN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: isNepregledanPressed ? '#D3D3D3' : '#fff' }]}
          onPress={() => {
            setNepregledan(!nepregledan);
            setNepregledanPressed(!isNepregledanPressed);
          }}
          activeOpacity={1}
        >
          <Text style={styles.cardTitle}>NEPREGLEDAN</Text>
        </TouchableOpacity>
      </View>
    )
  }
  const markers = useMemo(() => data.map((x: any, index: number) => {
    if (
      (izpraven && x.status == "IZPRAVEN") ||
      (neizpraven && x.status == "NEIZPRAVEN") ||
      (nepregledan && x.status == "NEPREGLEDAN")
    ) {
      return (
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
          <Callout style={{ width: 200, height: 100, borderRadius: 25 }} onPress={toggleOverlay}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
                Naziv: {x.title} </Text>
              <Divider />
              <Text>Zadnji Pregled: {formatDate(x.zadnjiPregled)}</Text>
              <View style={{ marginTop: 10 }}>
              </View>
            </View>
          </Callout>
        </Marker>
      )
    }
  }), [data, izpraven, neizpraven, nepregledan]);

  const handleNext = () => {
    if (validateFields()) {
      setStep(1);
    }
  }

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleLast = () => {
    setStep(0);
  }
  const handlePress = () => {
    handleLast();
    showDialog();
  };
  const handlePictureTaken = (formData: FormData) => {
    setFormData(formData);
  }

  const validateFields = () => {
    if (!title || !description || !location) {
      alert("Prosimo, izpolnite vsa polja");
      return false;
    }
    return true;
  }

  return (
    <View style={theme.style.containerMap}>
      {renderStatusCards()}
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
            <User name="user-circle-o" size={20} color="blue" />
          </Marker>
        }

        {markers}
      </MapView>

      <Dialog
        isVisible={visible}
        onDismiss={hideDialog}
        onBackdropPress={hideDialog}
        overlayStyle={[theme.style.dialogContainer, { height: '90%', width: '90%' }]}
      >
        {step === 0 && (
          <><Dialog.Title title="Dodajanje hidranta" titleStyle={theme.style.dialogText} /><Input
            label="Naziv"
            value={title}
            onChangeText={text => setTitle(text)}
            inputStyle={theme.style.dialogText}
            style={{ marginBottom: 1 }} /><Input
              label="Opis"
              value={description}
              onChangeText={text => setDescription(text)}
              inputStyle={theme.style.dialogText}
              style={{ marginBottom: 1 }} /><Input
              label="Lokacija"
              value={location}
              onChangeText={text => setLocation(text)}
              inputStyle={theme.style.dialogText}
              style={{ marginBottom: 1 }} /><View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[{ marginRight: 8 }, theme.style.dialogText]}>Nadzemni:</Text>
              <CheckBox
                checked={nadzemni}
                onPress={() => setNadzemni(!nadzemni)}
                checkedColor={'#FC8A17'}
                containerStyle={theme.style.dialogContainer} />

            </View>
            <View style={{ height: 20 }} />
            {isConnected ?

              (<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button
                  buttonStyle={{ ...theme.style.buttonStyle, marginRight: 10 }}
                  title="DODAJ"
                  onPress={handleSubmit}
                />
                <Button
                  buttonStyle={{ ...theme.style.buttonStyle, marginLeft: 10 }}
                  title="DODAJ "
                  icon={<Icon name="photo-camera" size={24} color="white" />}
                  onPress={handleNext}
                />
              </View>) :

              (<Button
                buttonStyle={{ ...theme.style.buttonStyle, marginRight: 10 }}
                title="DODAJ"
                onPress={handleSubmit}
              />)
            }
          </>
        )}

        {step === 1 && (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -5, marginTop: -5 }}>
              <TouchableOpacity onPress={handleBack}>
                <Icon name="arrow-back" size={30} color="black" />
              </TouchableOpacity>
              <Text style={{ textAlign: 'center', marginLeft: 70 }}>Posnemi sliko</Text>
            </View>
            <Divider style={{ marginTop: 10 }} />
            <CameraComponent
              hydrantId={selectedMarkerId}
              onPictureTaken={handlePictureTaken}
              onSubmit={handleSubmit}
            // prilagodite to vrednost glede na velikost ikone
            />
          </>
        )}

      </Dialog>

      <FAB
        icon="plus"
        style={theme.style.fab}
        onPress={handlePress}
      />
      <DialogPregled visible={visible2} setVisible={setVisible2} selectedMarkerId={selectedMarkerId} onSubmit={fetchData} />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    top: 10,
    width: '100%',
    zIndex: 1000,
  },
  card: {
    padding: 10,
    borderRadius: 10,
  },
  cardTitle: {
    color: '#808080',
    fontWeight: 'bold',
    fontSize: 12
  },
});


