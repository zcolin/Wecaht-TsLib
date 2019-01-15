"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_util_1 = require("../../utils/date.util");
Page({
    data: {
        logs: []
    },
    onLoad: function () {
        this.setData({
            logs: (wx.getStorageSync('logs') || []).map(function (log) {
                return date_util_1.DateUtil.getDateStr(new Date(log));
            })
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxtREFBK0M7QUFDL0MsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQWM7S0FDckI7SUFDRCxNQUFNO1FBQ0osSUFBSSxDQUFDLE9BQVEsQ0FBQztZQUNaLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBVztnQkFDcEQsT0FBTyxvQkFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzlDLENBQUMsQ0FBQztTQUNILENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvL2xvZ3MuanNcbmltcG9ydCB7IERhdGVVdGlsfSBmcm9tICcuLi8uLi91dGlscy9kYXRlLnV0aWwnXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIGxvZ3M6IFtdIGFzIHN0cmluZ1tdXG4gIH0sXG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgIGxvZ3M6ICh3eC5nZXRTdG9yYWdlU3luYygnbG9ncycpIHx8IFtdKS5tYXAoKGxvZzogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIERhdGVVdGlsLmdldERhdGVTdHIobmV3IERhdGUobG9nKSk7IFxuICAgICAgfSlcbiAgICB9KVxuICB9LFxufSlcbiJdfQ==