"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ZStringUtil = (function () {
    function ZStringUtil() {
    }
    ZStringUtil.isEmpty = function (value) {
        return value == null || (typeof value === "string" && value.length === 0);
    };
    ZStringUtil.isNotEmpty = function (value) {
        return !this.isEmpty(value);
    };
    return ZStringUtil;
}());
exports.ZStringUtil = ZStringUtil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiei1zdHJpbmcudXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInotc3RyaW5nLnV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQTtJQUFBO0lBaUJBLENBQUM7SUFYVSxtQkFBTyxHQUFkLFVBQWUsS0FBVTtRQUNyQixPQUFPLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBTU0sc0JBQVUsR0FBakIsVUFBa0IsS0FBVTtRQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBakJELElBaUJDO0FBakJZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOWtl+espuS4suebuOWFs+W3peWFt+exu1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFpTdHJpbmdVdGlsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWtl+espuS4suaYr+WQpuS4uuepulxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpc0VtcHR5KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCB8fCAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLmxlbmd0aCA9PT0gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlrZfnrKbkuLLpnZ7nqbpcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNOb3RFbXB0eSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzRW1wdHkodmFsdWUpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==