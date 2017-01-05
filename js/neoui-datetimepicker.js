import {extend} from 'tinper-sparrow/js/extend';
import {BaseComponent} from 'tinper-sparrow/js/BaseComponent';
import {env} from 'tinper-sparrow/js/env';
import {on,off,trigger,stopEvent} from 'tinper-sparrow/js/event';
import {addClass,removeClass,hasClass,closest,makeDOM,makeModal,showPanelByEle,getElementLeft,getElementTop} from 'tinper-sparrow/js/dom';
import {core} from 'tinper-sparrow/js/core';
import {date as udate} from 'tinper-sparrow/js/util/dateUtils';
import {Validate} from './neoui-validate';
import {compMgr} from 'tinper-sparrow/js/compMgr';
import {URipple} from 'tinper-sparrow/js/util/ripple';
import {dateFormat} from 'tinper-sparrow/js/util'
import {trans} from 'tinper-sparrow/js/util/i18n'

var DateTimePicker = BaseComponent.extend({
});

DateTimePicker.fn = DateTimePicker.prototype;


DateTimePicker.fn.init = function(){

    var self = this,_fmt,_defaultFmt;
    this.enable = true;
    this._element = this.element;
    //this.type = 'datetime';
    //if (hasClass(this.element,'u-datepicker')){
    //    this.type = 'date';
    //}
    //addClass(this._element,'u-text')
    //this._element.style.display = "inline-table"; // 存在右侧图标，因此修改display
    //new UText(this._element);
    this._input = this._element.querySelector("input");

    // if(env.isMobile){
    //     // setTimeout(function(){
    //     //     self._input.setAttribute('readonly','readonly');
    //     // },1000);
    // }

    setTimeout(function(){
        if (self._input) {
             self._input.setAttribute('readonly','readonly');
        }
    },1000);

    on(this._input, 'focus', function(e){
        // 用来关闭键盘
        /*if(env.isMobile)
            this.blur();*/
        self._inputFocus = true;
        if (self.isShow !== true){
            self.show(e);
        }
        stopEvent(e);
    });

    on(this._input, 'blur', function(e){
        self._inputFocus = false;
    })
    this._span = this._element.querySelector("span");
    if (this._span){
        on(this._span, 'click', function(e){
            // if (self.isShow !== true){
            //     self.show(e);
            // }
            self._input.focus();
            //stopEvent(e);
        });
    }



    if (hasClass(this._element, 'time')){
        this.type = 'datetime';
        _defaultFmt = 'YYYY-MM-DD hh:mm:ss';
    }else{
        this.type = 'date';
        _defaultFmt = 'YYYY-MM-DD';
    }
    _fmt = this._element.getAttribute("format");
    this.format = _fmt || this.options['format']  ||  _defaultFmt;
    this.isShow = false;
};


/**
 * 轮播动画效果
 * @private
 */
DateTimePicker.fn._carousel = function(newPage, direction){
    if (direction == 'left'){
        addClass(newPage, 'right-page');
    }else{
        addClass(newPage, 'left-page');
    }
    this._dateContent.appendChild(newPage);
    if(env.isIE8 || env.isIE9 || env.isFF){
        // this._dateContent.removeChild(this.contentPage);
        var pages = this._dateContent.querySelectorAll('.u-date-content-page');
        for (var i = 0; i < pages.length; i++){
            this._dateContent.removeChild(pages[i])
        }
        this.contentPage = newPage;
        this._dateContent.appendChild(newPage);
        if (direction == 'left'){
            removeClass(newPage, 'right-page');
        }else{
            removeClass(newPage, 'left-page');
        }
    }else{

        var cleanup = function() {
            newPage.removeEventListener('transitionend', cleanup);
            newPage.removeEventListener('webkitTransitionEnd', cleanup);
            // this._dateContent.removeChild(this.contentPage);
            var pages = this._dateContent.querySelectorAll('.u-date-content-page');
            for (var i = 0; i < pages.length; i++){
                this._dateContent.removeChild(pages[i])
            }
            this.contentPage = newPage;
            this._dateContent.appendChild(newPage);
        }.bind(this);

        newPage.addEventListener('transitionend', cleanup);
        newPage.addEventListener('webkitTransitionEnd', cleanup);
        if(window.requestAnimationFrame)
            window.requestAnimationFrame(function() {
                if (direction == 'left'){
                    addClass(this.contentPage, 'left-page');
                    removeClass(newPage, 'right-page');
                }else{
                    addClass(this.contentPage, 'right-page');
                    removeClass(newPage, 'left-page');
                }
            }.bind(this));
    }
};

/**
 * 淡入动画效果
 * @private
 */
DateTimePicker.fn._zoomIn = function(newPage){
    if (!this.contentPage){
        this._dateContent.appendChild(newPage);
        this.contentPage = newPage;
        return;
    }
    addClass(newPage, 'zoom-in');
    this._dateContent.appendChild(newPage);
    if(env.isIE8 || env.isIE9 || env.isFF){
        var pages = this._dateContent.querySelectorAll('.u-date-content-page');
        for (var i = 0; i < pages.length; i++){
            this._dateContent.removeChild(pages[i])
        }
        // this._dateContent.removeChild(this.contentPage);
        this.contentPage = newPage;
        this._dateContent.appendChild(newPage);
        removeClass(newPage, 'zoom-in');
    }else{
        var cleanup = function() {
            newPage.removeEventListener('transitionend', cleanup);
            newPage.removeEventListener('webkitTransitionEnd', cleanup);
            // this._dateContent.removeChild(this.contentPage);
            var pages = this._dateContent.querySelectorAll('.u-date-content-page');
            for (var i = 0; i < pages.length; i++){
                this._dateContent.removeChild(pages[i])
            }
            this.contentPage = newPage;
            this._dateContent.appendChild(newPage);
        }.bind(this);
        if (this.contentPage){
            newPage.addEventListener('transitionend', cleanup);
            newPage.addEventListener('webkitTransitionEnd', cleanup);
        }
        if(window.requestAnimationFrame)
            window.requestAnimationFrame(function() {
                    addClass(this.contentPage, 'is-hidden');
                    removeClass(newPage, 'zoom-in');
            }.bind(this));
    }

};


/**
 *填充年份选择面板
 * @private
 */
