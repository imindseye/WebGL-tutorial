
//////////////////////////////////////////////////////////////////
//
//  This example shows you how to interleave positions and colors into a single VBO 
//  Then how do you know specify the stride and offset to pass positions and colors into two 
//  attributes array 
//
//  Han-Wei Shen (shen.94@osu.edu)
//
    var gl;
    var shaderProgram;

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


//f ************** Initialize VBO  *************** -->

    var squareVertexBuffer;
    var vertices  = []; 

    function initBuffers() {

        squareVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
     
        // below is how you interleave positions and colors into a single array and then VBO 
        vertices.push(-.5); vertices.push(-.5); vertices.push(0.0);  // v1 positions
        vertices.push(1.0); vertices.push(0.0); vertices.push(0.0);  // v1 colors

        vertices.push(.5); vertices.push(.5); vertices.push(0.0);   // v2 positions
        vertices.push(0.0); vertices.push(0.0); vertices.push(1.0);  // v2 colors

        vertices.push(-.5); vertices.push(.5); vertices.push(0.0);  // v3 positions
        vertices.push(0.0); vertices.push(0.0); vertices.push(0.0);  // v3 colors

        vertices.push(-.5); vertices.push(-.5); vertices.push(0.0);  // v4 positions
        vertices.push(1.0); vertices.push(0.0); vertices.push(0.0);  // v4 colors

        vertices.push(.5); vertices.push(-.5); vertices.push(0.0);  // v5 positions
        vertices.push(0.0); vertices.push(1.0); vertices.push(0.0);  // v5 colors

        vertices.push(.5); vertices.push(.5); vertices.push(0.0);  // v6 positions
        vertices.push(0.0); vertices.push(0.0); vertices.push(1.0);  // v6 colors

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW); // use 4 bytes float 
        squareVertexBuffer.numFloats = 3;  // three floats per vertex 
        squareVertexBuffer.numVertices = 6;  // number of vertices in the buffer 
    }

    function drawScene() {

        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
        var stride = 6 * 4; // 4 bytes per float, 6 floats, 
        var offset = 0; 
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexBuffer.numFloats, gl.FLOAT, false, stride, offset); // 6*4 is the stride size, 0 is the offset
        offset = 3*4;  // skip the positions, which has 3 floats * 4 bytes/float 
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, squareVertexBuffer.numFloats, gl.FLOAT, false,stride, offset); // 6*4 is the stride size, 3*4 is the offset 
        offset = 0; 
        gl.drawArrays(gl.TRIANGLES, offset, squareVertexBuffer.numVertices);  // draw 2 triangles 

    }

    function webGLStart() {
        var canvas = document.getElementById("code02-canvas");
        initGL(canvas);
        initShaders();
	
        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
	
        initBuffers(); 

        gl.clearColor(1.0, 1.0, 0.0, 1.0);

        drawScene();
    }

function BG(red, green, blue) {

    gl.clearColor(red, green, blue, 1.0);
    drawScene(); 

} 


