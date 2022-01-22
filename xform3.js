
////////////////////////////////////////////////////////
//
//  Simple transformation of 2D triangles 
//  Notice TRIANGLE_FAN is used to draw 
// 
//  Han-Wei Shen (shen.94@osu.edu)
//
var gl;
var shaderProgram;
var draw_type=2; 

//////////// Init OpenGL Context etc. ///////////////

    function initGL(canvas) {
        try {
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }


    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////

    var squareVertexPositionBuffer;
    var AxesVertexPositionBuffer; 

   ////////////////    Initialize VBO  ////////////////////////

    function initSquareBuffers() {

        squareVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        var vertices = [
            0.5,  0.5,  0.0,
		    -0.5,  0.5,  0.0, 
            -0.5, -0.5,  0.0,
	        0.5, -0.5,  0.0,

        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        squareVertexPositionBuffer.vertexSize = 3;
        squareVertexPositionBuffer.numVertices = 4;
    }

    function initAxesBuffers() {

        AxesVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, AxesVertexPositionBuffer);
        var vertices = [
            0.0,  0.0,  0.0,
		    0.0,  1.0,  0.0, 
            0.0,  0.0,  0.0,
	        1.0,  0.0,  0.0,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        AxesVertexPositionBuffer.vertexSize = 3;
        AxesVertexPositionBuffer.numVertices = 4;
    }



    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////


    var mvMatrix = mat4.create();

     function degToRad(degrees) {
        return degrees * Math.PI / 180;
     }

     //////////////////////////////////////////////////////////////
     function drawbox(mMatrix, color, drawaxis){

        var offset = 0; 
        var stride = 0; 

        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.vertexSize, gl.FLOAT, false, stride, offset);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mMatrix);
        gl.uniform4fv(shaderProgram.uColor, color); 

        if (draw_type==2) gl.drawArrays(gl.TRIANGLE_FAN, 0, squareVertexPositionBuffer.numVertices);
	    else if (draw_type ==1) gl.drawArrays(gl.LINE_LOOP, 0, squareVertexPositionBuffer.numVertices);	
        else if (draw_type ==0) gl.drawArrays(gl.POINTS, 0, squareVertexPositionBuffer.numVertices);

        if (drawaxis) draw_Axes(mMatrix); 

     }

     function draw_Axes(mvMatrix){

        var offset = 0; 
        var stride = 0; 

        gl.bindBuffer(gl.ARRAY_BUFFER, AxesVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.vertexSize, gl.FLOAT, false, stride, offset);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

        var color = [0,0,1.0, 1.0]; 
        gl.uniform4fv(shaderProgram.uColor, color); 
        gl.drawArrays(gl.LINES, 0, 2);	// y axis 
        
        var color = [1,0,0.0, 1.0]; 
        gl.uniform4fv(shaderProgram.uColor, color); 
        gl.drawArrays(gl.LINES, 2, 2);	// y axis 
     }
    ///////////////////////////////////////////////////////////////

    function drawScene() {

        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        var color = [1.0, 1.0, 1.0, 1.0]; 

        // draw a original first 
        var oMatrix = mat4.create(); 
        mat4.identity(oMatrix);
        oMatrix = mat4.translate(oMatrix, [0, 0, 0]); 
        oMatrix = mat4.scale(oMatrix, [0.05, 0.05, 1.0]); 
        color = [1.0, 0, 0.0, 1.0]; 
        drawbox(oMatrix, color, true); 
      
        var model = mat4.create(); 
        mat4.identity(model); 
        
        model = mat4.multiply(model, mvMatrix); 
        model =  mat4.scale(model, [2,0.5,1]); 
       // now draw a little box 
        color = [1.0, 1.0, 0.0, 1.0]; 
        drawbox(model, color, drawAxis); 
        model = mat4.scale(model, [0.5, 2, 1]); 

        // now draw the second  box 
        model = mat4.translate(model, [1,0,0]); 
        model = mat4.rotate(model, degToRad(degree2), [0,0,1]); 
        model = mat4.translate(model, [.75,0,0]); 
        model = mat4.scale(model, [1.5, .5, 1]); 
        color = [0.0, 0.0, 1.0, 1.0]; 
        drawbox(model, color, drawAxis); 
        model = mat4.scale(model, [1/1.5, 1/0.5, 1]); 

        // now draw the third box 
        model = mat4.translate(model, [.75,0,0]); 
        model = mat4.rotate(model, degToRad(degree3), [0,0,1]); 
        model = mat4.translate(model, [.6,0,0]); 
        model = mat4.scale(model, [1.2, .5, 1]); 
        color = [1.0, 0.0, 0.0, 1.0]; 
        drawbox(model, color, drawAxis); 
        model = mat4.scale(model, [1/1.2, 1/0.5, 1]); 

    }


    ///////////////////////////////////////////////////////////////

     var lastMouseX = 0, lastMouseY = 0;

    ///////////////////////////////////////////////////////////////

     function onDocumentMouseDown( event ) {
          event.preventDefault();
          document.addEventListener( 'mousemove', onDocumentMouseMove, false );
          document.addEventListener( 'mouseup', onDocumentMouseUp, false );
          document.addEventListener( 'mouseout', onDocumentMouseOut, false );
          var mouseX = event.clientX;
          var mouseY = event.clientY;

          lastMouseX = mouseX;
          lastMouseY = mouseY; 

      }
