var PersistedDataFactory = (function () {
    function PersistedDataFactory() {
    }
    PersistedDataFactory.createDefault = function () {
        return {
            hasPermission: false,
            lastUsedCameraId: null
        };
    };
    return PersistedDataFactory;
}());
var PersistedDataManager = (function () {
    function PersistedDataManager() {
        this.data = PersistedDataFactory.createDefault();
        var data = localStorage.getItem(PersistedDataManager.LOCAL_STORAGE_KEY);
        if (!data) {
            this.reset();
        }
        else {
            this.data = JSON.parse(data);
        }
    }
    PersistedDataManager.prototype.hasCameraPermissions = function () {
        return this.data.hasPermission;
    };
    PersistedDataManager.prototype.getLastUsedCameraId = function () {
        return this.data.lastUsedCameraId;
    };
    PersistedDataManager.prototype.setHasPermission = function (hasPermission) {
        this.data.hasPermission = hasPermission;
        this.flush();
    };
    PersistedDataManager.prototype.setLastUsedCameraId = function (lastUsedCameraId) {
        this.data.lastUsedCameraId = lastUsedCameraId;
        this.flush();
    };
    PersistedDataManager.prototype.resetLastUsedCameraId = function () {
        this.data.lastUsedCameraId = null;
        this.flush();
    };
    PersistedDataManager.prototype.reset = function () {
        this.data = PersistedDataFactory.createDefault();
        this.flush();
    };
    PersistedDataManager.prototype.flush = function () {
        localStorage.setItem(PersistedDataManager.LOCAL_STORAGE_KEY, JSON.stringify(this.data));
    };
    PersistedDataManager.LOCAL_STORAGE_KEY = "HTML5_QRCODE_DATA";
    return PersistedDataManager;
}());
export { PersistedDataManager };
//# sourceMappingURL=storage.js.map