var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ZXingHtml5QrcodeDecoder } from "./zxing-html5-qrcode-decoder";
import { BarcodeDetectorDelegate } from "./native-bar-code-detector";
export class Html5QrcodeShim {
    constructor(requestedFormats, useBarCodeDetectorIfSupported, verbose, logger) {
        this.EXECUTIONS_TO_REPORT_PERFORMANCE = 100;
        this.executions = 0;
        this.executionResults = [];
        this.wasPrimaryDecoderUsedInLastDecode = false;
        this.verbose = verbose;
        if (useBarCodeDetectorIfSupported
            && BarcodeDetectorDelegate.isSupported()) {
            this.primaryDecoder = new BarcodeDetectorDelegate(requestedFormats, verbose, logger);
            this.secondaryDecoder = new ZXingHtml5QrcodeDecoder(requestedFormats, verbose, logger);
        }
        else {
            this.primaryDecoder = new ZXingHtml5QrcodeDecoder(requestedFormats, verbose, logger);
        }
    }
    decodeAsync(canvas) {
        return __awaiter(this, void 0, void 0, function* () {
            let startTime = performance.now();
            try {
                return yield this.getDecoder().decodeAsync(canvas);
            }
            finally {
                this.possiblyLogPerformance(startTime);
            }
        });
    }
    decodeRobustlyAsync(canvas) {
        return __awaiter(this, void 0, void 0, function* () {
            let startTime = performance.now();
            try {
                return yield this.primaryDecoder.decodeAsync(canvas);
            }
            catch (error) {
                if (this.secondaryDecoder) {
                    return this.secondaryDecoder.decodeAsync(canvas);
                }
                throw error;
            }
            finally {
                this.possiblyLogPerformance(startTime);
            }
        });
    }
    getDecoder() {
        if (!this.secondaryDecoder) {
            return this.primaryDecoder;
        }
        if (this.wasPrimaryDecoderUsedInLastDecode === false) {
            this.wasPrimaryDecoderUsedInLastDecode = true;
            return this.primaryDecoder;
        }
        this.wasPrimaryDecoderUsedInLastDecode = false;
        return this.secondaryDecoder;
    }
    possiblyLogPerformance(startTime) {
        if (!this.verbose) {
            return;
        }
        let executionTime = performance.now() - startTime;
        this.executionResults.push(executionTime);
        this.executions++;
        this.possiblyFlushPerformanceReport();
    }
    possiblyFlushPerformanceReport() {
        if (this.executions < this.EXECUTIONS_TO_REPORT_PERFORMANCE) {
            return;
        }
        let sum = 0;
        for (let executionTime of this.executionResults) {
            sum += executionTime;
        }
        let mean = sum / this.executionResults.length;
        console.log(`${mean} ms for ${this.executionResults.length} last runs.`);
        this.executions = 0;
        this.executionResults = [];
    }
}
//# sourceMappingURL=code-decoder.js.map