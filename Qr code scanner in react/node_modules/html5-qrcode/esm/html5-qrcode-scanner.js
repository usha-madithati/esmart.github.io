import { Html5QrcodeConstants, Html5QrcodeScanType, Html5QrcodeErrorFactory, BaseLoggger, isNullOrUndefined, clip, } from "./core";
import { Html5Qrcode, } from "./html5-qrcode";
import { Html5QrcodeScannerStrings, } from "./strings";
import { ASSET_FILE_SCAN, ASSET_CAMERA_SCAN, } from "./image-assets";
import { PersistedDataManager } from "./storage";
import { LibraryInfoContainer } from "./ui";
import { CameraPermissions } from "./camera/permissions";
import { ScanTypeSelector } from "./ui/scanner/scan-type-selector";
import { TorchButton } from "./ui/scanner/torch-button";
import { FileSelectionUi } from "./ui/scanner/file-selection-ui";
import { BaseUiElementFactory, PublicUiElementIdAndClasses } from "./ui/scanner/base";
import { CameraSelectionUi } from "./ui/scanner/camera-selection-ui";
import { CameraZoomUi } from "./ui/scanner/camera-zoom-ui";
var Html5QrcodeScannerStatus;
(function (Html5QrcodeScannerStatus) {
    Html5QrcodeScannerStatus[Html5QrcodeScannerStatus["STATUS_DEFAULT"] = 0] = "STATUS_DEFAULT";
    Html5QrcodeScannerStatus[Html5QrcodeScannerStatus["STATUS_SUCCESS"] = 1] = "STATUS_SUCCESS";
    Html5QrcodeScannerStatus[Html5QrcodeScannerStatus["STATUS_WARNING"] = 2] = "STATUS_WARNING";
    Html5QrcodeScannerStatus[Html5QrcodeScannerStatus["STATUS_REQUESTING_PERMISSION"] = 3] = "STATUS_REQUESTING_PERMISSION";
})(Html5QrcodeScannerStatus || (Html5QrcodeScannerStatus = {}));
function toHtml5QrcodeCameraScanConfig(config) {
    return {
        fps: config.fps,
        qrbox: config.qrbox,
        aspectRatio: config.aspectRatio,
        disableFlip: config.disableFlip,
        videoConstraints: config.videoConstraints
    };
}
function toHtml5QrcodeFullConfig(config, verbose) {
    return {
        formatsToSupport: config.formatsToSupport,
        useBarCodeDetectorIfSupported: config.useBarCodeDetectorIfSupported,
        experimentalFeatures: config.experimentalFeatures,
        verbose: verbose
    };
}
var Html5QrcodeScanner = (function () {
    function Html5QrcodeScanner(elementId, config, verbose) {
        this.lastMatchFound = null;
        this.cameraScanImage = null;
        this.fileScanImage = null;
        this.fileSelectionUi = null;
        this.elementId = elementId;
        this.config = this.createConfig(config);
        this.verbose = verbose === true;
        if (!document.getElementById(elementId)) {
            throw "HTML Element with id=".concat(elementId, " not found");
        }
        this.scanTypeSelector = new ScanTypeSelector(this.config.supportedScanTypes);
        this.currentScanType = this.scanTypeSelector.getDefaultScanType();
        this.sectionSwapAllowed = true;
        this.logger = new BaseLoggger(this.verbose);
        this.persistedDataManager = new PersistedDataManager();
        if (config.rememberLastUsedCamera !== true) {
            this.persistedDataManager.reset();
        }
    }
    Html5QrcodeScanner.prototype.render = function (qrCodeSuccessCallback, qrCodeErrorCallback) {
        var _this = this;
        this.lastMatchFound = null;
        this.qrCodeSuccessCallback
            = function (decodedText, result) {
                if (qrCodeSuccessCallback) {
                    qrCodeSuccessCallback(decodedText, result);
                }
                else {
                    if (_this.lastMatchFound === decodedText) {
                        return;
                    }
                    _this.lastMatchFound = decodedText;
                    _this.setHeaderMessage(Html5QrcodeScannerStrings.lastMatch(decodedText), Html5QrcodeScannerStatus.STATUS_SUCCESS);
                }
            };
        this.qrCodeErrorCallback =
            function (errorMessage, error) {
                if (qrCodeErrorCallback) {
                    qrCodeErrorCallback(errorMessage, error);
                }
            };
        var container = document.getElementById(this.elementId);
        if (!container) {
            throw "HTML Element with id=".concat(this.elementId, " not found");
        }
        container.innerHTML = "";
        this.createBasicLayout(container);
        this.html5Qrcode = new Html5Qrcode(this.getScanRegionId(), toHtml5QrcodeFullConfig(this.config, this.verbose));
    };
    Html5QrcodeScanner.prototype.pause = function (shouldPauseVideo) {
        if (isNullOrUndefined(shouldPauseVideo) || shouldPauseVideo !== true) {
            shouldPauseVideo = false;
        }
        this.getHtml5QrcodeOrFail().pause(shouldPauseVideo);
    };
    Html5QrcodeScanner.prototype.resume = function () {
        this.getHtml5QrcodeOrFail().resume();
    };
    Html5QrcodeScanner.prototype.getState = function () {
        return this.getHtml5QrcodeOrFail().getState();
    };
    Html5QrcodeScanner.prototype.clear = function () {
        var _this = this;
        var emptyHtmlContainer = function () {
            var mainContainer = document.getElementById(_this.elementId);
            if (mainContainer) {
                mainContainer.innerHTML = "";
                _this.resetBasicLayout(mainContainer);
            }
        };
        if (this.html5Qrcode) {
            return new Promise(function (resolve, reject) {
                if (!_this.html5Qrcode) {
                    resolve();
                    return;
                }
                if (_this.html5Qrcode.isScanning) {
                    _this.html5Qrcode.stop().then(function (_) {
                        if (!_this.html5Qrcode) {
                            resolve();
                            return;
                        }
                        _this.html5Qrcode.clear();
                        emptyHtmlContainer();
                        resolve();
                    }).catch(function (error) {
                        if (_this.verbose) {
                            _this.logger.logError("Unable to stop qrcode scanner", error);
                        }
                        reject(error);
                    });
                }
                else {
                    _this.html5Qrcode.clear();
                    emptyHtmlContainer();
                    resolve();
                }
            });
        }
        return Promise.resolve();
    };
    Html5QrcodeScanner.prototype.getRunningTrackCapabilities = function () {
        return this.getHtml5QrcodeOrFail().getRunningTrackCapabilities();
    };
    Html5QrcodeScanner.prototype.getRunningTrackSettings = function () {
        return this.getHtml5QrcodeOrFail().getRunningTrackSettings();
    };
    Html5QrcodeScanner.prototype.applyVideoConstraints = function (videoConstaints) {
        return this.getHtml5QrcodeOrFail().applyVideoConstraints(videoConstaints);
    };
    Html5QrcodeScanner.prototype.getHtml5QrcodeOrFail = function () {
        if (!this.html5Qrcode) {
            throw "Code scanner not initialized.";
        }
        return this.html5Qrcode;
    };
    Html5QrcodeScanner.prototype.createConfig = function (config) {
        if (config) {
            if (!config.fps) {
                config.fps = Html5QrcodeConstants.SCAN_DEFAULT_FPS;
            }
            if (config.rememberLastUsedCamera !== (!Html5QrcodeConstants.DEFAULT_REMEMBER_LAST_CAMERA_USED)) {
                config.rememberLastUsedCamera
                    = Html5QrcodeConstants.DEFAULT_REMEMBER_LAST_CAMERA_USED;
            }
            if (!config.supportedScanTypes) {
                config.supportedScanTypes
                    = Html5QrcodeConstants.DEFAULT_SUPPORTED_SCAN_TYPE;
            }
            return config;
        }
        return {
            fps: Html5QrcodeConstants.SCAN_DEFAULT_FPS,
            rememberLastUsedCamera: Html5QrcodeConstants.DEFAULT_REMEMBER_LAST_CAMERA_USED,
            supportedScanTypes: Html5QrcodeConstants.DEFAULT_SUPPORTED_SCAN_TYPE
        };
    };
    Html5QrcodeScanner.prototype.createBasicLayout = function (parent) {
        parent.style.position = "relative";
        parent.style.padding = "0px";
        parent.style.border = "1px solid silver";
        this.createHeader(parent);
        var qrCodeScanRegion = document.createElement("div");
        var scanRegionId = this.getScanRegionId();
        qrCodeScanRegion.id = scanRegionId;
        qrCodeScanRegion.style.width = "100%";
        qrCodeScanRegion.style.minHeight = "100px";
        qrCodeScanRegion.style.textAlign = "center";
        parent.appendChild(qrCodeScanRegion);
        if (ScanTypeSelector.isCameraScanType(this.currentScanType)) {
            this.insertCameraScanImageToScanRegion();
        }
        else {
            this.insertFileScanImageToScanRegion();
        }
        var qrCodeDashboard = document.createElement("div");
        var dashboardId = this.getDashboardId();
        qrCodeDashboard.id = dashboardId;
        qrCodeDashboard.style.width = "100%";
        parent.appendChild(qrCodeDashboard);
        this.setupInitialDashboard(qrCodeDashboard);
    };
    Html5QrcodeScanner.prototype.resetBasicLayout = function (mainContainer) {
        mainContainer.style.border = "none";
    };
    Html5QrcodeScanner.prototype.setupInitialDashboard = function (dashboard) {
        this.createSection(dashboard);
        this.createSectionControlPanel();
        if (this.scanTypeSelector.hasMoreThanOneScanType()) {
            this.createSectionSwap();
        }
    };
    Html5QrcodeScanner.prototype.createHeader = function (dashboard) {
        var header = document.createElement("div");
        header.style.textAlign = "left";
        header.style.margin = "0px";
        dashboard.appendChild(header);
        var libraryInfo = new LibraryInfoContainer();
        libraryInfo.renderInto(header);
        var headerMessageContainer = document.createElement("div");
        headerMessageContainer.id = this.getHeaderMessageContainerId();
        headerMessageContainer.style.display = "none";
        headerMessageContainer.style.textAlign = "center";
        headerMessageContainer.style.fontSize = "14px";
        headerMessageContainer.style.padding = "2px 10px";
        headerMessageContainer.style.margin = "4px";
        headerMessageContainer.style.borderTop = "1px solid #f6f6f6";
        header.appendChild(headerMessageContainer);
    };
    Html5QrcodeScanner.prototype.createSection = function (dashboard) {
        var section = document.createElement("div");
        section.id = this.getDashboardSectionId();
        section.style.width = "100%";
        section.style.padding = "10px 0px 10px 0px";
        section.style.textAlign = "left";
        dashboard.appendChild(section);
    };
    Html5QrcodeScanner.prototype.createCameraListUi = function (scpCameraScanRegion, requestPermissionContainer, requestPermissionButton) {
        var $this = this;
        $this.showHideScanTypeSwapLink(false);
        $this.setHeaderMessage(Html5QrcodeScannerStrings.cameraPermissionRequesting());
        var createPermissionButtonIfNotExists = function () {
            if (!requestPermissionButton) {
                $this.createPermissionButton(scpCameraScanRegion, requestPermissionContainer);
            }
        };
        Html5Qrcode.getCameras().then(function (cameras) {
            $this.persistedDataManager.setHasPermission(true);
            $this.showHideScanTypeSwapLink(true);
            $this.resetHeaderMessage();
            if (cameras && cameras.length > 0) {
                scpCameraScanRegion.removeChild(requestPermissionContainer);
                $this.renderCameraSelection(cameras);
            }
            else {
                $this.setHeaderMessage(Html5QrcodeScannerStrings.noCameraFound(), Html5QrcodeScannerStatus.STATUS_WARNING);
                createPermissionButtonIfNotExists();
            }
        }).catch(function (error) {
            $this.persistedDataManager.setHasPermission(false);
            if (requestPermissionButton) {
                requestPermissionButton.disabled = false;
            }
            else {
                createPermissionButtonIfNotExists();
            }
            $this.setHeaderMessage(error, Html5QrcodeScannerStatus.STATUS_WARNING);
            $this.showHideScanTypeSwapLink(true);
        });
    };
    Html5QrcodeScanner.prototype.createPermissionButton = function (scpCameraScanRegion, requestPermissionContainer) {
        var $this = this;
        var requestPermissionButton = BaseUiElementFactory
            .createElement("button", this.getCameraPermissionButtonId());
        requestPermissionButton.innerText
            = Html5QrcodeScannerStrings.cameraPermissionTitle();
        requestPermissionButton.addEventListener("click", function () {
            requestPermissionButton.disabled = true;
            $this.createCameraListUi(scpCameraScanRegion, requestPermissionContainer, requestPermissionButton);
        });
        requestPermissionContainer.appendChild(requestPermissionButton);
    };
    Html5QrcodeScanner.prototype.createPermissionsUi = function (scpCameraScanRegion, requestPermissionContainer) {
        var $this = this;
        if (ScanTypeSelector.isCameraScanType(this.currentScanType)
            && this.persistedDataManager.hasCameraPermissions()) {
            CameraPermissions.hasPermissions().then(function (hasPermissions) {
                if (hasPermissions) {
                    $this.createCameraListUi(scpCameraScanRegion, requestPermissionContainer);
                }
                else {
                    $this.persistedDataManager.setHasPermission(false);
                    $this.createPermissionButton(scpCameraScanRegion, requestPermissionContainer);
                }
            }).catch(function (_) {
                $this.persistedDataManager.setHasPermission(false);
                $this.createPermissionButton(scpCameraScanRegion, requestPermissionContainer);
            });
            return;
        }
        this.createPermissionButton(scpCameraScanRegion, requestPermissionContainer);
    };
    Html5QrcodeScanner.prototype.createSectionControlPanel = function () {
        var section = document.getElementById(this.getDashboardSectionId());
        var sectionControlPanel = document.createElement("div");
        section.appendChild(sectionControlPanel);
        var scpCameraScanRegion = document.createElement("div");
        scpCameraScanRegion.id = this.getDashboardSectionCameraScanRegionId();
        scpCameraScanRegion.style.display
            = ScanTypeSelector.isCameraScanType(this.currentScanType)
                ? "block" : "none";
        sectionControlPanel.appendChild(scpCameraScanRegion);
        var requestPermissionContainer = document.createElement("div");
        requestPermissionContainer.style.textAlign = "center";
        scpCameraScanRegion.appendChild(requestPermissionContainer);
        if (this.scanTypeSelector.isCameraScanRequired()) {
            this.createPermissionsUi(scpCameraScanRegion, requestPermissionContainer);
        }
        this.renderFileScanUi(sectionControlPanel);
    };
    Html5QrcodeScanner.prototype.renderFileScanUi = function (parent) {
        var showOnRender = ScanTypeSelector.isFileScanType(this.currentScanType);
        var $this = this;
        var onFileSelected = function (file) {
            if (!$this.html5Qrcode) {
                throw "html5Qrcode not defined";
            }
            if (!ScanTypeSelector.isFileScanType($this.currentScanType)) {
                return;
            }
            $this.setHeaderMessage(Html5QrcodeScannerStrings.loadingImage());
            $this.html5Qrcode.scanFileV2(file, true)
                .then(function (html5qrcodeResult) {
                $this.resetHeaderMessage();
                $this.qrCodeSuccessCallback(html5qrcodeResult.decodedText, html5qrcodeResult);
            })
                .catch(function (error) {
                $this.setHeaderMessage(error, Html5QrcodeScannerStatus.STATUS_WARNING);
                $this.qrCodeErrorCallback(error, Html5QrcodeErrorFactory.createFrom(error));
            });
        };
        this.fileSelectionUi = FileSelectionUi.create(parent, showOnRender, onFileSelected);
    };
    Html5QrcodeScanner.prototype.renderCameraSelection = function (cameras) {
        var _this = this;
        var $this = this;
        var scpCameraScanRegion = document.getElementById(this.getDashboardSectionCameraScanRegionId());
        scpCameraScanRegion.style.textAlign = "center";
        var cameraZoomUi = CameraZoomUi.create(scpCameraScanRegion, false);
        var renderCameraZoomUiIfSupported = function (cameraCapabilities) {
            var zoomCapability = cameraCapabilities.zoomFeature();
            if (!zoomCapability.isSupported()) {
                return;
            }
            cameraZoomUi.setOnCameraZoomValueChangeCallback(function (zoomValue) {
                zoomCapability.apply(zoomValue);
            });
            var defaultZoom = 1;
            if (_this.config.defaultZoomValueIfSupported) {
                defaultZoom = _this.config.defaultZoomValueIfSupported;
            }
            defaultZoom = clip(defaultZoom, zoomCapability.min(), zoomCapability.max());
            cameraZoomUi.setValues(zoomCapability.min(), zoomCapability.max(), defaultZoom, zoomCapability.step());
            cameraZoomUi.show();
        };
        var cameraSelectUi = CameraSelectionUi.create(scpCameraScanRegion, cameras);
        var cameraActionContainer = document.createElement("span");
        var cameraActionStartButton = BaseUiElementFactory.createElement("button", PublicUiElementIdAndClasses.CAMERA_START_BUTTON_ID);
        cameraActionStartButton.innerText
            = Html5QrcodeScannerStrings.scanButtonStartScanningText();
        cameraActionContainer.appendChild(cameraActionStartButton);
        var cameraActionStopButton = BaseUiElementFactory.createElement("button", PublicUiElementIdAndClasses.CAMERA_STOP_BUTTON_ID);
        cameraActionStopButton.innerText
            = Html5QrcodeScannerStrings.scanButtonStopScanningText();
        cameraActionStopButton.style.display = "none";
        cameraActionStopButton.disabled = true;
        cameraActionContainer.appendChild(cameraActionStopButton);
        var torchButton;
        var createAndShowTorchButtonIfSupported = function (cameraCapabilities) {
            if (!cameraCapabilities.torchFeature().isSupported()) {
                if (torchButton) {
                    torchButton.hide();
                }
                return;
            }
            if (!torchButton) {
                torchButton = TorchButton.create(cameraActionContainer, cameraCapabilities.torchFeature(), { display: "none", marginLeft: "5px" }, function (errorMessage) {
                    $this.setHeaderMessage(errorMessage, Html5QrcodeScannerStatus.STATUS_WARNING);
                });
            }
            else {
                torchButton.updateTorchCapability(cameraCapabilities.torchFeature());
            }
            torchButton.show();
        };
        scpCameraScanRegion.appendChild(cameraActionContainer);
        var resetCameraActionStartButton = function (shouldShow) {
            if (!shouldShow) {
                cameraActionStartButton.style.display = "none";
            }
            cameraActionStartButton.innerText
                = Html5QrcodeScannerStrings
                    .scanButtonStartScanningText();
            cameraActionStartButton.style.opacity = "1";
            cameraActionStartButton.disabled = false;
            if (shouldShow) {
                cameraActionStartButton.style.display = "inline-block";
            }
        };
        cameraActionStartButton.addEventListener("click", function (_) {
            cameraActionStartButton.innerText
                = Html5QrcodeScannerStrings.scanButtonScanningStarting();
            cameraSelectUi.disable();
            cameraActionStartButton.disabled = true;
            cameraActionStartButton.style.opacity = "0.5";
            if (_this.scanTypeSelector.hasMoreThanOneScanType()) {
                $this.showHideScanTypeSwapLink(false);
            }
            $this.resetHeaderMessage();
            var cameraId = cameraSelectUi.getValue();
            $this.persistedDataManager.setLastUsedCameraId(cameraId);
            $this.html5Qrcode.start(cameraId, toHtml5QrcodeCameraScanConfig($this.config), $this.qrCodeSuccessCallback, $this.qrCodeErrorCallback)
                .then(function (_) {
                cameraActionStopButton.disabled = false;
                cameraActionStopButton.style.display = "inline-block";
                resetCameraActionStartButton(false);
                var cameraCapabilities = $this.html5Qrcode.getRunningTrackCameraCapabilities();
                if (_this.config.showTorchButtonIfSupported === true) {
                    createAndShowTorchButtonIfSupported(cameraCapabilities);
                }
                if (_this.config.showZoomSliderIfSupported === true) {
                    renderCameraZoomUiIfSupported(cameraCapabilities);
                }
            })
                .catch(function (error) {
                $this.showHideScanTypeSwapLink(true);
                cameraSelectUi.enable();
                resetCameraActionStartButton(true);
                $this.setHeaderMessage(error, Html5QrcodeScannerStatus.STATUS_WARNING);
            });
        });
        if (cameraSelectUi.hasSingleItem()) {
            cameraActionStartButton.click();
        }
        cameraActionStopButton.addEventListener("click", function (_) {
            if (!$this.html5Qrcode) {
                throw "html5Qrcode not defined";
            }
            cameraActionStopButton.disabled = true;
            $this.html5Qrcode.stop()
                .then(function (_) {
                if (_this.scanTypeSelector.hasMoreThanOneScanType()) {
                    $this.showHideScanTypeSwapLink(true);
                }
                cameraSelectUi.enable();
                cameraActionStartButton.disabled = false;
                cameraActionStopButton.style.display = "none";
                cameraActionStartButton.style.display = "inline-block";
                if (torchButton) {
                    torchButton.reset();
                    torchButton.hide();
                }
                cameraZoomUi.removeOnCameraZoomValueChangeCallback();
                cameraZoomUi.hide();
                $this.insertCameraScanImageToScanRegion();
            }).catch(function (error) {
                cameraActionStopButton.disabled = false;
                $this.setHeaderMessage(error, Html5QrcodeScannerStatus.STATUS_WARNING);
            });
        });
        if ($this.persistedDataManager.getLastUsedCameraId()) {
            var cameraId = $this.persistedDataManager.getLastUsedCameraId();
            if (cameraSelectUi.hasValue(cameraId)) {
                cameraSelectUi.setValue(cameraId);
                cameraActionStartButton.click();
            }
            else {
                $this.persistedDataManager.resetLastUsedCameraId();
            }
        }
    };
    Html5QrcodeScanner.prototype.createSectionSwap = function () {
        var $this = this;
        var TEXT_IF_CAMERA_SCAN_SELECTED = Html5QrcodeScannerStrings.textIfCameraScanSelected();
        var TEXT_IF_FILE_SCAN_SELECTED = Html5QrcodeScannerStrings.textIfFileScanSelected();
        var section = document.getElementById(this.getDashboardSectionId());
        var switchContainer = document.createElement("div");
        switchContainer.style.textAlign = "center";
        var switchScanTypeLink = BaseUiElementFactory.createElement("span", this.getDashboardSectionSwapLinkId());
        switchScanTypeLink.style.textDecoration = "underline";
        switchScanTypeLink.style.cursor = "pointer";
        switchScanTypeLink.innerText
            = ScanTypeSelector.isCameraScanType(this.currentScanType)
                ? TEXT_IF_CAMERA_SCAN_SELECTED : TEXT_IF_FILE_SCAN_SELECTED;
        switchScanTypeLink.addEventListener("click", function () {
            if (!$this.sectionSwapAllowed) {
                if ($this.verbose) {
                    $this.logger.logError("Section swap called when not allowed");
                }
                return;
            }
            $this.resetHeaderMessage();
            $this.fileSelectionUi.resetValue();
            $this.sectionSwapAllowed = false;
            if (ScanTypeSelector.isCameraScanType($this.currentScanType)) {
                $this.clearScanRegion();
                $this.getCameraScanRegion().style.display = "none";
                $this.fileSelectionUi.show();
                switchScanTypeLink.innerText = TEXT_IF_FILE_SCAN_SELECTED;
                $this.currentScanType = Html5QrcodeScanType.SCAN_TYPE_FILE;
                $this.insertFileScanImageToScanRegion();
            }
            else {
                $this.clearScanRegion();
                $this.getCameraScanRegion().style.display = "block";
                $this.fileSelectionUi.hide();
                switchScanTypeLink.innerText = TEXT_IF_CAMERA_SCAN_SELECTED;
                $this.currentScanType = Html5QrcodeScanType.SCAN_TYPE_CAMERA;
                $this.insertCameraScanImageToScanRegion();
                $this.startCameraScanIfPermissionExistsOnSwap();
            }
            $this.sectionSwapAllowed = true;
        });
        switchContainer.appendChild(switchScanTypeLink);
        section.appendChild(switchContainer);
    };
    Html5QrcodeScanner.prototype.startCameraScanIfPermissionExistsOnSwap = function () {
        var _this = this;
        var $this = this;
        if (this.persistedDataManager.hasCameraPermissions()) {
            CameraPermissions.hasPermissions().then(function (hasPermissions) {
                if (hasPermissions) {
                    var permissionButton = document.getElementById($this.getCameraPermissionButtonId());
                    if (!permissionButton) {
                        _this.logger.logError("Permission button not found, fail;");
                        throw "Permission button not found";
                    }
                    permissionButton.click();
                }
                else {
                    $this.persistedDataManager.setHasPermission(false);
                }
            }).catch(function (_) {
                $this.persistedDataManager.setHasPermission(false);
            });
            return;
        }
    };
    Html5QrcodeScanner.prototype.resetHeaderMessage = function () {
        var messageDiv = document.getElementById(this.getHeaderMessageContainerId());
        messageDiv.style.display = "none";
    };
    Html5QrcodeScanner.prototype.setHeaderMessage = function (messageText, scannerStatus) {
        if (!scannerStatus) {
            scannerStatus = Html5QrcodeScannerStatus.STATUS_DEFAULT;
        }
        var messageDiv = this.getHeaderMessageDiv();
        messageDiv.innerText = messageText;
        messageDiv.style.display = "block";
        switch (scannerStatus) {
            case Html5QrcodeScannerStatus.STATUS_SUCCESS:
                messageDiv.style.background = "rgba(106, 175, 80, 0.26)";
                messageDiv.style.color = "#477735";
                break;
            case Html5QrcodeScannerStatus.STATUS_WARNING:
                messageDiv.style.background = "rgba(203, 36, 49, 0.14)";
                messageDiv.style.color = "#cb2431";
                break;
            case Html5QrcodeScannerStatus.STATUS_DEFAULT:
            default:
                messageDiv.style.background = "rgba(0, 0, 0, 0)";
                messageDiv.style.color = "rgb(17, 17, 17)";
                break;
        }
    };
    Html5QrcodeScanner.prototype.showHideScanTypeSwapLink = function (shouldDisplay) {
        if (this.scanTypeSelector.hasMoreThanOneScanType()) {
            if (shouldDisplay !== true) {
                shouldDisplay = false;
            }
            this.sectionSwapAllowed = shouldDisplay;
            this.getDashboardSectionSwapLink().style.display
                = shouldDisplay ? "inline-block" : "none";
        }
    };
    Html5QrcodeScanner.prototype.insertCameraScanImageToScanRegion = function () {
        var $this = this;
        var qrCodeScanRegion = document.getElementById(this.getScanRegionId());
        if (this.cameraScanImage) {
            qrCodeScanRegion.innerHTML = "<br>";
            qrCodeScanRegion.appendChild(this.cameraScanImage);
            return;
        }
        this.cameraScanImage = new Image;
        this.cameraScanImage.onload = function (_) {
            qrCodeScanRegion.innerHTML = "<br>";
            qrCodeScanRegion.appendChild($this.cameraScanImage);
        };
        this.cameraScanImage.width = 64;
        this.cameraScanImage.style.opacity = "0.8";
        this.cameraScanImage.src = ASSET_CAMERA_SCAN;
        this.cameraScanImage.alt = Html5QrcodeScannerStrings.cameraScanAltText();
    };
    Html5QrcodeScanner.prototype.insertFileScanImageToScanRegion = function () {
        var $this = this;
        var qrCodeScanRegion = document.getElementById(this.getScanRegionId());
        if (this.fileScanImage) {
            qrCodeScanRegion.innerHTML = "<br>";
            qrCodeScanRegion.appendChild(this.fileScanImage);
            return;
        }
        this.fileScanImage = new Image;
        this.fileScanImage.onload = function (_) {
            qrCodeScanRegion.innerHTML = "<br>";
            qrCodeScanRegion.appendChild($this.fileScanImage);
        };
        this.fileScanImage.width = 64;
        this.fileScanImage.style.opacity = "0.8";
        this.fileScanImage.src = ASSET_FILE_SCAN;
        this.fileScanImage.alt = Html5QrcodeScannerStrings.fileScanAltText();
    };
    Html5QrcodeScanner.prototype.clearScanRegion = function () {
        var qrCodeScanRegion = document.getElementById(this.getScanRegionId());
        qrCodeScanRegion.innerHTML = "";
    };
    Html5QrcodeScanner.prototype.getDashboardSectionId = function () {
        return "".concat(this.elementId, "__dashboard_section");
    };
    Html5QrcodeScanner.prototype.getDashboardSectionCameraScanRegionId = function () {
        return "".concat(this.elementId, "__dashboard_section_csr");
    };
    Html5QrcodeScanner.prototype.getDashboardSectionSwapLinkId = function () {
        return PublicUiElementIdAndClasses.SCAN_TYPE_CHANGE_ANCHOR_ID;
    };
    Html5QrcodeScanner.prototype.getScanRegionId = function () {
        return "".concat(this.elementId, "__scan_region");
    };
    Html5QrcodeScanner.prototype.getDashboardId = function () {
        return "".concat(this.elementId, "__dashboard");
    };
    Html5QrcodeScanner.prototype.getHeaderMessageContainerId = function () {
        return "".concat(this.elementId, "__header_message");
    };
    Html5QrcodeScanner.prototype.getCameraPermissionButtonId = function () {
        return PublicUiElementIdAndClasses.CAMERA_PERMISSION_BUTTON_ID;
    };
    Html5QrcodeScanner.prototype.getCameraScanRegion = function () {
        return document.getElementById(this.getDashboardSectionCameraScanRegionId());
    };
    Html5QrcodeScanner.prototype.getDashboardSectionSwapLink = function () {
        return document.getElementById(this.getDashboardSectionSwapLinkId());
    };
    Html5QrcodeScanner.prototype.getHeaderMessageDiv = function () {
        return document.getElementById(this.getHeaderMessageContainerId());
    };
    return Html5QrcodeScanner;
}());
export { Html5QrcodeScanner };
//# sourceMappingURL=html5-qrcode-scanner.js.map