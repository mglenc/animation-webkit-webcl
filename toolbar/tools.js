/*
Tools Javascript

Date: 16-07-2012
Author: Michal Glenc
*/

uniqShapeId = 0;

var running_log;
var enable_log = false;

function addComplex(properties) {
	var newObj = scene.shapes.length;
	scene.shapes[newObj] = new Object();
	
	if(properties != undefined && properties['name'] != undefined && properties['name'] != "")
		scene.shapes[newObj].name = properties['name'];
	else
		scene.shapes[newObj].name = "Layer " + newObj + " - Complex";
	
	scene.shapes[newObj].uniqShapeId = uniqShapeId++;
	
	scene.shapes[newObj].vertexPositionBuffer = gl.createBuffer();
	scene.shapes[newObj].vertexColorBuffer = gl.createBuffer();
	
	if(properties != undefined && properties['n'] != undefined && properties['n'] != "")
		scene.shapes[newObj].n = properties['n'];
	else
		scene.shapes[newObj].n = 0.5;
	
	//animations array
	/*scene.shapes[newObj].animations = new Array();
	scene.shapes[newObj].animations[0] = new Object();
	scene.shapes[newObj].animations[0].property = 'position';
	scene.shapes[newObj].animations[0].type = 'linear';
	scene.shapes[newObj].animations[0].startFrame = 0;
	scene.shapes[newObj].animations[0].endFrame = 49;
	scene.shapes[newObj].animations[0].vector = [5.0, -3.0, -10.0];
	
	scene.shapes[newObj].animations[1] = new Object();
	scene.shapes[newObj].animations[1].property = 'position';
	scene.shapes[newObj].animations[1].type = 'linear';
	scene.shapes[newObj].animations[1].startFrame = 50;
	scene.shapes[newObj].animations[1].endFrame = 99;
	scene.shapes[newObj].animations[1].vector = [0.0, 0.0, -7.0];*/
	
	colors = [
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3
	];
	
	//saving vertices in an array
	scene.shapes[newObj].vertexPosition = new Array();
	scene.shapes[newObj].vertexPosition = properties.vertices;
	scene.shapes[newObj].vertexPosition.itemSize = 3;
	
	scene.shapes[newObj].vertexColor = new Array();
	scene.shapes[newObj].vertexColor = colors;
	scene.shapes[newObj].vertexColor.itemSize = 4;
	
	scene.shapes[newObj].acolor = new Object();
	if(properties != undefined && properties['acolor'] != undefined && properties['acolor'] != "")
		scene.shapes[newObj].acolor = properties['acolor'];
	else {
		scene.shapes[newObj].acolor.r = 0.5;
		scene.shapes[newObj].acolor.g = 0.5;
		scene.shapes[newObj].acolor.b = 0.5;
	}
	
	if(properties != undefined && properties['refl'] != undefined && properties['refl'] != "")
		scene.shapes[newObj].refl = properties['refl'];
	else
		scene.shapes[newObj].refl = 0.8;
	
	if(properties != undefined && properties['refr'] != undefined && properties['refr'] != "")
		scene.shapes[newObj].refr = properties['refr'];
	else
		scene.shapes[newObj].refr = 0.8;
		
	if(properties != undefined && properties['refr_index'] != undefined && properties['refr_index'] != "")
		scene.shapes[newObj].refr_index = properties['refr_index'];
	else
		scene.shapes[newObj].refr_index = 1.0;
		
	if(properties != undefined && properties['diff'] != undefined && properties['diff'] != "")
		scene.shapes[newObj].diff = properties['diff'];
	else
		scene.shapes[newObj].diff = 0.0;
		
		if(properties != undefined && properties['spec'] != undefined && properties['spec'] != "")
		scene.shapes[newObj].spec = properties['spec'];
	else
		scene.shapes[newObj].spec = 0.0;
	
	//setting shape type
	scene.shapes[newObj].type = 'complex';
	
	scene.shapes[newObj].animations = new Array();
	if(properties != undefined && properties['animations'] != undefined && properties['animations'] != "")
		scene.shapes[newObj].animations = properties['animations'];
	
	return newObj;
}

function addLight(properties) {
	var newObj = scene.shapes.length;
	scene.shapes[newObj] = new Object();
	
	if(properties != undefined && properties['name'] != undefined && properties['name'] != "")
		scene.shapes[newObj].name = properties['name'];
	else
		scene.shapes[newObj].name = "Layer " + newObj + " - Light";
	
	if(properties != undefined && properties['x'] != undefined && properties['x'] != "")
		scene.shapes[newObj].x = properties['x'];
	else
		scene.shapes[newObj].x = 3.0;
	
	if(properties != undefined && properties['y'] != undefined && properties['y'] != "")
		scene.shapes[newObj].y = properties['y'];
	else
		scene.shapes[newObj].y = 6.0;
		
	if(properties != undefined && properties['z'] != undefined && properties['z'] != "")
		scene.shapes[newObj].z = properties['z'];
	else
		scene.shapes[newObj].z = 0.0;
		
	if(properties != undefined && properties['refl'] != undefined && properties['refl'] != "")
		scene.shapes[newObj].refl = properties['refl'];
	else
		scene.shapes[newObj].refl = 0.0;
	
	if(properties != undefined && properties['refr'] != undefined && properties['refr'] != "")
		scene.shapes[newObj].refr = properties['refr'];
	else
		scene.shapes[newObj].refr = 0.0;
		
	if(properties != undefined && properties['refr_index'] != undefined && properties['refr_index'] != "")
		scene.shapes[newObj].refr_index = properties['refr_index'];
	else
		scene.shapes[newObj].refr_index = 1.0;
		
	if(properties != undefined && properties['diff'] != undefined && properties['diff'] != "")
		scene.shapes[newObj].diff = properties['diff'];
	else
		scene.shapes[newObj].diff = 0.0;
		
		if(properties != undefined && properties['spec'] != undefined && properties['spec'] != "")
		scene.shapes[newObj].spec = properties['spec'];
	else
		scene.shapes[newObj].spec = 2.0;
		
	//not setting id since it old ids can collide with new ones
	scene.shapes[newObj].uniqShapeId = uniqShapeId++;
	scene.shapes[newObj].type = 'light';
	
	if(properties != undefined && properties['r'] != undefined && properties['r'] != "")
		scene.shapes[newObj].r = properties['r'];
	else
		scene.shapes[newObj].r = 0.35;
	
	scene.shapes[newObj].acolor = new Object();
	if(properties != undefined && properties['acolor'] != undefined && properties['acolor'] != "")
		scene.shapes[newObj].acolor = properties['acolor'];
	else {
		scene.shapes[newObj].acolor.r = 0.9;
		scene.shapes[newObj].acolor.g = 0.9;
		scene.shapes[newObj].acolor.b = 0.9;
	}
	
	scene.shapes[newObj].scolor = new Object();
	if(properties != undefined && properties['scolor'] != undefined && properties['scolor'] != "")
		scene.shapes[newObj].scolor = properties['scolor'];
	else {
		scene.shapes[newObj].scolor.r = 0.2;
		scene.shapes[newObj].scolor.g = 0.3;
		scene.shapes[newObj].scolor.b = 0.1;
	}
	
	scene.shapes[newObj].dcolor = new Object();
	if(properties != undefined && properties['dcolor'] != undefined && properties['dcolor'] != "")
		scene.shapes[newObj].dcolor = properties['dcolor'];
	else {
		scene.shapes[newObj].dcolor.r = 0.2;
		scene.shapes[newObj].dcolor.g = 0.3;
		scene.shapes[newObj].dcolor.b = 0.1;
	}
	
	scene.shapes[newObj].animations = new Array();
	if(properties != undefined && properties['animations'] != undefined && properties['animations'] != "")
		scene.shapes[newObj].animations = properties['animations'];
	
	return newObj;
}

function addSphere(properties) {
	var newObj = scene.shapes.length;
	scene.shapes[newObj] = new Object();
	
	if(properties != undefined && properties['name'] != undefined && properties['name'] != "")
		scene.shapes[newObj].name = properties['name'];
	else
		scene.shapes[newObj].name = "Layer " + newObj + " - Sphere";
	
	if(properties != undefined && properties['x'] != undefined && properties['x'] != "") {
		scene.shapes[newObj].x = properties['x'];
	} else
		scene.shapes[newObj].x = 0.0;
	
	if(properties != undefined && properties['y'] != undefined && properties['y'] != "")
		scene.shapes[newObj].y = properties['y'];
	else
		scene.shapes[newObj].y = 0.0;
		
	if(properties != undefined && properties['z'] != undefined && properties['z'] != "")
		scene.shapes[newObj].z = properties['z'];
	else
		scene.shapes[newObj].z = 0.0;
		
	//not setting id since it old ids can collide with new ones
	scene.shapes[newObj].uniqShapeId = uniqShapeId++;
	scene.shapes[newObj].type = 'sphere';
	
	if(properties != undefined && properties['r'] != undefined && properties['r'] != "")
		scene.shapes[newObj].r = properties['r'];
	else
		scene.shapes[newObj].r = 1;
		
	if(properties != undefined && properties['n'] != undefined && properties['n'] != "")
		scene.shapes[newObj].n = properties['n'];
	else
		scene.shapes[newObj].n = 0.5;
	
	scene.shapes[newObj].latitudeBands = 10;
	scene.shapes[newObj].longitudeBands = 10;
	
	scene.shapes[newObj].vertexPositionBuffer = gl.createBuffer();
	scene.shapes[newObj].vertexColorBuffer = gl.createBuffer();
	scene.shapes[newObj].vertexPosition = new Array();
	scene.shapes[newObj].vertexPosition.itemSize = 3;
	
	scene.shapes[newObj].acolor = new Object();
	if(properties != undefined && properties['acolor'] != undefined && properties['acolor'] != "")
		scene.shapes[newObj].acolor = properties['acolor'];
	else {
		scene.shapes[newObj].acolor.r = 0.6;
		scene.shapes[newObj].acolor.g = 0.6;
		scene.shapes[newObj].acolor.b = 0.6;
	}
	
	if(properties != undefined && properties['refl'] != undefined && properties['refl'] != "")
		scene.shapes[newObj].refl = properties['refl'];
	else
		scene.shapes[newObj].refl = 0.3;
	
	if(properties != undefined && properties['refr'] != undefined && properties['refr'] != "")
		scene.shapes[newObj].refr = properties['refr'];
	else
		scene.shapes[newObj].refr = 0.8;
		
	if(properties != undefined && properties['refr_index'] != undefined && properties['refr_index'] != "")
		scene.shapes[newObj].refr_index = properties['refr_index'];
	else
		scene.shapes[newObj].refr_index = 1.0;
		
	if(properties != undefined && properties['diff'] != undefined && properties['diff'] != "")
		scene.shapes[newObj].diff = properties['diff'];
	else
		scene.shapes[newObj].diff = 2.0;
		
		if(properties != undefined && properties['spec'] != undefined && properties['spec'] != "")
		scene.shapes[newObj].spec = properties['spec'];
	else
		scene.shapes[newObj].spec = 0.0;
	
	var colors = [
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3,
		0.5, 0.5, 0.5, 0.3
	];
	
	scene.shapes[newObj].vertexColor = colors;
	scene.shapes[newObj].vertexColor.itemSize = 4;
	
	countSphereVertices(newObj);
	
	scene.shapes[newObj].animations = new Array();
	if(properties != undefined && properties['animations'] != undefined && properties['animations'] != "")
		scene.shapes[newObj].animations = properties['animations'];
	
	return newObj;
}

function initShapes() {
	$(".tools#shapes-dialog .button#cube").click(function() {
		var cv = [
		  // Front face
		  -1.0, -1.0,  1.0,
		   1.0, -1.0,  1.0,
		   1.0,  1.0,  1.0,
		  -1.0,  1.0,  1.0,
	
		  // Back face
		  -1.0, -1.0, -1.0,
		  -1.0,  1.0, -1.0,
		   1.0,  1.0, -1.0,
		   1.0, -1.0, -1.0,
	
		  // Top face
		  -1.0,  1.0, -1.0,
		  -1.0,  1.0,  1.0,
		   1.0,  1.0,  1.0,
		   1.0,  1.0, -1.0,
	
		  // Bottom face
		  -1.0, -1.0, -1.0,
		   1.0, -1.0, -1.0,
		   1.0, -1.0,  1.0,
		  -1.0, -1.0,  1.0,
	
		  // Right face
		   1.0, -1.0, -1.0,
		   1.0,  1.0, -1.0,
		   1.0,  1.0,  1.0,
		   1.0, -1.0,  1.0,
	
		  // Left face
		  -1.0, -1.0, -1.0,
		  -1.0, -1.0,  1.0,
		  -1.0,  1.0,  1.0,
		  -1.0,  1.0, -1.0,
		];
			
		var vertices = [
			{x:cv[0], y:cv[1], z:cv[2]},
			{x:cv[3], y:cv[4], z:cv[5]},
			{x:cv[6], y:cv[7], z:cv[8]},
			
			{x:cv[0], y:cv[1], z:cv[2]},
			{x:cv[6], y:cv[7], z:cv[8]},
			{x:cv[9], y:cv[10], z:cv[11]},
			
			{x:cv[12], y:cv[13], z:cv[14]},
			{x:cv[15], y:cv[16], z:cv[17]},
			{x:cv[18], y:cv[19], z:cv[20]},
			
			{x:cv[12], y:cv[13], z:cv[14]},
			{x:cv[18], y:cv[19], z:cv[20]},
			{x:cv[21], y:cv[22], z:cv[23]},
			
			{x:cv[24], y:cv[25], z:cv[26]},
			{x:cv[27], y:cv[28], z:cv[29]},
			{x:cv[30], y:cv[31], z:cv[32]},
			
			{x:cv[24], y:cv[25], z:cv[26]},
			{x:cv[30], y:cv[31], z:cv[32]},
			{x:cv[33], y:cv[34], z:cv[35]},
			
			{x:cv[36], y:cv[37], z:cv[38]},
			{x:cv[39], y:cv[40], z:cv[41]},
			{x:cv[42], y:cv[43], z:cv[44]},
			
			{x:cv[36], y:cv[37], z:cv[38]},
			{x:cv[42], y:cv[43], z:cv[44]},
			{x:cv[45], y:cv[46], z:cv[47]},
			
			{x:cv[48], y:cv[49], z:cv[50]},
			{x:cv[51], y:cv[52], z:cv[53]},
			{x:cv[54], y:cv[55], z:cv[56]},
			
			{x:cv[48], y:cv[49], z:cv[50]},
			{x:cv[54], y:cv[55], z:cv[56]},
			{x:cv[57], y:cv[58], z:cv[59]},
			
			{x:cv[60], y:cv[61], z:cv[62]},
			{x:cv[63], y:cv[64], z:cv[65]},
			{x:cv[66], y:cv[67], z:cv[68]},
			
			{x:cv[60], y:cv[61], z:cv[62]},
			{x:cv[66], y:cv[67], z:cv[68]},
			{x:cv[69], y:cv[70], z:cv[71]}
		];
		
		var newObj = addComplex({vertices: vertices});
		
		refreshTimeline();
		
		//setting selectedShape
		selectShape(newObj);
		
		//no need to refresh scene, cause it is done already in selectShape
	});
	
	$(".tools#shapes-dialog .button#light").click(function() {
		var newObj = addLight();
		
		refreshTimeline();
		selectShape(newObj);
	});
	
	$(".tools#shapes-dialog .button#sphere").click(function() {
		var newObj = addSphere();
		
		refreshTimeline();
		
		selectShape(newObj);
	});
}

