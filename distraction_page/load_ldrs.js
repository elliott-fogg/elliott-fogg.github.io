function loadLdrsModule (module, async=true, type="module") {
    return new Promise((resolve, reject) => {
        try {
            const scriptEle = document.createElement("script");
            scriptEle.type = type;
            scriptEle.async = async;
            scriptEle.src = `https://cdn.jsdelivr.net/npm/ldrs/dist/auto/${module}.js`;

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

loadLdrsModule("ring")
    .then( data => {
        console.log("Script loaded successfully", data);
        const ldrsRing = document.createElement("l-ring");
        ldrsRing.setAttribute("size", "40");
        ldrsRing.setAttribute("stroke", "5");
        ldrsRing.setAttribute("bg-opacity", "0.1");
        ldrsRing.setAttribute("speed", "2");
        ldrsRing.setAttribute("color", "black");
        document.body.append(ldrsRing);
    })
    .catch( err => {
        console.error(err);
    });