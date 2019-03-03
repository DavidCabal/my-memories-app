import Admin from 'firebase-admin';
import * as keyJson from './cendi-71685-b8759ff5d314.json';
import { loginKey } from '../loginKey.js';

Admin.initializeApp({
  credential: Admin.credential.cert(keyJson)
});
var db = Admin.firestore();
const collection = db.collection('memories');

const login = async (value) => {
  return value === loginKey;
};

const saveMemory = (body) => {
  if (body.text == null) {
    throw new Error("body cannot be null");
  }
  const saveDate = Date();
  return collection.doc(saveDate).set({
    text: body.text,
    fullDate: saveDate,
    month: (new Date().getUTCMonth() + 1),
    year: new Date().getUTCFullYear()
  })
    .then(() => {
      return 200;
    })
    .catch(error => error);
};

const retrieveMemories = () => {
  let returnDocs = [];
  return collection.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        returnDocs.push(doc.data());
      });
      return returnDocs;
    })
    .catch(error => error);
};

const retrieveMemoriesByYear = (year) => {
  let returnDocs = [];
  return collection.where('year', '==', parseInt(year)).get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        returnDocs.push(doc.data());
      });
      return returnDocs;
    })
    .catch(error => error);
};

const retrieveMemoriesByMonthAndYear = (month, year) => {
  let returnDocs = [];
  return collection
    .where('month', '==', parseInt(month))
    .where('year', '==', parseInt(year))
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        returnDocs.push(doc.data());
      });
      return returnDocs;
    })
    .catch(error => error);
};

export { login, saveMemory, retrieveMemories, retrieveMemoriesByYear, retrieveMemoriesByMonthAndYear };