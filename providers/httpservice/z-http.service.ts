/**
 * http 服务类
 */
import {ZHttpErrorReply} from "./z-http-error-reply";
import {ZHttpResult} from "./z-http-result";
import {ZHttpOption} from './z-http-option';
import {ZHttpError} from './z-http-error';
import {ZUtil} from "../../utils/z.util";
import {ZHttpReplyDefault} from "./z-http-reply-default";
import {ZHttpMultiRequestOption} from "./z-http-multi-request-option";
import {ZLogUtil} from "../../utils/z-log.util";
import RequestTask = wx.RequestTask;

export class ZHttpService {

    /**
     * get请求(优先使用url，result参数，如果不设置，则使用zOption中的url，result, 如果zOption为空，则新建zOption)
     *
     * @param url                   请求地址
     * @param zOption               请求参数 {@link ZHttpError}
     * @param result                回调接口 {@link ZHttpResult}
     */
    public get<T>(url: string, zOption: ZHttpOption<T>, result: ZHttpResult<T>): RequestTask {
        zOption = zOption || {};
        zOption.type = 'GET';
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
    public post<T>(url: string, zOption: ZHttpOption<T>, result: ZHttpResult<T>): RequestTask {
        zOption = zOption || {};
        zOption.type = 'POST';
        zOption.url = url || zOption.url;
        zOption.result = result || zOption.result;
        return this.request(zOption);
    }

    /**
     * 同时发起多个Get请求， 按自定义回调方法进行回调，回调顺序按发起顺序。有一个接口失败，则所有请求失败。
     * @param {ZHttpMultiRequestOption[]} requestMulti
     * @returns {Promise}
     */
    public getMultiRequest(requestMulti: ZHttpMultiRequestOption): Promise<any> {
        if (requestMulti.option && requestMulti.option.length > 0) {
            requestMulti.option.forEach((value: any) => value.type = 'GET');
        }
        return this.requestMulti(requestMulti);
    }

    /**
     * 同时发起多个Post请求， 已按自定义回调方法进行回调，回调数据未数组，回调顺序按发起顺序
     * @param {ZHttpMultiRequestOption} requestMulti
     * @returns {Promise}
     */
    public postMultiRequest(requestMulti: ZHttpMultiRequestOption): Promise<any> {
        if (requestMulti.option && requestMulti.option.length > 0) {
            requestMulti.option.forEach((value: any) => value.type = 'POST');
        }
        return this.requestMulti(requestMulti);
    }

    /**
     * 同时发起多个网络请求， 已按自定义回调方法进行回调，回调数据未数组，回调顺序按发起顺序
     * @param {ZHttpMultiRequestOption[]} multiRequestOption
     * @returns {Promise}
     */
    public requestMulti(multiRequestOption: ZHttpMultiRequestOption): Promise<RequestTask[]> {
        let obArray: Promise<any>[] = [];
        let task: RequestTask[] = [];
        multiRequestOption = multiRequestOption || {};
        if (!multiRequestOption.isHideLoading) {
            wx.showLoading({
                title: multiRequestOption.loadingMsg || '',
            });
        }

        if (multiRequestOption.option && multiRequestOption.option.length > 0) {
            for (let request of multiRequestOption.option) {
                request.result = request.result || {};
                obArray.push(
                    new Promise((resolve, reject) => {
                        task.push(this.request(request, resolve, reject));
                    }));
            }
        }

        return Promise.all(obArray)
                      .then((resArr: any) => {
                          if (!multiRequestOption.isHideLoading) {
                              wx.hideLoading({});
                          }

                          for (let i = 0; i < resArr.length; i++) {
                              let item = resArr[i];
                              if (multiRequestOption.option[i] && multiRequestOption.option[i].result) {
                                  // @ts-ignore
                                  if (multiRequestOption.option[i].result.success) {
                                      // @ts-ignore
                                      multiRequestOption.option[i].result.success(item);
                                  }

                                  // @ts-ignore
                                  if (multiRequestOption.option[i].result.complete) {
                                      // @ts-ignore
                                      multiRequestOption.option[i].result.complete();
                                  }
                              }
                          }
                          return Promise.resolve(task);
                      })
                      .catch((error: any) => {
                              wx.hideLoading({});
                              for (let i = 0; i < multiRequestOption.option.length; i++) {
                                  if (multiRequestOption.option[i] && multiRequestOption.option[i].result) {
                                      // @ts-ignore
                                      if (multiRequestOption.option[i].result.error) {
                                          // @ts-ignore
                                          multiRequestOption.option[i].result.error(error);
                                      }

                                      // @ts-ignore
                                      if (multiRequestOption.option[i].result.complete) {
                                          // @ts-ignore
                                          multiRequestOption.option[i].result.complete();
                                      }
                                  }
                              }
                              return Promise.resolve(task);
                          }
                      );
    }

    /**
     *网络请求， 已按自定义回调方法进行回调
     * @param {ZHttpOption} zOption
     * @param resolve
     * @param reject
     * @returns {Promise<T>}
     */
    private request<T>(zOption: ZHttpOption<T>, resolve?: any, reject?: any): RequestTask {
        ZLogUtil.log("请求地址:" + zOption.url);
        ZLogUtil.log(zOption.body ? "请求数据:" + JSON.stringify(zOption.body) : "");

        zOption.type = zOption.type || 'POST';
        zOption.header = ZHttpService.processHeader(zOption.header); //添加通用header
        zOption.zreply = zOption.zreply || new ZHttpReplyDefault();

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
            success: res => {
                this.processResponse(zOption, res, resolve, reject);
            },
            fail: error => {
                this.processCatch(zOption, error, reject);
            },
            complete: () => {
                if (!zOption.isHideLoading) {
                    wx.hideLoading({});
                }

                if (zOption.result && zOption.result.complete) {
                    zOption.result.complete();
                }
            }
        });
    }

    /**
     * 处理返回信息
     * @param zOption
     * @param res      http响应对象
     * @param resolve
     * @param reject
     */
    public processResponse<T>(zOption: ZHttpOption<T>, res?: any, resolve?: any, reject?: any) {
        ZLogUtil.log("返回地址:" + zOption.url);
        ZLogUtil.log("返回数据:" + JSON.stringify(res));

        let jsonObj = res;
        if (zOption.zreply) {
            if (zOption.result && zOption.result.success && zOption.zreply.isSuccess(jsonObj[zOption.zreply.codeKey])) {
                if (jsonObj[zOption.zreply.dataKey]) {
                    zOption.result.success(jsonObj[zOption.zreply.dataKey]);
                    if (resolve) {
                        resolve(jsonObj[zOption.zreply.dataKey]);
                    }
                } else {
                    zOption.result.success(jsonObj);
                    if (resolve) {
                        resolve(jsonObj[zOption.zreply.dataKey]);
                    }
                }
                return;
            }

            if (!zOption.zreply.isSuccess(jsonObj[zOption.zreply.codeKey]) && (jsonObj[zOption.zreply.codeKey] || jsonObj[zOption.zreply.msgKey])) { //是json对象，但是不是约定中的数据
                this.processCatch(zOption, new ZHttpError(jsonObj.code, jsonObj.msg), reject);
            } else {
                this.processCatch(zOption, new ZHttpError(1001, "数据不符合规范：\n" + JSON.stringify(res)), reject); //解析的json数据不符合规范
            }
        }
    }

    /**
     * 处理异常信息
     * @param zOption
     * @param error                 错误对象
     * @param reject
     */
    public processCatch<T>(zOption: ZHttpOption<T>, error: any, reject?: any) {
        let errorObj;
        if (error instanceof ZHttpError || (ZUtil.isValid(error.code) && ZUtil.isValid(error.errMsg))) { //自己定义的错误 intanceof判断不出来？
            errorObj = ZHttpService.getErrorReply(error.errMsg, error.code); //服务器返回的错误
        } else {
            errorObj = ZHttpService.getErrorReply(error.errMsg, -1);
        }

        if (!zOption.isHideToastError) {
            let msg = ZUtil.isValid(errorObj.code) ? errorObj.msg + "(" + errorObj.code + ")" : errorObj.msg;
            wx.showToast({
                title: msg || '',
            })
        }

        if (zOption.result && zOption.result.error) {
            zOption.result.error(errorObj);
            if (reject) {
                reject(errorObj);
            }
        }
    }

    /**
     * 获取组合ErrorReply对象
     */
    private static getErrorReply(message: string, code?: number): ZHttpErrorReply {
        let errorObj = new ZHttpErrorReply();
        errorObj.code = code; //自定义错误标识
        errorObj.msg = (message == null) ? "null" : message;
        return errorObj;
    }

    /**
     * 获取默认的Header信息
     */
    private static processHeader(header: any) {
        if (!header) {
            header = {};
        }

        header['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        //header['X-TH-TOKEN']= UserService.getToken()
        return header;
    }
}