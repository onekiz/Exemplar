//to flip between two tabs
$('#login-form-link').click(function(e) {
  $("#login-form").delay(100).fadeIn(100);
  $("#register-form").fadeOut(100);
  $('#register-form-link').removeClass('active');
  $(this).addClass('active');
  e.preventDefault();
});
$('#register-form-link').click(function(e) {
  $("#register-form").delay(100).fadeIn(100);
  $("#login-form").fadeOut(100);
  $('#login-form-link').removeClass('active');
  $(this).addClass('active');
  e.preventDefault();
});


// Initialize Firebase
var config = {
  apiKey: 'AIzaSyBQOGFPzTZ3o5WLnsuyqlk4TEyxFSaVAO0',
  authDomain: 'exemplar-ae432.firebaseapp.com',
  databaseURL: 'https://exemplar-ae432.firebaseio.com',
  projectId: 'exemplar-ae432',
  storageBucket: 'exemplar-ae432.appspot.com',
  messagingSenderId: '893766502988'
};
firebase.initializeApp(config);

// ////////Listening Login with email and password////////
$('#login-submit').on('click', function(e) {
  e.preventDefault();
  var auth = firebase.auth();
  var email = $('#username').val();
  var pass = $('#password').val();
  var promise = auth.signInWithEmailAndPassword(email, pass);

  //if invalid login then display error message
  promise.catch(function(event) {
    $('#error-message').html(event.message);
    console.log(event.message + ' deneme login');
  });


});


// //////event listenner whenever there is a change of Auth State signing in or signing up////////
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user);
    firstLogIn = false;
    window.location = 'index.html';
  } else {
    console.log('not logged in');
  }
});
