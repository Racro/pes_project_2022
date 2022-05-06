class ConsentEngine {
    constructor(config, consentTypes, debugValues, handledCallback) {
        let self = this;

        ConsentEngine.debugValues = debugValues;

        this.consentTypes = consentTypes;

        this.cmps = [];

        this.handledCallback = handledCallback;

        this.triedCMPs = new Set();

        Object.keys(config).forEach((key) => {
            try {
                self.cmps.push(new CMP(key, config[key]));
            } catch (err) {
                console.groupCollapsed("Invalid CMP (" + key + ") detected, please update GDPR consent engine or fix the rule generating this error:");
                console.error(err);
                console.groupEnd();
            }
        });

        this.setupObserver();
        this.startObserver();

        this.handleMutations([]);
    }

    async handleMutations(mutations) {
        let self = this;

        let cmps = this.findCMP();

        cmps = cmps.filter((cmp)=>{
            return !self.triedCMPs.has(cmp.name);
        });

        if (cmps.length > 0) {
            this.stopObserver();

            if (cmps.length > 1) {
                console.warn("Found multiple CMPS's maybee rewise detection rules...", cmps);
            }

            let cmp = cmps[0];

            if(ConsentEngine.debugValues.debugLog) {
                console.log("CMP Detected: ", cmp.name);
            }

            this.triedCMPs.add(cmp.name);

            //Check if popup shows, then do consent stuff
            let numberOfTries = 10;
            async function checkIsShowing() {
                if (cmp.isShowing()) {
                    setTimeout(async () => {
                        try {
                            self.showProgressDialog("Autofilling "+cmp.name+", please wait...");

                            if (!ConsentEngine.debugValues.skipHideMethod) {
                                await cmp.runMethod("HIDE_CMP");
                            }
                            await cmp.runMethod("OPEN_OPTIONS");
                            if (!ConsentEngine.debugValues.skipHideMethod) {
                                await cmp.runMethod("HIDE_CMP");
                            }
                            await cmp.runMethod("DO_CONSENT", self.consentTypes);
                            if (!ConsentEngine.debugValues.skipSubmit) {
                                await cmp.runMethod("SAVE_CONSENT");
                            }
                            self.handledCallback({
                                cmpName: cmp.name
                            });
                        } catch(e) {
                            console.log("Error during consent handling:", e);
                        }
                        cmp.unHideAll();
                        self.hideProgressDialog();
                    }, 0);
                } else {
                    if (numberOfTries > 0) {
                        numberOfTries--;
                        setTimeout(checkIsShowing, 250);
                    } else {
                        if(ConsentEngine.debugValues.debugLog) {
                            console.log("Not showing...", cmp.name);
                        }
                        self.startObserver();
                        self.handleMutations([]);
                    }
                }
            }

            checkIsShowing();
        }
    }

    showProgressDialog(text) {
        if(ConsentEngine.debugValues.debugLog) {
            console.log("Showing progress...");
        }
        this.modal = document.createElement("div");
        this.modal.classList.add("ConsentOMatic-Progress-Dialog-Modal");
        this.dialog = document.createElement("div");
        this.dialog.classList.add("ConsentOMatic-Progress-Dialog");
        let header = document.createElement("h1");
        let contents = document.createElement("p");
        header.innerText = "Consent-o-Matic";
        contents.innerText = text;
        this.dialog.appendChild(header);
        this.dialog.appendChild(contents);
        document.body.appendChild(this.dialog);
        document.body.appendChild(this.modal);
        setTimeout(()=>{
            this.dialog.classList.add("ConsentOMatic-Progress-Started");
        }, 0);
    }

    hideProgressDialog() {
        let self = this;
        if(ConsentEngine.debugValues.debugLog) {
            console.log("Hiding progress...");
        }
        this.dialog.classList.add("ConsentOMatic-Progress-Complete");
        setTimeout(()=>{
            self.modal.remove();
            self.dialog.remove();
            self.dialog = null;
        },1000);
    }

    setupObserver() {
        let self = this;

        this.observer = new MutationObserver((mutations) => {
            this.handleMutations(mutations);
        });
    }

    startObserver() {
        this.observer.observe(document.body, {
            childList: true,
            attributes: true,
            subtree: true
        });
    }

    stopObserver() {
        this.observer.disconnect();
    }

    findCMP() {
        return this.cmps.filter((cmp) => {
            return cmp.detect();
        });
    }
}
