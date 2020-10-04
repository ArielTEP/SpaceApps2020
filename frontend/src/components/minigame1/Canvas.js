import React, {useRef, useImperativeHandle, forwardRef} from "react"
import ReactPaint from './Paint';

// https://stackoverflow.com/questions/11796554/automatically-crop-html5-canvas-to-contents#comment106458193_22267731
function cropImageFromCanvas(ctx) {
  var canvas = ctx.canvas, 
    w = canvas.width, h = canvas.height,
    pix = {x:[], y:[]},
    imageData = ctx.getImageData(0,0,canvas.width,canvas.height),
    x, y, index;

  for (y = 0; y < h; y++) {
    for (x = 0; x < w; x++) {
      index = (y * w + x) * 4;
      if (imageData.data[index+3] > 0) {
        pix.x.push(x);
        pix.y.push(y);
      } 
    }
  }
  pix.x.sort(function(a,b){return a-b});
  pix.y.sort(function(a,b){return a-b});
  var n = pix.x.length-1;

  w = 1 + pix.x[n] - pix.x[0];
  h = 1 + pix.y[n] - pix.y[0];
  var resultData = null
  if( w>0 && h>0) {
    resultData = ctx.getImageData(pix.x[0], pix.y[0], w, h);
  }
  return resultData
}

// https://stackoverflow.com/questions/3448347/how-to-scale-an-imagedata-in-html-canvas
function scaleImageData(imageData, targetWidth, targetHeight){
    // Create new canvas with the image data
    var newCanvas = document.createElement('canvas');
    newCanvas.setAttribute('width', imageData.width);
    newCanvas.setAttribute('height', imageData.height);
    newCanvas.getContext("2d").putImageData(imageData, 0, 0);
    // Second canvas, for scaling
    var scaleCanvas = document.createElement('canvas');
    scaleCanvas.setAttribute('width', targetWidth);
    scaleCanvas.setAttribute('height', targetHeight);
    // draw image scaled
    var scaleCtx = scaleCanvas.getContext("2d");
    scaleCtx.drawImage(newCanvas, 0, 0,targetWidth,targetHeight);
    // return image either as data or blobUrl
    // var scaledImageData =  scaleCtx.getImageData(0, 0, scaleCanvas.width, scaleCanvas.height);
    var scaledImageData = scaleCanvas.toDataURL()
    return scaledImageData;
}

// https://github.com/Aqutras/react-paint
const MyCanvas = forwardRef((props, ref) => {
    const {width, height, targetWidth, targetHeight } = props
    const childRef = useRef()

    useImperativeHandle(ref, () => ({
        getImage() {
            const canvasRef = childRef
            if (!canvasRef.current) {
                return;
            }
            let fixedImage = null
            // Get cropped drawing
            const canvas = canvasRef.current.canvas;
            const context = canvas.getContext('2d');
            const cropped = cropImageFromCanvas(context)
            if( cropped ) {
              fixedImage = scaleImageData(cropped, targetWidth, targetHeight)
              // Clear canvas
              context.clearRect(0, 0, canvas.width, canvas.height);
              context.beginPath();
            }
            // Pass back to parent
            return fixedImage
        }

      }));

    // const lineWidth = 5; // para calcar
    const lineWidth = 10; // para jugar
    return (        
        <ReactPaint ref={childRef} brushCol="#000000" lineWidth={lineWidth} width={width} height={height}/>
    )
})

export default MyCanvas;