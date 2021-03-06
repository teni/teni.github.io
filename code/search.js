var search = {
 
"depth_first_search": function (graph_object, node_value ) {
   var path = [];
   var cursor = undefined;
   var found =false;
   var visit = function (the_node) {
        if ( the_node.visited ) {
          return;
        }
        console.log("Visited Node "+ the_node.value);
        path.push([cursor, the_node]);
        cursor = the_node;
        the_node.visited = true;
        if (the_node.value === node_value.value) {
          
          console.log("Found "+ the_node.value);
          found = true;
          return; 
        }
        for (var j = 0 ; j < the_node.edges.length && !found; j++) {
          
          visit(the_node.edges[j].node); 
          path.push([the_node, the_node.edges[j].node]);
        }

  } 
  for (var i =0 ; i < graph_object.nodes.length ; i++) {

   if (!graph_object.nodes[i].visited && !found ) {
     visit(graph_object.nodes[i]);
   }
  }
  return path;
  },


 "breadth_first_search" : function (graph_object, node_value) {
   var queue = [];
   // Add the first node in the Graph or tree to the queue
   if (graph_object.nodes.length > 0 )
   queue.push(graph_object.nodes[0]);
   var found = false;
   var path = []; // Path will hold [ from , to ] for plotting we will test if from or to are both valid before we plot
   var cursor = undefined;
   var visit = function (the_node) {
        if ( the_node.visited ) {
          return;
        }
        //path.push([cursor, the_node]);
        //cursor = the_node;
        console.log("Visited Node "+ the_node.value);
        the_node.visited = true;
        if (the_node.value === node_value.value) {
         // path.push(the_node);
          console.log("Found "+ the_node.value);
          found = true;
          return; 
        }
        for (var j = 0 ; j < the_node.edges.length && !found; j++) {
          queue.push( the_node.edges[j].node );
          if (!found) {
          path.push([the_node, the_node.edges[j].node]);
          }
        }

  } 

  while ( !found || queue.length > 0  ) {

  // dequeue
  current_node = queue[0];
  queue = queue.slice(1);
  visit(current_node);
  }
  console.log(path);
  return path;
 }



}
