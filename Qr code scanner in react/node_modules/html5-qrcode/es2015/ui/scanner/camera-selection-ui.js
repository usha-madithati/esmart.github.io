import { BaseUiElementFactory, PublicUiElementIdAndClasses } from "./base";
import { Html5QrcodeScannerStrings } from "../../strings";
export class CameraSelectionUi {
    constructor(cameras) {
        this.selectElement = BaseUiElementFactory
            .createElement("select", PublicUiElementIdAndClasses.CAMERA_SELECTION_SELECT_ID);
        this.cameras = cameras;
        this.options = [];
    }
    render(parentElement) {
        const cameraSelectionContainer = document.createElement("span");
        cameraSelectionContainer.style.marginRight = "10px";
        const numCameras = this.cameras.length;
        if (numCameras === 0) {
            throw new Error("No cameras found");
        }
        if (numCameras === 1) {
            cameraSelectionContainer.style.display = "none";
        }
        else {
            const selectCameraString = Html5QrcodeScannerStrings.selectCamera();
            cameraSelectionContainer.innerText
                = `${selectCameraString} (${this.cameras.length})  `;
        }
        let anonymousCameraId = 1;
        for (const camera of this.cameras) {
            const value = camera.id;
            let name = camera.label == null ? value : camera.label;
            if (!name || name === "") {
                name = [
                    Html5QrcodeScannerStrings.anonymousCameraPrefix(),
                    anonymousCameraId++
                ].join(" ");
            }
            const option = document.createElement("option");
            option.value = value;
            option.innerText = name;
            this.options.push(option);
            this.selectElement.appendChild(option);
        }
        cameraSelectionContainer.appendChild(this.selectElement);
        parentElement.appendChild(cameraSelectionContainer);
    }
    disable() {
        this.selectElement.disabled = true;
    }
    isDisabled() {
        return this.selectElement.disabled === true;
    }
    enable() {
        this.selectElement.disabled = false;
    }
    getValue() {
        return this.selectElement.value;
    }
    hasValue(value) {
        for (const option of this.options) {
            if (option.value === value) {
                return true;
            }
        }
        return false;
    }
    setValue(value) {
        if (!this.hasValue(value)) {
            throw new Error(`${value} is not present in the camera list.`);
        }
        this.selectElement.value = value;
    }
    hasSingleItem() {
        return this.cameras.length === 1;
    }
    numCameras() {
        return this.cameras.length;
    }
    static create(parentElement, cameras) {
        let cameraSelectUi = new CameraSelectionUi(cameras);
        cameraSelectUi.render(parentElement);
        return cameraSelectUi;
    }
}
//# sourceMappingURL=camera-selection-ui.js.map