import React, {useState} from 'react';
import './App.css';

function App() {

    if (window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", motion, false);
    } else {
        console.log("DeviceMotionEvent is not supported");
    }

    function currentTimeMillis() {
        return new Date().getTime()
    }

    const [accel, setAccel] = useState({ x: 0, y: 0, z: 0 } as DeviceMotionEventAcceleration)

    let lastUpdate = 0

    function motion(event: DeviceMotionEvent) {
        const cur = currentTimeMillis()
        if (event.acceleration === null || cur - lastUpdate < 300) {
            return;
        }
        setAccel(event.acceleration)
        lastUpdate = cur
    }

    // absolutely garbage code
    function shaking(_accel: DeviceMotionEventAcceleration = accel) {
        let count = 0;
        if (Math.abs(_accel.x!!) > 2) {
            count++
        }
        if (Math.abs(_accel.y!!) > 2) {
            count++
        }
        if (Math.abs(_accel.z!!) > 2) {
            count++
        }
        return count
    }

    function shakingC(a: string) {
        switch (a) {
            case 'x': return Math.abs(accel.x!!) > 4
            case 'y': return Math.abs(accel.y!!) > 4
            case 'z': return Math.abs(accel.z!!) > 4
        }
    }

    return (
        <div className={"w-screen h-screen " + (shaking() >= 2 ? "bg-red-400": "")}>
            Accel:
            <ul className={"list-disc list-inside pl-3"}>
                <li className={shakingC('x') ? "text-4xl text-green-400" : ""}>{accel.x}</li>
                <li className={shakingC('y') ? "text-4xl text-green-400" : ""}>{accel.y}</li>
                <li className={shakingC('z') ? "text-4xl text-green-400" : ""}>{accel.z}</li>
            </ul>
            { shaking() >= 2 &&
                <span className={"text-5xl text-white"}>STOP SHAKING!!!</span>
            }
        </div>
    );
}

export default App;
