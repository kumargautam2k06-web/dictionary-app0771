const form = document.querySelector('form');
const resultDiv = document.querySelector('.result'); // Correct the selector

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word) => {
    try {
        resultDiv.innerHTML = "Fetching Data..."; // Show loading message
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        let definitions = data[0].meanings[0].definitions[0];

        resultDiv.innerHTML =
            `<h2><strong>Word:</strong> ${data[0].word}</h2>
            <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
            <p><strong>Meaning:</strong> ${definitions.definition === undefined ? "Not Found" : definitions.definition}</p>
            <p><strong>Example:</strong> ${definitions.example === undefined ? "Not Found" : definitions.example}</p>
            <p><strong>Antonyms:</strong><ul id="antonyms-list"></ul>
            <p><strong>Synonyms:</strong><ul id="synonyms-list"></ul>
            `;

        // Fetching Antonyms
        const antonymsList = document.querySelector('#antonyms-list');
        if (definitions.antonyms && definitions.antonyms.length > 0) {
            definitions.antonyms.forEach((antonym) => {
                antonymsList.innerHTML += `<li>${antonym}</li>`;
            });
        } else {
            antonymsList.innerHTML = `<span>Not Found</span>`;
        }

        // Fetching Synonyms
        const synonymsList = document.querySelector('#synonyms-list');
        if (definitions.synonyms && definitions.synonyms.length > 0) {
            definitions.synonyms.forEach((synonym) => {
                synonymsList.innerHTML += `<li>${synonym}</li>`;
            });
        } else {
            synonymsList.innerHTML = `<span>Not Found</span>`;
        }

        // Adding Read More Button
        resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;

    } catch (error) {
        resultDiv.innerHTML = `<p>Sorry, the word could not be found</p>`;
    }
};
