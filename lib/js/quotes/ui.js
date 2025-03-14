import { getAllQuotes } from "./db.js";

export function displayQuotes(quotes) {
	const quoteList = document.querySelector("#quoteList");
	while (quoteList.firstChild) {
		quoteList.removeChild(quoteList.firstChild);
	} // Clear the current list

	quotes.forEach((quote) => {
		quoteList.insertAdjacentHTML(
			"beforeend",
			`
      <li class="quote-item flex items-center justify-between mb-2" data-id="${
				quote.id
			}">
        <span class="quote-text">${quote.quote}</span>
        <div class="flex space-x-2">
          <button class="editQuoteBtn px-2 py-1 bg-gray-800 text-white border border-gray-600 rounded-md shadow-md hover:bg-gray-700 transition-all" data-id="${
						quote.id
					}">${translate("editNote")}</button>
          <button class="deleteQuoteBtn px-2 py-1 bg-slate-900 text-white border border-slate-700 rounded-md shadow-md hover:bg-slate-800 transition-all" data-id="${
						quote.id
					}">${translate("deleteNote")}</button>
        </div>
      </li>
    `
		);
	});
}

export function exportQuotes() {
	getAllQuotes((quotes) => {
		if (quotes.length === 0) {
			alert(translate("alertnoNotesToExport"));
			return;
		}

		const quotesText = quotes.map((q) => q.quote).join("\n");
		const blob = new Blob([quotesText], { type: "text/plain" });
		const url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.href = url;
		a.download = "notes.txt";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url); // Clean up the URL.createObjectURL
	});
}

export function toggleQuotePanel() {
	$("#quoteNotesPanel").toggleClass("hidden");

	if ($("#quoteNotesPanel").hasClass("hidden")) {
		$("#toggleQuotePanelBtn").text(translate("myNotes"));
	} else {
		$("#toggleQuotePanelBtn").text(translate("hideNotes"));
	}
}
