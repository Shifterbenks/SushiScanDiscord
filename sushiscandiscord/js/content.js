
let lastSentPage = "";

function getPageNumberFromDOM() {
  const select = document.getElementById('select-paged');
  if (select) {
    const selectedOption = select.options[select.selectedIndex];
    return selectedOption ? `Page ${selectedOption.text}` : "Page inconnue";
  }
  return "Page inconnue";
}

function getMangaInfo() {
  const titleEl = document.querySelector('h1[itemprop="name"]');
  const title = titleEl ? titleEl.textContent.trim() : "Inconnu";
  const page = getPageNumberFromDOM();
  return { title, page };
}

function sendPresence() {
  const { title, page } = getMangaInfo();

  // Ne renvoie que si la page a changé
  if (page !== lastSentPage) {
    lastSentPage = page;

    fetch('http://localhost:7123/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        chapter: page,
      }),
    }).catch(err => console.error('Erreur Discord RPC:', err));
  }
}

// Vérifie toutes les 500ms
setInterval(sendPresence, 500);
