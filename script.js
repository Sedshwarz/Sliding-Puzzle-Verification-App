var verify = document.getElementById("verify");
var blackout = document.querySelector(".blackout");
var wrap = document.querySelector(".wrap");
var x = document.getElementById("x");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var stick = document.querySelector(".stick");
var box = document.querySelector(".box");
var inst = document.querySelector(".inst");
var refresh = document.querySelector("#refresh");
var piece = document.getElementById("piece");
var target = document.getElementById("target");
var line = document.querySelector(".line");
var text = document.getElementById("text");
var images = ["elpaso.jpg","austin.jpg","houston.jpg"];
var control = true;



verify.onclick = function(){
  blackout.classList.add("opacity");
  wrap.style.opacity = "1";
  wrap.style.pointerEvents = "auto";

  if (control == true) {
    newPuzzle();
  }
}

x.onclick = function(){
  blackout.classList.remove("opacity");
  wrap.style.opacity = "0";
  wrap.style.pointerEvents = "none";
  control = false;
}


var img;

function newPuzzle(){
  images = images.sort(() => Math.random() - 0.5);
  img = new Image();
  img.src = images[0];
  img.onload = function(){
    ctx.drawImage(img, 0,0,300,200);
    setPiece();
  }
}




var mTop,mLeft;

function setPiece(){
  mTop = Math.floor(Math.random() * 146) - 5;
  mLeft = Math.floor(Math.random() * 146) + 100;


  var c = document.createElement("canvas");
  var cx = c.getContext("2d");
  c.width = 55; c.height = 55;

  try {
    var imgData = ctx.getImageData(mLeft, mTop, 55, 55);
    cx.putImageData(imgData, 0, 0);

    var dataUrl = c.toDataURL();
    piece.style.background = "url(" + dataUrl + ")";
    piece.style.backgroundRepeat = "no-repeat";
    piece.style.backgroundSize =  "cover";
    piece.style.backgroundPosition = "center";
  } catch (e) {
    alert("The piece copies the target only on online or localhost");
  }


  line.style.marginTop = mTop + "px";
  target.style.marginLeft = mLeft + "px";
  c.remove();
  img.remove();
}






dragElement(box);

var diff;

function dragElement(elmnt) {
  var pos1 = 0, pos3 = 0;
  elmnt.onmousedown = dragMouseDown;


  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    pos3 = e.clientX;
    document.onmousemove = mMove;
    document.onmouseup = closeDragElement;
    inst.classList.add("fade");
  }


  function mMove(e) {
    e = e || window.event;
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos3 = e.clientX;

    elmnt.style.marginLeft = (elmnt.offsetLeft - pos1) + "px";
    diff = elmnt.offsetLeft - pos1;

    if (diff<0) {
      elmnt.style.marginLeft = "0px";
      diff = 0;
    }else if (diff>246) {
      elmnt.style.marginLeft = "246px";
      diff = 246;
    }
    piece.style.marginLeft = elmnt.style.marginLeft;
  }


  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    if ((mLeft - diff <= 5 && mLeft - diff >= 0) || (diff - mLeft <= 5 && diff - mLeft >= 0)) {
      verified();
    }else {
      elmnt.style.transition = "margin-left 0.32s ease";
      piece.style.transition = "margin-left 0.32s ease";
      elmnt.style.marginLeft = "0px";
      piece.style.marginLeft = "0px";
      setTimeout(function(){elmnt.style.transition = "margin-left 0s"; piece.style.transition = "margin-left 0s";},330);
    }

    inst.classList.remove("fade");
  }

}




function verified(){
  line.style.opacity = "0";
  canvas.classList.add("glim");
  box.style.marginLeft = "0px"; diff = 0;
  text.innerHTML = "<font style='color:#09a254;'>Verified ✔</font>";
  wrap.style.pointerEvents = "none";

  setTimeout(function(){
    wrap.style.opacity = "0";
    canvas.classList.remove("glim");
    piece.style.marginLeft = "0px";
    target.style.marginLeft = "0px";
    control = true;
    setTimeout(function(){
      blackout.classList.remove("opacity");
      text.innerHTML = "Security Verification";
      line.style.opacity = "1";
    },500);
  },2000);
}


refresh.onclick = newPuzzle;
