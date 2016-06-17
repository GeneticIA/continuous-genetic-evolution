var Individuo = require('./Individuo');;

var Populacao = require('./Populacao');

var p = new Populacao();

p.popular(Individuo).then(p.viver())
        .then(p.selecao())
        .then(function () {
            console.log(JSON.stringify(p));
        });
