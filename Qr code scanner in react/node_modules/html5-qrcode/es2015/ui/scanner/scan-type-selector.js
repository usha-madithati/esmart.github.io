import { Html5QrcodeScanType, Html5QrcodeConstants } from "../../core";
export class ScanTypeSelector {
    constructor(supportedScanTypes) {
        this.supportedScanTypes = this.validateAndReturnScanTypes(supportedScanTypes);
    }
    getDefaultScanType() {
        return this.supportedScanTypes[0];
    }
    hasMoreThanOneScanType() {
        return this.supportedScanTypes.length > 1;
    }
    isCameraScanRequired() {
        for (const scanType of this.supportedScanTypes) {
            if (ScanTypeSelector.isCameraScanType(scanType)) {
                return true;
            }
        }
        return false;
    }
    static isCameraScanType(scanType) {
        return scanType === Html5QrcodeScanType.SCAN_TYPE_CAMERA;
    }
    static isFileScanType(scanType) {
        return scanType === Html5QrcodeScanType.SCAN_TYPE_FILE;
    }
    validateAndReturnScanTypes(supportedScanTypes) {
        if (!supportedScanTypes || supportedScanTypes.length === 0) {
            return Html5QrcodeConstants.DEFAULT_SUPPORTED_SCAN_TYPE;
        }
        let maxExpectedValues = Html5QrcodeConstants.DEFAULT_SUPPORTED_SCAN_TYPE.length;
        if (supportedScanTypes.length > maxExpectedValues) {
            throw `Max ${maxExpectedValues} values expected for `
                + "supportedScanTypes";
        }
        for (const scanType of supportedScanTypes) {
            if (!Html5QrcodeConstants.DEFAULT_SUPPORTED_SCAN_TYPE
                .includes(scanType)) {
                throw `Unsupported scan type ${scanType}`;
            }
        }
        return supportedScanTypes;
    }
}
//# sourceMappingURL=scan-type-selector.js.map