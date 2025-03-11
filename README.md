# PDF2flip

PDF2flip est une application libre et gratuite qui permet de transformer un PDF en flipbook (un livre numérique à feuilleter).

![](https://minio.apps.education.fr/codimd-prod/uploads/upload_b8185f202723da1448a5401257556975.png)


## 👩‍🔧 Comment ça marche ?

On peut lire un PDF qu'on a en local ou bien qui se trouve sur internet.

![](https://minio.apps.education.fr/codimd-prod/uploads/upload_1227de932ffea9096cf659956825244e.png)

L'outil permet également de créer des notes et de les exporter quand on a fini de lire le livre.

![](https://minio.apps.education.fr/codimd-prod/uploads/upload_5b45064b8b10310724c2879a0be2dafe.png)


![](https://minio.apps.education.fr/codimd-prod/uploads/upload_2b8f05239177dce1529af436d2d59f1b.png)

## 🌐 Partager un PDF en ligne sous forme de flipbok

Si on veut partager un PDF en ligne, sous forme de flipbook, on met l'URL de son PDF derrière l'URL de pdf2flip suivie d'un hashtag.

`https://pdf2flip.forge.apps.education.fr/#URL_FICHIER_PDF`

Si on veut afficher seulement le fichier PDF sans les menus, on ajoute ?m=0avant le hash

`https://pdf2flip.forge.apps.education.fr/?m=0#URL_FICHIER_PDF`

## ⚙️ Options

On peut ajouter des paramètres dans l'URL pour :
- afficher une page spécifique : `?p=3`
- ne voir qu'une seule page à la fois : `?v=1`
- ne voir le livre que jusqu'à une page : `?e=3` (`e` pour `endPage`)

Si vous combinez des paramètres, il faut avoir un seul `?` au début, les ajouter avant le `#`, et les lier avec `&`.

Par exemple, on pourrait avoir :

`https://pdf2flip.forge.apps.education.fr/?m=0&p=3&v=1#URL_FICHIER_PDF`


## 🙋‍♀️ Contribuer

Si vous souhaitez contribuer ou tout simplement discuter de ce projet pour participer à l'améliorer, merci de lire le fichier [CONTRIBUTING.md](https://forge.apps.education.fr/pdf2flip/pdf2flip.forge.apps.education.fr/-/blob/main/CONTRIBUTING.md?ref_type=heads).

## 👩‍⚖️ Licence

PDF2flip est distribué sous licence libre GPL.

Il est fondé sur le logiciel libre [Paginis](https://github.com/ibra-kdbra/Paginis), mais il utilise la version lite de la librairie dflip, sous licence libre.