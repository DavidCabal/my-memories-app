import Firestore from '@google-cloud/firestore';
import { firebaseConfig } from './db-config';

const firestore = new Firestore(firebaseConfig);

const collection = firestore.collection('memories');

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
    });
};

const retrieveMemories = () => {
  let returnDocs = [];
  return collection.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        returnDocs.push(doc.data());
      });
      return returnDocs;
    });
};

const retrieveMemoriesByYear = (year) => {
  let returnDocs = [];
  return collection.where('year', '==', parseInt(year)).get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        returnDocs.push(doc.data());
      });
      return returnDocs;
    });
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
    });
};

export { saveMemory, retrieveMemories, retrieveMemoriesByYear, retrieveMemoriesByMonthAndYear };