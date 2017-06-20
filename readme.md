
The goal of this project is to create an Amazon Mechanical Turk interface to collect
user selected keypoints on images.  It does not matter what the keypoints are, but for sake 
of example the current website asks the user to "Please click the middle of the back of each chair and then submit."


CURRENT FUNCTIONALITY:
------

The default page has a list of tasks.  The user clicks on a task link,
which brings him to the main task page.  There, he clicks on each
image and then submits the results by typing in his name and clicking submit.
Upon doing so, the server saves a .txt file in /output containing the results.  
The txt file is named after the user (currently inputting his/her name in a box before submitting) and task number.

CURRENT APPROACH: Each image corresponds to two html5 canvases (see canvas.js and task_top.html) 
The bottom convas displays the image, the top canvas indicates marked points.  


GETTING STARTED:
------

1. Make sure node and npm is installed.  [Install Node Here](https://nodejs.org/en/)
2. Make sure the following packages work (they are currently included in the repo so should be fine,here is a list anyway):

	npm install	http

	npm install	fs

	npm install body-parser

	npm install	url

	npm install	express

	npm install	path

	npm install	request

	npm install	child_process


3. Go to root directory and execute:
	
		node server.js

4. Open web browser and go to:

	http://localhost:8080

5. Click on a task.  The task links are generated from the files in /imglists

6. Follow the instructions on the page.  You can go to /output to see the results.

DIRECTORY STRUCTURE:
------

/imglists - contains .txt files with image filenames inside corresponding to images in /public/images

/output - output directory .txt files

/public - client side web pages

server.js - the server file.  

NAVIGATING THE CODE:
------

Start with server.js and canvas.js.  These are the two main components.  You will notice
that at the top of these 2 files are some debugging functions:

	display_func_name(func_name, silent, log) <---- inside canvas.js
	function display_request_name(request_name, silent) <----- inside server.js

,as well a variable underneath: var silent  true;

If you make (silent  false) in either or both functions, the console and/or browser will
output when each function or .get request is being accessed.  In the case of canvas.js,
you can also make these print statements as alert nofifications in the browser by setting (var log  false).

These print statements are off by default.
