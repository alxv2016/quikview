function Plugin() {
  window.onmessage = (e) => console.log('UI LOG', e.data.pluginMessage);
  parent.postMessage({pluginMessage: `ui.html: ${Date.now()}`}, '*');

  return (
    <main>
      <img src={require('../assets/logo.svg')} />
      <h2>Rectangle Creator</h2>
    </main>
  );
}

export default Plugin;
