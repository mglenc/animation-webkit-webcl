var useDeviceType = "";
var useDeviceIndex = "";

var prim_list_raw = new Array();
var prim_list_buffer; //ArrayBuffer
var prim_list_float32View;
var n_primitives = 0;

var sceneFileName = "scenes/scene1.txt";

var clKernel;
var wgSize;
var cl;
var clQueue;
var clSrc;
var clProgram;

function initRayTracer() {
	initUI();
	initWebCL();
}

function toggleDevice(type, index) {
	useDeviceType = type;
	useDeviceIndex = index;

	//reset();
	initWebCL();
}

function initDevices() {
	var deviceType = "ALL";
	try {
		WebCLCommon.init(deviceType);
        cl = WebCLCommon.createContext();
        
        deviceType = "GPU";
		var gpu_devices = WebCLCommon.getDevices(deviceType);
		for(var i in gpu_devices) {
			var dev = gpu_devices[i];
			var device_name = dev.getInfo(webcl.DEVICE_NAME);
			if(device_name == "") device_name = i;
			$('#gpu-devices').append('<li><input type="radio" name="device" id="GPU' + device_name + '" data-type="GPU" data-index="' + i +'"> <label for="GPU' + device_name + '">' + device_name + '</label></li>');
			
			//selecting first GPU Device
			if(i == 0) {
				$('input#GPU' + device_name).attr('checked', 'true');
				useDeviceType = "GPU";
				useDeviceIndex = i;
			}
		}
		
		deviceType = "CPU";
		var cpu_devices = WebCLCommon.getDevices(deviceType);
		for(var i in cpu_devices) {
			var dev = cpu_devices[i];
			var device_name = dev.getInfo(webcl.DEVICE_NAME);
			if(device_name == "") device_name = i;
			$('#cpu-devices').append('<li><input type="radio" name="device" id="CPU' + device_name + '" data-type="CPU" data-index="' + i +'"> <label for="CPU' + device_name + '">' + device_name + '</label></li>');
		
			//selecting first CPU Device
			/*if(i == 0) {
				$('input#CPU' + device_name).attr('checked', 'true');
				useDeviceType = "CPU";
				useDeviceIndex = i;
			}*/
		}
	} catch (e) {
		alert("Error initializing WebCL: " + e.message);
	}
	
	$("input[name='device']").change(function() {
		toggleDevice($(this).data('type'), $(this).data('index'));
	});
}

function refreshCL() {
	raytrace(true);
}

function initWebCL() {
	//removing and readding canvas element, cause of getContext returning null when called twice
	$('#' + canvasId).remove();
	$('body').append('<canvas id="scene"></canvas>');

    var deviceType = useDeviceType;
    var deviceIndex = useDeviceIndex;

    try {
        WebCLCommon.init(deviceType);
        cl = WebCLCommon.createContext();
        clQueue = cl.createCommandQueue();

        var devices = WebCLCommon.getDevices(deviceType);

        //allocateBuffers();
    } catch (e) {
        alert("Error initializing WebCL: " + e.message);
    }

    try {
        clSrc = WebCLCommon.loadKernel("./raytracer/cl_kernel.js");
        if (clSrc === null) {
            console.log("No kernel named: raytracer_kerel");
            return;
        }
        
        //TO DO: passing arguments, traceDepth and other to kernel compilator

        clProgram = WebCLCommon.createProgramBuild(clSrc, devices[deviceIndex]);
    } catch (e) {
        alert("Failed to build webcl program. Error " +
            clProgram.getBuildInfo(devices[deviceIndex], webcl.PROGRAM_BUILD_STATUS) +
            ":  " + clProgram.getBuildInfo(devices[deviceIndex], webcl.PROGRAM_BUILD_LOG));
        throw e;
    }

    clKernel = clProgram.createKernel("raytracer_kernel");

    /*wgSize = clKernel.getWorkGroupInfo(devices[deviceIndex], webcl.KERNEL_WORK_GROUP_SIZE);
    
    console.log(devices);
    console.log(wgSize);*/
    logMessage("Choosing device " + deviceType + " " + deviceIndex);
}

