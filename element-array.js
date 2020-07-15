
//////////////////////////////////////////////////////////////////
//
//  This example shows you how to use element array VBO to draw triangles 
//  Element array is used to indexing the triangle vertices
//  It will allow you not to repeat definitions of verticies 
//
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
    var sqauerVertexIndexBuffer; 
    var vertices  = []; 

    function initBuffers() {

        squareVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
     
        // below is how you interleave positions and colors into a single array and then VBO 
        vertices.push(-.5); vertices.push(-.5); vertices.push(0.0);  // v1 positions
        vertices.push(1.0); vertices.push(0.0); vertices.push(0.0);  // v1 colors

        vertices.push(.5); vertices.push(-.5); vertices.push(0.0);  // v2 positions
        vertices.push(0.0); vertices.push(1.0); vertices.push(0.0);  // v2 colors

        vertices.push(.5); vertices.push(.5); vertices.push(0.0);   // v3 positions
        vertices.push(0.0); vertices.push(0.0); vertices.push(1.0);  // v3 colors

        vertices.push(-.5); vertices.push(.5); vertices.push(0.0);  // v4 positions
        vertices.push(0.0); vertices.push(0.0); vertices.push(0.0);  // v4 colors


        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW); // use 4 bytes float 
        squareVertexBuffer.numFloats = 3;  // three floats per vertex 
        squareVertexBuffer.numVertices = 4;  // number of vertices in the buffer 

        var indices = [0,1,2, 0,2,3];
        squareVertexIndexBuffer = gl.createBuffer();	
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareVertexIndexBuffer); 
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);  
        squareVertexIndexBuffer.itemsize = 1;
        squareVertexIndexBuffer.numItems = 6; 

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

        // draw elementary arrays - triangle indices 
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareVertexIndexBuffer); 
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0); 

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


