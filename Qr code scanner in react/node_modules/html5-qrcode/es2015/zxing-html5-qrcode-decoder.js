import * as ZXing from "../third_party/zxing-js.umd";
import { QrcodeResultFormat, Html5QrcodeSupportedFormats } from "./core";
export class ZXingHtml5QrcodeDecoder {
    constructor(requestedFormats, verbose, logger) {
        this.formatMap = new Map([
            [Html5QrcodeSupportedFormats.QR_CODE, ZXing.BarcodeFormat.QR_CODE],
            [Html5QrcodeSupportedFormats.AZTEC, ZXing.BarcodeFormat.AZTEC],
            [Html5QrcodeSupportedFormats.CODABAR, ZXing.BarcodeFormat.CODABAR],
            [Html5QrcodeSupportedFormats.CODE_39, ZXing.BarcodeFormat.CODE_39],
            [Html5QrcodeSupportedFormats.CODE_93, ZXing.BarcodeFormat.CODE_93],
            [
                Html5QrcodeSupportedFormats.CODE_128,
                ZXing.BarcodeFormat.CODE_128
            ],
            [
                Html5QrcodeSupportedFormats.DATA_MATRIX,
                ZXing.BarcodeFormat.DATA_MATRIX
            ],
            [
                Html5QrcodeSupportedFormats.MAXICODE,
                ZXing.BarcodeFormat.MAXICODE
            ],
            [Html5QrcodeSupportedFormats.ITF, ZXing.BarcodeFormat.ITF],
            [Html5QrcodeSupportedFormats.EAN_13, ZXing.BarcodeFormat.EAN_13],
            [Html5QrcodeSupportedFormats.EAN_8, ZXing.BarcodeFormat.EAN_8],
            [Html5QrcodeSupportedFormats.PDF_417, ZXing.BarcodeFormat.PDF_417],
            [Html5QrcodeSupportedFormats.RSS_14, ZXing.BarcodeFormat.RSS_14],
            [
                Html5QrcodeSupportedFormats.RSS_EXPANDED,
                ZXing.BarcodeFormat.RSS_EXPANDED
            ],
            [Html5QrcodeSupportedFormats.UPC_A, ZXing.BarcodeFormat.UPC_A],
            [Html5QrcodeSupportedFormats.UPC_E, ZXing.BarcodeFormat.UPC_E],
            [
                Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
                ZXing.BarcodeFormat.UPC_EAN_EXTENSION
            ]
        ]);
        this.reverseFormatMap = this.createReverseFormatMap();
        if (!ZXing) {
            throw "Use html5qrcode.min.js without edit, ZXing not found.";
        }
        this.verbose = verbose;
        this.logger = logger;
        const formats = this.createZXingFormats(requestedFormats);
        const hints = new Map();
        hints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS, formats);
        hints.set(ZXing.DecodeHintType.TRY_HARDER, false);
        this.hints = hints;
    }
    decodeAsync(canvas) {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.decode(canvas));
            }
            catch (error) {
                reject(error);
            }
        });
    }
    decode(canvas) {
        const zxingDecoder = new ZXing.MultiFormatReader(this.verbose, this.hints);
        const luminanceSource = new ZXing.HTMLCanvasElementLuminanceSource(canvas);
        const binaryBitmap = new ZXing.BinaryBitmap(new ZXing.HybridBinarizer(luminanceSource));
        let result = zxingDecoder.decode(binaryBitmap);
        return {
            text: result.text,
            format: QrcodeResultFormat.create(this.toHtml5QrcodeSupportedFormats(result.format)),
            debugData: this.createDebugData()
        };
    }
    createReverseFormatMap() {
        let result = new Map();
        this.formatMap.forEach((value, key, _) => {
            result.set(value, key);
        });
        return result;
    }
    toHtml5QrcodeSupportedFormats(zxingFormat) {
        if (!this.reverseFormatMap.has(zxingFormat)) {
            throw `reverseFormatMap doesn't have ${zxingFormat}`;
        }
        return this.reverseFormatMap.get(zxingFormat);
    }
    createZXingFormats(requestedFormats) {
        let zxingFormats = [];
        for (const requestedFormat of requestedFormats) {
            if (this.formatMap.has(requestedFormat)) {
                zxingFormats.push(this.formatMap.get(requestedFormat));
            }
            else {
                this.logger.logError(`${requestedFormat} is not supported by`
                    + "ZXingHtml5QrcodeShim");
            }
        }
        return zxingFormats;
    }
    createDebugData() {
        return { decoderName: "zxing-js" };
    }
}
//# sourceMappingURL=zxing-html5-qrcode-decoder.js.map