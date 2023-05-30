// dataSync.ts
import * as SQLite from 'expo-sqlite';
import api from '../services/api';
import { BASE_URL_HIDRANT, BASE_URL_HIDRANT_PREGLED } from '../config';

const db = SQLite.openDatabase('pregled_hidrantov.db');

export const syncDataWithAPI = async () => {
  try {
    // Retrieve the data from the SQLite database
    const hidrants = await retrieveHidrantsFromDatabase();
    const pregleds = await retrievePregledsFromDatabase();

    // Send the hidrants to the API
    await sendHidrantsToAPI(hidrants);

    // Send the pregleds to the API
    await sendPregledsToAPI(pregleds);

    console.log('Data synchronized with the API successfully!');
  } catch (error) {
    console.error('Error synchronizing data with the API:', error);
  }
};

const retrieveHidrantsFromDatabase = () => {
  return new Promise<any[]>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM hidrant',
        [],
        (_, result) => {
          const hidrants: any[] = [];
          for (let i = 0; i < result.rows.length; i++) {
            hidrants.push(result.rows.item(i));
          }
          resolve(hidrants);
        },
        (_, error) => {
          console.error('Error retrieving hidrants from the database:', error);
          return false;
        }
      );
    });
  });
};

const retrievePregledsFromDatabase = () => {
  return new Promise<any[]>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM pregled',
        [],
        (_, result) => {
          const pregleds: any[] = [];
          for (let i = 0; i < result.rows.length; i++) {
            pregleds.push(result.rows.item(i));
          }
          resolve(pregleds);
        },
        (_, error) => {
          console.error('Error retrieving pregleds from the database:', error);
          return false;
        }
      );
    });
  });
};

const sendHidrantsToAPI = async (hidrants: any[]) => {
    for (const hidrant of hidrants) {
      // Check if the hidrant is already present in the API by comparing IDs or any other unique identifier
      const isAlreadySent = await checkHidrantExistsInAPI(hidrant.id);
      if (isAlreadySent) {
        console.log('Hidrant already exists in the API:', hidrant.id);
        continue; // Skip sending this hidrant
      }
  
      // Send the hidrant data to the API
      const data = {
        title: hidrant.title,
        location: hidrant.location,
        description: hidrant.description,
        status: hidrant.status,
        nadzemni: hidrant.nadzemni,
        lat: hidrant.lat,
        lng: hidrant.lng,
        createdDate: hidrant.createdDate,
        zadnjiPregled: hidrant.zadnjiPregled,
        drustvoId: hidrant.drustvoId,
      };
      try {
        const response = await api.post(BASE_URL_HIDRANT, data);
        console.log('Hidrant data sent to the API:', response.data);
      } catch (error) {
        console.error('Error sending hidrant data to the API:', error);
      }
    }
  };
  
  const checkHidrantExistsInAPI = async (hidrantId: number): Promise<boolean> => {
    try {
      // Perform a request to the API to check if the hidrant with the given ID exists
      const response = await api.get(`${BASE_URL_HIDRANT}/${hidrantId}`);
      return response.data !== null;
    } catch (error) {
      console.error('Error checking hidrant existence in the API:', error);
      return false;
    }
  };
  
  const sendPregledsToAPI = async (pregleds: any[]) => {
    for (const pregled of pregleds) {
      // Check if the pregled is already present in the API by comparing IDs or any other unique identifier
      const isAlreadySent = await checkPregledExistsInAPI(pregled.id);
      if (isAlreadySent) {
        console.log('Pregled already exists in the API:', pregled.id);
        continue; // Skip sending this pregled
      }
  
      // Send the pregled data to the API
      const data = {
        opis: pregled.opis,
        status: pregled.status,
        createdDate: pregled.createdDate,
        userId: pregled.userId,
        hidrantId: pregled.hidrantId,
      };
      try {
        const response = await api.post(`${BASE_URL_HIDRANT_PREGLED}/${pregled.hidrantId}`, data);
        console.log('Pregled data sent to the API:', response.data);
      } catch (error) {
        console.error('Error sending pregled data to the API:', error);
      }
    }
  };
  
  const checkPregledExistsInAPI = async (pregledId: number): Promise<boolean> => {
    try {
      // Perform a request to the API to check if the pregled with the given ID exists
      const response = await api.get(`${BASE_URL_HIDRANT_PREGLED}/${pregledId}`);
      return response.data !== null;
    } catch (error) {
      console.error('Error checking pregled existence in the API:', error);
      return false;
    }
  };
