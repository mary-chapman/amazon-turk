var AWS = require('aws-sdk');
fs = require('fs');

AWS.config.loadFromPath('./config.json');
var endpoint = 'https://mturk-requester-sandbox.us-east-1.amazonaws.com';

// Uncomment this line to use in production
// endpoint = 'https://mturk-requester.us-east-1.amazonaws.com';

var mturk = new AWS.MTurk({ endpoint: endpoint });

// This will return $10,000.00 in the MTurk Developer Sandbox
mturk.getAccountBalance(function(err, data){
    console.log(data.AvailableBalance);
});

fs.readFile('public/samp_question.html', 'utf8', function (err,my_question) {
    if (err) {
        return console.log(err);
    };

// Construct the HIT object below
    var myhit = {
        Title:"This is a new test question",
        Description:"Another description",
        MaxAssignments: 1,
        LifetimeInSeconds: 3600,
        AssignmentDurationInSeconds: 600,
        Reward:'0.20',
        Question:my_question,

        // Add a qualification requirement that the Worker must be either in Canada or the US 
        QualificationRequirements:[{
            QualificationTypeId:'00000000000000000071',
            Comparator: "In",
            LocaleValues: [{Country:'US'},{Country:'CA'}]
        }]
    }

 // Publish the object created above
    mturk.createHIT(myhit,function(err, data)
    {
        if(err)
            console.log(err.message);
        else{
            console.log(data);
            // Save the HITId printed by data.HIT.HITId and use it in the RetrieveAndApproveResults.js code sample
            console.log("HIT has been successfully published here: " + "https://workersandbox.mturk.com/mturk/preview?groupId=" + data.HIT.HITTypeId + " with this HITId: " + data.HIT.HITId)
        }
    })
});