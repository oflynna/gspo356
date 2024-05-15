document.addEventListener("DOMContentLoaded", function() {
    fetchNews();
    fetchFinanceUpdates();
    fetchMarketPrices();
});

function fetchNews() {
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_NEWS_API_KEY')
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById('news-container');
            data.articles.forEach(article => {
                const newsItem = document.createElement('div');
                newsItem.innerHTML = `<h3>${article.title}</h3><p>${article.description}</p><a href="${article.url}" target="_blank">Read more</a>`;
                newsContainer.appendChild(newsItem);
            });
        })
        .catch(error => console.error('Error fetching news:', error));
}

function fetchFinanceUpdates() {
    // Placeholder: Replace with actual API call to fetch finance updates
    const financeContainer = document.getElementById('finance-container');
    financeContainer.innerHTML = '<p>Finance update content goes here...</p>';
}

function fetchMarketPrices() {
    // Placeholder: Replace with actual API call to fetch market prices
    const marketsContainer = document.getElementById('markets-container');
    marketsContainer.innerHTML = `
        <p>S&P 500: <span id="sp500-price">Loading...</span></p>
        <p>Dow Jones: <span id="dow-price">Loading...</span></p>
        <p>NASDAQ: <span id="nasdaq-price">Loading...</span></p>
        <p>Bitcoin: <span id="btc-price">Loading...</span></p>
    `;

    // Example: Fetch Bitcoin price from CoinGecko
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
            document.getElementById('btc-price').textContent = `$${data.bitcoin.usd}`;
        })
        .catch(error => console.error('Error fetching Bitcoin price:', error));
}
