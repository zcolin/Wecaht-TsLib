"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var ZUi = (function () {
    function ZUi() {
    }
    ZUi.showLoading = function (title) {
        title = title || '';
        wx.showLoading({ title: title, mask: true });
    };
    ZUi.hideLoading = function () {
        wx.hideLoading({});
    };
    ZUi.showSuccessToast = function (title, duration) {
        wx.showToast({
            title: title,
            duration: duration || 1500
        });
    };
    ZUi.showTextToast = function (title, duration) {
        wx.showToast({
            title: title,
            icon: "none",
            duration: duration || 1500
        });
    };
    ZUi.showImageToast = function (title, image, duration) {
        wx.showToast({
            title: title,
            icon: "none",
            image: image,
            duration: duration || 1500
        });
    };
    ZUi.showToast = function (option) {
        wx.showToast(option);
    };
    ZUi.showActionSheet = function (itemList, callback, itemColor) {
        wx.showActionSheet({
            itemList: itemList,
            itemColor: itemColor,
            success: (function (result) {
                if (callback) {
                    callback(result.tapIndex, itemList[result.tapIndex]);
                }
            })
        });
    };
    ZUi.showAlert = function (title, content, callback, okText) {
        wx.showModal({
            title: title,
            content: content,
            showCancel: false,
            confirmText: okText,
            confirmColor: getApp().globalData.color.primary,
            success: callback,
        });
    };
    ZUi.prototype.showConfirm = function (title, content, okCallback, cancelCallback, OkBtnText, cancelBtnText) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                wx.showModal({
                    title: title,
                    content: content,
                    confirmText: OkBtnText,
                    cancelText: cancelBtnText,
                    confirmColor: getApp().globalData.color.primary,
                    success: (function (result) {
                        if (result.confirm && okCallback) {
                            okCallback();
                        }
                        else if (result.cancel && cancelCallback) {
                            cancelCallback();
                        }
                    })
                });
                return [2];
            });
        });
    };
    return ZUi;
}());
exports.ZUi = ZUi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiei11aS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInotdWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1BO0lBQUE7SUE4SEEsQ0FBQztJQXpIaUIsZUFBVyxHQUF6QixVQUEwQixLQUFjO1FBQ3BDLEtBQUssR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFLYSxlQUFXLEdBQXpCO1FBQ0ksRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBT2Esb0JBQWdCLEdBQTlCLFVBQStCLEtBQWEsRUFBRSxRQUFpQjtRQUMzRCxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ1QsS0FBSyxFQUFFLEtBQUs7WUFDWixRQUFRLEVBQUUsUUFBUSxJQUFJLElBQUk7U0FDN0IsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQU9hLGlCQUFhLEdBQTNCLFVBQTRCLEtBQWEsRUFBRSxRQUFpQjtRQUN4RCxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ1QsS0FBSyxFQUFFLEtBQUs7WUFDWixJQUFJLEVBQUUsTUFBTTtZQUNaLFFBQVEsRUFBRSxRQUFRLElBQUksSUFBSTtTQUM3QixDQUFDLENBQUE7SUFDTixDQUFDO0lBUWEsa0JBQWMsR0FBNUIsVUFBNkIsS0FBYSxFQUFFLEtBQWEsRUFBRSxRQUFpQjtRQUN4RSxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ1QsS0FBSyxFQUFFLEtBQUs7WUFDWixJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxLQUFLO1lBQ1osUUFBUSxFQUFFLFFBQVEsSUFBSSxJQUFJO1NBQzdCLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFNYSxhQUFTLEdBQXZCLFVBQXdCLE1BQXVCO1FBQzNDLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQVFhLG1CQUFlLEdBQTdCLFVBQThCLFFBQWtCLEVBQUUsUUFBMEQsRUFBRSxTQUFrQjtRQUM1SCxFQUFFLENBQUMsZUFBZSxDQUFDO1lBQ2YsUUFBUSxFQUFFLFFBQVE7WUFDbEIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsT0FBTyxFQUFFLENBQUMsVUFBQSxNQUFNO2dCQUNaLElBQUksUUFBUSxFQUFFO29CQUNWLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDeEQ7WUFDTCxDQUFDLENBQUM7U0FDTCxDQUFDLENBQUM7SUFDUCxDQUFDO0lBU2EsYUFBUyxHQUF2QixVQUF3QixLQUFhLEVBQUUsT0FBZSxFQUFFLFFBQStCLEVBQUUsTUFBZTtRQUNwRyxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ1QsS0FBSyxFQUFFLEtBQUs7WUFDWixPQUFPLEVBQUUsT0FBTztZQUNoQixVQUFVLEVBQUUsS0FBSztZQUNqQixXQUFXLEVBQUUsTUFBTTtZQUNuQixZQUFZLEVBQUUsTUFBTSxFQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPO1lBQ3ZELE9BQU8sRUFBRSxRQUFRO1NBQ3BCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFXWSx5QkFBVyxHQUF4QixVQUF5QixLQUFhLEVBQUUsT0FBZSxFQUFFLFVBQWlDLEVBQUUsY0FBcUMsRUFBRSxTQUFrQixFQUFFLGFBQXNCOzs7Z0JBQ3pLLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ1QsS0FBSyxFQUFFLEtBQUs7b0JBQ1osT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFdBQVcsRUFBRSxTQUFTO29CQUN0QixVQUFVLEVBQUUsYUFBYTtvQkFDekIsWUFBWSxFQUFFLE1BQU0sRUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTztvQkFDdkQsT0FBTyxFQUFFLENBQUMsVUFBQSxNQUFNO3dCQUNaLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxVQUFVLEVBQUU7NEJBQzlCLFVBQVUsRUFBRSxDQUFDO3lCQUNoQjs2QkFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksY0FBYyxFQUFFOzRCQUN4QyxjQUFjLEVBQUUsQ0FBQzt5QkFDcEI7b0JBQ0wsQ0FBQyxDQUFDO2lCQUNMLENBQUMsQ0FBQzs7OztLQUNOO0lBQ0wsVUFBQztBQUFELENBQUMsQUE5SEQsSUE4SEM7QUE5SFksa0JBQUciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVp55u45YWz5pyN5Yqh57G7XG4gKi9cbmltcG9ydCBTaG93VG9hc3RPcHRpb24gPSB3eC5TaG93VG9hc3RPcHRpb247XG5pbXBvcnQge0lNeUFwcH0gZnJvbSBcIi4uL2FwcFwiO1xuXG5leHBvcnQgY2xhc3MgWlVpIHtcbiAgICAvKipcbiAgICAgKiDmmL7npLrov5vluqbmnaFcbiAgICAgKiBAcGFyYW0gdGl0bGVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNob3dMb2FkaW5nKHRpdGxlPzogc3RyaW5nKSB7XG4gICAgICAgIHRpdGxlID0gdGl0bGUgfHwgJyc7XG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHt0aXRsZTogdGl0bGUsIG1hc2s6IHRydWV9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDpmpDol4/ov5vluqbmnaFcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGhpZGVMb2FkaW5nKCkge1xuICAgICAgICB3eC5oaWRlTG9hZGluZyh7fSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pi+56S65bim5pyJ5oiQ5Yqf5Zu+5qCH55qEdG9hc3RcbiAgICAgKiBAcGFyYW0gdGl0bGVcbiAgICAgKiBAcGFyYW0gZHVyYXRpb25cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNob3dTdWNjZXNzVG9hc3QodGl0bGU6IHN0cmluZywgZHVyYXRpb24/OiBudW1iZXIpIHtcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbiB8fCAxNTAwXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pi+56S65Y+q5pyJ5paH5a2X55qEdG9hc3RcbiAgICAgKiBAcGFyYW0gdGl0bGVcbiAgICAgKiBAcGFyYW0gZHVyYXRpb25cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNob3dUZXh0VG9hc3QodGl0bGU6IHN0cmluZywgZHVyYXRpb24/OiBudW1iZXIpIHtcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgIGljb246IFwibm9uZVwiLFxuICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uIHx8IDE1MDBcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmmL7npLrluKbmnInoh6rlrprkuYnlm77moIfnmoR0b2FzdFxuICAgICAqIEBwYXJhbSB0aXRsZVxuICAgICAqIEBwYXJhbSBpbWFnZVxuICAgICAqIEBwYXJhbSBkdXJhdGlvblxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc2hvd0ltYWdlVG9hc3QodGl0bGU6IHN0cmluZywgaW1hZ2U6IHN0cmluZywgZHVyYXRpb24/OiBudW1iZXIpIHtcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgIGljb246IFwibm9uZVwiLFxuICAgICAgICAgICAgaW1hZ2U6IGltYWdlLFxuICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uIHx8IDE1MDBcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmmL7npLpUb2FzdFxuICAgICAqIEBwYXJhbSBvcHRpb25cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNob3dUb2FzdChvcHRpb246IFNob3dUb2FzdE9wdGlvbikge1xuICAgICAgICB3eC5zaG93VG9hc3Qob3B0aW9uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmmL7npLpBY3Rpb25TaGVldFxuICAgICAqIEBwYXJhbSBpdGVtTGlzdCAgICAgIOaMiemSrueahOaWh+Wtl+aVsOe7hO+8jOaVsOe7hOmVv+W6puacgOWkp+S4uiA2XG4gICAgICogQHBhcmFtIGNhbGxiYWNrICAgICAg5Zue6LCDLOWbnuS8oOmAieS4reeahOS9jee9ruWSjOaWh+Wtlywg5aaC5p6c5Zue6LCD5pa55rOV6L+U5ZueZmFsc2XvvIzliJnlvLnlh7rmoYbkuI3mtojlpLFcbiAgICAgKiBAcGFyYW0gaXRlbUNvbG9yXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBzaG93QWN0aW9uU2hlZXQoaXRlbUxpc3Q6IHN0cmluZ1tdLCBjYWxsYmFjaz86IChpbmRleDogbnVtYmVyLCB0ZXh0OiBzdHJpbmcpID0+IGJvb2xlYW4gfCB2b2lkLCBpdGVtQ29sb3I/OiBzdHJpbmcpIHtcbiAgICAgICAgd3guc2hvd0FjdGlvblNoZWV0KHtcbiAgICAgICAgICAgIGl0ZW1MaXN0OiBpdGVtTGlzdCxcbiAgICAgICAgICAgIGl0ZW1Db2xvcjogaXRlbUNvbG9yLFxuICAgICAgICAgICAgc3VjY2VzczogKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdC50YXBJbmRleCwgaXRlbUxpc3RbcmVzdWx0LnRhcEluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pi+56S6QWxlcnRcbiAgICAgKiBAcGFyYW0gdGl0bGUgICDlvLnlh7rmoYbmoIfpophcbiAgICAgKiBAcGFyYW0gY29udGVudCAg5by55Ye65qGG5YaF5a65XG4gICAgICogQHBhcmFtIGNhbGxiYWNrIOWmguaenOWbnuiwg+aWueazlei/lOWbnmZhbHNl77yM5YiZ5by55Ye65qGG5LiN5raI5aSxXG4gICAgICogQHBhcmFtIG9rVGV4dCAgIOehruWumuaMiemSruaWh+Wtl1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc2hvd0FsZXJ0KHRpdGxlOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZywgY2FsbGJhY2s/OiAoKSA9PiB2b2lkIHwgYm9vbGVhbiwgb2tUZXh0Pzogc3RyaW5nKSB7XG4gICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50LFxuICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICBjb25maXJtVGV4dDogb2tUZXh0LFxuICAgICAgICAgICAgY29uZmlybUNvbG9yOiBnZXRBcHA8SU15QXBwPigpLmdsb2JhbERhdGEuY29sb3IucHJpbWFyeSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGNhbGxiYWNrLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmmL7npLpDb25maXJtXG4gICAgICogQHBhcmFtIHRpdGxlXG4gICAgICogQHBhcmFtIGNvbnRlbnQgICAgICAgICAgIOWGheWuuVxuICAgICAqIEBwYXJhbSBva0NhbGxiYWNrICAgICAgICDnoa7lrprmjInpkq7lm57osINcbiAgICAgKiBAcGFyYW0gY2FuY2VsQ2FsbGJhY2sgICAg5Y+W5raI5oyJ6ZKu5Zue6LCDXG4gICAgICogQHBhcmFtIE9rQnRuVGV4dCAgICAgICAgIOehruWumuaMiemSruaWh+Wtl1xuICAgICAqIEBwYXJhbSBjYW5jZWxCdG5UZXh0ICAgICDlj5bmtojmjInpkq7mloflrZdcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc2hvd0NvbmZpcm0odGl0bGU6IHN0cmluZywgY29udGVudDogc3RyaW5nLCBva0NhbGxiYWNrPzogKCkgPT4gYm9vbGVhbiB8IHZvaWQsIGNhbmNlbENhbGxiYWNrPzogKCkgPT4gYm9vbGVhbiB8IHZvaWQsIE9rQnRuVGV4dD86IHN0cmluZywgY2FuY2VsQnRuVGV4dD86IHN0cmluZykge1xuICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgICAgY29udGVudDogY29udGVudCxcbiAgICAgICAgICAgIGNvbmZpcm1UZXh0OiBPa0J0blRleHQsXG4gICAgICAgICAgICBjYW5jZWxUZXh0OiBjYW5jZWxCdG5UZXh0LFxuICAgICAgICAgICAgY29uZmlybUNvbG9yOiBnZXRBcHA8SU15QXBwPigpLmdsb2JhbERhdGEuY29sb3IucHJpbWFyeSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuY29uZmlybSAmJiBva0NhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIG9rQ2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5jYW5jZWwgJiYgY2FuY2VsQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsQ2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=