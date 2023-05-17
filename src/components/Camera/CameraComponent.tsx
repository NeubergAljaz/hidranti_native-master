import React, { useState, useEffect, useRef } from 'react';
import { Button, Image, Text, View, Platform } from 'react-native';
import { Camera as ExpoCamera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import api from '../../services/api';
import { BASE_URL_HIDRANT_SLIKA } from '../../config';
import * as FileSystem from 'expo-file-system';

export const CameraComponent: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type] = useState(CameraType.back);
  const [image, setImage] = useState<string | null>(null);
  const cameraRef = useRef<ExpoCamera | null>(null);

  const getPermissions = async () => {
    const { status } = await ExpoCamera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  }

  useEffect(() => {
    getPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      setImage(photo.uri);
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const handleSubmit = async () => {
    try {
      if (!image) {
        console.log('Nobena slika ni izbrana.');
        return;
      }
  
      const newImageUri =  "file:///" + image.split("file:/").join("");
      
      let poskus = {
        uri: newImageUri,
        type: 'image/jpeg',
        name: 'photo.jpg'
      }
      let formData = new FormData();
      formData.append('photo', {
        uri: newImageUri,
        type: 'image/jpeg',
        name: 'photo.jpg'
      } as any);
  
      const response = await api.post(`http://192.168.64.113:3001/api/images/hidrant/1`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('SLIKA JE DODANA', response.data);
    } catch (error) {
      console.error(error);
    }
  };

 
  return (
    <View style={{ flex: 1 }}>
      <ExpoCamera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View>
          <Button title="Slikaj" onPress={takePicture} />
          <Button title="Izberi iz galerije" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
          <Button title="Poslji" onPress={handleSubmit} />
        </View>
      </ExpoCamera>
    </View>
  );
};