DateTimePicker.fn._fillYear = function(type){
    var year,template,yearPage,titleDiv,yearDiv,_year, i,cell,language,year,month,date,time,self = this;
    template = ['<div class="u-date-content-page">',
                    '<div class="u-date-content-title">',
                        /*'<div class="u-date-content-title-year"></div>-',
                        '<div class="u-date-content-title-month"></div>-',
                        '<div class="u-date-content-title-date"></div>',
                        '<div class="u-date-content-title-time"></div>',*/
                    '</div>',
                    '<div class="u-date-content-panel"></div>',
                '</div>'].join("");
    type = type || 'current';
    _year = this.pickerDate.getFullYear()
    if ('current' === type) {
        this.startYear = _year - _year%10 - 1;
    } else if (type === 'preivous') {
        this.startYear = this.startYear - 10;
    } else {
        this.startYear = this.startYear + 10;
    }
    yearPage = makeDOM(template);
    // titleDiv = yearPage.querySelector('.u-date-content-title');
    // titleDiv.innerHTML = (this.startYear - 1) + '-' + (this.startYear + 11);
    language = core.getLanguages();
    year = udate._formats['YYYY'](this.pickerDate);
    month = udate._formats['MM'](this.pickerDate,language);
    date = udate._formats['DD'](this.pickerDate,language);
    time = udate._formats['HH'](this.pickerDate,language) + ':' + udate._formats['mm'](this.pickerDate,language) + ':' + udate._formats['ss'](this.pickerDate,language);

    this._yearTitle = yearPage.querySelector('.u-date-content-title');
    this._yearTitle.innerHTML = year;
    /*this._headerYear = yearPage.querySelector('.u-date-content-title-year');
    this._headerYear.innerHTML = year;
    this._headerMonth = yearPage.querySelector('.u-date-content-title-month');
    this._headerMonth.innerHTML = month;
    this._headerDate = yearPage.querySelector('.u-date-content-title-date');
    this._headerDate.innerHTML = date;
    this._headerTime = yearPage.querySelector('.u-date-content-title-time');
    this._headerTime.innerHTML = time;*/
    if(this.type == 'date'){
        this._headerTime.style.display = 'none';
    }

    /*on(this._headerYear, 'click', function(e){
        self._fillYear();
        stopEvent(e)
    });

    on(this._headerMonth, 'click', function(e){
        self._fillMonth();
        stopEvent(e)
    });

    on(this._headerTime, 'click', function(e){
        self._fillTime();
        stopEvent(e)
    });*/

    yearDiv = yearPage.querySelector('.u-date-content-panel');
    for(var i = 0; i < 12; i++){

        cell = makeDOM('<div class="u-date-content-year-cell">'+ (this.startYear + i) +'</div>');
        new URipple(cell);
        if (this.startYear + i == _year){
            addClass(cell, 'current');
        }
        if(this.beginYear){
            if (this.startYear + i < this.beginYear ){
                addClass(cell, 'u-disabled');
            }
        }
        if(this.overYear){
            if (this.startYear + i > this.overYear ){
                addClass(cell, 'u-disabled');
            }
        }

        cell._value = this.startYear + i;
        yearDiv.appendChild(cell);
    }
    on(yearDiv, 'click', function(e){
        if (hasClass(e.target,'u-disabled')) return;
        var _y = e.target._value;
        this.pickerDate.setYear(_y);
        this._updateDate();
        this._fillMonth();
    }.bind(this));

    if (type === 'current'){
        this._zoomIn(yearPage);
    }else if(type === 'next'){
        this._carousel(yearPage, 'left');
    }else if(type === 'preivous'){
        this._carousel(yearPage, 'right');
    }
    this.currentPanel = 'year';
};

/**
 * 填充月份选择面板
 * @private
 */
DateTimePicker.fn._fillMonth = function(){
    var template,monthPage,_month,cells,i,language,year,month,date,time,self = this;
    template = ['<div class="u-date-content-page">',
        '<div class="u-date-content-title">',
            /*'<div class="u-date-content-title-year"></div>-',
            '<div class="u-date-content-title-month"></div>-',
            '<div class="u-date-content-title-date"></div>',
            '<div class="u-date-content-title-time"></div>',*/
        '</div>',
        '<div class="u-date-content-panel">',
            '<div class="u-date-content-year-cell">'+ udate._jsonLocale.monthsShort[0] +'</div>',
            '<div class="u-date-content-year-cell">'+ udate._jsonLocale.monthsShort[1] +'</div>',
            '<div class="u-date-content-year-cell">'+ udate._jsonLocale.monthsShort[2] +'</div>',
            '<div class="u-date-content-year-cell">'+ udate._jsonLocale.monthsShort[3] +'</div>',
            '<div class="u-date-content-year-cell">'+ udate._jsonLocale.monthsShort[4] +'</div>',
            '<div class="u-date-content-year-cell">'+ udate._jsonLocale.monthsShort[5] +'</div>',
            '<div class="u-date-content-year-cell">'+ udate._jsonLocale.monthsShort[6] +'</div>',
            '<div class="u-date-content-year-cell">'+ udate._jsonLocale.monthsShort[7] +'</div>',
            '<div class="u-date-content-year-cell">'+ udate._jsonLocale.monthsShort[8] +'</div>',
            '<div class="u-date-content-year-cell">'+ udate._jsonLocale.monthsShort[9] +'</div>',
            '<div class="u-date-content-year-cell">'+ udate._jsonLocale.monthsShort[10] +'</div>',
            '<div class="u-date-content-year-cell">'+ udate._jsonLocale.monthsShort[11] +'</div>',
        '</div>',
        '</div>'].join("");

    monthPage = makeDOM(template);
    language = core.getLanguages();
    year = udate._formats['YYYY'](this.pickerDate);
    month = udate._formats['MM'](this.pickerDate,language);
    date = udate._formats['DD'](this.pickerDate,language);
    time = udate._formats['HH'](this.pickerDate,language) + ':' + udate._formats['mm'](this.pickerDate,language) + ':' + udate._formats['ss'](this.pickerDate,language);

    this._monthTitle =  monthPage.querySelector('.u-date-content-title');
    this._monthTitle.innerHTML = udate._formats['MMM'](this.pickerDate,language);
    /*this._headerYear = monthPage.querySelector('.u-date-content-title-year');
    this._headerYear.innerHTML = year;
    this._headerMonth = monthPage.querySelector('.u-date-content-title-month');
    this._headerMonth.innerHTML = month;
    this._headerDate = monthPage.querySelector('.u-date-content-title-date');
    this._headerDate.innerHTML = date;
    this._headerTime = monthPage.querySelector('.u-date-content-title-time');
    this._headerTime.innerHTML = time;*/
    if(this.type == 'date'){
        this._headerTime.style.display = 'none';
    }

    /*on(this._headerYear, 'click', function(e){
        self._fillYear();
        stopEvent(e)
    });

    on(this._headerMonth, 'click', function(e){
        self._fillMonth();
        stopEvent(e)
    });

    on(this._headerTime, 'click', function(e){
        self._fillTime();
        stopEvent(e)
    });*/

    cells = monthPage.querySelectorAll('.u-date-content-year-cell');
    for (var i = 0; i < cells.length; i++){
        if (_month - 1 == i){
            addClass(cells[i],'current');
        }
        if(this.beginYear){
            if(this.pickerDate.getFullYear() == this.beginYear && i < this.beginMonth){
                addClass(cells[i],'u-disabled');
            }
            if(this.pickerDate.getFullYear() < this.beginYear){
                addClass(cells[i],'u-disabled');
            }
        }
        if(this.overYear){
            if(this.pickerDate.getFullYear() == this.overYear && i > this.overMonth){
                addClass(cells[i],'u-disabled');
            }
            if(this.pickerDate.getFullYear() > this.overYear){
                addClass(cells[i],'u-disabled');
            }
        }

        cells[i]._value = i;
        new URipple(cells[i]);
    }
    on(monthPage, 'click', function(e){
        if (hasClass(e.target,'u-disabled')) return;
        if (hasClass(e.target,'u-date-content-title')) return;
        var _m = e.target._value;
        this.pickerDate.setMonth(_m);
        this._updateDate();
        this._fillDate();
    }.bind(this));
    this._zoomIn(monthPage);
    this.currentPanel = 'month';
};

