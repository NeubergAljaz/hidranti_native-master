import { StyleSheet } from 'react-native';


const signInStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#34495e',
      },
      formContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: '#ecf0f1',
        borderRadius: 10,
      },
      input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#7f8c8d',
        borderRadius: 5,
        paddingHorizontal: 14,
        backgroundColor: '#ecf0f1',
      },
      buttonContainer: {
        backgroundColor: '#2ecc71',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
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
        color: '#2980b9',
      },
      logoContainer: {
        alignItems: 'center',
        marginBottom: 20
      },
      logo: {
        width: 150,
        height: 150,
      },
  });

  export default {
    signInStyles: signInStyles,
  };