import { StyleSheet } from 'react-native';

export const lightTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  textInputLight: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    color: '#000',
    fontSize: 16,
  },
  button: {
    buttonColor: 'blue'
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
});

export const darkTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  textInputDark: {
    color: '#fff',
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
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
});

export default {
    lightTheme,
    darkTheme
  };