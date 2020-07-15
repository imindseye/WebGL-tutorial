# WebGL
Sample WebGL program for OSU CSE 5542 
by Prof. Han-Wei Shen (shen.94@osu.edu) 

Learn WebGL by studying the sample code in the following order: 

1. open-canvas.html/js:  A simple program that opens a webgl canvas and initialize webgl graphics context 
2. simple-triangles.html/js: draw two triangles using Array Buffer VBO in a default color (red) 
3. triangle-strip.html/js: draw two triangles using Triangle S trip and Array buffer VBO
4. viewport-demo.html/js: display the same 2 triangles over 9 different viewports; allow change background color
5. color-triangles.html/js: add an additional color VBO to the shader. Notice how fragment colors are interpolated from the triangle vertices 
6. color-interleaved.html/js: set an interleaved position/color into a single VBO; and then assign the positions/colors to two different attribute arrays 
7. element-array/html/js: show you how to draw triangles using an element array VBO to index triangle vertices 
8. simple-transform.html/hs: simple transformation of 2D triangles using glm (left mouse click and drag to rotate) 
9. Mtransforms.html/js: demonstrate how to apply different transformations to different objects. 
