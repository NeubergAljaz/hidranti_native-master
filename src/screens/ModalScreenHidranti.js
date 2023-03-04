import React, { useContext, useEffect, useState } from 'react';
import { View } from "react-native";
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { BASE_URL_PREGLED } from '../config.js'
import api from '../services/api';


export default function ModalScreenHidranti({ route }) {

  const [data, setData] = useState([]);

  useEffect(() => {
    api.get(`${BASE_URL_PREGLED}`)
      .then(response => {
        setData(response.data.filter((item) => item.hidrantId == hidrant.id));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  const { hidrant } = route.params;
  console.log(hidrant)
  return (
    <View >

      <Card>
        <Card.Content>
          <Text variant="titleLarge">{hidrant.location}</Text>
          <Text variant="bodyMedium">{hidrant.title}</Text>
          <Text variant="bodyMedium"> ostali info...(se je treba dokoncat)</Text>
        </Card.Content>

        <Card.Actions>
          <Button>Uredi</Button>
          <Button>Izbriši</Button>
        </Card.Actions>
      </Card>

    


      {data !== undefined ? (
        <>
          {data.map((x, index) => (
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
        ) : (<Text>Hidrant ima pregleda</Text>)
      }
    </View>
  );
}