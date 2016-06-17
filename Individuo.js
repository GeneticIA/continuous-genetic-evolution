var synaptic = require('synaptic'); // this line is not needed in the browser
var _ = require('lodash');

var Neuron = synaptic.Neuron,
        Layer = synaptic.Layer,
        Network = synaptic.Network,
        Trainer = synaptic.Trainer,
        Architect = synaptic.Architect;

var Individuo = function () {
    this.pontuacao = 0;
    this.genotipo = [];
    this.fenotipo = [];
    
};

var nascerFenotipo = function () {
    var $this = this;
    
    return q.Promise(function (resolve, reject) {
        var qtdeDeCamadasIntermediarias = Math.floor(Math.random() * 5) + 1;
        
        for (var camadas = 0; camadas < qtdeDeCamadasIntermediarias; camadas++) {
            
            var qtdeDeNeuronio = Math.floor(Math.random() * 5) + 1;
            
            if (qtdeDeNeuronio > 0){
                $this.fenotipo.push([camadas, qtdeDeNeuronio]);                
            }
            
        }               
        resolve();
    });
};

var Perceptron = (function () {
    function F(args) {
        return  Architect.Perceptron.apply(this, args);
    }
    F.prototype = Architect.Perceptron.prototype;

    return function () {
        
        return new F(arguments);
    }
})();

var nascerGenotipo = function () {
    var $this = this;
    return q.Promise(function (resolve, reject) {
        var args = [];
        
//        if($this.fenotipo.length == 0)return resolve();       
        
        
        args.push(2);
        
        for (var i in $this.fenotipo){
            
            args.push($this.fenotipo[i][1]);
        }
            
        args.push(1);       
        

        $this.rede = Perceptron.apply($this, args);       
        
        
        var redeJSON = $this.rede.toJSON();
        
        for(var i in redeJSON.connections){
            $this.genotipo.push(redeJSON.connections[i].weight);
        }
        
        
        
        resolve();        
        
        
    });

};

Individuo.prototype.nascer = function () {
    var $this = this;
    
    return q.Promise(function (resolve, reject){
        
        nascerFenotipo.call($this).then(nascerGenotipo.call($this)).then(function (){                        
            resolve();
        });        
    });
};

Individuo.prototype.setGenotipo = function (_g) {
    this.genotipo = _g;
};
var q = require('q');

Individuo.prototype.getGenotipo = function () {
    return this.genotipo;
};

Individuo.prototype.setFenotipo = function (_f) {
    this.fenotipo = _f;
};

Individuo.prototype.getFenotipo = function () {
    return this.fenotipo;
};

Individuo.prototype.viver = function () {
    var $this = this;
    return q.Promise(function (resolve, reject) {
        
        var lista = [[0,0,0], [1,1,0], [1,0,1], [0,1,1]];
        
        for(var i in lista){            
            $this.rede.active([lista[i][0], lista[i][1]]);            
        }        
        
        resolve();
    });
};

module.exports = Individuo;