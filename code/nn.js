/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 *
 * @author Omoteniola
 */
var nn  = function (num_of_input, num_of_hidden_neurons, no){
    
    this.getRand = function(  min , max) {
    return min + (Math.random()* (max - min));
    };
    
    this.createMatrix = function(I,J,fill){
        m = [];
        for (var i = 0 ; i<I ; i++){
            m.push([]);
            for (var j = 0; j<J ; j++){
                m[i].push( fill);           }
        }
        return m;
        
    };
    this.sigmoid = function( x){
        //return 1 / (1 + Math.exp(-x));
        return Math.tanh(x);
    };
    this.sigmoid_derivative = function( y){
        //return y * (1 - y);
        return 1.0 - y*y;
    };
    this.num_of_input;
    this.num_of_hidden_neurons;
    this.no;
    this.ai ;
    this.ah;
    this.ao;
    this.wi;
    this.wo;
    this.ci;
    this.co;
    this.nn_init = function (num_of_input, num_of_hidden_neurons, no){
        this.num_of_input = num_of_input + 1;
        this.num_of_hidden_neurons = num_of_hidden_neurons;
        this.no = no;
        
        this.ai = [];
        for (var i = 0 ; i < this.num_of_input ; i++){
            this.ai.push (1.0);
        }
        
        this.ah = [];
        for (var i = 0 ; i < this.num_of_hidden_neurons; i++){
            this.ah.push (1.0);
        }
        
        this.ao =[];
       
        for (var i = 0 ; i < this.no ; i++){
            this.ao.push (1.0);
        }
        this.wi =this.createMatrix(this.num_of_input, this.num_of_hidden_neurons,0);
        this.wo = this.createMatrix(this.num_of_hidden_neurons, this.no,0);
        
        for ( var i = 0 ; i < this.num_of_input; i++){
            for ( var j = 0 ; j<this.num_of_hidden_neurons; j++){
                this.wi[i][j] = this.getRand(-0.2,0.2);
            }
        }
          for ( var i = 0 ; i < this.num_of_hidden_neurons; i++){
            for ( var j = 0 ; j<this.no; j++){
                this.wo[i][j] = this.getRand(-2.0,2.0);
            }
        }
        this.ci = this.createMatrix(this.num_of_input, this.num_of_hidden_neurons,0);
        this.co = this.createMatrix(this.num_of_hidden_neurons, this.no,0);
        
    };
	this.nn_init(num_of_input, num_of_hidden_neurons, no);
     this.feed_forward  = function( inputs) {
        if (inputs.length != this.num_of_input - 1){
            throw new Exception("Wrong number of inputs");
        }
        for ( var i = 0 ; i < this.num_of_input - 1 ; i++) {
            this.ai[i] = inputs[i];
        }
        
        for (var j = 0 ; j < this.num_of_hidden_neurons ; j++){
            
            sum = 0.0;
            for (var i = 0 ; i< this.num_of_input ; i++){
                sum = sum + this.ai[i] * this.wi[i][j];
            }
            this.ah[j] = this.sigmoid(sum);
        }
        
        for ( var k = 0 ; k< this.no; k++){
            
             sum = 0.0;
            for ( var j = 0 ; j < this.num_of_hidden_neurons; j++){
                sum = sum + this.ah[j] * this.wo[j][k];
            }
            this.ao[k] = this.sigmoid(sum);
        }
          
          return this.ao;  
    }
    
    this.back_prop = function(targets, N ,  M) {
        if (targets.length != this.no){
		     console.log(targets.length);
			 console.log(this.no);
            throw new exception ("Wrong number of target values");
        }
        output_deltas = [];
        for ( var k = 0 ; k < this.no; k++){
             output_deltas.push(0);
             error = targets[k] - this.ao[k];
             output_deltas[k] = this.sigmoid_derivative(this.ao[k]) * error;
        }
        
        hidden_deltas = [];
        for (var j = 0  ; j < this.num_of_hidden_neurons ; j++){
            hidden_deltas.push(0);
            error = 0.0;
            for ( var k = 0 ; k < this.no ; k++){
               error = error + output_deltas[k] * this.wo[j][k];
            }
            hidden_deltas[j] = this.sigmoid_derivative(this.ah[j])*error;
        }
        
        
        for ( var j = 0 ; j< this.num_of_hidden_neurons; j++){
            for ( var k = 0 ; k< this.no; k++){
                change = output_deltas[k] * this.ah[j];
                this.wo[j][k] = this.wo[j][k] + N * change + M * this.co[j][k];
                this.co[j][k] = change;
            }
        }
        
        
        for ( var i = 0 ; i < this.num_of_input ; i++){
            for (var j  = 0 ; j < this.num_of_hidden_neurons ; j++){
                change = hidden_deltas[j] * this.ai[i];
                this.wi[i][j] = this.wi[i][j] + N * change + M * this.ci[i][j];
                this.ci[i][j] = change ;
            }
        }
        
        error = 0.0;
        for (var k = 0 ; k< targets.length; k++){
            error = error + 0.5*( targets[k] - this.ao[k])*( targets[k] - this.ao[k]);
        }
        return error;
    }
    
    this.test = function ( patterns){
        for ( var i = 0; i< patterns.length ; i++){
            console.log(patterns[i]);
            console.log("->");
            
            console.log(this.feed_forward(patterns[i])) ;
            
             
        }
    }
   
    this.train  = function( patterns, targets_,  iterations,  N,  M) {
        
        for ( var i = 0 ; i < iterations ; i++){
            error = 0.0;
            for ( var j = 0 ; j< patterns.length ; j++) {
                var inputs ;
                var targets;
                
                inputs = patterns [j];
                targets = targets_[j];
                this.feed_forward(inputs);
                error = error + this.back_prop(targets, N, M);
                
                
            }
            if (i % 100 == 0){
              console.log(error); 
            }
            }
            
        }
    
    
    
   
    
    
    
return this;

}
