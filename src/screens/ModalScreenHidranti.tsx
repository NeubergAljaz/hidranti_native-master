import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { ScrollView, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { Image } from '@rneui/themed';
import { Card, Text, Title, Subheading } from 'react-native-paper';
import { IP_PORT, BASE_URL_HIDRANT, BASE_URL_HIDRANT_PREGLED } from '../config';
import api from '../services/api';
import Icon from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import { UseConnectivity } from '../Hooks/UseConnectivityHook';
import * as SQLite from 'expo-sqlite';
import ImageView from "react-native-image-viewing";
import { Divider } from '@rneui/themed';
import { CameraComponent } from '../components/Camera/CameraComponent';
import { Entypo } from '@expo/vector-icons';
import DialogModalScreenHidrant from '../components/Dialogues/DialogModalScreenHidrant';
interface ModalScreenHidrantiProps {
  route: {
    params: {
      hidrantId: number;
    };
  };
  navigation: any; // Update with actual type of navigation prop
}

interface Hidrant {
  [x: string]: any;
  id?: number;
  location: string;
  title: string;
  status: string;
  createdDate: string;
  zadnjiPregled: string;
}

export default function ModalScreenHidranti({ route, navigation }: ModalScreenHidrantiProps) {

  const theme = useSelector((state: any) => state.theme);
  const { hidrantId } = route.params;
  const [dataHidrant, setDataHidrant] = useState<Hidrant>({ location: "", title: "", status: "", createdDate: "", zadnjiPregled: "" });
  const [dataPregledi, setDataPregledi] = useState([]);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isConnected = UseConnectivity();
  const [visible, setVisible] = React.useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [selectedPregled, setSelectedPregled] = useState(null)
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const db = SQLite.openDatabase('pregled_hidrantov.db');

  const toggleOverlay = (id) => {
    setSelectedMarkerId(id)
    setVisible(!visible);
  };

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

  const fetchData = useCallback(() => {
    api.get(`${BASE_URL_HIDRANT}/${hidrantId}`)
      .then(response => {
        setDataHidrant(response.data);
        navigation.setOptions({ title: response.data.title });

        if (response.data.image && response.data.image.filename) {
          const vrni = `http://${IP_PORT}:3001/uploads/${response.data.image.filename}`;
          setImageSrc(vrni);
        }

      })
      .catch(error => {
        console.error(error);
      });
  }, [hidrantId, navigation]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (isConnected) {
      api.get(`${BASE_URL_HIDRANT}/${hidrantId}`)
        .then(response => {
          setDataHidrant(response.data);
          navigation.setOptions({ title: response.data.title });
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM hidrant WHERE id = ?;`,
          [hidrantId],
          (_, { rows }) => {
            const hidrantData = rows.item(0);
            setDataHidrant(hidrantData);
            navigation.setOptions({ title: hidrantData.title });
          },
          (_, error) => {
            console.error('Error fetching hidrant data from SQLite:', error);
            return false;
          }
        );
      });

    }
  }, [isConnected]);

  useEffect(() => {
    if (isConnected) {
      api.get(`${BASE_URL_HIDRANT_PREGLED}/hidrant/${hidrantId}`)
        .then(response => {
          setDataPregledi(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM pregled WHERE hidrantId = ?;`,
          [hidrantId],
          (_, { rows }) => {
            const preglediData = rows._array;
            setDataPregledi(preglediData);
            setIsLoading(false);
          },
          (_, error) => {
            console.error('Error fetching pregledi data from SQLite:', error);
            return false;
          }
        );
      });
    }
  }, [isConnected]);

  const updatePregled = useCallback(async () => {
    setShouldRefresh(true);
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      api.get(`${BASE_URL_HIDRANT_PREGLED}/hidrant/${hidrantId}`)
        .then(response => {
          setDataPregledi(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
        });// Ta funkcija mora biti definirana za pridobivanje podatkov
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

  const openImageView = (imageUrls) => {
    setImages(imageUrls);
    setIsImageViewVisible(true);
  };

  const preglediCards = useMemo(() => {
    return dataPregledi.map((x: any) => {

      let imageSrcPregled = null;
      let imageUrls = [];

      if (x.image && x.image.length > 0) {
        const latestImage = x.image[x.image.length - 1];

        imageSrcPregled = `http://${IP_PORT}:3001/uploads/${latestImage.filename}`;
        imageUrls = x.image.map((img) => ({ uri: `http://${IP_PORT}:3001/uploads/${img.filename}` }));
      }

      return (
        <Card key={x.id} style={theme.style.cardStyle}>
          <Card.Cover
            source={require('../../assets/img/ozadje_temno.webp')}
            style={theme.style.coverCardStyle}
          />
          <Card.Content style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
            {imageSrcPregled ? (
              <TouchableOpacity onPress={() => openImageView(imageUrls)}>
                <Image
                  source={{ uri: imageSrcPregled }}
                  style={{ width: 50, height: 50, margin: 5 }}
                />
              </TouchableOpacity>
            ) : (
              <View style={{ width: 50, height: 50, margin: 5 }} />
            )}

            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={theme.style.cardTextStyle}>{x.opis}</Text>
              <Text style={theme.style.cardTextStyle}>{x.status}</Text>
              <Text style={theme.style.cardTextStyle}>{formatDate(x.createdDate)}</Text>
            </View>

            <TouchableOpacity onPress={() => { toggleOverlay(x.id) }}>
              <Entypo name="camera" size={30} color="grey" style={{ borderRadius: 15, padding: 5 }} />
            </TouchableOpacity>
          </Card.Content>
        </Card>);
    })
  }, [dataPregledi, selectedPregled]);

  return (
    <>
      <ImageView
        images={images}
        imageIndex={0}
        visible={isImageViewVisible}
        onRequestClose={() => setIsImageViewVisible(false)}
      />
      <ScrollView style={theme.style.containerPadding}>
        <Card style={theme.style.cardStyle}>
          <Card.Cover
            source={require('../../assets/img/ozadje_temno.webp')}
            style={theme.style.coverCardStyle}
          />
          <Card.Content style={theme.style.contentCardStyle}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Title style={theme.style.cardTextStyle}>{dataHidrant.title}</Title>
              <Title style={theme.style.cardTextStyle}>{dataHidrant.status}</Title>
            </View>
            <Divider style = {{marginBottom:10}}/>
            {imageSrc ? (
              <Image
                source={{ uri: imageSrc }}
                style={{ width: '100%', height: 200 }}
                resizeMode="contain"
              />
            ) : (
              <Icon name="image" size={30} />
            )}
            <Divider style={{ marginVertical: 10 }} />
            <View style={{ alignItems: 'center' }}>
              <Subheading style={{ ...theme.style.cardTextStyle, textAlign: 'center' }}>{dataHidrant.location}</Subheading>

              <Title style={{ ...theme.style.cardTextStyle, textAlign: 'center' }}>Zadnji pregled:</Title>
              <Subheading style={{ ...theme.style.cardTextStyle, textAlign: 'center' }}>{formatDate(dataHidrant.zadnjiPregled)}</Subheading>
            </View>
          </Card.Content>
        </Card>
        <>
          {isLoading ? (
            <ActivityIndicator size="large" color="#FC8A17" style={{ marginTop: 200 }} />
          ) : preglediCards.length === 0 ? (

            <Icon name="squared-cross" size={50} color="black" style={{ marginTop: 200, marginLeft: 140 }} />

          ) : (
            <>{preglediCards}</>
          )}
        </>
      </ScrollView>
      <DialogModalScreenHidrant visible={visible} setVisible={setVisible} selectedMarkerId={selectedMarkerId} updatePregled={updatePregled} />
    </>
  );
}