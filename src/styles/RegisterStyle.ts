import { StyleSheet } from 'react-native';


const signInStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
      },
      formContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: '#2C2C2C',
        borderRadius: 10,
      },
      backgroundImage: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover',
      },
      input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#7f8c8d',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 14,
        backgroundColor: '#ecf0f1',
      },
      buttonContainer: {
        backgroundColor: '#FC8A17',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
      switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      },
      link: {
        color: '#FC8A17',
      },
      whiteText: {
        color: 'white',
      },
  });

  export default {
    signInStyles: signInStyles,
  };