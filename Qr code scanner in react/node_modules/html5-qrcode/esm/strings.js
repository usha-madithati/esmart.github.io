var Html5QrcodeStrings = (function () {
    function Html5QrcodeStrings() {
    }
    Html5QrcodeStrings.codeParseError = function (exception) {
        return "QR code parse error, error = ".concat(exception);
    };
    Html5QrcodeStrings.errorGettingUserMedia = function (error) {
        return "Error getting userMedia, error = ".concat(error);
    };
    Html5QrcodeStrings.onlyDeviceSupportedError = function () {
        return "The device doesn't support navigator.mediaDevices , only "
            + "supported cameraIdOrConfig in this case is deviceId parameter "
            + "(string).";
    };
    Html5QrcodeStrings.cameraStreamingNotSupported = function () {
        return "Camera streaming not supported by the browser.";
    };
    Html5QrcodeStrings.unableToQuerySupportedDevices = function () {
        return "Unable to query supported devices, unknown error.";
    };
    Html5QrcodeStrings.insecureContextCameraQueryError = function () {
        return "Camera access is only supported in secure context like https "
            + "or localhost.";
    };
    Html5QrcodeStrings.scannerPaused = function () {
        return "Scanner paused";
    };
    return Html5QrcodeStrings;
}());
export { Html5QrcodeStrings };
var Html5QrcodeScannerStrings = (function () {
    function Html5QrcodeScannerStrings() {
    }
    Html5QrcodeScannerStrings.scanningStatus = function () {
        return "Scanning";
    };
    Html5QrcodeScannerStrings.idleStatus = function () {
        return "Idle";
    };
    Html5QrcodeScannerStrings.errorStatus = function () {
        return "Error";
    };
    Html5QrcodeScannerStrings.permissionStatus = function () {
        return "Permission";
    };
    Html5QrcodeScannerStrings.noCameraFoundErrorStatus = function () {
        return "No Cameras";
    };
    Html5QrcodeScannerStrings.lastMatch = function (decodedText) {
        return "Last Match: ".concat(decodedText);
    };
    Html5QrcodeScannerStrings.codeScannerTitle = function () {
        return "Code Scanner";
    };
    Html5QrcodeScannerStrings.cameraPermissionTitle = function () {
        return "Request Camera Permissions";
    };
    Html5QrcodeScannerStrings.cameraPermissionRequesting = function () {
        return "Requesting camera permissions...";
    };
    Html5QrcodeScannerStrings.noCameraFound = function () {
        return "No camera found";
    };
    Html5QrcodeScannerStrings.scanButtonStopScanningText = function () {
        return "Stop Scanning";
    };
    Html5QrcodeScannerStrings.scanButtonStartScanningText = function () {
        return "Start Scanning";
    };
    Html5QrcodeScannerStrings.torchOnButton = function () {
        return "Switch On Torch";
    };
    Html5QrcodeScannerStrings.torchOffButton = function () {
        return "Switch Off Torch";
    };
    Html5QrcodeScannerStrings.torchOnFailedMessage = function () {
        return "Failed to turn on torch";
    };
    Html5QrcodeScannerStrings.torchOffFailedMessage = function () {
        return "Failed to turn off torch";
    };
    Html5QrcodeScannerStrings.scanButtonScanningStarting = function () {
        return "Launching Camera...";
    };
    Html5QrcodeScannerStrings.textIfCameraScanSelected = function () {
        return "Scan an Image File";
    };
    Html5QrcodeScannerStrings.textIfFileScanSelected = function () {
        return "Scan using camera directly";
    };
    Html5QrcodeScannerStrings.selectCamera = function () {
        return "Select Camera";
    };
    Html5QrcodeScannerStrings.fileSelectionChooseImage = function () {
        return "Choose Image";
    };
    Html5QrcodeScannerStrings.fileSelectionChooseAnother = function () {
        return "Choose Another";
    };
    Html5QrcodeScannerStrings.fileSelectionNoImageSelected = function () {
        return "No image choosen";
    };
    Html5QrcodeScannerStrings.anonymousCameraPrefix = function () {
        return "Anonymous Camera";
    };
    Html5QrcodeScannerStrings.dragAndDropMessage = function () {
        return "Or drop an image to scan";
    };
    Html5QrcodeScannerStrings.dragAndDropMessageOnlyImages = function () {
        return "Or drop an image to scan (other files not supported)";
    };
    Html5QrcodeScannerStrings.zoom = function () {
        return "zoom";
    };
    Html5QrcodeScannerStrings.loadingImage = function () {
        return "Loading image...";
    };
    Html5QrcodeScannerStrings.cameraScanAltText = function () {
        return "Camera based scan";
    };
    Html5QrcodeScannerStrings.fileScanAltText = function () {
        return "Fule based scan";
    };
    return Html5QrcodeScannerStrings;
}());
export { Html5QrcodeScannerStrings };
var LibraryInfoStrings = (function () {
    function LibraryInfoStrings() {
    }
    LibraryInfoStrings.poweredBy = function () {
        return "Powered by ";
    };
    LibraryInfoStrings.reportIssues = function () {
        return "Report issues";
    };
    return LibraryInfoStrings;
}());
export { LibraryInfoStrings };
//# sourceMappingURL=strings.js.map