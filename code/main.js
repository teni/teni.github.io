/**
var a_graph = new graph();  
a_graph.add_edge("A","B");  
a_graph.add_edge("A","D");  
a_graph.add_edge("A","E");  
a_graph.add_edge("B","D");  
a_graph.add_edge("B","C");  
a_graph.add_edge("D","C");  
a_graph.add_edge("E","C");  
//a_graph.add_edge("here","there");  
//a_graph.add_edge("up","down");  
a_graph.printNodes();

search.depth_first_search(a_graph, "C");
**/

var A = new node("A");
var B = new node("B");
var C = new node("C");
var D = new node("D");
var E = new node("E");
var a_graph = new graph();  

a_graph.add_edge(A,B);  
a_graph.add_edge(A,D);  
a_graph.add_edge(A,E);  
a_graph.add_edge(B,D);  
a_graph.add_edge(B,C);  
a_graph.add_edge(D,C);  
a_graph.add_edge(E,C);  

a_graph.printNodes();

//a_graph.add_edge("here","there");  
//a_graph.add_edge("up","down");  

search.depth_first_search(a_graph, C);
console.log("Breadth First Search");
var A = new node("A");
var B = new node("B");
var C = new node("C");
var D = new node("D");
var E = new node("E");
var a_graph = new graph();  

a_graph.add_edge(A,B);  
a_graph.add_edge(A,D);  
a_graph.add_edge(A,E);  
a_graph.add_edge(B,D);  
a_graph.add_edge(B,C);  
a_graph.add_edge(D,C);  
a_graph.add_edge(E,C);  
search.breadth_first_search(a_graph, C);

g = new priority_queue();
//g.print();

g.insert("P3",3);
g.insert("P1",1);

g.insert("P2",2);
g.insert("P4",12);
g.insert("P5",5);
g.insert("P0",0);
g.insert("P*",25);
g.insert("P10",10);
g.print();


// Setup graph for A*


var A = new node ("A");
A.heuristic = 0;
var B = new node ("B");
B.heuristic = 50;

var C = new node ("C");
C.heuristic = 58;

var D = new node ("D");
D.heuristic = 40;

var E = new node ("E");
E.heuristic = 45;

var F = new node ("F");
F.heuristic = 20;

var G = new node ("G");
G.heuristic = 30;


var I = new node ("I");
I.heuristic = 15;

var J = new node ("J");
J.heuristic = 9;

var K = new node ("K");
K.heuristic = 0;

var M = new node ("M");
M.heuristic = 10;

var O = new node ("O");
O.heuristic = 30;

var W = new node ("W");
W.heuristic = 20;



var b_graph = new graph();  

b_graph.add_edge(A,B,30);  
b_graph.add_edge(A,C,70);  
b_graph.add_edge(B,D,4);  
b_graph.add_edge(C,E,2);  
b_graph.add_edge(D,G,300);  
b_graph.add_edge(D,F,16);  
b_graph.add_edge(E,G,6);  
b_graph.add_edge(G,J,7);  
b_graph.add_edge(G,I,15);  
b_graph.add_edge(F,M,25);  
b_graph.add_edge(M,K,11);  
b_graph.add_edge(K,O,12);  
b_graph.add_edge(I,K,9);  
b_graph.add_edge(M,W,15);  
b_graph.add_edge(O,W,20);  
b_graph.add_edge(J,K,8);  


informed_search.a_star(b_graph, K);
