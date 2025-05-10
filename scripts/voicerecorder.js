// Description: This script is used to record audio from the user's microphone and save it as an audio file.
const display = document.querySelector('.display');
const controllerWrapper = document.querySelector('.controllers');
let mediaRecorder, chunks = [], audioURL = '';

navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = e => chunks.push(e.data);
    mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
        chunks = [];
        audioURL = window.URL.createObjectURL(blob);
        document.querySelector('audio').src = audioURL;
    };
}).catch(error => console.log('Error: ', error));

const record = () => { mediaRecorder.start(); }
const stopRecording = () => { mediaRecorder.stop(); }
const downloadAudio = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = audioURL;
    downloadLink.setAttribute('download', 'audio.ogg');
    downloadLink.click();
};