DateTimePicker.fn._getPickerStartDate = function(date){
    var d = new Date(dateFormat(date));
    d.setDate(1);
    var day = d.getDay();
    d = udate.sub(d, 'd', day);
    return d;
}

DateTimePicker.fn._getPickerEndDate= function(date){
    var d = new Date(dateFormat(date));
    d.setDate(1);
    d.setMonth(d.getMonth() + 1);
    d.setDate(0);
    var day = d.getDay();
    d = udate.add(d,'d',6 - day);
    return d;
}

/**
 * 渲染日历
 * @param type : previous  current  next
 * @private
 */
DateTimePicker.fn._fillDate = function(type){
    // if (env.isMobile){
    //     this._dateMobileScroll()
    //     return
    // }
    var year,month,day,date,time,template,datePage,titleDiv,dateDiv,weekSpans,language,tempDate, i,cell,self = this;
    self.timeOpen = false;
    type = type || 'current';
    if ('current' === type) {
        tempDate = this.pickerDate;
    } else if (type === 'preivous') {
        tempDate = udate.sub(this.startDate,'d', 1);
        // 默认显示每个月的1号
        tempDate = udate.getDateObj(tempDate.setDate(1));
    } else {
        tempDate = udate.add(this.endDate,'d', 1);
        // 默认显示每个月的1号
        tempDate = udate.getDateObj(tempDate.setDate(1));
    }
    this.startDate = this._getPickerStartDate(tempDate);
    this.endDate = this._getPickerEndDate(tempDate);

    language = core.getLanguages();
    year = udate._formats['YYYY'](tempDate);
    month = udate._formats['MM'](tempDate,language);
    date = udate._formats['DD'](tempDate,language);
    time = udate._formats['HH'](tempDate,language) + ':' + udate._formats['mm'](tempDate,language) + ':' + udate._formats['ss'](tempDate,language);
    template = ['<div class="u-date-content-page">',
        '<div class="u-date-content-title">',
            '<div class="u-date-content-title-year"></div>-',
            '<div class="u-date-content-title-month"></div>-',
            '<div class="u-date-content-title-date"></div>',
            '<div class="u-date-content-title-time"></div>',
        '</div>',
        '<div class="u-date-week"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>',
        '<div class="u-date-content-panel"></div>',
        '</div>'].join("");
    datePage = makeDOM(template);
    this._headerYear = datePage.querySelector('.u-date-content-title-year');
    this._headerYear.innerHTML = year;
    this._headerMonth = datePage.querySelector('.u-date-content-title-month');
    this._headerMonth.innerHTML = month;
    this._headerDate = datePage.querySelector('.u-date-content-title-date');
    this._headerDate.innerHTML = date;
    this._headerTime = datePage.querySelector('.u-date-content-title-time');
    this._headerTime.innerHTML = time;
    if(this.type == 'date'){
        this._headerTime.style.display = 'none';
    }

    on(this._headerYear, 'click', function(e){
        self._fillYear();
        stopEvent(e)
    });

    on(this._headerMonth, 'click', function(e){
        self._fillMonth();
        stopEvent(e)
    });

    on(this._headerTime, 'click', function(e){
        self._fillTime();
        stopEvent(e)
    });

    weekSpans = datePage.querySelectorAll('.u-date-week span');

    for(var i=0; i< 7; i++){
        weekSpans[i].innerHTML = udate._jsonLocale.weekdaysMin[i];
    }
    dateDiv = datePage.querySelector('.u-date-content-panel');
    tempDate = this.startDate;


    while(tempDate <= this.endDate){
        var tempDateMonth = tempDate.getMonth(),
        tempDateYear = tempDate.getFullYear(),
        tempDateDate = tempDate.getDate();
        cell = makeDOM('<div class="u-date-cell" unselectable="on" onselectstart="return false;">'+ tempDateDate +'</div>');
        if (tempDateYear == this.pickerDate.getFullYear() && tempDateMonth == this.pickerDate.getMonth()
            && tempDateDate == this.pickerDate.getDate()){
            addClass(cell, 'current');
        }

        if(this.beginYear){
            if(tempDateYear < this.beginYear || (tempDateYear == this.beginYear && tempDateMonth < this.beginMonth)
                || (tempDateYear == this.beginYear && tempDateMonth == this.beginMonth
            && tempDateDate < this.beginDate)){
                addClass(cell,'u-disabled');
                removeClass(cell,'current');
            }


        }
        if(this.overYear){
            if(tempDateYear > this.overYear || (tempDateYear == this.overYear && tempDateMonth > this.overMonth)
                || (tempDateYear == this.overYear && tempDateMonth == this.overMonth
                && tempDateDate > this.overDate)){
                addClass(cell,'u-disabled');
                removeClass(cell,'current');
            }
        }

        cell._value = tempDateDate;
        cell._month = tempDateMonth;
        cell._year = tempDateYear;
        new URipple(cell);
        dateDiv.appendChild(cell);
        tempDate = udate.add(tempDate, 'd', 1);
    }
    on(dateDiv, 'click', function(e){
        if (hasClass(e.target,'u-disabled')) return;
        var _d = e.target._value;
        if (!_d) return;
        this.pickerDate.setFullYear(e.target._year);
        this.pickerDate.setMonth(e.target._month);
        this.pickerDate.setDate(_d);
        if(this.pickerDate){
            this.resetDataObj(this.pickerDate);
        }

        var _cell = e.target.parentNode.querySelector('.u-date-cell.current');
        if (_cell) {
            removeClass(_cell, 'current');
            if(env.isIE8 || env.isIE9)
                _cell.style.backgroundColor = "#fff";
        }
        addClass(e.target, 'current');
        if(env.isIE8 || env.isIE9)
            e.target.style.backgroundColor = '#3f51b5';
        this._updateDate();
        if (this.type === 'date'){
            this.onOk();
        }
    }.bind(this));
    if (type === 'current'){
        this._zoomIn(datePage);
    }else if(type === 'next'){
        this._carousel(datePage, 'left');
    }else if(type === 'preivous'){
        this._carousel(datePage, 'right');
    }
    this.currentPanel = 'date';
};


