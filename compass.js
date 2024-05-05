const compassNeedle = document.querySelector(".compass-needle");
const compassHeadingText = document.getElementById("heading");

let initialAlpha = null; // Stores initial compass reading

function handleOrientation(event) {
  const alpha = event.alpha; // Compass heading in degrees (0-360)

  // Capture initial compass reading on first event
  if (initialAlpha === null) {
    initialAlpha = alpha;
  }

  // Calculate compass rotation with offset based on initial reading
  const compassRotation = - (alpha - initialAlpha - 90); 

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
