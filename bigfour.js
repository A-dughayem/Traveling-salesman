// Traveling salesman
// Abdullah Aldughayem
//#############################################################################################



var cities = [];		// changing var
var original = [];		// not changing
var totalCities = 16;	// number of cities
var rad = 50; 			// radius of circules in nighberhood for expanding method

/*
----- boudaries -----
0	0
250 250
250 0
500 250
0	250
250 500
250 250
500 500
*/
var theBigfourX = [0, 250,250,500,0,250,250,500];
var theBigfourY = [0,250,0,250,250,500,250,500];
/*
Q's bestEvers
*/
var BQ0, BQ1, BQ2, BQ3;
var BQ0Rc = 20000;
var BQ1Rc = 20000;
var BQ2Rc = 20000;
var BQ3Rc = 20000;

var Qboundaries; // 2d array of the boundaries of each Q 
var bestconnectorsEver; // best route of connectors

let btnInc, btnDec;

var devidedPointsIntoBigfour;	// cities in four big Q's, each in array


var recordDistance;				// current best destance
var bestEver;					// best route

var ss;
var nigberhood = [];
var centerPoint;
var centerPointNigborhood= [];
var smallnighbor = [] ; 
function setup() {

	var canvas = 500;						// canvas size
  let c =createCanvas(canvas, canvas);		// p5 intilizing canvas

  initingCities();							// putting new cities

/**
 * buttons
 */

 btnInc = createButton("+");
 btnInc.mousePressed(increaseCities);
 btnInc.position(480,10);
 btnInc.size(20,20);

 btnInc = createButton("-");
 btnInc.mousePressed(decreaseCities);
 btnInc.position(480,30);
 btnInc.size(20,20);


  

  recordDistance = calcDistance(cities);
 //bestEver = cities.slice();


// nigberhood = nighbors(original,rad);
// centerPoint = getIndexOfMax(nigberhood);
// centerPointNigborhood = nighborsofcentercity(original,rad,centerPoint);
//bestEver = centerPointNigborhood.slice();


updateBestEver();
updateBoundaries ();

bestconnectorsEver = Qboundaries.slice();
calcDistanceForConnectors();
//ss = getIndexOfMax3(nigberhood); SPLICE is worng
}

