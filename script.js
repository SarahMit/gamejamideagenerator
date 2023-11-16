var selectedValues = {};

document.addEventListener("DOMContentLoaded", function () {
    ///// Load CSV file /////
    fetch("https://sarahmit.github.io/gamejamideagenerator/gameideas.csv")
        .then(response => response.text())
        .then(csv => {
            ///// Parse CSV /////
            const rows = csv.split('\n');
            const headers = rows[0].split(';');

            // Store data in an array of objects
            const data = [];
            for (let i = 1; i < rows.length; i++) {
                const values = rows[i].split(';');

                // Check if the number of values matches the number of headers
                if (values.length === headers.length) {
                    const entry = {};
                    headers.forEach((header, index) => {
                        entry[header.trim()] = values[index].trim();
                    });
                    data.push(entry);
                } else {
                    console.warn(`Skipping row ${i + 1} because the number of values does not match the number of headers.`);
                }
            }

            // Store the data and headers globally
            window.csvData = data;
            window.csvHeaders = headers;

            // Populate the columns checkbox
            const checkboxContainer = document.getElementById('checkbox-container');
            checkboxContainer.classList.add('checkbox');
            headers.forEach(header => {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = header;
                checkbox.checked = true; // Initially, all checkboxes are checked
                //checkbox.addEventListener('change', generateRandom);
                
                const label = document.createElement('label');
                label.htmlFor = header;
                label.appendChild(document.createTextNode(header));

                checkboxContainer.appendChild(checkbox);
                checkboxContainer.appendChild(label);

                selectedValues[header] = "~";
            });
        })
        .catch(error => console.error("Error fetching CSV:", error));
});


function generateRandom() {

    // Get locked columns and values
    const lockedColumns = [];
    const lockedValues = {};
    // For all columns in csv
    window.csvHeaders.forEach(column => {
        const checkbox = document.getElementById(column);
        if (checkbox.checked) {
            const columnValues = window.csvData.map(entry => entry[column]);
            const randomIndex = Math.floor(Math.random() * columnValues.length);
            selectedValues[column] = (columnValues[randomIndex]);
        }
    });

    displayResult(selectedValues);
}

function displayResult(entry) {
    const resultContainer = document.getElementById('result-container');

    // Clear previous result
    resultContainer.innerHTML = '';

    // Display each selected column and its value
    for (const key in entry) {
        const titleContainer = document.createElement('div');
        titleContainer.classList.add('fancycontent');

        const value = document.createElement('h1');
        value.innerHTML = entry[key];

        const title = document.createElement('span');
        title.innerHTML = key;

        value.appendChild(title);
        titleContainer.appendChild(value);

        resultContainer.appendChild(titleContainer);
    }
}
