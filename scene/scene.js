/*
Scene js

Date: 29-05-2014
Author: Michal Glenc
*/
//Scene & Shapes vars
var scene = new Object();
scene.shapes = new Array();

//default properties
scene.frames = 100;
scene.fps = 24;
scene.height = 10.8;
scene.width = 19.2;
scene.depth = 20.0;
scene.resx = 1920;
scene.resy = 1080;
scene.name = 'Test scene';

scene.bcolor = new Object();
scene.bcolor.r = 0.1;
scene.bcolor.g = 0.1;
scene.bcolor.b = 0.1;

scene.glcolor = new Object();
scene.glcolor.r = 0.1;
scene.glcolor.g = 0.1;
scene.glcolor.b = 0.1;

//original position: 0; 0; -9
scene.zoomMatrix = [0,0,-9];

var canvasId = "scene";

var gl;
var shaderProgram;

var mvMatrix = mat4.create();
var pMatrix = mat4.create();

function refreshScene() {
	var drawMethod = $('input[name="draw-method"]:checked').val();
		
	if(drawMethod == "outline") {
		refreshOutline();
	} else if(drawMethod == "render-cl") {
		refreshCL();
	}
}

function initSceneData() {
	var color = [0.8, 0.8, 0.8, 1.0];
	var alterColor = [0.25, 0.28, 0.29, 1.0];
	var alterColor2 = [0.15, 0.15, 0.15, 1.0];
	
	gl.clearColor(color[0],color[1],color[2],color[3]);
	
	$("#" + canvasId).mousedown(function(event) {
		rotateHandleMouseDown(event);
	});
    $("#" + canvasId).mouseup(function(event) {
		rotateHandleMouseUp(event);
	});
	$("#" + canvasId).mousemove(function(event) {
		rotateHandleMouseMove(event);
	});
	
	$("#" + canvasId).mousewheel(function(event, delta) {
		zoomHandleMouseWheel(delta);
	});
	
	$(document).keydown(function(event) {
		//registering control or command key down
		if(event.altKey) scene.altKeyDown = true;
	
		if(selectedShapeId != -1) {
			if(event.which == 38) {
				event.preventDefault();
				
				var modif = 'y';
				if(scene.altKeyDown) {
					modif = 'z';
				}
				
				switch(scene.shapes[selectedShapeId].type) {
					case 'light':
						scene.shapes[selectedShapeId][modif] += 0.25;
						break;
					case 'sphere':
						scene.shapes[selectedShapeId][modif] += 0.25;
					default:
						for(i = 0; i < scene.shapes[selectedShapeId].vertexPosition.length; i++) {
							scene.shapes[selectedShapeId].vertexPosition[i][modif] += 0.25;
						}
						break;
				}
				
				refreshProperties();
				refreshScene();
			} else if(event.which == 40) {
				event.preventDefault();
				
				var modif = 'y';
				if(scene.altKeyDown) {
					modif = 'z';
				}
				
				switch(scene.shapes[selectedShapeId].type) {
					case 'light':
						scene.shapes[selectedShapeId][modif] -= 0.25;
						break;
					case 'sphere':
						scene.shapes[selectedShapeId][modif] -= 0.25;
					default:
						for(i = 0; i < scene.shapes[selectedShapeId].vertexPosition.length; i++) {
							scene.shapes[selectedShapeId].vertexPosition[i][modif] -= 0.25;
						}
						break;
				}
				
				refreshProperties();
				refreshScene();
			} else if(event.which == 39) {
				event.preventDefault();
				
				var modif = 'x';
				if(scene.altKeyDown) {
					modif = 'z';
				}
				
				switch(scene.shapes[selectedShapeId].type) {
					case 'light':
						scene.shapes[selectedShapeId][modif] += 0.25;
						break;
					case 'sphere':
						scene.shapes[selectedShapeId][modif] += 0.25;
					default:
						for(i = 0; i < scene.shapes[selectedShapeId].vertexPosition.length; i++) {
							scene.shapes[selectedShapeId].vertexPosition[i][modif] += 0.25;
						}
						break;
				}
				
				refreshProperties();
				refreshScene();
			} else if(event.which == 37) {
				event.preventDefault();
				
				var modif = 'x';
				if(scene.altKeyDown) {
					modif = 'z';
				}
				
				switch(scene.shapes[selectedShapeId].type) {
					case 'light':
						scene.shapes[selectedShapeId][modif] -= 0.25;
						break;
					case 'sphere':
						scene.shapes[selectedShapeId][modif] -= 0.25;
					default:
						for(i = 0; i < scene.shapes[selectedShapeId].vertexPosition.length; i++) {
							scene.shapes[selectedShapeId].vertexPosition[i][modif] -= 0.25;
						}
						break;
				}
				
				refreshProperties();
				refreshScene();
			}
		}
	});
	
	$(document).keyup(function() {
		if(event.altKey) scene.altKeyDown = false;
	});
	
	refreshScene();
}

function degToRad(degrees) {
	return degrees * Math.PI / 180;
}

scene.mouseDown = false;
scene.lastMouseX = null;
scene.lastMouseY = null;
scene.altKeyDown = false;

scene.rotationMatrix = mat4.create();
mat4.identity(scene.rotationMatrix);

function rotateHandleMouseDown(event) {
	scene.mouseDown = true;
	
	scene.lastMouseX = event.clientX;
	scene.lastMouseY = event.clientY;
}

function rotateHandleMouseUp(event) {
	scene.mouseDown = false;
}

function rotateHandleMouseMove(event) {
	if (!scene.mouseDown) {
        return;
	}
	
	var newX = event.clientX;
	var newY = event.clientY;

	var deltaX = newX - scene.lastMouseX;
	
	var newRotationMatrix = mat4.create();
	mat4.identity(newRotationMatrix);
	mat4.rotate(newRotationMatrix, degToRad(deltaX/5), [0, 1, 0]);

	var deltaY = newY - scene.lastMouseY;
	mat4.rotate(newRotationMatrix, degToRad(deltaY/5), [1, 0, 0]);

	mat4.multiply( newRotationMatrix,scene.rotationMatrix,scene.rotationMatrix);

	scene.lastMouseX = newX
	scene.lastMouseY = newY;
	
	refreshScene();
}

function zoomHandleMouseWheel(delta) {
	scene.zoomMatrix[2] += delta;
	
	refreshScene();
}

function initScene() {
    initSceneData();
    
    $("#scene").click(function() {
    	deselectShape();
    	refreshScene();
    });
}
