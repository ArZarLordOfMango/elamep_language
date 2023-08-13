function playSound(button) {
  const soundFile = button.dataset.sound;
  const audio = new Audio(soundFile);
  audio.play();
}
const order = 'abcĉgsнiţøkьрřхуÿñшδеωыqжψmпəλςΞ';

function customSort(words, customOrder) {
  function compareStrings(a, b) {
    const minLength = Math.min(a.length, b.length);
    for (let i = 0; i < minLength; i++) {
      const orderA = customOrder.indexOf(a[i]);
      const orderB = customOrder.indexOf(b[i]);
      if (orderA !== orderB) {
        return orderA - orderB;
      }
    }
    return a.length - b.length;
  }
  words.sort(compareStrings);
  return words;
}

fetch('dictionary.json')
    .then(response => response.json())
    .then(data => {
        let sortedData = customSort(Object.keys(data), order);

        let dictionaryContent = document.getElementById('dictionary');
        sortedData.forEach(key => {
            let term = key;
            let definition = data[key];
            let entry = document.createElement('p');
            entry.textContent = `${term} — ${definition}`;
            dictionaryContent.appendChild(entry);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });