"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraImpl = void 0;
var AbstractCameraCapability = (function () {
    function AbstractCameraCapability(name, track) {
        this.name = name;
        this.track = track;
    }
    AbstractCameraCapability.prototype.isSupported = function () {
        if (!this.track.getCapabilities) {
            return false;
        }
        return this.name in this.track.getCapabilities();
    };
    AbstractCameraCapability.prototype.apply = function (value) {
        var constraint = {};
        constraint[this.name] = value;
        var constraints = { advanced: [constraint] };
        return this.track.applyConstraints(constraints);
    };
    AbstractCameraCapability.prototype.value = function () {
        var settings = this.track.getSettings();
        if (this.name in settings) {
            var settingValue = settings[this.name];
            return settingValue;
        }
        return null;
    };
    return AbstractCameraCapability;
}());
var AbstractRangeCameraCapability = (function (_super) {
    __extends(AbstractRangeCameraCapability, _super);
    function AbstractRangeCameraCapability(name, track) {
        return _super.call(this, name, track) || this;
    }
    AbstractRangeCameraCapability.prototype.min = function () {
        return this.getCapabilities().min;
    };
    AbstractRangeCameraCapability.prototype.max = function () {
        return this.getCapabilities().max;
    };
    AbstractRangeCameraCapability.prototype.step = function () {
        return this.getCapabilities().step;
    };
    AbstractRangeCameraCapability.prototype.apply = function (value) {
        var constraint = {};
        constraint[this.name] = value;
        var constraints = { advanced: [constraint] };
        return this.track.applyConstraints(constraints);
    };
    AbstractRangeCameraCapability.prototype.getCapabilities = function () {
        this.failIfNotSupported();
        var capabilities = this.track.getCapabilities();
        var capability = capabilities[this.name];
        return {
            min: capability.min,
            max: capability.max,
            step: capability.step,
        };
    };
    AbstractRangeCameraCapability.prototype.failIfNotSupported = function () {
        if (!this.isSupported()) {
            throw new Error("".concat(this.name, " capability not supported"));
        }
    };
    return AbstractRangeCameraCapability;
}(AbstractCameraCapability));
var ZoomFeatureImpl = (function (_super) {
    __extends(ZoomFeatureImpl, _super);
    function ZoomFeatureImpl(track) {
        return _super.call(this, "zoom", track) || this;
    }
    return ZoomFeatureImpl;
}(AbstractRangeCameraCapability));
var TorchFeatureImpl = (function (_super) {
    __extends(TorchFeatureImpl, _super);
    function TorchFeatureImpl(track) {
        return _super.call(this, "torch", track) || this;
    }
    return TorchFeatureImpl;
}(AbstractCameraCapability));
var CameraCapabilitiesImpl = (function () {
    function CameraCapabilitiesImpl(track) {
        this.track = track;
    }
    CameraCapabilitiesImpl.prototype.zoomFeature = function () {
        return new ZoomFeatureImpl(this.track);
    };
    CameraCapabilitiesImpl.prototype.torchFeature = function () {
        return new TorchFeatureImpl(this.track);
    };
    return CameraCapabilitiesImpl;
}());
var RenderedCameraImpl = (function () {
    function RenderedCameraImpl(parentElement, mediaStream, callbacks) {
        this.isClosed = false;
        this.parentElement = parentElement;
        this.mediaStream = mediaStream;
        this.callbacks = callbacks;
        this.surface = this.createVideoElement(this.parentElement.clientWidth);
        parentElement.append(this.surface);
    }
    RenderedCameraImpl.prototype.createVideoElement = function (width) {
        var videoElement = document.createElement("video");
        videoElement.style.width = "".concat(width, "px");
        videoElement.style.display = "block";
        videoElement.muted = true;
        videoElement.setAttribute("muted", "true");
        videoElement.playsInline = true;
        return videoElement;
    };
    RenderedCameraImpl.prototype.setupSurface = function () {
        var _this = this;
        this.surface.onabort = function () {
            throw "RenderedCameraImpl video surface onabort() called";
        };
        this.surface.onerror = function () {
            throw "RenderedCameraImpl video surface onerror() called";
        };
        var onVideoStart = function () {
            var videoWidth = _this.surface.clientWidth;
            var videoHeight = _this.surface.clientHeight;
            _this.callbacks.onRenderSurfaceReady(videoWidth, videoHeight);
            _this.surface.removeEventListener("playing", onVideoStart);
        };
        this.surface.addEventListener("playing", onVideoStart);
        this.surface.srcObject = this.mediaStream;
        this.surface.play();
    };
    RenderedCameraImpl.create = function (parentElement, mediaStream, options, callbacks) {
        return __awaiter(this, void 0, void 0, function () {
            var renderedCamera, aspectRatioConstraint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        renderedCamera = new RenderedCameraImpl(parentElement, mediaStream, callbacks);
                        if (!options.aspectRatio) return [3, 2];
                        aspectRatioConstraint = {
                            aspectRatio: options.aspectRatio
                        };
                        return [4, renderedCamera.getFirstTrackOrFail().applyConstraints(aspectRatioConstraint)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        renderedCamera.setupSurface();
                        return [2, renderedCamera];
                }
            });
        });
    };
    RenderedCameraImpl.prototype.failIfClosed = function () {
        if (this.isClosed) {
            throw "The RenderedCamera has already been closed.";
        }
    };
    RenderedCameraImpl.prototype.getFirstTrackOrFail = function () {
        this.failIfClosed();
        if (this.mediaStream.getVideoTracks().length === 0) {
            throw "No video tracks found";
        }
        return this.mediaStream.getVideoTracks()[0];
    };
    RenderedCameraImpl.prototype.pause = function () {
        this.failIfClosed();
        this.surface.pause();
    };
    RenderedCameraImpl.prototype.resume = function (onResumeCallback) {
        this.failIfClosed();
        var $this = this;
        var onVideoResume = function () {
            setTimeout(onResumeCallback, 200);
            $this.surface.removeEventListener("playing", onVideoResume);
        };
        this.surface.addEventListener("playing", onVideoResume);
        this.surface.play();
    };
    RenderedCameraImpl.prototype.isPaused = function () {
        this.failIfClosed();
        return this.surface.paused;
    };
    RenderedCameraImpl.prototype.getSurface = function () {
        this.failIfClosed();
        return this.surface;
    };
    RenderedCameraImpl.prototype.getRunningTrackCapabilities = function () {
        return this.getFirstTrackOrFail().getCapabilities();
    };
    RenderedCameraImpl.prototype.getRunningTrackSettings = function () {
        return this.getFirstTrackOrFail().getSettings();
    };
    RenderedCameraImpl.prototype.applyVideoConstraints = function (constraints) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if ("aspectRatio" in constraints) {
                    throw "Changing 'aspectRatio' in run-time is not yet supported.";
                }
                return [2, this.getFirstTrackOrFail().applyConstraints(constraints)];
            });
        });
    };
    RenderedCameraImpl.prototype.close = function () {
        if (this.isClosed) {
            return Promise.resolve();
        }
        var $this = this;
        return new Promise(function (resolve, _) {
            var tracks = $this.mediaStream.getVideoTracks();
            var tracksToClose = tracks.length;
            var tracksClosed = 0;
            $this.mediaStream.getVideoTracks().forEach(function (videoTrack) {
                $this.mediaStream.removeTrack(videoTrack);
                videoTrack.stop();
                ++tracksClosed;
                if (tracksClosed >= tracksToClose) {
                    $this.isClosed = true;
                    $this.parentElement.removeChild($this.surface);
                    resolve();
                }
            });
        });
    };
    RenderedCameraImpl.prototype.getCapabilities = function () {
        return new CameraCapabilitiesImpl(this.getFirstTrackOrFail());
    };
    return RenderedCameraImpl;
}());
var CameraImpl = (function () {
    function CameraImpl(mediaStream) {
        this.mediaStream = mediaStream;
    }
    CameraImpl.prototype.render = function (parentElement, options, callbacks) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, RenderedCameraImpl.create(parentElement, this.mediaStream, options, callbacks)];
            });
        });
    };
    CameraImpl.create = function (videoConstraints) {
        return __awaiter(this, void 0, void 0, function () {
            var constraints, mediaStream;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!navigator.mediaDevices) {
                            throw "navigator.mediaDevices not supported";
                        }
                        constraints = {
                            audio: false,
                            video: videoConstraints
                        };
                        return [4, navigator.mediaDevices.getUserMedia(constraints)];
                    case 1:
                        mediaStream = _a.sent();
                        return [2, new CameraImpl(mediaStream)];
                }
            });
        });
    };
    return CameraImpl;
}());
exports.CameraImpl = CameraImpl;
//# sourceMappingURL=core-impl.js.map