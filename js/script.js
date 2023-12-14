// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', async function () {

    // Fetch references to various DOM elements
    const showAirportInfoBtn = document.getElementById("showAirportInfoBtn");
    const airportInput = document.getElementById("airportInput");
    const airportTable = document.getElementById("airportTable");
    const airportData = document.getElementById("airportData");
    const errorMessage = document.getElementById("errorMessage");
    const showStudentInfoBtn = document.getElementById("showStudentInfoBtn");
    const studentInfo = document.getElementById("student-info");

    // Event listener for displaying student information
    showStudentInfoBtn.addEventListener("click", function () {
        // Display student information when the button is clicked
        studentInfo.innerHTML = `Student ID: 200543614 | Name: Malkit Kaur`;
    });

    // Event listener for fetching and displaying airport information
    showAirportInfoBtn.addEventListener("click", function () {
        // Get the trimmed input value from the airport input field
        const input = airportInput.value.trim();
        if (input) {
            // If input is not empty, fetch data for the provided airport name
            fetchData(input);
        } else {
            // If the input is empty, show an error message
            errorMessage.textContent = "Please enter an airport name or no data found.";
        }
    });

    // Async function to fetch airport data from the API
    async function fetchData(airportName) {
        // Format the airport name for URL and define API endpoint
        const formattedAirportName = airportName.replace(/\s/g, '%20');
        const url = `https://airports-by-api-ninjas.p.rapidapi.com/v1/airports?name=${formattedAirportName}`;
        const apiKey = 'c9e0a4ba2amshd6e8924bcab22e8p1c950djsnf2e6332bbced';

        // Set up options for the fetch request
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'airports-by-api-ninjas.p.rapidapi.com'
            }
        };

        try {
            // Fetch data from the API
            const response = await fetch(url, options);
            const result = await response.json();

            // Process and display the fetched airport data
            if (Array.isArray(result) && result.length > 0) {
                airportTable.style.display = "table"; // Show the airport table
                airportData.innerHTML = ''; // Clear previous content

                // Display the airport details in a table
                result.slice(0, 10).forEach((airport) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${airport.icao}</td>
                        <td>${airport.iata}</td>
                        <td>${airport.name}</td>
                        <td>${airport.city}</td>
                        <td>${airport.region}</td>
                        <td>${airport.country}</td>
                        <td>${airport.elevation_ft}</td>
                        <td>${airport.latitude}</td>
                        <td>${airport.longitude}</td>
                        <td>${airport.timezone}</td>
                    `;
                    airportData.appendChild(row);
                });
            } else {
                // If no data found, show an error message
                displayErrorMessage("No data found for the provided airport name.");
                errorMessage.textContent = "Please enter an airport name or no data found.";
            }
        } catch (error) {
            // If there is an error during the fetch operation, show an error message
            console.error(error);
            displayErrorMessage("An error occurred while fetching data. Please try again.");
        }
    }

    // Function to display error messages and hide the airport table
    function displayErrorMessage(message) {
        airportTable.style.display = "none";
        airportData.innerHTML = `<tr><td colspan="10">${message}</td></tr>`;
    }
});
