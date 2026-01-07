export var AudioState;
(function (AudioState) {
    AudioState["IDLE"] = "idle";
    AudioState["CONNECTING"] = "connecting";
    AudioState["LISTENING"] = "listening";
    AudioState["THINKING"] = "thinking";
    AudioState["SPEAKING"] = "speaking";
    AudioState["ERROR"] = "error";
})(AudioState || (AudioState = {}));