function moveScene(dir){
	var y = 0;
	if(dir=='Forward'){
		for(var i = 0; i < n_primitives; i++){
			y = i * 24;
			if(prim_list_float32View[y + 10] > 0){ // any sphere
				prim_list_float32View[y + 18] -= 5;
			}else if(prim_list_float32View[y + 14] != 0){ //front or back plane
				prim_list_float32View[y + 20] -= 5;
			}
		}	
	}
	if(dir=='Back'){
		for(var i = 0; i < n_primitives; i++){
			y = i * 24;
			if(prim_list_float32View[y + 10] > 0){ // 0=Plane, 1=Sphere
				prim_list_float32View[y + 18] += 5;
			}else if(prim_list_float32View[y + 14] != 0){ //front or back plane			
				prim_list_float32View[y + 20] += 5;
			}
		}	
	}
	if(dir=='Up'){
		for(var i = 0; i < n_primitives; i++){
			y = i * 24;
			if(prim_list_float32View[y + 10] > 0){ // 0=Plane, 1=Sphere
				prim_list_float32View[y + 17] -= 2;
			}else if(prim_list_float32View[y + 13] == -1){ //top plane			
				prim_list_float32View[y + 20] -= 2;
			}else if(prim_list_float32View[y + 13] == 1){ //floor plane			
				prim_list_float32View[y + 20] += 2;
			}
		}	
	}
	if(dir=='Down'){
		for(var i = 0; i < n_primitives; i++){
			y = i * 24;
			if(prim_list_float32View[y + 10] > 0){ // 0=Plane, 1=Sphere
				prim_list_float32View[y + 17] += 2;
			}else if(prim_list_float32View[y + 13] == -1){ //top plane			
				prim_list_float32View[y + 20] += 2;
			}else if(prim_list_float32View[y + 13] == 1){ //floor plane			
				prim_list_float32View[y + 20] -= 2;
			}
		}	
	}
	if(dir=='Left'){
		for(var i = 0; i < n_primitives; i++){
			y = i * 24;
			if(prim_list_float32View[y + 10] > 0){ // 0=Plane, 1=Sphere
				prim_list_float32View[y + 16] += 2;
			}else if(prim_list_float32View[y + 12] == -1){ //left plane			
				prim_list_float32View[y + 20] += 2;
			}else if(prim_list_float32View[y + 12] == 1){ //right plane			
				prim_list_float32View[y + 20] -= 2;
			}
		}	
	}
	if(dir=='Right'){
		for(var i = 0; i < n_primitives; i++){
			y = i * 24;
			if(prim_list_float32View[y + 10] > 0){ // 0=Plane, 1=Sphere
				prim_list_float32View[y + 16] -= 2;
			}else if(prim_list_float32View[y + 12] == -1){ //left plane			
				prim_list_float32View[y + 20] -= 2;
			}else if(prim_list_float32View[y + 12] == 1){ //right plane			
				prim_list_float32View[y + 20] += 2;
			}
		}
	}
	raytrace(false);
}

function moveView(dir){	
	if(dir=='Up' && camera_y > -5.0){
		camera_y -= 1;
		raytrace(false); //will NOT load prims
	}
	if(dir=='Down' && camera_y < 5.0){
		camera_y += 1;
		raytrace(false); //will NOT load prims
	}
	if(dir=='Left' && camera_x < 5.0){
		camera_x += 1;
		raytrace(false); //will NOT load prims
	}
	if(dir=='Right' && camera_x > -5.0){
		camera_x -= 1;
		raytrace(false); //will NOT load prims
	}
	if(dir=='ZoomIn' && camera_z > -15.0){
		camera_z -= 2;
		raytrace(false); //will NOT load prims
	}
	if(dir=='ZoomOut' && camera_z < 1.0){
		camera_z += 2;
		raytrace(false); //will NOT load prims
	}
	if(dir=='Reset'){
		camera_x = 0;
		camera_y = 0;
		camera_z = -7.0;
		raytrace(true); //WILL load prims
	}
}

