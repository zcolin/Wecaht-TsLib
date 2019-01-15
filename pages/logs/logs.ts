//logs.js
import { DateUtil} from '../../utils/date.util'
Page({
  data: {
    logs: [] as string[]
  },
  onLoad() {
    this.setData!({
      logs: (wx.getStorageSync('logs') || []).map((log: number) => {
          return DateUtil.getDateStr(new Date(log)); 
      })
    })
  },
})
