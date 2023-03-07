import React, {useEffect, useState } from 'react';
import { View, ScrollView  } from "react-native";
import {Card, Text } from 'react-native-paper';
import { List } from 'react-native-paper';
import { BASE_URL_PREGLED } from '../config.js'
import { BASE_URL_HIDRANT } from '../config.js'
import api from '../services/api';
import Icon from 'react-native-vector-icons/Entypo';
// redux hooks
import { useSelector } from 'react-redux';

export default function ModalScreenHidranti({ route, navigation }) {

  const theme = useSelector(state => state.theme);

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
    <View style={theme.style.containerOptions}>
      <Card style={{ backgroundColor: '#4682B4', borderBottomRightRadius: 10, borderTopEndRadius: 10, borderBottomLeftRadius: 10, borderBottomStartRadius: 10, borderTopStartRadius: 10, padding:10, marginTop: 15 }}>
        <Card.Content>
          <Text variant="titleLarge" style={{ color: 'white' }}>{dataPHidrant.location}</Text>
          <Text variant="bodyMedium" style={{ color: 'white' }}>{dataPHidrant.title}</Text>
          <Text variant="bodyMedium" style={{ color: 'white' }}>{dataPHidrant.status} </Text>
          <Text variant="bodyMedium" style={{ color: 'white' }}>{dataPHidrant.createdDate} </Text>
          <Text variant="bodyMedium" style={{ color: 'white' }}>{dataPHidrant.zadnjiPregled} </Text>
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
                {dataPregledi.map((x, index) => (
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