/**
 * 填充时间选择面板
 * @private
 */
DateTimePicker.fn._fillTime = function(type){
    // if (env.isMobile) {
    //     this._timeMobileScroll()
    //     return;
    // }
    if(this.timeOpen)return;
    this.timeOpen = true;
    var year,month,day,date,time,template,timePage,titleDiv,dateDiv,weekSpans,language,tempDate, i,cell,timetemplate;
    var self = this;
    type = type || 'current';
    if ('current' === type) {
        tempDate = this.pickerDate;
    } else if (type === 'preivous') {
        tempDate = udate.sub(this.startDate,'d', 1);
    } else {
        tempDate = udate.add(this.endDate,'d', 1);
    }
    this.startDate = this._getPickerStartDate(tempDate);
    this.endDate = this._getPickerEndDate(tempDate);

    language = core.getLanguages();
    year = udate._formats['YYYY'](tempDate);
    month = udate._formats['MM'](tempDate,language);
    date = udate._formats['DD'](tempDate,language);
    time = udate._formats['HH'](tempDate,language) + ':' + udate._formats['mm'](tempDate,language) + ':' + udate._formats['ss'](tempDate,language);


    template = ['<div class="u-date-content-page">',
        '<div class="u-date-content-title">',
            '<div class="u-date-content-title-year"></div>-',
            '<div class="u-date-content-title-month"></div>-',
            '<div class="u-date-content-title-date"></div>',
            '<div class="u-date-content-title-time"></div>',
        '</div>',
        '<div class="u-date-content-panel"></div>',
        '</div>'].join("");
    timePage = makeDOM(template);
//    titleDiv = timePage.querySelector('.u-date-content-title');
//    titleDiv.innerHTML = year + ' ' + month + ' ' +day ;
    this._headerYear = timePage.querySelector('.u-date-content-title-year');
    this._headerYear.innerHTML = year;
    this._headerMonth = timePage.querySelector('.u-date-content-title-month');
    this._headerMonth.innerHTML = month;
    this._headerDate = timePage.querySelector('.u-date-content-title-date');
    this._headerDate.innerHTML = date;
    this._headerTime = timePage.querySelector('.u-date-content-title-time');
    this._headerTime.innerHTML = time;


	this.editTimeShow = false;
    function editTime (obj) {
        var inputTemplate = "<div><input class='editTime' value='' maxlength='8' /></div>";
        obj._headerTime.innerHTML = inputTemplate;

        var editTime = timePage.querySelector('.editTime');
        obj.editTimeShow = true;
        editTime.focus();
        on(editTime, 'keydown', function (e) {
            var code = e.keyCode;
            var value = this.value;
            if (!((code >= 48 && code <= 57)|| (code >= 96 && code <= 105)||code==37||code==102||code==39||code==8 ||code==46 || code == 110 || code == 190)) {
                stopEvent(e)
            }
                var length = value.length;
                if(length && code != 8){
                    if(length == 2 || length == 5){
                        value = value += ':';
                    }
                }

                this.value = value;
        });

        on(editTime, 'keyup', function (e) {
            var value = this.value,
            length = value.length,
            valueArray = [];
            if (length == 8 && (value[0]<=2 && value[0]>=0) && (value[1]<=3 && value[1]>=0) && (value[3]<=5 && value[3]>=0) && (value[6]<=5 && value[6]>=0)) {
                valueArray = value.split(':');
                obj.pickerDate.setHours(valueArray[0]);
                obj.pickerDate.setMinutes(valueArray[1]);
                obj.pickerDate.setSeconds(valueArray[2]);
            }
        });

    }




    if(this.type == 'date'){
        this._headerTime.style.display = 'none';
    }

    on(this._headerYear, 'click', function(e){
        self._fillYear();
        stopEvent(e)
    });

    on(this._headerMonth, 'click', function(e){
        self._fillMonth();
        stopEvent(e)
    });

    on(this._headerTime, 'click', function(e){
        if(self.currentView == 'hours' && !self.editTimeShow){
            editTime(self);
        }else{
            self.editTimeShow = false;
        }
        self._fillTime();
        self.timeOpen = true;
        stopEvent(e)
    });

    dateDiv = timePage.querySelector('.u-date-content-panel');
   // tempDate = this.startDate;
    // while(tempDate <= this.endDate){
        // cell = makeDOM('<div class="u-date-cell">'+ udate._formats['HH'](tempDate,language) +'</div>');
        // if (tempDate.getFullYear() == this.pickerDate.getFullYear() && tempDate.getMonth() == this.pickerDate.getMonth()
            // && tempDate.getDate() == this.pickerDate.getDate()){
            // addClass(cell, 'current');
        // }
        // cell._value = tempDate.getDate();
        // new URipple(cell);
        // dateDiv.appendChild(cell);
        // tempDate = udate.add(tempDate, 'd', 1);
    // }
    if(env.isIE8){ // IE8/IE9保持原来，非IE8/IE9使用clockpicker
        timetemplate = ['<div class="u_time_box">',
                            '<div class="u_time_cell">',
                                //'<div class="add_hour_cell"><i class="add_hour_cell icon-angle-up"></i></div>',
                                '<div class="show_hour_cell">'+ udate._formats['HH'](tempDate) +'</div>' ,
                                //'<div class="subtract_hour_cell"><i class="subtract_hour_cell icon-angle-down"></i></div>',
                            '</div>',
                            '<div class="u_time_cell">',
                                //'<div class="add_min_cell"><i class="add_min_cell icon-angle-up"></i></div>',
                                '<div class="show_min_cell">'+ udate._formats['mm'](tempDate) +'</div>',
                                //'<div class="subtract_min_cell"><i class="subtract_min_cell icon-angle-down"></i></div>',
                            '</div>',
                            '<div class="u_time_cell">',
                                //'<div class="add_sec_cell"><i class="add_sec_cell icon-angle-up"></i></div>',
                                '<div class="show_sec_cell">'+ udate._formats['ss'](tempDate) +'</div>',
                                //'<div class="subtract_sec_cell"><i class="subtract_sec_cell icon-angle-down"></i></div>',
                            '</div>',
                        '</div>'].join("");
        cell = makeDOM(timetemplate);
        dateDiv.appendChild(cell);
        on(dateDiv, 'click', function(e){
            var _arrary = e.target.getAttribute("class").split("_");
            if(_arrary[0] == "add"){
                if(_arrary[1] == "hour"){
                    var tmph = Number(udate._formats['HH'](this.pickerDate))
                    if(tmph < 23){
                        tmph++
                    }else{
                        tmph = 0
                    }

                    this.pickerDate.setHours(tmph)
                    dateDiv.querySelector(".show_hour_cell").innerHTML = tmph
                }else if(_arrary[1] == "min"){
                    var tmpm = Number(udate._formats['mm'](this.pickerDate))
                    if(tmpm < 59){
                         tmpm++
                    }else{
                         tmpm = 0
                    }
                    this.pickerDate.setMinutes(tmpm)
                }else if(_arrary[1] == "sec"){
                    var tmps = Number(udate._formats['ss'](this.pickerDate))
                    if(tmps < 59){
                        tmps++
                    }else{
                        tmps = 0
                    }
                    this.pickerDate.setSeconds(tmps)
                }
            }else if(_arrary[0] == "subtract"){
                if(_arrary[1] == "hour"){
                    var tmph = Number(udate._formats['HH'](this.pickerDate))
                    if(tmph > 0 ){
                        tmph--
                    }else{
                        tmph = 23
                    }
                    this.pickerDate.setHours(tmph)

                }else if(_arrary[1] == "min"){
                    var tmpm = Number(udate._formats['mm'](this.pickerDate))
                    if(tmpm > 0){
                         tmpm--
                    }else{
                         tmpm = 59
                    }
                    this.pickerDate.setMinutes(tmpm)
                }else if(_arrary[1] == "sec"){
                    var tmps = Number(udate._formats['ss'](this.pickerDate))
                    if(tmps > 0){
                        tmps--
                    }else{
                        tmps = 59
                    }
                    this.pickerDate.setSeconds(tmps)
                }
            }else if(_arrary[0] == "show"){
                var tmptarget = e.target
                var tmpinput = makeDOM("<input type='text' class='u-input'>");
                if(tmptarget.querySelector('.u-input'))return;
                this._updateDate();
                tmpinput.value = tmptarget.innerHTML;
                tmptarget.innerHTML = ""
                tmptarget.appendChild(tmpinput)
                if(_arrary[1] == "hour"){
                     var vali = new Validate(tmpinput,{validType:"integer",minLength:0,maxLength:2,min:0,max:23})
                     on(tmpinput,'blur',function(){
                        if(vali.passed){
                            self.pickerDate.setHours(tmpinput.value)
                            self._updateDate();
                        }
                     })
                }else if(_arrary[1] == "min"){
                     var vali = new Validate(tmpinput,{validType:"integer",minLength:0,maxLength:2,min:0,max:59})
                       on(tmpinput,'blur',function(){
                        if(vali.passed){
                            self.pickerDate.setMinutes(tmpinput.value)
                            self._updateDate();
                        }
                     })
                }else if(_arrary[1] == "sec"){
                     var vali = new Validate(tmpinput,{validType:"integer",minLength:0,maxLength:2,min:0,max:59})
                       on(tmpinput,'blur',function(){
                        if(vali.passed){
                            self.pickerDate.setSeconds(tmpinput.value)
                            self._updateDate();
                        }
                     })
                }

                tmpinput.focus()
                return;

            }else{
                return false;
            }

            this._updateDate();
        }.bind(this));
    }else{
        timetemplate = '<div class="u-combo-ul clockpicker-popover is-visible" style="width:100%;padding:0px;">';
//        timetemplate += '<div class="popover-title"><span class="clockpicker-span-hours">02</span> : <span class="clockpicker-span-minutes text-primary">01</span><span class="clockpicker-span-am-pm"></span></div>';
        timetemplate += '<div class="popover-content">';
        timetemplate += '  <div class="clockpicker-plate data-clockpicker-plate">';
        timetemplate += '      <div class="clockpicker-canvas">';
        timetemplate += '          <svg class="clockpicker-svg">';
        timetemplate += '              <g transform="translate(100,100)">';
        timetemplate += '                  <circle class="clockpicker-canvas-bg clockpicker-canvas-bg-trans" r="13" cx="8.362277061412277" cy="-79.56175162946187"></circle>';
        timetemplate += '                  <circle class="clockpicker-canvas-fg" r="3.5" cx="8.362277061412277" cy="-79.56175162946187"></circle>';
        timetemplate += '                  <line x1="0" y1="0" x2="8.362277061412277" y2="-79.56175162946187"></line>';
        timetemplate += '                  <circle class="clockpicker-canvas-bearing" cx="0" cy="0" r="2"></circle>';
        timetemplate += '              </g>';
        timetemplate += '          </svg>';
        timetemplate += '      </div>';
        timetemplate += '      <div class="clockpicker-dial clockpicker-hours" style="visibility: visible;">';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-1" >00</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-2" >1</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-3" >2</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-4" >3</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-5" >4</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-6" >5</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-7" >6</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-8" >7</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-9" >8</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-10" >9</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-11" >10</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-12" >11</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-13" >12</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-14" >13</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-15" >14</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-16" >15</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-17" >16</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-18" >17</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-19" >18</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-20" >19</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-21" >20</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-22" >21</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-23" >22</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-24" >23</div>';
        timetemplate += '      </div>';
        timetemplate += '      <div class="clockpicker-dial clockpicker-minutes" style="visibility: hidden;">';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-25" >00</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-26" >05</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-27" >10</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-28" >15</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-29" >20</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-30" >25</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-31" >30</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-32" >35</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-33" >40</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-34" >45</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-35" >50</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-36" >55</div>';
        timetemplate += '      </div>';

        timetemplate += '      <div class="clockpicker-dial clockpicker-seconds" style="visibility: hidden;">';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-25" >00</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-26" >05</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-27" >10</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-28" >15</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-29" >20</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-30" >25</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-31" >30</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-32" >35</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-33" >40</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-34" >45</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-35" >50</div>';
        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-36" >55</div>';
        timetemplate += '      </div>';

        timetemplate += '  </div><span class="clockpicker-am-pm-block"></span></div>';
        timetemplate += '  </div>';
        cell = makeDOM(timetemplate);
        this.cell = cell;
        dateDiv.appendChild(cell);

        this.hand = cell.querySelector('line');
        this.bg = cell.querySelector('.clockpicker-canvas-bg');
        this.fg = cell.querySelector('.clockpicker-canvas-fg');
        this.titleHourSpan = cell.querySelector('.clockpicker-span-hours');
        this.titleMinSpan = cell.querySelector('.clockpicker-span-minutes');
        this.titleSecSpan = cell.querySelector('.clockpicker-span-seconds');
        this.hourDiv = cell.querySelector('.clockpicker-hours');
        this.minDiv = cell.querySelector('.clockpicker-minutes');
        this.secDiv = cell.querySelector('.clockpicker-seconds');
        this.currentView = 'hours';
        this.hours = udate._formats['HH'](tempDate);
        this.min = udate._formats['mm'](tempDate);
        this.sec = udate._formats['ss'](tempDate);
        //this.titleHourSpan.innerHTML = this.hours;
        //this.titleMinSpan.innerHTML = this.min;



        on(this.hourDiv,'click',function(e){
            var target = e.target;
            if(hasClass(target,'clockpicker-tick')){
                this.hours = target.innerHTML;
                this.hours = this.hours > 9 || this.hours  == 0? '' + this.hours:'0' + this.hours;
                // this.titleHourSpan.innerHTML = this.hours;
                self.pickerDate.setHours(this.hours);
                var language = core.getLanguages();
                var time = udate._formats['HH'](this.pickerDate,language) + ':' + udate._formats['mm'](this.pickerDate,language) + ':' + udate._formats['ss'](this.pickerDate,language);
                this._headerTime.innerHTML = time;
                this.hourDiv.style.visibility = 'hidden';
                this.minDiv.style.visibility = 'visible';
                this.currentView = 'min';
                this.setHand();
            }
        }.bind(this));

        on(this.minDiv,'click',function(e){
            var target = e.target;
            if(hasClass(target,'clockpicker-tick')){
                this.min = target.innerHTML;
                // this.min = this.min > 9 || this.min  == 00? '' + this.min:'0' + this.min;
                // this.titleMinSpan.innerHTML = this.min;
                self.pickerDate.setMinutes(this.min);
                var language = core.getLanguages();
                var time = udate._formats['HH'](this.pickerDate,language) + ':' + udate._formats['mm'](this.pickerDate,language) + ':' + udate._formats['ss'](this.pickerDate,language);
                this._headerTime.innerHTML = time;
                this.minDiv.style.visibility = 'hidden';
                this.secDiv.style.visibility = 'visible';
                this.currentView = 'sec';
                this.setHand();
            }
        }.bind(this));

        on(this.secDiv, 'click', function (e) {
            var target = e.target;
            if(hasClass(target,'clockpicker-tick')){
                this.sec = target.innerHTML;
                // this.min = this.min > 9 || this.min  == 00? '' + this.min:'0' + this.min;
                // this.titleMinSpan.innerHTML = this.min;
                self.pickerDate.setSeconds(this.sec);
                var language = core.getLanguages();
                var time = udate._formats['HH'](this.pickerDate,language) + ':' + udate._formats['mm'](this.pickerDate,language) + ':' + udate._formats['ss'](this.pickerDate,language);
                this._headerTime.innerHTML = time;
                this.secDiv.style.visibility = 'hidden';
                this.hourDiv.style.visibility = 'visible';
                this.currentView = 'hours';
                this.setHand();
            }
        }.bind(this));

    }

    this._zoomIn(timePage);
    if(!env.isIE8)
        this.setHand();
    this.currentPanel = 'time';
    dateDiv.onselectstart=new Function("return false");

    var value = timePage.querySelector('.u-date-content-title-time').innerHTML;
    var inputTemplate = '<div><input value='+ value +' /></div>';


};



