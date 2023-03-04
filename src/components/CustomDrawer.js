import React, { useContext } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux';
import { AuthContext } from '../context/AuthContext';

export default function CustomDrawer(props) {

    const theme = useSelector(state => state.theme);
    const { logout, userInfo } = useContext(AuthContext);

    return (
        <View style={theme.style.container}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#4682B4' }}>
                <ImageBackground source={require('../../assets/img/4682b4.png')} style={{ padding: 20 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../assets/img/pdg-lovrenc.png')} style={{ height: 80, width: 80, borderRadius: 40, marginRight: 30 }}></Image>
                        <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>{userInfo.user.username}</Text>
                    </View>

                </ImageBackground>
                <View style={theme.style.containerOptions}>
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

