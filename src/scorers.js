import "./style.css"

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = "https://v3.football.api-sports.io";

async function fetchData(endpoint) {
    const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "GET",
        headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": apiKey
        }
    });
    const data = await response.json();
    return data.response;
    
}

async function showTopScorers() {
    const content = document.getElementById("content");

    // create table
    const table = document.createElement("table");
    table.className = "min-w-full rounded-lg overflow-hidden shadow-sm";
    table.innerHTML = `
    <thead class="bg-purple-900 text-white">
        <tr>
            <th class="px-4 py-3 text-center">Rank</th>
            <th class="px-4 py-3 text-left">Player</th>
            <th class="px-4 py-3 text-center">Matches</th>
            <th class="px-4 py-3 text-center">Goals</th>
        </tr>
    </thead>
    <tbody class="bg-white text-gray-800"></tbody>
    `;
    content.appendChild(table);

    const tbody = document.querySelector("tbody");
    const scorers = await fetchData("/players/topscorers?season=2023&league=39");

    scorers.slice(0, 10).forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="px-4 py-4 text-center">${index + 1}</td>
            <td class="px-4 py-4">
                <p class="font-bold mb-2 text-lg">${item.player.name}</p>
                    <div class="flex items-center gap-2">
                        <img src="${item.statistics[0].team.logo}" alt="Team Logo" class="w-6 "/>
                         <p class="text-sm text-gray-500">${item.statistics[0].team.name}</p>
                    </div>
            </td>
            <td class="px-4 py-4 text-center">${item.statistics[0].games.appearences}</td>
            <td class="px-4 py-4 text-center font-bold text-lg">${item.statistics[0].goals.total}</td>
        `;
        tbody.appendChild(row);
    })
}

showTopScorers();