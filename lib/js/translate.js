function getUserLang() {
	const defautLang = "fr";
	let lang = navigator.language || navigator.userLanguage || defautLang;
	const params = new URLSearchParams(document.location.search);
	if (params && params.get("lang")) {
		lang = params.get("lang");
	}
	return lang.split("-")[0];
}

function translate(key) {
	const currentLang = getUserLang();
	const translations = uiTexts[currentLang];
	return translations[key];
}

function applyTranslations() {
	document.querySelectorAll("[data-i18n]").forEach((el) => {
		const key = el.getAttribute("data-i18n");
		el.textContent = translate(key);
	});
	document.querySelector("#pdfUrl").placeholder = translate("enterPDFurl");
	document.querySelector("#quoteInput").placeholder = translate("writeNote");
}

function applyTranslationsPDFbuttons() {
	document.querySelector(".df-ui-zoomin").title = translate("zoomIn");
	document.querySelector(".df-ui-zoomout").title = translate("zoomOut");
	document.querySelector(".df-ui-fullscreen").title =
		translate("useFullScreen");
	if (document.querySelector(".df-ui-print")) {
		document.querySelector(".df-ui-print").title = translate("print");
	}
	if (document.querySelector(".df-ui-share")) {
		document.querySelector(".df-ui-share").title = translate("share");
	}
	document.querySelector(".df-ui-prev").title = translate("previousPage");
	document.querySelector(".df-ui-next").title = translate("nextPage");
}
