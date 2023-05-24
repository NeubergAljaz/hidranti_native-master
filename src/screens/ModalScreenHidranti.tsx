import React, { useEffect, useState } from 'react';
import { ScrollView, ImageBackground, } from "react-native";
import { Image } from '@rneui/themed';
import { Card, List, Text, Title, Subheading } from 'react-native-paper';
import { IP_PORT, BASE_URL_HIDRANT, BASE_URL_HIDRANT_PREGLED } from '../config';
import api from '../services/api';
import Icon from 'react-native-vector-icons/Entypo';
// redux hooks
import { useSelector } from 'react-redux';
import Iconn from 'react-native-vector-icons/FontAwesome';

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
    api.get(`${BASE_URL_HIDRANT_PREGLED}/hidrant/${hidrantId}`)
      .then(response => {
        setDataPregledi(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <>

      <ScrollView style={theme.style.containerPadding}>
        <Card style={theme.style.cardStyle}>
          <Card.Cover
            source={require('../../assets/img/ozadje_temno.webp')}
            style={theme.style.coverCardStyle}
          />
          <Card.Content style={theme.style.contentCardStyle}>
            {imageSrc ? (
              <Image source={{ uri: imageSrc }} style={{ width: 100, height: 100 }} />
            ) : (
              <Icon name="image" size={30} />
            )}
            <Title style={theme.style.cardTextStyle}>Lokacija:</Title>
            <Subheading style={theme.style.cardTextStyle}>{dataHidrant.location}</Subheading>

            <Title style={theme.style.cardTextStyle}>Naziv:</Title>
            <Subheading style={theme.style.cardTextStyle}>{dataHidrant.title}</Subheading>

            <Title style={theme.style.cardTextStyle}>Status:</Title>
            <Subheading style={theme.style.cardTextStyle}>{dataHidrant.status}</Subheading>

            <Title style={theme.style.cardTextStyle}>Datum zadnjega pregleda:</Title>
            <Subheading style={theme.style.cardTextStyle}>{dataHidrant.zadnjiPregled}</Subheading>
          </Card.Content>
        </Card>
        <Card style={theme.style.cardStyle}>
          <Card.Cover
            source={require('../../assets/img/ozadje_temno.webp')}
            style={theme.style.coverCardStyle}
          />
          <Card.Content style={theme.style.contentCardStyle}>
            <Title style={theme.style.cardTextStyle}>Seznam pregledov:</Title>

            {dataPregledi === undefined ? (
              <Text>Loading</Text>
            ) : dataPregledi.length === 0 ? (
              <Text style={theme.style.cardTextStyle}>
                Hidrant nima pregleda <Icon name="squared-cross" size={20} color="black" />
              </Text>
            ) : (
              <>
                {dataPregledi.slice().reverse().map((x: any, index: number) => (
                  <List.Item
                    key={index}
                    title={x.opis}
                    titleStyle={theme.style.cardTextStyle}
                    descriptionStyle={theme.style.cardTextStyle}
                    description={`Status: ${x.status}, Datum: ${x.createdDate}`}
                    left={props => <List.Icon {...props} icon="folder" />}
                  />
                ))}
              </>
            )}
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
}