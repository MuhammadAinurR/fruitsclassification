console.log('load image start');
var img = document.getElementById('img');

console.log(img);
console.log('image loaded');
var paragraph = document.getElementById('waktu');
async function run() {
  console.log('function start');
  var resiana = document.getElementById('pilihModel').value;
  console.log('try to load the model');
  const modelresnet50 = await tf.loadLayersModel('model/resnet50/model.json');
  const modelvgg16 = await tf.loadLayersModel('model/vgg16/model.json');
  const modelmobilenetv2 = await tf.loadLayersModel('model/mobilenetv2/model.json');
  const modelinceptionv3 = await tf.loadLayersModel('model/inceptionv3/model.json');
  model = null;
  if (resiana == 1) {
    model = modelresnet50;
  }
  if (resiana == 2) {
    model = modelmobilenetv2;
  }
  if (resiana == 3) {
    model = modelvgg16;
  }
  if (resiana == 4) {
    model = modelinceptionv3;
  }
  console.log('selected model is ' + resiana);
  console.log('model loaded, starting pre processing image');
  let tensor = tf.browser
    .fromPixels(img, 3)
    .resizeNearestNeighbor([100, 100]) // change the image size
    .expandDims()
    .toFloat()
    .reverse(-1); // RGB -> BGR
  console.log('preprocessing completed, starting warming up');

  // Warmup the model before using real data.S
  const warmupResult = model.predict(tf.zeros([1, 100, 100, 3]));
  warmupResult.dataSync(); // we don't care about the result
  warmupResult.dispose();

  const loader = document.querySelector('.loader');
  loader.className += ' hidden';
  console.log('warmup completed, loading screen disapear');

  console.log('starting predict now');
  var startTime = performance.now();
  let predictions = await model.predict(tensor).data();
  var endTime = performance.now();
  console.log('predict completed, starting make result');
  let top5 = Array.from(predictions)
    .map(function (p, i) {
      // this is Array.map
      return {
        probability: p,
        className: TARGET_CLASSES[i], // we are selecting the value from the obj
      };
    })
    .sort(function (a, b) {
      return b.probability - a.probability;
    })
    .slice(0, 5);

  $('#prediction-list').empty();
  top5.forEach(function (p) {
    $('#prediction-list').append(`<li>${p.className}: ${p.probability.toFixed(3) * 100}</li>`);
  });
  var text = document.createTextNode(((endTime - startTime) / 1000).toFixed(3) + ' detik');
  paragraph.removeChild(paragraph.childNodes[0]);
  paragraph.appendChild(text);
}

run();

document.getElementById('myBtn').addEventListener('click', run);
