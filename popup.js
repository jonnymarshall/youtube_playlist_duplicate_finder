document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', triggerSearchForDupes, false)

  function triggerSearchForDupes () {
    console.log("clicked");
    chrome.tabs.query({currentWindow: true, active: true},
      function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, 'searchForDupes', searchForDupes)
    })
  }

  function searchForDupes (response) {
    console.log("entered searchForDupes");
    console.log(response.length/2);
    const div = document.createElement('div');
    const displayDupesButton = document.createElement('button');
    displayDupesButton.setAttribute("id", "displayDupesButton");
    displayDupesButton.textContent = "Click to view duplicates";
    div.textContent = `${response.length/2} duplicate songs found in playlist`;
    document.body.appendChild(div);
    document.body.appendChild(displayDupesButton);

    // Add listener for new button
    document.getElementById('displayDupesButton').addEventListener('click', triggerDisplayDupes, false)

    function triggerDisplayDupes () {
      console.log("entered triggerDisplayDupes");
      chrome.tabs.query({currentWindow: true, active: true},
        function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {method: 'displayDupes', duplicates: response})
      })
    }
  }
}, false)
