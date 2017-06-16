var http = require("http");
var fs = require('fs');
var bodyParser     =  require("body-parser");
var url = require('url');
var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
const exec = require('child_process').exec;
//========================================================
app.use(express.static(__dirname + '/public')); // takes us to index.html
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//========================================================
//========================================================
// This is where everything starts.  We technically start at index.html, but
// index.html automatically sends us to "/begin", so it activates this .get
// the /imglists directory is a directory of .txt files each containing img file names.  Each
// .txt file denotes a task.  
//
// This function reads all the .txt files and makes a link for each of them.  Clicking on
// the link starts the task for the corresponding set of images in that .txt file
//========================================================
//========================================================
app.get('/begin',function(req, res) {
	var files = fs.readdirSync(__dirname +"/imglists/");
	var links = new Array();
 
	for (i=0; i<files.length; i++) { // add a link for each file in /imglists
		links[i] = '<a href = '+ '\"imglists\\' + i.toString() + '\"' + '>' +  'task_' + i.toString() + '</a>';
		// Notice that each link redirects simply to the file index as a string.  This will be relevant in the
		// subsequent "app.get('/imglists/:num')"" call.
	} 
	//========================================================
	// we serve the html page dynamically by combining a template for an html page (html_top and html_bottom)
	// along with links, which we insert into the middle, and the serve
	//========================================================
	var html_top = ' <!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"> \
		<title>Canvas Resize</title><style type=\"text/css\"></style></head><body> ';
	var links = links.toString().split(',').join('<br>'); //The links that show up are based on the .txt files
	var html_bottom = ' </body></html> ';
	res.send(html_top + links + html_bottom); // sending the string concatenation
});
//========================================================
// The following get call gets activated after the user clicks on one of the links served up by
// the above "app.get('/begin')" call.
// Notice the /:num, so we have access to the file index the link we clicked above corresponds to.
// This way, we can get the imglist which corresponds to that file.
// Finally, after getting the <imgs> array, we send the <imgs> array along
// with the task index to the actual task page.
//========================================================
app.get('/imglists/:num',function(req, res) {

	var files = fs.readdirSync(__dirname +"/imglists/");
	var task_num = Number(req.params.num); //task num got from url
	var text = fs.readFileSync(__dirname + '/imglists/' + files[task_num],'utf8'); // get the .txt file that corresponds to task_num
	var imgs = text.split('\r\n');

	for (i = 0; i < imgs.length; i++) { // add the imgs to an array
		imgs[i] =  '/images/' + imgs[i] ;
	    imgs[i] = '\'' + imgs[i] + '\'';
	}

	res.redirect(url.format({ //send the imgs and task_num to the actual task page in the form of a query
       pathname:"/task",
       query: {
          "imgs": imgs.toString(),
          "task_num": req.params.num,
        }
     }));
});
//========================================================
// We are redirected here from "app.get('/imglists/:num')" written above
// That .get relays an array of imgs and the task_number (the task corresponds to the img array)
// to this function.  This function then serves an html/js page with the img array and task_num 
// as new variables.  Similar to the "app.get('/begin')" call, we have a top and bottom
// html template that we stick the new variables in before serving.  This served html/js page
// is where the task is actually being completed, so please review the following files closely:

// task_top.html
// task_bottom.html
// canvas.js <-- js script embedeed in  task_bottom.html

// the canvas.js page uses the dynamic img/task_num variables in order to choose 
// the correct images to be loaded for the task
//========================================================
app.get('/task',function(req, res) {
	var imgs = req.query.imgs;
	var task_num = req.query.task_num;

    var top = fs.readFileSync(__dirname +"/public/task_top.html", 'utf8');
    var middle_img = ' <script> var imgs = [' +imgs+']; </script> <br>'; // add imgs array as variable dynamically
    var middle_task = '<script> var task_num = '+task_num+' </script> <br>'; // add task_num array as variable dynamically
    var bottom = fs.readFileSync(__dirname +"/public/task_bottom.html", 'utf8');

    html = top + middle_img + middle_task + bottom;
	res.send(html);
});
//========================================================
// this post is activated when user clicks submit button
// it takes the keypoints recorded in the website and 
// writes them into a .txt file.  The .txt file name
// contains the username and task number
//========================================================
app.post('/submit',function(req,res){
  
  
  var coords = req.body.coords;
  var user = req.body.user;
  var task_num = req.body.task_num;
  out_str = coords; // final user submitted coordinates 
  export_command = '(echo '+out_str+') > output/'+user+'_'+task_num+'.txt'; // writes the coordinates into a txt file, the file name is the username and txt number

  exec(export_command, function(err, stdout, stderr){ // exec library lets the server execute the command.  It is saved in the /output directory
	  if (err) {
	    console.error(err);
	    return;
	  }
	  console.log(stdout);
	});
});
//========================================================
app.listen(8080);
console.log('Server running at http://127.0.0.1:8080/');