function countSphereVertices(sphereShapeId) {
	var vertexPositionData = [];
	scene.shapes[sphereShapeId].vertexPosition.length = 0;

	for(latNumber = 0; latNumber <= scene.shapes[sphereShapeId].latitudeBands; latNumber++) {
		var theta = latNumber * Math.PI / scene.shapes[sphereShapeId].latitudeBands;
		var sinTheta = Math.sin(theta);
		var cosTheta = Math.cos(theta);
		
		for(longNumber = 0; longNumber <= scene.shapes[sphereShapeId].longitudeBands; longNumber++) {
			var phi = longNumber * 2 * Math.PI / scene.shapes[sphereShapeId].longitudeBands;
			var sinPhi = Math.sin(phi);
			var cosPhi = Math.cos(phi);
			
			var x = cosPhi * sinTheta;
			var y = cosTheta;
			var z = sinPhi * sinTheta;
			
			vertexPositionData.push(scene.shapes[sphereShapeId].r * x + scene.shapes[sphereShapeId].x);
			vertexPositionData.push(scene.shapes[sphereShapeId].r * y + scene.shapes[sphereShapeId].y);
			vertexPositionData.push(scene.shapes[sphereShapeId].r * z + scene.shapes[sphereShapeId].z);
		}
	}
	
	for(latNumber = 0; latNumber < scene.shapes[sphereShapeId].latitudeBands; latNumber++) {
		for(longNumber = 0; longNumber < scene.shapes[sphereShapeId].longitudeBands; longNumber++) {
			var first = (latNumber * (scene.shapes[sphereShapeId].longitudeBands + 1)) + longNumber;
        	var second = first + scene.shapes[sphereShapeId].longitudeBands + 1;
		
			scene.shapes[sphereShapeId].vertexPosition.push({x: vertexPositionData[3*(first)], y: vertexPositionData[3*first+1], z: vertexPositionData[3*first+2]});
			scene.shapes[sphereShapeId].vertexPosition.push({x: vertexPositionData[3*second], y: vertexPositionData[3*second+1], z: vertexPositionData[3*second+2]});
			scene.shapes[sphereShapeId].vertexPosition.push({x: vertexPositionData[3*(first+1)], y: vertexPositionData[3*(first+1)+1], z: vertexPositionData[3*(first+1)+2]});
			
			scene.shapes[sphereShapeId].vertexPosition.push({x: vertexPositionData[3*second], y: vertexPositionData[3*second+1], z: vertexPositionData[3*second+2]});
			scene.shapes[sphereShapeId].vertexPosition.push({x: vertexPositionData[3*(second+1)], y: vertexPositionData[3*(second+1)+1], z: vertexPositionData[3*(second+1)+2]});
			scene.shapes[sphereShapeId].vertexPosition.push({x: vertexPositionData[3*(first+1)], y: vertexPositionData[3*(first+1)+1], z: vertexPositionData[3*(first+1)+2]});
		}
	}
}

function refreshProperties() {
	if(selectedShapeId == -1) {
		$('table#vertices').jqGrid('GridUnload');
		$('#properties-dialog').html('<div class="panel last" id="scene-panel">' +
				'<table>' + 
					'<tr class="name">' +
						'<td class="left-col">scene name:</td>' +
						'<td class="right-col"><input type="text" id="name-input" value="' + scene.name + '" /></td>' +
					'</tr>' +
					'<tr class="frames">' +
						'<td class="left-col">frames:</td>' +
						'<td class="right-col"><input type="text" id="frames-input" value="' + scene.frames + '" /></td>' +
					'</tr>' +
					/*'<tr class="fps">' +
						'<td class="left-col">frames per second:</td>' +
						'<td class="right-col"><input type="text" id="fps-input" value="' + scene.fps + '" /></td>' +
					'</tr>' +
					'<tr class="height">' +
						'<td class="left-col">scene height:</td>' +
						'<td class="right-col"><input type="text" id="height-input" value="' + scene.height + '" /></td>' +
					'</tr>' +
					'<tr class="width">' +
						'<td class="left-col">scene width:</td>' +
						'<td class="right-col"><input type="text" id="width-input" value="' + scene.width + '" /></td>' +
					'</tr>' +
					'<tr class="depth">' +
						'<td class="left-col">scene depth:</td>' +
						'<td class="right-col"><input type="text" id="depth-input" value="' + scene.depth + '" /></td>' +
					'</tr>' +
					'<tr class="resolution">' +
						'<td class="left-col">resolution:</td>' +
						'<td class="right-col"><input type="text" id="resx-input" value="' + scene.resx + '" /> x <input type="text" id="resy-input" value="' + scene.resy + '" /></td>' +
					'</tr>' +*/
					'<tr class="bcolor">' +
						'<td class="left-col">background color:</td>' +
						'<td class="right-col"><a href="javascript:void" class="button-small set" id="set-scene-bcolor">Set bcolor</a></td>' +
					'</tr>' +
					'<tr class="glcolor">' +
						'<td class="left-col">global light color:</td>' +
						'<td class="right-col"><a href="javascript:void" class="button-small set" id="set-scene-glcolor">Set glcolor</a></td>' +
					'</tr>' +
				'</table>' + 
			'</div>');
			
			$('a#set-scene-bcolor').click(function() {
				$('.tools#color-dialog').dialog({
					dialogClass: 'color-dialog',
					autoOpen: true,
					width: 'auto',
					height: 'auto',
					minHeight: 0,
					resizable: false,
					autoResize: true,
					position: [$(document).width()/2-100, 300],
					buttons: {
					},
					open: function() {
						$('.tools#color-dialog').html('Scene bcolor');				
						$('.tools#color-dialog').ColorPicker({
							flat: true,
							color: {r: scene.bcolor.r*255, g: scene.bcolor.g*255, b: scene.bcolor.b*255},
							onChange: function(hsb, hex, rgb) {
								scene.bcolor.r = rgb.r/255;
								scene.bcolor.g = rgb.g/255;
								scene.bcolor.b = rgb.b/255;
								
								//console.log("bcolor onchange: " + scene.bcolor.r*255 + " " + scene.bcolor.g*255 + " " + scene.bcolor.b*255);
							}
						});
					},
					close: function() {
						$('.tools#color-dialog .colorpicker').remove();
						$('.tools#color-dialog').removeData('colorpickerId');
						
						refreshScene();
						//console.log("bcolor onclose: " + scene.bcolor.r*255 + " " + scene.bcolor.g*255 + " " + scene.bcolor.b*255);
					}
				});
			});
			
			$('a#set-scene-glcolor').click(function() {
				$('.tools#color-dialog').dialog({
					dialogClass: 'color-dialog',
					autoOpen: true,
					width: 'auto',
					height: 'auto',
					minHeight: 0,
					resizable: false,
					autoResize: true,
					position: [$(document).width()/2-100, 300],
					buttons: {
					},
					open: function() {
						$('.tools#color-dialog').html('Scene glcolor');
						$('.tools#color-dialog').ColorPicker({
							flat: true,
							color: {r: scene.glcolor.r*255, g: scene.glcolor.g*255, b: scene.glcolor.b*255},
							onChange: function(hsb, hex, rgb) {
								scene.glcolor.r = rgb.r/255;
								scene.glcolor.g = rgb.g/255;
								scene.glcolor.b = rgb.b/255;
								
								//console.log("glcolor onchange: " + scene.glcolor.r*255 + " " + scene.glcolor.g*255 + " " + scene.glcolor.b*255);
							}
						});			
					},
					close: function() {
						$('.tools#color-dialog .colorpicker').remove();
						$('.tools#color-dialog').removeData('colorpickerId');
					
						refreshScene();
						//console.log("glcolor onclose: " + scene.glcolor.r*255 + " " + scene.glcolor.g*255 + " " + scene.glcolor.b*255);
					}
				});
			});
			
			$('#properties-dialog #scene-panel table input').keydown(function(event) {
				if(event.which == 13) {
					scene.name = $('#name-input').val();
					scene.frames = $('#frames-input').val();
					/*scene.fps = $('#fps-input').val();
					scene.height = $('#height-input').val();
					scene.width = $('#width-input').val();
					scene.depth = $('#depth-input').val();
					scene.resx = $('#resx-input').val();
					scene.resy = $('#resy-input').val();*/
					//colors
					
					refreshTimeline();
				}
			});
	} else {
		if(scene.shapes[selectedShapeId].type == "light") {
			$('#properties-dialog').html('<div class="panel last" id="light-panel">' +
				'<table>' + 
					'<tr class="position">' +
						'<td class="left-col">postion: </td>' +
						'<td class="right-col">x: <input type="text" id="light-x-input" value="' + scene.shapes[selectedShapeId].x + '" /><br />y: <input type="text" id="light-y-input" value="' + scene.shapes[selectedShapeId].y + '" /><br />z: <input type="text" id="light-z-input" value="' + scene.shapes[selectedShapeId].z + '" /></td>' +
					'</tr>' +
					'<tr class="radius">' +
						'<td class="left-col">radius: </td>' +
						'<td class="right-col"><input type="text" id="light-r-input" value="' + scene.shapes[selectedShapeId].r + '" /></td>' +
					'</tr>' +
					'<tr class="acolor">' +
						'<td class="left-col">ambient color:</td>' +
						'<td class="right-col"><a href="javascript:void" class="button-small set" id="set-light-acolor">Set ambient color</a></td>' +
					'</tr>' +
					//below parameters wont change anything for light
					'<tr class="refl" style="display: none;">' +
						'<td class="left-col">surface reflection: </td>' +
						'<td class="right-col"><input type="text" id="light-refl-input" value="' + scene.shapes[selectedShapeId].refl + '" /></td>' +
					'</tr>' +
					'<tr class="refr" style="display: none;">' +
						'<td class="left-col">material refraction: </td>' +
						'<td class="right-col"><input type="text" id="light-refr-input" value="' + scene.shapes[selectedShapeId].refr + '" /></td>' +
					'</tr>' +
					'<tr class="refr_index" style="display: none;">' +
						'<td class="left-col">refraction index: </td>' +
						'<td class="right-col"><input type="text" id="light-refr-index-input" value="' + scene.shapes[selectedShapeId].refr_index + '" /></td>' +
					'</tr>' +
					'<tr class="diff" style="display: none;">' +
						'<td class="left-col">surface diffuse: </td>' +
						'<td class="right-col"><input type="text" id="light-diff-input" value="' + scene.shapes[selectedShapeId].diff + '" /></td>' +
					'</tr>' +
					'<tr class="spec" style="display: none;">' +
						'<td class="left-col">surface specular: </td>' +
						'<td class="right-col"><input type="text" id="light-spec-input" value="' + scene.shapes[selectedShapeId].spec + '" /></td>' +
					'</tr>' +
				'</table>');
			$('a#set-light-acolor').click(function() {
				$('.tools#color-dialog').dialog({
					dialogClass: 'color-dialog',
					autoOpen: true,
					width: 'auto',
					height: 'auto',
					minHeight: 0,
					resizable: false,
					autoResize: true,
					position: [$(document).width()/2-100, 300],
					buttons: {
					},
					open: function() {
						$('.tools#color-dialog').html('Light ambient color');				
						$('.tools#color-dialog').ColorPicker({
							flat: true,
							color: {r: scene.shapes[selectedShapeId].acolor.r*255, g: scene.shapes[selectedShapeId].acolor.g*255, b: scene.shapes[selectedShapeId].acolor.b*255},
							onChange: function(hsb, hex, rgb) {
								scene.shapes[selectedShapeId].acolor.r = rgb.r/255;
								scene.shapes[selectedShapeId].acolor.g = rgb.g/255;
								scene.shapes[selectedShapeId].acolor.b = rgb.b/255;
								
								//console.log("acolor onchange: " + scene.shapes[selectedShapeId].acolor.r*255 + " " + scene.shapes[selectedShapeId].acolor.g*255 + " " + scene.shapes[selectedShapeId].acolor.b*255);
							}
						});
					},
					close: function() {
						$('.tools#color-dialog .colorpicker').remove();
						$('.tools#color-dialog').removeData('colorpickerId');
						
						refreshScene();
						//console.log("acolor onclose: " + scene.shapes[selectedShapeId].acolor.r*255 + " " + scene.shapes[selectedShapeId].acolor.g*255 + " " + scene.shapes[selectedShapeId].acolor.b*255);
					}
				});
			});
			
			$('#properties-dialog #light-panel table input').keydown(function(event) {
				if(event.which == 13) {
					scene.shapes[selectedShapeId].x = $('#light-x-input').val();
					scene.shapes[selectedShapeId].y = $('#light-y-input').val();
					scene.shapes[selectedShapeId].z = $('#light-z-input').val();
					scene.shapes[selectedShapeId].r = $('#light-r-input').val();
					scene.shapes[selectedShapeId].refl = $('#light-refl-input').val();
					scene.shapes[selectedShapeId].refr = $('#light-refr-input').val();
					scene.shapes[selectedShapeId].refr_index = $('#light-refr-index-input').val();
					scene.shapes[selectedShapeId].diff = $('#light-diff-input').val();
					scene.shapes[selectedShapeId].spec = $('#light-spec-input').val();
					
					//console.log(scene.shapes[selectedShapeId].refl + 
					
					refreshScene();
				}
			});
		} else {
			//Initializing shapes color dialog
			//Initializing vertices grid
			var lastsel;
			
			$('#properties-dialog').html('<div class="panel" id="shape-color-panel">' +
					'<table>' + 
						'<tr class="acolor">' +
							'<td class="left-col">ambient color:</td>' +
							'<td class="right-col"><a href="javascript:void" class="button-small set" id="set-shape-acolor">Set ambient color</a></td>' +
						'</tr>' +
						'<tr class="refl">' +
							'<td class="left-col">surface reflection: </td>' +
							'<td class="right-col"><input type="text" id="light-refl-input" value="' + scene.shapes[selectedShapeId].refl + '" /></td>' +
						'</tr>' +
						'<tr class="refr">' +
							'<td class="left-col">material refraction: </td>' +
							'<td class="right-col"><input type="text" id="light-refr-input" value="' + scene.shapes[selectedShapeId].refr + '" /></td>' +
						'</tr>' +
						'<tr class="refr_index">' +
							'<td class="left-col">refraction index: </td>' +
							'<td class="right-col"><input type="text" id="light-refr-index-input" value="' + scene.shapes[selectedShapeId].refr_index + '" /></td>' +
						'</tr>' +
						'<tr class="diff">' +
							'<td class="left-col">surface diffuse: </td>' +
							'<td class="right-col"><input type="text" id="light-diff-input" value="' + scene.shapes[selectedShapeId].diff + '" /></td>' +
						'</tr>' +
						'<tr class="spec">' +
							'<td class="left-col">surface specular: </td>' +
							'<td class="right-col"><input type="text" id="light-spec-input" value="' + scene.shapes[selectedShapeId].spec + '" /></td>' +
						'</tr>' +
					'</table>' + 
				'</div>' +
				'<div class="panel last" id="vertices-panel">' +
					'<table id="vertices"></table>' +
					'<div class="clear"></div>' +
				'</div>');
				
			$('a#set-shape-acolor').click(function() {
				$('.tools#color-dialog').dialog({
					dialogClass: 'color-dialog',
					autoOpen: true,
					width: 'auto',
					height: 'auto',
					minHeight: 0,
					resizable: false,
					autoResize: true,
					position: [$(document).width()/2-100, 300],
					buttons: {
					},
					open: function() {
						$('.tools#color-dialog').html('Shape ambient color');				
						$('.tools#color-dialog').ColorPicker({
							flat: true,
							color: {r: scene.shapes[selectedShapeId].acolor.r*255, g: scene.shapes[selectedShapeId].acolor.g*255, b: scene.shapes[selectedShapeId].acolor.b*255},
							onChange: function(hsb, hex, rgb) {
								scene.shapes[selectedShapeId].acolor.r = rgb.r/255;
								scene.shapes[selectedShapeId].acolor.g = rgb.g/255;
								scene.shapes[selectedShapeId].acolor.b = rgb.b/255;
							}
						});
					},
					close: function() {
						$('.tools#color-dialog .colorpicker').remove();
						$('.tools#color-dialog').removeData('colorpickerId');
						
						refreshScene();
						//console.log("bcolor onclose: " + scene.shapes[selectedShapeId].acolor.r*255 + " " + scene.shapes[selectedShapeId].acolor.g*255 + " " + scene.shapes[selectedShapeId].acolor.b*255);
					}
				});
			});
				
			$('#properties-dialog #shape-color-panel table input').keydown(function(event) {
				if(event.which == 13) {
					scene.shapes[selectedShapeId].refl = $('#light-refl-input').val();
					scene.shapes[selectedShapeId].refr = $('#light-refr-input').val();
					scene.shapes[selectedShapeId].refr_index = $('#light-refr-index-input').val();
					scene.shapes[selectedShapeId].diff = $('#light-diff-input').val();
					scene.shapes[selectedShapeId].spec = $('#light-spec-input').val();
					
					refreshScene();
				}
			});
			
			$("table#vertices").jqGrid('GridUnload');
			
			if(scene.shapes[selectedShapeId].type == 'sphere') {
				$("#properties-dialog #vertices-panel").html('<table class="sphere-data">' + 
						'<tr class="position">' +
							'<td class="left-col">postion: </td>' +
							'<td class="right-col">x: <input type="text" id="sphere-x-input" value="' + scene.shapes[selectedShapeId].x + '" /><br />y: <input type="text" id="sphere-y-input" value="' + scene.shapes[selectedShapeId].y + '" /><br />z: <input type="text" id="sphere-z-input" value="' + scene.shapes[selectedShapeId].z + '" /></td>' +
						'</tr>' +
						'<tr class="radius">' +
							'<td class="left-col">radius: </td>' +
							'<td class="right-col"><input type="text" id="sphere-r-input" value="' + scene.shapes[selectedShapeId].r + '" /></td>' +
						'</tr>' +
					'</table>');
					
				$('#properties-dialog #vertices-panel table.sphere-data input').keydown(function(event) {
					if(event.which == 13) {
						scene.shapes[selectedShapeId].x = parseFloat($('#sphere-x-input').val());
						scene.shapes[selectedShapeId].y = parseFloat($('#sphere-y-input').val());
						scene.shapes[selectedShapeId].z = parseFloat($('#sphere-z-input').val());
						scene.shapes[selectedShapeId].r = parseFloat($('#sphere-r-input').val());
						
						countSphereVertices(selectedShapeId);
					
						refreshScene();
					}
				});
			} else {
				$("table#vertices").jqGrid({
					caption: 'Shape vertices',
					datatype: 'local',
					multiselect: true,
					cellsubmit: 'clientArray',
					url: 'clientArray',
					cellEdit: true,
					loadonce: false,
					rowNum: 999999,
					colNames: ['x', 'y', 'z', 'a'],
					colModel: [ {name: 'x', index: 'x', editable: true, sortable: false},
					{name: 'y', index: 'y', editable: true, sortable: false},
					{name: 'z', index: 'z', editable: true, sortable: false},
					{name: 'a', index: 'z', editable: false, sortable: false, classes: 'buttons', width: 20}],
					data: scene.shapes[selectedShapeId].vertexPosition,
					width: 276,
					height: 115,
					
					onSelectRow: function(id) {
						if(id && id!=lastsel) {
							$('table#vertices').jqGrid('restoreRow', lastsel);
							$('table#vertices').jqGrid('editRow', id, true);
							lastsel=id;
						}
					},
					
					afterSaveCell: function(rowid, cellname, value, iRow, iCol) {
						scene.shapes[selectedShapeId].vertexPosition[iRow-1][cellname] = parseFloat(value);
						
						refreshScene();
					},
					
					//showing buttons
					gridComplete: function() {
						//add/remove buttons
						$("table#vertices").append('<tr><td colspan="5"><a class="button-small remove" href="javascript:void"></a><a href="javascript:void" class="button-small add"></a></td></tr>');
						
						$('div#vertices-panel .add').show();
						$('div#vertices-panel .remove').show();
						
						var ids = $("table#vertices").getDataIDs(); 
						for(var i=0;i<ids.length;i++){ 
							var old = $("table#vertices").jqGrid('getRowData', ids[i]);
							
							be = '<div class="up ' + ids[i] + '" title="up"></div><div class="down ' + ids[i] + '" title="down"></div>'; 
		
							$("table#vertices").jqGrid('setRowData',ids[i], {x:old.x, y:old.y, z:old.z, a:be}) 
							$("table#vertices").jqGrid('setLabel', 'a', ' ');
						}
						
						initPropertiesEvents();
					}
				});
			}
		}
	}
}

