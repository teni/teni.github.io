
var training_examples =  [ [ [ 0 , 0] , 0 ], [[0, 1], 1 ], [[1,0],1 ],[ [1,1],0  ] ]  ; /* [ [[x], y], ... ]  */
var input;
var my_rand = function ( mx, mn ) {
return Math.random();
return Math.random()*(mx -mn) * -mn;
}
//var training_examples =  [ [ [ 0 , 0] , 0 ], [[0, 1], 1 ], [[1,0],0 ],[ [1,1],1  ] ]  ; /* [ [[x], y], ... ]  */
var total_error;
var bias_input = function (x,b) {
// take a list of lists, append b to each list in the list and return
 var rtn = [];  
 for ( var i = 0 ; i < x.length ; i++ ) { // Run through all the example input
   var biased_input = x[i];
  input
   biased_input[0].push(b); // Put the bias value;
   rtn.push(biased_input);
 }
 return rtn;
}

var input_neurons = 2;
var hidden_neurons = 3;
var output_neuron = 1;
var hidden = [];
var outputs = [];



for ( var i = 0 ; i < hidden_neurons  ; i++ ) { // Plus 1 for bias node in hidden layer.
if (i >= hidden_neurons ) {
hidden.push(1);  // Put in a 1 if it is the last neuron.
}else {
hidden.push(0);
}

}

for ( var i = 0 ; i < output_neuron ; i++ ) {
outputs.push(0 ) ;
}

// Initialize the weights with a random number from 0 - 1




var weight_hidden_input = [];


for ( var i = 0 ; i < input_neurons; i++ ) {
    weight_hidden_input.push([]);
    for ( var j = 0 ; j <hidden_neurons  ; j++ ) {
      weight_hidden_input[i].push(my_rand(1,-1));
    }
}

var weight_output_hidden = [];
for ( var i = 0 ; i < hidden_neurons + 1; i++ ) {
    weight_output_hidden.push([]);
    for ( var j = 0 ; j < output_neuron ; j++ ) {
      weight_output_hidden[i].push(my_rand(1,-1));
    }
}


var sigmoid = function (z) {

return 1 / (1 + Math.exp(-z));
}
var sigmoid_derivative = function (z ) {
var u = sigmoid(z);
return u* ( 1 - u );
}
//console.log(hidden);

var feed_forward = function (training_example) { 
input = training_example[0];



// Input must have been biased previously.
for ( var i = 0 ; i < hidden_neurons; i++) {
    for ( var j = 0 ; j <input.length   ; j++ ) {
       hidden[i] += input[j] * weight_hidden_input[j][i];
    }
    hidden[i] = sigmoid(hidden[i]);
}
//console.log('During forward');
//console.log(hidden);
// Next feed to the output layer
for ( var j = 0 ; j < output_neuron ; j++) {
for ( var i = 0 ; i < hidden_neurons ; i++ ) {
     
       outputs[j] += hidden[i] * weight_output_hidden[i][j];
     }
     outputs[j] = sigmoid(outputs[j]);
}

return outputs;
};
var hidden_errors;
var output_errors;
var back_prop = function (training_example, rho) {

// Training Example is  of the form [ [ 0 , 0, b] , 0 ],  

// calculate the error in the output layer
// this is given by
// -(y_actual - y_computed)* sigmoid_derivative(output)
var total_error= 0;
var y_actual = training_example[1];
 output_errors= [];
for ( var i = 0 ; i < output_neuron ; i++ ) {
   output_errors.push ( (outputs[i] - y_actual) * sigmoid_derivative(outputs[i])  ) ;
   total_error += (outputs[i] - y_actual);
}

hidden_errors = [];
for ( var i = 0 ; i < hidden_neurons ; i++ ) {
   hidden_errors.push(0);
   for( var j = 0 ; j < output_neuron ; j++) {
  

    var im = weight_output_hidden[i][j] * output_errors[j];
    hidden_errors[i]  = hidden_errors[i] + im;
   } 
  hidden_errors[i] *= sigmoid_derivative( hidden[i]);
  
}



//console.log( output_errors);

// Adjust weights

// from output to hidden

for ( var i = 0 ; i < hidden.length ; i++) { 
for ( var j = 0 ; j< output_neuron ; j++) {
   
     // delta_E / delta_w = delta_k * Zl
         weight_output_hidden[i][j] += rho * ( output_errors[j] * hidden[i]); 
    }

}
//console.log(weight_output_hidden[0]);
// from hidden to input

for (var i = 0 ; i<training_example[0].length ; i++) {
   for( var j = 0 ; j<hidden_errors.length ; j++) {
    weight_hidden_input[i][j] += rho * hidden_errors[j] * training_example[0][i];
   } 
}

return total_error;

};

var test = function ( example ) {
 return feed_forward(example);
}

var network;
var generate_graph = function () {
network = new graph();

var input_nodes = [];
for ( var i  = 0 ; i < input_neurons ; i++) {
 var x = new node ("I"+(i+1));
 x.heuristic = input[i];
input_nodes.push(x  );

}

var hidden_nodes = [];
for ( var i =0; i <hidden_neurons ; i++) {
var x = new node ("H"+(i+1)) ;
x.heuristic = hidden[i];
hidden_nodes.push(x);
}

var output_nodes = [];
for ( var i=0 ; i < output_neuron ; i++) {
 var x = new node ("O"+(i+1));
 x.heuristic = outputs[i];
output_nodes.push(x);
}

// Do the connections

for ( var i = 0 ; i < input_nodes.length ; i++ ) {
   for ( var j = 0; j < hidden_nodes.length ; j++ ) {
     network.add_edge(input_nodes[i] , hidden_nodes[j] ,  weight_hidden_input[i][j] ) ;
   }
}

for ( var i = 0 ; i < hidden_nodes.length ; i++ ) {
   for ( var j = 0 ; j < output_nodes.length ; j++) {
   network.add_edge(hidden_nodes[i],  output_nodes[j] , weight_output_hidden[i][j] ) ;
   }

}

}

