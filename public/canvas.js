
function display_func_name(func_name, silent, log)
// either logs 'func_name' on console or alerts it if silent==false.  Debugging tool.
{
  if (silent == false) {
    if (log == true) {
    console.log('Inside function '+func_name);}
    else {alert('Inside function '+func_name);}
  }

}
//========================================================
var silent = true; // if this is false, console will log each function name as it is called.
var log = true;  // if this is true, will use console log.  If false, will make alert notification in browser.
//========================================================

//========================================================
// We get all the canvases here and set their size
//========================================================
var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');
var canvas3 = document.getElementById('canvas3');
var canvas4 = document.getElementById('canvas4');

canvas2.coords = new Array();
canvas4.coords = new Array();

var csize = 300;
set_canvas_size(canvas1,canvas2, csize,csize);
set_canvas_size(canvas3,canvas4, csize,csize);

var rsize = 10;
var total_allowed_points = 8;

//========================================================
//the canvas contexts
//========================================================
var c1 = canvas1.getContext('2d');
var c2 = canvas2.getContext('2d');
var c3 = canvas3.getContext('2d');
var c4 = canvas4.getContext('2d');
//========================================================
// stored canvases as arrays
// the <imgs> array is generated from the server dynamically.  
// Please refer to the file server.js
//========================================================
var canvases = [canvas1, canvas3];
var canvas_tops = [canvas2, canvas4];
make_bases(imgs, canvases, 0, make_bases); // draws img[i] on canvases[i]
//========================================================
// This function takes two stacked convases and sets their size to be the same
//========================================================
function set_canvas_size(canvas_name_bot, canvas_name_top, w,h) {
  var myName = arguments.callee.name;
  display_func_name(myName, silent, log);

  canvas_name_top.width=w;
  canvas_name_top.height=h;
  canvas_name_bot.width=w;
  canvas_name_bot.height=h;
}
//========================================================
function make_bases(imgsrc, canvas, i, callback)
// draws imgs[i] on canvases[i] using callback 
{
  var myName = arguments.callee.name;
  display_func_name(myName, silent, log);

  c = canvas[i].getContext('2d');
  base_image = new Image();
  base_image.src = imgsrc[i];
  base_image.onload = function(){

    c.drawImage(base_image, 0, 0, base_image.width, base_image.height, 0, 0, canvas[i].width, canvas[i].height);

    if(typeof canvas[i+1] != 'undefined') {
  	callback(imgsrc, canvas, i+1, callback);
  }
  }
}
//========================================================
function getMousePos(canvas, evt) {

  var myName = arguments.callee.name;
  display_func_name(myName, silent, log);
	// gets the mouse position 
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
//========================================================
function canvas_draw(e) {
  var myName = arguments.callee.name;
  display_func_name(myName, silent, log);
	// Draws a black rectangle on the canvas

	c = this.getContext('2d')
	   
  if (this.coords.length < total_allowed_points) {
    var pos = getMousePos(this, e);
    posx = pos.x;
    posy = pos.y;
    this.coords.push([posx, posy]);
    c.fillRect(posx-rsize/2, posy-rsize/2, rsize, rsize);}

  else {alert('Only '+total_allowed_points.toString()+' points allowed.')}
}
//========================================================
//event function to reset keypoints
//========================================================
function clear(e) {
  e.preventDefault();
  c = this.getContext('2d')
  c.clearRect(0, 0, this.width, this.height);
  this.coords = [];
  return false;
}

//========================================================
// activated when submit button is clicked
//========================================================
function submit_results() {

  var myName = arguments.callee.name;
  display_func_name(myName, silent, log);
	console.log('Submit button clicked!');
}
//========================================================
// This is the function that makes the submisison happen.
// If a keypoint is not clicked on,the page alerts
// the user to mark all images before resubmitting
// Also activated whe submit button clicked
//========================================================
$(document).ready(function(){

    var myName = arguments.callee.name;
    display_func_name(myName, silent, log);
    $("#submit").click(function(){ //submit function is based on click
      var empty_field= false;
      var which_fields_empty = new Array();
      var submit_dict = new Array();
      var user=$("#user").val();
      for (i=0; i <imgs.length; i++) {
      	submit_dict[i]=(canvas_tops[i].coords); //submit_dict has the corresponding points clicked on each image
        console.log(canvas_tops[i].coords[0]);
        if (canvas_tops[i].coords[0] == null) {
          empty_field = true;
          which_fields_empty.push(i);
        }
      }
      var coords = JSON.stringify(submit_dict); // change submit_dict to a string
      if (!empty_field) { // only post the result if user clicked on all images
      $.ajax({
    	url: '/submit', // post data to /submit.  See server.js to see the server response.
    	type: 'POST',
      data: {coords: coords, user:user, task_num: task_num},
    	success: function (data) {
        	alert(data);
    	}
	   });
    }
    else { // alert user if he did not click on all images
      var empty_images = JSON.stringify(which_fields_empty);
      alert('Images '+empty_images+' were not clicked on.  Please choose keypoints for these images and resubmit');
    }
    });
  });
//========================================================
// we add an event to detect clicks on the "top" canvas.
// The bottom canvas contains the image and is not being drawn on
//========================================================
canvas2.addEventListener('click', canvas_draw, false);
canvas4.addEventListener('click', canvas_draw, false);
//========================================================
// Adding right click event to erase selected points
//========================================================
canvas2.addEventListener('contextmenu', clear, false);
canvas4.addEventListener('contextmenu', clear, false);
//========================================================