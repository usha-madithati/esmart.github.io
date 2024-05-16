var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CameraImpl } from "./core-impl";
export class CameraFactory {
    static failIfNotSupported() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!navigator.mediaDevices) {
                throw "navigator.mediaDevices not supported";
            }
            return new CameraFactory();
        });
    }
    constructor() { }
    create(videoConstraints) {
        return __awaiter(this, void 0, void 0, function* () {
            return CameraImpl.create(videoConstraints);
        });
    }
}
//# sourceMappingURL=factories.js.map