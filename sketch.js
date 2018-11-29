var r, g, b;
var ww = 135; 
var hh = 465;
var BkeyX;
var WhichKey = 13;
var scaleArray1 = [60, 62, 64, 66, 68, 70, 72, 74, 61, 63, 65, 67, 69];
//var scaleArray2 = [48, 50, 52, 54, 58, 60, 62, 64, 49, 51, 53, 55, 57];
var osc,envelope;
var octave = 0;

function setup() {
  createCanvas(1220, 800);	
	
octave=createButton('Press to start');
octave.position(500,600);
octave.mousePressed(oct);
	
	
	BkeyX = [210, 350, 615, 750, 890];
	
	osc = new p5.SinOsc();
	// Instantiate the envelope
  envelope = new p5.Env();

  // set attackTime, decayTime, sustainRatio, releaseTime
  envelope.setADSR(0.03, 0.5, 0.01, 0.001);

  // set attackLevel, releaseLevel
  envelope.setRange(1, 0);
	osc.start();

}
 
function draw() {
  background(127);
  // Draw a circle
  strokeWeight(2);
  stroke(0);
  fill(255,255, 255);
	
	for (var i = 0; i <8; i++){    //draw the white keys
		pianow(100 + i*ww,100,ww,465);
	}
	
	fill(0);
	for (var j = 0; j < BkeyX.length; j++){ //draw the black keys
		pianow(BkeyX[j],100,50,250);
	}

}

// When the user clicks the mouse
function mouseMoved() {
	WhichKey = 13;
  // Check if mouse is inside the circle
  var Xclick = mouseX; 
	var Yclick = mouseY;
	
	for (var i = 0; i <8;i++) {  //check the white keys
		var LeftEdge = 100 + i*ww;
		var RightEdge = LeftEdge +ww;
		var Top = 100;
		var Bot = Top+hh;
	  if ( ((Xclick > LeftEdge) && (Xclick < RightEdge) )&& ((Yclick > Top) && (Yclick < Bot)) ) {
		  WhichKey = i;
	  } //end the if
	} //end the for loop
	
	//check Black keys
	for (var j = 0; j < BkeyX.length; j++){ //check the black keys
		var LeftEdge = BkeyX[j];
		var RightEdge = LeftEdge +50;
		var Top = 100;
		var Bot = Top+250;
	  if ( ((Xclick > LeftEdge) && (Xclick < RightEdge) )&& ((Yclick > Top) && (Yclick < Bot)) ) {
		  WhichKey = j+8;
	  } //end the if
	} //end the for loop
	
	//print("Key = "+WhichKey); 
	PlayTheNote(WhichKey);
}  //mouseMoved

function pianow(x,y,w,h){
	rect(x,y,w,h);
}

function PlayTheNote(InputNote) {

if (octave==0){
	  var midiValue = scaleArray2[InputNote];
	  print("Midi = "+midiValue);
    var freqValue = midiToFreq(midiValue);
    osc.freq(freqValue);
    envelope.play(osc, 0, 0.1);
 }  
	else if (octave == 1)  {
			 var midiValue = scaleArray1[InputNote];
	 		 print("Midi = "+midiValue);
   		 var freqValue = midiToFreq(midiValue);
   		 osc.freq(freqValue);

   		 envelope.play(osc, 0, 0.1);
 }
}

function oct(){
	if (octave == 0) {
		octave=1
	}
	else  {
		octave = 1 
	}
}
