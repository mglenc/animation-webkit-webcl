/*
Toolbar js

Date: 07-06-2012
Author: Michal Glenc
*/
function initToolbar() {	
	//Shapes tool
	$('.tools#shapes-dialog').dialog({
		dialogClass: 'shapes-dialog',
		autoOpen: true,
		width: 100,
		height: 75,
		resizable: false,
		position: [30, 200],
		buttons: {
		}
	});
	
	$('#toolbar li#shapes a').click(function() {
		if($('.tools#shapes-dialog').dialog('isOpen')) {
			$('.tools#shapes-dialog').dialog('close');
		} else {
			$('.tools#shapes-dialog').dialog('open');
		}
		return false;
	});
	
	//Properties tool
	$('.tools#properties-dialog').dialog({
		dialogClass: 'properties-dialog',
		autoOpen: true,
		width: 300,
		height: 'auto',
		minHeight: 0,
		resizable: false,
		autoResize: true,
		position: [$(document).width() - 330, 200],
		buttons: {
		}
	});
	
	$('#toolbar li#properties a').click(function() {
		if($('.tools#properties-dialog').dialog('isOpen')) {
			$('.tools#properties-dialog').dialog('close');
		} else {
			$('.tools#properties-dialog').dialog('open');
		}
		return false;
	});
	
	//Animation tool
	$('.tools#animation-dialog').dialog({
		dialogClass: 'animation-dialog',
		autoOpen: true,
		width: 200,
		height: 'auto',
		minHeight: 0,
		resizable: false,
		autoResize: true,
		position: [30, 320],
		buttons: {
		}
	});
	
	$('#toolbar li#animation a').click(function() {
		if($('.tools#animation-dialog').dialog('isOpen')) {
			$('.tools#animation-dialog').dialog('close');
		} else {
			$('.tools#animation-dialog').dialog('open');
		}
		return false;
	});
	
	//Export tool
	$('.tools#export-dialog').dialog({
		dialogClass: 'export-dialog',
		autoOpen: false,
		width: '300',
		height: 'auto',
		minHeight: 0,
		resizable: false,
		autoResize: true,
		position: [$(document).width()/2-150, 300],
		buttons: {
		}
	});
	
	$('#toolbar li#export a').click(function() {
		if($('.tools#export-dialog').dialog('isOpen')) {
			$('.tools#export-dialog').dialog('close');
		} else {
			$('.tools#export-dialog').dialog('open');
		}
		return false;
	});
	
	//Import tool
	$('.tools#import-dialog').dialog({
		dialogClass: 'import-dialog',
		autoOpen: false,
		width: 'auto',
		height: 'auto',
		minHeight: 0,
		resizable: false,
		autoResize: true,
		position: [$(document).width()/2-250, 200],
		buttons: {
		},
		open: function(event) {
			$("#import-database-panel #scenes-list").trigger("reloadGrid");
		}
	});
	
	$('#toolbar li#import a').click(function() {
		if($('.tools#import-dialog').dialog('isOpen')) {
			$('.tools#import-dialog').dialog('close');
		} else {
			$('.tools#import-dialog').dialog('open');
		}
		return false;
	});
	
	//Settings tool
	$('.tools#settings-dialog').dialog({
		dialogClass: 'settings-dialog',
		autoOpen: true,
		width: 'auto',
		height: 'auto',
		minHeight: 0,
		resizable: false,
		autoResize: true,
		position: [$(document).width() - 330, 500],
		buttons: {
		},
		open: function(event) {
			//$("#import-database-panel #scenes-list").trigger("reloadGrid");
		}
	});
	
	$('#toolbar li#settings a').click(function() {
		if($('.tools#settings-dialog').dialog('isOpen')) {
			$('.tools#settings-dialog').dialog('close');
		} else {
			$('.tools#settings-dialog').dialog('open');
		}
		return false;
	});
	
	//Log tool
	$('.tools#log-dialog').dialog({
		dialogClass: 'log-dialog',
		autoOpen: false,
		width: 'auto',
		height: 'auto',
		minHeight: 0,
		resizable: false,
		autoResize: true,
		position: [$(document).width()/2-250, 200],
		buttons: {
		},
		open: function(event) {
			//$("#import-database-panel #scenes-list").trigger("reloadGrid");
		}
	});
	
	$('#toolbar li#log a').click(function() {
		if($('.tools#log-dialog').dialog('isOpen')) {
			$('.tools#log-dialog').dialog('close');
		} else {
			$('.tools#log-dialog').dialog('open');
		}
		return false;
	});
}