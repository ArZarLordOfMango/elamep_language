function playSound(button) {
  const soundFile = button.dataset.sound;
  const audio = new Audio(soundFile);
  audio.play();
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('dictionary.json')
      .then(response => response.json())
      .then(data => {
          const sortedWords = sortDictionary(data.words);
          displayDictionary(sortedWords);
      })
      .catch(error => console.error('Error fetching dictionary:', error));
});

const specialOrder = 'AÀÁÂÃÄ...'; // Add the full special letter order here

function sortDictionary(words) {
  return words.sort((a, b) => {
      return customCompare(a.word, b.word);
  });
}

function customCompare(word1, word2) {
  const length = Math.min(word1.length, word2.length);
  for (let i = 0; i < length; i++) {
      const index1 = specialOrder.indexOf(word1[i]);
      const index2 = specialOrder.indexOf(word2[i]);
      if (index1 !== index2) {
          return index1 - index2;
      }
  }
  return word1.length - word2.length;
}

function displayDictionary(words) {
  const dictionaryDiv = document.getElementById('dictionary');
  words.forEach(entry => {
      const wordElement = document.createElement('div');
      wordElement.innerHTML = `
          <div class="word-translate">${entry.word} (eng: ${entry.translate})</div>
          <div class="definition">${entry.definition}</div>
      `;
      dictionaryDiv.appendChild(wordElement);
  });
}