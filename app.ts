export interface IMyApp {

    //初始化配置
    initConfig(): void;

    globalData: {
        color: any,
    }
}

App<IMyApp>({
    onLaunch() {
        this.initConfig();
    },
    globalData: {
        color: {
            primary: '#3cc51f'
        }
    },
    //初始化配置信息
    initConfig() {

    },
});