import { db, getAllQuotes, addOrUpdateQuote, deleteQuote } from "./db.js";
import { displayQuotes, exportQuotes, toggleQuotePanel } from "./ui.js";

// Ensure the database is initialized before doing anything
function initializeApp() {
	if (window.dbInitialized) {
		loadQuotes();
	} else {
		// Retry after a short delay if the DB isn't initialized yet
		setTimeout(initializeApp, 100);
	}
}

function loadQuotes() {
	getAllQuotes(displayQuotes);
}

document.getElementById("addQuoteBtn").addEventListener("click", function () {
	const quoteId = this.getAttribute("data-id");
	const newQuote = document.getElementById("quoteInput").value.trim();

	if (newQuote) {
		addOrUpdateQuote(quoteId, newQuote, () => {
			loadQuotes();
			document.getElementById("quoteInput").value = "";
			this.removeAttribute("data-id");
			this.textContent = translate("addNote");
		});
	} else {
		alert(translate("alertNoNote"));
	}
});

document.addEventListener("click", function (event) {
	if (event.target.classList.contains("editQuoteBtn")) {
		const id = event.target.getAttribute("data-id");
		const transaction = db.transaction("quotes", "readonly");
		const store = transaction.objectStore("quotes");

		store.get(id).onsuccess = function () {
			const quoteElement = document.querySelector(
				`.quote-item[data-id="${id}"]`
			);
			const quoteText = quoteElement.querySelector(".quote-text").textContent;
			const quoteInputElement = document.getElementById("quoteInput");
			quoteInputElement.value = quoteText;
			const addButton = document.getElementById("addQuoteBtn");
			addButton.setAttribute("data-id", id);
			addButton.textContent = translate("updateNote");
		};
	}
	if (event.target.classList.contains("deleteQuoteBtn")) {
		const id = event.target.getAttribute("data-id");
		deleteQuote(Number(id), loadQuotes);
	}
});

document
	.getElementById("exportQuotesBtn")
	.addEventListener("click", exportQuotes);
document
	.getElementById("toggleQuotePanelBtn")
	.addEventListener("click", toggleQuotePanel);

// Initialize app once the database is ready
initializeApp();