DateTimePicker.fn.setHand = function(){
    var dialRadius = 100,
    innerRadius = 54,
    outerRadius = 80;
    var view = this.currentView,
        value = this[view],
        isHours = view === 'hours',
        unit = Math.PI / (isHours ? 6 : 30),
        radian = value * unit,
        radius = isHours && value > 0 && value < 13 ? innerRadius : outerRadius,
        x = Math.sin(radian) * radius,
        y = - Math.cos(radian) * radius;
        this.setHandFun(x,y);
}

DateTimePicker.fn.setHandFun = function(x,y,roundBy5,dragging){
    var dialRadius = 100,
    innerRadius = 54,
    outerRadius = 80;

    var radian = Math.atan2(x, - y),
        isHours = this.currentView === 'hours',
        unit = Math.PI / (isHours ? 6 : 30),
        z = Math.sqrt(x * x + y * y),
        options = this.options,
        inner = isHours && z < (outerRadius + innerRadius) / 2,
        radius = inner ? innerRadius : outerRadius,
        value;

        if (this.twelvehour) {
            radius = outerRadius;
        }

    // Radian should in range [0, 2PI]
    if (radian < 0) {
        radian = Math.PI * 2 + radian;
    }

    // Get the round value
    value = Math.round(radian / unit);

    // Get the round radian
    radian = value * unit;

    // Correct the hours or minutes
    if (options.twelvehour) {
        if (isHours) {
            if (value === 0) {
                value = 12;
            }
        } else {
            if (roundBy5) {
                value *= 5;
            }
            if (value === 60) {
                value = 0;
            }
        }
   } else {
        if (isHours) {
            if (value === 12) {
                value = 0;
            }
            value = inner ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
        } else {
            if (roundBy5) {
                value *= 5;
            }
            if (value === 60) {
                value = 0;
            }
        }
    }

    // Set clock hand and others' position
    var w = this._panel.offsetWidth;
        var u = w / 294;
        var cx = Math.sin(radian) * radius * u,
            cy = - Math.cos(radian) * radius * u;
        var iu = 100 * u;
        this.cell.querySelector('g').setAttribute('transform','translate(' + iu + ',' + iu + ')');
    this.hand.setAttribute('x2', cx);
    this.hand.setAttribute('y2', cy);
    this.bg.setAttribute('cx', cx);
    this.bg.setAttribute('cy', cy);
    this.fg.setAttribute('cx', cx);
    this.fg.setAttribute('cy', cy);
}

