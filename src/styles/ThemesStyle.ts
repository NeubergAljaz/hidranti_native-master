import { StyleSheet } from 'react-native';

export const lightTheme = StyleSheet.create({
  containerMap: {
    flex: 0,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(130,4,150, 0.9)',
  },
  ring: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'rgba(130,4,150, 0.3)',
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(130,4,150, 0.5)',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    alignSelf: 'center',
    bottom: 0,
    backgroundColor: 'white'
  },
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
    color: '#FC8A17',
  },
  listAccordion:{
    borderRadius: 8,
    borderWidth: 5,
    backgroundColor: 'white'
  },
  screenOptions:{
    fontSize: 15,
    color: 'white',
    drawerActiveTintColor: 'black',
    drawerActiveBackgroundColor: 'rgba(252, 138, 23, 0.7)'
  },
  buttonStyle:{
    backgroundColor: '#FC8A17',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 30,
  }
});

export const darkTheme = StyleSheet.create({
  containerMap: {
    flex: 0,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(130,4,150, 0.9)',
  },
  ring: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'rgba(130,4,150, 0.3)',
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(130,4,150, 0.5)',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    alignSelf: 'center',
    bottom: 0,
    backgroundColor: 'white'
  },
  dialogContainer: {
    backgroundColor: '#222',
  },
  dialogText: {
    color: 'white',
  },
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
    drawerActiveBackgroundColor: '#FC8A17',
    drawerInactiveBackgroundColor: 'black',
    fontSize: 15,
    color: 'white',
  },
  buttonStyle:{
    backgroundColor: '#FC8A17',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 30,
  }
});

export default {
    lightTheme,
    darkTheme
  };