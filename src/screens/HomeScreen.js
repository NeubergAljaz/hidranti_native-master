import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
//import Permissions from 'react-native-permissions';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/HomeStyle';
import CreateHidrant from '../components/CreateHidrant';
import CreateDrustvo from '../components/CreateDrustvo';
import Map from '../components/Map';
const homeStyles = styles.homeStyles;

const HomeScreen = () => {

  const navigation = useNavigation();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { userInfo, logout } = useContext(AuthContext);

  return (
    <View style={[homeStyles.container, { isNavOpen }]}>
      <View style={isNavOpen ? homeStyles.sideNavContainerOpen : homeStyles.sideNavContainer}>
        <TouchableOpacity
          style={homeStyles.sideNavOption}
          onPress={() => {
            setIsNavOpen(!isNavOpen);
          }}>
          <Image
            source={require('../../assets/img/nav-icon.png')}
            style={homeStyles.sideNavIcon}
          />
        </TouchableOpacity>
        {isNavOpen && (
          <View style={homeStyles.sideNavOptionsContainer}>
            <TouchableOpacity
              style={homeStyles.sideNavOption}
              onPress={() => {
                navigation.navigate('PregledHidrantov');
              }}>
              <Text style={homeStyles.sideNavOptionText}>Pregled hidrantov</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={homeStyles.sideNavOption}
              onPress={() => {
                navigation.navigate('IzvozHidrantov');
              }}>
              <Text style={homeStyles.sideNavOptionText}>Izvoz hidrantov</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={homeStyles.sideNavOption}
              onPress={logout}>
              <Text style={homeStyles.sideNavOptionText}>Izpis</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={homeStyles.mapContainer}>
      <Map />
      <CreateDrustvo />
      </View>
    </View>
  );
};

export default HomeScreen;