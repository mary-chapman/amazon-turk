//========================================================
The goal of this project is to create an Amazon Mechanical Turk interface to collect
user selected keypoints on images.  It does not matter what the keypoints are, but for sake 
of example the current website asks the user to "Please click the middle of the back of each chair and then submit."

//========================================================
CURRENT FUNCTIONALITY:
//========================================================

The default page has a list of tasks.  The user clicks on a task link,
which brings him to the main task page.  There, he clicks on each
image and then submits the results by typing in his name and clicking submit.
Upon doing so, the server saves a .txt file in /output containing the results.  
The txt file is named after the user (currently inputting his/her name in a box before submitting) and task number.

//========================================================
GETTING STARTED:
//========================================================

1. Make sure node and npm is installed.  [a link](https://nodejs.org/en/)
2. Make sure the following packages work (they are currently included in the repo so should be fine,here is a list anyway):

	npm install	http
	npm install	fs
	npm install	var bodbody-parser
	npm install	url
	npm install	varexpress
	npm install	var app = express
	npm install	path
	npm install	request
	npm install	child process


3. Go to root directory and execute:

	node server.js

4. Open web browser and go to:

	http://localhost:8080

5. Click on a task.  The task links are generated from the files in /imglists

6. Follow the instructions on the page.  You can go to /output to see the results.

//========================================================
DIRECTORY STRUCTURE:
//========================================================

/imglists - contains .txt files with image filenames inside corresponding to images in /public/images
/output - output directory .txt files
/public - client side web pages
server.js - the server file.  

//========================================================
Navigating the code:
//========================================================

Start with server.js and canvas.js.  These are the two main components.  You will notice
that at the top of these 2 files are some debugging functions:

	display_func_name(func_name, silent, log) <---- inside canvas.js
	function display_request_name(request_name, silent) <----- inside server.js

,as well a variable underneath: var silent = true;

If you make (silent = false) in either or both functions, the console and/or browser will
output when each function or .get request is being accessed.  In the case of canvas.js,
you can also make these print statements as alert nofifications in the browser by setting (var log = false).

These print statements are off by default.

//================================================================================================================
//================================================================================================================
//================================================================================================================
//================================================================================================================
TO DO (LISTED IN ORDER OF PRIORITY.  1 IS HIGHEST PRIORITY):
//================================================================================================================
//================================================================================================================
//================================================================================================================
//================================================================================================================


//================================================================================================================
1***. Make compatible with Amazon Mechanical Turk. [a link](https://www.mturk.com/mturk/welcome)|||| MOST IMPORTANT TASK PLS DO FIRST
//================================================================================================================
	a) 
	This implementation only works locally right now.  We need it to work with the Turk interface.  
	Turk has a node.js API, but you can also use the PHP API if you like.  It is essential to familiarize
	yourself with the amazon api.  I recommend using node.js since that is what is being used so far. 

	b) 
	In short, workers go to Turk and choose tasks, which redirects to our server.   Right now, the 
	start page has a link to each task which the client clicks on.  
	WHAT WE WANT: eventually the task should be redirected directly from which task the worker picks on the Amazon interface.  

	c) 
	Currently, I have some input box where someone types their user_id
	WHAT WE WANT: eventually the worker_id is got from Amazon's API when the worker starts the job.  We need the worker_id to pay the worker.  

	d) 
	Make an AWS account and deploy the job into the "sandbox" to test what it will look like once you have things going.  
	Sandbox is free testing platform, please don't actually deploy the job.

//================================================================================================================
2. Additional Functionality 
//================================================================================================================
	CURRENT APPROACH: Each image corresponds to two html5 canvases (see canvas.js and task_top.html) The bottom convas displays the image, the top canvas indicates marked points.  


	a) 
	Right now, the user clicks on 1 point and it is marked on the image, if he clicks another point the first point dissapears and the second appears.  
	WHAT WE WANT: He can click on a max of K points, K is a variable to be defined on the page. 
	If he right clicks on a point, that point dissapears.  There should be a button to erase all the points under
	each image.  There should also be a checkbox to indicate "No relevant regions visible" for that image.  Make sure all clicked/checked data for each image
	is saved in some format to a txt file in /output directory.  

	b) 
	Right now, there are two fixed images on the page.  
	WHAT WE WANT: The number of images is generated dynamically from the number of image files listed in each task text file.  

	c)
	Right now, no final review page.
	WHAT WE WANT: when user clicks submit, a page is generated showing all images and relevant clicks/data the user input.    
	There should be a final confirm button, and a button which takes the user back to edit some more.  

//================================================================================================================
3. Small Stuff
//================================================================================================================
	a)
	Make it somewhat prettier

	b) 
	Make sure that there are no glaring vulnerabilities for attack. 