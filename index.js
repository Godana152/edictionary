
// 1. Accessing the DOM
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('search-input');

const wordDisplay = document.getElementById('word');
const nounDisplay = document.getElementById('noun');
const verbDisplay = document.getElementById('verb');
const originDisplay = document.getElementById('origin');
const pronunciationDisplay = document.getElementById('pronunciation');


// 2. Handling form submission
searchForm.addEventListener('submit', function(event) {

    event.preventDefault();

    const word = searchInput.value.trim();

    if (!word) {
        return;
    }

    searchWord(word);

    searchInput.value = '';

});


// 3. Fetching data from the API
async function searchWord(word) {

    wordDisplay.textContent="kindly wait ,loading..."

    try {

        const response = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );

        if (!response.ok) {
            throw new Error('Word not found');
        }

        const data = await response.json();

        // 4. Getting the first word returned
        const wordData = data[0];

        // Display the searched word
        wordDisplay.textContent = wordData.word;

        // 5. Finding noun meaning
        const noun = wordData.meanings.find(
            meaning => meaning.partOfSpeech === 'noun'
        );

        // 6. Finding verb meaning
        const verb = wordData.meanings.find(
            meaning => meaning.partOfSpeech === 'verb'
        );

        // 7. Displaying noun meaning
        nounDisplay.textContent = noun
            ? noun.definitions[0].definition
            : 'No noun meaning found';

        // Displaying verb meaning
        verbDisplay.textContent = verb
            ? verb.definitions[0].definition
            : 'No verb meaning found';

        // 8. Displaying origin
        originDisplay.textContent =
            wordData.origin || 'Origin unavailable';

        // 9. Displaying pronunciation
        const phonetic = wordData.phonetic ||
            wordData.phonetics.find(p => p.text)?.text;

        pronunciationDisplay.textContent =
            phonetic || 'Pronunciation unavailable';

    } catch (error) {

        // Displaying errors
        wordDisplay.textContent = error.message;

        nounDisplay.textContent = '';
        verbDisplay.textContent = '';
        originDisplay.textContent = '';
        pronunciationDisplay.textContent = '';

    }
}

