"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSelectionUi = void 0;
var strings_1 = require("../../strings");
var base_1 = require("./base");
var FileSelectionUi = (function () {
    function FileSelectionUi(parentElement, showOnRender, onFileSelected) {
        this.fileBasedScanRegion = this.createFileBasedScanRegion();
        this.fileBasedScanRegion.style.display
            = showOnRender ? "block" : "none";
        parentElement.appendChild(this.fileBasedScanRegion);
        var fileScanLabel = document.createElement("label");
        fileScanLabel.setAttribute("for", this.getFileScanInputId());
        fileScanLabel.style.display = "inline-block";
        this.fileBasedScanRegion.appendChild(fileScanLabel);
        this.fileSelectionButton
            = base_1.BaseUiElementFactory.createElement("button", base_1.PublicUiElementIdAndClasses.FILE_SELECTION_BUTTON_ID);
        this.setInitialValueToButton();
        this.fileSelectionButton.addEventListener("click", function (_) {
            fileScanLabel.click();
        });
        fileScanLabel.append(this.fileSelectionButton);
        this.fileScanInput
            = base_1.BaseUiElementFactory.createElement("input", this.getFileScanInputId());
        this.fileScanInput.type = "file";
        this.fileScanInput.accept = "image/*";
        this.fileScanInput.style.display = "none";
        fileScanLabel.appendChild(this.fileScanInput);
        var $this = this;
        this.fileScanInput.addEventListener("change", function (e) {
            if (e == null || e.target == null) {
                return;
            }
            var target = e.target;
            if (target.files && target.files.length === 0) {
                return;
            }
            var fileList = target.files;
            var file = fileList[0];
            var fileName = file.name;
            $this.setImageNameToButton(fileName);
            onFileSelected(file);
        });
        var dragAndDropMessage = this.createDragAndDropMessage();
        this.fileBasedScanRegion.appendChild(dragAndDropMessage);
        this.fileBasedScanRegion.addEventListener("dragenter", function (event) {
            $this.fileBasedScanRegion.style.border
                = $this.fileBasedScanRegionActiveBorder();
            event.stopPropagation();
            event.preventDefault();
        });
        this.fileBasedScanRegion.addEventListener("dragleave", function (event) {
            $this.fileBasedScanRegion.style.border
                = $this.fileBasedScanRegionDefaultBorder();
            event.stopPropagation();
            event.preventDefault();
        });
        this.fileBasedScanRegion.addEventListener("dragover", function (event) {
            $this.fileBasedScanRegion.style.border
                = $this.fileBasedScanRegionActiveBorder();
            event.stopPropagation();
            event.preventDefault();
        });
        this.fileBasedScanRegion.addEventListener("drop", function (event) {
            event.stopPropagation();
            event.preventDefault();
            $this.fileBasedScanRegion.style.border
                = $this.fileBasedScanRegionDefaultBorder();
            var dataTransfer = event.dataTransfer;
            if (dataTransfer) {
                var files = dataTransfer.files;
                if (!files || files.length === 0) {
                    return;
                }
                var isAnyFileImage = false;
                for (var i = 0; i < files.length; ++i) {
                    var file = files.item(i);
                    if (!file) {
                        continue;
                    }
                    var imageType = /image.*/;
                    if (!file.type.match(imageType)) {
                        continue;
                    }
                    isAnyFileImage = true;
                    var fileName = file.name;
                    $this.setImageNameToButton(fileName);
                    onFileSelected(file);
                    dragAndDropMessage.innerText
                        = strings_1.Html5QrcodeScannerStrings.dragAndDropMessage();
                    break;
                }
                if (!isAnyFileImage) {
                    dragAndDropMessage.innerText
                        = strings_1.Html5QrcodeScannerStrings
                            .dragAndDropMessageOnlyImages();
                }
            }
        });
    }
    FileSelectionUi.prototype.hide = function () {
        this.fileBasedScanRegion.style.display = "none";
        this.fileScanInput.disabled = true;
    };
    FileSelectionUi.prototype.show = function () {
        this.fileBasedScanRegion.style.display = "block";
        this.fileScanInput.disabled = false;
    };
    FileSelectionUi.prototype.isShowing = function () {
        return this.fileBasedScanRegion.style.display === "block";
    };
    FileSelectionUi.prototype.resetValue = function () {
        this.fileScanInput.value = "";
        this.setInitialValueToButton();
    };
    FileSelectionUi.prototype.createFileBasedScanRegion = function () {
        var fileBasedScanRegion = document.createElement("div");
        fileBasedScanRegion.style.textAlign = "center";
        fileBasedScanRegion.style.margin = "auto";
        fileBasedScanRegion.style.width = "80%";
        fileBasedScanRegion.style.maxWidth = "600px";
        fileBasedScanRegion.style.border
            = this.fileBasedScanRegionDefaultBorder();
        fileBasedScanRegion.style.padding = "10px";
        fileBasedScanRegion.style.marginBottom = "10px";
        return fileBasedScanRegion;
    };
    FileSelectionUi.prototype.fileBasedScanRegionDefaultBorder = function () {
        return "6px dashed #ebebeb";
    };
    FileSelectionUi.prototype.fileBasedScanRegionActiveBorder = function () {
        return "6px dashed rgb(153 151 151)";
    };
    FileSelectionUi.prototype.createDragAndDropMessage = function () {
        var dragAndDropMessage = document.createElement("div");
        dragAndDropMessage.innerText
            = strings_1.Html5QrcodeScannerStrings.dragAndDropMessage();
        dragAndDropMessage.style.fontWeight = "400";
        return dragAndDropMessage;
    };
    FileSelectionUi.prototype.setImageNameToButton = function (imageFileName) {
        var MAX_CHARS = 20;
        if (imageFileName.length > MAX_CHARS) {
            var start8Chars = imageFileName.substring(0, 8);
            var length_1 = imageFileName.length;
            var last8Chars = imageFileName.substring(length_1 - 8, length_1);
            imageFileName = "".concat(start8Chars, "....").concat(last8Chars);
        }
        var newText = strings_1.Html5QrcodeScannerStrings.fileSelectionChooseAnother()
            + " - "
            + imageFileName;
        this.fileSelectionButton.innerText = newText;
    };
    FileSelectionUi.prototype.setInitialValueToButton = function () {
        var initialText = strings_1.Html5QrcodeScannerStrings.fileSelectionChooseImage()
            + " - "
            + strings_1.Html5QrcodeScannerStrings.fileSelectionNoImageSelected();
        this.fileSelectionButton.innerText = initialText;
    };
    FileSelectionUi.prototype.getFileScanInputId = function () {
        return "html5-qrcode-private-filescan-input";
    };
    FileSelectionUi.create = function (parentElement, showOnRender, onFileSelected) {
        var button = new FileSelectionUi(parentElement, showOnRender, onFileSelected);
        return button;
    };
    return FileSelectionUi;
}());
exports.FileSelectionUi = FileSelectionUi;
//# sourceMappingURL=file-selection-ui.js.map