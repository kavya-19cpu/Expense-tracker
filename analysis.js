let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let total = 0, high = 0, low = Infinity;
let category = {};

expenses.forEach(e => {

    total += e.amount;
    high = Math.max(high, e.amount);
    low = Math.min(low, e.amount);

    category[e.category] = (category[e.category] || 0) + e.amount;
});

document.getElementById("total").innerText = total;
document.getElementById("high").innerText = high;
document.getElementById("low").innerText = low === Infinity ? 0 : low;

document.getElementById("avg").innerText =
    expenses.length ? (total / expenses.length).toFixed(2) : 0;

// PIE CHART
new Chart(document.getElementById("chart"), {
    type: "pie",
    data: {
        labels: Object.keys(category),
        datasets: [{
            data: Object.values(category),

            backgroundColor: [
                "#FF69B4", // Pink
                "#00008B", // Dark Blue
                "#1E90FF", // Light Blue
                "#73e373", // Light Green
                "#006400", // Dark Green
                "#FFA500", // Orange
                "#800080",  // Purple
                "#FF0000" // Red
            ]
        }]
    }
});
