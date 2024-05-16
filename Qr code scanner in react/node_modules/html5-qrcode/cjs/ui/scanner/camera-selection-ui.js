"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraSelectionUi = void 0;
var base_1 = require("./base");
var strings_1 = require("../../strings");
var CameraSelectionUi = (function () {
    function CameraSelectionUi(cameras) {
        this.selectElement = base_1.BaseUiElementFactory
            .createElement("select", base_1.PublicUiElementIdAndClasses.CAMERA_SELECTION_SELECT_ID);
        this.cameras = cameras;
        this.options = [];
    }
    CameraSelectionUi.prototype.render = function (parentElement) {
        var cameraSelectionContainer = document.createElement("span");
        cameraSelectionContainer.style.marginRight = "10px";
        var numCameras = this.cameras.length;
        if (numCameras === 0) {
            throw new Error("No cameras found");
        }
        if (numCameras === 1) {
            cameraSelectionContainer.style.display = "none";
        }
        else {
            var selectCameraString = strings_1.Html5QrcodeScannerStrings.selectCamera();
            cameraSelectionContainer.innerText
                = "".concat(selectCameraString, " (").concat(this.cameras.length, ")  ");
        }
        var anonymousCameraId = 1;
        for (var _i = 0, _a = this.cameras; _i < _a.length; _i++) {
            var camera = _a[_i];
            var value = camera.id;
            var name_1 = camera.label == null ? value : camera.label;
            if (!name_1 || name_1 === "") {
                name_1 = [
                    strings_1.Html5QrcodeScannerStrings.anonymousCameraPrefix(),
                    anonymousCameraId++
                ].join(" ");
            }
            var option = document.createElement("option");
            option.value = value;
            option.innerText = name_1;
            this.options.push(option);
            this.selectElement.appendChild(option);
        }
        cameraSelectionContainer.appendChild(this.selectElement);
        parentElement.appendChild(cameraSelectionContainer);
    };
    CameraSelectionUi.prototype.disable = function () {
        this.selectElement.disabled = true;
    };
    CameraSelectionUi.prototype.isDisabled = function () {
        return this.selectElement.disabled === true;
    };
    CameraSelectionUi.prototype.enable = function () {
        this.selectElement.disabled = false;
    };
    CameraSelectionUi.prototype.getValue = function () {
        return this.selectElement.value;
    };
    CameraSelectionUi.prototype.hasValue = function (value) {
        for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
            var option = _a[_i];
            if (option.value === value) {
                return true;
            }
        }
        return false;
    };
    CameraSelectionUi.prototype.setValue = function (value) {
        if (!this.hasValue(value)) {
            throw new Error("".concat(value, " is not present in the camera list."));
        }
        this.selectElement.value = value;
    };
    CameraSelectionUi.prototype.hasSingleItem = function () {
        return this.cameras.length === 1;
    };
    CameraSelectionUi.prototype.numCameras = function () {
        return this.cameras.length;
    };
    CameraSelectionUi.create = function (parentElement, cameras) {
        var cameraSelectUi = new CameraSelectionUi(cameras);
        cameraSelectUi.render(parentElement);
        return cameraSelectUi;
    };
    return CameraSelectionUi;
}());
exports.CameraSelectionUi = CameraSelectionUi;
//# sourceMappingURL=camera-selection-ui.js.map