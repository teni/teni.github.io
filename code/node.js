var node = function(value){  
    this.edges = [];
    this.value = value;
    this.visited = false; 
    this.heuristic = Infinity; /* Needed for A* only */

    /* the following fields are only used for graph plotting */
    this.cx;
    this.cy;
}

node.prototype.add_edge = function(end, weight){  
    this.edges.push({"node":end, "weight": weight==undefined?1:weight });
}

node.prototype.get_edge = function ( other_node) {

return  this.edges.filter(function (x) { return x.node.value ===other_node.value});

}


// Needed only to attempt visualizing NN. Weights b/w connections change.
node.prototype.set_edge = function (other_node, weight ) {
 var the_edge = this.get_edge(other_node);
 console.log("The edge");
 console.log(the_edge);
 if ( the_edge.length > 0) {
    the_edge[0]["weight"] = weight;
 } else {
  console.log("No such edge between "+this.value +" and other node");
 }
}

