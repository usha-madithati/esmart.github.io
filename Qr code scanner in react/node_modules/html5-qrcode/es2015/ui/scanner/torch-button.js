var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Html5QrcodeScannerStrings } from "../../strings";
import { BaseUiElementFactory, PublicUiElementIdAndClasses } from "./base";
class TorchController {
    constructor(torchCapability, buttonController, onTorchActionFailureCallback) {
        this.isTorchOn = false;
        this.torchCapability = torchCapability;
        this.buttonController = buttonController;
        this.onTorchActionFailureCallback = onTorchActionFailureCallback;
    }
    isTorchEnabled() {
        return this.isTorchOn;
    }
    flipState() {
        return __awaiter(this, void 0, void 0, function* () {
            this.buttonController.disable();
            let isTorchOnExpected = !this.isTorchOn;
            try {
                yield this.torchCapability.apply(isTorchOnExpected);
                this.updateUiBasedOnLatestSettings(this.torchCapability.value(), isTorchOnExpected);
            }
            catch (error) {
                this.propagateFailure(isTorchOnExpected, error);
                this.buttonController.enable();
            }
        });
    }
    updateUiBasedOnLatestSettings(isTorchOn, isTorchOnExpected) {
        if (isTorchOn === isTorchOnExpected) {
            this.buttonController.setText(isTorchOnExpected
                ? Html5QrcodeScannerStrings.torchOffButton()
                : Html5QrcodeScannerStrings.torchOnButton());
            this.isTorchOn = isTorchOnExpected;
        }
        else {
            this.propagateFailure(isTorchOnExpected);
        }
        this.buttonController.enable();
    }
    propagateFailure(isTorchOnExpected, error) {
        let errorMessage = isTorchOnExpected
            ? Html5QrcodeScannerStrings.torchOnFailedMessage()
            : Html5QrcodeScannerStrings.torchOffFailedMessage();
        if (error) {
            errorMessage += "; Error = " + error;
        }
        this.onTorchActionFailureCallback(errorMessage);
    }
    reset() {
        this.isTorchOn = false;
    }
}
export class TorchButton {
    constructor(torchCapability, onTorchActionFailureCallback) {
        this.onTorchActionFailureCallback = onTorchActionFailureCallback;
        this.torchButton
            = BaseUiElementFactory.createElement("button", PublicUiElementIdAndClasses.TORCH_BUTTON_ID);
        this.torchController = new TorchController(torchCapability, this, onTorchActionFailureCallback);
    }
    render(parentElement, torchButtonOptions) {
        this.torchButton.innerText
            = Html5QrcodeScannerStrings.torchOnButton();
        this.torchButton.style.display = torchButtonOptions.display;
        this.torchButton.style.marginLeft = torchButtonOptions.marginLeft;
        let $this = this;
        this.torchButton.addEventListener("click", (_) => __awaiter(this, void 0, void 0, function* () {
            yield $this.torchController.flipState();
            if ($this.torchController.isTorchEnabled()) {
                $this.torchButton.classList.remove(PublicUiElementIdAndClasses.TORCH_BUTTON_CLASS_TORCH_OFF);
                $this.torchButton.classList.add(PublicUiElementIdAndClasses.TORCH_BUTTON_CLASS_TORCH_ON);
            }
            else {
                $this.torchButton.classList.remove(PublicUiElementIdAndClasses.TORCH_BUTTON_CLASS_TORCH_ON);
                $this.torchButton.classList.add(PublicUiElementIdAndClasses.TORCH_BUTTON_CLASS_TORCH_OFF);
            }
        }));
        parentElement.appendChild(this.torchButton);
    }
    updateTorchCapability(torchCapability) {
        this.torchController = new TorchController(torchCapability, this, this.onTorchActionFailureCallback);
    }
    getTorchButton() {
        return this.torchButton;
    }
    hide() {
        this.torchButton.style.display = "none";
    }
    show() {
        this.torchButton.style.display = "inline-block";
    }
    disable() {
        this.torchButton.disabled = true;
    }
    enable() {
        this.torchButton.disabled = false;
    }
    setText(text) {
        this.torchButton.innerText = text;
    }
    reset() {
        this.torchButton.innerText = Html5QrcodeScannerStrings.torchOnButton();
        this.torchController.reset();
    }
    static create(parentElement, torchCapability, torchButtonOptions, onTorchActionFailureCallback) {
        let button = new TorchButton(torchCapability, onTorchActionFailureCallback);
        button.render(parentElement, torchButtonOptions);
        return button;
    }
}
//# sourceMappingURL=torch-button.js.map