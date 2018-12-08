var canvas = document.getElementById('demo');
var typecanvas = document.getElementById('persontype');
var eyecanvas = document.getElementById('eyecolor');
var ctx = canvas.getContext("2d");
var ctxtype = typecanvas.getContext("2d");
var eyectx = eyecanvas.getContext("2d");

var canvasWidth = 1000;
var canvasHeight = 250;
ctx.height = canvasHeight;
ctx.width = canvasWidth;
//x, y, w, h

function drawBar(x,y,w,h,color) {
    ctx.fillStyle=color;
    ctx.fillRect(x,y,w,h);
    ctx.stroke();
    
}


function drawBarType(x,y,w,h,color) {
    ctxtype.fillStyle=color;
    ctxtype.fillRect(x,y,w,h);
    ctxtype.stroke();
    
}

function drawBarEye(x,y,w,h,color) {
    eyectx.fillStyle=color;
    eyectx.fillRect(x,y,w,h);
    eyectx.stroke();
    
}

drawBar(0, canvasHeight-1,45,-25,"#005E00");
drawBar(65, canvasHeight-1, 45, -50,"#001EFF");
drawBar(135, canvasHeight-1, 45, -25, "#FF530D");

drawBarType(0, canvasHeight-1,45,-25,"#005E00");
drawBarType(65, canvasHeight-1, 45, -50,"#001EFF");

drawBarEye(0, canvasHeight-1, 45, -50,"#001EFF");
drawBarEye(65, canvasHeight-1, 45, -50,"#001EFF");
drawBarEye(135, canvasHeight-1, 45, -25, "#FF530D");