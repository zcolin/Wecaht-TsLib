"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var z_http_error_reply_1 = require("./z-http-error-reply");
var z_http_error_1 = require("./z-http-error");
var z_util_1 = require("../z.util");
var z_http_reply_default_1 = require("./z-http-reply-default");
var z_log_util_1 = require("../z-log.util");
var ZHttp = (function () {
    function ZHttp() {
    }
    ZHttp.get = function (url, zOption, result) {
        zOption = zOption || {};
        zOption.type = 'GET';
        zOption.url = url || zOption.url;
        zOption.result = result || zOption.result;
        return ZHttp.request(zOption);
    };
    ZHttp.post = function (url, zOption, result) {
        zOption = zOption || {};
        zOption.type = 'POST';
        zOption.url = url || zOption.url;
        zOption.result = result || zOption.result;
        return ZHttp.request(zOption);
    };
    ZHttp.getMultiRequest = function (requestMulti) {
        if (requestMulti.option && requestMulti.option.length > 0) {
            requestMulti.option.forEach(function (value) { return value.type = 'GET'; });
        }
        return ZHttp.requestMulti(requestMulti);
    };
    ZHttp.postMultiRequest = function (requestMulti) {
        if (requestMulti.option && requestMulti.option.length > 0) {
            requestMulti.option.forEach(function (value) { return value.type = 'POST'; });
        }
        return ZHttp.requestMulti(requestMulti);
    };
    ZHttp.requestMulti = function (multiRequestOption) {
        var _this = this;
        var obArray = [];
        var task = [];
        multiRequestOption = multiRequestOption || {};
        if (!multiRequestOption.isHideLoading) {
            wx.showLoading({
                title: multiRequestOption.loadingMsg || '',
            });
        }
        if (multiRequestOption.option && multiRequestOption.option.length > 0) {
            var _loop_1 = function (request) {
                request.result = request.result || {};
                obArray.push(new Promise(function (resolve, reject) {
                    task.push(_this.request(request, resolve, reject));
                }));
            };
            for (var _i = 0, _a = multiRequestOption.option; _i < _a.length; _i++) {
                var request = _a[_i];
                _loop_1(request);
            }
        }
        return Promise.all(obArray)
            .then(function (resArr) {
            if (!multiRequestOption.isHideLoading) {
                wx.hideLoading({});
            }
            for (var i = 0; i < resArr.length; i++) {
                var item = resArr[i];
                if (multiRequestOption.option[i] && multiRequestOption.option[i].result) {
                    if (multiRequestOption.option[i].result.success) {
                        multiRequestOption.option[i].result.success(item);
                    }
                    if (multiRequestOption.option[i].result.complete) {
                        multiRequestOption.option[i].result.complete();
                    }
                }
            }
            return Promise.resolve(task);
        })
            .catch(function (error) {
            wx.hideLoading({});
            for (var i = 0; i < multiRequestOption.option.length; i++) {
                if (multiRequestOption.option[i] && multiRequestOption.option[i].result) {
                    if (multiRequestOption.option[i].result.error) {
                        multiRequestOption.option[i].result.error(error);
                    }
                    if (multiRequestOption.option[i].result.complete) {
                        multiRequestOption.option[i].result.complete();
                    }
                }
            }
            return Promise.resolve(task);
        });
    };
    ZHttp.request = function (zOption, resolve, reject) {
        z_log_util_1.ZLogUtil.log("请求地址:" + zOption.url);
        z_log_util_1.ZLogUtil.log(zOption.body ? "请求数据:" + JSON.stringify(zOption.body) : "");
        zOption.type = zOption.type || 'POST';
        zOption.header = ZHttp.processHeader(zOption.header);
        zOption.zreply = zOption.zreply || new z_http_reply_default_1.ZHttpReplyDefault();
        if (!zOption.isHideLoading) {
            wx.showLoading({
                title: zOption.loadingMsg || '',
            });
        }
        return wx.request({
            url: zOption.url || '',
            data: zOption.body,
            header: zOption.header,
            method: zOption.type,
            success: function (res) {
                ZHttp.processResponse(zOption, res, resolve, reject);
            },
            fail: function (error) {
                ZHttp.processCatch(zOption, error, reject);
            },
            complete: function () {
                if (!zOption.isHideLoading) {
                    wx.hideLoading({});
                }
                if (zOption.result && zOption.result.complete) {
                    zOption.result.complete();
                }
            }
        });
    };
    ZHttp.processResponse = function (zOption, res, resolve, reject) {
        z_log_util_1.ZLogUtil.log("返回地址:" + zOption.url);
        z_log_util_1.ZLogUtil.log("返回数据:" + JSON.stringify(res));
        var jsonObj = res;
        if (zOption.zreply) {
            if (zOption.result && zOption.result.success && zOption.zreply.isSuccess(jsonObj[zOption.zreply.codeKey])) {
                if (jsonObj[zOption.zreply.dataKey]) {
                    zOption.result.success(jsonObj[zOption.zreply.dataKey]);
                    if (resolve) {
                        resolve(jsonObj[zOption.zreply.dataKey]);
                    }
                }
                else {
                    zOption.result.success(jsonObj);
                    if (resolve) {
                        resolve(jsonObj[zOption.zreply.dataKey]);
                    }
                }
                return;
            }
            if (!zOption.zreply.isSuccess(jsonObj[zOption.zreply.codeKey]) && (jsonObj[zOption.zreply.codeKey] || jsonObj[zOption.zreply.msgKey])) {
                ZHttp.processCatch(zOption, new z_http_error_1.ZHttpError(jsonObj.code, jsonObj.msg), reject);
            }
            else {
                ZHttp.processCatch(zOption, new z_http_error_1.ZHttpError(1001, "数据不符合规范：\n" + JSON.stringify(res)), reject);
            }
        }
    };
    ZHttp.processCatch = function (zOption, error, reject) {
        var errorObj;
        if (error instanceof z_http_error_1.ZHttpError || (z_util_1.ZUtil.isValid(error.code) && z_util_1.ZUtil.isValid(error.errMsg))) {
            errorObj = ZHttp.getErrorReply(error.errMsg, error.code);
        }
        else {
            errorObj = ZHttp.getErrorReply(error.errMsg, -1);
        }
        if (!zOption.isHideToastError) {
            var msg = z_util_1.ZUtil.isValid(errorObj.code) ? errorObj.msg + "(" + errorObj.code + ")" : errorObj.msg;
            wx.showToast({
                title: msg || '',
            });
        }
        if (zOption.result && zOption.result.error) {
            zOption.result.error(errorObj);
            if (reject) {
                reject(errorObj);
            }
        }
    };
    ZHttp.getErrorReply = function (message, code) {
        var errorObj = new z_http_error_reply_1.ZHttpErrorReply();
        errorObj.code = code;
        errorObj.msg = (message == null) ? "null" : message;
        return errorObj;
    };
    ZHttp.processHeader = function (header) {
        if (!header) {
            header = {};
        }
        header['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        return header;
    };
    return ZHttp;
}());
exports.ZHttp = ZHttp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiei5odHRwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiei5odHRwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsMkRBQXFEO0FBR3JELCtDQUEwQztBQUMxQyxvQ0FBZ0M7QUFDaEMsK0RBQXlEO0FBRXpELDRDQUF1QztBQUd2QztJQUFBO0lBeVBBLENBQUM7SUFoUGlCLFNBQUcsR0FBakIsVUFBcUIsR0FBVyxFQUFFLE9BQXVCLEVBQUUsTUFBc0I7UUFDN0UsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDeEIsT0FBTyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDckIsT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNqQyxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQzFDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBU2EsVUFBSSxHQUFsQixVQUFzQixHQUFXLEVBQUUsT0FBdUIsRUFBRSxNQUFzQjtRQUM5RSxPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUN4QixPQUFPLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUN0QixPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDMUMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFPYSxxQkFBZSxHQUE3QixVQUE4QixZQUFxQztRQUMvRCxJQUFJLFlBQVksQ0FBQyxNQUFNLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZELFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFD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b3J0IHtaSHR0cEVycm9yUmVwbHl9IGZyb20gXCIuL3otaHR0cC1lcnJvci1yZXBseVwiO1xuaW1wb3J0IHtaSHR0cFJlc3VsdH0gZnJvbSBcIi4vei1odHRwLXJlc3VsdFwiO1xuaW1wb3J0IHtaSHR0cE9wdGlvbn0gZnJvbSAnLi96LWh0dHAtb3B0aW9uJztcbmltcG9ydCB7Wkh0dHBFcnJvcn0gZnJvbSAnLi96LWh0dHAtZXJyb3InO1xuaW1wb3J0IHtaVXRpbH0gZnJvbSBcIi4uL3oudXRpbFwiO1xuaW1wb3J0IHtaSHR0cFJlcGx5RGVmYXVsdH0gZnJvbSBcIi4vei1odHRwLXJlcGx5LWRlZmF1bHRcIjtcbmltcG9ydCB7Wkh0dHBNdWx0aVJlcXVlc3RPcHRpb259IGZyb20gXCIuL3otaHR0cC1tdWx0aS1yZXF1ZXN0LW9wdGlvblwiO1xuaW1wb3J0IHtaTG9nVXRpbH0gZnJvbSBcIi4uL3otbG9nLnV0aWxcIjtcbmltcG9ydCBSZXF1ZXN0VGFzayA9IHd4LlJlcXVlc3RUYXNrO1xuXG5leHBvcnQgY2xhc3MgWkh0dHAge1xuXG4gICAgLyoqXG4gICAgICogZ2V06K+35rGCKOS8mOWFiOS9v+eUqHVybO+8jHJlc3VsdOWPguaVsO+8jOWmguaenOS4jeiuvue9ru+8jOWImeS9v+eUqHpPcHRpb27kuK3nmoR1cmzvvIxyZXN1bHQsIOWmguaenHpPcHRpb27kuLrnqbrvvIzliJnmlrDlu7p6T3B0aW9uKVxuICAgICAqXG4gICAgICogQHBhcmFtIHVybCAgICAgICAgICAgICAgICAgICDor7fmsYLlnLDlnYBcbiAgICAgKiBAcGFyYW0gek9wdGlvbiAgICAgICAgICAgICAgIOivt+axguWPguaVsCB7QGxpbmsgWkh0dHBFcnJvcn1cbiAgICAgKiBAcGFyYW0gcmVzdWx0ICAgICAgICAgICAgICAgIOWbnuiwg+aOpeWPoyB7QGxpbmsgWkh0dHBSZXN1bHR9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXQ8VD4odXJsOiBzdHJpbmcsIHpPcHRpb246IFpIdHRwT3B0aW9uPFQ+LCByZXN1bHQ6IFpIdHRwUmVzdWx0PFQ+KTogUmVxdWVzdFRhc2sge1xuICAgICAgICB6T3B0aW9uID0gek9wdGlvbiB8fCB7fTtcbiAgICAgICAgek9wdGlvbi50eXBlID0gJ0dFVCc7XG4gICAgICAgIHpPcHRpb24udXJsID0gdXJsIHx8IHpPcHRpb24udXJsO1xuICAgICAgICB6T3B0aW9uLnJlc3VsdCA9IHJlc3VsdCB8fCB6T3B0aW9uLnJlc3VsdDtcbiAgICAgICAgcmV0dXJuIFpIdHRwLnJlcXVlc3Qoek9wdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcG9zdOivt+axgijkvJjlhYjkvb/nlKh1cmzvvIxyZXN1bHTlj4LmlbDvvIzlpoLmnpzkuI3orr7nva7vvIzliJnkvb/nlKh6T3B0aW9u5Lit55qEdXJs77yMcmVzdWx0LCDlpoLmnpx6T3B0aW9u5Li656m677yM5YiZ5paw5bu6ek9wdGlvbilcbiAgICAgKlxuICAgICAqIEBwYXJhbSB1cmwgICAgICAgICAgICAgICAgICAg6K+35rGC5Zyw5Z2AXG4gICAgICogQHBhcmFtIHpPcHRpb24gICAgICAgICAgICAgICDor7fmsYLlj4LmlbAge0BsaW5rIFpIdHRwRXJyb3J9XG4gICAgICogQHBhcmFtIHJlc3VsdCAgICAgICAgICAgICAgICDlm57osIPmjqXlj6Mge0BsaW5rIFpIdHRwUmVzdWx0fVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcG9zdDxUPih1cmw6IHN0cmluZywgek9wdGlvbjogWkh0dHBPcHRpb248VD4sIHJlc3VsdDogWkh0dHBSZXN1bHQ8VD4pOiBSZXF1ZXN0VGFzayB7XG4gICAgICAgIHpPcHRpb24gPSB6T3B0aW9uIHx8IHt9O1xuICAgICAgICB6T3B0aW9uLnR5cGUgPSAnUE9TVCc7XG4gICAgICAgIHpPcHRpb24udXJsID0gdXJsIHx8IHpPcHRpb24udXJsO1xuICAgICAgICB6T3B0aW9uLnJlc3VsdCA9IHJlc3VsdCB8fCB6T3B0aW9uLnJlc3VsdDtcbiAgICAgICAgcmV0dXJuIFpIdHRwLnJlcXVlc3Qoek9wdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5ZCM5pe25Y+R6LW35aSa5LiqR2V06K+35rGC77yMIOaMieiHquWumuS5ieWbnuiwg+aWueazlei/m+ihjOWbnuiwg++8jOWbnuiwg+mhuuW6j+aMieWPkei1t+mhuuW6j+OAguacieS4gOS4quaOpeWPo+Wksei0pe+8jOWImeaJgOacieivt+axguWksei0peOAglxuICAgICAqIEBwYXJhbSB7Wkh0dHBNdWx0aVJlcXVlc3RPcHRpb25bXX0gcmVxdWVzdE11bHRpXG4gICAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRNdWx0aVJlcXVlc3QocmVxdWVzdE11bHRpOiBaSHR0cE11bHRpUmVxdWVzdE9wdGlvbik6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGlmIChyZXF1ZXN0TXVsdGkub3B0aW9uICYmIHJlcXVlc3RNdWx0aS5vcHRpb24ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVxdWVzdE11bHRpLm9wdGlvbi5mb3JFYWNoKCh2YWx1ZTogYW55KSA9PiB2YWx1ZS50eXBlID0gJ0dFVCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBaSHR0cC5yZXF1ZXN0TXVsdGkocmVxdWVzdE11bHRpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlkIzml7blj5HotbflpJrkuKpQb3N06K+35rGC77yMIOW3suaMieiHquWumuS5ieWbnuiwg+aWueazlei/m+ihjOWbnuiwg++8jOWbnuiwg+aVsOaNruacquaVsOe7hO+8jOWbnuiwg+mhuuW6j+aMieWPkei1t+mhuuW6j1xuICAgICAqIEBwYXJhbSB7Wkh0dHBNdWx0aVJlcXVlc3RPcHRpb259IHJlcXVlc3RNdWx0aVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcG9zdE11bHRpUmVxdWVzdChyZXF1ZXN0TXVsdGk6IFpIdHRwTXVsdGlSZXF1ZXN0T3B0aW9uKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgaWYgKHJlcXVlc3RNdWx0aS5vcHRpb24gJiYgcmVxdWVzdE11bHRpLm9wdGlvbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXF1ZXN0TXVsdGkub3B0aW9uLmZvckVhY2goKHZhbHVlOiBhbnkpID0+IHZhbHVlLnR5cGUgPSAnUE9TVCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBaSHR0cC5yZXF1ZXN0TXVsdGkocmVxdWVzdE11bHRpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlkIzml7blj5HotbflpJrkuKrnvZHnu5zor7fmsYLvvIwg5bey5oyJ6Ieq5a6a5LmJ5Zue6LCD5pa55rOV6L+b6KGM5Zue6LCD77yM5Zue6LCD5pWw5o2u5pyq5pWw57uE77yM5Zue6LCD6aG65bqP5oyJ5Y+R6LW36aG65bqPXG4gICAgICogQHBhcmFtIHtaSHR0cE11bHRpUmVxdWVzdE9wdGlvbltdfSBtdWx0aVJlcXVlc3RPcHRpb25cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlcXVlc3RNdWx0aShtdWx0aVJlcXVlc3RPcHRpb246IFpIdHRwTXVsdGlSZXF1ZXN0T3B0aW9uKTogUHJvbWlzZTxSZXF1ZXN0VGFza1tdPiB7XG4gICAgICAgIGxldCBvYkFycmF5OiBQcm9taXNlPGFueT5bXSA9IFtdO1xuICAgICAgICBsZXQgdGFzazogUmVxdWVzdFRhc2tbXSA9IFtdO1xuICAgICAgICBtdWx0aVJlcXVlc3RPcHRpb24gPSBtdWx0aVJlcXVlc3RPcHRpb24gfHwge307XG4gICAgICAgIGlmICghbXVsdGlSZXF1ZXN0T3B0aW9uLmlzSGlkZUxvYWRpbmcpIHtcbiAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogbXVsdGlSZXF1ZXN0T3B0aW9uLmxvYWRpbmdNc2cgfHwgJycsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtdWx0aVJlcXVlc3RPcHRpb24ub3B0aW9uICYmIG11bHRpUmVxdWVzdE9wdGlvbi5vcHRpb24ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yIChsZXQgcmVxdWVzdCBvZiBtdWx0aVJlcXVlc3RPcHRpb24ub3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdC5yZXN1bHQgPSByZXF1ZXN0LnJlc3VsdCB8fCB7fTtcbiAgICAgICAgICAgICAgICBvYkFycmF5LnB1c2goXG4gICAgICAgICAgICAgICAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhc2sucHVzaCh0aGlzLnJlcXVlc3QocmVxdWVzdCwgcmVzb2x2ZSwgcmVqZWN0KSk7XG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChvYkFycmF5KVxuICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNBcnI6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW11bHRpUmVxdWVzdE9wdGlvbi5pc0hpZGVMb2FkaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZyh7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc0Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSByZXNBcnJbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobXVsdGlSZXF1ZXN0T3B0aW9uLm9wdGlvbltpXSAmJiBtdWx0aVJlcXVlc3RPcHRpb24ub3B0aW9uW2ldLnJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtdWx0aVJlcXVlc3RPcHRpb24ub3B0aW9uW2ldLnJlc3VsdCEuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aVJlcXVlc3RPcHRpb24ub3B0aW9uW2ldLnJlc3VsdCEuc3VjY2VzcyEoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG11bHRpUmVxdWVzdE9wdGlvbi5vcHRpb25baV0ucmVzdWx0IS5jb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aVJlcXVlc3RPcHRpb24ub3B0aW9uW2ldLnJlc3VsdCEuY29tcGxldGUhKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGFzayk7XG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXVsdGlSZXF1ZXN0T3B0aW9uLm9wdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtdWx0aVJlcXVlc3RPcHRpb24ub3B0aW9uW2ldICYmIG11bHRpUmVxdWVzdE9wdGlvbi5vcHRpb25baV0ucmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtdWx0aVJlcXVlc3RPcHRpb24ub3B0aW9uW2ldLnJlc3VsdCEuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpUmVxdWVzdE9wdGlvbi5vcHRpb25baV0ucmVzdWx0IS5lcnJvciEoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG11bHRpUmVxdWVzdE9wdGlvbi5vcHRpb25baV0ucmVzdWx0IS5jb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlSZXF1ZXN0T3B0aW9uLm9wdGlvbltpXS5yZXN1bHQhLmNvbXBsZXRlISgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0YXNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICrnvZHnu5zor7fmsYLvvIwg5bey5oyJ6Ieq5a6a5LmJ5Zue6LCD5pa55rOV6L+b6KGM5Zue6LCDXG4gICAgICogQHBhcmFtIHtaSHR0cE9wdGlvbn0gek9wdGlvblxuICAgICAqIEBwYXJhbSByZXNvbHZlXG4gICAgICogQHBhcmFtIHJlamVjdFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFQ+fVxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIHJlcXVlc3Q8VD4oek9wdGlvbjogWkh0dHBPcHRpb248VD4sIHJlc29sdmU/OiBhbnksIHJlamVjdD86IGFueSk6IFJlcXVlc3RUYXNrIHtcbiAgICAgICAgWkxvZ1V0aWwubG9nKFwi6K+35rGC5Zyw5Z2AOlwiICsgek9wdGlvbi51cmwpO1xuICAgICAgICBaTG9nVXRpbC5sb2coek9wdGlvbi5ib2R5ID8gXCLor7fmsYLmlbDmja46XCIgKyBKU09OLnN0cmluZ2lmeSh6T3B0aW9uLmJvZHkpIDogXCJcIik7XG5cbiAgICAgICAgek9wdGlvbi50eXBlID0gek9wdGlvbi50eXBlIHx8ICdQT1NUJztcbiAgICAgICAgek9wdGlvbi5oZWFkZXIgPSBaSHR0cC5wcm9jZXNzSGVhZGVyKHpPcHRpb24uaGVhZGVyKTsgLy/mt7vliqDpgJrnlKhoZWFkZXJcbiAgICAgICAgek9wdGlvbi56cmVwbHkgPSB6T3B0aW9uLnpyZXBseSB8fCBuZXcgWkh0dHBSZXBseURlZmF1bHQoKTtcblxuICAgICAgICBpZiAoIXpPcHRpb24uaXNIaWRlTG9hZGluZykge1xuICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiB6T3B0aW9uLmxvYWRpbmdNc2cgfHwgJycsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd3gucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6IHpPcHRpb24udXJsIHx8ICcnLFxuICAgICAgICAgICAgZGF0YTogek9wdGlvbi5ib2R5LFxuICAgICAgICAgICAgaGVhZGVyOiB6T3B0aW9uLmhlYWRlcixcbiAgICAgICAgICAgIG1ldGhvZDogek9wdGlvbi50eXBlLFxuICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICBaSHR0cC5wcm9jZXNzUmVzcG9uc2Uoek9wdGlvbiwgcmVzLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6IGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBaSHR0cC5wcm9jZXNzQ2F0Y2goek9wdGlvbiwgZXJyb3IsIHJlamVjdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXpPcHRpb24uaXNIaWRlTG9hZGluZykge1xuICAgICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZyh7fSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHpPcHRpb24ucmVzdWx0ICYmIHpPcHRpb24ucmVzdWx0LmNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHpPcHRpb24ucmVzdWx0LmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlpITnkIbov5Tlm57kv6Hmga9cbiAgICAgKiBAcGFyYW0gek9wdGlvblxuICAgICAqIEBwYXJhbSByZXMgICAgICBodHRw5ZON5bqU5a+56LGhXG4gICAgICogQHBhcmFtIHJlc29sdmVcbiAgICAgKiBAcGFyYW0gcmVqZWN0XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBwcm9jZXNzUmVzcG9uc2U8VD4oek9wdGlvbjogWkh0dHBPcHRpb248VD4sIHJlcz86IGFueSwgcmVzb2x2ZT86IGFueSwgcmVqZWN0PzogYW55KSB7XG4gICAgICAgIFpMb2dVdGlsLmxvZyhcIui/lOWbnuWcsOWdgDpcIiArIHpPcHRpb24udXJsKTtcbiAgICAgICAgWkxvZ1V0aWwubG9nKFwi6L+U5Zue5pWw5o2uOlwiICsgSlNPTi5zdHJpbmdpZnkocmVzKSk7XG5cbiAgICAgICAgbGV0IGpzb25PYmogPSByZXM7XG4gICAgICAgIGlmICh6T3B0aW9uLnpyZXBseSkge1xuICAgICAgICAgICAgaWYgKHpPcHRpb24ucmVzdWx0ICYmIHpPcHRpb24ucmVzdWx0LnN1Y2Nlc3MgJiYgek9wdGlvbi56cmVwbHkuaXNTdWNjZXNzKGpzb25PYmpbek9wdGlvbi56cmVwbHkuY29kZUtleV0pKSB7XG4gICAgICAgICAgICAgICAgaWYgKGpzb25PYmpbek9wdGlvbi56cmVwbHkuZGF0YUtleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgek9wdGlvbi5yZXN1bHQuc3VjY2Vzcyhqc29uT2JqW3pPcHRpb24uenJlcGx5LmRhdGFLZXldKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoanNvbk9ialt6T3B0aW9uLnpyZXBseS5kYXRhS2V5XSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB6T3B0aW9uLnJlc3VsdC5zdWNjZXNzKGpzb25PYmopO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShqc29uT2JqW3pPcHRpb24uenJlcGx5LmRhdGFLZXldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghek9wdGlvbi56cmVwbHkuaXNTdWNjZXNzKGpzb25PYmpbek9wdGlvbi56cmVwbHkuY29kZUtleV0pICYmIChqc29uT2JqW3pPcHRpb24uenJlcGx5LmNvZGVLZXldIHx8IGpzb25PYmpbek9wdGlvbi56cmVwbHkubXNnS2V5XSkpIHsgLy/mmK9qc29u5a+56LGh77yM5L2G5piv5LiN5piv57qm5a6a5Lit55qE5pWw5o2uXG4gICAgICAgICAgICAgICAgWkh0dHAucHJvY2Vzc0NhdGNoKHpPcHRpb24sIG5ldyBaSHR0cEVycm9yKGpzb25PYmouY29kZSwganNvbk9iai5tc2cpLCByZWplY3QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBaSHR0cC5wcm9jZXNzQ2F0Y2goek9wdGlvbiwgbmV3IFpIdHRwRXJyb3IoMTAwMSwgXCLmlbDmja7kuI3nrKblkIjop4TojIPvvJpcXG5cIiArIEpTT04uc3RyaW5naWZ5KHJlcykpLCByZWplY3QpOyAvL+ino+aekOeahGpzb27mlbDmja7kuI3nrKblkIjop4TojINcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWkhOeQhuW8guW4uOS/oeaBr1xuICAgICAqIEBwYXJhbSB6T3B0aW9uXG4gICAgICogQHBhcmFtIGVycm9yICAgICAgICAgICAgICAgICDplJnor6/lr7nosaFcbiAgICAgKiBAcGFyYW0gcmVqZWN0XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBwcm9jZXNzQ2F0Y2g8VD4oek9wdGlvbjogWkh0dHBPcHRpb248VD4sIGVycm9yOiBhbnksIHJlamVjdD86IGFueSkge1xuICAgICAgICBsZXQgZXJyb3JPYmo7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFpIdHRwRXJyb3IgfHwgKFpVdGlsLmlzVmFsaWQoZXJyb3IuY29kZSkgJiYgWlV0aWwuaXNWYWxpZChlcnJvci5lcnJNc2cpKSkgeyAvL+iHquW3seWumuS5ieeahOmUmeivryBpbnRhbmNlb2bliKTmlq3kuI3lh7rmnaXvvJ9cbiAgICAgICAgICAgIGVycm9yT2JqID0gWkh0dHAuZ2V0RXJyb3JSZXBseShlcnJvci5lcnJNc2csIGVycm9yLmNvZGUpOyAvL+acjeWKoeWZqOi/lOWbnueahOmUmeivr1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXJyb3JPYmogPSBaSHR0cC5nZXRFcnJvclJlcGx5KGVycm9yLmVyck1zZywgLTEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF6T3B0aW9uLmlzSGlkZVRvYXN0RXJyb3IpIHtcbiAgICAgICAgICAgIGxldCBtc2cgPSBaVXRpbC5pc1ZhbGlkKGVycm9yT2JqLmNvZGUpID8gZXJyb3JPYmoubXNnICsgXCIoXCIgKyBlcnJvck9iai5jb2RlICsgXCIpXCIgOiBlcnJvck9iai5tc2c7XG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBtc2cgfHwgJycsXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHpPcHRpb24ucmVzdWx0ICYmIHpPcHRpb24ucmVzdWx0LmVycm9yKSB7XG4gICAgICAgICAgICB6T3B0aW9uLnJlc3VsdC5lcnJvcihlcnJvck9iaik7XG4gICAgICAgICAgICBpZiAocmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yT2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPlue7hOWQiEVycm9yUmVwbHnlr7nosaFcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBnZXRFcnJvclJlcGx5KG1lc3NhZ2U6IHN0cmluZywgY29kZT86IG51bWJlcik6IFpIdHRwRXJyb3JSZXBseSB7XG4gICAgICAgIGxldCBlcnJvck9iaiA9IG5ldyBaSHR0cEVycm9yUmVwbHkoKTtcbiAgICAgICAgZXJyb3JPYmouY29kZSA9IGNvZGU7IC8v6Ieq5a6a5LmJ6ZSZ6K+v5qCH6K+GXG4gICAgICAgIGVycm9yT2JqLm1zZyA9IChtZXNzYWdlID09IG51bGwpID8gXCJudWxsXCIgOiBtZXNzYWdlO1xuICAgICAgICByZXR1cm4gZXJyb3JPYmo7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W6buY6K6k55qESGVhZGVy5L+h5oGvXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgcHJvY2Vzc0hlYWRlcihoZWFkZXI6IGFueSkge1xuICAgICAgICBpZiAoIWhlYWRlcikge1xuICAgICAgICAgICAgaGVhZGVyID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBoZWFkZXJbJ0NvbnRlbnQtVHlwZSddID0gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOCc7XG4gICAgICAgIC8vaGVhZGVyWydYLVRILVRPS0VOJ109IFVzZXJTZXJ2aWNlLmdldFRva2VuKClcbiAgICAgICAgcmV0dXJuIGhlYWRlcjtcbiAgICB9XG59Il19