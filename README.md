# PDF2flip

[PDF2flip](https://pdf2flip.forge.apps.education.fr/) est une application libre et gratuite qui permet de transformer un PDF en flipbook (un livre numérique à feuilleter).

![](https://minio.apps.education.fr/codimd-prod/uploads/upload_b8185f202723da1448a5401257556975.png)


## 👩‍🔧 Comment ça marche ?

On peut lire un PDF qu'on a en local ou bien qui se trouve sur internet.

![](https://minio.apps.education.fr/codimd-prod/uploads/upload_7c209a2a39d4a946ed8ea50da3803299.png)

L'outil permet également de créer des notes et de les exporter quand on a fini de lire le livre.

![](https://minio.apps.education.fr/codimd-prod/uploads/upload_5b45064b8b10310724c2879a0be2dafe.png)


![](https://minio.apps.education.fr/codimd-prod/uploads/upload_2b8f05239177dce1529af436d2d59f1b.png)

## 🌐 Partager un PDF en ligne sous forme de flipbok

On ne peut pas partager directement un PDF qui est sur ordinateur : il faut le mettre dans un espace en ligne avec un lien public, par exemple avec Nuage via le portail [Apps Éducation](https://portail.apps.education.fr/).

:::info
:warning: Il faut que le lien public soit le lien direct vers le fichier et non vers une page qui affiche le fichier.
:::


Pour partager son PDF, on met le lien public dans l'application, on charge le pdf et on peut ensuite tout simplement cliquer sur l'icône “partager” (cette icône n'apparaît que si vous avez chargé un PDF en ligne). 

![](https://minio.apps.education.fr/codimd-prod/uploads/upload_fc5b1fcb642c40eda601346d381d51d5.png)


On peut aussi mettre l'URL de son PDF derrière l'URL de PDF2flip suivie d'un hashtag.


```
https://pdf2flip.forge.apps.education.fr/#URL_FICHIER_PDF
```

Si on veut afficher seulement le fichier PDF sans les menus, on ajoute `?m=0` avant le hash


```
https://pdf2flip.forge.apps.education.fr/?m=0#URL_FICHIER_PDF
```

## ☰ Options

On peut ajouter des paramètres dans l'URL pour :
- afficher une page spécifique : `?p=3`
- ne voir qu'une seule page à la fois : `?v=1`
- ne voir le livre que jusqu'à une page : `?e=3` (`e` pour `endPage`)
- cacher le menu, mais aussi le bouton en forme d'œil qui sert à afficher ou masquer l'interface : `?m=0&i=0`

Si vous combinez des paramètres, il faut avoir un seul `?` au début, les ajouter avant le `#`, et les lier avec `&`.

Par exemple, on pourrait avoir :

```
https://pdf2flip.forge.apps.education.fr/?m=0&p=3&v=1#URL_FICHIER_PDF
```

## ⚙️ Configuration CORS côté serveur

PDF2flip utilise automatiquement un proxy CORS si le PDF est inaccessible directement. Aucune configuration n'est nécessaire.

Mais si vous avez accès au serveur sur lequel se trouve le PDF, il est recommandé d'autoriser l'accès direct en configurant les en-têtes CORS sur votre serveur.


## 🙋‍ Contribuer

Si vous souhaitez contribuer ou tout simplement discuter de ce projet pour participer à l'améliorer, merci de lire le fichier [CONTRIBUTING](https://forge.apps.education.fr/pdf2flip/pdf2flip.forge.apps.education.fr/-/blob/main/CONTRIBUTING.md?ref_type=heads)

### Proposer des 🚀  améliorations ou signaler un 🐛 bug

Vous pouvez [faire une suggestion](https://forge.apps.education.fr/pdf2flip/pdf2flip.forge.apps.education.fr/-/issues/new?issuable_template=suggestion) de nouvelles fonctionnalités, [signaler un bug](https://forge.apps.education.fr/pdf2flip/pdf2flip.forge.apps.education.fr/-/issues/new?issuable_template=bug) ou, de manière générale, discuter de l'évolution de PDF2flip via les [tickets](https://forge.apps.education.fr/pdf2flip/pdf2flip.forge.apps.education.fr/-/issues) ou bien par [mail](mailto:https://forge.apps.education.fr/pdf2flip/pdf2flip.forge.apps.education.fr/-/blob/main/forge-apps+guichet+pdf2flip-pdf2flip-forge-apps-education-fr-3596-issue-@phm.education.gouv.fr).

Si vous souhaitez participer au code de PDF2flip, n'hésitez pas à consulter les tickets et à [contacter le responsable du projet](http://eyssette.forge.apps.education.fr/).

## 👩‍⚖️ Licence

[PDF2flip](https://pdf2flip.forge.apps.education.fr/) est distribué sous licence libre GPL, ce qui signifie que :

- Vous pouvez l’utiliser librement, sans restriction.
- Vous pouvez étudier et modifier le code source.
- Vous pouvez le redistribuer, avec ou sans modifications.
- Si vous diffusez une version modifiée, vous devez la partager sous la même licence, afin que les utilisateurs suivants aient les mêmes droits que vous.


Il est fondé sur le logiciel [Paginis](https://github.com/ibra-kdbra/Paginis), mais il utilise la version _lite_ de la librairie [dflip](https://github.com/dearhive/3d-flipbook-dflip-lite/), sous licence libre.

## Remerciements !

Merci à [Quentin PAGÈS](https://github.com/Mejans/) pour la traduction en occitan !