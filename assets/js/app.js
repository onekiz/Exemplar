var articleList = [];
var searchTerm;

// create div variables
var divArticleList = $('#article-list');
var divArticleCurrent = $('#article-current');

// populate article list
function populateArticleList(){
  divArticleList.html("<h4 class='text-center'>Table of Contents</h4>");
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


var timeArray =[];

// add click listener to each article title
divArticleList.on('click', '.article-title', function(){
  var currentIndex = $(this).attr('value');
  displayCurrentArticle(articleList[currentIndex]);

        var key = firebase.auth().currentUser.uid;

        // console.log(articleList[currentIndex]["sru:recordData"]["pam:message"]["pam:article"]["xhtml:head"]);
        var timer = 0;
        var day = new Date();
        var postData = {

              paperTime: timer,
              paperLink: articleList[currentIndex].link,
              paperID: articleList[currentIndex].id,
              paperPublisher: articleList[currentIndex]["sru:recordData"]["pam:message"]["pam:article"]["xhtml:head"]["dc:publisher"],
              paperGenre: articleList[currentIndex]["sru:recordData"]["pam:message"]["pam:article"]["xhtml:head"]["prism:genre"],
              paperISSN: articleList[currentIndex]["sru:recordData"]["pam:message"]["pam:article"]["xhtml:head"]["prism:issn"],
              paperDate: articleList[currentIndex]["sru:recordData"]["pam:message"]["pam:article"]["xhtml:head"]["prism:publicationDate"],
              paperPubName: articleList[currentIndex]["sru:recordData"]["pam:message"]["pam:article"]["xhtml:head"]["prism:publicationName"],
              paperReadDay: day
              };

        firebase.database().ref("/users/"+key+"/papers/"+searchTerm + "/" + currentIndex).update(postData);



});





firebase.auth().onAuthStateChanged(function(user){
  if(user){
    $("#displayName").html(" Welcome " + user.displayName+ " "+user.email);
  }
  else {
    console.log("not logged in");
  }
});

//main reference firebase
var ref = firebase.database().ref("/users");

ref.on("value", function(data){
  var keyz = firebase.auth().currentUser.uid;
  var dat = data.val();
  //array of all keys - users
  //console.log(Object.keys(dat));
  //selecting logged in user key
  //console.log(dat[keyz]);
});



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

    //  var key = firebase.auth().currentUser.uid;
    //  var postData = {
    //        paperTitle: "",
    //        paperLink: "ssss",
    //        paperTime: "",
    //        paper4: "",
    //        paper5: 0,
    //        paper6: ""
    //        };
    //    var updates = {};
    //    updates['/' +comment] = postData;
    //    firebase.database().ref("/users/"+key).update(updates);
   });





///*********************************************get button input********************
    // $("#newButton").on("click", function(event) {
          // prevent form from trying to submit/refresh the page
      //  event.preventDefault();
      //
      //  var comment = $("input").val().trim();
      // console.log(comment);
      // searchNatureAPI(comment);

            // var comment1 = $("<button>").text(comment);
            //     comment1.addClass("setButtons", comment);
            //     comment1.attr("data-subject",comment);
            //$("#pageButtons").append(comment1);//***************************
    //});

//****************************************youtube*************************
 // function start() {
 //        // Initializes the client with the API key and the Translate API.
 //        gapi.client.init({
 //          'apiKey': 'AIzaSyDE9ssybqcSunbGxGxv7UC9VquDqzcW8LY',
 //          'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/translate/v2/rest'],
 //        }).then(function() {
 //          // Executes an API request, and returns a Promise.
 //          // The method name `language.translations.list` comes from the API discovery.
 //          return gapi.client.language.translations.list({
 //            q: 'hello world',
 //            source: 'en',
 //            target: 'de',
 //          });
 //        }).then(function(response) {
 //          console.log(response.result.data.translations[0].translatedText);
 //        }, function(reason) {
 //          console.log('Error: ' + reason.result.error.message);
 //        });
 //      };

      // Loads the JavaScript client library and invokes `start` afterwards.
//       gapi.load('client', start);

// var tag = document.createElement('script');

//       tag.src = "https://www.youtube.com/iframe_api";
//       var firstScriptTag = document.getElementsByTagName('script')[0];
//       firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


//       // 3. This function creates an <iframe> (and YouTube player)
//       //    after the API code downloads.
//       var player;
//       function onYouTubeIframeAPIReady() {
//         player = new YT.Player('player', {
//           height: '390',
//           width: '640',
//           videoId: 'M7lc1UVf-VE',//****************
//           events: {
//             'onReady': onPlayerReady,
//             'onStateChange': onPlayerStateChange
//           }
//         });
//       }

      // 4. The API will call this function when the video player is ready.
      // function onPlayerReady(event) {
      //   event.target.playVideo();
      // }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      // var done = false;
      // function onPlayerStateChange(event) {
      //   if (event.data == YT.PlayerState.PLAYING && !done) {
      //     setTimeout(stopVideo, 6000);
      //     done = true;
      //   }
      // }
      // function stopVideo() {
      //   player.stopVideo();
      // }


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

$("#newButton").on("click", function(event) {
// prevent form from trying to submit/refresh the page
event.preventDefault();
//get the search term
var searchTerm = $("input").val().trim();
//console.log(searchTerm);
//add search term to iframe format
var iframe = '<iframe id="ytplayer" type="text/html" width="720" height="405" src="https://www.youtube.com/embed/?listType=search&list='+searchTerm+'"frameborder="0" allowfullscreen></iframe>'
//console.log(iframe1);
//add iframe to html
$("#ytNew").html(iframe);
console.log(iframe);
});

var database = firebase.database();

$("#article-list").on("click", function(){
event.preventDefault();
dateadded = $("#dateAdded-input").val().trim();



// divArticleList.on('click', '.article-title', function(){
//   var currentIndex = $(this).attr('value');
//   displayCurrentArticle(articleList[currentIndex]);
// })

database.ref().push({
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
        });
});

 database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      var sv = snapshot.val();
      // Log everything that's coming out of snapshot
      console.log(sv.dateAdded);
       });
