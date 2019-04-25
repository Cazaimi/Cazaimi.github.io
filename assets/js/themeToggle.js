function setImageOnClick () {
  var img = document.getElementById('themeImage'),  
    link = document.getElementById('themeLink');

  console.log(img, link);

  link.onclick = function (e) {
    switchTheme(img);
  };
}

function switchTheme (img) {
  var links = getLinkTags(),
    darkThemeLink = './assets/css/darkTheme.css',
    lightThemeLink = './assets/css/lightTheme.css';

  console.log('links, Object.keys(links):', links, Object.keys(links));

  return Object.keys(links).forEach(function (link) {
    var currentLink = links[link],
      href = currentLink.href;

    console.log('href:', href);
    console.log('href.indexOf(Theme):', href.indexOf('Theme'));

    if (href.indexOf('Theme') === -1) { console.log('here');
     return; }

    var dark = href.indexOf('dark') !== -1;

    if (dark) {
      img.src = './assets/images/logos/luke.svg';
      currentLink.href = lightThemeLink;
    }
    else {
      img.src = './assets/images/logos/darth.svg';
      currentLink.href = darkThemeLink;
    }

    console.log('href, links:', href, links);

    return;
  });
}

function getLinkTags () {
  var links = document.getElementsByTagName('link');

  return links;
}

function init () {
  setImageOnClick();
  // getLinkTags();
}

init();