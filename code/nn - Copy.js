var sigmoid = function ( x ) {

return ( 1 / ( 1 + Math.exp(-1 * x ) ) );

}

var sigmoid_derivative = function (x ) {

return  sigmoid(x) * ( 1 - sigmoid(x));
}

var neural_network =  function ( num_of_input_neurons, array_of_hidden_layers , num_of_output_neurons ) {

/**
num_of_input_neurons is simply a number of input layers eg 3

array_of_hidden_layers will be of the form [ 4, 4, 3 ] for 3 hidden layers with 4 neurons in the first hidden layer, four and three in the hidden layers that follow,

num_of_output_neurons is simply a number of output layers eg 4

**/
// Add a bias to all non output nodes.
// initialize weights to a random number between 1-0
 this.input_size = num_of_input_neurons;
 this.output_size = num_of_output_neurons;
 this.number_of_hidden_layers = array_of_hidden_layers.length;
 this.hidden_layers = array_of_hidden_layers;

 this.hidden_layer_z = [];
 

 this.weight_matrix = [];

 // Set the weights between the input and the first hidden layer
 var input_to_first_hidden = []; // [  [],[],[]]
 for (var i = 0 ; i < num_of_input_neurons + 1; i++) { // + 1 for bias
  var weights = [];
  var zs = [];
  for ( var j = 0 ; j < array_of_hidden_layers[0]  ; j++ ) {
     weights.push (Math.random());
     if (i==0)
     zs.push(0);
  }
  if (i==0){
  zs.push(1);
  this.hidden_layer_z.push(zs);
  }
  
  input_to_first_hidden.push(weights);
 }
 this.weight_matrix.push(input_to_first_hidden);

// Now step through the list of hiddens : [x,y,z] and init weights for x->y, y->z ... go from x to y i.e length -1 of the list


 for ( var i = 0 ; i < array_of_hidden_layers.length - 1 ; i++ ) {
 var layeri_to_layerj = []; // where j is i+1
 for ( var j  = 0 ; j < array_of_hidden_layers[i] + 1 ; j++ ) {
  var weights = [];
  var zs = [];
  for ( var k = 0 ; k < array_of_hidden_layers[i+1]  ; k++) {
     weights.push (Math.random());
     if (j == 0 ){
     zs.push(0);
     }
  }
  if (j==0) {
  zs.push(1);
  this.hidden_layer_z.push(zs); // Add the Zs for these weights.
  }

  layeri_to_layerj.push(weights);
 }
 this.weight_matrix.push(layeri_to_layerj);
 }
 
// Now add the final weights. These connect final hidden layer to the output
 

 var last_hidden_to_output = []; // [  [],[],[]]
 for (var i = 0 ; i < array_of_hidden_layers[array_of_hidden_layers.length -1 ] + 1; i++) { // + 1 for bias
  var weights = [];
  var zs = [];
  for ( var j = 0 ; j < num_of_output_neurons ; j++ ) { // No plus 1 here, it is the output layer
     weights.push (Math.random());
     if(i==0)
     zs.push(0);
     
  }
  if (i==0) {
   /* No bias in output layer */
  this.hidden_layer_z.push(zs); // Add the Zs for these weights.
  
  }
  last_hidden_to_output.push(weights);
 }
 this.weight_matrix.push(last_hidden_to_output);


 this.feed_forward = function ( input_example) {  // input_example = [.,.,,] of the same size as num_of_input_neurons
 // Taking an input example, propagate forward through the network.
 
 // At this time in execution, it is safe to say that the first array in the weight matrix is set of weights between input and first hidden layer
 // and the last weight in this weight matrix is for the connections to the output layers

   if (this.input_size != input_example.length ) {
     console.log("Input size does not match the size of the network");
     return;
   }
   // Calculate the activations in the first hidden layer... multiply inputs by weights

  for ( var n = 0 ; n < input_example.length+1 ; n++ ) { // Plus 1 because of the bias to the input.

    var input = n>=input_example.length?1: input_example[n];
    for ( var k = 0 ; k < this.hidden_layer_z[0].length - 1 ; k++ ) {
         
           this.hidden_layer_z[0][k]    += input *      this.weight_matrix[0][n][k];  // ith hidden layer kth neuron
         }

    }
   this.hidden_layer_z[0] = this.hidden_layer_z[0].map(function(x) { return sigmoid(x) });
   this.hidden_layer_z[0][this.hidden_layer_z[0].length-1] = 1; //  replace bias node with 1
  for ( var i = 0 ; i < this.hidden_layer_z.length-1 ; i++ ) {

     for ( var j = 0 ; j <this.hidden_layer_z[i].length ; j++) {
      console.log("The Mult");
      var multiplier = this.hidden_layer_z[i][j];
         // would like this for loop to run to this.hidden_layer_z[i+1].length for the output layer only
      var loop_end = i+1==this.hidden_layer_z.length-1 ?this.hidden_layer_z[i+1].length :this.hidden_layer_z[i+1].length-1;   
      for ( var k = 0 ; k < loop_end ; k++ ) {

           this.hidden_layer_z[i+1][k]    +=  multiplier *     this.weight_matrix[i+1][j][k] ;  // ith hidden layer kth neuron
      }

     }

   this.hidden_layer_z[i+1] = this.hidden_layer_z[i+1].map(function(x) { return sigmoid(x) });

  /* replace bias node if this is not the output layer */
   if (i+1!=this.hidden_layer_z.length-1) {
   this.hidden_layer_z[i+1][this.hidden_layer_z[i+1].length-1] = 1;
   }
  }

   
  
 

 }




 return this;
}
