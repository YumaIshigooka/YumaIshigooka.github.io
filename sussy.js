const recordButton = document.getElementById('record');
let recorder, audioChunks = [];

recordButton.addEventListener('click', () => {
  if (recordButton.id === 'record') {  // Start recording
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        recorder = new MediaRecorder(stream);
        recorder.ondataavailable = e => audioChunks.push(e.data);
        recorder.start();
        recordButton.id = 'stop';
        recordButton.textContent = 'Stop';
      });
  } else {  // Stop recording and send audio
    recorder.stop();
    recordButton.id = 'record';
    recordButton.textContent = 'Record';

    const blob = new Blob(audioChunks, { type: 'audio/webm' });
    audioChunks = [];  // Reset for next recording

    // Send audio to /start endpoint (implementation depends on your backend)
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/start');
    xhr.send(blob);

    // Play recorded audio
    const audio = new Audio();
    audio.src = URL.createObjectURL(blob);
    audio.play();
  }
});
