var gl = null;
var prog = null;

var squareVertexBuffer = null; //The vertex buffer for the square
var squareIndexBuffer = null; // The index buffer for the square
var indices = []; //JavaScript array to store the indices of the square
var vertices = []; //JavaScript array to store the vertices of the square

var c_width = 0;
var c_height = 0;


function glActions() {
	gl = getContext();
	alert(gl.toString()+" obtained");
	initShaderProgram();
	initBuffers();
	drawScene();
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
		return ctx;
	}
}


function initShaderProgram() {
	var fgShader = getShader("shader-fs");
	var vxShader = getShader("shader-vs");

	prog = gl.createProgram();
	gl.attachShader(prog, fgShader);
	gl.attachShader(prog, vxShader);
	
	gl.linkProgram(prog);
	if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
		alert("Could not initialise shaders");
	}
	alert("now use this program");
	gl.useProgram(prog);
	
	prog.vertexPosition = gl.getAttribLocation(prog, "aVertexPosition");
}

function getShader(id) {
	var script = document.getElementById(id);
	if(!script) return null;
	var str="";
	var k = script.firstChild;
	while(k) {
		if(k.nodeType == 3) {
			str += k.textContent;
		}
		k = k.nextSibling;
	}
	var shader;
	if(script.type=="x-shader/x-fragment") {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	}
	else if(script.type=="x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	}
	else return null;
	
	gl.shaderSource(shader, str);
	gl.compileShader(shader);
	
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return null;
    }
    return shader;
}

function initBuffers() {
	vertices =  [
	-0.5,0.5,0.0, 	//Vertex 0
	-0.5,-0.5,0.0, 	//Vertex 1
	0.5,-0.5,0.0, 	//Vertex 2
	0.5,0.5,0.0,]; 	//Vertex 3

	indices = [3,2,1,3,1,0];
	
	//The following code snippet creates a vertex buffer and binds the vertices to it
	squareVertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	
	//The following code snippet creates a vertex buffer and binds the indices to it
	squareIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}

function drawScene(){
	gl.clearColor(0.0, 0.0, 1.0, 1.0);
	gl.enable(gl.DEPTH_TEST);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.viewport(0,0,c_width, c_height);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
	gl.vertexAttribPointer(prog.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(prog.vertexPosition);
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);
	gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT,0);
}