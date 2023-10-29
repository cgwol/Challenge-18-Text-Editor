import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => console.error('putDb not implemented');

export const putDb = async (content) => {
  console.log('PUT to database');
  const db = await openDB('jate', 1);
  const transaction = db.transaction('jate', 'readwrite');
  const store = transaction.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log(result);
};

// TODO: Add logic for a method that gets all the content from the database
// export const getDb = async () => console.error('getDb not implemented');

// Export a function we will use to GET data/content from the database
export const getDb = async () => {
  console.log('GET from database');
  const db = await openDB('jate', 1);
  const transaction = db.transaction('jate', 'readonly');
  const store = transaction.objectStore('jate');
  const request = store.get(1);
  const result = await request;

  if (result) {
    console.log('Successfully received database', result.value);
    return result.value;
  } else {
    console.log('Error Getting Database');
    return undefined;
  };
};

initdb();
