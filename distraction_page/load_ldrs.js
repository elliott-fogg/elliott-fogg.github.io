function loadLdrsModule (module, async=true, type="text/javascript") {
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
    })
    .catch( err => {
        console.error(err);
    });