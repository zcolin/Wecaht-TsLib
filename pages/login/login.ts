import {ZHttp} from "../../utils/http/z.http";
import {ZUi} from "../../utils/z-ui";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        username: '',
        password: ''
    },
    setUserName(e: any) {
        console.log(e.detail.value);
        // @ts-ignore
        this.setData({
            username: e.detail.value
        });
    },
    setPassword(e: any) {
        console.log(e.detail.value);
        // @ts-ignore
        this.setData({
            password: e.detail.value
        });
    },
    forgetPwd() {
        ZUi.showAlert('提示', '只是模态窗', () => {
            console.log('用户点击确定')
        });
    },
    submit() {
        ZHttp.get('http://apicloud.mob.com/v1/weather/query?key=2978a390aaaed&city=%E6%B5%8E%E5%8D%97',
            {
                loadingMsg: '正在加载……',
                isHideToastError: true,
                zreply: {
                    isSuccess: (code: number) => code == 200,
                    msgKey: 'errMsg',
                    codeKey: 'statusCode',
                    dataKey: 'data',
                }
            },
            {
                success: (data: any) => {
                    console.log(data);
                    wx.showToast({
                        title: '请求成功',
                    });

                    wx.switchTab({url: '/pages/index/index'});
                    wx.setStorageSync('username', '张三');
                },
                error: (errMsg: any) => {
                    wx.showToast({
                        title: '请求失败:' + errMsg,
                        icon: 'none'
                    })
                }
            });
    },
});