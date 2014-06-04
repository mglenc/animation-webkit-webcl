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
scene.bcolor.r = 0.2;
scene.bcolor.g = 0.2;
scene.bcolor.b = 0.2;

scene.glcolor = new Object();
scene.glcolor.r = 0.2;
scene.glcolor.g = 0.2;
scene.glcolor.b = 0.2;

//original position: 0; 0; -9
scene.zoomMatrix = [0,0,-7];

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
						scene.shapes[selectedShapeId][modif] = parseFloat(scene.shapes[selectedShapeId][modif]) - 0.25;
						break;
					case 'sphere':
						scene.shapes[selectedShapeId][modif] = parseFloat(scene.shapes[selectedShapeId][modif]) - 0.25;
					default:
						for(i = 0; i < scene.shapes[selectedShapeId].vertexPosition.length; i++) {
							scene.shapes[selectedShapeId].vertexPosition[i][modif] = parseFloat(scene.shapes[selectedShapeId].vertexPosition[i][modif]) - 0.25;
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
						scene.shapes[selectedShapeId][modif] = parseFloat(scene.shapes[selectedShapeId][modif]) + 0.25;
						break;
					case 'sphere':
						scene.shapes[selectedShapeId][modif] = parseFloat(scene.shapes[selectedShapeId][modif]) + 0.25;
					default:
						for(i = 0; i < scene.shapes[selectedShapeId].vertexPosition.length; i++) {
							scene.shapes[selectedShapeId].vertexPosition[i][modif] = parseFloat(scene.shapes[selectedShapeId].vertexPosition[i][modif]) +  0.25;
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
	
	//refreshScene();
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
	
	logMessage("Rotating scene, newX: " + newX + ", newY: " + newY);

	var drawMethod = $('input[name="draw-method"]:checked').val();
		
	if(drawMethod == "outline") {
		var deltaX = newX - scene.lastMouseX;
	
		var newRotationMatrix = mat4.create();
		mat4.identity(newRotationMatrix);
		mat4.rotate(newRotationMatrix, degToRad(deltaX/5), [0, 1, 0]);

		var deltaY = newY - scene.lastMouseY;
		mat4.rotate(newRotationMatrix, degToRad(deltaY/5), [1, 0, 0]);

		mat4.multiply( newRotationMatrix,scene.rotationMatrix,scene.rotationMatrix);
	} else if(drawMethod == "render-cl") {
		var deltaX = newX - scene.lastMouseX;
		var deltaY = newY - scene.lastMouseY;
		
		console.log("Old camera_x: " + camera_x + ", camera_y: " + camera_y);
		
		camera_x -= deltaX/100;
		camera_y -= deltaY/100;
		
		console.log("New camera_x: " + camera_x + ", camera_y: " + camera_y);
	}

	scene.lastMouseX = newX
	scene.lastMouseY = newY;
	
	refreshScene();
}

function zoomHandleMouseWheel(delta) {
	scene.zoomMatrix[2] += delta;
	
	logMessage("Zooming scene matrix[2]: " + scene.zoomMatrix[2]);
	
	refreshScene();
}



function initScene() {
    initSceneData();
    
    $("#scene").click(function() {
    	deselectShape();
    	refreshScene();
    });
    
    //window resize event chnages ratio
	$(window).resize(function() {
		canvas.width = $("#" + canvasId).width();
		canvas.height = $("#" + canvasId).height();
		
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
		
		refreshScene();
	});
}
