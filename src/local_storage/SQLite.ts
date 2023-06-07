import * as SQLite from 'expo-sqlite';

const databaseName = 'pregled_hidrantov.db';
const databaseVersion = '9.0'; // Update the version number here

const db = SQLite.openDatabase(databaseName, databaseVersion);

export const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS hidrant (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        location TEXT,
        description TEXT,
        status TEXT,
        nadzemni INTEGER,
        lat REAL,
        lng REAL,
        createdDate TEXT,
        zadnjiPregled TEXT NULL,
        drustvoId INTEGER,
        FOREIGN KEY (drustvoId) REFERENCES drustvo(id)
      )`,
      [],
      (_, result) => {
        //console.log('Table "hidrant" created successfully');
      },
      (_, error) => {
        //console.log('Error creating table "hidrant":', error);
        return false; // Return false to indicate an error occurred
      }
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        drustvoId INTEGER,
        role TEXT,
        FOREIGN KEY (drustvoId) REFERENCES drustvo(id)
      )`,
      [],
      (_, result) => {
        //console.log('Table "user" created successfully');
      },
      (_, error) => {
        //console.log('Error creating table "user":', error);
        return false; // Return false to indicate an error occurred
      }
    );
  });

  
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS drustvo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        createdDate TEXT,
        naziv TEXT,
        email TEXT,
        naslov TEXT
      )`,
      [],
      (_, result) => {
        //console.log('Table "drustvo" created successfully');
      },
      (_, error) => {
        //console.log('Error creating table "drustvo":', error);
        return false; // Return false to indicate an error occurred
      }
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS pregled (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        opis TEXT,
        status TEXT,
        createdDate TEXT,
        userId INTEGER,
        hidrantId INTEGER,
        FOREIGN KEY (userId) REFERENCES user (id),
        FOREIGN KEY (hidrantId) REFERENCES hidrant (id)
      )`,
      [],
      (_, result) => {
        //console.log('Table "pregled" created successfully');
      },
      (_, error) => {
        //console.log('Error creating table "pregled":', error);
        return false; // Return false to indicate an error occurred
      }
    );
  });
};
export const insertData = (tableName, data) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const columnNames = Object.keys(data).join(', ');
      const placeholders = Object.keys(data).fill('?').join(', ');
      const values = Object.values(data) as (string | number)[];

      const query = `INSERT OR REPLACE INTO ${tableName} (${columnNames}) VALUES (${placeholders})`;

      tx.executeSql(
        query,
        values,
        (_, result) => {
          //console.log(`Insert into ${tableName} successful`);
          ////console.log(result); // Log the result object if needed
          const insertedId = result.insertId || data.id; // Use insertId if available, otherwise use the provided ID
          resolve(insertedId);
        },
        (_, error) => {
          //console.log(`Error inserting into ${tableName}:`, error);
          reject(error);
          return false;
        }
      );
    });
  });
};
export const clearTable = async (tableName: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM ${tableName}`,
        [],
        (_, result) => {
          //console.log(`Table "${tableName}" cleared successfully`);
          resolve();
        },
        (_, error) => {
          //console.log(`Error clearing table "${tableName}":`, error);
          return false;
        }
      );
    });
  });
};




