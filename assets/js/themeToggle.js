var lightIcon = '/assets/images/logos/luke.svg', 
  darkIcon = '/assets/images/logos/darth.svg',
  dark = 'dark',
  light = 'light',
  icons = {
    dark: {
      twitter: 't-d.png',
      github: 'gh-d.png',
      linkedin: 'li-d.png',
      youtube: 'yt-d.png',
      email: 'email-d.svg',
      backArrow: 'back-d.svg'
    },
    light: {
      twitter: 't-l.png',
      github: 'gh-l.png',
      linkedin: 'li-l.png',
      youtube: 'yt-l.png',
      email: 'email-l.svg',
      backArrow: 'back-l.svg'
    }
  }

function setImageOnClick () {
  var img = document.getElementById('themeImage'),  
    link = document.getElementById('themeLink');

  link.onclick = function (e) {
    var theme = !img.src.includes(darkIcon.slice(2)) ? dark : light;

    switchTheme(theme, img);
  };
}

function switchTheme (theme, img) {
  var links = getLinkTags(),
    darkThemeLink = '/assets/css/darkTheme.css',
    lightThemeLink = '/assets/css/lightTheme.css';

  return Object.keys(links).forEach(function (link) {
    var currentLink = links[link],
      href = currentLink.href;

    if (href.indexOf('Theme') === -1) { 
      return; 
    }

    if (theme === light) {
      img.src = lightIcon;
      currentLink.href = lightThemeLink;

      setTheme(light);
      switchIconColor(light);
    }
    else {
      img.src = darkIcon;
      currentLink.href = darkThemeLink;

      setTheme(dark);
      switchIconColor(dark);
    }

    return;
  });
}

function getLinkTags () {
  var links = document.getElementsByTagName('link');

  return links;
}

function getTheme () {
  var theme = localStorage.getItem('theme');

  // default theme is always dark.
  return theme ? theme : dark;
}

function setTheme (theme) {
  localStorage.setItem('theme', theme);
}

function switchIconColor (theme) {
  var contactIcons = document.getElementsByClassName('contactIcon'),
    backArrowIcon = document.getElementById('backImage'),
    baseUrl = '/assets/images/logos/'

  // No switching required if there are no contact icons 
  // in the page. 
  if (Object.keys(contactIcons).length) {
    Object.keys(contactIcons).forEach(function (key) {
      switch (contactIcons[key].id) {
        case 'twitterIcon':
          contactIcons[key].src = baseUrl.concat(icons[theme].twitter);
          break;
        case 'githubIcon':
          contactIcons[key].src = baseUrl.concat(icons[theme].github);
          break;
        case 'linkedinIcon':
          contactIcons[key].src = baseUrl.concat(icons[theme].linkedin);
          break;
        case 'youtubeIcon':
          contactIcons[key].src = baseUrl.concat(icons[theme].youtube);
          break;
        case 'emailIcon':
          contactIcons[key].src = baseUrl.concat(icons[theme].email);
          break; 
      }
    });
  }

  if (backArrowIcon) {
    backArrowIcon.src = baseUrl.concat(icons[theme].backArrow);
  }
}

function init () {
  setImageOnClick();
  
  var theme = getTheme() === dark ? dark : light,
    img = document.getElementById('themeImage');

  switchTheme(theme, img)
}

init();