/*function shaderProgram(gl, vs, fs) {
	var prog = gl.createProgram();
	var addshader = function(type, source) {
		var s = gl.createShader((type == 'vertex') ?
			gl.VERTEX_SHADER : gl.FRAGMENT_SHADER);
		gl.shaderSource(s, source);
		gl.compileShader(s);
		if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
			throw "Could not compile "+type+
				" shader:\n\n"+gl.getShaderInfoLog(s);
		}
		gl.attachShader(prog, s);
	};
	addshader('vertex', vs);
	addshader('fragment', fs);
	gl.linkProgram(prog);
	if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
		throw "Could not link the shader program!";
	}
	return prog;
}
*/

function attributeSetFloats(gl, prog, attr_name, rsize, arr) {
	gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arr),
		gl.STATIC_DRAW);
	var attr = gl.getAttribLocation(prog, attr_name);
	gl.enableVertexAttribArray(attr);
	gl.vertexAttribPointer(attr, rsize, gl.FLOAT, false, 0, 0);
}

function getContext() {
	var canvas = document.getElementById("canvas");
	if(canvas == null) {
		alert("no canvas found"); return;
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
	else return ctx;
}

function getShader(gl, id) {
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

function initShaderProgram(gl) {
	var fShader = getShader(gl, "shader-fs");
	var vShader = getShader(gl, "shader-vs");
	
	
	var prog = gl.createProgram();
	gl.attachShader(prog, fShader);
	gl.attachShader(prog, vShader);
	
	gl.linkProgram(prog);
	if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
		alert("Could not initialise shaders");
	}
	alert("now use this program");
	gl.useProgram(prog);	
	return prog;
}

function createVertexArray() {
	var arr = [0,0,0];
	for(var i=0;i<=100;i++) {
		var x,y,z;
		x = Math.sin(3.14159*2*i/100);
		arr.push(x);
		y = Math.cos(3.14159*2*i/100);
		arr.push(y);
		z = 0;
		arr.push(z);
		
	}
	return arr;
}

function draw() {
	try {
		var gl = getContext();
		if (!gl) { throw "x"; }
	} catch (err) {
		throw "Your web browser does not support WebGL!";
	}
	gl.clearColor(0.0, 0.0, 0.0, 1);
	gl.clear(gl.COLOR_BUFFER_BIT);

	var prog = initShaderProgram(gl);

	var arr = createVertexArray();
	
	attributeSetFloats(gl, prog, "pos", 3, arr);
	
	gl.drawArrays(gl.TRIANGLE_FAN, 0, 102);
}

function init() {
	try {
		draw();
	} catch (e) {
		alert("Error: "+e);
	}
}
setTimeout(init, 100);
