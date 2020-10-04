import React, {useRef, useState, useCallback, useEffect} from "react"

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
  var cut = ctx.getImageData(pix.x[0], pix.y[0], w, h);

  canvas.width = w;
  canvas.height = h;
  ctx.putImageData(cut, 0, 0);

  console.log(cut)

  var image = canvas.toDataURL();  //open cropped image in a new window
  //console.log(image)
}

// https://www.ankursheel.com/blog/react-component-draw-page-hooks-typescript
export default function Canvas(props) {
    const {width, height} = props
    // Ref to manipulate canvas
    const canvasRef = useRef(null)
    // Keep track of coordinates
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState(null);

    const click = () => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        cropImageFromCanvas(context)
    }

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        var ctx = canvas.getContext('2d'),
        img = new Image;

        img.onload = draw;
        img.src = "http://i.stack.imgur.com/UFBxY.png";

        function draw() {

          var dArr = [-1,-1, 0,-1, 1,-1, -1,0, 1,0, -1,1, 0,1, 1,1], // offset array
              s = 2,  // thickness scale
              i = 0,  // iterator
              x = 5,  // final position
              y = 5;
          
          // draw images at offsets from the array scaled by s
          for(; i < dArr.length; i += 2)
            ctx.drawImage(img, x + dArr[i]*s, y + dArr[i+1]*s);
          
          // fill with color
          ctx.globalCompositeOperation = "source-in";
          ctx.fillStyle = "red";
          ctx.fillRect(0,0,canvas.width, canvas.height);
          
          // draw original image in normal mode
          ctx.globalCompositeOperation = "source-over";
          ctx.drawImage(img, x, y);
        }
    }, [])

    return (
        <div>
            <canvas ref={canvasRef} width={width} height={height} />
            <button onClick={click} >Click</button>
        </div>
    )
}
