console.log("content.js executed");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const playlistSection = document.getElementById("playlist")
  const videoTitlesHTMLElements = playlistSection.querySelectorAll("#video-title");
  const videoTitleStripped = []

  videoTitlesHTMLElements.forEach(function(videoTitlesHTMLElement){
    videoTitleStripped.push(videoTitlesHTMLElement.title);
  });

  sendResponse({count:videoTitleStripped.length});

})

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   const re = new RegExp('Group Therapy', 'gi');
//   const matches = document.documentElement.innerHTML.match(re);
//   sendResponse({count:matches.length});
// })
