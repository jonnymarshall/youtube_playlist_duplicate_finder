document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', onclick, false)

  function onclick () {
    console.log("clicked");
    chrome.tabs.query({currentWindow: true, active: true},
      function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, 'hi', setCount)
    })
  }

  function setCount (response) {
    const div = document.createElement('div');
    div.textContent = `${response.count} Video matches`;
    document.body.appendChild(div)
  }
}, false)
