// 日历
dateSelectAction: function (e) {
    var cur_day = e.currentTarget.dataset.idx;
    console.log(e)
    this.setData({
        todayIndex: cur_day,
    })
    console.log(`点击的日期:${this.data.cur_year}年${this.data.cur_month}月${cur_day + 1}日`);
    console.log(this.data.todayIndex)
},
// 设置现在的时间
setNowDate: function () {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const todayIndex = date.getDate() ;
    console.log(`日期：${todayIndex}`)
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.setData({
        cur_year: cur_year,
        cur_month: cur_month,
        weeks_ch,
        todayIndex,
        monDay:[todayIndex,todayIndex+7,todayIndex+14,todayIndex+21]
    })
},
// 获得当前月份
getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
},
// 获得每月的第一天是周几
getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
},
// 给每月的第一天之前填上空格,使每月的第一天对应正确的星期
calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    console.log(firstDayOfWeek)
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
        for (let i = 0; i < firstDayOfWeek; i++) {
            empytGrids.push(i);
        }
        this.setData({
            hasEmptyGrid: true,
            empytGrids
        });
    } else {
        this.setData({
            hasEmptyGrid: false,
            empytGrids: []
        });
    }
},
// 获取每月的天数
calculateDays(year, month) {
    let days = [];

    const thisMonthDays = this.getThisMonthDays(year, month);

    for (let i = 1; i <= thisMonthDays; i++) {
        days.push(i);
    }

    this.setData({
        days
    });
},
// 月份的调整
handleCalendar(e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
        let newMonth = cur_month - 1;
        let newYear = cur_year;
        if (newMonth < 1) {
            newYear = cur_year - 1;
            newMonth = 12;
        }

        this.calculateDays(newYear, newMonth);
        this.calculateEmptyGrids(newYear, newMonth);

        this.setData({
            cur_year: newYear,
            cur_month: newMonth
        })

    } else {
        let newMonth = cur_month + 1;
        let newYear = cur_year;
        if (newMonth > 1