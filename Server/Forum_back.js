/**
 * Created by guill on 04/05/2018.
 */


const request = require("request");

// Création du schéma pour les messages forums.
var commentaireArticleSchema = new mongoose.Schema({
    titre : { type : String, match: /^[a-zA-Z0-9-_]+$/ },
    contenu : String,
    date : { type : Date, default : Date.now },
    user : String
});

var CommentaireArticleModel = mongoose.model('commentaires', commentaireArticleSchema);

const url =
    "http://localhost:9000/forum/message_data";

request.get(url, (error, response, body) => {
    let json = JSON.parse(body);
    var monCommentaire = new CommentaireArticleModel({ titre : body.result[0].titre });
    monCommentaire.contenu = body.result[0].contenu;
    monCommentaire.user = 'Martin';

// On le sauvegarde dans MongoDB !
    monCommentaire.save(function (err) {
        if (err) { throw err; }
        console.log('Commentaire ajouté avec succès !');
    });
});