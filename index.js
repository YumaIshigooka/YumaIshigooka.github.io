function handleOrientation(event) {
    // Gather event parameters
    const data = {
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma
    };
    
    // Send the data via POST request
    fetch(endpointUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data sent successfully:', data);
    })
    .catch(error => {
        console.error('Error sending data:', error);
    });
    
    updateFieldIfNotNull('Orientation_a', event.alpha);
    updateFieldIfNotNull('Orientation_b', event.beta);
    updateFieldIfNotNull('Orientation_g', event.gamma);
    incrementEventCount();
}


function incrementEventCount(){
  let counterElement = document.getElementById("num-observed-events")
  let eventCount = parseInt(counterElement.innerHTML)
  counterElement.innerHTML = eventCount + 1;
}

function updateFieldIfNotNull(fieldName, value, precision=10){
  if (value != null)
    document.getElementById(fieldName).innerHTML = value.toFixed(precision);
}

function handleMotion(event) {
    // Gather event parameters
    const data = {
        accelerationIncludingGravity: {
            x: event.accelerationIncludingGravity.x,
            y: event.accelerationIncludingGravity.y,
            z: event.accelerationIncludingGravity.z
        },
        acceleration: {
            x: event.acceleration.x,
            y: event.acceleration.y,
            z: event.acceleration.z
        },
        interval: event.interval,
        rotationRate: {
            alpha: event.rotationRate.alpha,
            beta: event.rotationRate.beta,
            gamma: event.rotationRate.gamma
        }
    };

    // Send the data via POST request
    fetch(endpointUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data sent successfully:', data);
    })
    .catch(error => {
        console.error('Error sending data:', error);
    });

    updateFieldIfNotNull('Accelerometer_gx', event.accelerationIncludingGravity.x);
    updateFieldIfNotNull('Accelerometer_gy', event.accelerationIncludingGravity.y);
    updateFieldIfNotNull('Accelerometer_gz', event.accelerationIncludingGravity.z);

    updateFieldIfNotNull('Accelerometer_x', event.acceleration.x);
    updateFieldIfNotNull('Accelerometer_y', event.acceleration.y);
    updateFieldIfNotNull('Accelerometer_z', event.acceleration.z);

    updateFieldIfNotNull('Accelerometer_i', event.interval, 2);

    updateFieldIfNotNull('Gyroscope_z', event.rotationRate.alpha);
    updateFieldIfNotNull('Gyroscope_x', event.rotationRate.beta);
    updateFieldIfNotNull('Gyroscope_y', event.rotationRate.gamma);
    incrementEventCount();
}


function playSound() {
    // Get the audio element
    var audio = document.getElementById('sound');
    console.log("caca");
    // Play the audio
    audio.play();
}


let is_running = false;
let demo_button = document.getElementById("start_demo");
demo_button.onclick = function(e) {
  e.preventDefault();
  playSound();
  // Request permission for iOS 13+ devices
  if (
    DeviceMotionEvent &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    DeviceMotionEvent.requestPermission();
  }
  
  if (is_running){
    window.removeEventListener("devicemotion", handleMotion);
    window.removeEventListener("deviceorientation", handleOrientation);
    demo_button.innerHTML = "Start demo";
    demo_button.classList.add('btn-success');
    demo_button.classList.remove('btn-danger');
    is_running = false;
  }else{
    window.addEventListener("devicemotion", handleMotion);
    window.addEventListener("deviceorientation", handleOrientation);
    document.getElementById("start_demo").innerHTML = "Stop demo";
    demo_button.classList.remove('btn-success');
    demo_button.classList.add('btn-danger');
    is_running = true;
  }
};

/*
Light and proximity are not supported anymore by mainstream browsers.
window.addEventListener('devicelight', function(e) {
   document.getElementById("DeviceLight").innerHTML="AmbientLight current Value: "+e.value+" Max: "+e.max+" Min: "+e.min;
});

window.addEventListener('lightlevel', function(e) {
   document.getElementById("Lightlevel").innerHTML="Light level: "+e.value;
});

window.addEventListener('deviceproximity', function(e) {
   document.getElementById("DeviceProximity").innerHTML="DeviceProximity current Value: "+e.value+" Max: "+e.max+" Min: "+e.min;
});

window.addEventListener('userproximity', function(event) {
   document.getElementById("UserProximity").innerHTML="UserProximity: "+event.near;
});
*/
