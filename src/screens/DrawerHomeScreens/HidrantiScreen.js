
// component state management
import { useEffect, useState } from 'react';
// view component
import { StyleSheet, Text, View, Button } from 'react-native'; 
// redux hooks
import { useSelector, useDispatch } from 'react-redux'; 

import GetHidranti from '../../components/GetHidranti';



export default function HidrantiScreen() {

  const theme = useSelector(state => state.theme);
  
  return (
    <View style={theme.style.container}>
      <GetHidranti/>
    </View>
  );
}

const styles = StyleSheet.create({
  container_light: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  }

  ,
  container_dark: {
      flex: 1,
      backgroundColor: '#121212',
      alignItems: 'center',
      justifyContent: 'center',
  }

  ,
  text_light: {
      marginBottom: 20,
      color: '#000'
  }

  ,
  text_dark: {
      marginBottom: 20,
      color: "#fff"
  }
}

);