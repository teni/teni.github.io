
node_radius = 20;
var factor = 0.4;
var midpoint = function (x1,y1,x2,y2) {
return [ ( x1 +x2)/2 , (y1 +y2)/2];
}
var vis =  {

"graph" : function  (graph_object,svg, display_width, display_height,path) {
/* Use a force directed display to make the graphs aesthetically pleasing and to have connected nodes next to each other */

svg.selectAll("*").remove();
// Initialize nodes to a random location in x and y.
// Use connections as springs obeying hooke's law to move them in place for each iteration
// Attractive and replusive forces
// F(attractive) =  c1 * log(d/c2). C1 and c2 are constants and d is the distance.
// F(replusive) = c3/d2
//Connected nodes attract each other, non-connected nodes repel
// Update the x and y coordinates using the final set of nodes, locations and edge line set etc.
var ITERATIONS = 100;
var C1 = 2;
var C2 = 1;
var C3 = 1;
var C4 = 0.09;
var d = 1.9;

if (graph_object.nodes.length == 0 ) {
return  /* No nodes, so nothing to do */
}
for(var i = 0 ; i < graph_object.nodes.length ; i++) {
/* Init the coordinate fields on each node */
graph_object.nodes[i].cx =graph_object.nodes[i].cx == undefined? Math.random():graph_object.nodes[i].cx  ;
graph_object.nodes[i].cy = graph_object.nodes[i].cy==undefined? Math.random(): graph_object.nodes[i].cy ;

}

for ( var i = 0 ; i < ITERATIONS ; i++ ) {
   for ( var j = 0 ; j< graph_object.nodes.length ; j++) {
   var current_node = graph_object.nodes[j];

   for ( var k = 0 ; k < graph_object.nodes.length ; k++ ) {
     if ( j != k ) { // Ensure you are checking a node and other nodes, not a node versus the same node
        var other_node = graph_object.nodes[k];  
        // get the edge between this current node and other node.. should return a non-empty list if it exists
        edge = current_node.get_edge(other_node);
        //console.log(edge);
       //edge[0].weight = 10;
        var possible_new_cx ;
        var possible_new_cy ;
        var hyp = Math.sqrt   (  (other_node.cy - current_node.cy)* (other_node.cy - current_node.cy)  +    (other_node.cx - current_node.cx)* (other_node.cx - current_node.cx)        )
        if (  edge.length>0 ) {
           
          //console.log(edge[0].weight);
          //console.log("This "+current_node.value+"'s x: "+current_node.cx+" y:"+current_node.cy);
          //console.log("This "+current_node.value+other_node.value+"'s x: "+other_node.cx+" y:"+other_node.cy);
        // A edge exists, get it and use the weight as length.
          var displ =  C4*  (C1 * Math.log( hyp / C2));
          // get the angle between the horizontal and the line formed by these two points
          // tan theta = y2 - y1 / (x2 - x1) 
          // sin theta = (x2-x1) / sqrt ( (y2-y1)^2 + (x2-x1)^2)
          // cos theta =  (y2-y1)/ sqrt ( (y2-y1)^2 + (x2-x1)^2)
          dx = current_node.cx - other_node.cx;
          dy = current_node.cy - other_node.cy;
          current_node.cx= current_node.cx  - displ * dx/hyp ;
          current_node.cy = current_node.cy  - displ *dy / hyp;
          other_node.cx= other_node.cx  + displ * dx/hyp ;
          other_node.cy = other_node.cy  + displ *dy / hyp;
        }else {
        // No edge exists so repel these two nodes
         
          var rpl = C4*(C3/(hyp*hyp)) ;
          dx = current_node.cx - other_node.cx;
          dy = current_node.cy - other_node.cy;

          c_x = current_node.cx  + rpl * dx/hyp;
          c_y = current_node.cy + rpl * dy/hyp;
          o_x = other_node.cx  - rpl * dx/hyp;
          o_y = other_node.cy - rpl * dy/hyp;
          current_node.cx = c_x > 0 && c_x < factor*display_width ? c_x : Math.random();
          current_node.cy = c_y > 0 && c_y < factor* display_height ? c_y : Math.random();
         other_node.cx = o_x > 0 && o_x < factor*display_width?  o_x  : Math.random();
          other_node.cy = o_y > 0 && c_y < factor* display_height  ? o_y :  Math.random();
         
         
       }



     }
   
   }

   }


}


var lines = {};

var edge_weights  = [];


   for ( var j = 0 ; j< graph_object.nodes.length ; j++) {
   var current_node = graph_object.nodes[j];

   for ( var k = 0 ; k < graph_object.nodes.length ; k++ ) {
     if ( j != k ) {

       var other_node = graph_object.nodes[k];  
        // get the edge between this current node and other node.. should return a non-empty list if it exists
        edge = current_node.get_edge(other_node);
        
        if (  edge.length>0 ) {
         // If you are in here because there is at least an edge.
        
         // use a set of lines so that edges are not plotted twice.
         
         var key =  current_node.value>other_node.value? current_node.value+other_node.value: other_node.value+current_node.value ;
         lines["x_"+key] = {"id":"x_"+key, "x1":current_node.cx*factor*display_width,"x2":other_node.cx*factor*display_width, "y1":current_node.cy*factor*display_height,"y2": other_node.cy*factor*display_height};
         mid= midpoint(current_node.cx, current_node.cy,other_node.cx, other_node.cy);  
         edge_weights.push( {"x":mid[0]*factor*display_width, "y":mid[1]*factor*display_height, "value":edge[0].weight} );

       }

    }

  }

 


}
var edge_set = [];
for ( i in lines ) {
edge_set.push(lines[i]);
}



var rtn =  {  "nodes": graph_object.nodes.map( function (x) { return {"cx":x.cx*factor*display_width, "cy":x.cy*factor*display_height , "node":x.value ,"heuristic":x.heuristic } } ) , "edges":edge_set, "weights":edge_weights         };

svg.selectAll("line").data(rtn.edges).enter().append("line").attr("id", function(d) {return d.id } ).attr("x1", function(d) {return d.x1}).attr("x2", function(d) { return d.x2}).attr("y1", function(d) { return d.y1 }).attr("y2", function(d) { return d.y2 }).attr("stroke-width",4).attr("stroke","#ccc");

svg.selectAll("circle").data(rtn.nodes).enter().append("circle").attr("cx", function (d) { return d.cx } ).attr("cy", function (d) { return d.cy } ).attr("r", function(d,i) { return  node_radius; });


svg.selectAll("text.weights").data(rtn.weights).enter().append("text").attr("x", function(d) { return d.x} ).attr("y",function(d) { return d.y } ).attr("font-size", "11px").text( function (d) { return d.value  }).attr("fill","black");

svg.selectAll("text.nodes").data(rtn.nodes).enter().append("text").attr("x", function(d) { return d.cx -5} ).attr("y",function(d) { return d.cy+5 } ).attr("font-size", "12px").text(function(x){ return x.node}).attr("fill","white");

svg.selectAll("text.heuristic").data(rtn.nodes).enter().append("text").attr("x", function(d) { return d.cx -10} ).attr("y",function(d) { return d.cy+35 } ).attr("font-size", "10px").text(function(x){ return x.heuristic}).attr("fill","red");

if (path!=undefined) {
var i = 0;
var s_i = setInterval (function () {
  
  if (i >=path.length ) 
  clearInterval(s_i);
  
  var current_node = path[i][0];
  var other_node = path[i][1];
  if (current_node != undefined && other_node !=undefined ) {
  var key =  current_node.value>other_node.value? current_node.value+other_node.value: other_node.value+current_node.value ;

svg.select("#x_"+key).attr("stroke","red");
  }

i++;

}, 2000);
}

},



}

/*
dataset = [ 
{"cx":170, "cy":130,"node":"O" },

{"cx":34, "cy":20,"node":"A" },
{"cx":130, "cy":50, "node":"B" },
{"cx":38, "cy":90, "node":"C" }


];
*/



// Setup graph for A*



