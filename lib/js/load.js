var isRTL = false; // Default to LTR
var currentPdf = "./assets/readme.pdf"; // Default PDF URL
let hideOptions = false;
const togglePanelBtn = document.querySelector("#togglePanelBtn");
const inputPanel = document.querySelector("#inputPanel");
// On récupère l'URL du hashtag sans le #
const urlHash = window.location.hash.substring(1).replace(/\?.*/, "");
const params = new URLSearchParams(document.location.search);
let hideMenu = params && params.get("m") && params.get("m") == 0 ? true : false;
const hideInterfaceButton =
	params && params.get("i") && params.get("i") == 0 ? true : false;

function getPDF(pdfUrl, rtlMode, config) {
	let pageMode = config && config.pageMode ? config.pageMode : "AUTO";
	let singlePageMode =
		config && config.singlePageMode ? config.singlePageMode : "AUTO";
	let openPage = config && config.openPage ? config.openPage : 1;
	hideOptions = config && config.hideOptions ? config.hideOptions : hideOptions;

	// Récupération des paramètres dans l'URL pour définir config
	let params = new URLSearchParams(document.location.search);
	// Paramètre "p" pour définir la page qu'on affiche
	let openPageParam = params.get("p");
	openPage = openPageParam ? openPageParam : openPage;
	// Paramètre "v" pour définir la vue : "1" pour ne voir qu'une page à la fois (sinon c'est 2 pages par défaut)
	let isSinglePageModeParam = params.get("v");
	pageMode = isSinglePageModeParam === "1" ? "single" : pageMode;
	singlePageMode = isSinglePageModeParam === "1" ? "booklet" : singlePageMode;
	// Paramètre "e" pour définir la page finale "endPage" afin de cacher une partie d'un document
	const endPageParam = params.get("e");
	const endPage =
		endPageParam && Number(endPageParam) > 0 ? Number(endPageParam) : false;
	if (endPage) {
		const newStyleElement = document.createElement("style");
		newStyleElement.innerHTML = ".df-ui-print{display:none}";
		document.body.appendChild(newStyleElement);
	}

	var options = {
		height: "100%",
		duration: 700,
		backgroundColor: "#2F2D2F",
		direction: rtlMode ? 2 : 1, // Use 2 for RTL and 1 for LTR
		text: {
			loading: translate("loadingOf"),
			close: translate("cancel"),
		},
		pageMode: pageMode,
		singlePageMode: singlePageMode,
		openPage: openPage,
		drag3D: true,
		beforeFlip: function (flipBook) {
			const pageNumber = flipBook.getCurrentLabel();
			if (endPage && pageNumber > endPage) {
				flipBook.gotoPage(openPage);
			}
		},
		onFlip: function (flipBook) {
			const pageNumber = flipBook.getCurrentLabel();
			if (endPage && pageNumber > endPage) {
				flipBook.gotoPage(openPage);
			}
		},
		onCreateUI: function (flipbook) {
			applyTranslationsPDFbuttons();
			if ((config && config.showShareBtn) || (urlHash && !endPage)) {
				const shareBtn = document.querySelector(".df-ui-share");
				shareBtn.style.display = "block";
				shareBtn.addEventListener("click", function (event) {
					// Création de la boîte de dialogue
					const confirmation = confirm(translate("confirmCopyToClipboard"));

					// Récupération de l'URL actuelle
					let url = new URL(window.location);

					// Si l'utilisateur choisit "OK", on ajoute ?m=0
					if (confirmation) {
						url.searchParams.set("m", "0");
					}

					// Copier l'URL modifiée dans le presse-papiers
					navigator.clipboard.writeText(url.toString()).catch((err) => {
						console.error(translate("errorWithCopyToClipboard"), err);
					});
				});
			}
			const moreBtn = document.querySelector(".df-ui-more");
			moreBtn.title = translate("info");
			moreBtn.addEventListener("click", function (event) {
				window.open(
					"https://forge.apps.education.fr/pdf2flip/pdf2flip.forge.apps.education.fr"
				);
			});
			if (!endPage) {
				const pdflink = urlHash ? urlHash : pdfUrl;
				const buttonsPanel = document.querySelector(".df-ui");
				const downloadLink = document.createElement("a");
				downloadLink.download = "";
				downloadLink.target = "_blank";
				downloadLink.className = "df-ui-btn df-ui-download df-icon-download";
				downloadLink.href = pdflink;
				downloadLink.title = translate("downloadPDF");
				const span = document.createElement("span");
				span.textContent = translate("downloadPDF");
				downloadLink.appendChild(span);
				buttonsPanel.insertBefore(downloadLink, moreBtn);
			}
		},
	};

	$("#flipbookContainer").empty();
	$("#flipbookContainer").flipBook(pdfUrl, options);
	if (hideOptions) {
		inputPanel.style.display = "none";
		togglePanelBtn.textContent = translate("selectPDF");
	}
}

const corsProxies = [
	"https://corsproxy.io/?url=",
	"https://api.cors.lol/?url=",
	"https://api.codetabs.com/v1/proxy/?quest=",
];

// Fonction pour charger le flipbook
function loadFlipbook(pdfUrl, rtlMode, config) {
	const optionsFetch = pdfUrl.startsWith("blob") ? {} : { method: "HEAD" };
	pdfUrl = handleURL(pdfUrl);
	// On essaie d'abord de charger le PDF directement
	fetch(pdfUrl, optionsFetch)
		.then((response) => {
			// Vérifie si le Content-Type est un PDF
			if (
				response.ok &&
				response.headers.get("Content-Type").includes("application/pdf")
			) {
				getPDF(pdfUrl, rtlMode, config);
			} else {
				throw new Error(translate("alertNoValidFile"));
			}
		})
		.catch(() => {
			// Si la tentative échoue, on essaie les proxys
			tryNextProxy(pdfUrl, rtlMode, config, 0);
		});
}

// Fonction pour essayer les proxys de manière enchaînée
function tryNextProxy(pdfUrl, rtlMode, config, index) {
	if (index < corsProxies.length) {
		const proxyUrl = corsProxies[index] + pdfUrl;

		// Essayer le proxy actuel
		fetch(proxyUrl)
			.then((response) => {
				// Vérifier si le Content-Type est un PDF
				if (
					response.ok &&
					response.headers.get("Content-Type").includes("application/pdf")
				) {
					getPDF(proxyUrl, rtlMode, config);
				} else {
					// Si ce n'est pas un PDF valide, essayer le proxy suivant
					tryNextProxy(pdfUrl, rtlMode, config, index + 1);
				}
			})
			.catch(() => {
				// Si ça échoue, essayer le proxy suivant
				tryNextProxy(pdfUrl, rtlMode, config, index + 1);
			});
	} else {
		// Si aucun proxy ne fonctionne
		alert(translate("alertNoValidURL"));
	}
}

// Initial call to load the flipbook
$(document).ready(function () {
	if (currentPdf) {
		loadFlipbook(currentPdf, isRTL);
	}
});
