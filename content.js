console.log("content.js executed");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const playlistSection = document.getElementById("playlist")
  const videoTitlesHTMLElements = playlistSection.querySelectorAll("#video-title");
  const titleStringMatcher = /(^[^,]*)\s-\s([^,]*)/
  const allSongs = []

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
        const duplicateOne = document.querySelector(`[baseURI="${allSongs[count].baseURI} - ${allSongs[count+1].baseURI}"]`);
        const duplicateTwo = document.querySelector(`[baseURI="${allSongs[count+1].baseURI} - ${allSongs[count+1].baseURI}"]`);
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

  console.log(duplicates);

  sendResponse({count:duplicates.length/2});

})

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   const re = new RegExp('Group Therapy', 'gi');
//   const matches = document.documentElement.innerHTML.match(re);
//   sendResponse({count:matches.length});
// })
