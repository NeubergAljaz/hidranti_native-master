import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export const UseLocationPermission = () => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setHasPermission(false);
        return;
      }

      setHasPermission(true);
    })();
  }, []);

  return hasPermission;
};