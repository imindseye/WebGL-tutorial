

//////////////////////////////////////////////////
//
//  1. Demonstrate how viewport can be changed during display
//  2. Demonstrate how you can change the background color 
//  3. In the html file, you can see how buttons are created, and how to link the buttons to 
//  the actio here. 
//  Han-Wei Shen (shen.94@osu.edu)
//
    var gl;
    var shaderProgram;

// ************** Init OpenGL Context etc. ************* 

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


//  ************** Initialize VBO  *************** 

    var squareVertexPositionBuffer;

    function initBuffers() {

        squareVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        vertices = [
             0.5,  0.5,  0.0,
            -0.5,  0.5,  0.0,
             0.5, -0.5,  0.0,
            -0.5, -0.5,  0.0
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        squareVertexPositionBuffer.itemSize = 3;
        squareVertexPositionBuffer.numItems = 4;
    }

    function drawScene() {


        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

	for (var i=0; i<3; i++)    // iterate through 9 different viewports 
	    for (var j=0; j<3; j++) {
		gl.viewport(0+i*gl.viewportWidth/3, 0+j*gl.viewportHeight/3, gl.viewportWidth/4, gl.viewportHeight/4);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);
	    }


   }

    function webGLStart() {
        var canvas = document.getElementById("code01-canvas");
        initGL(canvas);
        initShaders();
        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute); 
        initBuffers(); 
        gl.clearColor(1.0, 1.0, 0.0, 1.0);
        drawScene();
    }

function BG(red, green, blue) {    // the callback function for the html buttons 

    gl.clearColor(red, green, blue, 1.0);
    drawScene(); 

} 