//#############################################################################################
function draw() {

background(0);
  /*
  ------- expanding circuls ------
  */
// stroke(255, 0, 40);
// beginShape();
// fill(255, 0, 0, 40);
// for (var i = 0; i < cities.length; i++) {
//   ellipse(cities[i].x, cities[i].y, 2 *rad);
// }
// endShape();
  /*
  ------- best route ------
  */
//   stroke(17, 50, 105);
//   strokeWeight(4);
//   noFill();
//   beginShape();
//   for (var i = 0; i < bestEver.length; i++) {
//     vertex(bestEver[i].x, bestEver[i].y);
//   }
//   endShape();

    /*
  ------- best Q route ------
  */
  stroke(145, 108, 51);
  strokeWeight(2);
  noFill();
  beginShape();
  for (var i = 0; i < bestEver[0].length; i++) {

		vertex(bestEver[0][i].x, bestEver[0][i].y);
    
  }
  
  endShape();
  beginShape();
  for (var i = 0; i < bestEver[1].length; i++) {

		vertex(bestEver[1][i].x, bestEver[1][i].y);
    
  }
  
  endShape();
  beginShape();
  for (var i = 0; i < bestEver[2].length; i++) {

		vertex(bestEver[2][i].x, bestEver[2][i].y);
    
  }
  
  endShape();
  beginShape();
  for (var i = 0; i < bestEver[3].length; i++) {

		vertex(bestEver[3][i].x, bestEver[3][i].y);
    
  }
  
  endShape();

    
   /*
  ------- connecting different Q's route ------
  */
  stroke(3, 111, 252);
  strokeWeight(2);
  noFill();
  beginShape();

		vertex(bestconnectorsEver[0][1].x, bestconnectorsEver[0][1].y);
		vertex(bestconnectorsEver[1][0].x, bestconnectorsEver[1][0].y);

  endShape();

  beginShape();

		vertex(bestconnectorsEver[1][1].x, bestconnectorsEver[1][1].y);
		vertex(bestconnectorsEver[2][0].x, bestconnectorsEver[2][0].y);

  endShape();

beginShape();


vertex(bestconnectorsEver[2][1].x, bestconnectorsEver[2][1].y);
vertex(bestconnectorsEver[3][0].x, bestconnectorsEver[3][0].y);


endShape();

   /*
  ------- current route ------
  */
  stroke(255);
  strokeWeight(0.3);
  noFill();

  beginShape();
  for (var i = 0; i < devidedPointsIntoBigfour[0].length; i++) {
    vertex(devidedPointsIntoBigfour[0][i].x, devidedPointsIntoBigfour[0][i].y);
  }
  endShape();
  beginShape();
  for (var i = 0; i < devidedPointsIntoBigfour[1].length; i++) {
    vertex(devidedPointsIntoBigfour[1][i].x, devidedPointsIntoBigfour[1][i].y);
  }
  endShape();
  beginShape();
  for (var i = 0; i < devidedPointsIntoBigfour[2].length; i++) {
    vertex(devidedPointsIntoBigfour[2][i].x, devidedPointsIntoBigfour[2][i].y);
  }
  endShape();
  beginShape();
  for (var i = 0; i < devidedPointsIntoBigfour[3].length; i++) {
    vertex(devidedPointsIntoBigfour[3][i].x, devidedPointsIntoBigfour[3][i].y);
  }
  endShape();
  /*
  ------- putting points ------
  */
  beginShape();
  fill(255);
  for (var i = 0; i < cities.length; i++) {
    ellipse(original[i].x, original[i].y, 8);
	textSize(10);
//	text(nigberhood[i], original[i].x + 10, original[i].y); //number of nighbors used in expanding circuls
	text(num2chars(i,true), original[i].x - 20, original[i].y);
  }
  var j =0;
  for(var i = 0; i<theBigfourX.length; i++){

	  
		if(i%2 == 0){
		fill(255, 0, 234);
		text("P: " + devidedPointsIntoBigfour[j].length, theBigfourX[i] + 200,theBigfourY[i] + 10);
		text("dist: " + eval(`BQ${j}Rc`).toFixed(2), theBigfourX[i] + 20,theBigfourY[i] + 10);
		fill(255);
		text("Q "+ ++j, theBigfourX[i] + 125,theBigfourY[i] + 10);

	  }
  }
  endShape();

      /*
  ------- connecter text ------
  */
  beginShape();
  fill(3, 111, 252)
  textSize(10);
  text("connectors: "+ connectQdist.toFixed(2), 10, 20);
  endShape();

    /*
  ------- text ------
  */
  beginShape();
  fill(255)
  textSize(10);
  var totalDist = BQ0Rc + BQ1Rc + BQ2Rc + BQ3Rc + connectQdist;
  text("total: "+totalDist.toFixed(2), 10, 30);
  textSize(10);
  text("Devide into four + better connectors", 10, 40);

  endShape();

  /*
  ------- deviding the canvas ------
  */
  beginShape();
  stroke(0,255,0);
  line(250,0,250,500);
  line(0,250,500,250)
  endShape();






buildpathforQ0(devidedPointsIntoBigfour[0]);
buildpathforQ1(devidedPointsIntoBigfour[1]);
buildpathforQ2(devidedPointsIntoBigfour[2]);
buildpathforQ3(devidedPointsIntoBigfour[3]);


calcbestcon();


// for (var i = 0; i < devidedPointsIntoBigfour.length; i++) {
// 	buildpathforQ(devidedPointsIntoBigfour[i]);
// }

rad+= 0.1;
//smallnighbor = nighborsofcentercity(original,rad,centerPoint);
}
//#############################################################################################
/**
 * botton funtions
 * updating the total cities
 */
function increaseCities(){
totalCities++;
initingCities();
}
function decreaseCities(){
	totalCities--;
	initingCities();
} 
/**
 * updating/init the cities
 */
function initingCities(){
	resetAll();

	for (var i = 0; i < totalCities; i++) {
		var v = createVector(random(width), random(height));
		v.name = num2chars(i,true);
		cities[i] = v;
		original[i] = v;
	  }
	  updateDevided();
	  updateBestEver();
	  updateBoundaries();
}
function updateDevided(){



devidedPointsIntoBigfour = pointsInEachQ(original);
BQ0 = devidedPointsIntoBigfour[0].slice();
BQ1 = devidedPointsIntoBigfour[1].slice();
BQ2 = devidedPointsIntoBigfour[2].slice();
BQ3 = devidedPointsIntoBigfour[3].slice();

}
function resetAll(){

cities=[];
original=[];
devidedPointsIntoBigfour=[];
BQ0 =[];
BQ1 =[];
BQ2 =[];
BQ3 =[];

bestEver =[];
bestconnectorsEver = [];
}


