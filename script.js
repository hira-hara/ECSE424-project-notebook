document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".navbar a");
  const content = document.getElementById("content");

  // Function to load a page dynamically
  async function loadPage(page) {
    try {
      const response = await fetch(`pages/${page}`);
      if (!response.ok) throw new Error("Page not found");
      const html = await response.text();

      // Add Back to Home button dynamically
      content.innerHTML = `
        <div class="page-content">${html}</div>
        <a href="#" class="back-button" id="backHome">← Back to Home</a>
      `;

      // Reattach listener for back button
      document.getElementById("backHome").addEventListener("click", (e) => {
        e.preventDefault();
        loadHome();
      });
    } catch (err) {
      content.innerHTML = `<p style="color:red;">Error loading ${page}: ${err.message}</p>`;
    }
  }

  // Load home content
  function loadHome() {
    content.innerHTML = `
      <h1>Smart Mirror Luma</h1>
      <p class="subtitle">A Smart Mirror Project</p>
      <div class="team">
        <p>Ida Su Ozdemir</p>
        <p>Saif Shahin</p>
        <p>Melissa Salazar Cruz</p>
      </div>
    `;
  }

  // Attach listeners to navbar links
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute("href"); // CHANGED: Use href instead of data-page
      loadPage(page);
    });
  });
});
