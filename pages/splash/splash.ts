Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        setTimeout(() => {
            const userName: string = wx.getStorageSync('username');
            if (userName) {
                wx.redirectTo({
                    url: '/pages/login/login'
                })
            } else {
                wx.switchTab({
                    url: '/pages/index/index'
                })
            }
        }, 2000);

    }
});