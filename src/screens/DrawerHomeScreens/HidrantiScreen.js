import React from 'react';
import {View,Text} from 'react-native';
import CreateHidranti from '../../components/CreateHidrant';
import GetHidranti from '../../components/GetHidranti';

export default function HidrantiScreen() {
  return (
    <View>
    <Text> Hidranti </Text>
    <GetHidranti />
    <CreateHidranti />
    </View>
  );
}