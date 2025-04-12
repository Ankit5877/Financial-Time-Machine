// Select elements
const form = document.getElementById("userForm");
const insightsSection = document.getElementById("insights-section");
const insightsDiv = document.getElementById("insights");

// Backend URL
const backendUrl = "http://localhost:5001/api/users";

/**
 * Handle form submission
 */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Gather form data
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const income = parseFloat(document.getElementById("income").value);
  const expenses = parseFloat(document.getElementById("expenses").value);
  const investments = parseFloat(document.getElementById("investments").value || 0);

  // Validate inputs
  if (income <= 0 || expenses < 0 || investments < 0) {
    alert("Please enter valid positive numbers for financial details.");
    return;
  }

  const formData = { name, email, income, expenses, investments };

  try {
    // Send data to backend
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      displayInsights(data); // Display insights based on response
      form.reset(); // Reset form
    } else {
      alert(data.message || "An error occurred while submitting your data.");
    }
  } catch (error) {
    alert("Error: Unable to connect to the server. Please try again later.");
    console.error(error);
  }
});

/**
 * Display financial insights
 * @param {Object} data - Data returned from the backend
 */
function displayInsights(data) {
  const { name, income, expenses, investments } = data;

  // Financial calculations
  const savings = income - expenses;
  const annualSavings = savings * 12;
  const projectedWealth = (annualSavings + investments) * 5; // 5 years projection

  // Populate insights section
  insightsDiv.innerHTML = `
    <p>Welcome, <strong>${name}</strong>!</p>
    <ul>
      <li><strong>Monthly Income:</strong> ₹${income.toFixed(2)}</li>
      <li><strong>Monthly Expenses:</strong> ₹${expenses.toFixed(2)}</li>
      <li><strong>Current Investments:</strong> ₹${investments.toFixed(2)}</li>
      <li><strong>Monthly Savings:</strong> ₹${savings.toFixed(2)}</li>
      <li><strong>Projected Wealth (5 years):</strong> ₹${projectedWealth.toFixed(2)}</li>
    </ul>
    <p>Keep up the good work! Consider reducing your expenses to save more for the future.</p>
  `;

  // Reveal insights section
  insightsSection.hidden = false;
}


// Carousel Functionality
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

prevBtn.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

nextBtn.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

// FAQ Toggle Functionality
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    answer.style.display = answer.style.display === "block" ? "none" : "block";
  });
});


function getStarted() {
    window.location.href = "index.html"
}