function getAnimations(tweens) {
	var animationsToAdd = new Array();

	for(var j = 0; j < tweens.length; j++) {
		if($(tweens[j]).prop("tagName") == 'tween') {
			var tempStart = $(tweens[j]).attr('start');
			var tempEnd = $(tweens[j]).attr('end');
			var tempType = $(tweens[j]).attr('type');
			var added = false;
					
			switch($(tweens[j]).attr('property')) {
				case 'x':
					for(var k = 0; k < animationsToAdd.length; k++) {
						if(animationsToAdd[k].property == 'position' && animationsToAdd[k].startFrame == tempStart && animationsToAdd[k].endFrame == tempEnd && animationsToAdd[k].type == tempType) {
							animationsToAdd[k].vector[0] = parseFloat($(tweens[j]).attr('to')) - parseFloat($(tweens[j]).attr('from'));
							added = true;
						}
					}
					
					if(added == false) {
						animationsToAdd.push({
							property: 'position',
							type: $(tweens[j]).attr('type'),
							startFrame: $(tweens[j]).attr('start'),
							endFrame: $(tweens[j]).attr('end'),
							vector: [parseFloat($(tweens[j]).attr('to')) - parseFloat($(tweens[j]).attr('from')), 0, 0]
						});
					}
					break;
				case 'y':
					for(var k = 0; k < animationsToAdd.length; k++) {
						if(animationsToAdd[k].property == 'position' && animationsToAdd[k].startFrame == tempStart && animationsToAdd[k].endFrame == tempEnd && animationsToAdd[k].type == tempType) {
							animationsToAdd[k].vector[1] = parseFloat($(tweens[j]).attr('to')) - parseFloat($(tweens[j]).attr('from'));
							added = true;
						}
					}
					
					if(added == false) {
						animationsToAdd.push({
							property: 'position',
							type: $(tweens[j]).attr('type'),
							startFrame: $(tweens[j]).attr('start'),
							endFrame: $(tweens[j]).attr('end'),
							vector: [0, parseFloat($(tweens[j]).attr('to')) - parseFloat($(tweens[j]).attr('from')), 0]
						});
					}
					break;
				case 'z':
					for(var k = 0; k < animationsToAdd.length; k++) {
						if(animationsToAdd[k].property == 'position' && animationsToAdd[k].startFrame == tempStart && animationsToAdd[k].endFrame == tempEnd && animationsToAdd[k].type == tempType) {
							animationsToAdd[k].vector[2] = parseFloat($(tweens[j]).attr('to')) - parseFloat($(tweens[j]).attr('from'));
							added = true;
						}
					}
					
					if(added == false) {
						animationsToAdd.push({
							property: 'position',
							type: $(tweens[j]).attr('type'),
							startFrame: $(tweens[j]).attr('start'),
							endFrame: $(tweens[j]).attr('end'),
							vector: [0, 0, parseFloat($(tweens[j]).attr('to')) - parseFloat($(tweens[j]).attr('from'))]
						});
					}
					break;
				case 'ared':
					for(var k = 0; k < animationsToAdd.length; k++) {
						if(animationsToAdd[k].property == 'ambient color' && animationsToAdd[k].startFrame == tempStart && animationsToAdd[k].endFrame == tempEnd && animationsToAdd[k].type == tempType) {
							animationsToAdd[k].toColor.r = parseFloat($(tweens[j]).attr('to'));
							added = true;
						}
					}
					
					if(added == false) {
						animationsToAdd.push({
							property: 'ambient color',
							type: $(tweens[j]).attr('type'),
							startFrame: $(tweens[j]).attr('start'),
							endFrame: $(tweens[j]).attr('end'),
							toColor: {r: parseFloat($(tweens[j]).attr('to'))}
						});
					}
					break;
				case 'agreen':
					for(var k = 0; k < animationsToAdd.length; k++) {
						if(animationsToAdd[k].property == 'ambient color' && animationsToAdd[k].startFrame == tempStart && animationsToAdd[k].endFrame == tempEnd && animationsToAdd[k].type == tempType) {
							animationsToAdd[k].toColor.g = parseFloat($(tweens[j]).attr('to'));
							added = true;
						}
					}
					
					if(added == false) {
						animationsToAdd.push({
							property: 'ambient color',
							type: $(tweens[j]).attr('type'),
							startFrame: $(tweens[j]).attr('start'),
							endFrame: $(tweens[j]).attr('end'),
							toColor: {g: parseFloat($(tweens[j]).attr('to'))}
						});
					}
					break;
				case 'ablue':
					for(var k = 0; k < animationsToAdd.length; k++) {
						if(animationsToAdd[k].property == 'ambient color' && animationsToAdd[k].startFrame == tempStart && animationsToAdd[k].endFrame == tempEnd && animationsToAdd[k].type == tempType) {
							animationsToAdd[k].toColor.b = parseFloat($(tweens[j]).attr('to'));
							added = true;
						}
					}
					
					if(added == false) {
						animationsToAdd.push({
							property: 'ambient color',
							type: $(tweens[j]).attr('type'),
							startFrame: $(tweens[j]).attr('start'),
							endFrame: $(tweens[j]).attr('end'),
							toColor: {b: parseFloat($(tweens[j]).attr('to'))}
						});
					}
					break;
				case 'sred':
					for(var k = 0; k < animationsToAdd.length; k++) {
						if(animationsToAdd[k].property == 'specular color' && animationsToAdd[k].startFrame == tempStart && animationsToAdd[k].endFrame == tempEnd && animationsToAdd[k].type == tempType) {
							animationsToAdd[k].toColor.r = parseFloat($(tweens[j]).attr('to'));
							added = true;
						}
					}
					
					if(added == false) {
						animationsToAdd.push({
							property: 'specular color',
							type: $(tweens[j]).attr('type'),
							startFrame: $(tweens[j]).attr('start'),
							endFrame: $(tweens[j]).attr('end'),
							toColor: {r: parseFloat($(tweens[j]).attr('to'))}
						});
					}
					break;
				case 'sgreen':
					for(var k = 0; k < animationsToAdd.length; k++) {
						if(animationsToAdd[k].property == 'specular color' && animationsToAdd[k].startFrame == tempStart && animationsToAdd[k].endFrame == tempEnd && animationsToAdd[k].type == tempType) {
							animationsToAdd[k].toColor.g = parseFloat($(tweens[j]).attr('to'));
							added = true;
						}
					}
					
					if(added == false) {
						animationsToAdd.push({
							property: 'specular color',
							type: $(tweens[j]).attr('type'),
							startFrame: $(tweens[j]).attr('start'),
							endFrame: $(tweens[j]).attr('end'),
							toColor: {g: parseFloat($(tweens[j]).attr('to'))}
						});
					}
					break;
				case 'sblue':
					for(var k = 0; k < animationsToAdd.length; k++) {
						if(animationsToAdd[k].property == 'specular color' && animationsToAdd[k].startFrame == tempStart && animationsToAdd[k].endFrame == tempEnd && animationsToAdd[k].type == tempType) {
							animationsToAdd[k].toColor.b = parseFloat($(tweens[j]).attr('to'));
							added = true;
						}
					}
					
					if(added == false) {
						animationsToAdd.push({
							property: 'specular color',
							type: $(tweens[j]).attr('type'),
							startFrame: $(tweens[j]).attr('start'),
							endFrame: $(tweens[j]).attr('end'),
							toColor: {b: parseFloat($(tweens[j]).attr('to'))}
						});
					}
					break;
				case 'dred':
					for(var k = 0; k < animationsToAdd.length; k++) {
						if(animationsToAdd[k].property == 'diffuse color' && animationsToAdd[k].startFrame == tempStart && animationsToAdd[k].endFrame == tempEnd && animationsToAdd[k].type == tempType) {
							animationsToAdd[k].toColor.r = parseFloat($(tweens[j]).attr('to'));
							added = true;
						}
					}
					
					if(added == false) {
						animationsToAdd.push({
							property: 'diffuse color',
							type: $(tweens[j]).attr('type'),
							startFrame: $(tweens[j]).attr('start'),
							endFrame: $(tweens[j]).attr('end'),
							toColor: {r: parseFloat($(tweens[j]).attr('to'))}
						});
					}
					break;
				case 'dgreen':
					for(var k = 0; k < animationsToAdd.length; k++) {
						if(animationsToAdd[k].property == 'diffuse color' && animationsToAdd[k].startFrame == tempStart && animationsToAdd[k].endFrame == tempEnd && animationsToAdd[k].type == tempType) {
							animationsToAdd[k].toColor.g = parseFloat($(tweens[j]).attr('to'));
							added = true;
						}
					}
					
					if(added == false) {
						animationsToAdd.push({
							property: 'diffuse color',
							type: $(tweens[j]).attr('type'),
							startFrame: $(tweens[j]).attr('start'),
							endFrame: $(tweens[j]).attr('end'),
							toColor: {g: parseFloat($(tweens[j]).attr('to'))}
						});
					}
					break;
				case 'dblue':
					for(var k = 0; k < animationsToAdd.length; k++) {
						if(animationsToAdd[k].property == 'diffuse color' && animationsToAdd[k].startFrame == tempStart && animationsToAdd[k].endFrame == tempEnd && animationsToAdd[k].type == tempType) {
							animationsToAdd[k].toColor.b = parseFloat($(tweens[j]).attr('to'));
							added = true;
						}
					}
					
					if(added == false) {
						animationsToAdd.push({
							property: 'diffuse color',
							type: $(tweens[j]).attr('type'),
							startFrame: $(tweens[j]).attr('start'),
							endFrame: $(tweens[j]).attr('end'),
							toColor: {b: parseFloat($(tweens[j]).attr('to'))}
						});
					}
					break;
			}
		}
	}
	
	return animationsToAdd;
}

