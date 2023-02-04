'use strict';
const dbConn = require('./dbConnect');
var nodeoutlook = require('nodejs-nodemailer-outlook');

var Demande = function (demande) {
  this.nom = demande.nom;
  this.prenom = demande.prenom;
  this.telf = demande.telf;
  this.addresseDep = demande.addresseDep;
  this.adresseArr = demande.adresseArr;
  this.dateDepart = demande.dateDepart;
  this.heureDepart = demande.heureDepart;
  this.prix = demande.prix;
};


Demande.searchAll = function (demande) {
  dbConn.query("Select * from demandes", function (err, res) {
    if (err) {
      console.log("error: ", err);
      demande(null, err);
    }
    else {
      console.log('demandes : ', res);
      demande(null, res);
    }
  });
};

Demande.ajouterDemande = function (Newdemande, result) {
  dbConn.query("INSERT INTO demandes set ?", Newdemande, function (err, res) {
    function envoyerMail() {
      nodeoutlook.sendEmail({
        auth: {
          user: "imedhamdi007@hotmail.fr",
          pass: "imed25516242"
        },
        from: "imedhamdi007@hotmail.fr",
        to: 'oneysien@gmail.com',
        subject: 'Nouvelle Demande Client',
        html:`<p> Une nouvelle demande a été enregistrée ! </p>`,
        onError: (e) => console.log(e),
        onSuccess: (i) => res.send("Email envoyé")
      }
      );
    }

    envoyerMail();
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {

      result(null, res.insertId);
    }
  });
};

module.exports = Demande;

