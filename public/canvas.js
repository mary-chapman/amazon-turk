
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
var canvas5 = document.getElementById('canvas5');
var canvas6 = document.getElementById('canvas6');
var canvas7 = document.getElementById('canvas7');
var canvas8 = document.getElementById('canvas8');
var canvas9 = document.getElementById('canvas9');
var canvas10 = document.getElementById('canvas10');
var canvas11 = document.getElementById('canvas11');
var canvas12 = document.getElementById('canvas12');

var csize = 200;
var maxheight = 300;

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
var canvases = [canvas1, canvas3, canvas5, canvas7, canvas9, canvas11];
var canvas_tops = [canvas2, canvas4, canvas6, canvas8, canvas10, canvas12];
var all_canvases = [canvas1, canvas3, canvas5, canvas7, canvas9, canvas11, canvas2, canvas4, canvas6, canvas8, canvas10, canvas12];
//set_canvas_sizes(all_canvases, csize, csize);
make_bases(imgs, canvases, canvas_tops, 0, make_bases); // draws img[i] on canvases[i]
instantiate_coords(canvas_tops);
//========================================================

function instantiate_coords(mycanvases) {

  for (i = 0; i < mycanvases.length; i++) {
    mycanvases[i].coords = new Array();
  }
}


//========================================================
// This function takes convases and sets their size to be the same
//========================================================
function set_canvas_sizes(canvases, w,h) {
  var myName = arguments.callee.name;
  display_func_name(myName, silent, log);

  for (i = 0; i < canvases.length; i++) {

    canvas_name = canvases[i];
    canvas_name.width=w;
    canvas_name.height=h;
}
}
//========================================================
function make_bases(imgsrc, canvas_bottoms, canvas_tops, i, callback)
// draws imgs[i] on canvases[i] using callback 
{
  var myName = arguments.callee.name;
  display_func_name(myName, silent, log);

  c_bottom = canvas_bottoms[i].getContext('2d');

  base_image = new Image();
  base_image.src = imgsrc[i];
  base_image.onload = function(){

    canvas_bottoms[i].width = csize;
    canvas_bottoms[i].height = base_image.height * (csize/base_image.width);

    if (canvas_bottoms[i].height > maxheight) {
      canvas_bottoms[i].height = maxheight;
      canvas_bottoms[i].width = base_image.width * (maxheight/base_image.height)
    }

    canvas_tops[i].width = canvas_bottoms[i].width;
    canvas_tops[i].height = canvas_bottoms[i].height;

<<<<<<< HEAD
    im_height_str = (canvas_tops[i].height + 84).toString();

    document.getElementById("clear"+(i*2+2).toString()).style.top = im_height_str+'px';
    //cur_top = "500px";
    //alert("clear"+(i*2+2).toString());
    //console.log(cur_top);

=======
>>>>>>> parent of 46371d7... got certs
    c_bottom.drawImage(base_image, 0, 0, base_image.width, base_image.height, 0, 0, canvas_bottoms[i].width, canvas_bottoms[i].height);

    if(typeof canvas_bottoms[i+1] != 'undefined') {
  	callback(imgsrc, canvas_bottoms, canvas_tops, i+1, callback);
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
    c.fillStyle = "red";

    c.beginPath();
    c.arc(posx, posy, 5, 0, 2 * Math.PI);
    c.fill();

    //c.fillRect(posx-rsize/2, posy-rsize/2, rsize, rsize);
  }

  else {alert('Only '+total_allowed_points.toString()+' points allowed.')}

    turkSetAssignmentID(assignmentId);
}
//========================================================
//event function to reset keypoints
//========================================================
function clear(e) {
  e.preventDefault();
  c = this.getContext('2d')
  c.clearRect(0, 0, this.width, this.height);
  this.coords = [];

  turkSetAssignmentID(assignmentId);
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
// Function to encapsulate the ajax post
//========================================================
function ajax_post(myurl, mydata) {
  $.ajax({
      url: myurl, // post data to /submit.  See server.js to see the server response.
      type: 'POST',
      data: mydata,
      success: function (mydata) {
          alert(data);
      }
     });
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
      var comments=$("#comments").val();
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

     var mydata = {coords: coords, comments: comments, task_num: task_num, assignmentId: assignmentId};
     ajax_post('/submit', mydata);
    }
    else { // alert user if he did not click on all images
      var empty_images = JSON.stringify(which_fields_empty);
      alert('Images '+empty_images+' were not clicked on.  Please choose keypoints for these images and resubmit');
    }
    });
  });
//========================================================
//set the assignment id for submission
//========================================================
function turkSetAssignmentID(assignmentId) {

  button_name = 'submit';
  document.getElementById('assignmentId').value = assignmentId;
  btn = document.getElementById(button_name);

  var empty_field= false;
  for (i=0; i <imgs.length; i++) {

        if (canvas_tops[i].coords[0] == null) {
          empty_field = true;
          break;
        }
  }

  if (assignmentId == "ASSIGNMENT_ID_NOT_AVAILABLE") { 
    // If we're previewing, disable the button and give it a helpful message
    if (btn) {
      btn.disabled = true; 
      btn.value = "You must ACCEPT the HIT before you can submit the results.";
      return false
    } 
  }

  
  else if (empty_field) {
    btn.value = "Please choose a keypoint for each image before submitting";
    return false;
  }

  else {
    btn.value = "Submit";
    btn.disabled = false; 
    return true;

  }


}

function add_events(mycanvases) {

  for (i = 0; i<mycanvases.length; i++) {

    mycanvases[i].addEventListener('click', canvas_draw,false);
    mycanvases[i].addEventListener('contextmenu', clear, false);
  }
}

function check_submission_status() {

  return turkSetAssignmentID(assignmentId);
}

add_events(canvas_tops);
