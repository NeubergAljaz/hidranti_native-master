import React, { useContext, useEffect, useState } from 'react';
import { View } from "react-native";
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { BASE_URL_PREGLED } from '../config.js'
import { BASE_URL_HIDRANT } from '../config.js'
import api from '../services/api';


export default function ModalScreenHidranti({ route }) {

  const { hidrantId } = route.params;
  console.log(hidrantId)

  const [dataPHidrant, setDataHidrant] = useState("");
  const [dataPregledi, setDataPregledi] = useState([]);


  useEffect(() => {
    api.get(`${BASE_URL_HIDRANT}/${hidrantId}`)
      .then(response => {
        setDataHidrant(response.data);
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
      <Card>
        <Card.Content>
          <Text variant="titleLarge">{dataPHidrant.location}</Text>
          <Text variant="bodyMedium">{dataPHidrant.title}</Text>
          <Text variant="bodyMedium"> ostali info...(se je treba dokoncat)</Text>
        </Card.Content>

        <Card.Actions>
          <Button>Uredi</Button>
          <Button>Izbriši</Button>
        </Card.Actions>
      </Card>

      {dataPregledi && dataPregledi.length > 0 ? (
        <>
          {dataPregledi.map((x, index) => (
            <ScrollView>
              <List.Section>
                <List.Item
                  title={x.opis}
                  description={<>{x.status}, Datum:{x.createdDate}</>}
                  left={props => <List.Icon {...props} icon="folder" />}
                />

              </List.Section>
            </ScrollView>
          ))}
        </>
      ) : (<Text>Hidrant nima pregleda</Text>)
      }
    </View>
  );
}