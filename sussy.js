let isRecording = false;
let mediaRecorder;
let audioChunks = [];
let audioElement;

document.getElementById("recordButton").addEventListener("click", async () => {
    const recordButton = document.getElementById("recordButton");

    if (!isRecording) {
        // Start recording
        recordButton.style.backgroundColor = "red";
        recordButton.textContent = "Stop";

        // Get access to the microphone
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);

        // Handle data available event
        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };

        // Handle stop event
        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
            audioElement = new Audio(URL.createObjectURL(audioBlob));
            audioElement.play();

            // Send the audioBlob to the server
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

            // Reset audio chunks
            audioChunks = [];
        };

        // Start recording
        mediaRecorder.start();
        isRecording = true;
    } else {
        // Stop recording
        mediaRecorder.stop();
        recordButton.style.backgroundColor = "green";
        recordButton.textContent = "Record";
        isRecording = false;
    }
});
