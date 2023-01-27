import { StyleSheet } from 'react-native';

const signInStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      wrapper: {
        width: '80%',
      },
      input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,
      },
      link: {
        color: 'blue',
      },
  });

  export default {
    signInStyles: signInStyles,
  };