var val_converter = function(high_bit,low_bit,high_value,low_value) {
var self = this;
self.high_bit = parseInt(high_bit);
self.low_bit = parseInt(low_bit);
self.high_value =  parseFloat(high_value);
self.low_value = parseFloat(low_value);
self.get_value = function  ( the_bit) {
return ((self.high_value - self.low_value) * the_bit / (self.high_bit - self.low_bit ) ) + self.low_value;
};
self.get_bit =  function ( the_value) {
return parseInt(((self.high_bit - self.low_bit )* (the_value-self.low_value) / (self.high_value - self.low_value)  ) +  self.low_bit );
}

}

var bin2dec = function (x) {
var k = x.split("");
k.reverse();
var acc = 0;

for ( var i = 0 ; i<k.length; i++ ) {

acc += parseInt(k[i]) * Math.pow(2, i);
}
return acc;
};

var dec2bin = function(x,n) {
  if (x == 0 ) {
   return "0";
  }
  var bit_array = [];
  var rem = x % 2;
  while (x != 0 ) {
    bit_array.push(rem);
	x = (x - rem) / 2;
	rem = x % 2;
  }
 while ( bit_array.length < n) {
  bit_array.push(0);
  }

  bit_array.reverse();
  
  return bit_array.join("");
  
}

var crossover = function ( str1, str2, array_of_switch_locations) {

var str1_array  = str1.split("");
var str2_array  = str2.split("");


if ( str1_array.length != str2_array.length ) {
/* Arrays are of different lengths */
console.log("Error: Arrays are of different lengths");
return ;
}

for ( var i  = 0 ; i < array_of_switch_locations.length ; i ++ ) {
// Test that the swith locations are in the length of the array and not outside it.
if ( array_of_switch_locations[i] < str1_array.length ) {

var temp = str1_array[array_of_switch_locations[i]];

str1_array[array_of_switch_locations[i]] = str2_array[array_of_switch_locations[i]]
str2_array[array_of_switch_locations[i]] = temp;
} else {
console.log("Error: Switch location must exist within the bit string")
}


}

return [ str1_array.reduce ( function (x,y) { return ""+x+y; } )  , str2_array.reduce ( function (x,y) { return ""+x+y; } ) ];



}
var getRand = function(  min , max) {
    return min + (Math.random()* ( max - min));
    };
var mutate = function ( x ) {
// mutate this string at a random location.
var str1_array  = x.split("");
var mutation_location = parseInt(Math.random() * str1_array.length);
str1_array[mutation_location] = str1_array[mutation_location] == "1"?"0":"1";
return str1_array.reduce ( function (x,y) { return ""+x+y; } ) ;
}

var roulette_wheel = function (Xs) {
// Xs represents a list of [ individual , fitness], ...
//return Xs.map(function (x) { return [x,1] } ) ;

var population = Xs.length;

var fitness_sum = Xs.map( function (x) { return x[1]} ). reduce ( function (x,y ) { return x +y}) ;

// what is returned is a list of [individual, num_of_appearances_in_next_generation],...##
// individuals with zero appearances will be killed...(left out)

//.filter(function (x) {return x[1] != 0}).length);
return Xs.map(function (x) { return [x, Math.round(  (x[1]/fitness_sum )*population)]} ).filter(function (x) {return x[1] != 0});
}

var genetic = {

"ga" :  function (bit_length, population,range, obj_function, probability_of_cross, array_of_switch_locations, probability_of_mutation, num_of_iter, values_range_array ) {
  // init_population are actual values, we need to convert them to bit values;

  
  var init_population = [];
  for( var i = 0 ; i< population ; i++ ){
  init_population.push (getRand(range[0] , range[1]) ) ;
  }
  
  // create the value converter object
  var high_bit = Math.pow(2,bit_length) - 1;
  var low_bit = 0;
  
  var val_conf = new val_converter(high_bit,low_bit,values_range_array[0],values_range_array[1])
   
  var current_population = init_population.map( function(x) { return dec2bin(val_conf.get_bit (x),bit_length) ;} );
  

  var individuals_and_fitness;
  for (  var i = 0 ; i < num_of_iter ; i++) {
    individuals_and_fitness = current_population.map( function (x) { return [ x, obj_function(val_conf.get_value(bin2dec(x)) )] ;} );
// Select the new generation


    indv_frequency = roulette_wheel(individuals_and_fitness);
	
	new_generation = [];
	for(var j = 0 ; j < indv_frequency.length; j++ ) {
	   for (var k = 0 ; k < indv_frequency[j][1]; k++) {
	   new_generation.push(indv_frequency[j][0][0]);
	   }
	}
    console.log(new_generation);
	// Cross over with a prob crossover
	current_population = [];
	for (var f = 0 ; f < new_generation.length -1 ; f+=2 ) {
	
	 if (Math.random() < probability_of_cross ) {
	 cross_result = crossover( new_generation[f], new_generation[f+1], array_of_switch_locations) ;
	 for ( var g = 0 ; g < cross_result.length; g++) {
	 current_population.push(cross_result[g]);
	 }
	 } else {
	 current_population.push(new_generation[f]);
	 current_population.push(new_generation[f+1]);
	 
	 }
	}
	
	// mutate with a prob mutate
	for ( var g = 0 ; g < current_population.length ; g++) {
	if (Math.random() < probability_of_mutation ) {
	current_population[g] = mutate(current_population[g]);
	}
	}
	
	

  
  }
  console.log("GA done ");
  console.log(individuals_and_fitness.map(function(x) { 

  return  /*val_conf.get_value*/(bin2dec(x[0]));
  } ));
  return (individuals_and_fitness.map(function(x) { 

  return  val_conf.get_value(bin2dec(x[0]));
  } )).reduce ( function (x,y) { return (parseFloat(x) + parseFloat(y)) / 2; } ) ;



}




}
