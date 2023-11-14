document.addEventListener("DOMContentLoaded", function () {
    // Load CSV file
    fetch("gameideas.csv")
        .then(response => response.text())
        .then(csv => {
            // Parse CSV
            const rows = csv.split('\n');
            const headers = rows[0].split(';');

            // Store data in an array of objects
            const data = [];
            for (let i = 1; i < rows.length; i++) {
                const values = rows[i].split(';');
                const entry = {};
                headers.forEach((header, index) => {
                    entry[header.trim()] = values[index].trim();
                });
                data.push(entry);
            }

            // Store the data and headers globally
            window.csvData = data;
            window.csvHeaders = headers;

            // Populate the columns dropdown
            const columnsSelect = document.getElementById('columns');
            headers.forEach(header => {
                const option = document.createElement('option');
                option.value = header;
                option.text = header;
                columnsSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching CSV:", error));
});

function generateRandom() {
    // Get selected columns
    const selectedColumns = Array.from(document.getElementById('columns').selectedOptions).map(option => option.value);

    if (selectedColumns.length === 0) {
        alert("Please select at least one column.");
        return;
    }

    // Get a random index
    const randomIndex = Math.floor(Math.random() * window.csvData.length);

    // Get a random entry
    const randomEntry = window.csvData[randomIndex];

    // Filter the entry to include only selected columns
    const filteredEntry = {};
    selectedColumns.forEach(column => {
        filteredEntry[column] = randomEntry[column];
    });

    // Display the result
    displayResult(filteredEntry);
}

function displayResult(entry) {
    const resultContainer = document.getElementById('result-container');

    // Clear previous result
    resultContainer.innerHTML = '';

    // Display each selected column and its value
    for (const key in entry) {
        const columnDiv = document.createElement('div');
        columnDiv.innerHTML = `<strong>${key}:</strong> ${entry[key]}`;
        resultContainer.appendChild(columnDiv);
    }
}
