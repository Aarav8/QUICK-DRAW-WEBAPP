timer=0;
score=0;
setInterval(updateTimer, 1000 );
function setup()
{
    canvas=createCanvas(280 , 280);
    canvas.position(620,250);
    background("white");

    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}
function preload()
{
    classifier=ml5.imageClassifier("DoodleNet");
}

function draw()
{
    strokeWeight(7);
    stroke(0);
    if (mouseIsPressed)
    {
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}
function classifyCanvas()
{
    classifier.classify(canvas,gotresult);
}
function gotresult(error,results)
{
    if (error)
    {
        window.error(error);
    }
    console.log(results);
    document.getElementById("label").innerHTML="Label :"+results[0].label;
    document.getElementById("confidence").innerHTML="Confidence :"+Math.round(results[0].confidence*100);

    utterthis=new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterthis);

    random_no = Math.floor((Math.random()*results.length)+1);
    random_sketch=results[random_no].label;
    document.getElementById("to_be_drawn").innerHTML= "Sketch to be drawn : "+random_sketch;
    

    if(random_sketch=results[0].label)
    {
        canvas.background("white");
        score=score+1;
        document.getElementById("score").innerHTML="Score :"+score;
    }

    
}
function updateTimer()
{
    timer=timer+1;
    document.getElementById("timer").innerHTML="Timer :"+timer;
}
