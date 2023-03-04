import React, { useContext, useEffect, useState } from 'react';
import { View } from "react-native";
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { BASE_URL_PREGLED } from '../config.js'
import { BASE_URL_HIDRANT } from '../config.js'
import api from '../services/api';
import Icon from 'react-native-vector-icons/Entypo';

export default function ModalScreenHidranti({ route, navigation }) {

  const { hidrantId } = route.params;
  console.log(hidrantId)

  const [dataPHidrant, setDataHidrant] = useState("");
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
      api.get(`${BASE_URL_PREGLED}`)
        .then(response => {
          setDataPregledi(response.data.filter((item) => item.hidrantId == dataPHidrant.id));
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [dataPHidrant]);

  return (
    <View >
      <Card style={{ backgroundColor: '#4682B4', borderBottomRightRadius: 10, borderTopEndRadius: 0, borderBottomLeftRadius: 0, borderBottomStartRadius: 10, borderTopStartRadius: 0 }}>
        <Card.Content>
          <Text variant="titleLarge" style={{ color: 'white' }}>{dataPHidrant.location}</Text>
          <Text variant="bodyMedium" style={{ color: 'white' }}>{dataPHidrant.title}</Text>
          <Text variant="bodyMedium" style={{ color: 'white' }}>{dataPHidrant.status} </Text>
          <Text variant="bodyMedium" style={{ color: 'white' }}>{dataPHidrant.createdDate} </Text>
          <Text variant="bodyMedium" style={{ color: 'white' }}>{dataPHidrant.zadnjiPregled} </Text>
        </Card.Content>

        <Card.Actions>

        </Card.Actions>
      </Card>


      <Text variant="titleLarge" >Seznam pregledov:</Text>
      {dataPregledi && dataPregledi.length > 0 ? (
        <>
          {dataPregledi.map((x, index) => (
            <ScrollView>
              <List.Section>
                <List.Item
                  key={index}
                  title={x.opis}
                  description={<>{x.status}, Datum:{x.createdDate}</>}
                  left={props => <List.Icon {...props} icon="folder" />}
                />

              </List.Section>
            </ScrollView>
          ))}
        </>
      ) : (<Text>Hidrant nima pregleda <Icon name="squared-cross" size={30} color="red" /></Text>)
      }
    </View>
  );
}