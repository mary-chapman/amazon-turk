// We get all the canvases here and set their size
var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');
var canvas3 = document.getElementById('canvas3');
var canvas4 = document.getElementById('canvas4');
set_canvas_size(canvas1,canvas2, 300,300);
set_canvas_size(canvas3,canvas4, 300,300);
////////////////////////////////////////////////
//the canvas contexts
var c1 = canvas1.getContext('2d');
var c2 = canvas2.getContext('2d');
var c3 = canvas3.getContext('2d');
var c4 = canvas4.getContext('2d');
/////////////////////////////////////////////////

// stored canvases and images as arrays
var canvases = [canvas1, canvas3];
var imgs = ['images/test1.jpg','images/test.jpg']
////////////////////////////////////////

make_bases(imgs, canvases, 0, make_bases); // draws img[i] on canvases[i]

/////////////////////////////////////

function set_canvas_size(canvas_name_bot, canvas_name_top, w,h) {
// This function takes two stacked convases and sets their size to be the same
canvas_name_top.width=w;
canvas_name_top.height=h;
canvas_name_bot.width=w;
canvas_name_bot.height=h;

}

function make_bases(imgsrc, canvas, i, callback)
// draws img[i] on canvases[i] using callback 
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
    console.log(posx,posy)
    c.fillRect(posx-10, posy-10, 20, 20);
}

// we add an event to detect clicks on the "top" canvas.
// The bottom canvas contains the image and is not being drawn on
canvas2.addEventListener('click', canvas_draw, false);
canvas4.addEventListener('click', canvas_draw, false);