function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function buildpathforQ0(points){
	var i = floor(random(points.length));
	var j = floor(random(points.length));
	swap(points, i, j);

	var d = calcDistance(points);
	if (d < BQ0Rc) {
		BQ0Rc =d;
		BQ0 = points.slice();

	  updateBestEver();
	  updateBoundaries();
	  console.log("best Q0 = " + d.toFixed(2))
	}
}
function buildpathforQ1(points){
	var i = floor(random(points.length));
	var j = floor(random(points.length));
	swap(points, i, j);

	var d = calcDistance(points);
	if (d < BQ1Rc) {

		BQ1Rc = d;
		BQ1 = points.slice();

	  updateBestEver();
	  updateBoundaries();
	  console.log("best Q1 = " + d.toFixed(2))
	}
}
function buildpathforQ2(points){
	var i = floor(random(points.length));
	var j = floor(random(points.length));
	swap(points, i, j);

	var d = calcDistance(points);
	if (d < BQ2Rc) {

		BQ2Rc = d;
		BQ2 = points.slice();

	  updateBestEver();
	  updateBoundaries();
	  console.log("best Q2 = " + d.toFixed(2))
	}
}
function buildpathforQ3(points){
	var i = floor(random(points.length));
	var j = floor(random(points.length));
	swap(points, i, j);

	var d = calcDistance(points);
	if (d < BQ3Rc) {

		BQ3Rc = d;
		BQ3 = points.slice();

	  updateBestEver();
	  updateBoundaries();
	  console.log("best Q3 = " + d.toFixed(2))
	}
}
function buildpath(points){
	
	var i = floor(random(points.length));
	var j = floor(random(points.length));
	swap(points, i, j);
  
  
	var d = calcDistance(points);
	if (d < recordDistance) {
	  recordDistance = d;
	  bestEver = points.slice();
	  start = bestEver[0];
	  end = bestEver[points.length];
	  console.log("best = " + d.toFixed(2))
	}
}

function calcDistance(points) {
  var sum = 0;
  for (var i = 0; i < points.length - 1; i++) {
    var d = dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
    sum += d;
  }
  return sum;
}

function nighbors(points, rad) {
	var index=0;
	var numberOfNighbors = [];
	for (var i = 0; i < points.length; i++)
	{
		numberOfNighbors.push(-1);
	}
	
	for (var i = 0; i < points.length; i++) 
	{
		for (var j = 0; j < points.length; j++)
			{
			if(circleIntersect(points[i].x, points[i].y, rad, points[j].x, points[j].y, rad))
				{
					numberOfNighbors[index]++;
				}

			}
			index++; 
	}
	return numberOfNighbors;
  }
  function nighborsofcentercity(points, rad, center) {
	var index=0;
	var numberOfNighbors = [];

	

		for (var j = 0; j < points.length; j++)
			{
			if(circleIntersect(points[center].x, points[center].y, rad, points[j].x, points[j].y, rad))
				{
					numberOfNighbors.push(points[j])
				}

			}
			index++; 
		
	return numberOfNighbors;
  }

  function circleIntersect(x0, y0, r0, x1, y1, r1) {
    return Math.hypot(x0 - x1, y0 - y1) <= r0 + r1;
}

function num2chars(num, upper){
	num2chars.letters = num2chars.letters || 'abcdefghijklmnopqrstuvwxyz'.split('');
	var ret = repeat(num2chars.letters[num%26],Math.floor(num/26));
   
	function repeat(chr,n){
	 if (n<1) {return chr;}
	 return new Array(n+1).join(chr);
	}
   
	return upper ? ret.toUpperCase() : ret;
   }

function getIndexOfMax(n){

	var max = Math.max(...n);
	
	const index = n.indexOf(max);
	console.log("the index of element"+ max+ " is "+index + "which is "+ num2chars(index, true)); // 👉️ 3

	return index;
	
   }
function getIndexOfMax3(n){


	var top3 = [];
	for (var i =0; i<3 ; i++){
	var max = Math.max(...n);
		console.log
	var index = n.indexOf(max);
	//console.log("the index of element"+ max+ " is "+index + "which is "+ num2chars(index, true)); // 👉️ 3
	top3.push(index);
	n.splice();
	}



	return top3;
   }