function parseSceneXML(id, name, xml) {
	xmlDocument = $.parseXML(xml),
	$xml = $( xmlDocument ),
	$sceneElement = $xml.find("scene");
	
	//cleaning scene
	selectedShapeId = -1;
	scene.shapes.length = 0;
	
	//setting scene properties
	scene.name = name;
	scene.id = id;
	
	$('.export-dialog #download-animation').attr('href', locationURL + 'db_connector.php?mode=5&id=' + scene.id);
	
	scene.frames = $sceneElement.attr('frames');
	if($sceneElement.attr('fps') != "") scene.fps = $sceneElement.attr('fps');
	scene.height = $sceneElement.attr('h');
	scene.width = $sceneElement.attr('w');
	scene.depth = $sceneElement.attr('d');
	scene.resx = $sceneElement.attr('width');
	scene.resy = $sceneElement.attr('height');
	
	scene.glcolor.r = $sceneElement.attr('glred');
	scene.glcolor.g = $sceneElement.attr('glgreen');
	scene.glcolor.b = $sceneElement.attr('glblue');
	
	scene.bcolor.r = $sceneElement.attr('bred');
	scene.bcolor.g = $sceneElement.attr('bgreen');
	scene.bcolor.b = $sceneElement.attr('bblue');
	
	var sceneChildren = $sceneElement.children();
	
	//trzeba dodac do schemy atrybut uniqShapeId, tak zeby triangle wrzucic do jego shape'a
	
	var shapeTriangles = new Array();
	
	for(var i = 0; i < sceneChildren.length; i++) {
		var shapeId = -1;
		switch($(sceneChildren[i]).prop("tagName")) {
			case 'camera':
				break;
			case 'light':
				tempAColor = new Object();
				tempAColor.r = $(sceneChildren[i]).attr('ared');
				tempAColor.g = $(sceneChildren[i]).attr('agreen');
				tempAColor.b = $(sceneChildren[i]).attr('ablue');
				
				tempSColor = new Object();
				tempSColor.r = $(sceneChildren[i]).attr('sred');
				tempSColor.g = $(sceneChildren[i]).attr('sgreen');
				tempSColor.b = $(sceneChildren[i]).attr('sblue');
				
				tempDColor = new Object();
				tempDColor.r = $(sceneChildren[i]).attr('dred');
				tempDColor.g = $(sceneChildren[i]).attr('dgreen');
				tempDColor.b = $(sceneChildren[i]).attr('dblue');
				
				var tweens = $(sceneChildren[i]).children();
				var animationsToAdd = new Array();
				animationsToAdd = getAnimations(tweens);
			
				shapeId = addLight({
					name: $(sceneChildren[i]).attr('id'),
					x: parseFloat($(sceneChildren[i]).attr('x')),
					y: parseFloat($(sceneChildren[i]).attr('y')),
					z: parseFloat($(sceneChildren[i]).attr('z')),
					r: parseFloat($(sceneChildren[i]).attr('r')),
					acolor: tempAColor,
					scolor: tempSColor,
					dcolor: tempDColor,
					animations: animationsToAdd
				});
				
				//console.log("Importing light{name: " + $(sceneChildren[i]).attr('id') + ", x: " + $(sceneChildren[i]).attr('y') + ", z: " + $(sceneChildren[i]).attr('z') + ", r: " + $(sceneChildren[i]).attr('r') + "}");
				
				break;
			case 'sphere':
				tempAColor = new Object();
				tempAColor.r = $(sceneChildren[i]).attr('ared');
				tempAColor.g = $(sceneChildren[i]).attr('agreen');
				tempAColor.b = $(sceneChildren[i]).attr('ablue');
				
				tempSColor = new Object();
				tempSColor.r = $(sceneChildren[i]).attr('sred');
				tempSColor.g = $(sceneChildren[i]).attr('sgreen');
				tempSColor.b = $(sceneChildren[i]).attr('sblue');
				
				tempDColor = new Object();
				tempDColor.r = $(sceneChildren[i]).attr('dred');
				tempDColor.g = $(sceneChildren[i]).attr('dgreen');
				tempDColor.b = $(sceneChildren[i]).attr('dblue');
				
				var tweens = $(sceneChildren[i]).children();
				var animationsToAdd = new Array();
				animationsToAdd = getAnimations(tweens);
			
				shapeId = addSphere({
					name: $(sceneChildren[i]).attr('id'),
					x: parseFloat($(sceneChildren[i]).attr('x')),
					y: parseFloat($(sceneChildren[i]).attr('y')),
					z: parseFloat($(sceneChildren[i]).attr('z')),
					r: parseFloat($(sceneChildren[i]).attr('r')),
					n: parseFloat($(sceneChildren[i]).attr('n')),
					acolor: tempAColor,
					scolor: tempSColor,
					dcolor: tempDColor,
					animations: animationsToAdd
				});
				
				//console.log("Importing sphere{name: " + $(sceneChildren[i]).attr('id') + ", x: " + $(sceneChildren[i]).attr('x') + ", y: " + $(sceneChildren[i]).attr('y') + ", z: " + $(sceneChildren[i]).attr('z') + ", r: " + $(sceneChildren[i]).attr('r') + "}");
				break;
			case 'triangle':
				tempAColor = new Object();
				tempAColor.r = $(sceneChildren[i]).attr('ared');
				tempAColor.g = $(sceneChildren[i]).attr('agreen');
				tempAColor.b = $(sceneChildren[i]).attr('ablue');
				
				tempSColor = new Object();
				tempSColor.r = $(sceneChildren[i]).attr('sred');
				tempSColor.g = $(sceneChildren[i]).attr('sgreen');
				tempSColor.b = $(sceneChildren[i]).attr('sblue');
				
				tempDColor = new Object();
				tempDColor.r = $(sceneChildren[i]).attr('dred');
				tempDColor.g = $(sceneChildren[i]).attr('dgreen');
				tempDColor.b = $(sceneChildren[i]).attr('dblue');
			
				var added = false;
				for(var j = 0; j < shapeTriangles.length; j++) {
					if(shapeTriangles[j].uniqShapeId == $(sceneChildren[i]).attr('uniqshapeid')) {
						shapeTriangles[j].vertices.push({x: parseFloat($(sceneChildren[i]).attr('x')), y: parseFloat($(sceneChildren[i]).attr('y')), z: parseFloat($(sceneChildren[i]).attr('z'))});
						shapeTriangles[j].vertices.push({x: parseFloat($(sceneChildren[i]).attr('x1')), y: parseFloat($(sceneChildren[i]).attr('y1')), z: parseFloat($(sceneChildren[i]).attr('z1'))}); 
						shapeTriangles[j].vertices.push({x: parseFloat($(sceneChildren[i]).attr('x2')), y: parseFloat($(sceneChildren[i]).attr('y2')), z: parseFloat($(sceneChildren[i]).attr('z2'))}); 
						
						added = true; 
					}
				}
				if(added == false) {
					var temp = new Object();
					
					temp.name = $(sceneChildren[i]).attr('id');
					
					temp.n = parseFloat($(sceneChildren[i]).attr('n'));
					temp.acolor = tempAColor;
					temp.scolor = tempSColor;
					temp.dcolor = tempDColor;
					
					temp.animations = new Array();
					
					var tweens = $(sceneChildren[i]).children();
					var animationsToAdd = new Array();
					animationsToAdd = getAnimations(tweens);
					
					temp.animations = animationsToAdd;
					
					temp.vertices = new Array();
					
					temp.vertices.push({x: parseFloat($(sceneChildren[i]).attr('x')), y: parseFloat($(sceneChildren[i]).attr('y')), z: parseFloat($(sceneChildren[i]).attr('z'))});
					temp.vertices.push({x: parseFloat($(sceneChildren[i]).attr('x1')), y: parseFloat($(sceneChildren[i]).attr('y1')), z: parseFloat($(sceneChildren[i]).attr('z1'))}); 
					temp.vertices.push({x: parseFloat($(sceneChildren[i]).attr('x2')), y: parseFloat($(sceneChildren[i]).attr('y2')), z: parseFloat($(sceneChildren[i]).attr('z2'))}); 
					
					temp.uniqShapeId = $(sceneChildren[i]).attr('uniqshapeid');
					shapeTriangles.push(temp);
				}
				
				break;	
		}
	}
	
	//adding complex shapes
	for(var i = 0; i < shapeTriangles.length; i++) {
		addComplex({
			name: shapeTriangles[i].name,
			n: shapeTriangles[i].n,
			acolor: shapeTriangles[i].acolor,
			scolor: shapeTriangles[i].scolor,
			dcolor: shapeTriangles[i].dcolor,
			vertices: shapeTriangles[i].vertices,
			animations: shapeTriangles[i].animations
		});
	}
}

function initImport() {
	//getting scenes
	$("#import-database-panel #scenes-list").jqGrid({
		caption: 'Scenes in database',
		datatype: 'json',
		url: locationURL + 'db_connector.php?mode=2',
		jsonReader: {
			repeatitems: false,
			id: '0',
		},
		rowNum: 10000,
		mtype: 'GET',
		viewrecords: true,
		gridview: true,
		colNames: ['id', 'name', 'frames', 'done frames', 'status', 'created'],
		colModel: [ {name: 'id', index: 'id', editable: false, sortable: false, width: 50},
		{name: 'name', index: 'name', editable: false, sortable: false},
		{name: 'total_frames', index: 'total_frames', editable: false, sortable: false, width: 110},
		{name: 'done_frames', index: 'done_frames', editable: false, sortable: false, width: 110},
		{name: 'status', index: 'status', editable: false, sortable: false, width: 60},
		{name: 'created_at', index: 'created_at', editable: false, sortable: false}],
		width: 490,
		height: 140
	});
	
	$("#import-database-panel a.button-small.import").click(function() {
		var selRow = $("#import-database-panel #scenes-list").jqGrid('getGridParam', 'selrow');
		var sceneName = $("#import-database-panel #scenes-list").getCell(selRow, 'name');
		var sceneId = $("#import-database-panel #scenes-list").getCell(selRow, 'id');
	
		//downloading selected scene xml
		$.ajax({
			type: 'POST',
			url: locationURL + 'db_connector.php?mode=3',
			data: {id: selRow},
			dataType: 'text',
			success: function(data) {
				//interpreting xml and adding elements to scene
				parseSceneXML(sceneId, sceneName, data);
				//refreshing scene
				refreshScene();
				refreshProperties();
				refreshTimeline();
			}
		});
	});
}


function initPropertiesEvents() {
	//vertices grid buttons events
	$('table#vertices .add').click(function() {
		var newVertex = scene.shapes[selectedShapeId].vertexPosition.length;
		
		scene.shapes[selectedShapeId].vertexPosition[newVertex] = {x: 0, y: 0, z: 0};
		
		refreshProperties();
		
		$('table#vertices').jqGrid('editRow', newVertex+1, {keys:true, url: 'clientArray', aftersavefunc:function() {
			scene.shapes[selectedShapeId].vertexPosition[newVertex] = $('table#vertices').getRowData(newVertex+1);
			refreshScene();
		}});
	});
		
	$('table#vertices .remove').click(function() {
		var rowids = $('table#vertices').jqGrid('getGridParam', 'selarrrow');
		
		//workaround for jqgrid error - when clicking on select all rows check box, arrrow.length = checked_boxes+1
		//counting those not empty
		var selectedCount = 0;
		for(i = 0; i < rowids.length; i++) {
			if(rowids[i] != '') selectedCount++;
		}
		
		if(($('table#vertices').getDataIDs().length - selectedCount)%3 != 0) {
			alert("Number of vertices isn't divisible by 3!");
		} else {
			for(i = rowids.length-1; i >= 0; i--) {
				if(rowids[i] != '') {
					scene.shapes[selectedShapeId].vertexPosition.splice(rowids[i]-1, 1);
				}
			}
		}
		
		refreshProperties();
		refreshScene();
	});
	
	$('table#vertices .up').click(function() {
		var rowid;
		
		var classes = $(this).attr('class').split(/\s+/);
		for(i = 0; i < classes.length; i++) {
			if($.isNumeric(classes[i])) {
				rowid = classes[i];
			}
		}
			
		if(rowid != 1) {
			
			//minus 2, index + previous
			var tmpUp = scene.shapes[selectedShapeId].vertexPosition[rowid-2];
			scene.shapes[selectedShapeId].vertexPosition[rowid-2] = scene.shapes[selectedShapeId].vertexPosition[rowid-1];
			scene.shapes[selectedShapeId].vertexPosition[rowid-1] = tmpUp;
			
			refreshProperties();
			refreshScene();
		}
	});
	
	$('table#vertices .down').click(function() {
		var rowid;
		
		var classes = $(this).attr('class').split(/\s+/);
		for(i = 0; i < classes.length; i++) {
			if($.isNumeric(classes[i])) {
				rowid = classes[i];
			}
		}
			
		if(rowid != scene.shapes[selectedShapeId].vertexPosition.length) {
			var tmpDown = scene.shapes[selectedShapeId].vertexPosition[rowid];
			scene.shapes[selectedShapeId].vertexPosition[rowid] = scene.shapes[selectedShapeId].vertexPosition[rowid-1];
			scene.shapes[selectedShapeId].vertexPosition[rowid-1] = tmpDown;
			
			refreshProperties();
			refreshScene();
		}
	});
}

function initProperties() {
	refreshProperties();
}

var selectedAnimationId = -1;

function refreshAnimation() {
	if(selectedShapeId != -1) {
		$("table#animations").jqGrid('GridDestroy');
		
		$('.panel#animation-list').html('<table id="animations"></table>' +
					'<a class="button-small play" href="javascript:void" title="Play animation from current frame">Play</a>' +
					'<a class="button-small remove" href="javascript:void" title="Remove animation">Remove</a>' +
					'<a class="button-small add" href="javascript:void" title="Add animation">Add</a>' +
					'<div class="clear"></div>');
					
		initAnimationGridEvents();
 	
		$("table#animations").jqGrid({
				caption: 'Shape animations',
				datatype: 'local',
				multiselect: false,
				cellsubmit: 'clientArray',
				url: 'clientArray',
				cellEdit: true,
				loadonce: false,
				rowNum: 999999,
				colNames: ['property', 'start', 'end'],
				colModel: [{name: 'property', index: 'property', editable: false, sortable: false, classes: 'property', width: 101},
				{name: 'startFrame', index: 'start', editable: false, sortable: false, width: 38},
				{name: 'endFrame', index: 'end', editable: false, sortable: false, width: 38}],
				data: scene.shapes[selectedShapeId].animations,
				width: 177,
				height: 'auto',
				
				onCellSelect: function(rowid) {
					selectedAnimationId = rowid-1;
					refreshAnimationData();
					
					$("table#animations tr#" + (selectedAnimationId+1)).addClass('selected-row');
				},
				
				gridComplete: function() {
					if(selectedAnimationId != -1) {
						$("table#animations tr#" + (selectedAnimationId+1) + " td.property").click();
					}
				}
		});
	} else {
		$("table#animations").jqGrid('GridDestroy');
	
		$(".panel#animation-data").hide();
		if(!$(".panel#animation-list").hasClass('last')) {
			$(".panel#animation-list").addClass('last');
		}
		
		$('.panel#animation-list .button-small.add').hide();
		$('.panel#animation-list .button-small.remove').hide();
	}
}

