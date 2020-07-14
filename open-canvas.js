

////////////////////////////////////////////////////////////////////////
//
//  A simple WebGL program that opens a canvas with yellow background 
//
//  Han-Wei Shen  (shen.94@osu.edu)
//  Ohio State University
//

    var gl;
    function initGL(canvas) {
        try {
            gl = canvas.getContext("experimental-webgl");  // the graphics context 
            gl.viewportWidth = canvas.width;   // the width of the canvas
            gl.viewportHeight = canvas.height; // the height 
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }

////////////////////////////////////////////////////////////////////////
// The main drawing routine, but does notthing except clear the canvas with the clear color 
//
    function drawScene() {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    }
// This is the entry point from the httml 
    function webGLStart() {
        var canvas = document.getElementById("code00-canvas");
        initGL(canvas);

        gl.clearColor(1.0, 1.0, 0.0, 1.0);

        drawScene();
    }
