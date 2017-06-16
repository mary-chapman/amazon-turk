//========================================================
// We get all the canvases here and set their size
//========================================================
var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');
var canvas3 = document.getElementById('canvas3');
var canvas4 = document.getElementById('canvas4');
set_canvas_size(canvas1,canvas2, 300,300);
set_canvas_size(canvas3,canvas4, 300,300);
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
  canvas_name_top.width=w;
  canvas_name_top.height=h;
  canvas_name_bot.width=w;
  canvas_name_bot.height=h;
}
//========================================================
function make_bases(imgsrc, canvas, i, callback)
// draws imgs[i] on canvases[i] using callback 
{
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
	// gets the mouse position 
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function canvas_draw(e) {
	// Draws a block on the canvas

	c = this.getContext('2d')
	c.clearRect(0, 0, this.width, this.height); // clear previous marks on this window; each image should only have one keypoint drawn
    var pos = getMousePos(this, e);
    posx = pos.x;
    posy = pos.y;
    this.coords = [posx, posy]
    console.log(canvas2.coords)
    c.fillRect(posx-10, posy-10, 20, 20);
}

function submit_results() {
	console.log('submitted!');
}

$(document).ready(function(){
    $("#submit").click(function(){
      var submit_dict = new Array();
      var user=$("#user").val();
      for (i=0; i <imgs.length; i++) {
      	submit_dict[i]=(canvas_tops[i].coords);
      }
      var coords = JSON.stringify(submit_dict);
      console.log('coords', coords);
      //console.log('user', user);
      $.ajax({
    	url: 'http://localhost:8080/submit',
    	type: 'POST',
    	//data: {submit_dict, user:user},
      data: {coords: coords, user:user, task_num: task_num},
    	success: function (data) {
        	alert(data);
    	}
	});

    });
  });
// we add an event to detect clicks on the "top" canvas.
// The bottom canvas contains the image and is not being drawn on
canvas2.addEventListener('click', canvas_draw, false);
canvas4.addEventListener('click', canvas_draw, false);
