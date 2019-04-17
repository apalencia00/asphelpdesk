<script src="https://www.gstatic.com/firebasejs/5.5.2/firebase.js"></script>

  // Initialize Firebase
  // TODO: Replace with your project's customized code snippet
  var config = {
    apiKey:                 "<API_KEY>",
    authDomain:             "<helpdesk-fe8b4>.firebaseapp.com",
    databaseURL:            "https://<helpdesk-fe8b4>.firebaseio.com",
    projectId:              "<helpdesk-fe8b4>",
    storageBucket:          "<BUCKET>.appspot.com",
    messagingSenderId:      "<SENDER_ID>",
  };
  firebase.initializeApp(config);

  const messaging = firebase.messaging();