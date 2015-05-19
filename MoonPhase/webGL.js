var gl = null;
var c_width = 0;
var c_height = 0;

function webGLMain() {
	gl = getContext();
	glActions(gl);
}

function getContext() {
	var canvas = document.getElementById("canvas");
	if(canvas == null) {
		alert("no canvas found");
		return;
	}
	var names = ["webgl",
		"experimental-webgl",
		"webkit-3d",
		"moz-webgl"];
	var ctx = null;
	for(var i=0;i<names.length;i++) {
		try {
			ctx = canvas.getContext(names[i]);
		}
		catch(e) {}
		if(ctx) break;
	}
	if(ctx == null) { alert("webGL not found"); }
	else {
		alert("webGL found");
		return ctx;
	}
}


function glActions(gl) {
	
	initGL(gl);
	initShaders();
	initBuffers();
	initTexture();
	gl.clearColor(0.3, 0.7, 0.3, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.viewport(0,0,c_width,c_height);
	
	tick();
}

function tick() {
    requestAnimFrame(tick);
    drawScene();
 }