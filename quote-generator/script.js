//select element
const quoteContainer = document.getElementById('quotebox');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const whatsappBtn = document.getElementById('whatsapp');
const newQtBtn = document.getElementById('new-qt');
const loader = document.getElementById('loader');
let apiQuotes = [];
let errorCount = 0;


//show loading
function showLoadingSpinner() {
    //initial state hide loader
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Generate new Quote randomly
function newQuote(){
    showLoadingSpinner();
    // Pick a random quote from ApiQuotes Array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if the authour is available, if not availalbe replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else{
        authorText.textContent = quote.author;
    }

    //Check quote length to determine styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    //set the quote content, hide loader
    quoteText.textContent = quote.text;
    hideLoadingSpinner();
    // console.log(quote);
}

// Get Quote From API
async function getQuote(){
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
       
    } catch (error) {
         // Stop recursive calls after 10 errors
         if (errorCount < 10) {
            errorCount++;
            return;
        } else {
            console.error('Too many errors fetching quote.', error);
            hideLoadingSpinner();
        }
    }
}

// Tweet Quote 

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    //open a new tab with pre-populated content
    window.open(twitterUrl, '_blank');
}

function whatsappQuote() {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${quoteText.textContent} - ${authorText.textContent}`;
    //open a new tab with pre-populated content
    window.open(whatsappUrl, '_blank');
}

// Event listeners

newQtBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)
whatsappBtn.addEventListener('click', whatsappQuote)


// On load, call function

getQuote();
