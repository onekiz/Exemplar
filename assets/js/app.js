



var articleList = [];
var searchTerm;

function createRandomArticles () {
  return {
    title: faker.lorem.sentence(),
    text: faker.lorem.paragraphs()
  };
}

// create random articles
for (var i = 0; i < 5; i++) {
  articleList.push(createRandomArticles());
}



// create div variables
var divArticleList = $('#article-list');
var divArticleCurrent = $('#article-current');

// populate article list
function populateArticleList(){

  articleList.forEach((article, index) => {
    var html = "<div class='article-title' value='" + index + "'>";
    html += article.title;
    html += '</div>';

    divArticleList.append(html);
  });
}

// display current article
function displayCurrentArticle (article) {
  var articleID = article.link.split('/')[4];

  var html = '<h4>' + article.title + '</h4>';
  html = html + '<iframe src="'+ article.link+'" ></iframe>';
  // html = html + '<iframe src="https://www.nature.com/articles/'+articleID+'" ></iframe>';
  divArticleCurrent.html(html);
  //console.log(article.link);
}






var config = {
 apiKey: "AIzaSyBMspl9CpK0mjnwum55Jg1r8BH-E_YEt-k",
 authDomain: "exemplar-eadfd.firebaseapp.com",
 databaseURL: "https://exemplar-eadfd.firebaseio.com",
 projectId: "exemplar-eadfd",
 storageBucket: "exemplar-eadfd.appspot.com",
 messagingSenderId: "200572986712"
};
firebase.initializeApp(config);


var ref;

// add click listener to each article title
divArticleList.on('click', '.article-title', function(){
  var currentIndex = $(this).attr('value');
  displayCurrentArticle(articleList[currentIndex]);

        var key = firebase.auth().currentUser.uid;

        var count = 0;
        var day = new Date();
        var postData = {

              paperSearchTerm:searchTerm,
              paperLink: articleList[currentIndex].link,
              paperID: articleList[currentIndex].id,
              paperPublisher: articleList[currentIndex]["sru:recordData"]["pam:message"]["pam:article"]["xhtml:head"]["dc:publisher"],
              paperGenre: articleList[currentIndex]["sru:recordData"]["pam:message"]["pam:article"]["xhtml:head"]["prism:genre"],
              paperISSN: articleList[currentIndex]["sru:recordData"]["pam:message"]["pam:article"]["xhtml:head"]["prism:issn"],
              paperDate: articleList[currentIndex]["sru:recordData"]["pam:message"]["pam:article"]["xhtml:head"]["prism:publicationDate"],
              paperPubName: articleList[currentIndex]["sru:recordData"]["pam:message"]["pam:article"]["xhtml:head"]["prism:publicationName"],
              paperDate: day,
              paperTime: "empty"
              };

        ////////////updating the firebase with new data that clicked paper
        ref = firebase.database().ref("/users/"+key+"/papers/"+day.getTime()+"/" + currentIndex);
        firebase.database().ref("/users/"+key+"/papers/"+day.getTime()+"/" + currentIndex).update(postData);

        /////////////controlling timer and appearance of timer and table///////
        stopwatch.start();
        $(".row").hide();
        $("#wrapper").attr("class", "show");
        window.open(articleList[currentIndex].link);
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////TIMER FOR CLICKED LINK/////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;

//prevents the clock from being sped up unnecessarily
var clockRunning = false;
var converted;
// Our stopwatch object
var stopwatch = {

  time: 0,
  lap: 1,

  reset: function() {

    stopwatch.time = 0;
    stopwatch.lap = 1;

    // DONE: Change the "display" div to "00:00."
    $("#display").html("00:00");

    // DONE: Empty the "laps" div.
    $("#laps").html("");
  },
  start: function() {

    // DONE: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
        intervalId = setInterval(stopwatch.count, 1000);
        clockRunning = true;
    }
  },
  stop: function() {

    // DONE: Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
    clockRunning = false;
  },
  recordLap: function() {

    // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
    //       and save the result in a variable.
    var converted = stopwatch.timeConverter(stopwatch.time);

    // DONE: Add the current lap and time to the "laps" div.
    $("#laps").append("<p>Lap " + stopwatch.lap + " : " + converted + "</p>");

    // DONE: Increment lap by 1. Remember, we can't use "this" here.
    stopwatch.lap++;
  },
  count: function() {

    // DONE: increment time by 1, remember we cant use "this" here.
    stopwatch.time++;

    // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
    //       and save the result in a variable.
     converted = stopwatch.timeConverter(stopwatch.time);
    //console.log(converted);

    // DONE: Use the variable we just created to show the converted time in the "display" div.
    $("#display").html(converted);
  },
  timeConverter: function(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};

/////////stopping timer and pushing time to firebase/////////
$(document).on("click", "#stop", function(){

    ref.once("value", function(user){
      ref.child("paperTime").set(converted);
    });

    stopwatch.stop();
    $("#wrapper").hide();
    $(".row").show();
    stopwatch.time=0;
});




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////listening any change on state of firebase
firebase.auth().onAuthStateChanged(function(user){
  if(user){
    $("#displayName").html(" Welcome " + user.displayName+ " "+user.email);
  }
  else {
    console.log("not logged in");
  }
});

//main reference firebase
// var ref = firebase.database().ref("/users");
//
// // ref.on("value", function(data){
//   var keyz = firebase.auth().currentUser.uid;
//   var dat = data.val();
  //array of all keys - users
  //console.log(Object.keys(dat));
  //selecting logged in user key
  //console.log(dat[keyz]);



$(document).on("click", ".btn.btn-primary.dropdown-toggle.logout", function(){
      event.preventDefault();

      firebase.auth().signOut().then(function() {
              // Sign-out successful. Back to log in page
            window.location = "logIn.html";
            }).catch(function(error) {
              //Handling error
              console.log(error);
            });
});




$(document).on("click","#newButton", function(){

     event.preventDefault();
     searchTerm = $("input").val().trim();
     var comment = $("input").val().trim();
     searchNatureAPI(comment);

   });



//****************************************youtube*************************
 function start() {
        // Initializes the client with the API key and the Translate API.
        gapi.client.init({
          'apiKey': 'AIzaSyDE9ssybqcSunbGxGxv7UC9VquDqzcW8LY',
          'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/translate/v2/rest'],
        }).then(function() {
          // Executes an API request, and returns a Promise.
          // The method name `language.translations.list` comes from the API discovery.
          return gapi.client.language.translations.list({
            q: 'hello world',
            source: 'en',
            target: 'de',
          });
        }).then(function(response) {
          console.log(response.result.data.translations[0].translatedText);
        }, function(reason) {
          console.log('Error: ' + reason.result.error.message);
        });
      };

      // Loads the JavaScript client library and invokes `start` afterwards.
      gapi.load('client', start);

var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'M7lc1UVf-VE',//****************
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }


//search natureAPI
function searchNatureAPI(search){
  var apiURL = 'https://www.nature.com/opensearch/request?httpAccept=application/json&query=' + search;


  var data;
  fetch(apiURL).then(response => {
    return response.json();
  }).then(returnData => {
    console.log(returnData.feed.entry);
    articleList = returnData.feed.entry;
    populateArticleList();
  })



}
