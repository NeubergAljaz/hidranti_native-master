import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import api from '../../services/api';
import { BASE_URL_HIDRANT } from '../../config';
import { List } from 'react-native-paper';
import { View, Text } from 'react-native';
import { Image } from 'react-native-elements';
// redux hooks
import { useSelector } from 'react-redux';
import { CheckBox } from '@rneui/themed';
import { Searchbar } from 'react-native-paper';
import { UseConnectivity } from '../../Hooks/UseConnectivityHook';
import * as SQLite from 'expo-sqlite';


export default function HidrantiScreen({ navigation }: { navigation: any }) {
    const theme = useSelector((state: any) => state.theme);
    const [data, setData] = useState<any[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState({
        izpraven: true,
        neizpraven: true,
        nepregledan: true,
    });
    const isConnected = UseConnectivity();
    const db = SQLite.openDatabase('pregled_hidrantov.db');

    const fetchData = () => {
        if (isConnected) {
            // Fetch data from API
            api.get(`${BASE_URL_HIDRANT}`)
              .then(response => {
                setData(response.data);
              })
              .catch(error => {
                console.error(error);
              });
          } else {
            // Fetch data from SQLite database
            console.log("fetching from SQLite")
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
        
                  setData(fetchedData);
                },
                (_, error) => {
                  console.error('Error fetching data from SQLite database:', error);
                  return false;
                }
              );
            });
          }
    }      
    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation]);


    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation]);
    //console.log("DATA HIDRANTI", data)


    const filteredData = data.filter((x) => {
        const statusLower = x.status.toLowerCase();
        const filterStatusLower = Object.keys(filterStatus).includes(statusLower) ? filterStatus[statusLower] : false;
        return x.title.toLowerCase().includes(filter.toLowerCase()) && filterStatusLower;
    });

    const isAnyCheckboxSelected = Object.values(filterStatus).some(val => val);

    const finalData = isAnyCheckboxSelected ? filteredData : data;

    return (
        <ScrollView style={theme.style.containerFlex}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                <View>
                    <Text style={theme.style.dialogText}>Izpraven</Text>
                    <CheckBox
                        checkedColor={'#FC8A17'}
                        containerStyle={theme.style.container}
                        checked={filterStatus.izpraven}
                        onPress={() => setFilterStatus({ ...filterStatus, izpraven: !filterStatus.izpraven })}
                    />
                </View>

                <View>
                    <Text style={theme.style.dialogText}>Neizpraven</Text>
                    <CheckBox
                        checkedColor={'#FC8A17'}
                        containerStyle={theme.style.container}
                        checked={filterStatus.neizpraven}
                        onPress={() => setFilterStatus({ ...filterStatus, neizpraven: !filterStatus.neizpraven })}
                    />
                </View>

                <View>
                    <Text style={theme.style.dialogText}>Nepregledan</Text>
                    <CheckBox
                        checkedColor={'#FC8A17'}
                        containerStyle={theme.style.container}
                        checked={filterStatus.nepregledan}
                        onPress={() => setFilterStatus({ ...filterStatus, nepregledan: !filterStatus.nepregledan })}
                    />
                </View>
            </View>

            <Searchbar
                placeholder="Išči:"
                onChangeText={text => setFilter(text)}
                value={filter}
                theme={{
                    colors: {
                        background: 'white',
                        placeholder: 'white',
                        text: 'black',
                    },
                }}
            />

            <List.Section style={theme.style.containerFlex}>
                {filteredData && [...filteredData].sort((a, b) => a.title.localeCompare(b.title)).map((x: any, index: number) => (

                    <List.Item
                        onPress={() => { navigation.navigate('Hidrant', { hidrantId: x.id }); console.log(x) }}
                        style={{
                            borderColor: 'rgb(119,136,153)', marginBottom: 5, marginLeft: 10, marginRight: 10,
                            borderWidth: 1, borderRadius: 10
                        }}
                        key={index}
                        title={x.title}
                        titleStyle={theme.style.listTitle}
                        left={() => (
                            <View
                                style={{
                                    borderRadius: 50,
                                    borderWidth: 2,
                                    backgroundColor: x.status == "IZPRAVEN" ? ('rgba(152,251,152, 0.2)') : x.status == "NEIZPRAVEN" ? ('rgba(255, 0, 0, 0.2)') : ("rgba(255, 255, 0, 0.2)"),
                                    padding: 4,
                                    marginBottom: 2,
                                    marginLeft: 10

                                }}
                            >
                                <Image
                                    source={x.nadzemni ? require('../../../assets/icons/hidrant32.png') : require('../../../assets/icons/podzemni32.png')}
                                    style={{ width: 32, height: 32 }}
                                />
                            </View>
                        )}
                    />

                ))}

            </List.Section>
        </ScrollView>
    );
};