function refreshAnimationData() {
	$(".panel#animation-data table tr").hide();

	if(selectedShapeId != -1) {
		if($(".panel#animation-list").hasClass('last')) {
			$(".panel#animation-list").removeClass('last');
		}
		
		$(".panel#animation-data").show();
		
		switch(scene.shapes[selectedShapeId].animations[selectedAnimationId].property) {
			case 'position':
				//property
				$(".panel#animation-data table tr.property").show();
				$(".panel#animation-data .property.dropdown div a.arrow-down").html('position');
				
				//start-frame
				$(".panel#animation-data table tr.start-frame").show();
				$("#start-frame-input").val(scene.shapes[selectedShapeId].animations[selectedAnimationId].startFrame);
				
				//end-frame
				$(".panel#animation-data table tr.end-frame").show();
				$("#end-frame-input").val(scene.shapes[selectedShapeId].animations[selectedAnimationId].endFrame);
				
				//vector
				$(".panel#animation-data table tr.vector").show();
				$(".panel#animation-data table tr.vector input#vector-x").val(scene.shapes[selectedShapeId].animations[selectedAnimationId].vector[0]);
				$(".panel#animation-data table tr.vector input#vector-y").val(scene.shapes[selectedShapeId].animations[selectedAnimationId].vector[1]);
				$(".panel#animation-data table tr.vector input#vector-z").val(scene.shapes[selectedShapeId].animations[selectedAnimationId].vector[2]);
				
				refreshDropdown();
				
				break;
				
			case 'ambient color':
				//property
				$(".panel#animation-data table tr.property").show();
				$(".panel#animation-data .property.dropdown div a.arrow-down").html('ambient color');
				
				//start-frame
				$(".panel#animation-data table tr.start-frame").show();
				$("#start-frame-input").val(scene.shapes[selectedShapeId].animations[selectedAnimationId].startFrame);
				
				//end-frame
				$(".panel#animation-data table tr.end-frame").show();
				$("#end-frame-input").val(scene.shapes[selectedShapeId].animations[selectedAnimationId].endFrame);
				
				//acolor
				$(".panel#animation-data table tr.acolor").show();
				
				//set from color
				var fromColor = scene.shapes[selectedShapeId].acolor;
				var maxEndFrame = 0;
				for(i = 0; i < scene.shapes[selectedShapeId].animations.length; i++) {
					if(scene.shapes[selectedShapeId].animations[i].property == 'ambient color' && scene.shapes[selectedShapeId].animations[i].endFrame < scene.shapes[selectedShapeId].animations[selectedAnimationId].startFrame) {
						if(scene.shapes[selectedShapeId].animations[i].endFrame > maxEndFrame) {
							maxEndFrame = scene.shapes[selectedShapeId].animations[i].endFrame;
							fromColor = scene.shapes[selectedShapeId].animations[i].toColor;
						}
					}
				}
				
				scene.shapes[selectedShapeId].animations[selectedAnimationId].fromColor = fromColor;
				
				$(".panel#animation-data table tr.acolor.from div.sample").css('backgroundColor', 'rgb(' + parseInt(fromColor.r*255) + ', ' + parseInt(fromColor.g*255) + ', ' + parseInt(fromColor.b*255) + ')');
							
				if(scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor == null) {
					scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor = new Object();
					scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.r = fromColor.r;
					scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.g = fromColor.g;
					scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.b = fromColor.b;
				}					
				
				refreshAnimationToColors();
				//refreshDropdown();
				break;
				
			case 'specular color':
				//property
				$(".panel#animation-data table tr.property").show();
				$(".panel#animation-data .property.dropdown div a.arrow-down").html('specular color');
				
				//start-frame
				$(".panel#animation-data table tr.start-frame").show();
				$("#start-frame-input").val(scene.shapes[selectedShapeId].animations[selectedAnimationId].startFrame);
				
				//end-frame
				$(".panel#animation-data table tr.end-frame").show();
				$("#end-frame-input").val(scene.shapes[selectedShapeId].animations[selectedAnimationId].endFrame);
				
				//scolor
				$(".panel#animation-data table tr.scolor").show();
				
				//set from color
				var fromColor = scene.shapes[selectedShapeId].scolor;
				var maxEndFrame = 0;
				for(i = 0; i < scene.shapes[selectedShapeId].animations.length; i++) {
					if(scene.shapes[selectedShapeId].animations[i].property == 'specular color' && scene.shapes[selectedShapeId].animations[i].endFrame < scene.shapes[selectedShapeId].animations[selectedAnimationId].startFrame) {
						if(scene.shapes[selectedShapeId].animations[i].endFrame > maxEndFrame) {
							maxEndFrame = scene.shapes[selectedShapeId].animations[i].endFrame;
							fromColor = scene.shapes[selectedShapeId].animations[i].toColor;
						}
					}
				}
				
				$(".panel#animation-data table tr.scolor.from div.sample").css('backgroundColor', 'rgb(' + parseInt(fromColor.r*255) + ', ' + parseInt(fromColor.g*255) + ', ' + parseInt(fromColor.b*255) + ')');
							
				if(scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor == null) {
					scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor = new Object();
					scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.r = fromColor.r;
					scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.g = fromColor.g;
					scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.b = fromColor.b;
				}					
				
				refreshAnimationToColors();
				//refreshDropdown();
				break;
				
			case 'diffuse color':
				//property
				$(".panel#animation-data table tr.property").show();
				$(".panel#animation-data .property.dropdown div a.arrow-down").html('diffuse color');
				
				//start-frame
				$(".panel#animation-data table tr.start-frame").show();
				$("#start-frame-input").val(scene.shapes[selectedShapeId].animations[selectedAnimationId].startFrame);
				
				//end-frame
				$(".panel#animation-data table tr.end-frame").show();
				$("#end-frame-input").val(scene.shapes[selectedShapeId].animations[selectedAnimationId].endFrame);
				
				//dcolor
				$(".panel#animation-data table tr.dcolor").show();
				
				//set from color
				var fromColor = scene.shapes[selectedShapeId].dcolor;
				var maxEndFrame = 0;
				for(i = 0; i < scene.shapes[selectedShapeId].animations.length; i++) {
					if(scene.shapes[selectedShapeId].animations[i].property == 'diffuse color' && scene.shapes[selectedShapeId].animations[i].endFrame < scene.shapes[selectedShapeId].animations[selectedAnimationId].startFrame) {
						if(scene.shapes[selectedShapeId].animations[i].endFrame > maxEndFrame) {
							maxEndFrame = scene.shapes[selectedShapeId].animations[i].endFrame;
							fromColor = scene.shapes[selectedShapeId].animations[i].toColor;
						}
					}
				}
				
				scene.shapes[selectedShapeId].animations[selectedAnimationId].fromColor = fromColor;
				
				$(".panel#animation-data table tr.dcolor.from div.sample").css('backgroundColor', 'rgb(' + parseInt(fromColor.r*255) + ', ' + parseInt(fromColor.g*255) + ', ' + parseInt(fromColor.b*255) + ')');
							
				if(scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor == null) {
					scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor = new Object();
					scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.r = fromColor.r;
					scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.g = fromColor.g;
					scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.b = fromColor.b;
				}					
				
				refreshAnimationToColors();
				//refreshDropdown();
				break;
		}
	}
}

function refreshAnimationToColors() {
	var toColor = scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor;

	//ambient
	$(".panel#animation-data table tr.acolor.to div.sample").css('backgroundColor', 'rgb(' + parseInt(toColor.r*255) + ', ' + parseInt(toColor.g*255) + ', ' + parseInt(toColor.b*255) + ')');
	
	//specular
	$(".panel#animation-data table tr.scolor.to div.sample").css('backgroundColor', 'rgb(' + parseInt(toColor.r*255) + ', ' + parseInt(toColor.g*255) + ', ' + parseInt(toColor.b*255) + ')');
	
	//diffuse
	$(".panel#animation-data table tr.dcolor.to div.sample").css('backgroundColor', 'rgb(' + parseInt(toColor.r*255) + ', ' + parseInt(toColor.g*255) + ', ' + parseInt(toColor.b*255) + ')');
}

function initAnimationEvents() {
	$(".panel#animation-data input").keydown(function(event) {
		if(event.which == 13) {
			switch(scene.shapes[selectedShapeId].animations[selectedAnimationId].property) {
				case 'position':
					scene.shapes[selectedShapeId].animations[selectedAnimationId].startFrame = $("#start-frame-input").val();
					scene.shapes[selectedShapeId].animations[selectedAnimationId].endFrame = $("#end-frame-input").val();
					scene.shapes[selectedShapeId].animations[selectedAnimationId].vector[0] = $("#vector-x").val();
					scene.shapes[selectedShapeId].animations[selectedAnimationId].vector[1] = $("#vector-y").val();
					scene.shapes[selectedShapeId].animations[selectedAnimationId].vector[2] = $("#vector-z").val();
					
					break;
					
				case 'ambient color':
				case 'specular color':
				case 'diffuse color':
					scene.shapes[selectedShapeId].animations[selectedAnimationId].startFrame = $("#start-frame-input").val();
					scene.shapes[selectedShapeId].animations[selectedAnimationId].endFrame = $("#end-frame-input").val();
					
					break;
			}
			
			refreshAnimation();
			refreshTimeline();
		}
	});
	
	$('.panel#animation-data .property.dropdown ul li').click(function() {
		var chosenProperty = $(this).children('a').html();
	
		scene.shapes[selectedShapeId].animations[selectedAnimationId].property = chosenProperty;
		
		refreshAnimation();
	});
	
	//animation ambient color picker
	$('a#set-animation-acolor').click(function() {
		$('.tools#color-dialog').dialog({
			dialogClass: 'color-dialog',
			autoOpen: true,
			width: 'auto',
			height: 'auto',
			minHeight: 0,
			resizable: false,
			autoResize: true,
			position: [$(document).width()/2-100, 300],
			buttons: {
			},
			open: function() {
				$('.tools#color-dialog').html('Shape animation ambient color');				
				$('.tools#color-dialog').ColorPicker({
					flat: true,
					color: {r: scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.r*255, g: scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.g*255, b: scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.b*255},
					onChange: function(hsb, hex, rgb) {
						scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.r = rgb.r/255;
						scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.g = rgb.g/255;
						scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.b = rgb.b/255;
						
						refreshAnimationToColors();
						
						//console.log("shape acolor onchange: " + scene.shapes[selectedShapeId].acolor.r*255 + " " + scene.shapes[selectedShapeId].acolor.g*255 + " " + scene.shapes[selectedShapeId].acolor.b*255);
						//console.log("shape animation acolor onchange: " + scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.r*255 + " " + scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.g*255 + " " + scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.b*255);
					}
				});
			},
			close: function() {
				$('.tools#color-dialog .colorpicker').remove();
				$('.tools#color-dialog').removeData('colorpickerId');
				//console.log("shape acolor onclose: " + scene.shapes[selectedShapeId].acolor.r*255 + " " + scene.shapes[selectedShapeId].acolor.g*255 + " " + scene.shapes[selectedShapeId].acolor.b*255);
				//console.log("shape animation acolor onclose: " + scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.r*255 + " " + scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.g*255 + " " + scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.b*255);
			}
		});
	});
	
	//animation specular color picker
	$('a#set-animation-scolor').click(function() {
		$('.tools#color-dialog').dialog({
			dialogClass: 'color-dialog',
			autoOpen: true,
			width: 'auto',
			height: 'auto',
			minHeight: 0,
			resizable: false,
			autoResize: true,
			position: [$(document).width()/2-100, 300],
			buttons: {
			},
			open: function() {
				$('.tools#color-dialog').html('Shape animation specular color');				
				$('.tools#color-dialog').ColorPicker({
					flat: true,
					color: {r: scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.r*255, g: scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.g*255, b: scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.b*255},
					onChange: function(hsb, hex, rgb) {
						scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.r = rgb.r/255;
						scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.g = rgb.g/255;
						scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.b = rgb.b/255;
						
						refreshAnimationToColors();
						
						//console.log("shape acolor onchange: " + scene.shapes[selectedShapeId].acolor.r*255 + " " + scene.shapes[selectedShapeId].acolor.g*255 + " " + scene.shapes[selectedShapeId].acolor.b*255);
						//console.log("shape animation acolor onchange: " + scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.r*255 + " " + scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.g*255 + " " + scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.b*255);
					}
				});
			},
			close: function() {
				$('.tools#color-dialog .colorpicker').remove();
				$('.tools#color-dialog').removeData('colorpickerId');
				//console.log("shape acolor onclose: " + scene.shapes[selectedShapeId].acolor.r*255 + " " + scene.shapes[selectedShapeId].acolor.g*255 + " " + scene.shapes[selectedShapeId].acolor.b*255);
				//console.log("shape animation acolor onclose: " + scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.r*255 + " " + scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.g*255 + " " + scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.b*255);
			}
		});
	});
	
	//animation diffuse color picker
	$('a#set-animation-dcolor').click(function() {
		$('.tools#color-dialog').dialog({
			dialogClass: 'color-dialog',
			autoOpen: true,
			width: 'auto',
			height: 'auto',
			minHeight: 0,
			resizable: false,
			autoResize: true,
			position: [$(document).width()/2-100, 300],
			buttons: {
			},
			open: function() {
				$('.tools#color-dialog').html('Shape animation diffuse color');				
				$('.tools#color-dialog').ColorPicker({
					flat: true,
					color: {r: scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.r*255, g: scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.g*255, b: scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.b*255},
					onChange: function(hsb, hex, rgb) {
						scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.r = rgb.r/255;
						scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.g = rgb.g/255;
						scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.b = rgb.b/255;
						
						refreshAnimationToColors();
						
						//console.log("shape acolor onchange: " + scene.shapes[selectedShapeId].acolor.r*255 + " " + scene.shapes[selectedShapeId].acolor.g*255 + " " + scene.shapes[selectedShapeId].acolor.b*255);
						//console.log("shape animation acolor onchange: " + scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.r*255 + " " + scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.g*255 + " " + scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.b*255);
					}
				});
			},
			close: function() {
				$('.tools#color-dialog .colorpicker').remove();
				$('.tools#color-dialog').removeData('colorpickerId');
				//console.log("shape acolor onclose: " + scene.shapes[selectedShapeId].acolor.r*255 + " " + scene.shapes[selectedShapeId].acolor.g*255 + " " + scene.shapes[selectedShapeId].acolor.b*255);
				//console.log("shape animation acolor onclose: " + scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.r*255 + " " + scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.g*255 + " " + scene.shapes[selectedShapeId].animations[selectedAnimationId].toColor.b*255);
			}
		});
	});
}