function createPrimList(){
	var lines = new Array();
	var mHttpReq = new XMLHttpRequest();
	mHttpReq.open("GET", sceneFileName, false);
	mHttpReq.send(null);
	var allText = mHttpReq.responseText; 
	lines = allText.split("\n");
	n_primitives = parseInt(lines[0]);
	// create Buffer Array for entire prim_list arr
	
	prim_list_buffer = new ArrayBuffer( n_primitives * 96 );
	// Create a new view that divides buffer to 32 bit float
	prim_list_float32View = new Float32Array(prim_list_buffer);
	prim_list_raw = new Array();
	for(var i = 0; i < n_primitives; i++){
		var a = lines[i+1].split(",");
		prim_list_raw.push({ type: parseInt(a[0]), 
							m_color_r: parseFloat(a[1]), 
							m_color_g: parseFloat(a[2]), 
							m_color_b: parseFloat(a[3]),
							m_refl: parseFloat(a[4]), 
							m_refr: parseFloat(a[5]),
							m_refr_index: parseFloat(a[6]), 
							m_diff: parseFloat(a[7]), 
							m_spec: parseFloat(a[8]), 
							light: parseInt(a[9]), 
							center_normal_x: parseFloat(a[10]), 
							center_normal_y: parseFloat(a[11]), 
							center_normal_z: parseFloat(a[12]), 
							radius_depth: parseFloat(a[13]), 
							name: a[14]});			
	}		
	for(var i = 0; i < n_primitives; i++){
		var m_color = [0.0,0.0,0.0,0.0]; //Color m_color;
		var m_refl = 0.0; //float m_refl;
		var m_diff = 0.0; //float m_diff;
		var m_refr = 0.0; //float m_refr;
		var m_refr_index = 0.0; //float m_refr_index;
		var m_spec = 0.0; //float m_spec;
		var dummy_3 = 0.0; //float dummy_3;
		var type = 0.0; //prim_type type;
		var is_light = 0.0; //bool is_light;
		var normal = [0.0,0.0,0.0,0.0]; //float4 normal;
		var center = [0.0,0.0,0.0,0.0]; //float4 center;
		var depth = 0.0; //float depth;
		var radius = 0.0; //float radius;
		var sq_radius = 0.0; //float sq_radius;
		var r_radius = 0.0; //float r_radius;
		
		m_color[0] = prim_list_raw[i].m_color_r;
		m_color[1] = prim_list_raw[i].m_color_g;
		m_color[2] = prim_list_raw[i].m_color_b;
		m_refl = prim_list_raw[i].m_refl;
		m_diff = prim_list_raw[i].m_diff;
		m_refr = prim_list_raw[i].m_refr;
		m_refr_index = prim_list_raw[i].m_refr_index;
		m_spec = prim_list_raw[i].m_spec;			
		
		if(prim_list_raw[i].light == 1)
			is_light = 1.0;
		
		type = prim_list_raw[i].type;	
		if(type == 0){
			normal[0] = prim_list_raw[i].center_normal_x;
			normal[1] = prim_list_raw[i].center_normal_y;
			normal[2] = prim_list_raw[i].center_normal_z;
			depth = prim_list_raw[i].radius_depth;
		}else{				
			center[0] = prim_list_raw[i].center_normal_x;
			center[1] = prim_list_raw[i].center_normal_y;
			center[2] = prim_list_raw[i].center_normal_z;
			radius = prim_list_raw[i].radius_depth;
			sq_radius = radius * radius;
			r_radius = (1.0 / radius);
		}
		
		var x = 0;
		var y = i * 24;
		prim_list_float32View[y + x] = m_color[0]; x++;		// 0
		prim_list_float32View[y + x] = m_color[1]; x++;		// 1
		prim_list_float32View[y + x] = m_color[2]; x++;		// 2
		prim_list_float32View[y + x] = m_color[3]; x++;		// 3 always empty
		prim_list_float32View[y + x] = m_refl; x++;			// 4
		prim_list_float32View[y + x] = m_diff; x++;			// 5
		prim_list_float32View[y + x] = m_refr; x++;			// 6
		prim_list_float32View[y + x] = m_refr_index; x++;	// 7
		prim_list_float32View[y + x] = m_spec; x++;			// 8
		prim_list_float32View[y + x] = dummy_3; x++;		// 9
		prim_list_float32View[y + x] = type; x++;			// 10
		prim_list_float32View[y + x] = is_light; x++;		// 11
		prim_list_float32View[y + x] = normal[0]; x++;		// 12
		prim_list_float32View[y + x] = normal[1]; x++;		// 13
		prim_list_float32View[y + x] = normal[2]; x++;		// 14
		prim_list_float32View[y + x] = normal[3]; x++;		// 15 always empty
		prim_list_float32View[y + x] = center[0]; x++;		// 16
		prim_list_float32View[y + x] = center[1]; x++;		// 17
		prim_list_float32View[y + x] = center[2]; x++;		// 18
		prim_list_float32View[y + x] = center[3]; x++;		// 19 always empty
		prim_list_float32View[y + x] = depth; x++;			// 20
		prim_list_float32View[y + x] = radius; x++;			// 21
		prim_list_float32View[y + x] = sq_radius; x++;		// 22
		prim_list_float32View[y + x] = r_radius; x++;		// 23		
	}
}

