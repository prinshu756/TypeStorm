import {faker} from '@faker-js/faker';

function generateRandomWords(count) {
  const wordsList = [];
  for (let i = 0; i < count; i++) {
    const word = faker.word.noun();
    wordsList.push(word);
  }
  console.log(wordsList);   

  return wordsList;
}   

generateRandomWords(9)

export default generateRandomWords;