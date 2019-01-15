/**
 * http 服务类
 */
import { Promise } from '../../plugins/es6-promise.js';
import { ZHttpErrorReply } from "z-http-error-reply";
import { ZHttpResult } from "z-http-result";
import { ZHttpOption } from 'z-http-option';
import { ZHttpError } from 'z-http-error';
import { ZUtil } from "../../utils/z.util";
import { ZHttpReplyDefault } from "z-http-reply-default";
import { ZHttpReply } from "z-http-reply";
import { ZHttpMultiRequestOption } from "z-http-multi-request-option";
import { ZLogUtil } from "../../utils/z-log.util";

export class ZHttpService {

    /**
     * get请求(优先使用url，result参数，如果不设置，则使用zOption中的url，result, 如果zOption为空，则新建zOption)
     *
     * @param url                   请求地址
     * @param zOption               请求参数 {@link ZHttpError}
     * @param result                回调接口 {@link ZHttpResult}
     */
    public get<T>(url: string, zOption: ZHttpOption<T>, result: ZHttpResult<T>) {
        zOption = zOption || {};
        zOption.type = 'get';
        zOption.url = url || zOption.url;
        zOption.result = result || zOption.result;
        return this.request(zOption);
    }

    /**
     * post请求(优先使用url，result参数，如果不设置，则使用zOption中的url，result, 如果zOption为空，则新建zOption)
     *
     * @param url                   请求地址
     * @param zOption               请求参数 {@link ZHttpError}
     * @param result                回调接口 {@link ZHttpResult}
     */
    public post<T>(url: string, zOption: ZHttpOption<T>, result: ZHttpResult<T>) {
        zOption = zOption || {};
        zOption.type = 'post';
        zOption.url = url || zOption.url;
        zOption.result = result || zOption.result;
        return this.request(zOption);
    }

    /**
   * 同时发起多个Get请求， 按自定义回调方法进行回调，回调顺序按发起顺序。有一个接口失败，则所有请求失败。
   * @param {ZHttpMultiRequestOption[]} requestMulti
   * @returns {Subscription}
   */
    public getMultiRequest(requestMulti: ZHttpMultiRequestOption) {
        if (requestMulti.option && requestMulti.option.length > 0) {
            requestMulti.option.forEach((value: any) => value.type = 'get');
        }
        return this.requestMulti(requestMulti);
    }

    /**
   * 同时发起多个Post请求， 已按自定义回调方法进行回调，回调数据未数组，回调顺序按发起顺序
   * @param {ZHttpMultiRequestOption} requestMulti
   * @returns {Subscription}
   */
    public postMultiRequest(requestMulti: ZHttpMultiRequestOption) {
        if (requestMulti.option && requestMulti.option.length > 0) {
            requestMulti.option.forEach((value: any) => value.type = 'post');
        }
        return this.requestMulti(requestMulti);
    }

    /**
     * 同时发起多个网络请求， 已按自定义回调方法进行回调，回调数据未数组，回调顺序按发起顺序
     * @param {ZHttpMultiRequestOption[]} multiRequestOption
     * @returns {Subscription}
     */
    public requestMulti(multiRequestOption: ZHttpMultiRequestOption) {
        let obArray = [];
        if (!multiRequestOption.isHideLoading) {
            wx.showLoading({
                title: multiRequestOption.loadingMsg,
            });
        };
        if (multiRequestOption.option && multiRequestOption.option.length > 0) {
            for (let request of multiRequestOption.option) {
                request.result = request.result || {};
                obArray.push(this.requestObservable(request));
            }
        }

        //计数回调，回调对应请求的对应回调，如果回调全部完成，则隐藏进度条
        return Promise.all(obArray)
            .then((obj: any) => {
                wx.hideLoading();
                for (let i = 0; i < obj.length; i++) {
                    let item = obj[i];
                    if (multiRequestOption.option[i].result.success) {
                        multiRequestOption.option[i].result.success(item);
                    }
                    if (multiRequestOption.option[i].result.complete) {
                        multiRequestOption.option[i].result.complete();
                    }
                }
            }).catch(
                (error: any) => {
                    wx.hideLoading();
                    for (let i = 0; i < multiRequestOption.option.length; i++) {
                        if (multiRequestOption.option[i].result.error) {
                            multiRequestOption.option[i].result.error(error);
                        }
                        if (multiRequestOption.option[i].result.complete) {
                            multiRequestOption.option[i].result.complete();
                        }
                    }
                }
            );
    }