var Z_angle =0; 

     function onDocumentMouseMove( event ) {
          var mouseX = event.clientX;
          var mouseY = event.ClientY; 

          var diffX = mouseX - lastMouseX;
          var diffY = mouseY - lastMouseY;

          Z_angle = Z_angle + diffX/5;

          lastMouseX = mouseX;
          lastMouseY = mouseY;

          drawScene();
     }

     function onDocumentMouseUp( event ) {
          document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
          document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
          document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
     }

     function onDocumentMouseOut( event ) {
          document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
          document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
          document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
     }

    ///////////////////////////////////////////////////////////////

    function webGLStart() {
        var canvas = document.getElementById("code03-canvas");
        initGL(canvas);
        initShaders();

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
        shaderProgram.uColor = gl.getUniformLocation(shaderProgram, "uColor");

        initSquareBuffers(); 
        initAxesBuffers(); 

        gl.clearColor(0.0, 0.0, 0.0, 1.0);

       document.addEventListener('mousedown', onDocumentMouseDown,
       false); 
       document.addEventListener('keydown', onKeyDown, false);

       mvMatrix = mat4.create(); 
       mat4.identity(mvMatrix);
       mvMatrix = mat4.translate(mvMatrix, [-0.5, 0, 0]); 
       mvMatrix = mat4.scale(mvMatrix, [0.2, 0.2, 0.2]); 

       drawScene();
    }

function BG(red, green, blue) {

    gl.clearColor(red, green, blue, 1.0);
    drawScene(); 

} 

function redraw() {
    degree2 = 0;
    degree3 = 0;
    mat4.identity(mvMatrix);
    mvMatrix = mat4.translate(mvMatrix, [-0.5, 0, 0]); 
    mvMatrix = mat4.scale(mvMatrix, [0.2, 0.2, 0.2]); 
    drawScene();
}
    

function geometry(type) {
    draw_type = type;
    drawScene();
} 

var drawAxis = true; 

function draw_axis(){
   drawAxis = !drawAxis; 
   drawScene(); 
}

var delta = 0.2; 
var degree2 = 0; 
var degree3 = 0; 
///////////////////////////////////////////////////////////////////////////
//
//  key stroke handler 
//
    function onKeyDown(event) {
      console.log(event.keyCode);
      switch(event.keyCode)  {

         case 82:
              if (event.shiftKey) {
                  console.log('enter R');
                  mvMatrix = mat4.rotate(mvMatrix, degToRad(5.0), [0, 0, 1]); 
              }
              else {
                console.log('enter r');
                //mvMatrix = mat4.rotate(mvMatrix, degToRad(-5.0), [0, 0, 1]); 
                degree2 += 10; 
              }
          break;
        case 69: 
              console.log('enter e'); 
              degree3+=10; 
        break; 
        case 88:
            if (event.shiftKey) {
                console.log('enter X');
                mvMatrix = mat4.translate(mvMatrix, [0.1, 0, 0]);	
            }	  		      
            else {
             mvMatrix = mat4.translate(mvMatrix, [-0.1, 0, 0]);		  		      
            }
        break;
       case 89:
            if (event.shiftKey) {
                console.log('enter Y');
                mvMatrix = mat4.translate(mvMatrix, [0.0, 0.1, 0]);		  		      
            }
            else {
                console.log('enter y');
                mvMatrix = mat4.translate(mvMatrix, [0.0, -0.1, 0]);		  		      
            }
        break;
       case 83:
            if (event.shiftKey) {
                console.log('enter S');
                mvMatrix = mat4.scale(mvMatrix, [1.05, 1.05, 1.05]);		  		  		        		  		      		      		      
            }
            else {
                console.log('enter s');
                mvMatrix = mat4.scale(mvMatrix, [0.95, 0.95, 0.95]);		  		  		  		     	  		  		  		      		      		      
            }
            break; 
      }

	drawScene();	 // draw the VBO 
    }