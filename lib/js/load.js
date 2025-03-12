var isRTL = false; // Default to LTR
var currentPdf = "./assets/readme.pdf"; // Default PDF URL

// Function to load the flipbook
function loadFlipbook(pdfUrl, rtlMode, config) {
  let pageMode = config && config.pageMode ? config.pageMode : "AUTO";
	let singlePageMode =
		config && config.singlePageMode ? config.singlePageMode : "AUTO";
	let openPage = config && config.openPage ? config.openPage : 1;

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
  const endPage = endPageParam && Number(endPageParam) > 0 ? Number(endPageParam) : false;
  if(endPage) {
    const newStyleElement = document.createElement('style')
    newStyleElement.innerHTML = ".df-ui-print{display:none}";
    document.body.appendChild(newStyleElement);
  }

  var options = {
    height: "100%",
    duration: 700,
    backgroundColor: "#2F2D2F",
    direction: rtlMode ? 2 : 1, // Use 2 for RTL and 1 for LTR
    text: {
      loading: "Chargement du ",
      close: "Annuler",
    },
    pageMode: pageMode,
    singlePageMode: singlePageMode,
    openPage: openPage,
    drag3D: true,
    beforeFlip: function (flipBook) {
      const pageNumber = flipBook.getCurrentLabel();
      if(endPage && pageNumber > endPage) {
        flipBook.gotoPage(1);
      }
    },
    onFlip: function (flipBook) {
      const pageNumber = flipBook.getCurrentLabel();
      if(endPage && pageNumber > endPage) {
        flipBook.gotoPage(1);
      }
    },
  };

  $("#flipbookContainer").empty();
  $("#flipbookContainer").flipBook(pdfUrl, options);
}

// Initial call to load the flipbook
$(document).ready(function () {
  if (currentPdf) {
    loadFlipbook(currentPdf, isRTL);
  }
});