/**
 * 重新渲染面板
 * @private
 */
DateTimePicker.fn._updateDate = function(){
    var year,month,week,date,time, hour,minute,seconds,language;

    language = core.getLanguages();
    year = udate._formats['YYYY'](this.pickerDate);
    // week = udate._formats['ddd'](this.pickerDate, language);
    month = udate._formats['MM'](this.pickerDate, language);
    time = udate._formats['HH'](this.pickerDate, language)+':'+udate._formats['mm'](this.pickerDate, language)+':'+udate._formats['ss'](this.pickerDate, language);

    //TODO 多语
    // date = udate._formats['D'](this.pickerDate) + '日';
    date = udate._formats['DD'](this.pickerDate,language);
    if(this._headerYear){
        this._headerYear.innerHTML = '';
        this._headerYear.innerHTML = year;
    }
        // this._headerWeak.innerHTML = '';
        // this._headerWeak.innerHTML = week;
    if(this._headerMonth){
        this._headerMonth.innerHTML = '';
        this._headerMonth.innerHTML = month ;
    }
    if(this._headerDate){
        this._headerDate.innerHTML = '';
        this._headerDate.innerHTML = date;
    }
    if(this._headerTime){
        this._headerTime.innerHTML = '';
        this._headerTime.innerHTML = time;
    }
    if(this.currentPanel == 'time'){
        if(env.isIE8){
            this._panel.querySelector(".show_hour_cell").innerHTML =  udate._formats['HH'](this.pickerDate, language)
            this._panel.querySelector(".show_min_cell").innerHTML =  udate._formats['mm'](this.pickerDate, language)
            this._panel.querySelector(".show_sec_cell").innerHTML =  udate._formats['ss'](this.pickerDate, language)
        }
    }

};


