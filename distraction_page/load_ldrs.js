function ldrsLoad (moduleName, async=true, type="module") {
    return new Promise((resolve, reject) => {
        try {
            const scriptEle = document.createElement("script");
            scriptEle.type = type;
            scriptEle.async = async;
            scriptEle.src = `https://cdn.jsdelivr.net/npm/ldrs/dist/auto/${moduleName}.js`;

            scriptEle.addEventListener("load", (ev) => {
                resolve({ status: true });
            });

            scriptEle.addEventListener("error", (ev) => {
                reject({
                    status: false,
                    message: `Failed to load the script for ${module}`
                });
            });

            document.body.appendChild(scriptEle);
        } catch (error) {
            reject(error);
        }
    });
};


function ldrsDisplay (moduleName) {
    var objName = moduleName.split(/(?=[A-Z\d])/)
                        .map(s=>s.toLowerCase())
                        .join("-");
    var elem = document.getElementById("ldrs-element");
    var newElem = document.createElement(`l-${objName}`);
    newElem.setAttribute("size", "40");
    newElem.setAttribute("stroke", "5");
    newElem.setAttribute("bg-opacity", "0.1");
    newElem.setAttribute("speed", "2");
    newElem.setAttribute("color", "black");
    elem.replaceWith(newElem);
    newElem.id = "ldrs-element";
}


export function ldrsLoadAndDisplay(moduleName) {
    loadLdrsModule(moduleName)
    .then( data => {
        console.log("Imported module successfully", data);
        ldrsDisplay(moduleName);
    })
    .catch( err => {
        console.error(err);
    }
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


// loadLdrsModule("ring")
//     .then( data => {
//         console.log("Script loaded successfully", data);
//         const ldrsRing = document.createElement("l-ring");
//         ldrsRing.setAttribute("size", "40");
//         ldrsRing.setAttribute("stroke", "5");
//         ldrsRing.setAttribute("bg-opacity", "0.1");
//         ldrsRing.setAttribute("speed", "2");
//         ldrsRing.setAttribute("color", "black");
//         document.body.append(ldrsRing);
//     })
//     .catch( err => {
//         console.error(err);
//     });

ldrsLoadAndDisplay("ring");