

//////////////////////////////////////////////////////.........
//
//    Use Array Buffer VBO to draw a square (two triangles)
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
             -0.5, -0.5, 0.0, 
             0.5, -0.5,  0.0, 
             0.5,  0.5,  0.0,
            -0.5,  -0.5,  0.0,
             0.5,  0.5,  0.0,
            -0.5,  0.5,  0.0
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        squareVertexPositionBuffer.itemSize = 3;     //three floats (x,y,z) per vertex
        squareVertexPositionBuffer.numItems = 6;     //six vertices (two triangles, three each) 
    }

    function drawScene() {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLES, 0, squareVertexPositionBuffer.numItems); // draw two triangles that involve 6 vertices  

    }

    function webGLStart() {
        var canvas = document.getElementById("code00-canvas");
        initGL(canvas);
        initShaders();

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute); 
        initBuffers(); 
        gl.clearColor(1.0, 1.0, 0.0, 1.0);
        drawScene();
    }


