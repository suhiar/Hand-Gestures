prediciton_1 = ""
prediciton_2 = ""

Webcam.set(
    {
        width:350,
        height:300,
        image_format:"png",
        png_quality:100
    }
)

camera = document.getElementById("camera")

Webcam.attach(camera)

function take_snapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML="<img id='snapshot' src="+data_uri+">"
})
}

classifer= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/_Qt52t56N/model.json",model_loaded)

function model_loaded(){
    console.log("Model is successfully loaded")
}

function check(){
    carimg = document.getElementById("snapshot")
    classifer.classify(carimg,got_result)
}

function got_result(error,results){
if(error){
    console.error(error)
}
else{
    console.log(results)
    prediciton_1= results[0].label
    prediciton_2= results[1].label
    document.getElementById("Emotion_1").innerHTML= prediciton_1
    document.getElementById("Emotion_2").innerHTML= prediciton_2

    if(prediciton_1=="Amazing"){
        document.getElementById("Emoji_1").innerHTML="&#128076; - This is looking Amazing"
    }

    else if(prediciton_1=="Best"){
        document.getElementById("Emoji_1").innerHTML="&#128077; - All the Best"
    }

    else if(prediciton_1=="Victory"){
        document.getElementById("Emoji_1").innerHTML="&#9996; - That was a marvelous Victory"
    }

    if(prediciton_2=="Amazing"){
        document.getElementById("Emoji_2").innerHTML="&#128076; - This is looking Amazing"
        }
    
    else if(prediciton_2=="Best"){
        document.getElementById("Emoji_2").innerHTML="&#128077; - All the Best"
        }
    
    else if(prediciton_2=="Victory"){
        document.getElementById("Emoji_2").innerHTML="&#9996; - That was a marvelous Victory"
        }

        speak()

}
}

function speak(){
    synth= window.speechSynthesis
    speak_data_1= "Prediction 1 "+prediciton_1
    speak_data_2= "Prediction 2 "+prediciton_2
    utterthis= new SpeechSynthesisUtterance(speak_data_1+speak_data_2)
    synth.speak(utterthis)
}

