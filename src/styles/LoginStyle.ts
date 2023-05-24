import { StyleSheet } from 'react-native';

const signInStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', 
    marginTop: 90, 
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  formContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#2C2C2C', // Update the background color to black
    borderRadius: 10,
  },
  input: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#7f8c8d',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#ecf0f1',
    fontSize: 18,
  },
  buttonContainer: {
    backgroundColor: '#FC8A17',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 2.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  whiteText: {
    color: 'white',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  link: {
    color: '#FC8A17', // Change the link color to red
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default {
  signInStyles: signInStyles,
};