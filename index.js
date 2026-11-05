
// 1. Accessing the DOM
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('search-input');
const wordDisplay = document.getElementById('word');
const meaningsDisplay = document.getElementById('meanings');

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


// Fetching data from the API
async function searchWord(word) {

    try {
        const response = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );

        if (!response.ok) {
            throw new Error('Word not found');
        }

        const data = await response.json();

        // Get the first word returned
        const wordData = data[0];

        // Display the word
        wordDisplay.textContent = wordData.word;

        // Get noun meaning
        const noun = wordData.meanings.find(
            meaning => meaning.partOfSpeech === 'noun'
        );

        // Get verb meaning
        const verb = wordData.meanings.find(
            meaning => meaning.partOfSpeech === 'verb'
        );

        // Display noun
        nounDisplay.textContent = noun
            ? noun.definitions[0].definition
            : 'No noun meaning found';

        // Display verb
        verbDisplay.textContent = verb
            ? verb.definitions[0].definition
            : 'No verb meaning found';

        // Display origin
        originDisplay.textContent = wordData.origin || 'Origin unavailable';

        // Display pronunciation
        pronunciationDisplay.textContent =
            wordData.phonetic ||
            wordData.phonetics.find(p => p.text)?.text ||
            'Pronunciation unavailable';

    } catch (error) {

        wordDisplay.textContent = error.message;

    }
}

        

    //  catch (error) {

    //     wordDisplay.textContent = 'Word not found';

    //     meaningsDisplay.textContent = 'Please check your spelling and try again.';

    //     console.log('Something went wrong:', error);

    // }


