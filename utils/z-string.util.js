"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ZStringUtil = (function () {
    function ZStringUtil() {
    }
    ZStringUtil.isEmpty = function (value) {
        return value == null || (typeof value === 'string' && value.length === 0);
    };
    ZStringUtil.isNotEmpty = function (value) {
        return !this.isEmpty(value);
    };
    return ZStringUtil;
}());
exports.ZStringUtil = ZStringUtil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiei1zdHJpbmcudXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInotc3RyaW5nLnV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQTtJQUFBO0lBaUJBLENBQUM7SUFYVSxtQkFBTyxHQUFkLFVBQWUsS0FBVTtRQUNyQixPQUFPLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBTU0sc0JBQVUsR0FBakIsVUFBa0IsS0FBVTtRQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBakJELElBaUJDO0FBakJZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOWtl+espuS4suebuOWFs+W3peWFt+exu1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFpTdHJpbmdVdGlsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWtl+espuS4suaYr+WQpuS4uuepulxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpc0VtcHR5KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCB8fCAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5sZW5ndGggPT09IDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a2X56ym5Liy6Z2e56m6XHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzTm90RW1wdHkodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5pc0VtcHR5KHZhbHVlKTtcclxuICAgIH1cclxufVxyXG4iXX0=