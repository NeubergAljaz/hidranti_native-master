import React, { useEffect } from 'react';
import { syncDataWithAPI } from './dataSync';
import { UseConnectivity } from '../Hooks/UseConnectivityHook';

const SyncDataComponent: React.FC = () => {

  const isConnected = UseConnectivity();

  useEffect(() => {
    const checkConnectivityInterval = setInterval(() => {
      // Check connectivity and sync data with API
      if(isConnected){
         syncDataWithAPI();
      }
    }, 60000);

    // Clear the interval when the component unmounts
    return () => clearInterval(checkConnectivityInterval);
  }, []);

  return null;
};

export default SyncDataComponent;