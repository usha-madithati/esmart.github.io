import { BaseUiElementFactory, PublicUiElementIdAndClasses } from "./base";
import { Html5QrcodeScannerStrings } from "../../strings";
var CameraZoomUi = (function () {
    function CameraZoomUi() {
        this.onChangeCallback = null;
        this.zoomElementContainer = document.createElement("div");
        this.rangeInput = BaseUiElementFactory.createElement("input", PublicUiElementIdAndClasses.ZOOM_SLIDER_ID);
        this.rangeInput.type = "range";
        this.rangeText = document.createElement("span");
        this.rangeInput.min = "1";
        this.rangeInput.max = "5";
        this.rangeInput.value = "1";
        this.rangeInput.step = "0.1";
    }
    CameraZoomUi.prototype.render = function (parentElement, renderOnCreate) {
        this.zoomElementContainer.style.display
            = renderOnCreate ? "block" : "none";
        this.zoomElementContainer.style.padding = "5px 10px";
        this.zoomElementContainer.style.textAlign = "center";
        parentElement.appendChild(this.zoomElementContainer);
        this.rangeInput.style.display = "inline-block";
        this.rangeInput.style.width = "50%";
        this.rangeInput.style.height = "5px";
        this.rangeInput.style.background = "#d3d3d3";
        this.rangeInput.style.outline = "none";
        this.rangeInput.style.opacity = "0.7";
        var zoomString = Html5QrcodeScannerStrings.zoom();
        this.rangeText.innerText = "".concat(this.rangeInput.value, "x ").concat(zoomString);
        this.rangeText.style.marginRight = "10px";
        var $this = this;
        this.rangeInput.addEventListener("input", function () { return $this.onValueChange(); });
        this.rangeInput.addEventListener("change", function () { return $this.onValueChange(); });
        this.zoomElementContainer.appendChild(this.rangeInput);
        this.zoomElementContainer.appendChild(this.rangeText);
    };
    CameraZoomUi.prototype.onValueChange = function () {
        var zoomString = Html5QrcodeScannerStrings.zoom();
        this.rangeText.innerText = "".concat(this.rangeInput.value, "x ").concat(zoomString);
        if (this.onChangeCallback) {
            this.onChangeCallback(parseFloat(this.rangeInput.value));
        }
    };
    CameraZoomUi.prototype.setValues = function (minValue, maxValue, defaultValue, step) {
        this.rangeInput.min = minValue.toString();
        this.rangeInput.max = maxValue.toString();
        this.rangeInput.step = step.toString();
        this.rangeInput.value = defaultValue.toString();
        this.onValueChange();
    };
    CameraZoomUi.prototype.show = function () {
        this.zoomElementContainer.style.display = "block";
    };
    CameraZoomUi.prototype.hide = function () {
        this.zoomElementContainer.style.display = "none";
    };
    CameraZoomUi.prototype.setOnCameraZoomValueChangeCallback = function (onChangeCallback) {
        this.onChangeCallback = onChangeCallback;
    };
    CameraZoomUi.prototype.removeOnCameraZoomValueChangeCallback = function () {
        this.onChangeCallback = null;
    };
    CameraZoomUi.create = function (parentElement, renderOnCreate) {
        var cameraZoomUi = new CameraZoomUi();
        cameraZoomUi.render(parentElement, renderOnCreate);
        return cameraZoomUi;
    };
    return CameraZoomUi;
}());
export { CameraZoomUi };
//# sourceMappingURL=camera-zoom-ui.js.map