// const quoteElement = document.getElementById("quote");
//     const authorElement = document.getElementById("author");

//     // 1. Preload famous quotes (Steve Jobs, Oprah Winfrey, Elon Musk, Mark Zuckerberg)
//     const famousQuotes = [
//       { quote: "Pursuing your passion.", author: "Steve Jobs" },
//       { quote: "You become what you trust.", author: "Oprah Winfrey" },
//       { quote: "Work harder than anyone you know.", author: "Elon Musk" },
//       { quote: "Always learn and improve yourself.", author: "Mark Zuckerberg" }
//     ];

//     // 2. Display a random quote from the famous quotes list
//     const displayRandomQuote = () => {
//       const randomIndex = Math.floor(Math.random() * famousQuotes.length);
//       const randomQuote = famousQuotes[randomIndex];

//       // Update the UI with the random quote
//       quoteElement.innerHTML = randomQuote.quote;
//       authorElement.innerHTML = randomQuote.author;
//     };

//     // 3. On page load, display a random quote
//     window.onload = displayRandomQuote;
let favorites = [];
window.addEventListener('DOMContentLoaded', function () {
    let btn = document.getElementById('btn');
    let output = document.getElementById('output');
    let saveFavoriteBtn = document.getElementById('save-favorite-btn');
    let viewFavoritesBtn = document.getElementById('view-favorites-btn');
    let searchInput = document.getElementById('search');
    let addQuoteBtn = document.getElementById('add-quote-btn');
    let newQuoteInput = document.getElementById('new-quote-input');

    let quotes = 
    [
    '"Người bi quan thấy khó khăn trong mọi cơ hội. Người lạc quan thấy cơ hội trong mọi khó khăn." - Winston Churchill',
    '"Đừng để ngày hôm qua chiếm quá nhiều thời gian của ngày hôm nay." - Will Rogers',
    '"Vấn đề không phải là bạn có bị đánh ngã hay không, mà là bạn có đứng lên được hay không." - Vince Lombardi',
    '"Nếu bạn đang làm việc trên điều gì đó mà bạn thực sự quan tâm, bạn không cần phải bị thúc đẩy. Tầm nhìn sẽ kéo bạn." - Steve Jobs',
    '"Những người đủ điên để nghĩ rằng họ có thể thay đổi thế giới, chính là những người làm được điều đó." - Rob Siltanen',
    '"Thất bại sẽ không bao giờ đánh bại tôi nếu quyết tâm thành công của tôi đủ mạnh." - Og Mandino',
    '"Các doanh nhân rất giỏi trong việc đối phó với sự không chắc chắn và cũng rất giỏi trong việc giảm thiểu rủi ro. Đó là doanh nhân điển hình." - Mohish Pabrai',
    '"Chúng ta có thể gặp nhiều thất bại nhưng chúng ta không được bị đánh bại." - Maya Angelou',
    '"Biết chưa đủ; phải áp dụng. Muốn chưa đủ; phải làm." - Johann Wolfgang von Goethe',
    ];

    function displayRandomQuote() {
        var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        output.innerHTML = randomQuote;
    }

    // Search function to find matching quotes
    function searchQuotes(query) {
        let searchResult = quotes.filter(quote => quote.toLowerCase().includes(query.toLowerCase()));
        if (searchResult.length > 0) {
            output.innerHTML = searchResult.join("<br><br>");  // Display all matching quotes
        } else {
            output.innerHTML = "No quotes found.";
        }
    }

    // Add new quote
    function addNewQuote(newQuote) {
        quotes.push(newQuote);
        alert('New quote added successfully!');
    }

    // Save the current quote to favorites
    function saveToFavorites() {
        let currentQuote = output.innerHTML;
        if (currentQuote && !favorites.includes(currentQuote)) {
            favorites.push(currentQuote);
            alert('Quote saved to favorites!');
        } else {
            alert('This quote is already in your favorites or no quote to save.');
        }
    }

    // Display all favorite quotes
    function viewFavorites() {
        if (favorites.length > 0) {
            output.innerHTML = '';
            favorites.forEach((quotes, index) =>{
                let quoteDiv = document.createElement('div');
                quoteDiv.className = 'quote-card';
                quoteDiv.style.marginBottom = '10px';
                quoteDiv.innerHTML= `
                <p>${quotes}</q>
                <button class="delete-btn" data-index="${index}">Delete</button>
                <button class="share-btn" data-quote="${quotes}">Share</button>
                `;
                output.appendChild(quoteDiv);
            });

            if (favorites.length >= 2) {
                appendAdditionalCards();  // Call the function to append cards
            }

            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', function () {
                    let quoteIndex = this.getAttribute('data-index');
                    deleteFavorite(quoteIndex);  // Call delete function with the selected index
                });
            });
            document.querySelectorAll('.share-btn').forEach(button => {
                button.addEventListener('click', function () {
                    let quoteToShare = this.getAttribute('data-quote');
                    shareQuote(quoteToShare);  // Call share function with the selected quote
                });
            });
        } else {
            output.innerHTML = "You don't have any favorite quotes yet.";
        }
    }

    function shareQuote(quote) {
        let encodedQuote = encodeURIComponent(quote);  // URL encode the quote
        let shareUrl = prompt('Choose a platform: Facebook or Twitter?', 'Facebook');
        
        if (shareUrl.toLowerCase() === 'facebook') {
            window.open(`https://www.facebook.com/sharer/sharer.php?quote=${encodedQuote}`, '_blank');
        } else if (shareUrl.toLowerCase() === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?text=${encodedQuote}`, '_blank');
        } else {
            alert('Invalid platform choice. Please choose Facebook or Twitter.');
        }
    }

    function deleteFavorite(index) {
        favorites.splice(index, 1);  // Remove the quote from the favorites array
        alert('Quote deleted from favorites!');
        viewFavorites();  // Refresh the list of favorite quotes
    }

    // On page load, display a random quote
    window.onload = displayRandomQuote;

    // On button click, display a random quote
    btn.addEventListener('click', displayRandomQuote);



    btn.addEventListener('click', function(){
        var randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
        output.innerHTML = randomQuote;
    })

    displayRandomQuote();

    // Handle search input
    searchInput.addEventListener('input', function() {
        let query = searchInput.value;
        if (query) {
            searchQuotes(query);  // Search and display results
        } else {
            displayRandomQuote();  // Display a random quote when search is cleared
        }
    });

    // Handle adding a new quote
   
    addQuoteBtn.addEventListener('click', function() {
        let newQuote = newQuoteInput.value;
        if (newQuote) {
            addNewQuote(newQuote);
            newQuoteInput.value = '';  // Clear input after adding
        } else {
            alert('Please enter a valid quote.');
        }
    });
    

    // Event listener for random quote button
    btn.addEventListener('click', displayRandomQuote);
    saveFavoriteBtn.addEventListener('click', saveToFavorites);
    viewFavoritesBtn.addEventListener('click', viewFavorites);
});