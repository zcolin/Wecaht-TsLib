"use strict";
Page({
    data: {},
    onLoad: function () {
        setTimeout(function () {
            var userName = wx.getStorageSync('username');
            if (userName) {
                wx.redirectTo({
                    url: '/pages/login/login'
                });
            }
            else {
                wx.switchTab({
                    url: '/pages/index/index'
                });
            }
        }, 2000);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsYXNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3BsYXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFJLENBQUM7SUFLRCxJQUFJLEVBQUUsRUFBRTtJQUtSLE1BQU07UUFDRixVQUFVLENBQUM7WUFDUCxJQUFNLFFBQVEsR0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZELElBQUksUUFBUSxFQUFFO2dCQUNWLEVBQUUsQ0FBQyxVQUFVLENBQUM7b0JBQ1YsR0FBRyxFQUFFLG9CQUFvQjtpQkFDNUIsQ0FBQyxDQUFBO2FBQ0w7aUJBQU07Z0JBQ0gsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDVCxHQUFHLEVBQUUsb0JBQW9CO2lCQUM1QixDQUFDLENBQUE7YUFDTDtRQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUViLENBQUM7Q0FDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJQYWdlKHtcblxuICAgIC8qKlxuICAgICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgICAqL1xuICAgIGRhdGE6IHt9LFxuXG4gICAgLyoqXG4gICAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICAgKi9cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXNlck5hbWU6IHN0cmluZyA9IHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VybmFtZScpO1xuICAgICAgICAgICAgaWYgKHVzZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9wYWdlcy9sb2dpbi9sb2dpbidcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3eC5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMjAwMCk7XG5cbiAgICB9XG59KTsiXX0=