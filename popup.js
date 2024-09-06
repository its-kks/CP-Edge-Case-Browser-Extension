document.addEventListener('DOMContentLoaded', async () => {
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