    /**
     * 网络请求， 已按自定义回调方法进行回调
     * @param {ZHttpOption} zOption
     * @returns {Subscription}
     */
    public request<T>(zOption: ZHttpOption<T>) {
        zOption.result = zOption.result || {};
        if (!zOption.isHideLoading) {
            wx.showLoading({
                title: zOption.loadingMsg,
            });
        }
        return this.requestObservable(zOption)
            .then(this.successResult(zOption.result))
            .catch(this.errorResult(zOption.result));
    }

    /**
     * 网络请求，处理完所有业务数据，未按自定义回调方法回调，返回Observable，可以进行进一步处理
     * @param {ZHttpOption} zOption
     * @returns {Observable<T>}
     */
    public requestObservable<T>(zOption: ZHttpOption<T>) {
        zOption.type = zOption.type || 'post';
        zOption.header = this.processHeader(zOption.header); //添加通用header
        zOption.zreply = zOption.zreply || new ZHttpReplyDefault();
        ZLogUtil.log("\n===================================================================");
        ZLogUtil.log("ADDR:" + zOption.url);
        ZLogUtil.log(zOption.body ? "APPLY:" + JSON.stringify(zOption.body) : "");
        return new Promise((resolve: any, reject: any) => {
            wx.request({
                url: zOption.url,
                data: zOption.body,
                header: zOption.header,
                method: zOption.type,
                success: res => {
                    this.processResponse(zOption.zreply, res, zOption.isHideLoading, resolve, reject);
                },
                fail: error => {
                    this.processCatch(zOption.isHideToastError, error);
                }
            });
        });
    }

    /**
     * 获取默认的Header信息
     */
    public processHeader(header: any) {
        return {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            // 'X-TH-TOKEN': UserService.getToken()
        }
    }

    /**
     * 处理返回信息
     * @param zreply   自定义结果对象
     * @param res      http响应对象
     */
    public processResponse(zreply: ZHttpReply, res: any, isHideLoading: boolean, resolve: any, reject: any) {
        let jsonObj = res; //此处jsonObj一定有值，如果转换错误，会再processCatch中处理
        ZLogUtil.log("===================================================================");
        ZLogUtil.log("REPLY:" + JSON.stringify(jsonObj));

        if (zreply.isSuccess(jsonObj[zreply.codeKey])) {
            if (jsonObj[zreply.dataKey]) {
                resolve(jsonObj[zreply.dataKey]);
            } else {
                resolve(jsonObj);
            }
            return;
        }

        if (!zreply.isSuccess(jsonObj[zreply.codeKey]) && (jsonObj[zreply.codeKey] || jsonObj[zreply.msgKey])) { //是json对象，但是不是约定中的数据
            reject(this.processCatch(isHideLoading, new ZHttpError(jsonObj.code, jsonObj.msg)));
        } else {
            reject(this.processCatch(isHideLoading, new ZHttpError(1001, "数据不符合规范：\n" + JSON.stringify(res)))) //解析的json数据不符合规范
        }
    }

    /**
     * 处理异常信息
     * @param isHideToastError      是否显示errorToast
     * @param error                 错误对象
     */
    public processCatch(isHideToastError: boolean, error: any) {
        let errorObj;
        if (error instanceof ZHttpError || (ZUtil.isValid(error.code) && ZUtil.isValid(error.errMsg))) { //自己定义的错误 intanceof判断不出来？

            errorObj = this.getErrorReply(error.errMsg, error.code); //服务器返回的错误
        } else {
            errorObj = this.getErrorReply(error.errMsg, -1);
        }

        if (!isHideToastError) {
            let msg = ZUtil.isValid(errorObj.code) ? errorObj.msg + "(" + errorObj.code + ")" : errorObj.msg;
            wx.showToast({
                title: msg,
            })
        }
        return errorObj;
    }

    /**
     * 获取组合ErrorReply对象
     */
    private getErrorReply(message: string, code?: number): ZHttpErrorReply {
        let errorObj = new ZHttpErrorReply();
        errorObj.code = code; //自定义错误标识
        errorObj.msg = (message == null) ? "null" : message;
        return errorObj;
    }

    /**
     * 处理成功回调
     * @param {HttpResult<T>} result
     * @returns {(obj) => void}
     */
    private successResult<T>(result: ZHttpResult<T>) {
        return (obj: any) => {
            wx.hideLoading();
            if (result.success) {
                result.success(obj);
            }

            if (result.complete) {
                result.complete();
            }
        };
    }

    /**
     * 处理错误回调
     * @param {HttpResult<T>} result
     * @returns {(error) => void}
     */
    private errorResult<T>(result: ZHttpResult<T>) {
        return (error: any) => {
            wx.hideLoading();
            if (result.error) {
                result.error(error);
            }

            if (result.complete) {
                result.complete();
            }
        };
    }
}