document.addEventListener("DOMContentLoaded", () => {
    // Verify if the user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "login.html";
      return;
    }
  
    // Fetch financial data from the server
    fetch("/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        renderCharts(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  
    // Logout functionality
    document.getElementById("logout").addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "login.html";
    });
  });
  
  // Render charts
  function renderCharts(data) {
    // Income vs. Expenses Chart
    const incomeExpenseChart = new Chart(document.getElementById("incomeExpenseChart"), {
      type: "bar",
      data: {
        labels: ["Income", "Expenses"],
        datasets: [
          {
            label: "Amount ($)",
            data: [data.income, data.expenses],
            backgroundColor: ["#4CAF50", "#FF5252"]
          }
        ]
      }
    });
  
    // Investment Growth Chart
    const investmentGrowthChart = new Chart(document.getElementById("investmentGrowthChart"), {
      type: "line",
      data: {
        labels: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"],
        datasets: [
          {
            label: "Investment Value ($)",
            data: data.investmentGrowth,
            borderColor: "#3E95CD",
            fill: false
          }
        ]
      }
    });
  }
  