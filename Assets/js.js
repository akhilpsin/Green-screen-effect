var fgImage = null;  
var bgImage = null;  
var fgCanvas;  
var bgCanvas;

function drawImageOnCanvas(image, canvas) {  
  // Get the canvas context.  
  var context = canvas.getContext('2d');  
    
  // Clear the canvas.  
  context.clearRect(0, 0, canvas.width, canvas.height);  
    
  // Calculate the best fit size for the image while keeping the aspect ratio.  
  var scaleWidth = canvas.width / image.getWidth();  
  var scaleHeight = canvas.height / image.getHeight();  
  var scale = Math.min(scaleWidth, scaleHeight);  
    
  var imgWidth = image.getWidth() * scale;  
  var imgHeight = image.getHeight() * scale;  
    
  // Calculate the position to center the image on the canvas.  
  var x = (canvas.width - imgWidth) / 2;  
  var y = (canvas.height - imgHeight) / 2;  
    
  // Draw the image on the canvas.  
  context.drawImage(image, x, y, imgWidth, imgHeight);  
}  

  
function loadForegroundImage() {  
  var file = document.getElementById("fgfile");  
  fgImage = new SimpleImage(file);  
  fgCanvas = document.getElementById("fgcan");
  fgImage.drawTo(fgCanvas); 
  drawImageOnCanvas(fgImage, fgCanvas);
}  
  
function loadBackgroundImage() {  
  var file = document.getElementById("bgfile");  
  bgImage = new SimpleImage(file);  
  bgCanvas = document.getElementById("bgcan");  
  bgImage.drawTo(bgCanvas);  
}  
  
function createComposite() {  
  var output = new SimpleImage(fgImage.getWidth(), fgImage.getHeight());  
  var greenThreshold = 130;  
  for (var pixel of fgImage.values()) {
    var x = pixel.getX();  
    var y = pixel.getY();  
    if (pixel.getGreen() >= greenThreshold) {  
      var bgPixel = bgImage.getPixel(x, y);  
      output.setPixel(x, y, bgPixel);  
    } else {  
      output.setPixel(x, y, pixel);  
    }  
  }  
  return output;  
}  
  
function doGreenScreen() {  
  if (fgImage == null || !fgImage.complete) {  
    alert("Foreground image not loaded");  
    return; // Exit early if the foreground image isn't loaded  
  }  
  if (bgImage == null || !bgImage.complete) {  
    alert("Background image not loaded");  
    return; // Exit early if the background image isn't loaded  
  }  
  clearCanvas();  
  var finalImage = createComposite();  
  finalImage.drawTo(fgCanvas);  
}  
  
function clearCanvas() {  
  doClear(fgCanvas);  
  doClear(bgCanvas);  
}  
  
function doClear(canvas) {  
  var context = canvas.getContext("2d");  
  context.clearRect(0, 0, canvas.width, canvas.height);  
}  
