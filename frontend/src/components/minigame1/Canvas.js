import React, {useRef, useState, useCallback, useEffect, useImperativeHandle, forwardRef} from "react"

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
  var imageData = ctx.getImageData(pix.x[0], pix.y[0], w, h);
  return imageData
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
    var scaledImageData =  scaleCtx.getImageData(0, 0, scaleCanvas.width, scaleCanvas.height);
    // var scaledImageData = scaleCanvas.toDataURL()
    return scaledImageData;
}

// https://www.ankursheel.com/blog/react-component-draw-page-hooks-typescript
const MyCanvas = forwardRef((props, ref) => {
    const {width, height, targetWidth, targetHeight } = props
    // Ref to manipulate canvas
    const canvasRef = useRef(null)
    // Keep track of coordinates
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState(null);

    // On exit
    const exitPaint = useCallback(() => {
        setIsPainting(false);
    }, []);
    // draw a line
    const drawLine = (originalMousePosition, newMousePosition) => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (context) {
            context.strokeStyle = 'black';
            context.lineJoin = 'round';
            context.lineWidth = 10;

            context.beginPath();
            context.moveTo(originalMousePosition.x, originalMousePosition.y);
            context.lineTo(newMousePosition.x, newMousePosition.y);
            context.closePath();

            context.stroke();
        }
    };
    // Get coordinates
    const getCoordinates = event => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        return {x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop};
    };
    // Paint
    const paint = useCallback(
        (event) => {
            if (isPainting) {
                const newMousePosition = getCoordinates(event);
                if (mousePosition && newMousePosition) {
                    drawLine(mousePosition, newMousePosition);
                    setMousePosition(newMousePosition);
                }
            }
        },
        [isPainting, mousePosition]
    );
    // Start painting
    const startPaint = useCallback(event => {
        const coordinates = getCoordinates(event);
        if (coordinates) {
            setIsPainting(true);
            setMousePosition(coordinates);
        }
    }, []);
    // keep track of coordinates
    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener('mousedown', startPaint);
        // Remove listener on unmount
        return () => {
            canvas.removeEventListener('mousedown', startPaint);
        }
    }, [startPaint])
    // draw the line on mouse move
    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener('mousemove', paint);
        return () => {
            canvas.removeEventListener('mousemove', paint);
        };
    }, [paint]);
    // stop drawing on mouse release
    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener('mouseup', exitPaint);
        canvas.addEventListener('mouseleave', exitPaint);
        return () => {
            canvas.removeEventListener('mouseup', exitPaint);
            canvas.removeEventListener('mouseleave', exitPaint);
        };
    }, [exitPaint]);


    useImperativeHandle(ref, () => ({
        getImage() {
            if (!canvasRef.current) {
                return;
            }
            // Get cropped drawing
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            const cropped = cropImageFromCanvas(context)
            const newImage = scaleImageData(cropped, targetWidth, targetHeight)
            // Clear canvas
            context.clearRect(0, 0, canvas.width, canvas.height);
            // Pass back to parent
            return newImage
        }

      }));

    return (        
        <canvas ref={canvasRef} width={width} height={height} />
    )
})

export default MyCanvas;