Array.prototype.pick = function() { return this[Math.floor(Math.random()*this.length)]; }
Array.prototype.shuffle = function() {
	var currentIndex = this.length, temporaryValue, randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = this[currentIndex];
		this[currentIndex] = this[randomIndex];
		this[randomIndex] = temporaryValue;
	}
	return this;
}

var DEFAULT_COPY = "just\r\nstart\r\ntyping\r\n(enter & backspace work)";
var copy = "";
var copyColor = "#A53D18";
var bgColor = "#ffe064";
var bgColor2 = bgColor;
var PAUSED = false;
var copyColors = new Array(copyColor); // to match the default load state

$(window).keypress(function(e){
	if (PAUSED) return; 
	if (e.which == 13) {
		copy += "\r\n";
		// add a new copy color
		copyColors.push(copyColor);
	}
	else if ((e.which >= 32 && e.which <=126))
			copy += String.fromCharCode(e.which).toUpperCase();
	renderBun(copy);
	document.getElementById('mobileKeyboardKludge').value = "Tap here to type";
	if (e.which == 32) e.preventDefault();
});		

$(window).keydown(function(e) {
	if (!PAUSED && e.which == 8) e.preventDefault();
});

$(window).keyup(function(e){
	if (!PAUSED && e.which == 8 && copy.length > 0) {
		// remove a copy color if necessary
		if (copy.endsWith("\r\n"))
			copyColors.pop();		
		copy = copy.slice(0, -1);
		renderBun(copy);
	}
	document.getElementById('mobileKeyboardKludge').value = "Tap here to type";
});		

function renderBun(s) {
	if (s == "") s = DEFAULT_COPY;
	var bunTopHTML = '<div id="bun-top"><img src="images/bun-top.png" style="width:100%;padding-bottom:.2em"></div>';		
	var	bunBottomHTML = '<div id="bun-bottom"><img src="images/bun-bottom.png" style="width:100%"></div>';
	var lines = s.split("\r\n")
	var copyHTML = ""
	copyHTML += bunTopHTML;
		copyHTML += "<div style=''>";
	for (var i=0; i<lines.length; i++) {
		var col = copyColors[i];
		copyHTML += '<span class="hsjs" style="color:' + col + '">'; 
		copyHTML += lines[i];
		copyHTML += '</span>';
	}
	copyHTML += "</div>";
	copyHTML += bunBottomHTML;
	$('#main').html(copyHTML);
	$().hatchShow();   
}

async function shareImage() {
	html2canvas(document.getElementById("bun"),{backgroundColor:bgColor,allowTaint:true}).then(function(canvas) {
		canvas.toBlob(function(blob) { 
			const filesArray = [
			new File(
			  [blob],
			  'bun.png',
			  {
				type: "image/png",
				lastModified: new Date().getTime()
			  }
			)
			];
			const shareData = {
			files: filesArray,
			};
			navigator.share(shareData);
		}, 'image/png');
	});
}

function renderImage() {
	html2canvas(document.getElementById("bun"),{backgroundColor:bgColor,allowTaint:true}).then(function(canvas) {
		var $overlay = $('<div id="overlay"></div>');
		var $image = $("<img>");
		var imageLocation = canvas.toDataURL('image/png');

		$overlay.append($image);
		$image.attr("src", imageLocation);
		$("body").append($overlay);
		$overlay.show();

		//When overlay is clicked
		$overlay.click(function(){
		  $overlay.hide();
		});
	});
}

function downloadImage() {
	html2canvas(document.getElementById("bun"),{backgroundColor:bgColor,allowTaint:true}).then(function(canvas) {
				var a = $("<a>")
				.attr("href", canvas.toDataURL('image/png'))
					.attr("download", "bun.png")
				.appendTo("body");
				a[0].click();
				a.remove();
	});
}

function keyboardFocus() {
	var $htmlOrBody = $('html, body');
	$htmlOrBody.scrollTop(0);
}

