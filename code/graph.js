
/**
Array.prototype.contains = function(value) {  
    var i = this.length;
    while (i--) {
        if (this[i].value === value) {
            return true;
        }
    }
    return false;
}
**/

var graph = function(){  
    this.nodes = [];

    this.contains = function(x) {  
    var i = this.nodes.length;
    while (i--) {
        if (this.nodes[i].value === x.value) {
            return true;
        }
    }
    return false;
}
}

graph.prototype.add_edge = function(source,target,weight){  
    var first_node = this.contains(source);
    var second_node = this.contains(target);
    
    if(first_node){
        //get start node
        var i = this.nodes.length;
        while (i--) {
            if (this.nodes[i].value === source.value) {
                this.nodes[i].add_edge(target, weight);
                break;    
            }
        }
    }
    if(second_node){
        //get end node
        //console.log("Contains Second Node");
        i = this.nodes.length;
        while (i--) {
            if (this.nodes[i].value === target.value) {
                this.nodes[i].add_edge(source, weight);
                break;    
            }
        }
    }

    if( (!first_node) || (!second_node) ){
        if( !first_node ){
            source.add_edge(target, weight);
            this.nodes.push(source);
        }
        if( !second_node ){
            target.add_edge(source,weight);
            this.nodes.push(target);
        }
    } 
}

graph.prototype.printNodes = function(){  
    for(var i = 0;i < this.nodes.length;i++){
        console.log(this.nodes[i].value +":");
        console.log(this.nodes[i].edges);
    }
}


// Added only to visualize NN

graph.prototype.set_edge = function (source, target, weight) {
// We assume the weight has already been added before the attempt to set it.
  source.set_edge(target,weight);
  target.set_edge(source,weight);
}

