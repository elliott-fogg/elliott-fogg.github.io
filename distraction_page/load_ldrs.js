function ldrsLoad (moduleName, async=true, type="module") {
    return new Promise((resolve, reject) => {
        try {
            const scriptEle = document.createElement("script");
            scriptEle.type = type;
            scriptEle.async = async;
            scriptEle.src = `https://cdn.jsdelivr.net/npm/ldrs/dist/auto/${moduleName}.js`;
            scriptEle.id = "ldrs-script";

            scriptEle.addEventListener("load", (ev) => {
                resolve({ status: true });
            });

            scriptEle.addEventListener("error", (ev) => {
                reject({
                    status: false,
                    message: `Failed to load the script for ${module}`
                });
            });

            document.getElementById("ldrs-script").replaceWith(scriptEle);
            // document.body.appendChild(scriptEle);
        } catch (error) {
            reject(error);
        }
    });
};


function ldrsDisplay (moduleName, stroke="5", strokeLength="0.05", 
                      bgopacity="0.1", speed="2", color="black") {
    var objName = moduleName.split(/(?=[A-Z\d])/)
                        .map(s=>s.toLowerCase())
                        .join("-");
    var elem = document.getElementById("ldrs-element");
    var newElem = document.createElement(`l-${objName}`);
    newElem.setAttribute("size", "100");
    newElem.setAttribute("stroke", stroke);
    newElem.setAttribute("strokeLength", strokeLength);
    newElem.setAttribute("bg-opacity", bgopacity);
    newElem.setAttribute("speed", speed);
    newElem.setAttribute("color", color);
    elem.replaceWith(newElem);
    newElem.id = "ldrs-element";

    document.getElementById("ldrs-style").innerHTML = moduleName;
    document.getElementById("ldrs-stroke").innerHTML = Number(stroke).toFixed(0);
    document.getElementById("ldrs-slength").innerHTML = Number(strokeLength).toFixed(2);
    document.getElementById("ldrs-bgopacity").innerHTML = Number(bgopacity).toFixed(2);
    document.getElementById("ldrs-speed").innerHTML = Number(speed).toFixed(1);
    document.getElementById("ldrs-color").innerHTML = color;
}


function ldrsLoadAndDisplay(moduleName, stroke="5", strokeLength="0.05", 
                            bgopacity="0.1", speed="2", color="black") {
    ldrsLoad(moduleName)
    .then( data => {
        console.log("Imported module successfully", data);
        console.log("Changing LDRS", moduleName, stroke, strokeLength, bgopacity, speed, color);
        ldrsDisplay(moduleName, stroke, strokeLength, bgopacity, speed, color);
    })
    .catch( err => {
        console.error(err);
    });
}


const ldrsList = ["ring", "ring2", "tailspin", "lineSpinner", "squircle", 
                  "square", "reuleaux", "tailChase", "dotSpinner", "spiral", 
                  "bouncy", "treadmill", "bouncyArc", "waveform", "hatch", 
                  "hourglass", "zoomies", "lineWobble", "infinity", "trefoil", 
                  "cardio", "helix", "grid", "quantum", "wobble", "orbit", 
                  "chaoticOrbit", "superballs", "trio", "momentum", "dotWave", 
                  "leapfrog", "newtonsCradle", "dotStream", "dotPulse", 
                  "metronome", "jelly", "jellyTriangle", "mirage", "ping", 
                  "pulsar", "ripples", "miyagi", "pinwheel"]

const colorsList = ["#0DB700", 
                    "#079BC0", 
                    "#E894FF", 
                    "#FFC494", 
                    "#FF99D4", 
                    "#121DAF", 
                    "black"];


function ldrsRandomise() {
    let moduleName = ldrsList[Math.floor(Math.random()*ldrsList.length)];
    let stroke = Math.round(Math.random()*19) + 1; // 1 - 20;
    let strokeLength = Math.random()*0.25 + 0.05; // 0.05 - 0.30;
    let bgopacity = Math.random()*0.6; // 0 - 0.6;
    let speed = Math.random()*2.5 + 0.5; // 0.5 - 3.0;
    let color = colorsList[Math.floor(Math.random()*colorsList.length)];
    ldrsLoadAndDisplay(moduleName, stroke, strokeLength, bgopacity, speed, color);
}

ldrsLoadAndDisplay("ring");
document.getElementById("ldrs-button").onclick = function() {ldrsRandomise()};