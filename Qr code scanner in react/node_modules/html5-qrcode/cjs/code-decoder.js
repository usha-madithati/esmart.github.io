"use strict";
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
exports.Html5QrcodeShim = void 0;
var zxing_html5_qrcode_decoder_1 = require("./zxing-html5-qrcode-decoder");
var native_bar_code_detector_1 = require("./native-bar-code-detector");
var Html5QrcodeShim = (function () {
    function Html5QrcodeShim(requestedFormats, useBarCodeDetectorIfSupported, verbose, logger) {
        this.EXECUTIONS_TO_REPORT_PERFORMANCE = 100;
        this.executions = 0;
        this.executionResults = [];
        this.wasPrimaryDecoderUsedInLastDecode = false;
        this.verbose = verbose;
        if (useBarCodeDetectorIfSupported
            && native_bar_code_detector_1.BarcodeDetectorDelegate.isSupported()) {
            this.primaryDecoder = new native_bar_code_detector_1.BarcodeDetectorDelegate(requestedFormats, verbose, logger);
            this.secondaryDecoder = new zxing_html5_qrcode_decoder_1.ZXingHtml5QrcodeDecoder(requestedFormats, verbose, logger);
        }
        else {
            this.primaryDecoder = new zxing_html5_qrcode_decoder_1.ZXingHtml5QrcodeDecoder(requestedFormats, verbose, logger);
        }
    }
    Html5QrcodeShim.prototype.decodeAsync = function (canvas) {
        return __awaiter(this, void 0, void 0, function () {
            var startTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startTime = performance.now();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4, this.getDecoder().decodeAsync(canvas)];
                    case 2: return [2, _a.sent()];
                    case 3:
                        this.possiblyLogPerformance(startTime);
                        return [7];
                    case 4: return [2];
                }
            });
        });
    };
    Html5QrcodeShim.prototype.decodeRobustlyAsync = function (canvas) {
        return __awaiter(this, void 0, void 0, function () {
            var startTime, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startTime = performance.now();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4, this.primaryDecoder.decodeAsync(canvas)];
                    case 2: return [2, _a.sent()];
                    case 3:
                        error_1 = _a.sent();
                        if (this.secondaryDecoder) {
                            return [2, this.secondaryDecoder.decodeAsync(canvas)];
                        }
                        throw error_1;
                    case 4:
                        this.possiblyLogPerformance(startTime);
                        return [7];
                    case 5: return [2];
                }
            });
        });
    };
    Html5QrcodeShim.prototype.getDecoder = function () {
        if (!this.secondaryDecoder) {
            return this.primaryDecoder;
        }
        if (this.wasPrimaryDecoderUsedInLastDecode === false) {
            this.wasPrimaryDecoderUsedInLastDecode = true;
            return this.primaryDecoder;
        }
        this.wasPrimaryDecoderUsedInLastDecode = false;
        return this.secondaryDecoder;
    };
    Html5QrcodeShim.prototype.possiblyLogPerformance = function (startTime) {
        if (!this.verbose) {
            return;
        }
        var executionTime = performance.now() - startTime;
        this.executionResults.push(executionTime);
        this.executions++;
        this.possiblyFlushPerformanceReport();
    };
    Html5QrcodeShim.prototype.possiblyFlushPerformanceReport = function () {
        if (this.executions < this.EXECUTIONS_TO_REPORT_PERFORMANCE) {
            return;
        }
        var sum = 0;
        for (var _i = 0, _a = this.executionResults; _i < _a.length; _i++) {
            var executionTime = _a[_i];
            sum += executionTime;
        }
        var mean = sum / this.executionResults.length;
        console.log("".concat(mean, " ms for ").concat(this.executionResults.length, " last runs."));
        this.executions = 0;
        this.executionResults = [];
    };
    return Html5QrcodeShim;
}());
exports.Html5QrcodeShim = Html5QrcodeShim;
//# sourceMappingURL=code-decoder.js.map