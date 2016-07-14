var elem = function ( data, priority ) {
this.data = data;
this.priority = priority == undefined ? 0 : priority;
this.next;

}

var priority_queue = function () {
 this.head = undefined;
 this.length = 0;
 
 this.insert = function( el, incoming_priority ) { 
 // If the queue was empty,just add it and return

 if ( this.head == undefined ) {
  this.head = new elem ( el , incoming_priority) ; // 
  this.length = 1;
  /* Nothing left to do */
  return;
 }



 // If the priority of the new element is smaller than the head;
 /// Make the new head's next link to the previous head
 // Make it the head and return;

// |Head|->|el  |->|el   |->|  el |->undefined
 if ( incoming_priority < this.head.priority ) {
   var holder = this.head;
   new_el = new elem ( el, incoming_priority );
   new_el.next = holder;
   this.head = new_el;
   this.length++;
   return;
 }

// Else step through the list and find the right spot
 var elemA = this.head;
 var elemB = elemA.next;
 while ( elemA !=undefined ) {
  
  if ( elemB ==undefined &&  incoming_priority > elemA.priority ) { // At the end of the queue
    
   new_el = new elem ( el, incoming_priority );
   elemA.next = new_el;
   this.length++;
   return;
  }
  if ( incoming_priority >= elemA.priority && incoming_priority <=elemB.priority) {


   var holder = elemA;

   new_el = new elem ( el, incoming_priority );
   new_el.next = elemB;
   elemA.next = new_el;
   this.length++;
  return;
  }
  elemA = elemA.next;
  elemB = elemB.next; 
  }
  
  cur_elem = cur_elem.next;
 }





 
/**
 var cur_elem = this.head;
 while ( cur_elem != undefined) {

    
    
    if (el.data.priority < cur_elem.data.priority) {
     
    }
    else {
     var holder = cur_elem.next;
    // this.
    }
    cur_elem = cur_elem.next;
 }
**/

 this.print = function () {
 cur_elem = this.head;
 while (cur_elem != undefined ) {
 console.log (" "+cur_elem.data+", " ) ;
 cur_elem = cur_elem.next;
 }
 }

 this.pop = function () {
/*  Just return the element at head, set its next to be the new head and decr length of items */

if ( this.length == 0) {
 return undefined;

} 
var desired = this.head;
this.head = desired.next;
this.length--;
return desired.data;


 }


 };

