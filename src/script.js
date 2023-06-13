try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 10;
} catch (e) {
  console.error(e);
  document.querySelector(".no-browser-support").show();
  document.querySelector(".app").hide();
}

var noteTextarea = document.querySelector("#note-textarea");
let finalTranscript = "";

// Autoscroll
setInterval(() => {
  noteTextarea.scrollTop = noteTextarea.scrollHeight;
}, 500);

recognition.onresult = (event) => {
  let interimTranscript = "";
  for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
    let transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript += transcript;
    } else {
      interimTranscript += transcript;
    }
  }
  noteTextarea.innerHTML = finalTranscript + '<b style="color:rebeccapurple;">' + interimTranscript + "</>";
};

document.querySelector("#start-record-btn").addEventListener("click", (e) => {
  recognition.start();
});

document.querySelector("#pause-record-btn").addEventListener("click", (e) => {
  recognition.stop();
});
