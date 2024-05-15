document.addEventListener("DOMContentLoaded", function() {
    fetchNews();
    fetchFinanceUpdates();
    fetchMarketPrices();
});

function fetchNews() {
    const apiKey = '99f57d700b7b4071aa86f902d59649a2';
    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById('news-container');
            newsContainer.innerHTML = '';
            data.articles.forEach(article => {
                const newsItem = document.createElement('div');
                newsItem.innerHTML = `
                    <h3>${article.title}</h3>
                    <p>${article.description || ''}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                `;
                newsContainer.appendChild(newsItem);
            });
        })
        .catch(error => console.error('Error fetching news:', error));
}

function fetchFinanceUpdates() {
    const apiKey = '74ON6F11ZYZCRWND';
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const financeContainer = document.getElementById('finance-container');
            financeContainer.innerHTML = `
                <p>IBM Stock Price: $${data['Global Quote']['05. price']}</p>
            `;
        })
        .catch(error => console.error('Error fetching finance updates:', error));
}

function fetchMarketPrices() {
    const alphaVantageApiKey = '74ON6F11ZYZCRWND';
    const sp500Symbol = 'SPX';
    const dowSymbol = 'DJIA';
    const nasdaqSymbol = 'IXIC';

    const coinGeckoApiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd';

    // Fetch S&P 500 price
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${sp500Symbol}&apikey=${alphaVantageApiKey}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('sp500-price').textContent = `$${data['Global Quote']['05. price']}`;
        })
        .catch(error => console.error('Error fetching S&P 500 price:', error));

    // Fetch Dow Jones price
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${dowSymbol}&apikey=${alphaVantageApiKey}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('dow-price').textContent = `$${data['Global Quote']['05. price']}`;
        })
        .catch(error => console.error('Error fetching Dow Jones price:', error));

    // Fetch Nasdaq price
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${nasdaqSymbol}&apikey=${alphaVantageApiKey}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('nasdaq-price').textContent = `$${data['Global Quote']['05. price']}`;
        })
        .catch(error => console.error('Error fetching Nasdaq price:', error));

    // Fetch cryptocurrency prices
    fetch(coinGeckoApiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('btc-price').textContent = `$${data.bitcoin.usd}`;
            document.getElementById('eth-price').textContent = `$${data.ethereum.usd}`;
        })
        .catch(error => console.error('Error fetching cryptocurrency prices:', error));
}
