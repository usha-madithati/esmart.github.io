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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Html5Qrcode = void 0;
var core_1 = require("./core");
var strings_1 = require("./strings");
var utils_1 = require("./utils");
var code_decoder_1 = require("./code-decoder");
var factories_1 = require("./camera/factories");
var retriever_1 = require("./camera/retriever");
var state_manager_1 = require("./state-manager");
var Constants = (function (_super) {
    __extends(Constants, _super);
    function Constants() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Constants.DEFAULT_WIDTH = 300;
    Constants.DEFAULT_WIDTH_OFFSET = 2;
    Constants.FILE_SCAN_MIN_HEIGHT = 300;
    Constants.FILE_SCAN_HIDDEN_CANVAS_PADDING = 100;
    Constants.MIN_QR_BOX_SIZE = 50;
    Constants.SHADED_LEFT = 1;
    Constants.SHADED_RIGHT = 2;
    Constants.SHADED_TOP = 3;
    Constants.SHADED_BOTTOM = 4;
    Constants.SHADED_REGION_ELEMENT_ID = "qr-shaded-region";
    Constants.VERBOSE = false;
    Constants.BORDER_SHADER_DEFAULT_COLOR = "#ffffff";
    Constants.BORDER_SHADER_MATCH_COLOR = "rgb(90, 193, 56)";
    return Constants;
}(core_1.Html5QrcodeConstants));
var InternalHtml5QrcodeConfig = (function () {
    function InternalHtml5QrcodeConfig(config, logger) {
        this.logger = logger;
        this.fps = Constants.SCAN_DEFAULT_FPS;
        if (!config) {
            this.disableFlip = Constants.DEFAULT_DISABLE_FLIP;
        }
        else {
            if (config.fps) {
                this.fps = config.fps;
            }
            this.disableFlip = config.disableFlip === true;
            this.qrbox = config.qrbox;
            this.aspectRatio = config.aspectRatio;
            this.videoConstraints = config.videoConstraints;
        }
    }
    InternalHtml5QrcodeConfig.prototype.isMediaStreamConstraintsValid = function () {
        if (!this.videoConstraints) {
            this.logger.logError("Empty videoConstraints", true);
            return false;
        }
        return utils_1.VideoConstraintsUtil.isMediaStreamConstraintsValid(this.videoConstraints, this.logger);
    };
    InternalHtml5QrcodeConfig.prototype.isShadedBoxEnabled = function () {
        return !(0, core_1.isNullOrUndefined)(this.qrbox);
    };
    InternalHtml5QrcodeConfig.create = function (config, logger) {
        return new InternalHtml5QrcodeConfig(config, logger);
    };
    return InternalHtml5QrcodeConfig;
}());
var Html5Qrcode = (function () {
    function Html5Qrcode(elementId, configOrVerbosityFlag) {
        this.element = null;
        this.canvasElement = null;
        this.scannerPausedUiElement = null;
        this.hasBorderShaders = null;
        this.borderShaders = null;
        this.qrMatch = null;
        this.renderedCamera = null;
        this.qrRegion = null;
        this.context = null;
        this.lastScanImageFile = null;
        this.isScanning = false;
        if (!document.getElementById(elementId)) {
            throw "HTML Element with id=".concat(elementId, " not found");
        }
        this.elementId = elementId;
        this.verbose = false;
        var experimentalFeatureConfig;
        var configObject;
        if (typeof configOrVerbosityFlag == "boolean") {
            this.verbose = configOrVerbosityFlag === true;
        }
        else if (configOrVerbosityFlag) {
            configObject = configOrVerbosityFlag;
            this.verbose = configObject.verbose === true;
            experimentalFeatureConfig = configObject.experimentalFeatures;
        }
        this.logger = new core_1.BaseLoggger(this.verbose);
        this.qrcode = new code_decoder_1.Html5QrcodeShim(this.getSupportedFormats(configOrVerbosityFlag), this.getUseBarCodeDetectorIfSupported(configObject), this.verbose, this.logger);
        this.foreverScanTimeout;
        this.shouldScan = true;
        this.stateManagerProxy = state_manager_1.StateManagerFactory.create();
    }
    Html5Qrcode.prototype.start = function (cameraIdOrConfig, configuration, qrCodeSuccessCallback, qrCodeErrorCallback) {
        var _this = this;
        if (!cameraIdOrConfig) {
            throw "cameraIdOrConfig is required";
        }
        if (!qrCodeSuccessCallback
            || typeof qrCodeSuccessCallback != "function") {
            throw "qrCodeSuccessCallback is required and should be a function.";
        }
        var qrCodeErrorCallbackInternal;
        if (qrCodeErrorCallback) {
            qrCodeErrorCallbackInternal = qrCodeErrorCallback;
        }
        else {
            qrCodeErrorCallbackInternal
                = this.verbose ? this.logger.log : function () { };
        }
        var internalConfig = InternalHtml5QrcodeConfig.create(configuration, this.logger);
        this.clearElement();
        var videoConstraintsAvailableAndValid = false;
        if (internalConfig.videoConstraints) {
            if (!internalConfig.isMediaStreamConstraintsValid()) {
                this.logger.logError("'videoConstraints' is not valid 'MediaStreamConstraints, "
                    + "it will be ignored.'", true);
            }
            else {
                videoConstraintsAvailableAndValid = true;
            }
        }
        var areVideoConstraintsEnabled = videoConstraintsAvailableAndValid;
        var element = document.getElementById(this.elementId);
        var rootElementWidth = element.clientWidth
            ? element.clientWidth : Constants.DEFAULT_WIDTH;
        element.style.position = "relative";
        this.shouldScan = true;
        this.element = element;
        var $this = this;
        var toScanningStateChangeTransaction = this.stateManagerProxy.startTransition(state_manager_1.Html5QrcodeScannerState.SCANNING);
        return new Promise(function (resolve, reject) {
            var videoConstraints = areVideoConstraintsEnabled
                ? internalConfig.videoConstraints
                : $this.createVideoConstraints(cameraIdOrConfig);
            if (!videoConstraints) {
                toScanningStateChangeTransaction.cancel();
                reject("videoConstraints should be defined");
                return;
            }
            var cameraRenderingOptions = {};
            if (!areVideoConstraintsEnabled || internalConfig.aspectRatio) {
                cameraRenderingOptions.aspectRatio = internalConfig.aspectRatio;
            }
            var renderingCallbacks = {
                onRenderSurfaceReady: function (viewfinderWidth, viewfinderHeight) {
                    $this.setupUi(viewfinderWidth, viewfinderHeight, internalConfig);
                    $this.isScanning = true;
                    $this.foreverScan(internalConfig, qrCodeSuccessCallback, qrCodeErrorCallbackInternal);
                }
            };
            factories_1.CameraFactory.failIfNotSupported().then(function (factory) {
                factory.create(videoConstraints).then(function (camera) {
                    return camera.render(_this.element, cameraRenderingOptions, renderingCallbacks)
                        .then(function (renderedCamera) {
                        $this.renderedCamera = renderedCamera;
                        toScanningStateChangeTransaction.execute();
                        resolve(null);
                    })
                        .catch(function (error) {
                        toScanningStateChangeTransaction.cancel();
                        reject(error);
                    });
                }).catch(function (error) {
                    toScanningStateChangeTransaction.cancel();
                    reject(strings_1.Html5QrcodeStrings.errorGettingUserMedia(error));
                });
            }).catch(function (_) {
                toScanningStateChangeTransaction.cancel();
                reject(strings_1.Html5QrcodeStrings.cameraStreamingNotSupported());
            });
        });
    };
    Html5Qrcode.prototype.pause = function (shouldPauseVideo) {
        if (!this.stateManagerProxy.isStrictlyScanning()) {
            throw "Cannot pause, scanner is not scanning.";
        }
        this.stateManagerProxy.directTransition(state_manager_1.Html5QrcodeScannerState.PAUSED);
        this.showPausedState();
        if ((0, core_1.isNullOrUndefined)(shouldPauseVideo) || shouldPauseVideo !== true) {
            shouldPauseVideo = false;
        }
        if (shouldPauseVideo && this.renderedCamera) {
            this.renderedCamera.pause();
        }
    };
    Html5Qrcode.prototype.resume = function () {
        if (!this.stateManagerProxy.isPaused()) {
            throw "Cannot result, scanner is not paused.";
        }
        if (!this.renderedCamera) {
            throw "renderedCamera doesn't exist while trying resume()";
        }
        var $this = this;
        var transitionToScanning = function () {
            $this.stateManagerProxy.directTransition(state_manager_1.Html5QrcodeScannerState.SCANNING);
            $this.hidePausedState();
        };
        if (!this.renderedCamera.isPaused()) {
            transitionToScanning();
            return;
        }
        this.renderedCamera.resume(function () {
            transitionToScanning();
        });
    };
    Html5Qrcode.prototype.getState = function () {
        return this.stateManagerProxy.getState();
    };
    Html5Qrcode.prototype.stop = function () {
        var _this = this;
        if (!this.stateManagerProxy.isScanning()) {
            throw "Cannot stop, scanner is not running or paused.";
        }
        var toStoppedStateTransaction = this.stateManagerProxy.startTransition(state_manager_1.Html5QrcodeScannerState.NOT_STARTED);
        this.shouldScan = false;
        if (this.foreverScanTimeout) {
            clearTimeout(this.foreverScanTimeout);
        }
        var removeQrRegion = function () {
            if (!_this.element) {
                return;
            }
            var childElement = document.getElementById(Constants.SHADED_REGION_ELEMENT_ID);
            if (childElement) {
                _this.element.removeChild(childElement);
            }
        };
        var $this = this;
        return this.renderedCamera.close().then(function () {
            $this.renderedCamera = null;
            if ($this.element) {
                $this.element.removeChild($this.canvasElement);
                $this.canvasElement = null;
            }
            removeQrRegion();
            if ($this.qrRegion) {
                $this.qrRegion = null;
            }
            if ($this.context) {
                $this.context = null;
            }
            toStoppedStateTransaction.execute();
            $this.hidePausedState();
            $this.isScanning = false;
            return Promise.resolve();
        });
    };
    Html5Qrcode.prototype.scanFile = function (imageFile, showImage) {
        return this.scanFileV2(imageFile, showImage)
            .then(function (html5qrcodeResult) { return html5qrcodeResult.decodedText; });
    };
    Html5Qrcode.prototype.scanFileV2 = function (imageFile, showImage) {
        var _this = this;
        if (!imageFile || !(imageFile instanceof File)) {
            throw "imageFile argument is mandatory and should be instance "
                + "of File. Use 'event.target.files[0]'.";
        }
        if ((0, core_1.isNullOrUndefined)(showImage)) {
            showImage = true;
        }
        if (!this.stateManagerProxy.canScanFile()) {
            throw "Cannot start file scan - ongoing camera scan";
        }
        return new Promise(function (resolve, reject) {
            _this.possiblyCloseLastScanImageFile();
            _this.clearElement();
            _this.lastScanImageFile = URL.createObjectURL(imageFile);
            var inputImage = new Image;
            inputImage.onload = function () {
                var imageWidth = inputImage.width;
                var imageHeight = inputImage.height;
                var element = document.getElementById(_this.elementId);
                var containerWidth = element.clientWidth
                    ? element.clientWidth : Constants.DEFAULT_WIDTH;
                var containerHeight = Math.max(element.clientHeight ? element.clientHeight : imageHeight, Constants.FILE_SCAN_MIN_HEIGHT);
                var config = _this.computeCanvasDrawConfig(imageWidth, imageHeight, containerWidth, containerHeight);
                if (showImage) {
                    var visibleCanvas = _this.createCanvasElement(containerWidth, containerHeight, "qr-canvas-visible");
                    visibleCanvas.style.display = "inline-block";
                    element.appendChild(visibleCanvas);
                    var context_1 = visibleCanvas.getContext("2d");
                    if (!context_1) {
                        throw "Unable to get 2d context from canvas";
                    }
                    context_1.canvas.width = containerWidth;
                    context_1.canvas.height = containerHeight;
                    context_1.drawImage(inputImage, 0, 0, imageWidth, imageHeight, config.x, config.y, config.width, config.height);
                }
                var padding = Constants.FILE_SCAN_HIDDEN_CANVAS_PADDING;
                var hiddenImageWidth = Math.max(inputImage.width, config.width);
                var hiddenImageHeight = Math.max(inputImage.height, config.height);
                var hiddenCanvasWidth = hiddenImageWidth + 2 * padding;
                var hiddenCanvasHeight = hiddenImageHeight + 2 * padding;
                var hiddenCanvas = _this.createCanvasElement(hiddenCanvasWidth, hiddenCanvasHeight);
                element.appendChild(hiddenCanvas);
                var context = hiddenCanvas.getContext("2d");
                if (!context) {
                    throw "Unable to get 2d context from canvas";
                }
                context.canvas.width = hiddenCanvasWidth;
                context.canvas.height = hiddenCanvasHeight;
                context.drawImage(inputImage, 0, 0, imageWidth, imageHeight, padding, padding, hiddenImageWidth, hiddenImageHeight);
                try {
                    _this.qrcode.decodeRobustlyAsync(hiddenCanvas)
                        .then(function (result) {
                        resolve(core_1.Html5QrcodeResultFactory.createFromQrcodeResult(result));
                    })
                        .catch(reject);
                }
                catch (exception) {
                    reject("QR code parse error, error = ".concat(exception));
                }
            };
            inputImage.onerror = reject;
            inputImage.onabort = reject;
            inputImage.onstalled = reject;
            inputImage.onsuspend = reject;
            inputImage.src = URL.createObjectURL(imageFile);
        });
    };
    Html5Qrcode.prototype.clear = function () {
        this.clearElement();
    };
    Html5Qrcode.getCameras = function () {
        return retriever_1.CameraRetriever.retrieve();
    };
    Html5Qrcode.prototype.getRunningTrackCapabilities = function () {
        return this.getRenderedCameraOrFail().getRunningTrackCapabilities();
    };
    Html5Qrcode.prototype.getRunningTrackSettings = function () {
        return this.getRenderedCameraOrFail().getRunningTrackSettings();
    };
    Html5Qrcode.prototype.getRunningTrackCameraCapabilities = function () {
        return this.getRenderedCameraOrFail().getCapabilities();
    };
    Html5Qrcode.prototype.applyVideoConstraints = function (videoConstaints) {
        if (!videoConstaints) {
            throw "videoConstaints is required argument.";
        }
        else if (!utils_1.VideoConstraintsUtil.isMediaStreamConstraintsValid(videoConstaints, this.logger)) {
            throw "invalid videoConstaints passed, check logs for more details";
        }
        return this.getRenderedCameraOrFail().applyVideoConstraints(videoConstaints);
    };
    Html5Qrcode.prototype.getRenderedCameraOrFail = function () {
        if (this.renderedCamera == null) {
            throw "Scanning is not in running state, call this API only when"
                + " QR code scanning using camera is in running state.";
        }
        return this.renderedCamera;
    };
    Html5Qrcode.prototype.getSupportedFormats = function (configOrVerbosityFlag) {
        var allFormats = [
            core_1.Html5QrcodeSupportedFormats.QR_CODE,
            core_1.Html5QrcodeSupportedFormats.AZTEC,
            core_1.Html5QrcodeSupportedFormats.CODABAR,
            core_1.Html5QrcodeSupportedFormats.CODE_39,
            core_1.Html5QrcodeSupportedFormats.CODE_93,
            core_1.Html5QrcodeSupportedFormats.CODE_128,
            core_1.Html5QrcodeSupportedFormats.DATA_MATRIX,
            core_1.Html5QrcodeSupportedFormats.MAXICODE,
            core_1.Html5QrcodeSupportedFormats.ITF,
            core_1.Html5QrcodeSupportedFormats.EAN_13,
            core_1.Html5QrcodeSupportedFormats.EAN_8,
            core_1.Html5QrcodeSupportedFormats.PDF_417,
            core_1.Html5QrcodeSupportedFormats.RSS_14,
            core_1.Html5QrcodeSupportedFormats.RSS_EXPANDED,
            core_1.Html5QrcodeSupportedFormats.UPC_A,
            core_1.Html5QrcodeSupportedFormats.UPC_E,
            core_1.Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
        ];
        if (!configOrVerbosityFlag
            || typeof configOrVerbosityFlag == "boolean") {
            return allFormats;
        }
        if (!configOrVerbosityFlag.formatsToSupport) {
            return allFormats;
        }
        if (!Array.isArray(configOrVerbosityFlag.formatsToSupport)) {
            throw "configOrVerbosityFlag.formatsToSupport should be undefined "
                + "or an array.";
        }
        if (configOrVerbosityFlag.formatsToSupport.length === 0) {
            throw "Atleast 1 formatsToSupport is needed.";
        }
        var supportedFormats = [];
        for (var _i = 0, _a = configOrVerbosityFlag.formatsToSupport; _i < _a.length; _i++) {
            var format = _a[_i];
            if ((0, core_1.isValidHtml5QrcodeSupportedFormats)(format)) {
                supportedFormats.push(format);
            }
            else {
                this.logger.warn("Invalid format: ".concat(format, " passed in config, ignoring."));
            }
        }
        if (supportedFormats.length === 0) {
            throw "None of formatsToSupport match supported values.";
        }
        return supportedFormats;
    };
    Html5Qrcode.prototype.getUseBarCodeDetectorIfSupported = function (config) {
        if ((0, core_1.isNullOrUndefined)(config)) {
            return true;
        }
        if (!(0, core_1.isNullOrUndefined)(config.useBarCodeDetectorIfSupported)) {
            return config.useBarCodeDetectorIfSupported !== false;
        }
        if ((0, core_1.isNullOrUndefined)(config.experimentalFeatures)) {
            return true;
        }
        var experimentalFeatures = config.experimentalFeatures;
        if ((0, core_1.isNullOrUndefined)(experimentalFeatures.useBarCodeDetectorIfSupported)) {
            return true;
        }
        return experimentalFeatures.useBarCodeDetectorIfSupported !== false;
    };
    Html5Qrcode.prototype.validateQrboxSize = function (viewfinderWidth, viewfinderHeight, internalConfig) {
        var _this = this;
        var qrboxSize = internalConfig.qrbox;
        this.validateQrboxConfig(qrboxSize);
        var qrDimensions = this.toQrdimensions(viewfinderWidth, viewfinderHeight, qrboxSize);
        var validateMinSize = function (size) {
            if (size < Constants.MIN_QR_BOX_SIZE) {
                throw "minimum size of 'config.qrbox' dimension value is"
                    + " ".concat(Constants.MIN_QR_BOX_SIZE, "px.");
            }
        };
        var correctWidthBasedOnRootElementSize = function (configWidth) {
            if (configWidth > viewfinderWidth) {
                _this.logger.warn("`qrbox.width` or `qrbox` is larger than the"
                    + " width of the root element. The width will be truncated"
                    + " to the width of root element.");
                configWidth = viewfinderWidth;
            }
            return configWidth;
        };
        validateMinSize(qrDimensions.width);
        validateMinSize(qrDimensions.height);
        qrDimensions.width = correctWidthBasedOnRootElementSize(qrDimensions.width);
    };
    Html5Qrcode.prototype.validateQrboxConfig = function (qrboxSize) {
        if (typeof qrboxSize === "number") {
            return;
        }
        if (typeof qrboxSize === "function") {
            return;
        }
        if (qrboxSize.width === undefined || qrboxSize.height === undefined) {
            throw "Invalid instance of QrDimensions passed for "
                + "'config.qrbox'. Both 'width' and 'height' should be set.";
        }
    };
    Html5Qrcode.prototype.toQrdimensions = function (viewfinderWidth, viewfinderHeight, qrboxSize) {
        if (typeof qrboxSize === "number") {
            return { width: qrboxSize, height: qrboxSize };
        }
        else if (typeof qrboxSize === "function") {
            try {
                return qrboxSize(viewfinderWidth, viewfinderHeight);
            }
            catch (error) {
                throw new Error("qrbox config was passed as a function but it failed with "
                    + "unknown error" + error);
            }
        }
        return qrboxSize;
    };
    Html5Qrcode.prototype.setupUi = function (viewfinderWidth, viewfinderHeight, internalConfig) {
        if (internalConfig.isShadedBoxEnabled()) {
            this.validateQrboxSize(viewfinderWidth, viewfinderHeight, internalConfig);
        }
        var qrboxSize = (0, core_1.isNullOrUndefined)(internalConfig.qrbox) ?
            { width: viewfinderWidth, height: viewfinderHeight } : internalConfig.qrbox;
        this.validateQrboxConfig(qrboxSize);
        var qrDimensions = this.toQrdimensions(viewfinderWidth, viewfinderHeight, qrboxSize);
        if (qrDimensions.height > viewfinderHeight) {
            this.logger.warn("[Html5Qrcode] config.qrbox has height that is"
                + "greater than the height of the video stream. Shading will be"
                + " ignored");
        }
        var shouldShadingBeApplied = internalConfig.isShadedBoxEnabled()
            && qrDimensions.height <= viewfinderHeight;
        var defaultQrRegion = {
            x: 0,
            y: 0,
            width: viewfinderWidth,
            height: viewfinderHeight
        };
        var qrRegion = shouldShadingBeApplied
            ? this.getShadedRegionBounds(viewfinderWidth, viewfinderHeight, qrDimensions)
            : defaultQrRegion;
        var canvasElement = this.createCanvasElement(qrRegion.width, qrRegion.height);
        var contextAttributes = { willReadFrequently: true };
        var context = canvasElement.getContext("2d", contextAttributes);
        context.canvas.width = qrRegion.width;
        context.canvas.height = qrRegion.height;
        this.element.append(canvasElement);
        if (shouldShadingBeApplied) {
            this.possiblyInsertShadingElement(this.element, viewfinderWidth, viewfinderHeight, qrDimensions);
        }
        this.createScannerPausedUiElement(this.element);
        this.qrRegion = qrRegion;
        this.context = context;
        this.canvasElement = canvasElement;
    };
    Html5Qrcode.prototype.createScannerPausedUiElement = function (rootElement) {
        var scannerPausedUiElement = document.createElement("div");
        scannerPausedUiElement.innerText = strings_1.Html5QrcodeStrings.scannerPaused();
        scannerPausedUiElement.style.display = "none";
        scannerPausedUiElement.style.position = "absolute";
        scannerPausedUiElement.style.top = "0px";
        scannerPausedUiElement.style.zIndex = "1";
        scannerPausedUiElement.style.background = "rgba(9, 9, 9, 0.46)";
        scannerPausedUiElement.style.color = "#FFECEC";
        scannerPausedUiElement.style.textAlign = "center";
        scannerPausedUiElement.style.width = "100%";
        rootElement.appendChild(scannerPausedUiElement);
        this.scannerPausedUiElement = scannerPausedUiElement;
    };
    Html5Qrcode.prototype.scanContext = function (qrCodeSuccessCallback, qrCodeErrorCallback) {
        var _this = this;
        if (this.stateManagerProxy.isPaused()) {
            return Promise.resolve(false);
        }
        return this.qrcode.decodeAsync(this.canvasElement)
            .then(function (result) {
            qrCodeSuccessCallback(result.text, core_1.Html5QrcodeResultFactory.createFromQrcodeResult(result));
            _this.possiblyUpdateShaders(true);
            return true;
        }).catch(function (error) {
            _this.possiblyUpdateShaders(false);
            var errorMessage = strings_1.Html5QrcodeStrings.codeParseError(error);
            qrCodeErrorCallback(errorMessage, core_1.Html5QrcodeErrorFactory.createFrom(errorMessage));
            return false;
        });
    };
    Html5Qrcode.prototype.foreverScan = function (internalConfig, qrCodeSuccessCallback, qrCodeErrorCallback) {
        var _this = this;
        if (!this.shouldScan) {
            return;
        }
        if (!this.renderedCamera) {
            return;
        }
        var videoElement = this.renderedCamera.getSurface();
        var widthRatio = videoElement.videoWidth / videoElement.clientWidth;
        var heightRatio = videoElement.videoHeight / videoElement.clientHeight;
        if (!this.qrRegion) {
            throw "qrRegion undefined when localMediaStream is ready.";
        }
        var sWidthOffset = this.qrRegion.width * widthRatio;
        var sHeightOffset = this.qrRegion.height * heightRatio;
        var sxOffset = this.qrRegion.x * widthRatio;
        var syOffset = this.qrRegion.y * heightRatio;
        this.context.drawImage(videoElement, sxOffset, syOffset, sWidthOffset, sHeightOffset, 0, 0, this.qrRegion.width, this.qrRegion.height);
        var triggerNextScan = function () {
            _this.foreverScanTimeout = setTimeout(function () {
                _this.foreverScan(internalConfig, qrCodeSuccessCallback, qrCodeErrorCallback);
            }, _this.getTimeoutFps(internalConfig.fps));
        };
        this.scanContext(qrCodeSuccessCallback, qrCodeErrorCallback)
            .then(function (isSuccessfull) {
            if (!isSuccessfull && internalConfig.disableFlip !== true) {
                _this.context.translate(_this.context.canvas.width, 0);
                _this.context.scale(-1, 1);
                _this.scanContext(qrCodeSuccessCallback, qrCodeErrorCallback)
                    .finally(function () {
                    triggerNextScan();
                });
            }
            else {
                triggerNextScan();
            }
        }).catch(function (error) {
            _this.logger.logError("Error happend while scanning context", error);
            triggerNextScan();
        });
    };
    Html5Qrcode.prototype.createVideoConstraints = function (cameraIdOrConfig) {
        if (typeof cameraIdOrConfig == "string") {
            return { deviceId: { exact: cameraIdOrConfig } };
        }
        else if (typeof cameraIdOrConfig == "object") {
            var facingModeKey = "facingMode";
            var deviceIdKey = "deviceId";
            var allowedFacingModeValues_1 = { "user": true, "environment": true };
            var exactKey = "exact";
            var isValidFacingModeValue = function (value) {
                if (value in allowedFacingModeValues_1) {
                    return true;
                }
                else {
                    throw "config has invalid 'facingMode' value = "
                        + "'".concat(value, "'");
                }
            };
            var keys = Object.keys(cameraIdOrConfig);
            if (keys.length !== 1) {
                throw "'cameraIdOrConfig' object should have exactly 1 key,"
                    + " if passed as an object, found ".concat(keys.length, " keys");
            }
            var key = Object.keys(cameraIdOrConfig)[0];
            if (key !== facingModeKey && key !== deviceIdKey) {
                throw "Only '".concat(facingModeKey, "' and '").concat(deviceIdKey, "' ")
                    + " are supported for 'cameraIdOrConfig'";
            }
            if (key === facingModeKey) {
                var facingMode = cameraIdOrConfig.facingMode;
                if (typeof facingMode == "string") {
                    if (isValidFacingModeValue(facingMode)) {
                        return { facingMode: facingMode };
                    }
                }
                else if (typeof facingMode == "object") {
                    if (exactKey in facingMode) {
                        if (isValidFacingModeValue(facingMode["".concat(exactKey)])) {
                            return {
                                facingMode: {
                                    exact: facingMode["".concat(exactKey)]
                                }
                            };
                        }
                    }
                    else {
                        throw "'facingMode' should be string or object with"
                            + " ".concat(exactKey, " as key.");
                    }
                }
                else {
                    var type_1 = (typeof facingMode);
                    throw "Invalid type of 'facingMode' = ".concat(type_1);
                }
            }
            else {
                var deviceId = cameraIdOrConfig.deviceId;
                if (typeof deviceId == "string") {
                    return { deviceId: deviceId };
                }
                else if (typeof deviceId == "object") {
                    if (exactKey in deviceId) {
                        return {
                            deviceId: { exact: deviceId["".concat(exactKey)] }
                        };
                    }
                    else {
                        throw "'deviceId' should be string or object with"
                            + " ".concat(exactKey, " as key.");
                    }
                }
                else {
                    var type_2 = (typeof deviceId);
                    throw "Invalid type of 'deviceId' = ".concat(type_2);
                }
            }
        }
        var type = (typeof cameraIdOrConfig);
        throw "Invalid type of 'cameraIdOrConfig' = ".concat(type);
    };
    Html5Qrcode.prototype.computeCanvasDrawConfig = function (imageWidth, imageHeight, containerWidth, containerHeight) {
        if (imageWidth <= containerWidth
            && imageHeight <= containerHeight) {
            var xoffset = (containerWidth - imageWidth) / 2;
            var yoffset = (containerHeight - imageHeight) / 2;
            return {
                x: xoffset,
                y: yoffset,
                width: imageWidth,
                height: imageHeight
            };
        }
        else {
            var formerImageWidth = imageWidth;
            var formerImageHeight = imageHeight;
            if (imageWidth > containerWidth) {
                imageHeight = (containerWidth / imageWidth) * imageHeight;
                imageWidth = containerWidth;
            }
            if (imageHeight > containerHeight) {
                imageWidth = (containerHeight / imageHeight) * imageWidth;
                imageHeight = containerHeight;
            }
            this.logger.log("Image downsampled from "
                + "".concat(formerImageWidth, "X").concat(formerImageHeight)
                + " to ".concat(imageWidth, "X").concat(imageHeight, "."));
            return this.computeCanvasDrawConfig(imageWidth, imageHeight, containerWidth, containerHeight);
        }
    };
    Html5Qrcode.prototype.clearElement = function () {
        if (this.stateManagerProxy.isScanning()) {
            throw "Cannot clear while scan is ongoing, close it first.";
        }
        var element = document.getElementById(this.elementId);
        if (element) {
            element.innerHTML = "";
        }
    };
    Html5Qrcode.prototype.possiblyUpdateShaders = function (qrMatch) {
        if (this.qrMatch === qrMatch) {
            return;
        }
        if (this.hasBorderShaders
            && this.borderShaders
            && this.borderShaders.length) {
            this.borderShaders.forEach(function (shader) {
                shader.style.backgroundColor = qrMatch
                    ? Constants.BORDER_SHADER_MATCH_COLOR
                    : Constants.BORDER_SHADER_DEFAULT_COLOR;
            });
        }
        this.qrMatch = qrMatch;
    };
    Html5Qrcode.prototype.possiblyCloseLastScanImageFile = function () {
        if (this.lastScanImageFile) {
            URL.revokeObjectURL(this.lastScanImageFile);
            this.lastScanImageFile = null;
        }
    };
    Html5Qrcode.prototype.createCanvasElement = function (width, height, customId) {
        var canvasWidth = width;
        var canvasHeight = height;
        var canvasElement = document.createElement("canvas");
        canvasElement.style.width = "".concat(canvasWidth, "px");
        canvasElement.style.height = "".concat(canvasHeight, "px");
        canvasElement.style.display = "none";
        canvasElement.id = (0, core_1.isNullOrUndefined)(customId)
            ? "qr-canvas" : customId;
        return canvasElement;
    };
    Html5Qrcode.prototype.getShadedRegionBounds = function (width, height, qrboxSize) {
        if (qrboxSize.width > width || qrboxSize.height > height) {
            throw "'config.qrbox' dimensions should not be greater than the "
                + "dimensions of the root HTML element.";
        }
        return {
            x: (width - qrboxSize.width) / 2,
            y: (height - qrboxSize.height) / 2,
            width: qrboxSize.width,
            height: qrboxSize.height
        };
    };
    Html5Qrcode.prototype.possiblyInsertShadingElement = function (element, width, height, qrboxSize) {
        if ((width - qrboxSize.width) < 1 || (height - qrboxSize.height) < 1) {
            return;
        }
        var shadingElement = document.createElement("div");
        shadingElement.style.position = "absolute";
        var rightLeftBorderSize = (width - qrboxSize.width) / 2;
        var topBottomBorderSize = (height - qrboxSize.height) / 2;
        shadingElement.style.borderLeft
            = "".concat(rightLeftBorderSize, "px solid rgba(0, 0, 0, 0.48)");
        shadingElement.style.borderRight
            = "".concat(rightLeftBorderSize, "px solid rgba(0, 0, 0, 0.48)");
        shadingElement.style.borderTop
            = "".concat(topBottomBorderSize, "px solid rgba(0, 0, 0, 0.48)");
        shadingElement.style.borderBottom
            = "".concat(topBottomBorderSize, "px solid rgba(0, 0, 0, 0.48)");
        shadingElement.style.boxSizing = "border-box";
        shadingElement.style.top = "0px";
        shadingElement.style.bottom = "0px";
        shadingElement.style.left = "0px";
        shadingElement.style.right = "0px";
        shadingElement.id = "".concat(Constants.SHADED_REGION_ELEMENT_ID);
        if ((width - qrboxSize.width) < 11
            || (height - qrboxSize.height) < 11) {
            this.hasBorderShaders = false;
        }
        else {
            var smallSize = 5;
            var largeSize = 40;
            this.insertShaderBorders(shadingElement, largeSize, smallSize, -smallSize, null, 0, true);
            this.insertShaderBorders(shadingElement, largeSize, smallSize, -smallSize, null, 0, false);
            this.insertShaderBorders(shadingElement, largeSize, smallSize, null, -smallSize, 0, true);
            this.insertShaderBorders(shadingElement, largeSize, smallSize, null, -smallSize, 0, false);
            this.insertShaderBorders(shadingElement, smallSize, largeSize + smallSize, -smallSize, null, -smallSize, true);
            this.insertShaderBorders(shadingElement, smallSize, largeSize + smallSize, null, -smallSize, -smallSize, true);
            this.insertShaderBorders(shadingElement, smallSize, largeSize + smallSize, -smallSize, null, -smallSize, false);
            this.insertShaderBorders(shadingElement, smallSize, largeSize + smallSize, null, -smallSize, -smallSize, false);
            this.hasBorderShaders = true;
        }
        element.append(shadingElement);
    };
    Html5Qrcode.prototype.insertShaderBorders = function (shaderElem, width, height, top, bottom, side, isLeft) {
        var elem = document.createElement("div");
        elem.style.position = "absolute";
        elem.style.backgroundColor = Constants.BORDER_SHADER_DEFAULT_COLOR;
        elem.style.width = "".concat(width, "px");
        elem.style.height = "".concat(height, "px");
        if (top !== null) {
            elem.style.top = "".concat(top, "px");
        }
        if (bottom !== null) {
            elem.style.bottom = "".concat(bottom, "px");
        }
        if (isLeft) {
            elem.style.left = "".concat(side, "px");
        }
        else {
            elem.style.right = "".concat(side, "px");
        }
        if (!this.borderShaders) {
            this.borderShaders = [];
        }
        this.borderShaders.push(elem);
        shaderElem.appendChild(elem);
    };
    Html5Qrcode.prototype.showPausedState = function () {
        if (!this.scannerPausedUiElement) {
            throw "[internal error] scanner paused UI element not found";
        }
        this.scannerPausedUiElement.style.display = "block";
    };
    Html5Qrcode.prototype.hidePausedState = function () {
        if (!this.scannerPausedUiElement) {
            throw "[internal error] scanner paused UI element not found";
        }
        this.scannerPausedUiElement.style.display = "none";
    };
    Html5Qrcode.prototype.getTimeoutFps = function (fps) {
        return 1000 / fps;
    };
    return Html5Qrcode;
}());
exports.Html5Qrcode = Html5Qrcode;
//# sourceMappingURL=html5-qrcode.js.map