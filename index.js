// accessing the DOM
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('search-input');
const wordDisplay = document.getElementById('word');
const definitionDisplay = document.getElementById('definition');
const partOfSpeech = document.getElementById('part-of-speech');
const audio = document.getElementById('audio');
// handling form submission
searchForm.addEventListener('submit', function(event) {

    event.preventDefault();

    const word = searchInput.value;

    searchWord(word);

});

// fetching data from API
// const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;


async function searchWord(word) {

    try {
        const response = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );

        const data = await response.json();

        console.log(data);
        // displaying to the HTML page

        const wordData = data[0];

wordDisplay.textContent = wordData.word;

partOfSpeech.textContent = wordData.meanings[0].partOfSpeech;

definitionDisplay.textContent =
    wordData.meanings[0].definitions[0].definition;



    } catch (error) {

        console.log('Something went wrong:', error);

    }
 
}













