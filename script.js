try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false

  recognition.interimResults = true;
  recognition.maxAlternatives = 10;
  recognition.continuous = true;

  setInterval(() => {
    document.getElementById("note-textarea").scrollTop = document.getElementById("note-textarea").scrollHeight
  }, 500);

  setTimeout(() => {
    document.getElementById("start-record-btn").click();
  }, 500)

  setInterval(() => {
    document.getElementById("start-record-btn").click();
  }, 10000);
}
catch (e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}


var noteTextarea = $('#note-textarea');
var noteContent = '';

let finalTranscript = '';

/*-----------------------------
      Voice Recognition
------------------------------*/

// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds),
// allowing us to keep recording even when the user pauses.
recognition.continuous = true;

// This block is called every time the Speech APi captures a line.
recognition.onresult = (event) => {
  let interimTranscript = '';
  for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
    let transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript += transcript;
    } else {
      interimTranscript += transcript;
    }
  }
  document.querySelector('#note-textarea').innerHTML = finalTranscript + '<b style="color:rebeccapurple;">' + interimTranscript + '</>';
}


/*-----------------------------
      App buttons and input
------------------------------*/

$('#start-record-btn').on('click', function (e) {
  if (noteContent.length) {
    noteContent += ' ';
  }
  recognition.start();
});


$('#pause-record-btn').on('click', function (e) {
  recognition.stop();
});