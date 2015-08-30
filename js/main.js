window.onload = function (){
  // DOM's loaded, time for some functionality
    var addEvent = (function () {
  	var filter = function(el, type, fn) {
  		for ( var i = 0, len = el.length; i < len; i++ ) {
  			addEvent(el[i], type, fn);
  		}
  	};
  	if ( document.addEventListener ) {
  		return function (el, type, fn) {
  			if ( el && el.nodeName || el === window ) {
  				el.addEventListener(type, fn, false);
  			} else if (el && el.length) {
  				filter(el, type, fn);
  			}
  		};
  	}
  	return function (el, type, fn) {
  		if ( el && el.nodeName || el === window ) {
  			el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
  		} else if ( el && el.length ) {
  			filter(el, type, fn);
  		}
  	};
  })();

  hasClass = function (el, cl) {
      var regex = new RegExp('(?:\\s|^)' + cl + '(?:\\s|$)');
      return !!el.className.match(regex);
  };

  addClass = function (el, cl) {
      el.className += ' ' + cl;
  };

  removeClass = function (el, cl) {
      var regex = new RegExp('(?:\\s|^)' + cl + '(?:\\s|$)');
      el.className = el.className.replace(regex, ' ');
  };

  toggleClass = function (el, cl) {
      hasClass(el, cl) ? removeClass(el, cl) : addClass(el, cl);
  };

  $ = function(selector) {
    return document.querySelectorAll(selector);
  };

  var offScreenMenu = $(".offscreen-menu")[0];
  var menuBar = $(".top-right")[0];

  function showMenu(targetLeftPosition, duration) {
    offCanvas = false
    var targetLeftPosition,
        startLeftPosition = offScreenMenu.offsetLeft,
        menuBarLeftPos = menuBar.offsetLeft,
        duration;
    var startTime = new Date();
    var intervalToken = setInterval(function() {
      var currentTime = new Date();
      var currentDuration = currentTime - startTime;
      if (currentDuration > duration) {
        clearInterval(intervalToken);
      } else {
        var percentageProgress = currentDuration/duration;
        var position = (startLeftPosition + (targetLeftPosition - startLeftPosition)*percentageProgress);
        offScreenMenu.style.left = position + "px";
        // now animate the left menu icon to the left too
          if (menuBarLeftPos >= position) {
            menuBar.style.left = position + "px";
          }
      }
    }, 1);
  }

  // Time to use that functionality
  var hamburger = $(".hamburger"),
    isClosed = false;

  addEvent(hamburger[0], 'click', function(){
    if (isClosed == true) {
      removeClass(this, 'is-closed');
      addClass(this, 'is-open');
      isClosed = false;
    } else {
      removeClass(this, 'is-open');
      addClass(this, 'is-closed');
      isClosed = true;
    }
  });

  var form = $("form")[0]
  addEvent(form, 'submit', function(event) {
    var username = $("#user")[0].value;
    var pass = $("#pass")[0].value;

    if (username == "bad") {
      addClass(form, "invalid");
      event.preventDefault();
      return false;
    } else {
      removeClass(form, "invalid");
      return true;
    }
  })

  addEvent(menuBar, 'click', function(){
    if ( isClosed == true) {
      showMenu(111, 300);
      offCanvas = false;
    } else {
      showmenu(180, 300);
      offCanvas = true;
    }
  })

  var eye = $(".blink");
  var pass = $("#pass");
  addEvent(eye, 'click', function(){
    pass.type ? 'text' : 'password'
  });

}
