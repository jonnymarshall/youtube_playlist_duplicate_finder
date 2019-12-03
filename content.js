console.log("content.js executed");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request === 'searchForDupes') {
    const playlistSection = document.getElementById("playlist")
    const videoTitlesHTMLElements = playlistSection.querySelectorAll("#video-title");
    const titleStringMatcher = /(^[^,]*)\s-\s([^,]*)/
    const allSongs = []

    console.log(`request is ${request}`);
    console.log(`sender is ${sender}`);
    console.log(`sendResponse is ${sendResponse}`);
    // Create a song object from artist and songTitle
    class Song {
      constructor(htmlObject) {
        this.title = htmlObject.title;
        this.baseURI = htmlObject.baseURI;
      }

      // artist () {
      //   return this.title.match(titleStringMatcher)[1];
      // }

      // song () {
      //   return this.title.match(titleStringMatcher)[2];
      // }
    }

    // Create an array of Song objects for each song in the playlist
    videoTitlesHTMLElements.forEach(function(videoTitlesHTMLElement){
        let song = new Song(videoTitlesHTMLElement);
        allSongs.push(song);
    });

    // Sort songs by artist name in alphabetical order
    allSongs.sort(function(a, b) {
      var nameA = a.title.toUpperCase(); // ignore upper and lowercase
      var nameB = b.title.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    });

    // console.log(allSongs);

    // Test for a match of both artist and title
    function matchTest (songOne, songTwo) {
      return (songOne.title.toUpperCase() === songTwo.title.toUpperCase()) ? true : false;
    }

    // Create an array for duplicate songs
    let duplicates = []

    // Find duplicate songs
    function dupeFinder(allSongs) {
      let count = 0;
      for (let i = 0; i < allSongs.length-1; i++) {
        // console.log(`the count is ${count}`);
        // Check to see if artist and song are identical
        if (matchTest(allSongs[count], allSongs[count+1])) {
          // Return any songs which are identified as a match
          console.log(`${allSongs[count].title} - ${allSongs[count+1].title} matched! Here are the objects:`);
          console.log(allSongs[count]);
          console.log(allSongs[count+1]);
          duplicates.push(allSongs[count]);
          duplicates.push(allSongs[count]);
          count++;
        }
        else {
          count++;
        }
      }
    }

    dupeFinder(allSongs);

    sendResponse(duplicates);
  }
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.method === 'displayDupes') {

    function findDuplicateHTMLElement (duplicate) {
      console.log(`entered findDuplicateHTMLElement, here's the object passed:`);
      debugger
      return document.querySelector(`[baseURI="${duplicate.baseURI}"]`);
    }

    function displayDupes (response) {
      console.log("entered displayDupes");
      const pageManager = document.getElementById("page-manager");
      const resultsDiv = document.createElement('div');
      pageManager.appendChild(resultsDiv);
      DuplicateHTMLElements = []
      request.duplicates.forEach(function(duplicate){
        DuplicateHTMLElements.push(findDuplicateHTMLElement(duplicate));
      })
      DuplicateHTMLElements.forEach(function(duplicate){
        console.log(duplicate);
        resultsDiv.appendChild(duplicate);
      })
    }
    displayDupes();
  }
})

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   const re = new RegExp('Group Therapy', 'gi');
//   const matches = document.documentElement.innerHTML.match(re);
//   sendResponse({count:matches.length});
// })