DateTimePicker.fn._response = function() {
    return;
    var bodyHeight = document.body.offsetHeight;  //395
    var _height = 430;
    if (this.type === 'date' && !(env.isMobile))
        _height = 395;
    if (bodyHeight > _height){
        this._panel.style.height =  _height;
    }
    //if (bodyHeight > 500){
    //    this._panel.style.height =  '500px';
    //}
    //this._dateContent.style.height =panelHeight - 158 + 'px';   // 106 52
};

var dateTimePickerTemplateArr = ['<div class="u-date-panel">',
                            '<div class="u-date-body">',
                                '<div class="u-date-content"></div>',
                            '</div>',
                            '<div class="u-date-nav">',
                                '<button type="button" class="u-button u-date-ok right primary">',
                                trans('public.confirm','确定'),
                                '</button>',
                                '<button type="button" class="u-button u-date-cancel right">',
                                trans('public.cancel','取消'),
                                '</button>',
                                '<button type="button" class="u-button u-date-clean">',
                                trans('public.clear','清空'),
                                '</button>',
                            '</div>',
                           '</div>'];


/******************************
 *  Public method
 ******************************/

DateTimePicker.fn.show = function(evt){
    if(!this.enable){
        return;
    }
    var inputValue = this._input.value;
    this.setDate(inputValue);

    var self = this;
    if (!this._panel){
        this._panel = makeDOM(dateTimePickerTemplateArr.join(""));
        /*if(env.isMobile){
            removeClass(this._panel,'u-date-panel')
            addClass(this._panel,'u-date-panel-mobile');
        }*/
        this._dateNav = this._panel.querySelector('.u-date-nav');
        // if (this.type === 'date' && !env.isMobile){
        //    this._dateNav.style.display = 'none';
        // }
        // 如果是日期类型，取消显示确认和取消按钮
        if (this.type === 'date' && !env.isMobile) {
            this._dateOk = this._panel.querySelector('.u-date-ok');
            this._dateCancel = this._panel.querySelector('.u-date-cancel');
            this._dateOk.style.display = 'none';
            this._dateCancel.style.display = 'none';
        }

        this._dateContent = this._panel.querySelector('.u-date-content');
        if(this.type == 'datetime'){
            /*if(env.isMobile){
                this._dateContent.style.height = '226/16*2rem';
            }
            else{
                this._dateContent.style.height = '226px';
            }*/
        }
        this.btnOk = this._panel.querySelector('.u-date-ok');
        this.btnCancel = this._panel.querySelector('.u-date-cancel');
        this.btnClean = this._panel.querySelector('.u-date-clean');
        var rippleContainer = document.createElement('span');
        addClass(rippleContainer,'u-ripple');
        this.btnOk.appendChild(rippleContainer);
        var rippleContainer = document.createElement('span');
        addClass(rippleContainer,'u-ripple');
        this.btnCancel.appendChild(rippleContainer);
        var rippleContainer = document.createElement('span');
        addClass(rippleContainer,'u-ripple');
        this.btnClean.appendChild(rippleContainer);
        new URipple(this.btnOk);
        new URipple(this.btnCancel);
        new URipple(this.btnClean);
        on(this.btnOk, 'click', function(e){
            this.onOk();
            stopEvent(e);
        }.bind(this));
        on(this.btnCancel, 'click', function(e){
            self.onCancel();
            stopEvent(e)
        });
        on(this.btnClean, 'click', function(e){
            self.pickerDate = null;
            self.onOk();
            stopEvent(e)
        });


        // this.preBtn = makeDOM('<button class="u-date-pre-button u-button flat floating mini">&lt;</button>');
        // this.nextBtn = makeDOM('<button class="u-date-next-button u-button flat floating mini">&gt;</button>');
        this.preBtn = makeDOM('<button class="u-date-pre-button u-button mini">&lt;</button>');
        this.nextBtn = makeDOM('<button class="u-date-next-button u-button mini">&gt;</button>');
        // new u.Button(this.nextBtn);

        on(this.preBtn, 'click', function(e){
            if (self.currentPanel == 'date'){
                self._fillDate('preivous');
            }else if (self.currentPanel == 'year'){
                self._fillYear('preivous');
            }
            stopEvent(e)
        });
        on(this.nextBtn, 'click', function(e){
            if (self.currentPanel == 'date'){
                self._fillDate('next');
            }else if (self.currentPanel == 'year'){
                self._fillYear('next');
            }
            stopEvent(e)
        });
        // if(!env.isMobile){
            this._dateContent.appendChild(this.preBtn);
            this._dateContent.appendChild(this.nextBtn);
        // }



    }
    this.pickerDate = this.date || new Date();
    this._updateDate();
    this._fillDate();
    this._response();
    on(window, 'resize', function(){
        self._response();
    });
    /*if(env.isMobile){
        this.overlayDiv = makeModal(this._panel);
        on(this.overlayDiv, 'click', function(){
            self.onCancel();
        })
    }*/
    addClass(this._panel, 'is-visible');
    if(!env.isMobile){
        if(this.options.showFix){
            document.body.appendChild(this._panel);
            this._panel.style.position = 'fixed';
            showPanelByEle({
                ele:this._input,
                panel:this._panel,
                position:"bottomLeft"
            });
        }else{
            var bodyWidth = document.body.clientWidth,bodyHeight = document.body.clientHeight,
                panelWidth = this._panel.offsetWidth,panelHeight = this._panel.offsetHeight
            //调整left和top
            // this._element.parentNode.appendChild(this._panel);
            this._element.appendChild(this._panel);
            this._element.style.position = 'relative';
            // this.left = this.element.offsetLeft;
            //
             this.left = this._input.offsetLeft;
            var inputHeight = this._input.offsetHeight;
            // this.top = this.element.offsetTop + inputHeight;
            this.top = this._input.offsetTop + inputHeight;

            var abLeft = getElementLeft(this._input),
                abTop = getElementTop(this._input);

            if(abLeft + panelWidth > bodyWidth){
                if( abLeft - bodyWidth> 0){
                    this.left =  - panelWidth ;
                }else {
                    this.left =bodyWidth  - panelWidth - abLeft;
                }
            }

            if((abTop + panelHeight) > bodyHeight){
                if( abTop - bodyHeight> 0){
                    this.top =  - panelHeight ;
                }else {
                    this.top =bodyHeight  - panelHeight - abTop;
                }
            }


            this._panel.style.left = this.left + 'px';
            this._panel.style.top = this.top + 'px';

        }


        this._panel.style.marginLeft = '0px';
        var callback = function (e) {
            if (e !== evt && e.target !== self._input && !hasClass(e.target,'u-date-content-year-cell')  && !hasClass(e.target,'u-date-content-year-cell') &&closest(e.target,'u-date-panel') !== self._panel && self._inputFocus != true) {
                off(document,'click', callback);
                self.onCancel();
            }
        };
        on(document,'click', callback);


        //tab事件
         on(self._input,'keydown',function(e){
            var keyCode = e.keyCode;
            if(keyCode==9) {
                self.onCancel();
            }
        });

    }

    this.isShow = true;
};


