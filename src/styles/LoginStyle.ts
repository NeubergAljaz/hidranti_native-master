import { StyleSheet } from 'react-native';

const signInStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#7f8c8d',
    borderRadius: 5,
    paddingHorizontal: 14,
    backgroundColor: '#ecf0f1',
    fontSize: 16, // Adjust the font size as desired
    
  },
  buttonContainer: {
    backgroundColor: '#FC8A17',
    paddingVertical: 5,
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