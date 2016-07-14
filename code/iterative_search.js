var iterative_search = {

"hill_climbing" :  function (init, move_function, obj_function ) {

  var current_node = init;

  while ( true) {

  var next_node = move_function(current_node);
  console.log("HI:"+current_node);
  if ( obj_function(next_node) >=  obj_function(current_node)) {
   return current_node;

  } 
  current_node = next_node;
  
  }
  



},
"simulated_annealing" : function ( start_temperature, temp_step , init_solution, peturb_function , obj_function ) {

current_solution = init_solution;
temperature = start_temperature;
while  ( temperature  > 0 ) {
  //console.log(current_solution.print());
  
next_solution = peturb_function ( current_solution) ;
//console.log(obj_function(next_solution));
 //console.log(next_solution.print());
var deltaE = obj_function(next_solution) - obj_function ( current_solution) ;

 // console.log("deltaE: "+ deltaE +"  is "+ obj_function(next_solution) + "  "+obj_function ( current_solution) );
if ( deltaE < 0.001 ) {
  current_solution = next_solution;
 // console.log("deltaE is less than 0");
} else {
var p = Math.exp( (-1) * deltaE / temperature ) ;
   if ( p > Math.random() ) {
     current_solution = next_solution;
     //console.log("p > Math.random "+p);
   }
  //console.log("deltaE is more than 0");
}

temperature = temperature - temp_step;
}

return current_solution;

},

"tabu" : function (init_solution ,solution_hash_function, move_function, obj_function, num_of_iterations, tabu_list_size) {
/** Start with the init solution. Evaluate it. it is the best. 
put it in tabu.
move to a neighbour solution that is not in tabu. 
evaluate it. if  it is better  it becomes the best.
put it in tabu
stop at a stopping condition.....(number of iterations or when you exhaust the search space if you do.... or when you find the solution
**/
var keys = Object.keys;
var tabu = {}; // use a hash for tabu
// We are going to need a unique id for each solution. to put them in tabu.

var current_solution = init_solution ;
var best_solution = current_solution;
tabu[solution_hash_function(current_solution)] = current_solution;
var current_fitness = obj_function (init_solution);
var best_fitness = current_fitness;
for ( var i =0 ; i < num_of_iterations ; i++ ) {

// get the best neighbour, not on the tabu listStyleType
  current_solution = move_function(current_solution);
  if( tabu[solution_hash_function(current_solution)] != undefined) {
    
  
  tabu[solution_hash_function(current_solution)] = current_solution;
  // limit tabu. check that its size has not exceeded tabu list size.
  // hash keys are magically ordered in the order they are added. so just delete the hash entry that has its key as the head of the hash's key list. This achieves FIFO
  if (keys(tabu).length > tabu_list_size ) {
  delete tabu[keys(tabu)[0]];
  }
  current_fitness = obj_function (current_solution);
  
  if (current_fitness < best_fitness) {
     best_solution = current_solution;
	 best_fitness = current_fitness;
  }
  
}else {
continue;
}
}
return [best_solution,best_fitness];










},






}
