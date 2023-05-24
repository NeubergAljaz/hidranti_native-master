import React, { useState, useEffect, useRef } from 'react';
import { Button, Image, Text, View, Platform, TouchableOpacity, StyleSheet  } from 'react-native';
import { Camera as ExpoCamera, CameraType, FlashMode } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import api from '../../services/api';
import { BASE_URL_HIDRANT_SLIKA } from '../../config';
import { Ionicons } from '@expo/vector-icons';
import mime from 'mime';

export const CameraComponent: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type] = useState(CameraType.back);
  const [image, setImage] = useState<string | null>(null);
  const [flash, setFlash] = useState(FlashMode.off);
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
    if (image) {
      let formData = new FormData();
      let newImageUri =  "file:///" + image.split("file:/").join("");
      let nameParts = image.split('/');
      let name = nameParts[nameParts.length - 1];
      let type = mime.getType(newImageUri);

      formData.append('image', {
        uri: newImageUri,
        type: type,
        name: name
      } as any);

      try {
        let response = await api.post(`${BASE_URL_HIDRANT_SLIKA}/1`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const toggleFlash = () => {
    setFlash(flash === FlashMode.off ? FlashMode.on : FlashMode.off);
  };

  return (
    <View style={{ flex: 1 }}>
    <ExpoCamera style={{ flex: 1 }} type={type} flashMode={flash} ref={cameraRef}>
      <View style={styles.container}>
        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

        <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
          <Ionicons name={flash === FlashMode.off ? "flash-off-outline" : "flash-outline"} size={30} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <Ionicons name="camera-outline" size={40} color="#fff" />
        </TouchableOpacity>

        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
            <Ionicons name="images-outline" size={30} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={handleSubmit}>
            <Ionicons name="checkmark-circle-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </ExpoCamera>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 50,
  },
  captureButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 50,
    padding: 20,
    paddingHorizontal: 25,
    alignSelf: 'center',
    margin: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  iconButton: {
    padding: 10,
  },
  imagePreview: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 100, 
    height: 100
  },
  flashButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});