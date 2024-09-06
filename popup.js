document.getElementById("sendHtml").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url);
  const allowedSites = ["codeforces.com", "codechef.com"];

  if (allowedSites.includes(url.hostname)) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: sendPageHTML
    });
  } else {
    alert("This extension only works on Codeforces or CodeChef.");
  }
});

function sendPageHTML() {
  const html = document.documentElement.outerHTML;

  fetch("http://localhost:5001", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain"
    },
    body: html
  })
}

// document.getElementById("sendHtml").addEventListener("click", async () => {
//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   const url = new URL(tab.url);
//   const allowedSites = ["codeforces.com", "codechef.com"];

//   if (allowedSites.includes(url.hostname)) {
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       function: sendPageHTML
//     });
//   } else {
//     alert("This extension only works on Codeforces or CodeChef.");
//   }
// });

// function sendPageHTML() {
//   const html = document.documentElement.outerHTML;

//   // Create a JSON object with the HTML content
//   const payload = {
//     html: html,
//     url: window.location.href
//   };

//   fetch("http://localhost:49999", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(payload) // Send data as JSON
//   })
//     .then(response => {
//       if (response.ok) {
//         alert("HTML sent successfully!");
//       } else {
//         alert("Failed to send HTML.");
//       }
//     })
//     .catch(error => {
//       alert("Error sending HTML: " + error);
//     });
// }
