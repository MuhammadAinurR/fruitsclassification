console.log('load image start');
var img2 = document.getElementById('img2');

console.log(img2);
console.log('image loaded');
var paragraphVGG = document.getElementById('waktuVGG');
var paragraphMobileNetV2 = document.getElementById('waktuMobileNetV2');
var paragraphResnet50 = document.getElementById('waktuResnet50');
var paragraphInceptionV3 = document.getElementById('waktuInceptionV3');
async function run2() {
  var element = document.getElementById('loadingScreen');
  element.classList.remove('hidden');
  console.log('function2 start');
  console.log('try to load the model');
  const modelvgg16 = await tf.loadLayersModel('model/vgg16/model.json');
  model = modelvgg16;
  console.log('VGG model loaded, starting pre processing image');
  let tensor = tf.browser
    .fromPixels(img2, 3)
    .resizeNearestNeighbor([100, 100]) // change the image size
    .expandDims()
    .toFloat()
    .reverse(-1); // RGB -> BGR
  console.log('preprocessing completed, starting warming up');

  // Warmup the model before using real data.S
  const warmupResult = model.predict(tf.zeros([1, 100, 100, 3]));
  warmupResult.dataSync(); // we don't care about the result
  warmupResult.dispose();

  console.log('starting VGG predict now');
  var startTime = performance.now();
  let predictions = await model.predict(tensor).data();
  var endTime = performance.now();
  console.log('VGG predict completed, starting make VGG 16result');
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
  console.log(top5);
  $('#prediction-list-VGG16').empty();
  top5.forEach(function (p) {
    $('#prediction-list-VGG16').append(`<li>${p.className}: ${p.probability.toFixed(3) * 100}</li>`);
  });
  var text = document.createTextNode(((endTime - startTime) / 1000).toFixed(3) + ' detik');
  paragraphVGG.removeChild(paragraphVGG.childNodes[0]);
  paragraphVGG.appendChild(text);

  // model resnet
  console.log('load Resnet50 model');
  const modelresnet50 = await tf.loadLayersModel('model/resnet50/model.json');
  model = modelresnet50;
  console.log('Resnet50 model loaded');
  // Warmup the model before using real data.S
  const warmupResult1 = model.predict(tf.zeros([1, 100, 100, 3]));
  warmupResult1.dataSync(); // we don't care about the result
  warmupResult1.dispose();
  console.log('starting Resnet50 predict now');
  var startTime = performance.now();
  let predictions1 = await model.predict(tensor).data();
  var endTime = performance.now();
  console.log('Resnet50 predict completed, starting make Resnet50 result');
  let top51 = Array.from(predictions1)
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
  console.log(top51);
  $('#prediction-list-Resnet50').empty();
  top51.forEach(function (p) {
    $('#prediction-list-Resnet50').append(`<li>${p.className}: ${p.probability.toFixed(3) * 100}</li>`);
  });
  var text = document.createTextNode(((endTime - startTime) / 1000).toFixed(3) + ' detik');
  paragraphResnet50.removeChild(paragraphResnet50.childNodes[0]);
  paragraphResnet50.appendChild(text);

  // model resnet
  console.log('load MobileNetV2 Model');
  const modelmobilenetv2 = await tf.loadLayersModel('model/mobilenetv2/model.json');
  model = modelmobilenetv2;
  console.log('MobileNetV2 loaded');
  // Warmup the model before using real data.S
  const warmupResult2 = model.predict(tf.zeros([1, 100, 100, 3]));
  warmupResult2.dataSync(); // we don't care about the result
  warmupResult2.dispose();
  console.log('starting MobileNetV2predict now');
  var startTime = performance.now();
  let predictions2 = await model.predict(tensor).data();
  var endTime = performance.now();
  console.log('MobileNetV2predict completed, starting make result');
  let top52 = Array.from(predictions2)
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
  console.log(top52);
  $('#prediction-list-MobileNetV2').empty();
  top52.forEach(function (p) {
    $('#prediction-list-MobileNetV2').append(`<li>${p.className}: ${p.probability.toFixed(3) * 100}</li>`);
  });
  var text = document.createTextNode(((endTime - startTime) / 1000).toFixed(3) + ' detik');
  paragraphMobileNetV2.removeChild(paragraphMobileNetV2.childNodes[0]);
  paragraphMobileNetV2.appendChild(text);

  // model inceptionv3
  console.log('load InceptionV3 Model');
  const modelinceptionv3 = await tf.loadLayersModel('model/inceptionv3/model.json');
  model = modelinceptionv3;
  console.log('InceptionV3 model loaded');
  // Warmup the model before using real data.S
  const warmupResult3 = model.predict(tf.zeros([1, 100, 100, 3]));
  warmupResult3.dataSync(); // we don't care about the result
  warmupResult3.dispose();
  console.log('starting InceptionV3 predict now');
  var startTime = performance.now();
  let predictions3 = await model.predict(tensor).data();
  var endTime = performance.now();
  console.log('InceptionV3 completed, starting make result');
  let top53 = Array.from(predictions3)
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
  console.log(top53);
  $('#prediction-list-InceptionV3').empty();
  top53.forEach(function (p) {
    $('#prediction-list-InceptionV3').append(`<li>${p.className}: ${p.probability.toFixed(3) * 100}</li>`);
  });
  var text = document.createTextNode(((endTime - startTime) / 1000).toFixed(3) + ' detik');
  paragraphInceptionV3.removeChild(paragraphInceptionV3.childNodes[0]);
  paragraphInceptionV3.appendChild(text);

  element.classList.add('hidden');
}

run2();

document.getElementById('myBtn2').addEventListener('click', run2);