function initAnimationGridEvents() {
	$('#animation-list a.button-small.play').click(function() {
		//set interval according to fps
		var t = 1000/scene.fps;
		
		var int = setInterval(function() {
			if(currentFrame < scene.frames) {
				refreshScene();
				
				if(currentFrame != scene.frames-1) {
					selectFrame(currentFrame+1);
				} else {
					clearInterval(int);
				}
			}
		}, t);
	});
	
	$('.panel#animation-list .add').click(function() {
		var newAnimation = scene.shapes[selectedShapeId].animations.length;
		
		scene.shapes[selectedShapeId].animations[newAnimation] = new Object();
		
		scene.shapes[selectedShapeId].animations[newAnimation].property = 'position';
		scene.shapes[selectedShapeId].animations[newAnimation].startFrame = 0;
		scene.shapes[selectedShapeId].animations[newAnimation].endFrame = 0;
		
		scene.shapes[selectedShapeId].animations[newAnimation].vector = new Array();
		
		scene.shapes[selectedShapeId].animations[newAnimation].vector[0] = 0;
		scene.shapes[selectedShapeId].animations[newAnimation].vector[1] = 0;
		scene.shapes[selectedShapeId].animations[newAnimation].vector[2] = 0;
		
		selectedAnimationId = newAnimation;
		
		refreshAnimation();
		//refreshTimeline();
	});
	
	$('.panel#animation-list .remove').click(function() {
		if(selectedShapeId != -1) {
			scene.shapes[selectedShapeId].animations.splice(selectedShapeId-1, 1);
		}
		
		refreshAnimation();
		refreshTimeline();
	});
}

function initAnimation() {
	initAnimationEvents();
	refreshAnimation();
}

