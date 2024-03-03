// Function to fetch data using .then
// function fetchDataWithThen() {
//     fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
//         .then(response => response.json())
//         .then(data => renderData(data))
//         .catch(error => console.error('Error fetching data:', error));
// }
function fetchDataWithThen() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => {
            console.log('Data obtained:', data); // Log the data to console
            renderData(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}


// Function to fetch data using async/await
async function fetchDataWithAsyncAwait() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        console.log(data);
        renderData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to render data in table
function renderData(data) {
    const tableBody = document.getElementById('coinTableBody');
    tableBody.innerHTML = '';

    data.forEach(coin => {
        const row = document.createElement('tr');
        // Determine CSS class based on percentage change value
        const changeClass = coin.market_cap_change_percentage_24h < 0 ? 'negative-change' : 'positive-change';
        row.innerHTML = `
            <td>${coin.name}</td>
            <td>${coin.id}</td>
            <td><img src="${coin.image}" alt="${coin.name}" width="50"></td>
            <td>${coin.symbol}</td>
            <td>${coin.current_price}</td>
            <td class="${changeClass}">${coin.market_cap_change_percentage_24h}%</td>
            <td>Mkt Cap: $${coin.total_volume}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to search and filter data
function searchData() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#coinTableBody tr');

    rows.forEach(row => {
        const name = row.querySelector('td:first-child').textContent.toLowerCase();
        const symbol = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
        
        if (name.includes(searchInput) || symbol.includes(searchInput)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Function to sort data by market cap
function sortByMarketCap() {
    const tableBody = document.getElementById('coinTableBody');
    const rows = Array.from(tableBody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        const capA = parseFloat(a.children[6].textContent.replace(/[^0-9.-]+/g, ''));
        const capB = parseFloat(b.children[6].textContent.replace(/[^0-9.-]+/g, ''));
        return capB - capA;
    });

    rows.forEach(row => tableBody.appendChild(row));
}

// Function to sort data by percentage change
function sortByPercentageChange() {
    const tableBody = document.getElementById('coinTableBody');
    const rows = Array.from(tableBody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        const percentChangeA = parseFloat(a.children[5].textContent.replace(/[^0-9.-]+/g, ''));
        const percentChangeB = parseFloat(b.children[5].textContent.replace(/[^0-9.-]+/g, ''));
        return percentChangeB - percentChangeA;
    });

    rows.forEach(row => tableBody.appendChild(row));
}

// Initial data fetch with .then
fetchDataWithThen();


