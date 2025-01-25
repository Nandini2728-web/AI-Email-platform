document.getElementById("generateSuggestions").addEventListener("click", async function () {
    const subject = document.getElementById("subject").value;
    const content = document.getElementById("content").value;
  
    if (!subject || !content) {
      alert("Please fill out both fields!");
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:5000/generate-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, content }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        const suggestionsList = document.getElementById("suggestionsList");
        suggestionsList.innerHTML = ""; // Clear previous suggestions
        result.suggestions.forEach((suggestion) => {
          const li = document.createElement("li");
          li.textContent = suggestion;
          suggestionsList.appendChild(li);
        });
      } else {
        alert(result.error || "Failed to generate suggestions.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while generating suggestions.");
    }
  });
  
  document.getElementById("emailForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const subject = document.getElementById("subject").value;
    const content = document.getElementById("content").value;
    const toEmail = prompt("Enter recipient email:");
  
    if (!toEmail) {
      alert("Recipient email is required!");
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to_email: toEmail, subject, content }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert(result.message || "Email sent successfully!");
      } else {
        alert(result.error || "Failed to send email.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the email.");
    }
  });