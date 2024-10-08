document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url);
  const allowedSites = ["codeforces.com", "codechef.com"];
  let mark = document.querySelector('.mark');
  if (allowedSites.includes(url.hostname)) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: sendPageHTML
    });
    mark.innerHTML = "✅ Open VS Code";
  } else {
    mark.textContent = "❌ Unsupported";
  }
});

function sendPageHTML() {
  const html = document.documentElement.innerHTML;

  fetch("http://localhost:49876", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain"
    },
    body: html
  })
}


setTimeout(() => {
  window.close();
}, 3000);