function randomizeColors() {
	var variation = ['default','pastel','soft','light','hard','pale'].pick();
	var hue = Math.floor(Math.random() * 361);
	var scheme = new ColorScheme;
	scheme.from_hue(hue)        
		.scheme('contrast')
	.distance(0.1)
	.variation(variation);

	var colors = scheme.colors();

	if (advMode) {
		if (Math.random() > 0.5) colors.shuffle();
		var bg1 = colors.pop();
		var bg2 = bg1;
		if (Math.random() > 0.5) bg2 = colors.pop();

		// Kludge for default copy
		if (copy.length <= 0) {
			copy = DEFAULT_COPY;
			copyColors = new Array(copyColor,copyColor,copyColor,copyColor);
		}

		var textCol = colors.pop(); 		
		for (var i=0;i<copyColors.length;i++) {
			copyColors[i] = textCol;
			if (Math.random() > 0.6 && colors.length>0) textCol = colors.pop();
		}
	
		updateBGColor('#'+bg1);
		updateBGColor2('#'+bg2);
		//updateTextColor('#'+textCol);
		//updateTextColor2('#'+textCol);
		console.log(document);
		document.getElementById('bgColorPicker').jscolor.fromString('#'+bg1);
		document.getElementById('bgColorPicker').jscolor.fromString('#'+bg2);
		document.getElementById('textColorPicker').jscolor.fromString('#'+textCol);
		document.getElementById('textColorPicker2').jscolor.fromString('#'+textCol);
		
		renderBun(copy);
		// Reset for the default 
		if (copy == DEFAULT_COPY) {
			copy = "";
			copyColors = new Array(textCol);
		}
		copyColor = textCol;
	}
	else {
		colors.shuffle();
		var bg = colors.pop();
		var tx = colors.pop();
		document.getElementById('bgColorPicker').jscolor.fromString('#'+bg);
		document.getElementById('textColorPicker').jscolor.fromString('#'+tx);
		updateBGColor('#'+bg);
		updateTextColor('#'+tx);
	
		/*
		var offset1 = Math.floor(Math.random() * 4);
		var offset2 = Math.floor(Math.random() * 4);
		var offset3 = Math.floor(Math.random() * 3);
		var start1 = 0;
		var start2 = 4;
		if (Math.random() > 0.5) {
			start1 = 4;
			start2 = 0;
		}
		document.getElementById('bgColorPicker').jscolor.fromString('#'+colors[start1+offset1]);
		document.getElementById('textColorPicker').jscolor.fromString('#'+colors[start2+offset1]);
		updateBGColor('#'+colors[start1+offset1]);
		updateTextColor('#'+colors[start2+offset1]);
		*/
	}
}
function alertHello(what) {
	console.log(what);
	alert("Hello! "+what);
}

function updateBGColor(color) {
	bgColor = color;
	$('mobileKeyboardKludge').css('color',color);
	document.getElementById('bun').style.removeProperty('background-color');
	document.getElementById('bun').style.removeProperty('background');
	$('body').css('background-color', color);
	$('bun').css('background',color);
	$('bun').css('background-color', color);
	document.getElementById('containerTop').style.background = color; 
	// document.getElementById('bgColorPicker2').jscolor.fromString('#'+color);
	// document.getElementById('bgColorPicker2').innerHTML="Add Background Gradient";
	document.getElementById('bgColorPicker').innerHTML="Pick Background Color";
}

function updateBGColor2(color) {
	if (bgColor != color) 
		document.getElementById('bgColorPicker2').innerHTML="Set Background Gradient";
	document.getElementById('bgColorPicker').innerHTML="Reset Background Color";
	bgColor2 = color;
	var cssText = "";
	//cssText += '-linear-gradient(to-bottom, ' + bgColor + ' 0%, ' + bgColor2 + ' 100%);'; 
	cssText += '-webkit-linear-gradient(top, ' + bgColor + ' 0%, ' + bgColor2 + ' 100%)'; 
	//cssText += '-moz-linear-gradient(top, ' + bgColor + ' 0%, ' + bgColor2 + ' 100%);'; 
	document.getElementById('bun').style.background = cssText; 
	document.getElementById('containerTop').style.background = cssText; 
	document.getElementById('bun').style.filter = 'progid:DXImageTransform.Microsoft.gradient( startColorstr="'+bgColor+'", endColorstr="'+bgColor2+'",GradientType=0'; 
	document.getElementById('containerTop').style.filter = 'progid:DXImageTransform.Microsoft.gradient( startColorstr="'+bgColor+'", endColorstr="'+bgColor2+'",GradientType=0'; 
	document.body.style.backgroundColor = bgColor2; 
}

