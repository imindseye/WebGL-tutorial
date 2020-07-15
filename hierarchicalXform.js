///////////////////////////////////////////////////////////
//
// Hierarchical transformations on three squares 
// square1(root) - square2 - square 3 
//
// Han-Wei Shen (shen.94@osu.edu)
//
//

var gl;
var shaderProgram;
var draw_type=2;
var which_object = 1; 

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
    var squareVertexColorBuffer;
    var lineVertexPositionBuffer; 
    var lineVertexColorBuffer; 

   ////////////////    Initialize VBO  ////////////////////////

    function initBuffers() {

        squareVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);

        vertices = [
             0.5,  0.5,  0.0,
	    	-0.5,  0.5,  0.0,
            -0.5, -0.5,  0.0, 
            0.5,  0.5,  0.0,
            -0.5, -0.5,  0.0, 
             0.5, -0.5,  0.0,
        ];

	l_vertices = [
            0.0,  0.0,  0.0,
	    	0.7,  0.0,  0.0,
	        0.0, 0.0,  0.0, 
            0.0, 0.7,  0.0,
        ];
	
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        squareVertexPositionBuffer.itemSize = 3;
        squareVertexPositionBuffer.numItems = 6;

	    lineVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, lineVertexPositionBuffer);
    	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(l_vertices), gl.STATIC_DRAW);
        lineVertexPositionBuffer.itemSize = 3;
        lineVertexPositionBuffer.numItems = 4;

        squareVertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
        var colors = [
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        squareVertexColorBuffer.itemSize = 3;
        squareVertexColorBuffer.numItems = 6;


    }

    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////


    var mvMatrix1, mvMatrix2, mvMatrix3; 
    var Xtranslate = 0.0, Ytranslate = 0.0; 

    function setMatrixUniforms(matrix) {
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, matrix);
    }

     function degToRad(degrees) {
        return degrees * Math.PI / 180;
     }

///////////////////////////////////////////////////////


    function PushMatrix(stack, matrix) {
        var copy = mat4.create();
        mat4.set(matrix, copy);
        stack.push(copy);
    }

    function PopMatrix(stack, copy) {
        if (stack.length == 0) {
            throw "Invalid popMatrix!";
        }
        copy = stack.pop();
    }

    var mvMatrixStack = [];


    function draw_square(matrix) {

        setMatrixUniforms(matrix);	

        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,squareVertexColorBuffer.itemSize,gl.FLOAT,false, 0, 0);
    	gl.drawArrays(gl.TRIANGLE_FAN, 0, squareVertexPositionBuffer.numItems);
	

        gl.bindBuffer(gl.ARRAY_BUFFER, lineVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, lineVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,squareVertexColorBuffer.itemSize,gl.FLOAT,false, 0, 0);
    	gl.drawArrays(gl.LINES, 0, lineVertexPositionBuffer.numItems);

    }