function centercitiesoftopnighbors(points){

}

function gettophoods(numberOfHoods){
	
	for(var i =0; i<numberOfHoods ;i++){
		
		smallnighbor[i] = nighborsofcentercity(cities, rad, currentCiti);
		
	}
	

}
function pointsInEachQ(points){
	var all =[];

	var q1=[];
	var q2=[];
	var q3=[];
	var q4=[];
	for (var j = 0; j < points.length; j++)
			{
			if(points[j].x > theBigfourX[0] && points[j].x < theBigfourX[1] && points[j].y > theBigfourY[0] && points[j].y < theBigfourY[1]){
				// Q1
				q1.push(points[j])
			}
			else if(points[j].x > theBigfourX[2] && points[j].x < theBigfourX[3] && points[j].y > theBigfourY[2] && points[j].y < theBigfourY[3]){
				// Q2
				q2.push(points[j])
			}
			else if(points[j].x > theBigfourX[4] && points[j].x < theBigfourX[5] && points[j].y > theBigfourY[4] && points[j].y < theBigfourY[5]){
				// Q3
				q3.push(points[j])
			}
			else if(points[j].x > theBigfourX[6] && points[j].x < theBigfourX[7] && points[j].y > theBigfourY[6] && points[j].y < theBigfourY[7]){
				// Q4
				q4.push(points[j])
			}
			}

			all.push(q1);
			all.push(q2);
			all.push(q3);
			all.push(q4);


		return all;
}
function updateBestEver(){
	bestEver = []
	bestEver.push(BQ0);
	bestEver.push(BQ1);
	bestEver.push(BQ2);
	bestEver.push(BQ3);
}

function updateBoundaries (){
	Qboundaries = [];
	var t1 = [];
	var t2 = [];
	var t3 = [];
	var t0 = [];

	t0.push(BQ0[0])
	t0.push(BQ0[BQ0.length -1])
	t1.push(BQ1[0])
	t1.push(BQ1[BQ1.length -1])
	t2.push(BQ2[0])
	t2.push(BQ2[BQ2.length -1])
	t3.push(BQ3[0])
	t3.push(BQ3[BQ3.length -1])

	Qboundaries.push(t0);
	Qboundaries.push(t1);
	Qboundaries.push(t2);
	Qboundaries.push(t3);

	bestconnectorsEver = Qboundaries.slice();
	calcDistanceForConnectors();
	
}


function calcbestcon(){

	var i = floor(random(Qboundaries.length));
	var j = floor(random(Qboundaries.length));
	swap(Qboundaries, i, j);
  
	
		swapinsideboundaries(Qboundaries[i])
	
  
	var d = calcDistanceForCurrentCon();
	if (d < connectQdist) {

	  bestconnectorsEver = Qboundaries.slice();
	  connectQdist = d;
	  console.log("best connector = " + d.toFixed(2))
	}

}
function swapinsideboundaries(a){
	a =[]
	var temp = a[0];
	a[0] = a[1];
	a[1] = temp;
}

function calcDistanceForConnectors(){

	connectQdist = 0;
	if(bestconnectorsEver[0].length > 0 && bestconnectorsEver[0].length > 0 )
	connectQdist += dist(bestconnectorsEver[0][1].x, bestconnectorsEver[0][1].y,bestconnectorsEver[1][0].x, bestconnectorsEver[1][0].y);
	connectQdist += dist(bestconnectorsEver[1][1].x, bestconnectorsEver[1][1].y,bestconnectorsEver[2][0].x, bestconnectorsEver[2][0].y);
	connectQdist += dist(bestconnectorsEver[2][1].x, bestconnectorsEver[2][1].y,bestconnectorsEver[3][0].x, bestconnectorsEver[3][0].y);
	
}

function calcDistanceForCurrentCon(){

	temp = 0;
	temp += dist(Qboundaries[0][1].x, Qboundaries[0][1].y,Qboundaries[1][0].x, Qboundaries[1][0].y);
	temp += dist(Qboundaries[1][1].x, Qboundaries[1][1].y,Qboundaries[2][0].x, Qboundaries[2][0].y);
	temp += dist(Qboundaries[2][1].x, Qboundaries[2][1].y,Qboundaries[3][0].x, Qboundaries[3][0].y);

	return temp;
	
}
