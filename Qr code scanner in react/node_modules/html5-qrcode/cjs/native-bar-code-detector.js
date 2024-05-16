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
exports.BarcodeDetectorDelegate = void 0;
var core_1 = require("./core");
var BarcodeDetectorDelegate = (function () {
    function BarcodeDetectorDelegate(requestedFormats, verbose, logger) {
        this.formatMap = new Map([
            [core_1.Html5QrcodeSupportedFormats.QR_CODE, "qr_code"],
            [core_1.Html5QrcodeSupportedFormats.AZTEC, "aztec"],
            [core_1.Html5QrcodeSupportedFormats.CODABAR, "codabar"],
            [core_1.Html5QrcodeSupportedFormats.CODE_39, "code_39"],
            [core_1.Html5QrcodeSupportedFormats.CODE_93, "code_93"],
            [core_1.Html5QrcodeSupportedFormats.CODE_128, "code_128"],
            [core_1.Html5QrcodeSupportedFormats.DATA_MATRIX, "data_matrix"],
            [core_1.Html5QrcodeSupportedFormats.ITF, "itf"],
            [core_1.Html5QrcodeSupportedFormats.EAN_13, "ean_13"],
            [core_1.Html5QrcodeSupportedFormats.EAN_8, "ean_8"],
            [core_1.Html5QrcodeSupportedFormats.PDF_417, "pdf417"],
            [core_1.Html5QrcodeSupportedFormats.UPC_A, "upc_a"],
            [core_1.Html5QrcodeSupportedFormats.UPC_E, "upc_e"]
        ]);
        this.reverseFormatMap = this.createReverseFormatMap();
        if (!BarcodeDetectorDelegate.isSupported()) {
            throw "Use html5qrcode.min.js without edit, Use "
                + "BarcodeDetectorDelegate only if it isSupported();";
        }
        this.verbose = verbose;
        this.logger = logger;
        var formats = this.createBarcodeDetectorFormats(requestedFormats);
        this.detector = new BarcodeDetector(formats);
        if (!this.detector) {
            throw "BarcodeDetector detector not supported";
        }
    }
    BarcodeDetectorDelegate.isSupported = function () {
        if (!("BarcodeDetector" in window)) {
            return false;
        }
        var dummyDetector = new BarcodeDetector({ formats: ["qr_code"] });
        return typeof dummyDetector !== "undefined";
    };
    BarcodeDetectorDelegate.prototype.decodeAsync = function (canvas) {
        return __awaiter(this, void 0, void 0, function () {
            var barcodes, largestBarcode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.detector.detect(canvas)];
                    case 1:
                        barcodes = _a.sent();
                        if (!barcodes || barcodes.length === 0) {
                            throw "No barcode or QR code detected.";
                        }
                        largestBarcode = this.selectLargestBarcode(barcodes);
                        return [2, {
                                text: largestBarcode.rawValue,
                                format: core_1.QrcodeResultFormat.create(this.toHtml5QrcodeSupportedFormats(largestBarcode.format)),
                                debugData: this.createDebugData()
                            }];
                }
            });
        });
    };
    BarcodeDetectorDelegate.prototype.selectLargestBarcode = function (barcodes) {
        var largestBarcode = null;
        var maxArea = 0;
        for (var _i = 0, barcodes_1 = barcodes; _i < barcodes_1.length; _i++) {
            var barcode = barcodes_1[_i];
            var area = barcode.boundingBox.width * barcode.boundingBox.height;
            if (area > maxArea) {
                maxArea = area;
                largestBarcode = barcode;
            }
        }
        if (!largestBarcode) {
            throw "No largest barcode found";
        }
        return largestBarcode;
    };
    BarcodeDetectorDelegate.prototype.createBarcodeDetectorFormats = function (requestedFormats) {
        var formats = [];
        for (var _i = 0, requestedFormats_1 = requestedFormats; _i < requestedFormats_1.length; _i++) {
            var requestedFormat = requestedFormats_1[_i];
            if (this.formatMap.has(requestedFormat)) {
                formats.push(this.formatMap.get(requestedFormat));
            }
            else {
                this.logger.warn("".concat(requestedFormat, " is not supported by")
                    + "BarcodeDetectorDelegate");
            }
        }
        return { formats: formats };
    };
    BarcodeDetectorDelegate.prototype.toHtml5QrcodeSupportedFormats = function (barcodeDetectorFormat) {
        if (!this.reverseFormatMap.has(barcodeDetectorFormat)) {
            throw "reverseFormatMap doesn't have ".concat(barcodeDetectorFormat);
        }
        return this.reverseFormatMap.get(barcodeDetectorFormat);
    };
    BarcodeDetectorDelegate.prototype.createReverseFormatMap = function () {
        var result = new Map();
        this.formatMap.forEach(function (value, key, _) {
            result.set(value, key);
        });
        return result;
    };
    BarcodeDetectorDelegate.prototype.createDebugData = function () {
        return { decoderName: "BarcodeDetector" };
    };
    return BarcodeDetectorDelegate;
}());
exports.BarcodeDetectorDelegate = BarcodeDetectorDelegate;
//# sourceMappingURL=native-bar-code-detector.js.map