///////////////////////////////////////////////////////////////////////

    function drawScene() {

        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	var Mstack = []; 
        var model = mat4.create(); 
    	mat4.identity(model); 
	
        model = mat4.multiply(model, mvMatrix1); 
    	draw_square(model);

    	Mstack.push(model); 
    	console.log("push matrix"); 

        model = mat4.multiply(model, mvMatrix2); 
    	draw_square(model);

    	model = Mstack.pop(); 
       model = mat4.multiply(model, mvMatrix3); 
    	draw_square(model);
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

     function onDocumentMouseMove( event ) {
          var mouseX = event.clientX;
          var mouseY = event.ClientY; 

          var diffX = mouseX - lastMouseX;
          var diffY = mouseY - lastMouseY;

	 console.log("rotate"+degToRad(diffX/5.0));
    	 if (which_object == 1)
	     mvMatrix1 = mat4.rotate(mvMatrix1, degToRad(diffX/5.0), [0, 0, 1]);
    	 if (which_object == 2) 
	     mvMatrix2 = mat4.rotate(mvMatrix2, degToRad(diffX/5.0), [0, 0, 1]);
    	 if (which_object == 3) 
	     mvMatrix3 = mat4.rotate(mvMatrix3, degToRad(diffX/5.0), [0, 0, 1]);	 
	 
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


    function onKeyDown(event) {

      console.log(event.keyCode);
      switch(event.keyCode)  {
         case 88:
              if (event.shiftKey) {
                  console.log('enter X');
		  if (which_object == 1)
		      mvMatrix1 = mat4.translate(mvMatrix1, [0.1, 0, 0]);		  		      
		  if (which_object == 2)
		      mvMatrix2 = mat4.translate(mvMatrix2, [0.1, 0, 0]);		  		      		      
		  if (which_object == 3)
		      mvMatrix3 = mat4.translate(mvMatrix3, [0.1, 0, 0]);		  		      		      
              }
              else {
		  console.log('enter x');
		  if (which_object == 1)
		      mvMatrix1 = mat4.translate(mvMatrix1, [-0.1, 0, 0]);		  		      
		  if (which_object == 2)
		      mvMatrix2 = mat4.translate(mvMatrix2, [-0.1, 0, 0]);		  		      		      
		  if (which_object == 3)
		      mvMatrix3 = mat4.translate(mvMatrix3, [-0.1, 0, 0]);
              }
         break;
         case 89:
              if (event.shiftKey) {
                  console.log('enter Y');
		  if (which_object == 1)
		      mvMatrix1 = mat4.translate(mvMatrix1, [0.0, 0.1, 0]);		  		      
		  if (which_object == 2)
		      mvMatrix2 = mat4.translate(mvMatrix2, [0.0, 0.1, 0]);		  		      		      
		  if (which_object == 3)
		      mvMatrix3 = mat4.translate(mvMatrix3, [0.0, 0.1, 0]);
              }
              else {
		  console.log('enter y');
		  if (which_object == 1)		  
		      mvMatrix1 = mat4.translate(mvMatrix1, [0.0, -0.1, 0]);		  		      
		  if (which_object == 2)
		      mvMatrix2 = mat4.translate(mvMatrix2, [0.0, -0.1, 0]);		  		      		      
		  if (which_object == 3)
		      mvMatrix3 = mat4.translate(mvMatrix3, [0.0, -0.1, 0]);
              }
          break;
         case 83:
              if (event.shiftKey) {
                  console.log('enter S');
		  if (which_object == 1)
		      mvMatrix1 = mat4.scale(mvMatrix1, [1.05, 1.05, 1.05]);		  		  		      
		  if (which_object == 2)
		      mvMatrix2 = mat4.scale(mvMatrix2, [1.05, 1.05, 1.05]);		  		  		      		      
		  if (which_object == 3)
		      mvMatrix3 = mat4.scale(mvMatrix3, [1.05, 1.05, 1.05]);		  		  		      		      		      
              }
              else {
		  console.log('enter s');
		  if (which_object == 1)
		      mvMatrix1 = mat4.scale(mvMatrix1, [0.95, 0.95, 0.95]);		  		  		  		      
		  if (which_object == 2)
		      mvMatrix2 = mat4.scale(mvMatrix2, [0.95, 0.95, 0.95]);		  		  		  		      		      
		  if (which_object == 3)
		      mvMatrix3 = mat4.scale(mvMatrix3, [0.95, 0.95, 0.95]);		  		  		  		      		      		      
              }
              break; 
       }
       drawScene();
    }
    ///////////////////////////////////////////////////////////////

    function webGLStart() {
        var canvas = document.getElementById("code04-canvas");
        initGL(canvas);
        initShaders();

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);


        shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");

        initBuffers(); 

        gl.clearColor(0.0, 0.0, 0.0, 1.0);

    	document.addEventListener('mousedown', onDocumentMouseDown,false);
    	document.addEventListener('keydown', onKeyDown, false);

    	mvMatrix1 = mat4.create(); 
    	mat4.identity(mvMatrix1);
        mvMatrix1 = mat4.scale(mvMatrix1, [0.25, 0.25, 0.25]); 

    	mvMatrix2 = mat4.create(); 
        mat4.identity(mvMatrix2);
    	mvMatrix1 = mat4.translate(mvMatrix1, [0.5, 0.5, 0]);

    	mvMatrix3 = mat4.create(); 
        mat4.identity(mvMatrix3);
        mvMatrix3 = mat4.translate(mvMatrix3, [0.5, 0.5, 0]);

        drawScene();
    }

function BG(red, green, blue) {

    gl.clearColor(red, green, blue, 1.0);
    drawScene(); 

} 

function redraw() {

    mat4.identity(mvMatrix1);
    mat4.identity(mvMatrix2);
    mat4.identity(mvMatrix3);

    mvMatrix1 = mat4.scale(mvMatrix1, [0.25, 0.25, 0.25]); 

    mvMatrix2 = mat4.translate(mvMatrix2, [0.5, 0.5, 0.25]); 			       

    mvMatrix3 = mat4.translate(mvMatrix3, [0.5, 0.5, 0]);

    drawScene();
}

function obj(object_id) {

    which_object = object_id;
    drawScene();

} 
