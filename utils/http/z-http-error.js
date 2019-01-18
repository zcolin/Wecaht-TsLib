"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ZHttpError = (function (_super) {
    __extends(ZHttpError, _super);
    function ZHttpError(code, message) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        _this.message = message;
        return _this;
    }
    return ZHttpError;
}(Error));
exports.ZHttpError = ZHttpError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiei1odHRwLWVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiei1odHRwLWVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQVlBO0lBQWdDLDhCQUFLO0lBQ2pDLG9CQUFtQixJQUFZLEVBQVMsT0FBZTtRQUF2RCxZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQUNqQjtRQUZrQixVQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsYUFBTyxHQUFQLE9BQU8sQ0FBUTs7SUFFdkQsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FBQyxBQUpELENBQWdDLEtBQUssR0FJcEM7QUFKWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqICAgYXV0aG9yICAgY29saW5cbiAqICAgY29tcGFueSAgdGVsY2hpbmFcbiAqICAgZW1haWwgICAgd2FuZ2xpbjIwNDZAMTI2LmNvbVxuICogICBkYXRlICAgICAxOC03LTMxIOS4i+WNiDEyOjUzXG4gKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICovXG5cbi8qKlxuICogSHR0cCDor7fmsYLlj4LmlbDnsbtcbiAqL1xuZXhwb3J0IGNsYXNzIFpIdHRwRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGNvZGU6IG51bWJlciwgcHVibGljIG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB9XG59Il19