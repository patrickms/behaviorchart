var Firebase=require('firebase')
var root=new Firebase('https://behaviorchart.firebaseIO.com/')

var five = require("johnny-five");
var os=require('os');
var board;
if(os.type().toLowerCase()=='windows_nt')
	board = new five.Board( {port: "COM3"});
else
	board = new five.Board();

board.on("ready", function() {
  console.log('Arduino ready');
  
  // Create a standard `led` component instance
  var powerPin = new five.Led(12);
  var powerRef = root.child('power');
  var timetableRef = root.child('timetable');
  /*
  powerRef.on('value', function(dataSnapshot) {
    // code to handle new value.
    val=dataSnapshot.val().toLowerCase().trim();
    console.log('powerRef value',val);
    if(val=='on')
    	powerPin.on();
    else if(val=='off')
    	powerPin.off();
  });*/

  // "blink" the led in 500ms
  // on-off phase periods
  
});
