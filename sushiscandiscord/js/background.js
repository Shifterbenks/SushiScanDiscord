chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "sendUpdate") {
    fetch('http://localhost:7123/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: request.title,
        chapter: request.chapter
      })
    })
    .then(res => res.json())
    .then(data => sendResponse(data))
    .catch(err => sendResponse({error: err.toString()}));
    return true; // keep the messaging channel open for async response
  }
});
