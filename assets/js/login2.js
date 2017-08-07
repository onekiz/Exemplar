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

//variable to set displayName
var registeringNewUser = false;

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

  //make sure authentication doesn't try to update display name
  registeringNewUser = false;
  var auth = firebase.auth();
  var email = $('#username').val();
  var pass = $('#password').val();
  var promise = auth.signInWithEmailAndPassword(email, pass);

  //if invalid login then display error message
  promise.catch(function(event) {
    $('#error-message').html(event.message);
  });


});

// ///////Submitting form to sign up clicking button.... all user info is stored in firebase with specific UID/////////
$(document).on('click', '#register-submit', registerNewUser);

function registerNewUser() {
  registerNewUser = true;
  event.preventDefault();
  var auth = firebase.auth();
  var users = {
    email: $('#email').val(),
    pass: $('#register-password').val()
  };

  // ////////Calling firebase method to create user account with email an password///////////
  auth.createUserWithEmailAndPassword(users.email, users.pass).catch(function(error) {
    // Handle Errors
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    console.log(users);
    $('#register-error-message').html(errorMessage);
  }).then(function(response) {
    console.log('response: ', response)
    console.log('name: ', $('#name').val());

    // ///saving user info on firebase////////////////
    // var storageRef = firebase.storage().ref(response.uid + '/' + file.name);
    // storageRef.put(file);

    var database = firebase.database();
    console.log('got here');
    firebase.database().ref('users/' + response.uid).set({
      email: users.email,
      pass: users.pass,
      displayName: $('#name').val(),
      lastName: $('#lastName').val(),
      // paperTitle: '',
      // paperTime: '',
      // imgUrl: file.name
    });

  });
}


// //////event listenner whenever there is a change of Auth State signing in or signing up////////
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if(registerNewUser){
      //update displayname
      user.updateProfile(
        {
          displayName: $('#name').val(),
          // photoURL: file.name
        }).then(function() {
        console.log('Update is successfull');
        window.location = 'index.html';
      }, function(error) {
        console.log('not able to update user info');
        console.log(error);
      });
    } else{

      window.location = 'index.html';
    }
  } else {
    console.log('not logged in');
  }
});
