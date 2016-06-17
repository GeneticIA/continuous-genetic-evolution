var q = require('q');

var Populacao = function () {
    this.individuos = [];
};

Populacao.prototype.popular = function (Individuo) {
    var $this = this;
    return q.Promise(function (resolve, reject) {
        
        var promises = [];
        
        for (var i = 0; i < 10; i++) {        
            
            var individuo = new Individuo();            
            
            promises.push(individuo.nascer());
            
            $this.individuos.push(individuo);
            
        }
        
        q.all(promises).spread(function (){
            resolve();
        });
        
    });
};

Populacao.prototype.viver = function () {
    var $this = this;
    return q.Promise(function (resolve, reject) {
        var promises = [];
        for (var i in $this.individuos) {
            promises.push($this.individuos[i].viver());
        }

        q.all(promises).spread(function () {
            resolve();
        });
    });
};


Populacao.prototype.selecao = function () {
    var $this = this;
    return q.Promise(function (resolve, reject) {
        $this.individuos = $this.individuos.sort(function (a, b) {
            return b.pontuacao - a.pontuacao;
        });
    });
};

module.exports = Populacao;