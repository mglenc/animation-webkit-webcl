/*
Outliner js

Date: 29-05-2014
Author: Michal Glenc
*/

var lineColor = [
	0.0, 0.0, 0.0, 1.0,
	0.0, 0.0, 0.0, 1.0,
	0.0, 0.0, 0.0, 1.0
]

var selectedLineColor = [
	1.0, 0.0, 0.0, 1.0,
	1.0, 0.0, 0.0, 1.0,
	1.0, 0.0, 0.0, 1.0
]

var gl;
var shaderProgram;

var mvMatrix = mat4.create();
var pMatrix = mat4.create();

gl_settings = new Object();
gl_settings.drawFill = true;
gl_settings.drawContours = true;

function initGL(canvasId) {
	canvas = document.getElementById(canvasId);
	
	//canvas itself does not know what is its width and height so we gotta tell it with jquery
	canvas.width = $("#" + canvasId).width();
	canvas.height = $("#" + canvasId).height();
	
	try {
		gl = canvas.getContext("experimental-webgl");
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
	} catch(e) {
		//error dialog
	}
	if(!gl) {
		//error dialog
		alert("Could not initialise WebGL!");
	}
	
	//window resize event chnages ratio
	$(window).resize(function() {
		canvas.width = $("#" + canvasId).width();
		canvas.height = $("#" + canvasId).height();
		
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
		
		drawScene();
	});
}

function getShader(gl, id) {
	var shaderScript = document.getElementById(id);
	if(!shaderScript) {
		return null;
	}
	
	var str = "";
	var k = shaderScript.firstChild;
	while(k) {
		if(k.nodeType == 3) {
			str += k.textContent;
		}
		k = k.nextSibling;
	}
	
	var shader;
	if(shaderScript.type == "x-shader/x-fragment") {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} else if(shaderScript.type == "x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	} else {
		return null;
	}
	
	gl.shaderSource(shader, str);
	gl.compileShader(shader);
	
	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		//error dialog
		alert(gl.ShaderInfoLog(shader));
		return null;
	}
	
	return shader;
}

function initShaders() {
	var fragmentShader = getShader(gl, "shader-fs");
	var vertexShader = getShader(gl, "shader-vs");
	
	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);
	
	if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		//error dialog
		alert("Could not initialise shaders!");
	}
	
	gl.useProgram(shaderProgram);
	
	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
	
	shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
	
	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	shaderProgram.alphaUniform = gl.getUniformLocation(shaderProgram, "uAlpha");
}

function setMatrixUniforms() {
	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
}