function raytrace(refreshPrims) {
	var deviceType = useDeviceType;
	var deviceIndex = useDeviceIndex;
	
	//clearing log
	clearLog();
	
	//getting canvas
	canvas = document.getElementById(canvasId);
	
	logMessage("Canvas dimensions: " + $(canvas).width() + " x " + $(canvas).height());
	
	//default values	
	screenWidth = $(canvas).width();
	screenHeight = $(canvas).height();
	
	//auto filling values
	//TO DO: separate window with width and height set in properties
	viewport_x = screenWidth/100.0;
	viewport_y = screenHeight/100.0;
	
	logMessage("Viewport dimensions: " + viewport_x + " x " + viewport_y);
	
	workItemSize = [16,8];
	traceDepth = 5;
	runCount = 1;
	
	if(refreshPrims) {
		//loading primitives
		createPrimList();
	
		//camera default
		camera_x = 0.0;
		camera_y = 0.0;
		camera_z = -7.0;
	}	
	
	logMessage("Started raytrace...");
	
	try {
		console.log(canvas.getContext("2d"));
		
		canvas.width = screenWidth;
		canvas.height = screenHeight;
		var canvasCtx = canvas.getContext("2d");
		var pixels = canvasCtx.getImageData(0,0,screenWidth,screenHeight);
		
		canvasCtx.fillStyle = "rgba(0,0,0,1)";
		canvasCtx.fillRect(0, 0, screenWidth, screenHeight);
		
		//running in webcl
		var devices = WebCLCommon.getDevices(deviceType);
		var chosenDevice = devices[deviceIndex];
		
		//our context is already setup in initWebCL
		//console.log(cl);
		//console.log(canvasCtx);
		
		var imgSize = screenWidth * screenHeight;
		logMessage("Image size: " + imgSize + " pixels (" + screenWidth + " x " + screenHeight + ")");
		
		//creating buffer for imgSize pixels
		//every pixes has 4 chars, char = 1 byte
		var bufSizeImage = imgSize * 4;
		logMessage("Buffer size: " + bufSizeImage + " bytes");
		
		//var bufSizeGlobalPrims = n_primitives * ((3 * 16) + (11 * 4) + (1 * 1));			
		var bufSizeGlobalPrims = n_primitives * 96;
		logMessage("Primitives buffer size: " + bufSizeGlobalPrims + " bytes");
		
		var bufIn = cl.createBuffer(webcl.MEM_READ_ONLY, bufSizeImage);
		var bufOut = cl.createBuffer(webcl.MEM_WRITE_ONLY, bufSizeImage);
		var bufGlobalPrims = cl.createBuffer(webcl.MEM_READ_ONLY, bufSizeGlobalPrims);
				
		//setting kernel args
		clKernel.setArg(0, bufIn);
		clKernel.setArg(1, bufOut);
		
		clKernel.setArg(2, new Uint32Array([screenWidth]));
		clKernel.setArg(3, new Uint32Array([screenHeight]));
		
		clKernel.setArg(4, new Float32Array([parseFloat(camera_x)]));
		clKernel.setArg(5, new Float32Array([parseFloat(camera_y)]));
		clKernel.setArg(6, new Float32Array([parseFloat(camera_z)]));
		
		clKernel.setArg(7, new Float32Array([parseFloat(viewport_x)]));
		clKernel.setArg(8, new Float32Array([parseFloat(viewport_y)]));
		
		clKernel.setArg(9, bufGlobalPrims);
		clKernel.setArg(10, new Int32Array([n_primitives]));
		clKernel.setArg(11, new Uint32Array([bufSizeGlobalPrims]));
		
		//queue in clQueue
		//writing to memory
		clQueue.enqueueWriteBuffer(bufIn, false, 0, bufSizeImage, pixels.data, []);
		clQueue.enqueueWriteBuffer(bufGlobalPrims, false, 0, bufSizeGlobalPrims, prim_list_float32View, []);
		
		//workgroup range
		var localWS = [workItemSize[0], workItemSize[1]];
		var globalWS = [Math.ceil (screenWidth / localWS[0]) * localWS[0], Math.ceil (screenHeight / localWS[1]) * localWS[1]];
		
		logMessage("Workgroup dimensions: " + globalWS.length);
		for(var i = 0; i < globalWS.length; i++) logMessage("Global work item size [" + i + "]: " + globalWS[i]);
		for(var i = 0; i < localWS.length; i++) logMessage("Local work item size [" + i + "]: " + localWS[i]);
						
		logMessage("Scene File: " + sceneFileName + "<br />" + 
				"Device Type: " + chosenDevice.getInfo(webcl.DEVICE_TYPE) + "<br />" +
				"Max Work Group Size: " + chosenDevice.getInfo(webcl.DEVICE_MAX_WORK_GROUP_SIZE) + "<br />" +
				"Compute Units: " + chosenDevice.getInfo(webcl.DEVICE_MAX_COMPUTE_UNITS) + "<br />" +
				"Global Mem Size: " + ((chosenDevice.getInfo(webcl.DEVICE_GLOBAL_MEM_SIZE)/1024)/1024) + " MB<br />" +
				"Local Mem Size: " + (chosenDevice.getInfo(webcl.DEVICE_LOCAL_MEM_SIZE)/1024) + " KB");
		
		var startTime = Date.now();
		
		//execute kernel
		for(var i = 0; i < runCount; i++) {
			clQueue.enqueueNDRangeKernel(clKernel, globalWS.length, [], globalWS, localWS, []);
		}
		
		//read output buffer from device
		clQueue.enqueueReadBuffer(bufOut, false, 0, bufSizeImage, pixels.data, []);
		clQueue.finish();
		
		var endTime = Date.now();
		var runTime = (endTime - startTime)/1000;
		runTime /= runCount;
		
		canvasCtx.putImageData(pixels, 0, 0);
		logMessage("Finished raytracing, runtime: " + runTime.toFixed(3) + "s");
	} catch(e) {
		var log = "Raytracing failed. Error: " + e.message;
		alert(log);
		logMessage(log);
		throw e;
	}
}