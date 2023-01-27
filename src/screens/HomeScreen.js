import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import { AppBar, IconButton, FAB } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const HomeScreen = () => {
  const {userInfo, isLoading, logout} = useContext(AuthContext);
console.log(userInfo, "USERR")
  return (
    <>
    <View >
      <Spinner visible={isLoading} />
      <Text>Dobrodošli {userInfo.user.username}</Text>
      <Button title="Logout" color="red" onPress={logout} />
    </View>
      <AppBar
      variant="bottom"
      leading={props => (
        <IconButton icon={props => <Icon name="menu" {...props} />} {...props} />
      )}
      trailing={props => (
        <IconButton
          icon={props => <Icon name="magnify" {...props} />}
          {...props}
        />
      )}
      style={{ position: "absolute", start: 0, end: 0, bottom: 0 }}
    >
      <FAB
        icon={props => <Icon name="plus" {...props} />}
        style={{ position: "absolute", top: -28, alignSelf: "center" }}
      />
    </AppBar>
    </>
  );
};



export default HomeScreen;