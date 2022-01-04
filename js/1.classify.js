console.log('load image start');
var img = document.getElementById('img');

console.log(img);
console.log('image loaded');
var paragraph = document.getElementById('waktu');
console.log('load model');
resnet50 = tf.loadLayersModel('model/resnet50/model.json');
mobilenetv2 = tf.loadLayersModel('model/mobilenetv2/model.json');
vgg16 = tf.loadLayersModel('model/vgg16/model.json');
inceptionv3 = tf.loadLayersModel('model/inceptionv3/model.json');
console.log('model loaded');

async function pemanasan() {
  console.log(tf.version);
  console.log('Pemanasan start');
  await resnet50.then((value) => (model1 = value));
  await mobilenetv2.then((value) => (model2 = value));
  await vgg16.then((value) => (model3 = value));
  await inceptionv3.then((value) => (model4 = value));

  console.log('starting warming up');
  // Warmup the model before using real data.S
  const warmupResult1 = model1.predict(tf.zeros([1, 100, 100, 3]));
  warmupResult1.dataSync(); // we don't care about the result
  warmupResult1.dispose();
  const warmupResult2 = model2.predict(tf.zeros([1, 100, 100, 3]));
  warmupResult2.dataSync(); // we don't care about the result
  warmupResult2.dispose();
  const warmupResult3 = model3.predict(tf.zeros([1, 100, 100, 3]));
  warmupResult3.dataSync(); // we don't care about the result
  warmupResult3.dispose();
  const warmupResult4 = model4.predict(tf.zeros([1, 100, 100, 3]));
  warmupResult4.dataSync(); // we don't care about the result
  warmupResult4.dispose();

  const loader = document.querySelector('.loader');
  loader.className += ' hidden';
  console.log('warmup completed, loading screen disapear');
}

async function run() {
  console.log('function start');
  var resiana = document.getElementById('pilihModel').value;
  console.log('try to load the model');
  model = null;
  if (resiana == 1) {
    await resnet50.then((value) => (model = value));
    console.log('model resnet50 selected');
  }
  if (resiana == 2) {
    await mobilenetv2.then((value) => (model = value));
    console.log('model mobilenetv2 selected');
  }
  if (resiana == 3) {
    await vgg16.then((value) => (model = value));
    console.log('model vgg16 selected');
  }
  if (resiana == 4) {
    await inceptionv3.then((value) => (model = value));
    console.log('model inceptionv3 selectes');
  }
  console.log(model);
  console.log('model loaded, starting pre processing image');
  let tensor = tf.browser
    .fromPixels(img, 3)
    .resizeNearestNeighbor([100, 100]) // change the image size
    .expandDims()
    .toFloat()
    .reverse(-1); // RGB -> BGR

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
    $('#prediction-list').append(`<li>${p.className}: ${(p.probability * 100).toFixed(2)}</li>`);
  });
  var text = document.createTextNode(((endTime - startTime) / 1000).toFixed(3) + ' detik');
  paragraph.removeChild(paragraph.childNodes[0]);
  paragraph.appendChild(text);
}

pemanasan();
run();
document.getElementById('myBtn').addEventListener('click', run);
