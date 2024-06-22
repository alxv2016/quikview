figma.showUI(__html__, {height: 575, width: 430, title: 'A Figma plugin', themeColors: true});

//Figma api service
figma.ui.onmessage = (message) => {
  console.log('CODE LOG', message);
  // sending a message back to the ui in a half second...
  setTimeout(() => {
    figma.ui.postMessage(`code.js: ${Date.now()}`, {origin: '*'});
  }, 500);
};
