const shortcuts = [["", ""]];

function handleURL(url) {
	if (url !== "") {
		// Vérification de la présence d'un raccourci
		const shortcut = shortcuts.find((element) => element[0] == url);
		if (shortcut) {
			url = shortcut[1];
			// Si on a un raccourci, on n'a pas besoin de traiter correctement l'url
			return url;
		}
		// Gestion des fichiers hébergés sur github
		if (url.startsWith("https://github.com")) {
			url = url.replace(
				"https://github.com",
				"https://raw.githubusercontent.com"
			);
			url = url.replace("/blob/", "/");
		}
		// Gestion des fichiers hébergés sur Nuage
		if (url.includes("nuage") && !url.includes("download")) {
			url = url + "/download";
		}
	}
	return url;
}
