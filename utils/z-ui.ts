/**
 * Ui相关服务类
 */
import ShowToastOption = wx.ShowToastOption;
import {IMyApp} from "../app";

export class ZUi {
    /**
     * 显示进度条
     * @param title
     */
    public static showLoading(title?: string) {
        title = title || '';
        wx.showLoading({title: title, mask: true});
    }

    /**
     * 隐藏进度条
     */
    public static hideLoading() {
        wx.hideLoading({});
    }

    /**
     * 显示带有成功图标的toast
     * @param title
     * @param duration
     */
    public static showSuccessToast(title: string, duration?: number) {
        wx.showToast({
            title: title,
            duration: duration || 1500
        })
    }

    /**
     * 显示只有文字的toast
     * @param title
     * @param duration
     */
    public static showTextToast(title: string, duration?: number) {
        wx.showToast({
            title: title,
            icon: "none",
            duration: duration || 1500
        })
    }

    /**
     * 显示带有自定义图标的toast
     * @param title
     * @param image
     * @param duration
     */
    public static showImageToast(title: string, image: string, duration?: number) {
        wx.showToast({
            title: title,
            icon: "none",
            image: image,
            duration: duration || 1500
        })
    }

    /**
     * 显示Toast
     * @param option
     */
    public static showToast(option: ShowToastOption) {
        wx.showToast(option);
    }

    /**
     * 显示ActionSheet
     * @param itemList      按钮的文字数组，数组长度最大为 6
     * @param callback      回调,回传选中的位置和文字, 如果回调方法返回false，则弹出框不消失
     * @param itemColor
     */
    public static showActionSheet(itemList: string[], callback?: (index: number, text: string) => boolean | void, itemColor?: string) {
        wx.showActionSheet({
            itemList: itemList,
            itemColor: itemColor,
            success: (result => {
                if (callback) {
                    callback(result.tapIndex, itemList[result.tapIndex]);
                }
            })
        });
    }

    /**
     * 显示Alert
     * @param title   弹出框标题
     * @param content  弹出框内容
     * @param callback 如果回调方法返回false，则弹出框不消失
     * @param okText   确定按钮文字
     */
    public static showAlert(title: string, content: string, callback?: () => void | boolean, okText?: string) {
        wx.showModal({
            title: title,
            content: content,
            showCancel: false,
            confirmText: okText,
            confirmColor: getApp<IMyApp>().globalData.color.primary,
            success: callback,
        });
    }

    /**
     * 显示Confirm
     * @param title
     * @param content           内容
     * @param okCallback        确定按钮回调
     * @param cancelCallback    取消按钮回调
     * @param OkBtnText         确定按钮文字
     * @param cancelBtnText     取消按钮文字
     */
    public async showConfirm(title: string, content: string, okCallback?: () => boolean | void, cancelCallback?: () => boolean | void, OkBtnText?: string, cancelBtnText?: string) {
        wx.showModal({
            title: title,
            content: content,
            confirmText: OkBtnText,
            cancelText: cancelBtnText,
            confirmColor: getApp<IMyApp>().globalData.color.primary,
            success: (result => {
                if (result.confirm && okCallback) {
                    okCallback();
                } else if (result.cancel && cancelCallback) {
                    cancelCallback();
                }
            })
        });
    }
}
