export var Html5QrcodeSupportedFormats;
(function (Html5QrcodeSupportedFormats) {
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["QR_CODE"] = 0] = "QR_CODE";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["AZTEC"] = 1] = "AZTEC";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["CODABAR"] = 2] = "CODABAR";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["CODE_39"] = 3] = "CODE_39";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["CODE_93"] = 4] = "CODE_93";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["CODE_128"] = 5] = "CODE_128";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["DATA_MATRIX"] = 6] = "DATA_MATRIX";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["MAXICODE"] = 7] = "MAXICODE";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["ITF"] = 8] = "ITF";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["EAN_13"] = 9] = "EAN_13";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["EAN_8"] = 10] = "EAN_8";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["PDF_417"] = 11] = "PDF_417";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["RSS_14"] = 12] = "RSS_14";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["RSS_EXPANDED"] = 13] = "RSS_EXPANDED";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["UPC_A"] = 14] = "UPC_A";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["UPC_E"] = 15] = "UPC_E";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["UPC_EAN_EXTENSION"] = 16] = "UPC_EAN_EXTENSION";
})(Html5QrcodeSupportedFormats || (Html5QrcodeSupportedFormats = {}));
var html5QrcodeSupportedFormatsTextMap = new Map([
    [Html5QrcodeSupportedFormats.QR_CODE, "QR_CODE"],
    [Html5QrcodeSupportedFormats.AZTEC, "AZTEC"],
    [Html5QrcodeSupportedFormats.CODABAR, "CODABAR"],
    [Html5QrcodeSupportedFormats.CODE_39, "CODE_39"],
    [Html5QrcodeSupportedFormats.CODE_93, "CODE_93"],
    [Html5QrcodeSupportedFormats.CODE_128, "CODE_128"],
    [Html5QrcodeSupportedFormats.DATA_MATRIX, "DATA_MATRIX"],
    [Html5QrcodeSupportedFormats.MAXICODE, "MAXICODE"],
    [Html5QrcodeSupportedFormats.ITF, "ITF"],
    [Html5QrcodeSupportedFormats.EAN_13, "EAN_13"],
    [Html5QrcodeSupportedFormats.EAN_8, "EAN_8"],
    [Html5QrcodeSupportedFormats.PDF_417, "PDF_417"],
    [Html5QrcodeSupportedFormats.RSS_14, "RSS_14"],
    [Html5QrcodeSupportedFormats.RSS_EXPANDED, "RSS_EXPANDED"],
    [Html5QrcodeSupportedFormats.UPC_A, "UPC_A"],
    [Html5QrcodeSupportedFormats.UPC_E, "UPC_E"],
    [Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION, "UPC_EAN_EXTENSION"]
]);
export var DecodedTextType;
(function (DecodedTextType) {
    DecodedTextType[DecodedTextType["UNKNOWN"] = 0] = "UNKNOWN";
    DecodedTextType[DecodedTextType["URL"] = 1] = "URL";
})(DecodedTextType || (DecodedTextType = {}));
export function isValidHtml5QrcodeSupportedFormats(format) {
    return Object.values(Html5QrcodeSupportedFormats).includes(format);
}
export var Html5QrcodeScanType;
(function (Html5QrcodeScanType) {
    Html5QrcodeScanType[Html5QrcodeScanType["SCAN_TYPE_CAMERA"] = 0] = "SCAN_TYPE_CAMERA";
    Html5QrcodeScanType[Html5QrcodeScanType["SCAN_TYPE_FILE"] = 1] = "SCAN_TYPE_FILE";
})(Html5QrcodeScanType || (Html5QrcodeScanType = {}));
var Html5QrcodeConstants = (function () {
    function Html5QrcodeConstants() {
    }
    Html5QrcodeConstants.GITHUB_PROJECT_URL = "https://github.com/mebjas/html5-qrcode";
    Html5QrcodeConstants.SCAN_DEFAULT_FPS = 2;
    Html5QrcodeConstants.DEFAULT_DISABLE_FLIP = false;
    Html5QrcodeConstants.DEFAULT_REMEMBER_LAST_CAMERA_USED = true;
    Html5QrcodeConstants.DEFAULT_SUPPORTED_SCAN_TYPE = [
        Html5QrcodeScanType.SCAN_TYPE_CAMERA,
        Html5QrcodeScanType.SCAN_TYPE_FILE
    ];
    return Html5QrcodeConstants;
}());
export { Html5QrcodeConstants };
var QrcodeResultFormat = (function () {
    function QrcodeResultFormat(format, formatName) {
        this.format = format;
        this.formatName = formatName;
    }
    QrcodeResultFormat.prototype.toString = function () {
        return this.formatName;
    };
    QrcodeResultFormat.create = function (format) {
        if (!html5QrcodeSupportedFormatsTextMap.has(format)) {
            throw "".concat(format, " not in html5QrcodeSupportedFormatsTextMap");
        }
        return new QrcodeResultFormat(format, html5QrcodeSupportedFormatsTextMap.get(format));
    };
    return QrcodeResultFormat;
}());
export { QrcodeResultFormat };
var Html5QrcodeResultFactory = (function () {
    function Html5QrcodeResultFactory() {
    }
    Html5QrcodeResultFactory.createFromText = function (decodedText) {
        var qrcodeResult = {
            text: decodedText
        };
        return {
            decodedText: decodedText,
            result: qrcodeResult
        };
    };
    Html5QrcodeResultFactory.createFromQrcodeResult = function (qrcodeResult) {
        return {
            decodedText: qrcodeResult.text,
            result: qrcodeResult
        };
    };
    return Html5QrcodeResultFactory;
}());
export { Html5QrcodeResultFactory };
export var Html5QrcodeErrorTypes;
(function (Html5QrcodeErrorTypes) {
    Html5QrcodeErrorTypes[Html5QrcodeErrorTypes["UNKWOWN_ERROR"] = 0] = "UNKWOWN_ERROR";
    Html5QrcodeErrorTypes[Html5QrcodeErrorTypes["IMPLEMENTATION_ERROR"] = 1] = "IMPLEMENTATION_ERROR";
    Html5QrcodeErrorTypes[Html5QrcodeErrorTypes["NO_CODE_FOUND_ERROR"] = 2] = "NO_CODE_FOUND_ERROR";
})(Html5QrcodeErrorTypes || (Html5QrcodeErrorTypes = {}));
var Html5QrcodeErrorFactory = (function () {
    function Html5QrcodeErrorFactory() {
    }
    Html5QrcodeErrorFactory.createFrom = function (error) {
        return {
            errorMessage: error,
            type: Html5QrcodeErrorTypes.UNKWOWN_ERROR
        };
    };
    return Html5QrcodeErrorFactory;
}());
export { Html5QrcodeErrorFactory };
var BaseLoggger = (function () {
    function BaseLoggger(verbose) {
        this.verbose = verbose;
    }
    BaseLoggger.prototype.log = function (message) {
        if (this.verbose) {
            console.log(message);
        }
    };
    BaseLoggger.prototype.warn = function (message) {
        if (this.verbose) {
            console.warn(message);
        }
    };
    BaseLoggger.prototype.logError = function (message, isExperimental) {
        if (this.verbose || isExperimental === true) {
            console.error(message);
        }
    };
    BaseLoggger.prototype.logErrors = function (errors) {
        if (errors.length === 0) {
            throw "Logger#logError called without arguments";
        }
        if (this.verbose) {
            console.error(errors);
        }
    };
    return BaseLoggger;
}());
export { BaseLoggger };
export function isNullOrUndefined(obj) {
    return (typeof obj === "undefined") || obj === null;
}
export function clip(value, minValue, maxValue) {
    if (value > maxValue) {
        return maxValue;
    }
    if (value < minValue) {
        return minValue;
    }
    return value;
}
//# sourceMappingURL=core.js.map