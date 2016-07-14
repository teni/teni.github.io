var cross = function ( str1, str2, array_of_switch_locations) {

var str1_array  = str1.split("");
var str2_array  = str2.split("");

console.log( [str1_array, str2_array]);

console.log("\n\n");
if ( str1_array.length != str2_array.length ) {
/* Arrays are of different lengths */
return ;
}

for ( var i  = 0 ; i < array_of_switch_locations.length ; i ++ ) {
// Test that the swith locations are in the length of the array and not outside it.
if ( array_of_switch_locations[i] < str1_array.length ) {

var temp = str1_array[array_of_switch_locations[i]];

str1_array[array_of_switch_locations[i]] = str2_array[array_of_switch_locations[i]]
str2_array[array_of_switch_locations[i]] = temp;
}


}
return [ str1_array , str2_array];



}



console.log(cross("11100111","00001111",[0,1]));
