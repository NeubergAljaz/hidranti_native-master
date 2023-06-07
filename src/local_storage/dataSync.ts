// dataSync.ts
import * as SQLite from 'expo-sqlite';
import api from '../services/api';
import { BASE_URL_HIDRANT, BASE_URL_HIDRANT_PREGLED } from '../config';
import { CustomToast } from '../components/Toasts/CustomToast';
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
    
    //console.log('Data synchronized with the API successfully!');
    CustomToast('Uspešna sinhronizacija s podatkovno bazo', 'error');
  } catch (error) {
    //console.log('Error synchronizing data with the API:', error);
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
          //console.log('Error retrieving hidrants from the database:', error);
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
          //console.log('Error retrieving pregleds from the database:', error);
          return false;
        }
      );
    });
  });
};



const sendHidrantsToAPI = async (hidrants: any[]) => {
  for (const hidrant of hidrants) {
    try {
      const isAlreadySent = await checkHidrantExistsInAPI(hidrant.id, parseFloat(hidrant.lat.toFixed(7)), parseFloat(hidrant.lng.toFixed(7)));
      if (await isAlreadySent) {
        //console.log('Hidrant already exists in the API:', hidrant.id);
        continue;
      }
  
        // Send the hidrant data to the API
        const data = {
          id: hidrant.id,
          title: hidrant.title,
          location: hidrant.location,
          description: hidrant.description,
          status: hidrant.status,
          nadzemni: hidrant.nadzemni,
          lat: parseFloat(hidrant.lat.toFixed(7)), 
          lng: parseFloat(hidrant.lng.toFixed(7)),
          createdDate: hidrant.createdDate,
          zadnjiPregled: hidrant.zadnjiPregled,
          drustvoId: hidrant.drustvoId,
        };
        //console.log('Hidrant data sent to the API:', data.lat, data.lng);
        const response = await api.post(BASE_URL_HIDRANT, data);
        //console.log('Hidrant data sent to the API:', response.data.lat, response.data.lng);
      } catch (error) {
        //console.log('Error sending hidrant data to the API:', error);
      }
    }
  };
  
  const checkHidrantExistsInAPI = async (hidrantId: number, lat: number, lng: number): Promise<boolean> => {
    try {
      const response = await api.get(BASE_URL_HIDRANT);
      const hidrants = response.data;
  
      for (const existingHidrant of hidrants) {
        if (existingHidrant.lat === lat && existingHidrant.lng === lng) {
          //console.log(existingHidrant.id + "=" + hidrantId);
          //console.log(existingHidrant.title + "=" + title);
          return true; // Hidrant with the same id or title exists
        } 
      }
      return false;
    } catch (error) { 
      //console.log('Error checking hidrant existence in the API:', error);
      return false; // Error occurred
    }
  };
  
  const sendPregledsToAPI = async (pregleds: any[]) => {
    for (const pregled of pregleds) {
      try {
        const isAlreadySent = await checkPregledExistsInAPI(pregled.hidrantId, pregled.createdDate);
        if (await isAlreadySent) {
          //console.log('Pregled already exists in the API:', pregled.id);
          continue; // Skip sending this pregled
        }
    
        // Send the pregled data to the API
        const data = {
          id: pregled.id,
          opis: pregled.opis,
          status: pregled.status,
          createdDate: pregled.createdDate,
          userId: pregled.userId,
          hidrantId: pregled.hidrantId,
        };

        const response = await api.post(`${BASE_URL_HIDRANT_PREGLED}/${pregled.hidrantId}`, data);
        //console.log('Pregled data sent to the API:', response.data);
      } catch (error) {
        //console.log('Error sending pregled data to the API:', error);
      }
    }
  };
  
  const checkPregledExistsInAPI = async (pregledHidrantId: number, createdDate: string): Promise<boolean> => {
    try {
      // Perform a request to the API to check if the pregled with the given ID and createdDate exists
      const response = await api.get(BASE_URL_HIDRANT_PREGLED);
      const pregledi = response.data;
      for(const existingPregled of pregledi){
        if (existingPregled.hidrantId === pregledHidrantId && existingPregled.createdDate === createdDate) {
        // Pregled with the same hidrnat ID and createdDate already exists in the API
        return true;
        }
      }
      
      return false;
    } catch (error) {
      //console.log('Error checking pregled existence in the API:', error);
      return false;
    }
  };

