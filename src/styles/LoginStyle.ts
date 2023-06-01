import { StyleSheet } from 'react-native';

const signInStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
    marginBottom: 60, 
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
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#7f8c8d',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#ecf0f1',
    fontSize: 18,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
    top: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIcon: {
    marginRight: 5,
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
    height: 210,
  },
});

export default {
  signInStyles: signInStyles,
};