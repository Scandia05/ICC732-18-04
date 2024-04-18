let mobilenet;
let predictor;
let video;
let value = 0;


function modelReady() {
  console.log('Model is ready!!!');
  // Puedes comenzar a predecir resultados aquí si lo deseas
  predictor.predict(gotResults);
}

function videoReady() {
  console.log('Video is ready!!!');
}

function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    // Actualiza el valor con los resultados de predicción
    value = result.value;
    predictor.predict(gotResults);
  }
}

function setup() {
  createCanvas(320, 270);
  video = createCapture(VIDEO);
  video.hide();
  background(0);

  // Cargar un modelo previamente guardado
  // Crea una instancia de ml5.featureExtractor
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  
  // Cargar el modelo desde los archivos model.json y model.weights.bin
  predictor= mobilenet.regression(video,videoReady);
  predictor.load('model.json', 'model.weights.bin', video, videoReady);
}

function draw() {
  background(0);
  image(video, 0, 0, 320, 240);
  rectMode(CENTER);
  fill(255, 0, 200);
  rect(value * width, height / 2, 50, 50);

  fill(255);
  textSize(16);
  text(value, 10, height - 10);
}