import {faker} from '@faker-js/faker';

function generateRandomWords(count) {
  const wordsList = [];
  for (let i = 0; i < count; i++) {
    const word = faker.word.sample();
    wordsList.push(word);
  }
  return wordsList;
}   

export default generateRandomWords;