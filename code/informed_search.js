var informed_search = {

"a_star" : function(graph_object,node_value) {
   var found = false;
   var path = [];
   var cursor = undefined;
   var frontier = new priority_queue(); /* A priority queue : Pop elements with lowest( weight + Heuristic )*/
  /* Elements in the frontier have the following structure { "the_node":,"path_from_start":[] , "path_cost_from_start': 0 .... note that the f = g +h . And that h will be the heuristic of the last node in the "path_from_start"      }  */
   frontier.insert({"the_node":graph_object.nodes[0],"path_cost_from_start":0, "path_from_start":[] }, 0);
   //path.push([cursor, the_node]);
   var visit = function (queue_element) {
        console.log("Visiting  Node "+ queue_element.the_node.value);
        
        queue_element.the_node.visited = true;
        
        if (queue_element.the_node.value === node_value.value) {
          console.log("Found "+ node_value.value);
          console.log("Path "+ queue_element.path_from_start);
          found = true;
          return; 
        }
        for (var j = 0 ; j < queue_element.the_node.edges.length && !found; j++) {
          
          if ( !queue_element.the_node.edges[j].node.visited ) {
          // make a new queue element;
           path.push([queue_element.the_node, queue_element.the_node.edges[j].node ]);
           
           var path_from_start =  queue_element.path_from_start.slice();  // make a copy by value.
           
           
           path_from_start.push(queue_element.the_node.value);
           var path_cost_to_this_node = queue_element.path_cost_from_start + queue_element.the_node.edges[j].weight
           console.log("Path Cost to this node is :" +path_cost_to_this_node );
          /* check to ensure this node has not been explored */
          frontier.insert ( {"the_node":queue_element.the_node.edges[j].node, "path_from_start":path_from_start , "path_cost_from_start": path_cost_to_this_node }, path_cost_to_this_node + queue_element.the_node.edges[j].node.heuristic ) ; 
          } 
        }

  } 
  while ( frontier.length > 0 && !found ) {
  // Get the node from the frontier with the lowest f(n),
  // where f(n) = g(n) + h(n)
   visit ( frontier.pop() );



 }

return path;
}, 











}
