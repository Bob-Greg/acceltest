import React, {useState} from 'react';
import './App.css';

function App() {

    if (window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", motion, false);
    } else {
        console.log("DeviceMotionEvent is not supported");
    }

    const [accel, setAccel] = useState({ x: 0, y: 0, z: 0 })

    function motion(event: DeviceMotionEvent) {
        if (event.acceleration === null) {
            return;
        }
        setAccel({ x: event.acceleration.x!!, y: event.acceleration.y!!, z: event.acceleration.z!! })
    }

    return (
        <div>
            Accel: {accel.x} {accel.y} {accel.z}
        </div>
    );
}

export default App;
