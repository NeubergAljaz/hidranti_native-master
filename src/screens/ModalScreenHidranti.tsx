import React, {useEffect, useState } from 'react';
import { View, ScrollView  } from "react-native";
import {Card, Text } from 'react-native-paper';
import { List } from 'react-native-paper';
import { BASE_URL_HIDRANT, BASE_URL_HIDRANT_PREGLED } from '../config';
import api from '../services/api';
import Icon from 'react-native-vector-icons/Entypo';
// redux hooks
import { useSelector } from 'react-redux';

interface ModalScreenHidrantiProps {
  route: {
    params: {
      hidrantId: number;
    };
  };
  navigation: any; // Update with actual type of navigation prop
}

interface Hidrant {
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
  console.log(hidrantId)

  const [dataPHidrant, setDataHidrant] = useState<Hidrant>({ location: "", title: "", status: "", createdDate: "", zadnjiPregled: "" });
  const [dataPregledi, setDataPregledi] = useState([]);


  useEffect(() => {
    api.get(`${BASE_URL_HIDRANT}/${hidrantId}`)
      .then(response => {
        setDataHidrant(response.data);
        navigation.setOptions({ title: response.data.title });
      })
      .catch(error => {
        console.error(error);
      });

  }, []);


  useEffect(() => {
    if (dataPHidrant.id) {
      api.get(`${BASE_URL_HIDRANT_PREGLED}`)
        .then(response => {
          setDataPregledi(response.data.filter((item: any) => item.hidrantId === dataPHidrant.id));
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [dataPHidrant]);

  return (
    <View style={theme.style.containerOptions}>
      <Card style={{ backgroundColor: '#4682B4', borderBottomRightRadius: 10, borderTopEndRadius: 10, borderBottomLeftRadius: 10, borderBottomStartRadius: 10, borderTopStartRadius: 10, padding:10, marginTop: 15 }}>
        <Card.Content>
          <Text variant="titleMedium" style={{ color: 'white' }}>Lokacija:</Text>
          <Text variant="bodyMedium" style={{ color: 'white' }}>{dataPHidrant.location}</Text>
          <Text variant="titleMedium" style={{ color: 'white' }}>Naziv:</Text>
          <Text variant="bodyMedium" style={{ color: 'white' }}>{dataPHidrant.title}</Text>
          <Text variant="titleMedium" style={{ color: 'white' }}>Status:</Text>
          <Text variant="bodyMedium" style={{ color: 'white' }}>{dataPHidrant.status} </Text>
          <Text variant="titleMedium" style={{ color: 'white' }}>Datum vnosa:</Text>
          <Text variant="bodyMedium" style={{ color: 'white' }}>{dataPHidrant.createdDate} </Text>
          <Text variant="titleMedium" style={{ color: 'white' }}>Datum zadnjega pregleda:</Text>
          <Text variant="bodyMedium" style={{ color: 'white' }}>{dataPHidrant.zadnjiPregled}</Text>
        </Card.Content>
      </Card>
      <Card style={{ backgroundColor: '#4682B4', borderBottomRightRadius: 10, borderTopEndRadius: 10, borderBottomLeftRadius: 10, borderBottomStartRadius: 10, borderTopStartRadius: 10, padding:10, marginTop: 15 }}>
        <Card.Content>
          <Text variant="titleLarge" style={{ color: 'white' }}>Seznam pregledov:</Text>
    
            {dataPregledi === undefined ? (
              <Text>Loading</Text>
            ) : dataPregledi.length === 0 ? (
              <Text style={{ color: 'white' }}>Hidrant nima pregleda <Icon name="squared-cross" size={20} color="black" /></Text>
            ) : (
              <>
                {dataPregledi.map((x:any, index:number) => (
                  <ScrollView key={index}>
                    <List.Section>
                      <List.Item
                        title={x.opis}
                        titleStyle={{color: 'white'}}
                        description={<>{x.status}, Datum:{x.createdDate}</>}
                        left={props => <List.Icon {...props} icon="folder" />}
                      />
                    </List.Section>
                  </ScrollView>
                ))}
              </>
            )}

        </Card.Content>
      </Card>           

    </View>
  );
}