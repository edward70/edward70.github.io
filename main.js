"use strict";

var mainwin = document.getElementById('main');
var header = document.getElementById('mainheader');
var startbutton = document.getElementById('startbutton');

// w3schools based code, Make the DIV element draggable:
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0, x = 0, y = 0;
  var header = document.getElementById(elmnt.id + "header");
  header.onmousedown = dragMouseDown;
  header.ontouchstart = dragMouseDown;

  function dragMouseDown(e) {
    elmnt.style.position = "absolute";
    e = e || window.event;
    if (e.cancelable) {
      e.preventDefault();
    }
    // https://stackoverflow.com/questions/41993176/determine-touch-position-on-tablets-with-javascript
    if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
      var touch = e.touches[0] || e.changedTouches[0];
      x = touch.pageX;
      y = touch.pageY;
    } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
      x = e.clientX;
      y = e.clientY;
    }
    // get the mouse cursor position at startup:
    pos3 = x;
    pos4 = y;
    document.onmouseup = closeDragElement;
    document.ontouchend = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    document.ontouchmove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // https://stackoverflow.com/questions/41993176/determine-touch-position-on-tablets-with-javascript
    if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
      var touch = e.touches[0] || e.changedTouches[0];
      x = touch.pageX;
      y = touch.pageY;
    } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
      x = e.clientX;
      y = e.clientY;
      if (e.cancelable) {
        e.preventDefault();
      }
    }
    // calculate the new cursor position:
    pos1 = pos3 - x;
    pos2 = pos4 - y;
    pos3 = x;
    pos4 = y;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.ontouchend = null;
    document.onmousemove = null;
    document.ontouchmove = null;
  }
}

var maintask = document.getElementById('maintask');
window.hideWindow = function (event) {
  event.stopPropagation();
  // reset all window features
  mainwin.classList.remove('spin');  // remove spin animation
  clearTimeout(timeout);  // clear spin cancel timeout to prevent re-instantiation flicker
  timeout = null;  // clear timeout itself so future cancels don't bug
  mainwin.classList.remove('maxed');  // de-maximise window
  max.setAttribute('aria-label', 'Maximize');
  dragElement(mainwin);  // make window draggable (it will be undraggable if previously maximised)
  document.querySelector('[aria-controls="about"]').click();  // return to default panel
  mainwin.setAttribute('hidden', true);  // display window
  maintask.style.display = 'none';  // display taskbar button
}

window.toggleWindow = function (event) {
  event.stopPropagation();
  mainwin.classList.remove('spin');
  clearTimeout(timeout);
  timeout = null;
  if (mainwin.getAttribute('hidden')) {
    mainwin.removeAttribute('hidden');
    maintask.style.background = "#2155bd";
    maintask.style.boxShadow = "0px 0px 2px #333 inset";
  } else {
    mainwin.setAttribute('hidden', true);
    maintask.style.background = "linear-gradient(to bottom,#7fccf3 0%, #0c8dea 12%,#0c8dea 100%) center/cover no-repeat";
    maintask.style.boxShadow = "-3px 0px 2px #045edb inset";
  }
}

var max = document.getElementById('max');
var min = document.getElementById('min');
var close = document.getElementById('close');
var pprop = function (e) {e.stopPropagation();};

max.onmousedown = pprop;
max.ontouchstart = pprop;
min.onmousedown = pprop;
min.ontouchstart = pprop;
close.onmousedown = pprop;
close.ontouchstart = pprop;

window.enlarge = function (event) {
  event.stopPropagation();
  header.onmousedown = null;
  header.ontouchstart = null;
  //header.ontouchend = null;
  //header.ontouchmove = null;
  if (max.getAttribute('aria-label') == 'Maximize') {
    max.setAttribute('aria-label', 'Restore');
    mainwin.classList.add('maxed');
  } else {
    max.setAttribute('aria-label', 'Maximize');
    mainwin.classList.remove('maxed');
    dragElement(mainwin);
  }
};

window.onmouseup = function () {
  startbutton.classList.remove('shadedstart');
};
window.ontouchcancel = window.onmouseup;
window.ontouchend = window.onmouseup;

var timeout = null;
startbutton.onmouseup = function () {
  startbutton.classList.remove('shadedstart');
  if (maintask.style.display == 'none') {
    mainwin.removeAttribute('hidden');
    mainwin.removeAttribute('style');
    maintask.style.display = 'block';
  }
  if (timeout == null) {
    void mainwin.offsetWidth; // trigger reflow (csstricks)
    mainwin.classList.add('spin');
    timeout = setTimeout(function () {
      mainwin.classList.remove('spin');
      timeout = null;
    }, 2000);
  }
};

startbutton.onmousedown = function () {
  startbutton.classList.add('shadedstart');
};
startbutton.ontouchstart = startbutton.onmousedown;

var clock = document.getElementById('clock');
function setTime() {
  var time = new Date();
  clock.textContent = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}
setTime();
setInterval(setTime, 1000);

// credit: https://github.com/botoxparty/XP.css/
function openTab(event, tab) {
  const articles = tab.parentNode.querySelectorAll('[role="tabpanel"]');
  articles.forEach((p) => {
    p.setAttribute("hidden", true);
  });
  const article = tab.parentNode.querySelector(
    `[role="tabpanel"]#${event.target.getAttribute("aria-controls")}`
  );
  if (event.target.getAttribute("aria-controls") == 'portfolio') {
    mainwin.removeAttribute('style');  // recenter window when opening portfolio to prevent overflow
  }
  article.removeAttribute("hidden");
}

// credit: https://github.com/botoxparty/XP.css/
const tabs = document.querySelectorAll("menu[role=tablist]");
for (let i = 0; i < tabs.length; i++) {
  const tab = tabs[i];

  const tabButtons = tab.querySelectorAll("menu[role=tablist] > button");

  tabButtons.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      tabButtons.forEach((button) => {
        if (
          button.getAttribute("aria-controls") ===
          e.target.getAttribute("aria-controls")
        ) {
          button.setAttribute("aria-selected", true);
          openTab(e, tab);
        } else {
          button.setAttribute("aria-selected", false);
        }
      });
    })
  );
}

dragElement(mainwin);