function refreshOutline() {
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

	mat4.identity(mvMatrix);
	
	mat4.translate(mvMatrix, scene.zoomMatrix);
	
	mat4.multiply(mvMatrix, scene.rotationMatrix);

	for(i = 0; i < scene.shapes.length; i++) {
		if(scene.shapes[i].type != 'light') {
			var deltaX = 0;
			var deltaY = 0;
			var deltaZ = 0;
		
			for(k = 0; k < scene.shapes[i].animations.length; k++) {
				if(scene.shapes[i].animations[k].endFrame < currentFrame) {
					switch(scene.shapes[i].animations[k].property) {
						case 'position':
							var v = scene.shapes[i].animations[k].vector;
							
							deltaX += parseFloat(v[0]);
							deltaY += parseFloat(v[1]);
							deltaZ += parseFloat(v[2]);
							
							//alert(deltaX + ":" + deltaY + ":" + deltaZ);
							
							break;
					}
				}
			}
		
			for(k = 0; k < scene.shapes[i].animations.length; k++) {
				//checking if currentFrame during animation
				if(scene.shapes[i].animations[k].startFrame <= currentFrame && scene.shapes[i].animations[k].endFrame >= currentFrame) {
					var sf = scene.shapes[i].animations[k].startFrame;
					var ef = scene.shapes[i].animations[k].endFrame;	
					var deltaFrames = (currentFrame - sf)/(ef-sf);
					
					
					switch(scene.shapes[i].animations[k].property) {
						case 'position':
							var v = scene.shapes[i].animations[k].vector;
							
							//alert(deltaFrames);
							
							deltaX += v[0]*deltaFrames;
							deltaY += v[1]*deltaFrames;
							deltaZ += v[2]*deltaFrames;
							break;
					}
				}
			}
			
			//refreshing vertexPositionBuffer data
			for(j = 0; j < scene.shapes[i].vertexPosition.length; j=j+3) {
				var newTriangle = new Array();
			
				newTriangle.push(scene.shapes[i].vertexPosition[j].x+deltaX);
				newTriangle.push(scene.shapes[i].vertexPosition[j].y+deltaY);
				newTriangle.push(scene.shapes[i].vertexPosition[j].z+deltaZ);
				
				newTriangle.push(scene.shapes[i].vertexPosition[j+1].x+deltaX);
				newTriangle.push(scene.shapes[i].vertexPosition[j+1].y+deltaY);
				newTriangle.push(scene.shapes[i].vertexPosition[j+1].z+deltaZ);
				
				newTriangle.push(scene.shapes[i].vertexPosition[j+2].x+deltaX);
				newTriangle.push(scene.shapes[i].vertexPosition[j+2].y+deltaY);
				newTriangle.push(scene.shapes[i].vertexPosition[j+2].z+deltaZ);
				
				/*alert(
					newTriangle[0] + " " + newTriangle[1] + " " + newTriangle[2] + "\n" +
					newTriangle[3] + " " + newTriangle[4] + " " + newTriangle[5] + "\n" +
					newTriangle[6] + " " + newTriangle[7] + " " + newTriangle[8] 
				);*/
				
				var newVertexColor = scene.shapes[i].vertexColor;
				newVertexColor = newVertexColor.slice(1, 13);
				
				newVertexColor.numItems = 3;
				newVertexColor.itemSize = scene.shapes[i].vertexColor.itemSize;
				
				//alert(newVertexColor.itemSize);
				
				//blending
				/*gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
				gl.enable(gl.BLEND);
				gl.disable(gl.DEPTH_TEST);*/
				gl.enable(gl.DEPTH_TEST);
				gl.uniform1f(shaderProgram.alphaUniform, parseFloat(0.1));
				
				//position buffer
				gl.bindBuffer(gl.ARRAY_BUFFER, scene.shapes[i].vertexPositionBuffer);			
				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(newTriangle), gl.STATIC_DRAW);
				scene.shapes[i].vertexPositionBuffer.itemSize = scene.shapes[i].vertexPosition.itemSize;
				scene.shapes[i].vertexPositionBuffer.numItems = 3;
				
				gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, scene.shapes[i].vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
				
				//fill
				if(gl_settings.drawFill) {
				//color buffer
					gl.bindBuffer(gl.ARRAY_BUFFER, scene.shapes[i].vertexColorBuffer);
					gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(scene.shapes[i].vertexColor), gl.STATIC_DRAW);
					scene.shapes[i].vertexColorBuffer.itemSize = newVertexColor.itemSize;
					scene.shapes[i].vertexColorBuffer.numItems = newVertexColor.length;
					
					gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, scene.shapes[i].vertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
					
					setMatrixUniforms();
					gl.drawArrays(gl.TRIANGLES, 0, scene.shapes[i].vertexPositionBuffer.numItems);
				}
				
							
				//contours
				if(gl_settings.drawContours) {
				
					//gl.lineWidth(5.0);
					//color buffer
					gl.bindBuffer(gl.ARRAY_BUFFER, scene.shapes[i].vertexColorBuffer);
					/*var tempColor = [
						0.96, 0.96, 0.96, 1.0,
						0.96, 0.96, 0.96, 1.0,
						0.96, 0.96, 0.96, 1.0
					]
					gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tempColor), gl.STATIC_DRAW);*/
					if(i == selectedShapeId) {
						gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(selectedLineColor), gl.STATIC_DRAW);
					} else {
						gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineColor), gl.STATIC_DRAW);
					}
					
					scene.shapes[i].vertexColorBuffer.itemSize = 4;
					scene.shapes[i].vertexColorBuffer.numItems = 3;
					
					gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, scene.shapes[i].vertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
					
					setMatrixUniforms();
					gl.drawArrays(gl.LINE_LOOP, 0, scene.shapes[i].vertexPositionBuffer.numItems);
				}
			}
		}
	}
}

function initWebGL() {	
	//removing and readding canvas element, cause of getContext returning null when called twice
	$('#' + canvasId).remove();
	$('body').append('<canvas id="scene"></canvas>');
	
	initGL(canvasId);
	initShaders();
	
	refreshScene();
}

function initOutliner() {
    initWebGL();
}
