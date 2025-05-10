// Description: JavaScript code for the second page of the web app
// This code handles the text input and pronunciation features of the web app
// It allows the user to type text and have it pronounced back to them

const textInput = document.getElementById("textInput");
const pronunciationDiv = document.getElementById("pronunciation");
let lastSpokenKey = ""; // Stores the last spoken key to avoid repetition
let lastSpokenText = ""; // Stores the last spoken text to avoid repetition
let timeout = null; // Define timeout globally

// Function to pronounce keys
function pronounceKey(key) {
    if (key !== lastSpokenKey) {
        const synth = window.speechSynthesis;
        if (synth.speaking) {
            synth.cancel(); // Stop previous speech before speaking a new key
        }
        const utterThis = new SpeechSynthesisUtterance(key);
        utterThis.lang = 'en-US';
        synth.speak(utterThis);
        lastSpokenKey = key; // Store last spoken key
    }
}

// Listen for keyboard events and pronounce each key
textInput.addEventListener("keydown", function(event) {
    let key = event.key;

    // Allow normal typing and pronounce each letter
    if (!event.ctrlKey && !event.altKey) {
        pronounceKey(key);
    }
});

// Listen for input changes and read the full text with punctuation support
textInput.addEventListener("input", function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        let inputText = textInput.value;
        pronunciationDiv.textContent = inputText; // Display text in the output section

        // Ensure punctuation and symbols are pronounced
        const punctuationMap = {
            '!': ' exclamation mark ',
            '.': ' period ',
            ',': ' comma ',
            ':': ' colon ',
            ';': ' semicolon ',
            "'": ' apostrophe ',
            '"': ' quotation mark ',
            '?': ' question mark ',
            '-': ' dash ',
            '|': ' vertical bar ',
            '(': ' open parenthesis ',
            ')': ' close parenthesis ',
            '{': ' open curly bracket ',
            '}': ' close curly bracket ',
            '[': ' open square bracket ',
            ']': ' close square bracket ',
            '<': ' less than ',
            '>': ' greater than '
        };
        
        let spokenText = inputText.replace(/[!.,:;"'?|\-(){}\[\]<>]/g, match => punctuationMap[match] || match);

        // Only speak if the input has changed
        if (spokenText !== "" && spokenText !== lastSpokenText) {
            const synth = window.speechSynthesis;
            if (synth.speaking) {
                synth.cancel(); // Stop previous speech before speaking new text
            }
            const utterThis = new SpeechSynthesisUtterance(spokenText);
            utterThis.lang = 'en-US';
            synth.speak(utterThis);
            lastSpokenText = spokenText; // Store spoken text
        }
    }, 500); // Delay to prevent instant repetition
});
