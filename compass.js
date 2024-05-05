const compassNeedle = document.querySelector(".compass-needle");
const compassHeadingText = document.getElementById("heading");

function handleOrientation(event) {
  const alpha = event.alpha; // Compass heading in degrees (0-360)

  // Convert to CSS compatible rotation (0-360deg)
  const compassRotation = - (alpha - 90); 

  compassNeedle.style.transform = `rotate(${compassRotation}deg)`;

  // Update compass heading text
  compassHeadingText.textContent = `Facing: ${Math.round(alpha)}°`;
}

if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", handleOrientation);
  compassHeadingText.textContent = "Hold your device flat for compass data.";
} else {
  compassHeadingText.textContent = "Your device doesn't support compass.";
}
