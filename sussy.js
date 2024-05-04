// Define a flag to check the recording state
let isRecording = false;
// Variables to handle audio recording and chunks
let mediaRecorder;
let audioChunks = [];

// Get the button element by its ID
const recordButton = document.getElementById("recordButton");

// Event handler for the button click
recordButton.addEventListener("click", async () => {
    if (!isRecording) {
        // Start recording
        recordButton.style.backgroundColor = rgb(209, 140, 140);
        recordButton.textContent = "Stop";

        try {
            // Request access to the microphone
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Create a media recorder with the audio stream
            mediaRecorder = new MediaRecorder(stream);

            // Handle data available events
            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };

            // Start recording
            mediaRecorder.start();
            isRecording = true;

            // Handle stop event
            mediaRecorder.onstop = async () => {
                // Combine audio chunks into a single Blob
                const audioBlob = new Blob(audioChunks, { type: "audio/wav" });

                // Play the recorded audio back to the user
                const audioURL = URL.createObjectURL(audioBlob);
                const audioElement = new Audio(audioURL);
                audioElement.play();

                // Reset audio chunks for the next recording
                audioChunks = [];

                // Send the audio data to the server
                const formData = new FormData();
                formData.append("audio", audioBlob, "recording.wav");

                try {
                    const response = await fetch("/start", {
                        method: "POST",
                        body: formData,
                    });

                    if (response.ok) {
                        console.log("Audio sent successfully!");
                    } else {
                        console.log("Failed to send audio.");
                    }
                } catch (error) {
                    console.log("Error sending audio: ", error);
                }
            };
        } catch (error) {
            console.error("Error accessing microphone: ", error);
        }
    } else {
        // Stop recording
        mediaRecorder.stop();
        recordButton.style.backgroundColor = "green";
        recordButton.textContent = "Record";
        isRecording = false;
    }
});
