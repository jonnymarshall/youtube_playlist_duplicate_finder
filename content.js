console.log("content.js executed");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const playlistSection = document.getElementById("playlist")
  const videoTitlesHTMLElements = playlistSection.querySelectorAll("#video-title");
  const videoTitleStripped = []
  const titleStringMatcher = /(^[^,]*)\s-\s([^,]*)/
  const allSongs = []

  class Song {
    constructor(artist, songTitle) {
      this.artist = artist;
      this.title = songTitle;
    }

    validInfoTest() {
      return (this.artist && this.title) ? true : false;
    }
  }


  videoTitlesHTMLElements.forEach(function(videoTitlesHTMLElement){
    videoTitleStripped.push(videoTitlesHTMLElement.title);
  });

  videoTitleStripped.forEach(function(videoTitlesHTMLElement){
    if (titleStringMatcher.test(videoTitlesHTMLElement)){
      const artist = videoTitlesHTMLElement.match(titleStringMatcher)[1];
      const songTitle = videoTitlesHTMLElement.match(titleStringMatcher)[2];
      let song = new Song(artist, songTitle);
      allSongs.push(song);
    }
  });

  // Sort by name
  allSongs.sort(function(a, b) {
    var nameA = a.artist.toUpperCase(); // ignore upper and lowercase
    var nameB = b.artist.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  });

  console.log(allSongs);

  // Test for a match
  function matchTest (artistOrTitleSongOne, artistOrTitleSongTwo) {
    let artistTest = (artistOrTitleSongOne.artist.toUpperCase() === artistOrTitleSongTwo.artist.toUpperCase()) ? true : false;
    let titleTest = (artistOrTitleSongOne.title.toUpperCase() === artistOrTitleSongTwo.title.toUpperCase()) ? true : false;
    // console.log(`last detected sog was ${artistOrTitleSongOne.artist} - ${artistOrTitleSongOne.title}`);
    return (artistTest && titleTest) ? true : false;
  }

  // Iterate over all Song objects
  function dupeFinder(allSongs) {
    let count = 0;
    for (let i = 0; i < allSongs.length-1; i++) {
      console.log(`the count is ${count}`);
      // Check to see if there is valid artist and song name for two tracks to be compared
      if (allSongs[count].validInfoTest && allSongs[count+1].validInfoTest) {
        // Check to see if artist and song are identical
        if (matchTest(allSongs[count], allSongs[count+1])) {
          // Reeturn any songs which are identified as a match
          console.log(`${allSongs[count].artist} - ${allSongs[count].title} matched! Here are the objects:`);
          console.log(allSongs[count]);
          console.log(allSongs[count+1]);
          count++;
        }
        else {
          count++;
        }
      }
      else {
        count++;
      }
    }
  }

  dupeFinder(allSongs);

  sendResponse({count:videoTitleStripped.length});

})

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   const re = new RegExp('Group Therapy', 'gi');
//   const matches = document.documentElement.innerHTML.match(re);
//   sendResponse({count:matches.length});
// })
