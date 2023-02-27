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
    fontWeight: 'bold',
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
  text: {
    fontSize: 16,
    color: 'white',
  },
  listTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
  }
});

export default {
    lightTheme,
    darkTheme
  };