"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RegexUtil = (function () {
    function RegexUtil() {
    }
    RegexUtil.isUrl = function (value) {
        var regStr = '^((https|http|ftp|rtsp|mms)?://)'
            + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?'
            + '(([0-9]{1,3}\.){3}[0-9]{1,3}'
            + '|'
            + '([0-9a-z_!~*\'()-]+\.)*'
            + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.\''
            + '[a-z]{2,6})'
            + '(:[0-9]{1,4})?'
            + '((/?)|'
            + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';
        var v = new RegExp(regStr);
        return v.test(value);
    };
    RegexUtil.isPhone = function (value) {
        return this.isMobile(value) || this.isPlane(value);
    };
    RegexUtil.isMobile = function (value) {
        return /^((\+?86)|(\(\+86\)))?(1[0-9]{10})$/.test(value);
    };
    RegexUtil.isPlane = function (value) {
        return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(value);
    };
    return RegexUtil;
}());
exports.RegexUtil = RegexUtil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnZXgudXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlZ2V4LnV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQTtJQUFBO0lBNENBLENBQUM7SUF0Q1UsZUFBSyxHQUFaLFVBQWEsS0FBYTtRQUN0QixJQUFNLE1BQU0sR0FBRyxrQ0FBa0M7Y0FDM0MsNERBQTREO2NBQzVELDhCQUE4QjtjQUM5QixHQUFHO2NBQ0gseUJBQXlCO2NBQ3pCLHdDQUF3QztjQUN4QyxhQUFhO2NBQ2IsZ0JBQWdCO2NBQ2hCLFFBQVE7Y0FDUix3Q0FBd0MsQ0FBQztRQUMvQyxJQUFNLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQU1NLGlCQUFPLEdBQWQsVUFBZSxLQUFhO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFNTSxrQkFBUSxHQUFmLFVBQWdCLEtBQWE7UUFDekIsT0FBTyxxQ0FBcUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQU1NLGlCQUFPLEdBQWQsVUFBZSxLQUFhO1FBQ3hCLE9BQU8sNEJBQTRCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFDTCxnQkFBQztBQUFELENBQUMsQUE1Q0QsSUE0Q0M7QUE1Q1ksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog5q2j5YiZ5Yy56YWN5bel5YW357G7XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUmVnZXhVdGlsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVybOaYr+WQpuWQiOazlVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpc1VybCh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgcmVnU3RyID0gJ14oKGh0dHBzfGh0dHB8ZnRwfHJ0c3B8bW1zKT86Ly8pJ1xyXG4gICAgICAgICAgICArICc/KChbMC05YS16XyF+KlxcJygpLiY9KyQlLV0rOiApP1swLTlhLXpfIX4qXFwnKCkuJj0rJCUtXStAKT8nIC8vIGZ0cOeahHVzZXJAXHJcbiAgICAgICAgICAgICsgJygoWzAtOV17MSwzfVxcLil7M31bMC05XXsxLDN9JyAvLyBJUOW9ouW8j+eahFVSTC0gMTk5LjE5NC41Mi4xODRcclxuICAgICAgICAgICAgKyAnfCcgLy8g5YWB6K64SVDlkoxET01BSU7vvIjln5/lkI3vvIlcclxuICAgICAgICAgICAgKyAnKFswLTlhLXpfIX4qXFwnKCktXStcXC4pKicgLy8g5Z+f5ZCNLSB3d3cuXHJcbiAgICAgICAgICAgICsgJyhbMC05YS16XVswLTlhLXotXXswLDYxfSk/WzAtOWEtel1cXC5cXCcnIC8vIOS6jOe6p+Wfn+WQjVxyXG4gICAgICAgICAgICArICdbYS16XXsyLDZ9KScgLy8gZmlyc3QgbGV2ZWwgZG9tYWluLSAuY29tIG9yIC5tdXNldW1cclxuICAgICAgICAgICAgKyAnKDpbMC05XXsxLDR9KT8nIC8vIOerr+WPoy0gOjgwXHJcbiAgICAgICAgICAgICsgJygoLz8pfCcgLy8gYSBzbGFzaCBpc24ndCByZXF1aXJlZCBpZiB0aGVyZSBpcyBubyBmaWxlIG5hbWVcclxuICAgICAgICAgICAgKyAnKC9bMC05YS16XyF+KlxcJygpLjs/OkAmPSskLCUjLV0rKSsvPykkJztcclxuICAgICAgICBjb25zdCB2ID0gbmV3IFJlZ0V4cChyZWdTdHIpO1xyXG4gICAgICAgIHJldHVybiB2LnRlc3QodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55S16K+d5piv5ZCm5ZCI5rOVXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzUGhvbmUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzTW9iaWxlKHZhbHVlKSB8fCB0aGlzLmlzUGxhbmUodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omL5py65piv5ZCm5ZCI5rOVXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzTW9iaWxlKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gL14oKFxcKz84Nil8KFxcKFxcKzg2XFwpKSk/KDFbMC05XXsxMH0pJC8udGVzdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDluqfmnLrmmK/lkKblkIjms5VcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNQbGFuZSh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIC9eKFswLTldezMsNH0tKT9bMC05XXs3LDh9JC8udGVzdCh2YWx1ZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==