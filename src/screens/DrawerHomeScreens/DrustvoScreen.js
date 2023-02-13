import React from 'react';
import {View,Text} from 'react-native';
import CreateDrustvo from '../../components/CreateDrustvo';
import GetDrustvo from '../../components/GetDrustvo';
export default function DrustvoScreen() {
  return (
    <View>
    <CreateDrustvo />
    <GetDrustvo />
    </View>
  );
}