// Boîte modale simple pour remplacer la boîte confirm lors du partage
function showShareModal() {
	// Création de l'overlay
	const overlay = document.createElement("div");
	overlay.id = "shareModalOverlay";
	overlay.style.cssText =
		"position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;";

	// Création de la boîte modale
	const modal = document.createElement("div");
	modal.style.cssText =
		"background:#1F2937;color:#fff;border:1px solid #8B6F6F;border-radius:12px;padding:24px;max-width:560px;width:90%;box-shadow:0 10px 30px rgba(0,0,0,0.5);";

	// Titre
	const title = document.createElement("h3");
	title.textContent = translate("shareTitle");
	title.style.cssText = "margin:0 0 20px;font-size:18px;font-weight:700;";

	// URL du flipbook sans l'interface
	const shareUrl = getShareUrl();

	// Code HTML de l'iframe d'intégration
	const iframeCode = getIframeCode(shareUrl);

	// Bloc : lien du flipbook
	const linkBlock = createShareBlock(
		translate("shareLinkLabel"),
		shareUrl,
		"text",
	);

	// Bloc : code HTML de l'iframe
	const iframeBlock = createShareBlock(
		translate("shareIframeLabel"),
		iframeCode,
		"textarea",
	);

	modal.appendChild(title);
	modal.appendChild(linkBlock);
	modal.appendChild(iframeBlock);
	overlay.appendChild(modal);

	// Fermer en cliquant sur l'overlay (en dehors de la modale)
	overlay.addEventListener("click", (event) => {
		if (event.target === overlay) {
			document.body.removeChild(overlay);
		}
	});

	document.body.appendChild(overlay);
}

// Crée un bloc (label + champ + bouton copier) dans la modale
function createShareBlock(labelText, value, fieldType) {
	const block = document.createElement("div");
	block.style.cssText = "margin-bottom:20px;";

	// Label
	const label = document.createElement("label");
	label.textContent = labelText;
	label.style.cssText =
		"display:block;margin-bottom:8px;font-size:13px;color:#D1D5DB;";

	// Champ (input ou textarea)
	const field = document.createElement(fieldType);
	if(fieldType === "textarea") {
		field.value = value;
		field.rows = 4;
	}
	if (fieldType === "text") {
		field.textContent = value;
	}
	field.readOnly = true;
	field.style.cssText =
		"width:400px;box-sizing:border-box;padding:8px 10px;background:#111827;color:#EAEAEA;border:1px solid #8B6F6F;border-radius:8px;font-size:13px;font-family:monospace;resize:vertical;overflow:auto;";

	// Conteneur champ + bouton
	const row = document.createElement("div");
	row.style.cssText = "display:flex;gap:10px;align-items:stretch;";

	// Bouton copier
	const copyBtn = document.createElement("button");
	copyBtn.textContent = translate("copyToClipboard");
	copyBtn.style.cssText =
		"flex-shrink:0;padding:8px 16px;background:#4B3C3C;color:#EAEAEA;border:1px solid #8B6F6F;border-radius:8px;cursor:pointer;white-space:nowrap;height:45px;";
	copyBtn.addEventListener("mouseenter", () => {
		copyBtn.style.background = "#3E3232";
	});
	copyBtn.addEventListener("mouseleave", () => {
		copyBtn.style.background = "#4B3C3C";
	});
	copyBtn.addEventListener("click", () => {
		copyToClipboard(value);
		copyBtn.textContent = translate("copiedToClipboard");
		setTimeout(() => {
			copyBtn.textContent = translate("copyToClipboard");
		}, 2000);
	});

	row.appendChild(field);
	row.appendChild(copyBtn);

	block.appendChild(label);
	block.appendChild(row);

	return block;
}

// Récupère l'URL du flipbook sans l'interface (?m=0)
function getShareUrl() {
	let url = new URL(window.location);
	url.searchParams.set("m", "0");
	return url.toString();
}

// Génère le code HTML de l'iframe d'intégration
function getIframeCode(shareUrl) {
	return (
		'<iframe src="' +
		shareUrl +
		'" width="100%" height="600" frameborder="0" allowfullscreen></iframe>'
	);
}

// Copie du texte dans le presse-papiers
function copyToClipboard(text) {
	navigator.clipboard.writeText(text).catch((err) => {
		console.error(translate("errorWithCopyToClipboard"), err);
	});
}
