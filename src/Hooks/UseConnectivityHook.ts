import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { CustomToast } from '../components/Toasts/CustomToast';

export const UseConnectivity = () => {
  const [isConnected, setConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const wasConnected = isConnected;
      const nowConnected = state.isConnected;

      setConnected(nowConnected);

      if (wasConnected && !nowConnected) {
        CustomToast('Izgubljena povezava z internetom', 'error');
      } else if (!wasConnected && nowConnected) {
        CustomToast('Povezava z internetom vzpostavljena', 'info');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [isConnected]);

  return isConnected;
};