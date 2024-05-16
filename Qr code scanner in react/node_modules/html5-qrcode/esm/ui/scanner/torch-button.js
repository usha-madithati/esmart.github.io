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
import { Html5QrcodeScannerStrings } from "../../strings";
import { BaseUiElementFactory, PublicUiElementIdAndClasses } from "./base";
var TorchController = (function () {
    function TorchController(torchCapability, buttonController, onTorchActionFailureCallback) {
        this.isTorchOn = false;
        this.torchCapability = torchCapability;
        this.buttonController = buttonController;
        this.onTorchActionFailureCallback = onTorchActionFailureCallback;
    }
    TorchController.prototype.isTorchEnabled = function () {
        return this.isTorchOn;
    };
    TorchController.prototype.flipState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isTorchOnExpected, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.buttonController.disable();
                        isTorchOnExpected = !this.isTorchOn;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.torchCapability.apply(isTorchOnExpected)];
                    case 2:
                        _a.sent();
                        this.updateUiBasedOnLatestSettings(this.torchCapability.value(), isTorchOnExpected);
                        return [3, 4];
                    case 3:
                        error_1 = _a.sent();
                        this.propagateFailure(isTorchOnExpected, error_1);
                        this.buttonController.enable();
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    TorchController.prototype.updateUiBasedOnLatestSettings = function (isTorchOn, isTorchOnExpected) {
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
    };
    TorchController.prototype.propagateFailure = function (isTorchOnExpected, error) {
        var errorMessage = isTorchOnExpected
            ? Html5QrcodeScannerStrings.torchOnFailedMessage()
            : Html5QrcodeScannerStrings.torchOffFailedMessage();
        if (error) {
            errorMessage += "; Error = " + error;
        }
        this.onTorchActionFailureCallback(errorMessage);
    };
    TorchController.prototype.reset = function () {
        this.isTorchOn = false;
    };
    return TorchController;
}());
var TorchButton = (function () {
    function TorchButton(torchCapability, onTorchActionFailureCallback) {
        this.onTorchActionFailureCallback = onTorchActionFailureCallback;
        this.torchButton
            = BaseUiElementFactory.createElement("button", PublicUiElementIdAndClasses.TORCH_BUTTON_ID);
        this.torchController = new TorchController(torchCapability, this, onTorchActionFailureCallback);
    }
    TorchButton.prototype.render = function (parentElement, torchButtonOptions) {
        var _this = this;
        this.torchButton.innerText
            = Html5QrcodeScannerStrings.torchOnButton();
        this.torchButton.style.display = torchButtonOptions.display;
        this.torchButton.style.marginLeft = torchButtonOptions.marginLeft;
        var $this = this;
        this.torchButton.addEventListener("click", function (_) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, $this.torchController.flipState()];
                    case 1:
                        _a.sent();
                        if ($this.torchController.isTorchEnabled()) {
                            $this.torchButton.classList.remove(PublicUiElementIdAndClasses.TORCH_BUTTON_CLASS_TORCH_OFF);
                            $this.torchButton.classList.add(PublicUiElementIdAndClasses.TORCH_BUTTON_CLASS_TORCH_ON);
                        }
                        else {
                            $this.torchButton.classList.remove(PublicUiElementIdAndClasses.TORCH_BUTTON_CLASS_TORCH_ON);
                            $this.torchButton.classList.add(PublicUiElementIdAndClasses.TORCH_BUTTON_CLASS_TORCH_OFF);
                        }
                        return [2];
                }
            });
        }); });
        parentElement.appendChild(this.torchButton);
    };
    TorchButton.prototype.updateTorchCapability = function (torchCapability) {
        this.torchController = new TorchController(torchCapability, this, this.onTorchActionFailureCallback);
    };
    TorchButton.prototype.getTorchButton = function () {
        return this.torchButton;
    };
    TorchButton.prototype.hide = function () {
        this.torchButton.style.display = "none";
    };
    TorchButton.prototype.show = function () {
        this.torchButton.style.display = "inline-block";
    };
    TorchButton.prototype.disable = function () {
        this.torchButton.disabled = true;
    };
    TorchButton.prototype.enable = function () {
        this.torchButton.disabled = false;
    };
    TorchButton.prototype.setText = function (text) {
        this.torchButton.innerText = text;
    };
    TorchButton.prototype.reset = function () {
        this.torchButton.innerText = Html5QrcodeScannerStrings.torchOnButton();
        this.torchController.reset();
    };
    TorchButton.create = function (parentElement, torchCapability, torchButtonOptions, onTorchActionFailureCallback) {
        var button = new TorchButton(torchCapability, onTorchActionFailureCallback);
        button.render(parentElement, torchButtonOptions);
        return button;
    };
    return TorchButton;
}());
export { TorchButton };
//# sourceMappingURL=torch-button.js.map