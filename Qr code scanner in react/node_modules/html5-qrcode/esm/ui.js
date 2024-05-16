import { ASSET_CLOSE_ICON_16PX, ASSET_INFO_ICON_16PX } from "./image-assets";
import { LibraryInfoStrings } from "./strings";
var LibraryInfoDiv = (function () {
    function LibraryInfoDiv() {
        this.infoDiv = document.createElement("div");
    }
    LibraryInfoDiv.prototype.renderInto = function (parent) {
        this.infoDiv.style.position = "absolute";
        this.infoDiv.style.top = "10px";
        this.infoDiv.style.right = "10px";
        this.infoDiv.style.zIndex = "2";
        this.infoDiv.style.display = "none";
        this.infoDiv.style.padding = "5pt";
        this.infoDiv.style.border = "1px solid #171717";
        this.infoDiv.style.fontSize = "10pt";
        this.infoDiv.style.background = "rgb(0 0 0 / 69%)";
        this.infoDiv.style.borderRadius = "5px";
        this.infoDiv.style.textAlign = "center";
        this.infoDiv.style.fontWeight = "400";
        this.infoDiv.style.color = "white";
        this.infoDiv.innerText = LibraryInfoStrings.poweredBy();
        var projectLink = document.createElement("a");
        projectLink.innerText = "ScanApp";
        projectLink.href = "https://scanapp.org";
        projectLink.target = "new";
        projectLink.style.color = "white";
        this.infoDiv.appendChild(projectLink);
        var breakElemFirst = document.createElement("br");
        var breakElemSecond = document.createElement("br");
        this.infoDiv.appendChild(breakElemFirst);
        this.infoDiv.appendChild(breakElemSecond);
        var reportIssueLink = document.createElement("a");
        reportIssueLink.innerText = LibraryInfoStrings.reportIssues();
        reportIssueLink.href = "https://github.com/mebjas/html5-qrcode/issues";
        reportIssueLink.target = "new";
        reportIssueLink.style.color = "white";
        this.infoDiv.appendChild(reportIssueLink);
        parent.appendChild(this.infoDiv);
    };
    LibraryInfoDiv.prototype.show = function () {
        this.infoDiv.style.display = "block";
    };
    LibraryInfoDiv.prototype.hide = function () {
        this.infoDiv.style.display = "none";
    };
    return LibraryInfoDiv;
}());
var LibraryInfoIcon = (function () {
    function LibraryInfoIcon(onTapIn, onTapOut) {
        this.isShowingInfoIcon = true;
        this.onTapIn = onTapIn;
        this.onTapOut = onTapOut;
        this.infoIcon = document.createElement("img");
    }
    LibraryInfoIcon.prototype.renderInto = function (parent) {
        var _this = this;
        this.infoIcon.alt = "Info icon";
        this.infoIcon.src = ASSET_INFO_ICON_16PX;
        this.infoIcon.style.position = "absolute";
        this.infoIcon.style.top = "4px";
        this.infoIcon.style.right = "4px";
        this.infoIcon.style.opacity = "0.6";
        this.infoIcon.style.cursor = "pointer";
        this.infoIcon.style.zIndex = "2";
        this.infoIcon.style.width = "16px";
        this.infoIcon.style.height = "16px";
        this.infoIcon.onmouseover = function (_) { return _this.onHoverIn(); };
        this.infoIcon.onmouseout = function (_) { return _this.onHoverOut(); };
        this.infoIcon.onclick = function (_) { return _this.onClick(); };
        parent.appendChild(this.infoIcon);
    };
    LibraryInfoIcon.prototype.onHoverIn = function () {
        if (this.isShowingInfoIcon) {
            this.infoIcon.style.opacity = "1";
        }
    };
    LibraryInfoIcon.prototype.onHoverOut = function () {
        if (this.isShowingInfoIcon) {
            this.infoIcon.style.opacity = "0.6";
        }
    };
    LibraryInfoIcon.prototype.onClick = function () {
        if (this.isShowingInfoIcon) {
            this.isShowingInfoIcon = false;
            this.onTapIn();
            this.infoIcon.src = ASSET_CLOSE_ICON_16PX;
            this.infoIcon.style.opacity = "1";
        }
        else {
            this.isShowingInfoIcon = true;
            this.onTapOut();
            this.infoIcon.src = ASSET_INFO_ICON_16PX;
            this.infoIcon.style.opacity = "0.6";
        }
    };
    return LibraryInfoIcon;
}());
var LibraryInfoContainer = (function () {
    function LibraryInfoContainer() {
        var _this = this;
        this.infoDiv = new LibraryInfoDiv();
        this.infoIcon = new LibraryInfoIcon(function () {
            _this.infoDiv.show();
        }, function () {
            _this.infoDiv.hide();
        });
    }
    LibraryInfoContainer.prototype.renderInto = function (parent) {
        this.infoDiv.renderInto(parent);
        this.infoIcon.renderInto(parent);
    };
    return LibraryInfoContainer;
}());
export { LibraryInfoContainer };
//# sourceMappingURL=ui.js.map