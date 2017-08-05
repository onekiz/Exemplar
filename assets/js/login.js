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

// ////Github account //////////////
var provider = new firebase.auth.GithubAuthProvider();

$('#github').on('click', function (event) {
	    event.preventDefault();
	    firebase.auth().signInWithPopup(provider).then(function (result) {
	  // This gives you a GitHub Access Token. You can use it to access the GitHub API.
	          var token = result.credential.accessToken;
	  // The signed-in user info.
	          var user = result.user;
	          console.log(user);
	  // ...
	    }).catch(function (error) {
	  // Handle Errors here.
	          var errorCode = error.code;
	          var errorMessage = error.message;
	//   // The email of the user's account used.
	           var email = error.email;
	//   // The firebase.auth.AuthCredential type that was used.
	           var credential = error.credential;
	          console.log(errorMessage);
	     });
		 });

// ////////Listening Login with email and password////////
$('#login').on('click', function () {
  var auth = firebase.auth();
  var email = $('#email').val();
  var pass = $('#password').val();
  var promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(function (event) { console.log(event.message + ' deneme login'); });
});

// /////New user signing in with new email and password. Creating Account/////////
$(document).on('click', '#signup', signUp);

// ///////signup function creates a form with name lastname email password img form/////////
function signUp () {
  event.preventDefault();
  var divSign = $("<div id = 'divSign'>");
  var name = $("<input type = 'text' placeholder = 'First Name'>");
  name.addClass('form-control');
  name.attr('id', 'name');

  var lastName = $("<input type = 'text' placeholder = 'Last Name'>");
  lastName.addClass('form-control');
  lastName.attr('id', 'lastName');
  divSign.insertAfter($('#signInHeader'));
  divSign.append(name);
  divSign.append(lastName);

  var label = $("<label for = 'imgFile'>");
  label.text('Image File');
  var file = $("<input type = 'file' aria-describedby='fileHelp'>");
  file.addClass('form-control-file');
  file.attr('id', 'imgFile');
  label.insertAfter(lastName);
		 						file.insertAfter(label);
  $('#login').remove();
  $('#github').remove();
  $('#signup').remove();
  var buttonSignUp = $("<button class = 'btn btn-primary' id = 'submitAccount'>");
  buttonSignUp.text('Submit');
  buttonSignUp.insertAfter($('#password'));
  var cancel = $("<button class = 'btn btn-success' id = 'cancel'>");
  var tag = $("<a href = 'logIn.html'>");
  tag.text('Cancel');
  cancel.insertAfter($('#submitAccount'));
  cancel.append(tag);
    			}
// /////////////////////////////////////////storing Porfile Image///////////////////////////////////////////////////////////////////
var file;
var firstLogIn = false;
$(document).on('change', '#imgFile', function (e) {
  console.log(e);
							  file = e.target.files[0];
  firstLogIn = true;
  console.log(file);
								// var storageRef = firebase.storage().ref("images/"+file.name);
								// storageRef.put(file);
});
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ///////Submitting form to sign up clicking button.... all user info is stored in firebase with specific UID/////////
$(document).on('click', '#submitAccount', account);

function account () {
 	 event.preventDefault();
	 var auth = firebase.auth();
	 var users = {
     email: $('#email').val(),
     pass: $('#password').val()
	 };

	 // ////////Calling firebase method to create user account with email an password///////////
  auth.createUserWithEmailAndPassword(users.email, users.pass).catch(function (error) {
    // Handle Errors
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  }).then(function (response) {
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
      paperTitle: '',
      paperTime: '',
      // imgUrl: file.name
		});

    console.log('got here as well');
  });
}
// //////event listenner whenever there is a change of Auth State signing in or signing up////////
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
				// /////if user signed in or singed up updating user account properties///////
    if (firstLogIn) {
      user.updateProfile({
			        				displayName: $('#name').val(),
        photoURL: file.name
							    		}).then(function () {
							        console.log('Update is successfull');
											// ///directing to index.html page//////////
							    		}, function (error) {
							        console.log('not able to update user info');
      console.log(error);
							    });
    }
						// //updated user info//////////
    console.log(user);
    firstLogIn = false;
    // window.location = 'index.html';
  } else {
    console.log('not logged in');
  }
});
