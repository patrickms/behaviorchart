var Firebase=require('firebase')
var root=new Firebase('https://behaviorchart.firebaseIO.com/')

var five = require("johnny-five");
var os=require('os');
var datejs=require('datejs');
var board;
if(os.type().toLowerCase()=='windows_nt')
	board = new five.Board( {port: "COM3"});
else
	board = new five.Board();

var lastRows=[];
var powerPin=null;

function updatePower(rows)
{
    var newState=false;
    if(rows)
    {
    	console.log('handling rows', rows);
    	var now=new Date();
    	var today=Date.today();
    	var nearestBefore =today.at('00:00AM');
    	var allowBefore = false;
    	var nearestAfter = today.at('11:59:59PM');
    	rows.forEach(function(row, rowIndex)
    	{
    		console.log('nearestBefore', nearestBefore);
    		console.log(row);
    		startTime=today.at(row.startTime);
    		if(startTime<=now && startTime>=nearestBefore)
    		{
    			nearestBefore=startTime;
    			allowBefore=row.electronicsAllowed&&row.preconditionsMet;
    		}
    		if(startTime>now && startTime<=nearestAfter)
    		{
    			nearestAfter=startTime;
    		}
    	});
    	console.log(nearestBefore, nearestAfter, allowBefore);
    	if(powerPin)
    	{
			if(allowBefore)
				powerPin.on();
			else
				powerPin.off();
		};
    	setTimeout( updatePowerFromLastRows, nearestAfter - ( new Date() ) );
	}
}

function updatePowerFromLastRows()
{
	updatePower(lastRows);
}

  (function waitTime () {
   setTimeout(waitTime, 2000);
  })();
board.on("ready", function() {
  console.log('Arduino ready');
  // Create a standard `led` component instance
  powerPin = new five.Led(12);
  ledPin = new five.Led(13);
  ledPin.blink(500);
  console.log('power pin created');
//  powerPin.on();
  var timetableRef = root.child('timetable');
  console.log('timetableref created');
  
  powerRef.on('value', function(dataSnapshot) {
    // code to handle new value.
    val=dataSnapshot.val().toLowerCase().trim();
    console.log('powerRef value',val);
    if(val=='on')
    	powerPin.on();
    else if(val=='off')
    	powerPin.off();
  });
/*
  timetableRef.on('value', function(dataSnapshot) {
    // code to handle new value.
    var rows=dataSnapshot.val();
    console.log('updating data for', rows);
    lastRows=rows;
    updatePower(rows);
    console.log('power updated');
  });*/
  // "blink" the led in 500ms
  // on-off phase periods
  
  //Wait for standrd input to avoid quitting
  //process.stdin.resume();
  //setInterval(function(){}, Math.POSITIVE_INFINITY);
});
