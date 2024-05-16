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
import { Html5QrcodeStrings } from "../strings";
var CameraRetriever = (function () {
    function CameraRetriever() {
    }
    CameraRetriever.retrieve = function () {
        if (navigator.mediaDevices) {
            return CameraRetriever.getCamerasFromMediaDevices();
        }
        var mst = MediaStreamTrack;
        if (MediaStreamTrack && mst.getSources) {
            return CameraRetriever.getCamerasFromMediaStreamTrack();
        }
        return CameraRetriever.rejectWithError();
    };
    CameraRetriever.rejectWithError = function () {
        var errorMessage = Html5QrcodeStrings.unableToQuerySupportedDevices();
        if (!CameraRetriever.isHttpsOrLocalhost()) {
            errorMessage = Html5QrcodeStrings.insecureContextCameraQueryError();
        }
        return Promise.reject(errorMessage);
    };
    CameraRetriever.isHttpsOrLocalhost = function () {
        if (location.protocol === "https:") {
            return true;
        }
        var host = location.host.split(":")[0];
        return host === "127.0.0.1" || host === "localhost";
    };
    CameraRetriever.getCamerasFromMediaDevices = function () {
        return __awaiter(this, void 0, void 0, function () {
            var closeActiveStreams, mediaStream, devices, results, _i, devices_1, device;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        closeActiveStreams = function (stream) {
                            var tracks = stream.getVideoTracks();
                            for (var _i = 0, tracks_1 = tracks; _i < tracks_1.length; _i++) {
                                var track = tracks_1[_i];
                                track.enabled = false;
                                track.stop();
                                stream.removeTrack(track);
                            }
                        };
                        return [4, navigator.mediaDevices.getUserMedia({ audio: false, video: true })];
                    case 1:
                        mediaStream = _a.sent();
                        return [4, navigator.mediaDevices.enumerateDevices()];
                    case 2:
                        devices = _a.sent();
                        results = [];
                        for (_i = 0, devices_1 = devices; _i < devices_1.length; _i++) {
                            device = devices_1[_i];
                            if (device.kind === "videoinput") {
                                results.push({
                                    id: device.deviceId,
                                    label: device.label
                                });
                            }
                        }
                        closeActiveStreams(mediaStream);
                        return [2, results];
                }
            });
        });
    };
    CameraRetriever.getCamerasFromMediaStreamTrack = function () {
        return new Promise(function (resolve, _) {
            var callback = function (sourceInfos) {
                var results = [];
                for (var _i = 0, sourceInfos_1 = sourceInfos; _i < sourceInfos_1.length; _i++) {
                    var sourceInfo = sourceInfos_1[_i];
                    if (sourceInfo.kind === "video") {
                        results.push({
                            id: sourceInfo.id,
                            label: sourceInfo.label
                        });
                    }
                }
                resolve(results);
            };
            var mst = MediaStreamTrack;
            mst.getSources(callback);
        });
    };
    return CameraRetriever;
}());
export { CameraRetriever };
//# sourceMappingURL=retriever.js.map