// script.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("simulation-form");
    const inputData = document.getElementById("input-data");
    const resultSection = document.getElementById("result-section");
    const resultDiv = document.getElementById("result");
    const historySection = document.createElement("section");
    historySection.id = "history-section";
    historySection.innerHTML = "<h2>Simulation History</h2><ul id='history-list'></ul>";
    document.body.appendChild(historySection);

    // Data structure to store simulation results
    const results = [];

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const value = inputData.value;

        // Fetch data from a sample API or simulate fetching data
        const fetchedData = await fetchData(value);

        // Add the result to the data structure
        results.push({ input: value, output: fetchedData });

        // Update the result section with the latest result
        updateResult(fetchedData);

        // Update the history section
        updateHistory();

        // Log all results to the console
        console.log("Simulation Results:", results);
    });

    async function fetchData(value) {
        // Fetch data from a static API or simulate the process
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts/" + value);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            return `Fetched result for input ${value}: ${data.title}`;
        } catch (error) {
            return `Failed to fetch data for input ${value}. ${error.message}`;
        }
    }

    function updateResult(data) {
        resultDiv.textContent = data;
        resultSection.style.display = "block";

        // Apply animation
        gsap.fromTo(
            resultDiv,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1 }
        );
    }

    function updateHistory() {
        const historyList = document.getElementById("history-list");
        historyList.innerHTML = ""; // Clear existing history
        results.forEach((result, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `#${index + 1}: Input = ${result.input}, Output = ${result.output}`;
            historyList.appendChild(listItem);
        });

        // Apply animation to the history section
        gsap.fromTo(
            historyList,
            { opacity: 0 },
            { opacity: 1, duration: 1 }
        );
    }
});
