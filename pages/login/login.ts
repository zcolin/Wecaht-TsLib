import {ZHttpService} from '../../providers/httpservice/z-http.service'

Page({
    /**
     * 页面的初始数据
     */
    data: {
        username: '',
        password: ''
    },
    setUserName(e: any) {
        console.log(e.detail.value)
        // @ts-ignore
        this.setData({
            username: e.detail.value
        });
    },
    setPassword(e: any) {
        console.log(e.detail.value)
        // @ts-ignore
        this.setData({
            password: e.detail.value
        });
    },
    forgetPwd() {
        wx.showModal({
            title: '提示',
            content: '这是一个模态弹窗',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    submit() {
        let http = new ZHttpService();
        http.get('http://apicloud.mob.com/v1/weather/query?key=2978a390aaaed&city=%E6%B5%8E%E5%8D%97',
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
                    })
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