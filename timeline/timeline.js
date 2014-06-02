/*
Timeline Javascript

Date: 30-09-2012
Author: Michal Glenc
*/

var selectedShapeId = -1;
var currentFrame = 0;

function selectShape(obj) {
	deselectShape();
	
	//checking obj if id or object
	if($.isNumeric(obj)) {
		selectedShapeId = obj;
	} else {
		var classes = obj.attr('class').split(/\s+/);
		for(i = 0; i < classes.length; i++) {
			if($.isNumeric(classes[i])) {
				selectedShapeId = parseInt(classes[i]);
			}
		}
	}
	
	if(!$('#shapes-list .shape.' + selectedShapeId).hasClass('active')) {
		$('#shapes-list .shape.' + selectedShapeId).addClass('active');
	}
	
	//refreshTimeline();
	refreshAnimation();
	refreshProperties();
	refreshScene();
}

function selectFrame(obj) {
	deselectFrame();
	
	var tmpObj;
	
	if($.isNumeric(obj)) {
		currentFrame = obj;
	} else {
		var classes = obj.attr('class').split(/\s+/);
		for(i = 0; i < classes.length; i++) {
			if($.isNumeric(classes[i])) {
				currentFrame = parseInt(classes[i]);
			}
		}
	}
	
	//setting active class
	if(!$('#shapes-list .frame.' + currentFrame).hasClass('active')) {
		$('#shapes-list .frame.' + currentFrame).addClass('active');
	}
	
	//refreshTimeline();
}

function deselectFrame() {
	if($('#shapes-list .frame.' + currentFrame).hasClass('active')) {
		$('#shapes-list .frame.' + currentFrame).removeClass('active');
	}
}

function deselectShape() {
	if($('#shapes-list .shape.' + selectedShapeId).hasClass('active')) {
		$('#shapes-list .shape.' + selectedShapeId).removeClass('active');
	}

	selectedShapeId = -1;
	
	refreshProperties();
	refreshAnimation();
}

function refreshTimeline() {
	//incredibly slow with many frames
	$('#timeline #shapes-list').html('');
	
	var framesString = "";
	for(i = 0; i < scene.frames; i++) {
		var active = '';
		if(i == currentFrame) {
			active = 'active';
		}
		if(i == scene.frames-1) {
			framesString += '<li class="last frame ' + i + ' ' + active + '"></li>';
		} else {
			framesString += '<li class="frame ' + i + ' ' + active + '"></li>';
		}
	}
	
	for(i = 0; i < scene.shapes.length; i++) {
		var active;
		var light;
		if(i == selectedShapeId) {
			active = 'active';
		} else {
			active = '';
		}
		
		if(scene.shapes[i].type == 'light') {
			light = 'light';
		} else {
			light = '';
		}
		
		resString = '<li class="shape ' + i + ' ' + active + ' ' + light + '"><div class="title">' + scene.shapes[i].name + '</div><ul class="frames-list">' + framesString + "</ul>";
		$('#timeline #shapes-list').append(resString);
		
		for(j = 0; j < scene.shapes[i].animations.length; j++) {
			for(k = scene.shapes[i].animations[j].startFrame; k <= scene.shapes[i].animations[j].endFrame; k++) {
				$('li.shape.' + i + ' li.frame.' + k).addClass('animation');
			}
		}
	}
	
	$('#shapes-list li.shape').width($('li.shape .title').width() + scene.frames*($('li.frame').width() + 1) + 6);
	
	//refreshing list items selection
	$('#timeline #shapes-list li.shape').click(function() {
		selectShape($(this));
	});
	
	//refreshing list items selection
	$('#timeline #shapes-list li.frame').click(function() {
		selectFrame($(this));
		selectShape($(this).parent().parent());
	});
	
	//display contextMenu with shape options
	$.contextMenu({
		selector: "li.shape",
		items: {
			rename: {name: "Rename", callback: function(key, opt) {
				var classes = opt.$trigger.attr('class').split(/\s+/);
				for(i = 0; i < classes.length; i++) {
					if($.isNumeric(classes[i])) {
						shapeId = classes[i];
					}
				}
				
				$('#timeline #shapes-list li.shape.' + shapeId + ' .title').html('<input type="text" id="shape-rename" value="' + scene.shapes[shapeId].name + '" />');
				$('#timeline #shapes-list li.shape.' + shapeId + ' .title input').keydown(function(event) {
					if(event.which == 13) {
						var value = $('#timeline #shapes-list li.shape.' + shapeId + ' .title input').val();
						scene.shapes[shapeId].name = value;
						$('#timeline #shapes-list li.shape.' + shapeId + ' .title').html(value);
					}
				});
			}},
        	delete: {name: "Delete", callback: function(key, opt) {
        		var classes = opt.$trigger.attr('class').split(/\s+/);
				for(i = 0; i < classes.length; i++) {
					if($.isNumeric(classes[i])) {
						shapeId = classes[i];
					}
				}
				
				if(selectedShapeId == shapeId) {
					if(shapeId == 0) {
						deselectShape();
					} else {
						selectShape(shapeId-1);
					}
				} else if(selectedShapeId > shapeId) {
					selectShape(selectedShapeId-1);
				}
				
				scene.shapes.splice(shapeId, 1);
				refreshTimeline();
				refreshScene();
        	}}
		}
	});
}