function updateTextColor(color) {
	copyColor = color;
	for (i=0;i<copyColors.length;i++)
		copyColors[i] = color;
	$('.hsjs').css("color",color);
	document.getElementById('textColorPicker2').jscolor.fromString('#'+color);
}

function updateTextColor2(color) {
	copyColor = color;
	copyColors[copyColors.length-1] = color;
	if (copy.length > 0) renderBun(copy);
}

var advMode = false;
function changeMode() {
	if (!advMode) {
		$('.advanced').show();
		document.getElementById('modeButton').innerHTML="<span class='emoji'>&#x1F308</span> Basic Mode";
		document.getElementById('textColorPicker').innerHTML="Reset Text Color";
	}
	else {
		$('.advanced').hide();
		document.getElementById('modeButton').innerHTML="<span class='emoji'>&#x1F525</span> Extra Toppings";
		document.getElementById('bgColorPicker').innerHTML="Pick Background Color";
		document.getElementById('textColorPicker').innerHTML="Pick Text Color";
	}
	advMode = !advMode;
}

function pause() {
	PAUSED = true;
}

function resume() {
	PAUSED = false;
}

function getUrlParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

$(window).load(function(){
	// querystring
	if (window.location.search.length>0) {
		var q = getUrlParameter("bun").split("|");
		if (q.length>0) {
			for (i=0;i<q.length;i++) {
				copy += q[i];
				if (i<q.length-1) copy += "\r\n";
			}
			if (getUrlParameter("bgcolor")!='') {		    
				var c = getUrlParameter("bgcolor");
				updateBGColor('#'+c);
				document.getElementById('bgColorPicker').jscolor.fromString('#'+c);
				document.getElementById('bgColorPicker2').jscolor.fromString('#'+c);
			}
			if (getUrlParameter("textcolor")!='') {
				var c = getUrlParameter("textcolor");
				updateTextColor('#'+c);
				for (var i=0;i<q.length;i++)
					copyColors.push(c);				
				document.getElementById('textColorPicker').jscolor.fromString('#'+c);
				document.getElementById('textColorPicker2').jscolor.fromString('#'+c);
			}
			renderBun(copy);
			if(getUrlParameter("render")) {
				if (/Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)){$('.mobileShow').css('display','block');}
				$().hatchShow();
				renderImage();
			}
		}
	}
	if (/Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)){$('.mobileShow').css('display','block');}
	$().hatchShow();
});		
$(window).resize(function(){
	renderBun(copy);
});
$( document ).ready(function() {
	// See if sharing is supported
	if (navigator.share) {	$('#sharer').css('display','block'); }
});
jQuery.fn.hatchShow = function(){
  $('.hsjs').css('display','inner-block').css('white-space','pre').each(function(){
	var t = $(this);
	var l = t.html().length;
	if (l > 0)
	{
		var pw = t.parent().width();
		var lastF = 0;
		while( t.width() < pw ){lastF = t.fontSize();t.css('font-size', (t.fontSize()+1)+"px"),
			function(){while( t.width() > pw ){t.css('font-size', (t.fontSize()-.1)+"px")}};
			if (lastF == t.fontSize()) {t.html("error: bunification failed.");break;}
		};
		while( t.width() > pw ){t.css('font-size', (t.fontSize()-1)+"px"),
		  function(){while( t.width() > pw ){t.css('font-size', (t.fontSize()+.1)+"px")}};
		};
		t.wrap("<span class='hatchshow_temp' style='display:block;margin-bottom:0.2em;line-height:" + t.fontSize()*.5 + "px;height:" + t.fontSize()*.7 + "px;'>");
	}
  }).css('visibility','visible');
};
jQuery.fn.fontSize = function(){return parseInt($(this).css('font-size').replace('px',''));};