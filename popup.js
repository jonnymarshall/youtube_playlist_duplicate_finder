document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', triggerSearchForDupes, false)

  function triggerSearchForDupes () {
    console.log("clicked");
    chrome.tabs.query({currentWindow: true, active: true},
      function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, 'hi', searchForDupes)
    })
  }

  function searchForDupes (response) {
    console.log("entered searchForDupes");
    const div = document.createElement('div');
    const displayDupesButton = document.createElement('button');
    displayDupesButton.setAttribute("id", "displayDupesButton");
    displayDupesButton.textContent = "Click to view duplicates"
    div.textContent = `${response.count} duplicate songs found in playlist`;
    document.body.appendChild(div);
    document.body.appendChild(displayDupesButton);

    // Add listener for new button
    document.querySelector('button').addEventListener('click', triggerDisplayDupes, false)

    function triggerDisplayDupes () {
    console.log("entered triggerDisplayDupes");
    chrome.tabs.query({currentWindow: true, active: true},
      function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, 'hi', displayDupes)
    })
  }
  }

  // function displayDupes (response) {
  //   console.log("entered displayDupes");
  //   const pageManager = document.getElementById("page-manager");
  //   const resultsDiv = document.createElement('div');
  //   const h1 = document.createElement('h1');
  //   pageManager.appendChild(resultsDiv);
  //   resultsDiv.appendChild(h1);
  //   h1.innerText = "HELLO WORLD";
  // }

}, false)
