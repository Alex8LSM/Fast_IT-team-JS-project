const modalLogin = document.getElementById('loginModal');
const modalSignIn = document.getElementById('signInModal');
const btndesk = document.getElementById('signInBtn');
const logInbtn = document.getElementById('logInBtn');
const btnclose = document.getElementsByClassName('close')[0];
btndesk.onclick = myModal;
logInbtn.onclick = myModalSignIn;
//
function myModalSignIn() {
  btnclose.onclick = function () {
    modalSignIn.style.display = 'none';
  };
  window.onclick = function (event) {
    if (event.target == modalSignIn) {
      modalSignIn.style.display = 'none';
    }
  };
  modalSignIn.style.display = 'block';
}
//
function myModal() {
  btnclose.onclick = function () {
    modalLogin.style.display = 'none';
  };
  window.onclick = function (event) {
    if (event.target == modalLogin) {
      modalLogin.style.display = 'none';
    }
  };
  modalLogin.style.display = 'block';
}
//firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAV2ss40V5eT7frdT-RAJIEsm8Mz9X_mmk',
  authDomain: 'new-film-auth.firebaseapp.com',
  databaseURL: 'https://new-film-auth-default-rtdb.firebaseio.com',
  projectId: 'new-film-auth',
  storageBucket: 'new-film-auth.appspot.com',
  messagingSenderId: '895072161140',
  appId: '1:895072161140:web:9e2a11665e938f1e393021',
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();
const registerUser = document.getElementById('registerUser');
const logInUser = document.getElementById('logInUser');
//
registerUser.addEventListener('click', register);
logInUser.addEventListener('click', login);
//
function register() {
  email = document.getElementById('email').value;
  password = document.getElementById('password').value;
  full_name = document.getElementById('name').value;

  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!');
    return;
  }
  if (validate_field(full_name) == false) {
    alert('One or More Extra Fields is Outta Line!!');
    return;
  }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      const user = auth.currentUser;
      const database_ref = database.ref();
      const user_data = {
        email: email,
        full_name: full_name,
        last_login: Date.now(),
        logIn: false,
      };
      database_ref.child('users/' + user.uid).set(user_data);
      alert('User Created!!');
    })
    .catch(function (error) {
      const error_code = error.code;
      const error_message = error.message;
      alert(error_message);
    });
}
function login() {
  email = document.getElementById('loginEmail').value;
  password = document.getElementById('loginPassword').value;
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!');
    return;
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      const user = auth.currentUser;
      const database_ref = database.ref();
      const user_data = {
        last_login: Date.now(),
      };
      database_ref.child('users/' + user.uid).update(user_data);
      alert('User Logged In!!');
    })
    .catch(function (error) {
      const error_code = error.code;
      const error_message = error.message;

      alert(error_message);
    });
}
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    return true;
  } else {
    return false;
  }
}

function validate_password(password) {
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}
