"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var z_http_service_1 = require("../../providers/httpservice/z-http.service");
Page({
    data: {
        username: '',
        password: ''
    },
    setUserName: function (e) {
        console.log(e.detail.value);
        this.setData({
            username: e.detail.value
        });
    },
    setPassword: function (e) {
        console.log(e.detail.value);
        this.setData({
            password: e.detail.value
        });
    },
    forgetPwd: function () {
        wx.showModal({
            title: '提示',
            content: '这是一个模态弹窗',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定');
                }
                else if (res.cancel) {
                    console.log('用户点击取消');
                }
            }
        });
    },
    submit: function () {
        var http = new z_http_service_1.ZHttpService();
        http.post('http://apicloud.mob.com/v1/weather/query?key=2978a390aaaed&city=%E6%B5%8E%E5%8D%97', {
            loadingMsg: '正在加载……',
            isHideToastError: true,
            zreply: {
                isSuccess: function (code) { return code == 200; },
                msgKey: 'errMsg',
                codeKey: 'statusCode',
                dataKey: 'data',
            }
        }, {
            success: function (data) {
                console.log(data);
                wx.showToast({
                    title: '请求成功',
                });
            },
            error: function (errMsg) {
                wx.showToast({
                    title: '请求失败:' + errMsg,
                    icon: 'none'
                });
            }
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZFQUVtRDtBQUVuRCxJQUFJLENBQUM7SUFJRCxJQUFJLEVBQUU7UUFDRixRQUFRLEVBQUUsRUFBRTtRQUNaLFFBQVEsRUFBRSxFQUFFO0tBQ2Y7SUFDRCxXQUFXLFlBQUMsQ0FBTTtRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztTQUMzQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsV0FBVyxZQUFDLENBQU07UUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7U0FDM0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELFNBQVM7UUFDTCxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ1QsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsVUFBVTtZQUNuQixPQUFPLFlBQUMsR0FBRztnQkFDUCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7b0JBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtpQkFDeEI7cUJBQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO29CQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO2lCQUN4QjtZQUNMLENBQUM7U0FDSixDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0QsTUFBTTtRQUNGLElBQUksSUFBSSxHQUFHLElBQUksNkJBQVksRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsb0ZBQW9GLEVBQUU7WUFDNUYsVUFBVSxFQUFFLFFBQVE7WUFDcEIsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixNQUFNLEVBQUU7Z0JBQ0osU0FBUyxFQUFFLFVBQUMsSUFBWSxJQUFLLE9BQUEsSUFBSSxJQUFJLEdBQUcsRUFBWCxDQUFXO2dCQUN4QyxNQUFNLEVBQUUsUUFBUTtnQkFDaEIsT0FBTyxFQUFFLFlBQVk7Z0JBQ3JCLE9BQU8sRUFBRSxNQUFNO2FBQ2xCO1NBQ0osRUFBRTtZQUNLLE9BQU8sRUFBRSxVQUFDLElBQVM7Z0JBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDVCxLQUFLLEVBQUUsTUFBTTtpQkFDaEIsQ0FBQyxDQUFBO1lBQ04sQ0FBQztZQUNELEtBQUssRUFBRSxVQUFDLE1BQVc7Z0JBQ2YsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDVCxLQUFLLEVBQUUsT0FBTyxHQUFHLE1BQU07b0JBQ3ZCLElBQUksRUFBRSxNQUFNO2lCQUNmLENBQUMsQ0FBQTtZQUNOLENBQUM7U0FDSixDQUFDLENBQUM7SUFDWCxDQUFDO0NBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBaSHR0cFNlcnZpY2Vcbn0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2h0dHBzZXJ2aWNlL3otaHR0cC5zZXJ2aWNlJ1xuXG5QYWdlKHtcbiAgICAvKipcbiAgICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICAgKi9cbiAgICBkYXRhOiB7XG4gICAgICAgIHVzZXJuYW1lOiAnJyxcbiAgICAgICAgcGFzc3dvcmQ6ICcnXG4gICAgfSxcbiAgICBzZXRVc2VyTmFtZShlOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwudmFsdWUpXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICB1c2VybmFtZTogZS5kZXRhaWwudmFsdWVcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBzZXRQYXNzd29yZChlOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwudmFsdWUpXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBwYXNzd29yZDogZS5kZXRhaWwudmFsdWVcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBmb3JnZXRQd2QoKSB7XG4gICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICBjb250ZW50OiAn6L+Z5piv5LiA5Liq5qih5oCB5by556qXJyxcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vnoa7lrponKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBzdWJtaXQoKSB7XG4gICAgICAgIGxldCBodHRwID0gbmV3IFpIdHRwU2VydmljZSgpO1xuICAgICAgICBodHRwLnBvc3QoJ2h0dHA6Ly9hcGljbG91ZC5tb2IuY29tL3YxL3dlYXRoZXIvcXVlcnk/a2V5PTI5NzhhMzkwYWFhZWQmY2l0eT0lRTYlQjUlOEUlRTUlOEQlOTcnLCB7XG4gICAgICAgICAgICBsb2FkaW5nTXNnOiAn5q2j5Zyo5Yqg6L294oCm4oCmJyxcbiAgICAgICAgICAgIGlzSGlkZVRvYXN0RXJyb3I6IHRydWUsXG4gICAgICAgICAgICB6cmVwbHk6IHtcbiAgICAgICAgICAgICAgICBpc1N1Y2Nlc3M6IChjb2RlOiBudW1iZXIpID0+IGNvZGUgPT0gMjAwLFxuICAgICAgICAgICAgICAgIG1zZ0tleTogJ2Vyck1zZycsXG4gICAgICAgICAgICAgICAgY29kZUtleTogJ3N0YXR1c0NvZGUnLFxuICAgICAgICAgICAgICAgIGRhdGFLZXk6ICdkYXRhJyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+ivt+axguaIkOWKnycsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogKGVyck1zZzogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+ivt+axguWksei0pTonICsgZXJyTXNnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfSxcbn0pIl19