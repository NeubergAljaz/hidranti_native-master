import React, { useEffect, useState } from 'react';
import { ScrollView, View } from "react-native";
import { Image } from '@rneui/themed';
import { Card, Text, Title, Subheading } from 'react-native-paper';
import { IP_PORT, BASE_URL_HIDRANT, BASE_URL_HIDRANT_PREGLED } from '../config';
import api from '../services/api';
import Icon from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import { UseConnectivity } from '../Hooks/UseConnectivityHook';
import * as SQLite from 'expo-sqlite';

import { Divider } from '@rneui/themed';


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
  const [imageSrcPregled, setImageSrcPregled] = useState<string | null>(null);

  const isConnected = UseConnectivity();
  const db = SQLite.openDatabase('pregled_hidrantov.db');

  //date formatting
  const formatDate = (dateString: string): string => {
    if (dateString.includes('Z')){
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

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (!isConnected) {
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
    if (!isConnected) {
      api.get(`${BASE_URL_HIDRANT_PREGLED}/hidrant/${hidrantId}`)
        .then(response => {
          setDataPregledi(response.data);
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
          },
          (_, error) => {
            console.error('Error fetching pregledi data from SQLite:', error);
            return false;
          }
        );
      });
    }
  }, [isConnected]);

  //console.log("aa", dataPregledi)

  return (
      <ScrollView style={theme.style.containerPadding}>
        <Card style={theme.style.cardStyle}>
          <Card.Cover
            source={require('../../assets/img/ozadje_temno.webp')}
            style={theme.style.coverCardStyle}
          />
          <Card.Content style={theme.style.contentCardStyle}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Title style={theme.style.cardTextStyle}>Naziv: {dataHidrant.title}</Title>
              <Title style={theme.style.cardTextStyle}>{dataHidrant.status}</Title>
            </View>
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
              <Title style={{ ...theme.style.cardTextStyle, textAlign: 'center' }}>Lokacija:</Title>
              <Subheading style={{ ...theme.style.cardTextStyle, textAlign: 'center' }}>{dataHidrant.location}</Subheading>

              <Title style={{ ...theme.style.cardTextStyle, textAlign: 'center' }}>Datum zadnjega pregleda:</Title>
              <Subheading style={{ ...theme.style.cardTextStyle, textAlign: 'center' }}>{formatDate(dataHidrant.zadnjiPregled)}</Subheading>
            </View>
          </Card.Content>
        </Card>
        <>
          {dataPregledi === undefined ? (
            <Text>Loading</Text>
          ) : dataPregledi.length === 0 ? (
            <Text style={theme.style.cardTextStyle}>
              Hidrant nima pregleda <Icon name="squared-cross" size={20} color="black" />
            </Text>
          ) : (
            <>
              {dataPregledi.slice().reverse().map((x: any, index: number) => (
                <Card key={index} style={theme.style.cardStyle}>
                  <Card.Cover
                    source={require('../../assets/img/ozadje_temno.webp')}
                    style={theme.style.coverCardStyle}
                  />
                  <Card.Content style={theme.style.contentCardStyle}>
                    <Title style={theme.style.cardTextStyle}>{x.opis}</Title>
                    <Text style={theme.style.cardTextStyle}>
                      Status: {x.status}, Datum: {formatDate(x.createdDate)}
                    </Text>
                  </Card.Content>
                </Card>
              ))}
            </>
          )}
        </>
      </ScrollView>
  );
}