import { StyleSheet } from 'react-native';

export const lightTheme = StyleSheet.create({
  containerOptions: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
  },
  listTitle: {
    color: 'black',
    fontSize: 18,
  },
  listDescription: {
    color: 'black',
    fontSize: 16,
  },
  listIcon: {
    color: 'black'
  },
  switch: {
    color: 'red',
  },
  listAccordion:{
    borderRadius: 8,
    borderWidth: 5,
    backgroundColor: 'white'
  },
  screenOptions:{
    fontSize: 15,
    color: 'white'
  },
  buttonStyle:{
    backgroundColor: '#4682B4',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 30,
  }
});

export const darkTheme = StyleSheet.create({
  containerOptions: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  containerNoFlex: {
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  listTitle: {
    color: 'white',
    fontSize: 18,
  },
  listDescription: {
    color: 'white',
    fontSize: 16,
  },
  listIcon: {
    color: 'white'
  },
  switch: {
    color: 'white',
  },
  listAccordion:{
    borderRadius: 8,
    borderWidth: 5,
    backgroundColor: 'black',
  },
  containerStyle:{
    backgroundColor: 'black',
  },
  screenOptions:{
    drawerInactiveTintColor: 'white',
    drawerActiveTintColor: 'white',
    drawerActiveBackgroundColor: '#4682B4',
    drawerInactiveBackgroundColor: 'black',
    fontSize: 15,
    color: 'white'
  },
  buttonStyle:{
    backgroundColor: '#4682B4',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 30,
  }
});

export default {
    lightTheme,
    darkTheme
  };