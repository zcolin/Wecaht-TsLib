"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ZLogUtil = (function () {
    function ZLogUtil() {
    }
    ZLogUtil.log = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (ZLogUtil.DEBUG) {
            console.log(message, optionalParams);
        }
    };
    ZLogUtil.error = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (ZLogUtil.DEBUG) {
            console.error(message, optionalParams);
        }
    };
    ZLogUtil.warn = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (ZLogUtil.DEBUG) {
            console.warn(message, optionalParams);
        }
    };
    ZLogUtil.clear = function () {
        if (ZLogUtil.DEBUG) {
            console.clear();
        }
    };
    ZLogUtil.DEBUG = true;
    return ZLogUtil;
}());
exports.ZLogUtil = ZLogUtil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiei1sb2cudXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInotbG9nLnV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQTtJQUFBO0lBMEJBLENBQUM7SUF2QlUsWUFBRyxHQUFWLFVBQVcsT0FBYTtRQUFFLHdCQUF3QjthQUF4QixVQUF3QixFQUF4QixxQkFBd0IsRUFBeEIsSUFBd0I7WUFBeEIsdUNBQXdCOztRQUM5QyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBRU0sY0FBSyxHQUFaLFVBQWEsT0FBYTtRQUFFLHdCQUF3QjthQUF4QixVQUF3QixFQUF4QixxQkFBd0IsRUFBeEIsSUFBd0I7WUFBeEIsdUNBQXdCOztRQUNoRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7U0FDMUM7SUFDTCxDQUFDO0lBRU0sYUFBSSxHQUFYLFVBQVksT0FBYTtRQUFFLHdCQUF3QjthQUF4QixVQUF3QixFQUF4QixxQkFBd0IsRUFBeEIsSUFBd0I7WUFBeEIsdUNBQXdCOztRQUMvQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7U0FDekM7SUFDTCxDQUFDO0lBRU0sY0FBSyxHQUFaO1FBQ0ksSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO1lBQ2hCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUF4Qk0sY0FBSyxHQUFHLElBQUksQ0FBQztJQXlCeEIsZUFBQztDQUFBLEFBMUJELElBMEJDO0FBMUJZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOaXpeW/l+W3peWFt+exu1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFpMb2dVdGlsIHtcclxuICAgIHN0YXRpYyBERUJVRyA9IHRydWU7XHJcblxyXG4gICAgc3RhdGljIGxvZyhtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICBpZiAoWkxvZ1V0aWwuREVCVUcpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSwgb3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZXJyb3IobWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKFpMb2dVdGlsLkRFQlVHKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSwgb3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgd2FybihtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICBpZiAoWkxvZ1V0aWwuREVCVUcpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UsIG9wdGlvbmFsUGFyYW1zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChaTG9nVXRpbC5ERUJVRykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==