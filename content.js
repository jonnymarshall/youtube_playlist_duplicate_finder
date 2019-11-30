console.log("content.js executed");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const playlistSection = document.getElementById("playlist")
  const videoTitlesHTMLElements = playlistSection.querySelectorAll("#video-title");
  const videoTitleStripped = []
  const titleStringMatcher = /(^[^,]*)\s-\s([^,]*)/
  const allMatchedSongs = []

  class Song {
    constructor(artist, songTitle) {
      this.artist = artist;
      this.title = songTitle;
    }

    sayHi() {
      console.log(`The artist is ${this.artist}, the title is ${this.title}`);
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
      allMatchedSongs.push(song);
    }
  });


  // sort by name
  allMatchedSongs.sort(function(a, b) {
    var nameA = a.artist.toUpperCase(); // ignore upper and lowercase
    var nameB = b.artist.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  });

  console.log(allMatchedSongs);

  sendResponse({count:videoTitleStripped.length});

})

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   const re = new RegExp('Group Therapy', 'gi');
//   const matches = document.documentElement.innerHTML.match(re);
//   sendResponse({count:matches.length});
// })
