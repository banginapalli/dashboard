var s;
var engaude;
$(document).ready(function() {

    $("#engcanvas").click(function(e) {
        var posX = $(this).position().left,
            posY = $(this).position().top;
        //alert( (e.pageX - posX) + ' , ' + (e.pageY - posY));
        //alert(e.pageX + ":" + posX);
        var du = $("#engaud")[0].duration
        var wd = $("#engcanvas").width();
        s = (du / wd);
        setAudTime(e.pageX - posX - 230);
    });
    
    $("#engaud")[0].controls = false;
    drawEngmap();

});

function setAudTime(time_s) {
    $("#engaud")[0].currentTime = parseInt(s * time_s);
    var playpause = $("#playpause");
    playpause.attr("title","pause");
    playpause.html("pause");
    $("#engaud")[0].play();
}

function drawEngmap() {
    var canvas = $("#engcanvas")[0];
    var context = canvas.getContext("2d");
    var base_image = new Image();
    base_image.src = "/img/engmap.png";
    base_image.onload = function() {
        context.drawImage(base_image, 0, 0, 800, 350);
    }
}

function updateProgress() {
   var progress = $("#progress")[0];
   var value = 0;
   if ( $("#engaud")[0].currentTime > 0) {
      value = Math.floor((800 /  $("#engaud")[0].duration) *  $("#engaud")[0].currentTime);
      console.log("value : " + value)
   }
   progress.style.width = value + "px";
}

function togglePlayPause() {
   var playpause = $("#playpause");
   if ($("#engaud")[0].paused || $("#engaud")[0].ended) {
      playpause.attr("title","pause");
      playpause.html("pause");
      $("#engaud")[0].play();
   }
   else {
      playpause.attr("title","play");
      playpause.html("play");
      $("#engaud")[0].pause();
   }
}

function setVolume() {
   var volume = $("#volume")[0];
   $("#engaud")[0].volume = volume.value;
}

$("#engaud")[0].addEventListener("timeupdate", updateProgress, false);
