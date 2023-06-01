import React, { useContext } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { AuthContext } from '../context/AuthContext';

export default function CustomDrawer(props: any) {
  const theme = useSelector((state: any) => state.theme);
  const { logout } = useContext(AuthContext);
  const authContext = useContext(AuthContext);
  const username = authContext?.userInfo?.username;

  const backgroundImage = theme.style.backgroundImage;
  const logoImage = theme.style.logoImage;

  return (
    <View style={theme.style.containerFlex}>
      <DrawerContentScrollView {...props} contentContainerStyle={theme.style.dialogContainer}>
        <ImageBackground source={backgroundImage} style={{ padding: 20 }}>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={logoImage} style={{ resizeMode: "contain", height: 90, width: 90, borderRadius: 40, marginRight: 30 }} />
            <Text style={[theme.style.dialogText, { fontSize: 15, fontWeight: 'bold' }]}>Uporabniško ime: {'\n'}{username}</Text>
          </View>

        </ImageBackground>
        <View style={theme.style.containerPadding}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity onPress={logout} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="exit-outline" size={22} style={theme.style.listIcon} />
            <Text style={[theme.style.listIcon, { fontSize: 15, marginLeft: 5 }]}>Odjava</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