/**
 * 确定事件
 */
DateTimePicker.fn.onOk = function(){
    if(typeof this.options.beforeValueChangeFun == 'function'){
        if(!this.options.beforeValueChangeFun.call(this,this.pickerDate)){
            return;
        }
    }
    var flag = true;
    if (this.beginDateObj) {
        if (this.pickerDate && this.pickerDate.getTime() < this.beginDateObj.getTime())
            flag = false;
    }
    if (this.overDateObj) {
        if (this.pickerDate && this.pickerDate.getTime() > this.overDateObj.getTime())
            flag = false;
    }
    if(flag){
        this.setDate(this.pickerDate);
    }
    this.isShow = false;
    this.timeOpen = false;
    removeClass(this._panel, 'is-visible');
    try{
        document.body.removeChild(this.overlayDiv);
    }catch(e){

    }
    if(flag){
        this.trigger('select', {value:this.pickerDate});
        this.trigger('validate');
        if(u.isIE||u.isEdge){
            this.element.querySelector('input').blur();
        }
    }

}

DateTimePicker.fn.hide = function(){
    this.isShow = false;
    this.timeOpen = false;
    removeClass(this._panel, 'is-visible');
}

/**
 * 确定事件
 */
DateTimePicker.fn.onCancel = function(){
    this.isShow = false;
    this.timeOpen = false;
    removeClass(this._panel, 'is-visible');
    try{
        document.body.removeChild(this.overlayDiv);
    }catch(e){

    }
    this.trigger('validate');
}


DateTimePicker.fn.setDate = function(value){
    if (!value){
        this.date = null;
        this._input.value = '';
        return;
    }

    var _date = udate.getDateObj(value);
    if(_date){
        if(_date){
            this.resetDataObj(_date);
        }
        if(this.beginDateObj){
            if(this.beginDateObj){
                this.resetDataObj(this.beginDateObj);
            }
            if(_date.getTime() < this.beginDateObj.getTime())
                return;
        }
        if(this.overDateObj){
            if(this.overDateObj){
                this.resetDataObj(this.overDateObj);
            }
            if(_date.getTime() > this.overDateObj.getTime())
                return;
        }
        this.date = _date;
        this._input.value = udate.format(this.date,this.format);
    }

};
/**
 *设置format
 * @param format
 */
DateTimePicker.fn.setFormat = function(format){
    this.format = format;
    this._input.value = udate.format(this.date,this.format);
};

DateTimePicker.fn.setStartDate = function(startDate, type){
    if(startDate){
        this.beginDateObj = udate.getDateObj(startDate);
        if(this.beginDateObj){
            this.resetDataObj(this.beginDateObj)
        }
        /*if(type){
            switch (type) {
                case 'YYYY-MM':
                this.beginDateObj = udate.add(this.beginDateObj, 'M', 1);
                    break;
                case 'YYYY-MM-DD':
                this.beginDateObj = udate.add(this.beginDateObj, 'd', 1);
                    break;
            }
        }*/

        this.beginYear = this.beginDateObj.getFullYear();
        this.beginMonth = this.beginDateObj.getMonth();
        this.beginDate = this.beginDateObj.getDate();

    }else{
        this.beginDateObj = null;
        this.beginYear = null;
        this.beginMonth = null;
        this.beginDate = null;
    }

};


DateTimePicker.fn.setEndDate = function(endDate){
    if(endDate){
        this.overDateObj = udate.getDateObj(endDate);
        if(this.overDateObj){
            this.resetDataObj(this.overDateObj)
        }
        this.overYear = this.overDateObj.getFullYear();
        this.overMonth = this.overDateObj.getMonth();
        this.overDate = this.overDateObj.getDate();
    }else{
        this.overDateObj = null;
        this.overYear = null;
        this.overMonth = null;
        this.overDate = null;
    }
};

DateTimePicker.fn.setEnable = function(enable){
    if (enable === true || enable === 'true') {
        this.enable = true;
    }else{
        this.enable = false;
    }
};

DateTimePicker.fn.resetDataObj = function(dataObj){
    if(this.format.indexOf('h') < 0 && this.format.indexOf('H') < 0){
        dataObj.setHours(0);
    }
    if(this.format.indexOf('m') < 0){
        dataObj.setMinutes(0);
    }
    if(this.format.indexOf('s') < 0){
        dataObj.setSeconds(0);
        dataObj.setMilliseconds(0);
    }
};

if(!env.isMobile){
   compMgr.regComp({
        comp: DateTimePicker,
        compAsString: 'u.DateTimePicker',
        css: 'u-datepicker'
    });
}

if(document.readyState && document.readyState === 'complete') {
    compMgr.updateComp();
} else {
    on(window, 'load', function() {
        //扫描并生成控件
        compMgr.updateComp();
    });
}

export {DateTimePicker};