function initExport() {
	$('.export-dialog a#export-database').click(function() {
	
		//generating xml file
		//checking if any light added
		var lightsNum = 0;
		for(i = 0; i < scene.shapes.length; i++) {
			if(scene.shapes[i].type == "light") {
				lightsNum++;
			}
		}
		
		//checking if any shapes added
		if(scene.shapes.length == 0 || scene.shapes.length == lightsNum) {
			alert("No shapes in scene!");
		} else if(lightsNum == 0) {
			alert("No light present in scene!");
		} else {
			var xml = '<?xml version="1.0"?><scene xmlns="http://www.w3.org/1999/xhtml"></scene>',
				xmlDocument = $.parseXML(xml),
				$xml = $( xmlDocument ),
				$sceneElement = $xml.find("scene");
				
			//setting scene attributes
			$sceneElement.attr('frames', scene.frames);
			$sceneElement.attr('fps', scene.fps);
			$sceneElement.attr('h', scene.height);
			$sceneElement.attr('w', scene.width);
			$sceneElement.attr('d', scene.depth);
			$sceneElement.attr('width', scene.resx);
			$sceneElement.attr('height', scene.resy);
			
			$sceneElement.attr('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
			$sceneElement.attr('xsi:noNamespaceSchemaLocation', 'scene.xsd');
			
			//scene colors
			$sceneElement.attr('glred', scene.glcolor.r);
			$sceneElement.attr('glgreen', scene.glcolor.g);
			$sceneElement.attr('glblue', scene.glcolor.b);
			$sceneElement.attr('bred', scene.bcolor.r);
			$sceneElement.attr('bgreen', scene.bcolor.g);
			$sceneElement.attr('bblue', scene.bcolor.b);
			
			//adding children
			$sceneElement.html('');
			
			//adding default camera
			$cameraElement = $('<camera/>');
			$sceneElement.append($cameraElement);
			$cameraElement.attr('id', 'camera1');
			$cameraElement.attr('x', '0');
			$cameraElement.attr('y', '0');
			
			//setting camera in current zoom
			$cameraElement.attr('z', -scene.zoomMatrix[2]);
			$cameraElement.attr('vx1', '1.0');
			$cameraElement.attr('vy1', '0');
			$cameraElement.attr('vz1', '0');
			$cameraElement.attr('vx2', '0');
			$cameraElement.attr('vy2', '1.0');
			$cameraElement.attr('vz2', '0');
			$cameraElement.attr('vx3', '0');
			$cameraElement.attr('vy3', '0');
			$cameraElement.attr('vz3', '1.0');
			
			//to do: adding some light
			//sample light, to do: adding custom light to scene feature
			/*$lightElement = $('<light/>');
			$sceneElement.append($lightElement);
			$lightElement.attr('id', 'light1');
			$lightElement.attr('r', '0.02');
			$lightElement.attr('x', '-3.0');
			$lightElement.attr('y', '12.0');
			$lightElement.attr('z', '25.0');

			$lightElement.attr('ared', '0.1');
			$lightElement.attr('agreen', '0.5');
			$lightElement.attr('ablue', '0.3');

			$lightElement.attr('sred', '0.2');
			$lightElement.attr('sgreen', '0.3');
			$lightElement.attr('sblue', '0.1');

			$lightElement.attr('dred', '0.1');
			$lightElement.attr('dgreen', '0.2');
			$lightElement.attr('dblue', '0.1');*/

			//ligtht2
			/*$light2Element = $('<light/>');
			$sceneElement.append($light2Element);
			$light2Element.attr('id', 'light2');
			$light2Element.attr('r', '0.02');
			$light2Element.attr('x', '-3.0');
			$light2Element.attr('y', '-14.0');
			$light2Element.attr('z', '35.0');

			$light2Element.attr('ared', '1.0');
			$light2Element.attr('agreen', '0.9');
			$light2Element.attr('ablue', '1.0');

			$light2Element.attr('sred', '1.0');
			$light2Element.attr('sgreen', '1.0');
			$light2Element.attr('sblue', '1.0');

			$light2Element.attr('dred', '1.0');
			$light2Element.attr('dgreen', '0.9');
			$light2Element.attr('dblue', '1.0');*/
			
			for(var i = 0; i < scene.shapes.length; i++) {
				if(scene.shapes[i].type == "light") {
					$lightElement = $('<light/>');
					$sceneElement.append($lightElement);
					$lightElement.attr('id', scene.shapes[i].name);
					$lightElement.attr('r', scene.shapes[i].r);
					$lightElement.attr('x', scene.shapes[i].x);
					$lightElement.attr('y', scene.shapes[i].y);
					$lightElement.attr('z', scene.shapes[i].z);
					
					//$lightElement.attr('uniqshapeid', scene.shapes[i].uniqShapeId);
					
					//saving colors
					$lightElement.attr('ared', scene.shapes[i].acolor.r);
					$lightElement.attr('agreen', scene.shapes[i].acolor.g);
					$lightElement.attr('ablue', scene.shapes[i].acolor.b);
					
					$lightElement.attr('sred', scene.shapes[i].scolor.r);
					$lightElement.attr('sgreen', scene.shapes[i].scolor.g);
					$lightElement.attr('sblue', scene.shapes[i].scolor.b);
					
					$lightElement.attr('dred', scene.shapes[i].dcolor.r);
					$lightElement.attr('dgreen', scene.shapes[i].dcolor.g);
					$lightElement.attr('dblue', scene.shapes[i].dcolor.b);
					
					//light animations
					for(var j = 0; j < scene.shapes[i].animations.length; j++) {
						var deltaX = parseFloat(scene.shapes[i].x);
						var deltaY = parseFloat(scene.shapes[i].y);
						var deltaZ = parseFloat(scene.shapes[i].z);
						
						for(var k = 0; k < scene.shapes[i].animations.length; k++) {
							switch(scene.shapes[i].animations[j].property) {
								case 'position':
									if(scene.shapes[i].animations[k].endFrame < scene.shapes[i].animations[j].startFrame) {
										deltaX += parseFloat(scene.shapes[i].animations[k].vector[0]);
										deltaY += parseFloat(scene.shapes[i].animations[k].vector[1]);
										deltaZ += parseFloat(scene.shapes[i].animations[k].vector[2]);
									}
								break;
							}
						}
						
						switch(scene.shapes[i].animations[j].property) {
							case 'position':
								var v = scene.shapes[i].animations[j].vector;
									
								if(v[0] != 0) {
									$xTween = $('<tween/>');
									$lightElement.append($xTween);
									
									$xTween.attr('type', 'linear');
									$xTween.attr('property', 'x');
									$xTween.attr('start', scene.shapes[i].animations[j].startFrame);
									$xTween.attr('end', scene.shapes[i].animations[j].endFrame);
									
									$xTween.attr('from', deltaX);
									$xTween.attr('to', deltaX+parseFloat(v[0]));
								}
								
								if(v[1] != 0) {
									$yTween = $('<tween/>');
									$lightElement.append($yTween);
									
									$yTween.attr('type', 'linear');
									$yTween.attr('property', 'y');
									$yTween.attr('start', scene.shapes[i].animations[j].startFrame);
									$yTween.attr('end', scene.shapes[i].animations[j].endFrame);
									
									$yTween.attr('from', deltaY);
									$yTween.attr('to', deltaY+parseFloat(v[1]));
								}
								
								if(v[2] != 0) {
									$zTween = $('<tween/>');
									$lightElement.append($zTween);
									
									$zTween.attr('type', 'linear');
									$zTween.attr('property', 'z');
									$zTween.attr('start', scene.shapes[i].animations[j].startFrame);
									$zTween.attr('end', scene.shapes[i].animations[j].endFrame);
									
									$zTween.attr('from', deltaZ);
									$zTween.attr('to', deltaZ+parseFloat(v[2]));
								}
								break;
							case 'ambient color':
								//set from color
								var fromColor = scene.shapes[i].acolor;
								var maxEndFrame = 0;
								for(m = 0; m < scene.shapes[i].animations.length; m++) {
									if(scene.shapes[i].animations[m].property == 'ambient color' && scene.shapes[i].animations[m].endFrame < scene.shapes[i].animations[j].startFrame) {
										if(scene.shapes[i].animations[m].endFrame > maxEndFrame) {
											maxEndFrame = scene.shapes[i].animations[m].endFrame;
											fromColor = scene.shapes[i].animations[m].toColor;
										}
									}
								}

								if(fromColor.r != scene.shapes[i].animations[j].toColor.r) {
									$aredColorTween = $('<tween/>');
									$lightElement.append($aredColorTween);
									
									$aredColorTween.attr('type', 'linear');
									$aredColorTween.attr('property', 'ared');
									
									$aredColorTween.attr('start', scene.shapes[i].animations[j].startFrame);
									$aredColorTween.attr('end', scene.shapes[i].animations[j].endFrame);

									
									$aredColorTween.attr('from', fromColor.r);
									$aredColorTween.attr('to', scene.shapes[i].animations[j].toColor.r);
								}
								if(fromColor.g != scene.shapes[i].animations[j].toColor.g) {
									$agreenColorTween = $('<tween/>');
									$lightElement.append($agreenColorTween);
									
									$agreenColorTween.attr('type', 'linear');
									$agreenColorTween.attr('property', 'agreen');
									
									$agreenColorTween.attr('start', scene.shapes[i].animations[j].startFrame);
									$agreenColorTween.attr('end', scene.shapes[i].animations[j].endFrame);
									
									$agreenColorTween.attr('from', fromColor.g);
									$agreenColorTween.attr('to', scene.shapes[i].animations[j].toColor.g);
								}
								if(fromColor.b != scene.shapes[i].animations[j].toColor.b) {
									$ablueColorTween = $('<tween/>');
									$lightElement.append($ablueColorTween);
									
									$ablueColorTween.attr('type', 'linear');
									$ablueColorTween.attr('property', 'ablue');
									
									$ablueColorTween.attr('start', scene.shapes[i].animations[j].startFrame);
									$ablueColorTween.attr('end', scene.shapes[i].animations[j].endFrame);
									
									$ablueColorTween.attr('from', fromColor.b);
									$ablueColorTween.attr('to', scene.shapes[i].animations[j].toColor.b);
								}
								break;
							case 'specular color':
								//set from color
								var fromColor = scene.shapes[i].scolor;
								var maxEndFrame = 0;
								for(m = 0; m < scene.shapes[i].animations.length; m++) {
									if(scene.shapes[i].animations[m].property == 'specular color' && scene.shapes[i].animations[m].endFrame < scene.shapes[i].animations[j].startFrame) {
										if(scene.shapes[i].animations[m].endFrame > maxEndFrame) {
											maxEndFrame = scene.shapes[i].animations[m].endFrame;
											fromColor = scene.shapes[i].animations[m].toColor;
										}
									}
								}

								if(fromColor.r != scene.shapes[i].animations[j].toColor.r) {
									$sredColorTween = $('<tween/>');
									$lightElement.append($sredColorTween);
									
									$sredColorTween.attr('type', 'linear');
									$sredColorTween.attr('property', 'sred');
									
									$sredColorTween.attr('start', scene.shapes[i].animations[j].startFrame);
									$sredColorTween.attr('end', scene.shapes[i].animations[j].endFrame);

									
									$sredColorTween.attr('from', fromColor.r);
									$sredColorTween.attr('to', scene.shapes[i].animations[j].toColor.r);
								}
								if(fromColor.g != scene.shapes[i].animations[j].toColor.g) {
									$sgreenColorTween = $('<tween/>');
									$lightElement.append($sgreenColorTween);
									
									$sgreenColorTween.attr('type', 'linear');
									$sgreenColorTween.attr('property', 'sgreen');
									
									$sgreenColorTween.attr('start', scene.shapes[i].animations[j].startFrame);
									$sgreenColorTween.attr('end', scene.shapes[i].animations[j].endFrame);
									
									$sgreenColorTween.attr('from', fromColor.g);
									$sgreenColorTween.attr('to', scene.shapes[i].animations[j].toColor.g);
								}
								if(fromColor.b != scene.shapes[i].animations[j].toColor.b) {
									$sblueColorTween = $('<tween/>');
									$lightElement.append($sblueColorTween);
									
									$sblueColorTween.attr('type', 'linear');
									$sblueColorTween.attr('property', 'sblue');
									
									$sblueColorTween.attr('start', scene.shapes[i].animations[j].startFrame);
									$sblueColorTween.attr('end', scene.shapes[i].animations[j].endFrame);
									
									$sblueColorTween.attr('from', fromColor.b);
									$sblueColorTween.attr('to', scene.shapes[i].animations[j].toColor.b);
								}
								break;
							case 'diffuse color':
								//set from color
								var fromColor = scene.shapes[i].scolor;
								var maxEndFrame = 0;
								for(m = 0; m < scene.shapes[i].animations.length; m++) {
									if(scene.shapes[i].animations[m].property == 'diffuse color' && scene.shapes[i].animations[m].endFrame < scene.shapes[i].animations[j].startFrame) {
										if(scene.shapes[i].animations[m].endFrame > maxEndFrame) {
											maxEndFrame = scene.shapes[i].animations[m].endFrame;
											fromColor = scene.shapes[i].animations[m].toColor;
										}
									}
								}

								if(fromColor.r != scene.shapes[i].animations[j].toColor.r) {
									$dredColorTween = $('<tween/>');
									$lightElement.append($dredColorTween);
									
									$dredColorTween.attr('type', 'linear');
									$dredColorTween.attr('property', 'dred');
									
									$dredColorTween.attr('start', scene.shapes[i].animations[j].startFrame);
									$dredColorTween.attr('end', scene.shapes[i].animations[j].endFrame);

									
									$dredColorTween.attr('from', fromColor.r);
									$dredColorTween.attr('to', scene.shapes[i].animations[j].toColor.r);
								}
								if(fromColor.g != scene.shapes[i].animations[j].toColor.g) {
									$dgreenColorTween = $('<tween/>');
									$lightElement.append($dgreenColorTween);
									
									$dgreenColorTween.attr('type', 'linear');
									$dgreenColorTween.attr('property', 'dgreen');
									
									$dgreenColorTween.attr('start', scene.shapes[i].animations[j].startFrame);
									$dgreenColorTween.attr('end', scene.shapes[i].animations[j].endFrame);
									
									$dgreenColorTween.attr('from', fromColor.g);
									$dgreenColorTween.attr('to', scene.shapes[i].animations[j].toColor.g);
								}
								if(fromColor.b != scene.shapes[i].animations[j].toColor.b) {
									$dblueColorTween = $('<tween/>');
									$lightElement.append($dblueColorTween);
									
									$dblueColorTween.attr('type', 'linear');
									$dblueColorTween.attr('property', 'dblue');
									
									$dblueColorTween.attr('start', scene.shapes[i].animations[j].startFrame);
									$dblueColorTween.attr('end', scene.shapes[i].animations[j].endFrame);
									
									$dblueColorTween.attr('from', fromColor.b);
									$dblueColorTween.attr('to', scene.shapes[i].animations[j].toColor.b);
								}
								break;
						}
					}
				} else if(scene.shapes[i].type == "sphere") {
					$sphereElement = $('<sphere/>');
					$sceneElement.append($sphereElement);
					$sphereElement.attr('id', scene.shapes[i].name);
					$sphereElement.attr('r', scene.shapes[i].r);
					$sphereElement.attr('x', scene.shapes[i].x);
					$sphereElement.attr('y', scene.shapes[i].y);
					$sphereElement.attr('z', scene.shapes[i].z);
					$sphereElement.attr('n', scene.shapes[i].n);
					
					$sphereElement.attr('uniqshapeid', scene.shapes[i].uniqShapeId);
					
					//saving colors
					$sphereElement.attr('ared', scene.shapes[i].acolor.r);
					$sphereElement.attr('agreen', scene.shapes[i].acolor.g);
					$sphereElement.attr('ablue', scene.shapes[i].acolor.b);
					
					$sphereElement.attr('sred', scene.shapes[i].scolor.r);
					$sphereElement.attr('sgreen', scene.shapes[i].scolor.g);
					$sphereElement.attr('sblue', scene.shapes[i].scolor.b);
					
					$sphereElement.attr('dred', scene.shapes[i].dcolor.r);
					$sphereElement.attr('dgreen', scene.shapes[i].dcolor.g);
					$sphereElement.attr('dblue', scene.shapes[i].dcolor.b);
					
					//sphere animations
					for(var j = 0; j < scene.shapes[i].animations.length; j++) {
						var deltaX = parseFloat(scene.shapes[i].x);
						var deltaY = parseFloat(scene.shapes[i].y);
						var deltaZ = parseFloat(scene.shapes[i].z);
						
						for(var k = 0; k < scene.shapes[i].animations.length; k++) {
							switch(scene.shapes[i].animations[j].property) {
								case 'position':
									if(scene.shapes[i].animations[k].endFrame < scene.shapes[i].animations[j].startFrame) {
										deltaX += parseFloat(scene.shapes[i].animations[k].vector[0]);
										deltaY += parseFloat(scene.shapes[i].animations[k].vector[1]);
										deltaZ += parseFloat(scene.shapes[i].animations[k].vector[2]);
									}
								break;
							}
						}
						
						switch(scene.shapes[i].animations[j].property) {
							case 'position':
								var v = scene.shapes[i].animations[j].vector;
									
								if(v[0] != 0) {
									$xTween = $('<tween/>');
									$sphereElement.append($xTween);
									
									$xTween.attr('type', 'linear');
									$xTween.attr('property', 'x');
									$xTween.attr('start', scene.shapes[i].animations[j].startFrame);
									$xTween.attr('end', scene.shapes[i].animations[j].endFrame);
									
									$xTween.attr('from', deltaX);
									$xTween.attr('to', deltaX+parseFloat(v[0]));
								}
								
								if(v[1] != 0) {
									$yTween = $('<tween/>');
									$sphereElement.append($yTween);
									
									$yTween.attr('type', 'linear');
									$yTween.attr('property', 'y');
									$yTween.attr('start', scene.shapes[i].animations[j].startFrame);
									$yTween.attr('end', scene.shapes[i].animations[j].endFrame);
									
									$yTween.attr('from', deltaY);
									$yTween.attr('to', deltaY+parseFloat(v[1]));
								}
								
								if(v[2] != 0) {
									$zTween = $('<tween/>');
									$sphereElement.append($zTween);
									
									$zTween.attr('type', 'linear');
									$zTween.attr('property', 'z');
									$zTween.attr('start', scene.shapes[i].animations[j].startFrame);
									$zTween.attr('end', scene.shapes[i].animations[j].endFrame);
									
									$zTween.attr('from', deltaZ);
									$zTween.attr('to', deltaZ+parseFloat(v[2]));
								}
								break;
							case 'ambient color':
								//set from color
								var fromColor = scene.shapes[i].acolor;
								var maxEndFrame = 0;
								for(m = 0; m < scene.shapes[i].animations.length; m++) {
									if(scene.shapes[i].animations[m].property == 'ambient color' && scene.shapes[i].animations[m].endFrame < scene.shapes[i].animations[j].startFrame) {
										if(scene.shapes[i].animations[m].endFrame > maxEndFrame) {
											maxEndFrame = scene.shapes[i].animations[m].endFrame;
											fromColor = scene.shapes[i].animations[m].toColor;
										}
									}
								}

								if(fromColor.r != scene.shapes[i].animations[j].toColor.r) {
									$aredColorTween = $('<tween/>');
									$sphereElement.append($aredColorTween);
									
									$aredColorTween.attr('type', 'linear');
									$aredColorTween.attr('property', 'ared');
									
									$aredColorTween.attr('start', scene.shapes[i].animations[j].startFrame);
									$aredColorTween.attr('end', scene.shapes[i].animations[j].endFrame);

									
									$aredColorTween.attr('from', fromColor.r);
									$aredColorTween.attr('to', scene.shapes[i].animations[j].toColor.r);
								}
								if(fromColor.g != scene.shapes[i].animations[j].toColor.g) {
									$agreenColorTween = $('<tween/>');
									$sphereElement.append($agreenColorTween);
									
									$agreenColorTween.attr('type', 'linear');
									$agreenColorTween.attr('property', 'agreen');
									
									$agreenColorTween.attr('start', scene.shapes[i].animations[j].startFrame);
									$agreenColorTween.attr('end', scene.shapes[i].animations[j].endFrame);
									
									$agreenColorTween.attr('from', fromColor.g);
									$agreenColorTween.attr('to', scene.shapes[i].animations[j].toColor.g);
								}
								if(fromColor.b != scene.shapes[i].animations[j].toColor.b) {
									$ablueColorTween = $('<tween/>');
									$sphereElement.append($ablueColorTween);
									
									$ablueColorTween.attr('type', 'linear');
									$ablueColorTween.attr('property', 'ablue');
									
									$ablueColorTween.attr('start', scene.shapes[i].animations[j].startFrame);
									$ablueColorTween.attr('end', scene.shapes[i].animations[j].endFrame);
									
									$ablueColorTween.attr('from', fromColor.b);
									$ablueColorTween.attr('to', scene.shapes[i].animations[j].toColor.b);
								}
								break;
							case 'specular color':
								//set from color
								var fromColor = scene.shapes[i].scolor;
								var maxEndFrame = 0;
								for(m = 0; m < scene.shapes[i].animations.length; m++) {
									if(scene.shapes[i].animations[m].property == 'specular color' && scene.shapes[i].animations[m].endFrame < scene.shapes[i].animations[j].startFrame) {
										if(scene.shapes[i].animations[m].endFrame > maxEndFrame) {
											maxEndFrame = scene.shapes[i].animations[m].endFrame;
											fromColor = scene.shapes[i].animations[m].toColor;
										}
									}
								}

								if(fromColor.r != scene.shapes[i].animations[j].toColor.r) {
									$sredColorTween = $('<tween/>');
									$sphereElement.append($sredColorTween);
									
									$sredColorTween.attr('type', 'linear');
									$sredColorTween.attr('property', 'sred');
									
									$sredColorTween.attr('start', scene.shapes[i].animations[j].startFrame);
									$sredColorTween.attr('end', scene.shapes[i].animations[j].endFrame);

									
									$sredColorTween.attr('from', fromColor.r);
									$sredColorTween.attr('to', scene.shapes[i].animations[j].toColor.r);
								}
								if(fromColor.g != scene.shapes[i].animations[j].toColor.g) {
									$sgreenColorTween = $('<tween/>');
									$sphereElement.append($sgreenColorTween);
									
									$sgreenColorTween.attr('type', 'linear');
									$sgreenColorTween.attr('property', 'sgreen');
									
									$sgreenColorTween.attr('start', scene.shapes[i].animations[j].startFrame);
									$sgreenColorTween.attr('end', scene.shapes[i].animations[j].endFrame);
									
									$sgreenColorTween.attr('from', fromColor.g);
									$sgreenColorTween.attr('to', scene.shapes[i].animations[j].toColor.g);
								}
								if(fromColor.b != scene.shapes[i].animations[j].toColor.b) {
									$sblueColorTween = $('<tween/>');
									$sphereElement.append($sblueColorTween);
									
									$sblueColorTween.attr('type', 'linear');
									$sblueColorTween.attr('property', 'sblue');
									
									$sblueColorTween.attr('start', scene.shapes[i].animations[j].startFrame);
									$sblueColorTween.attr('end', scene.shapes[i].animations[j].endFrame);
									
									$sblueColorTween.attr('from', fromColor.b);
									$sblueColorTween.attr('to', scene.shapes[i].animations[j].toColor.b);
								}
								break;
							case 'diffuse color':
								//set from color
								var fromColor = scene.shapes[i].scolor;
								var maxEndFrame = 0;
								for(m = 0; m < scene.shapes[i].animations.length; m++) {
									if(scene.shapes[i].animations[m].property == 'diffuse color' && scene.shapes[i].animations[m].endFrame < scene.shapes[i].animations[j].startFrame) {
										if(scene.shapes[i].animations[m].endFrame > maxEndFrame) {
											maxEndFrame = scene.shapes[i].animations[m].endFrame;
											fromColor = scene.shapes[i].animations[m].toColor;
										}
									}
								}

								if(fromColor.r != scene.shapes[i].animations[j].toColor.r) {
									$dredColorTween = $('<tween/>');
									$sphereElement.append($dredColorTween);
									
									$dredColorTween.attr('type', 'linear');
									$dredColorTween.attr('property', 'dred');
									
									$dredColorTween.attr('start', scene.shapes[i].animations[j].startFrame);
									$dredColorTween.attr('end', scene.shapes[i].animations[j].endFrame);

									
									$dredColorTween.attr('from', fromColor.r);
									$dredColorTween.attr('to', scene.shapes[i].animations[j].toColor.r);
								}
								if(fromColor.g != scene.shapes[i].animations[j].toColor.g) {
									$dgreenColorTween = $('<tween/>');
									$sphereElement.append($dgreenColorTween);
									
									$dgreenColorTween.attr('type', 'linear');
									$dgreenColorTween.attr('property', 'dgreen');
									
									$dgreenColorTween.attr('start', scene.shapes[i].animations[j].startFrame);
									$dgreenColorTween.attr('end', scene.shapes[i].animations[j].endFrame);
									
									$dgreenColorTween.attr('from', fromColor.g);
									$dgreenColorTween.attr('to', scene.shapes[i].animations[j].toColor.g);
								}
								if(fromColor.b != scene.shapes[i].animations[j].toColor.b) {
									$dblueColorTween = $('<tween/>');
									$sphereElement.append($dblueColorTween);
									
									$dblueColorTween.attr('type', 'linear');
									$dblueColorTween.attr('property', 'dblue');
									
									$dblueColorTween.attr('start', scene.shapes[i].animations[j].startFrame);
									$dblueColorTween.attr('end', scene.shapes[i].animations[j].endFrame);
									
									$dblueColorTween.attr('from', fromColor.b);
									$dblueColorTween.attr('to', scene.shapes[i].animations[j].toColor.b);
								}
								break;
						}
					}
				} else {
					//adding triangles
					for(var j = 0; j < scene.shapes[i].vertexPosition.length; j=j+3) {			
						$newTriangle = $('<triangle/>');
						$sceneElement.append($newTriangle);
	
						$newTriangle.attr('id', scene.shapes[i].name);
						
						$newTriangle.attr('x', scene.shapes[i].vertexPosition[j].x);
						$newTriangle.attr('y', scene.shapes[i].vertexPosition[j].y);
						$newTriangle.attr('z', scene.shapes[i].vertexPosition[j].z);
						
						$newTriangle.attr('x1', scene.shapes[i].vertexPosition[j+1].x);
						$newTriangle.attr('y1', scene.shapes[i].vertexPosition[j+1].y);
						$newTriangle.attr('z1', scene.shapes[i].vertexPosition[j+1].z);
						
						$newTriangle.attr('x2', scene.shapes[i].vertexPosition[j+2].x);
						$newTriangle.attr('y2', scene.shapes[i].vertexPosition[j+2].y);
						$newTriangle.attr('z2', scene.shapes[i].vertexPosition[j+2].z);
						
						$newTriangle.attr('uniqshapeid', scene.shapes[i].uniqShapeId);
						
						//saving colors
						$newTriangle.attr('ared', scene.shapes[i].acolor.r);
						$newTriangle.attr('agreen', scene.shapes[i].acolor.g);
						$newTriangle.attr('ablue', scene.shapes[i].acolor.b);
						
						$newTriangle.attr('sred', scene.shapes[i].scolor.r);
						$newTriangle.attr('sgreen', scene.shapes[i].scolor.g);
						$newTriangle.attr('sblue', scene.shapes[i].scolor.b);
						
						$newTriangle.attr('dred', scene.shapes[i].dcolor.r);
						$newTriangle.attr('dgreen', scene.shapes[i].dcolor.g);
						$newTriangle.attr('dblue', scene.shapes[i].dcolor.b);
						
						//luster level
						$newTriangle.attr('n', scene.shapes[i].n);
						
						for(var k = 0; k < scene.shapes[i].animations.length; k++) {
							var deltaX = parseFloat(scene.shapes[i].vertexPosition[j].x);
							var deltaY = parseFloat(scene.shapes[i].vertexPosition[j].y);
							var deltaZ = parseFloat(scene.shapes[i].vertexPosition[j].z);
							
							var deltaX1 = parseFloat(scene.shapes[i].vertexPosition[j+1].x);
							var deltaY1 = parseFloat(scene.shapes[i].vertexPosition[j+1].y);
							var deltaZ1 = parseFloat(scene.shapes[i].vertexPosition[j+1].z);
							
							var deltaX2 = parseFloat(scene.shapes[i].vertexPosition[j+2].x);
							var deltaY2 = parseFloat(scene.shapes[i].vertexPosition[j+2].y);
							var deltaZ2 = parseFloat(scene.shapes[i].vertexPosition[j+2].z);
						
							for(var m = 0; m < scene.shapes[i].animations.length; m++) {
								switch(scene.shapes[i].animations[k].property) {
									case 'position':
										if(scene.shapes[i].animations[m].endFrame < scene.shapes[i].animations[k].startFrame) {
											deltaX += parseFloat(scene.shapes[i].animations[m].vector[0]);
											deltaY += parseFloat(scene.shapes[i].animations[m].vector[1]);
											deltaZ += parseFloat(scene.shapes[i].animations[m].vector[2]);
											
											deltaX1 += parseFloat(scene.shapes[i].animations[m].vector[0]);
											deltaY1 += parseFloat(scene.shapes[i].animations[m].vector[1]);
											deltaZ1 += parseFloat(scene.shapes[i].animations[m].vector[2]);
											
											deltaX2 += parseFloat(scene.shapes[i].animations[m].vector[0]);
											deltaY2 += parseFloat(scene.shapes[i].animations[m].vector[1]);
											deltaZ2 += parseFloat(scene.shapes[i].animations[m].vector[2]);
										}
									break;
								}
							}
							
							switch(scene.shapes[i].animations[k].property) {
								case 'position':
									var v = scene.shapes[i].animations[k].vector;
									
									if(v[0] != 0) {
										//x
										$xTween = $('<tween/>');
										$newTriangle.append($xTween);
										
										$xTween.attr('type', 'linear');
										$xTween.attr('property', 'x');
										$xTween.attr('start', scene.shapes[i].animations[k].startFrame);
										$xTween.attr('end', scene.shapes[i].animations[k].endFrame);
										
										$xTween.attr('from', deltaX);
										$xTween.attr('to', deltaX+parseFloat(v[0]));
										
										//x1
										$x1Tween = $('<tween/>');
										$newTriangle.append($x1Tween);
										
										$x1Tween.attr('type', 'linear');
										$x1Tween.attr('property', 'x1');
										$x1Tween.attr('start', scene.shapes[i].animations[k].startFrame);
										$x1Tween.attr('end', scene.shapes[i].animations[k].endFrame);
										
										$x1Tween.attr('from', deltaX1);
										$x1Tween.attr('to', deltaX1+parseFloat(v[0]));
										
										//x2
										$x2Tween = $('<tween/>');
										$newTriangle.append($x2Tween);
										
										$x2Tween.attr('type', 'linear');
										$x2Tween.attr('property', 'x2');
										$x2Tween.attr('start', scene.shapes[i].animations[k].startFrame);
										$x2Tween.attr('end', scene.shapes[i].animations[k].endFrame);
										
										$x2Tween.attr('from', deltaX2);
										$x2Tween.attr('to', deltaX2+parseFloat(v[0]));
									}
									
									if(v[1] != 0) {
										//y
										$yTween = $('<tween/>');
										$newTriangle.append($yTween);
										
										$yTween.attr('type', 'linear');
										$yTween.attr('property', 'y');
										$yTween.attr('start', scene.shapes[i].animations[k].startFrame);
										$yTween.attr('end', scene.shapes[i].animations[k].endFrame);
										
										$yTween.attr('from', deltaY);
										$yTween.attr('to', deltaY+parseFloat(v[1]));
										
										//y1
										$y1Tween = $('<tween/>');
										$newTriangle.append($y1Tween);
										
										$y1Tween.attr('type', 'linear');
										$y1Tween.attr('property', 'y1');
										$y1Tween.attr('start', scene.shapes[i].animations[k].startFrame);
										$y1Tween.attr('end', scene.shapes[i].animations[k].endFrame);
										
										$y1Tween.attr('from', deltaY1);
										$y1Tween.attr('to', deltaY1+parseFloat(v[1]));
	
										//y2
										$y2Tween = $('<tween/>');
										$newTriangle.append($y2Tween);
										
										$y2Tween.attr('type', 'linear');
										$y2Tween.attr('property', 'y2');
										$y2Tween.attr('start', scene.shapes[i].animations[k].startFrame);
										$y2Tween.attr('end', scene.shapes[i].animations[k].endFrame);
										
										$y2Tween.attr('from', deltaY2);
										$y2Tween.attr('to', deltaY2+parseFloat(v[1]));
									}
									
									if(v[2] != 0) {
										//z
										$zTween = $('<tween/>');
										$newTriangle.append($zTween);
										
										$zTween.attr('type', 'linear');
										$zTween.attr('property', 'z');
										$zTween.attr('start', scene.shapes[i].animations[k].startFrame);
										$zTween.attr('end', scene.shapes[i].animations[k].endFrame);
										
										$zTween.attr('from', deltaZ);
										$zTween.attr('to', deltaZ+parseFloat(v[2]));
										
										//z1
										$z1Tween = $('<tween/>');
										$newTriangle.append($z1Tween);
										
										$z1Tween.attr('type', 'linear');
										$z1Tween.attr('property', 'z1');
										$z1Tween.attr('start', scene.shapes[i].animations[k].startFrame);
										$z1Tween.attr('end', scene.shapes[i].animations[k].endFrame);
										
										$z1Tween.attr('from', deltaZ1);
										$z1Tween.attr('to', deltaZ1+parseFloat(v[2]));
										
										//z2
										$z2Tween = $('<tween/>');
										$newTriangle.append($z2Tween);
										
										$z2Tween.attr('type', 'linear');
										$z2Tween.attr('property', 'z2');
										$z2Tween.attr('start', scene.shapes[i].animations[k].startFrame);
										$z2Tween.attr('end', scene.shapes[i].animations[k].endFrame);
										
										$z2Tween.attr('from', deltaZ2);
										$z2Tween.attr('to', deltaZ2+parseFloat(v[2]));
									}
	
									break;
								case 'ambient color':
									//set from color
									var fromColor = scene.shapes[i].acolor;
									var maxEndFrame = 0;
									for(m = 0; m < scene.shapes[i].animations.length; m++) {
										if(scene.shapes[i].animations[m].property == 'ambient color' && scene.shapes[i].animations[m].endFrame < scene.shapes[i].animations[k].startFrame) {
											if(scene.shapes[i].animations[m].endFrame > maxEndFrame) {
												maxEndFrame = scene.shapes[i].animations[m].endFrame;
												fromColor = scene.shapes[i].animations[m].toColor;
											}
										}
									}
	
									if(fromColor.r != scene.shapes[i].animations[k].toColor.r) {
										$aredColorTween = $('<tween/>');
										$newTriangle.append($aredColorTween);
										
										$aredColorTween.attr('type', 'linear');
										$aredColorTween.attr('property', 'ared');
										
										$aredColorTween.attr('start', scene.shapes[i].animations[k].startFrame);
										$aredColorTween.attr('end', scene.shapes[i].animations[k].endFrame);
	
										
										$aredColorTween.attr('from', fromColor.r);
										$aredColorTween.attr('to', scene.shapes[i].animations[k].toColor.r);
									}
									if(fromColor.g != scene.shapes[i].animations[k].toColor.g) {
										$agreenColorTween = $('<tween/>');
										$newTriangle.append($agreenColorTween);
										
										$agreenColorTween.attr('type', 'linear');
										$agreenColorTween.attr('property', 'agreen');
										
										$agreenColorTween.attr('start', scene.shapes[i].animations[k].startFrame);
										$agreenColorTween.attr('end', scene.shapes[i].animations[k].endFrame);
										
										$agreenColorTween.attr('from', fromColor.g);
										$agreenColorTween.attr('to', scene.shapes[i].animations[k].toColor.g);
									}
									if(fromColor.b != scene.shapes[i].animations[k].toColor.b) {
										$ablueColorTween = $('<tween/>');
										$newTriangle.append($ablueColorTween);
										
										$ablueColorTween.attr('type', 'linear');
										$ablueColorTween.attr('property', 'ablue');
										
										$ablueColorTween.attr('start', scene.shapes[i].animations[k].startFrame);
										$ablueColorTween.attr('end', scene.shapes[i].animations[k].endFrame);
										
										$ablueColorTween.attr('from', fromColor.b);
										$ablueColorTween.attr('to', scene.shapes[i].animations[k].toColor.b);
									}
									break;
								case 'specular color':
									//set from color
									var fromColor = scene.shapes[i].scolor;
									var maxEndFrame = 0;
									for(m = 0; m < scene.shapes[i].animations.length; m++) {
										if(scene.shapes[i].animations[m].property == 'specular color' && scene.shapes[i].animations[m].endFrame < scene.shapes[i].animations[k].startFrame) {
											if(scene.shapes[i].animations[m].endFrame > maxEndFrame) {
												maxEndFrame = scene.shapes[i].animations[m].endFrame;
												fromColor = scene.shapes[i].animations[m].toColor;
											}
										}
									}
	
									if(fromColor.r != scene.shapes[i].animations[k].toColor.r) {
										$sredColorTween = $('<tween/>');
										$newTriangle.append($sredColorTween);
										
										$sredColorTween.attr('type', 'linear');
										$sredColorTween.attr('property', 'sred');
										
										$sredColorTween.attr('start', scene.shapes[i].animations[k].startFrame);
										$sredColorTween.attr('end', scene.shapes[i].animations[k].endFrame);
										
										$sredColorTween.attr('from', fromColor.r);
										$sredColorTween.attr('to', scene.shapes[i].animations[k].toColor.r);
									}
	
									if(fromColor.g != scene.shapes[i].animations[k].toColor.g) {
										$sgreenColorTween = $('<tween/>');
										$newTriangle.append($sgreenColorTween);
										
										$sgreenColorTween.attr('type', 'linear');
										$sgreenColorTween.attr('property', 'sgreen');
										
										$sgreenColorTween.attr('start', scene.shapes[i].animations[k].startFrame);
										$sgreenColorTween.attr('end', scene.shapes[i].animations[k].endFrame);
										
										$sgreenColorTween.attr('from', fromColor.g);
										$sgreenColorTween.attr('to', scene.shapes[i].animations[k].toColor.g);
									}
									if(fromColor.b != scene.shapes[i].animations[k].toColor.b) {
										$sblueColorTween = $('<tween/>');
										$newTriangle.append($sblueColorTween);
										
										$sblueColorTween.attr('type', 'linear');
										$sblueColorTween.attr('property', 'sblue');
										
										$sblueColorTween.attr('start', scene.shapes[i].animations[k].startFrame);
										$sblueColorTween.attr('end', scene.shapes[i].animations[k].endFrame);
										
										$sblueColorTween.attr('from', fromColor.b);
										$sblueColorTween.attr('to', scene.shapes[i].animations[k].toColor.b);
									}
									break;
								case 'diffuse color':
									//set from color
									var fromColor = scene.shapes[i].dcolor;
									var maxEndFrame = 0;
									for(m = 0; m < scene.shapes[i].animations.length; m++) {
										if(scene.shapes[i].animations[m].property == 'diffuse color' && scene.shapes[i].animations[m].endFrame < scene.shapes[i].animations[k].startFrame) {
											if(scene.shapes[i].animations[m].endFrame > maxEndFrame) {
												maxEndFrame = scene.shapes[i].animations[m].endFrame;
												fromColor = scene.shapes[i].animations[m].toColor;
											}
										}
									}
	
									if(fromColor.r != scene.shapes[i].animations[k].toColor.r) {
										$dredColorTween = $('<tween/>');
										$newTriangle.append($dredColorTween);
										
										$dredColorTween.attr('type', 'linear');
										$dredColorTween.attr('property', 'dred');
										
										$dredColorTween.attr('start', scene.shapes[i].animations[k].startFrame);
										$dredColorTween.attr('end', scene.shapes[i].animations[k].endFrame);
										
										$dredColorTween.attr('from', fromColor.r);
										$dredColorTween.attr('to', scene.shapes[i].animations[k].toColor.r);
									}
									if(fromColor.g != scene.shapes[i].animations[k].toColor.g) {
										$dgreenColorTween = $('<tween/>');
										$newTriangle.append($dgreenColorTween);
										
										$dgreenColorTween.attr('type', 'linear');
										$dgreenColorTween.attr('property', 'dgreen');
										
										$dgreenColorTween.attr('start', scene.shapes[i].animations[k].startFrame);
										$dgreenColorTween.attr('end', scene.shapes[i].animations[k].endFrame);
										
										$dgreenColorTween.attr('from', fromColor.g);
										$dgreenColorTween.attr('to', scene.shapes[i].animations[k].toColor.g);
									}
									if(fromColor.b != scene.shapes[i].animations[k].toColor.b) {
										$dblueColorTween = $('<tween/>');
										$newTriangle.append($dblueColorTween);
										
										$dblueColorTween.attr('type', 'linear');
										$dblueColorTween.attr('property', 'dblue');
										
										$dblueColorTween.attr('start', scene.shapes[i].animations[k].startFrame);
										$dblueColorTween.attr('end', scene.shapes[i].animations[k].endFrame);
										
										$dblueColorTween.attr('from', fromColor.b);
										$dblueColorTween.attr('to', scene.shapes[i].animations[k].toColor.b);
									}
									break;
							}
						}
					}
				}
			}
			
			//document.write(new XMLSerializer().serializeToString(xmlDocument));
			
			var xmlString = new XMLSerializer().serializeToString(xmlDocument);
			
			//replacing 'xmlns="http://www.w3.org/1999/xhtml"' with ''
			xmlString = xmlString.replace('xmlns="http://www.w3.org/1999/xhtml"', '');
			
			//document.write(xmlString);
			
			//Sending AJAX request to db_connector.php script
			$.ajax({
				type: 'POST',
				url: locationURL + 'db_connector.php?mode=1',
				data: {xml: xmlString, frames: scene.frames, name: scene.name},
				dataType: 'text',
				success: function(data) {
					alert(data);
					
					var temp = data.split(" ");
					
					scene.id = temp[0];
					
					//setting progressbar timeout
					$('.export-dialog #export-progressbar').progressbar({value: 0});

					//setting timeout for refreshing toolbar, default - 2s
					var t = 2000;
				
					var int = setInterval(function() {
						$.ajax({
							type: 'POST',
							url: locationURL + 'db_connector.php?mode=4',
							data: {id: scene.id},
							dataType: 'text',
							success: function(data) {
								console.log(data);
								$('.export-dialog #export-progressbar').progressbar({value: parseInt(parseInt(data)/scene.frames)});
							}
						});
					}, t);
					
					//download button action
					$('.export-dialog #download-animation').attr('href', locationURL + 'db_connector.php?mode=5&id=' + scene.id);
				}
			});
		}
	});
}

function initSettings() {
	//on change event for draw method
	$("input[name='draw-method']").change(function() {
		var drawMethod = $("input[name='draw-method']:checked").val();
	
		logMessage("Draw method set to: " + drawMethod);
		
		if(drawMethod == "render-cl") {
			initWebCL();
		} else if(drawMethod == "outline")  {
			//reinit
			initWebGL();
		}
		
		initScene();		
	});
	
	initDevices();
}

function logMessage(message) {
	if(enable_log == true) {
		console.log(message);
		running_log.append(message + "<br />");
	}
}

function clearLog() {
	console.log("Clearing log");
	running_log.html("");
}

function initLog() {
	running_log = $('#running-log');
}

function initTools() {
	initShapes();
	initProperties();
	initAnimation();
	initExport();
	initImport();
	initSettings();
	initLog();
}

