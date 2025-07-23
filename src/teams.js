import { headers } from "next/headers";
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

async function showTeams() {
    const content = document.getElementById("content");

     // create table
     const table = document.createElement("table");
     table.className = "min-w-full rounded-lg overflow-hidden shadow-sm"
     table.innerHTML = `
     <thead class="bg-purple-900 text-white">
        <tr>
            <th class="px-4 py-3 text-center">Pos</th>
            <th class="px-4 py-3 text-left">Team</th>
            <th class="px-4 py-3 text-center">PI</th>
            <th class="px-4 py-3 text-center">W</th>
            <th class="px-4 py-3 text-center">D</th>
            <th class="px-4 py-3 text-center">L</th>
            <th class="px-4 py-3 text-center">GF</th>
            <th class="px-4 py-3 text-center">GA</th>
            <th class="px-4 py-3 text-center">GD</th>
            <th class="px-4 py-3 text-center">Pts</th>
        </tr>
     </thead>
     <tbody class="bg-white text-[#37003c]"></tbody>
     
     `;
     content.appendChild(table);

     const tbody = document.querySelector("tbody");
    //  get api endpoint
     const standings = await fetchData("/standings?league=39&season=2023");
     const teams = standings[0].league.standings[0];

     teams.forEach(team => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="px-4 py-4 text-center font-bold">${team.rank}</td>
            <td class="px-4 py-4 flex items-center gap-2 font-bold">
                <img src="${team.team.logo}" alt="${team.team.name}" class="w-6"/>
                ${team.team.name}
            </td>
            <td class="px-4 py-4 text-center text-sm">${team.all.played}</td>
            <td class="px-4 py-4 text-center text-sm">${team.all.win}</td>
            <td class="px-4 py-4 text-center text-sm">${team.all.draw}</td>
            <td class="px-4 py-4 text-center text-sm">${team.all.lose}</td>
            <td class="px-4 py-4 text-center text-sm">${team.all.goals.for}</td>
            <td class="px-4 py-4 text-center text-sm">${team.all.goals.against}</td>
            <td class="px-4 py-4 text-center text-sm">${team.goalsDiff}</td>
            <td class="px-4 py-4 text-center font-bold">${team.points}</td>
        `;
        tbody.appendChild(row);
     })



}

showTeams();