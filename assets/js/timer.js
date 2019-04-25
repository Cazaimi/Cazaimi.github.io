function getDate () {
  var dateObj = new Date(),
    time = dateObj.toLocaleTimeString();

  return time;
}

function displayDate () {
  var time = getDate(),
    p = document.getElementById('timerText');

  p.innerHTML = time;

  return;
}

function setUpTimer () {
  window.setInterval(displayDate, 1000);
}

function init() {
  setUpTimer();
}

init();