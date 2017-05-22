/**
 * Module : neoui-cascader
 * Author : huyueb(huyueb@yonyou.com)
 * Date	  : 2017-05-19 13:19:10
 */
 import {
     closest
 } from 'tinper-sparrow/src/dom';
import {
    on,
    off,
    trigger
} from 'tinper-sparrow/src/event';

var Cascader = u.BaseComponent.extend({
    // 入口方法
    init: function() {
        var self = this,
            data = self.options['data'],
            id = '';
        this._data = data;
        this.order = [];
        if (!this.options['id']) {
            this.options['id'] = new Date().getTime() + '' + parseInt(Math.random() * 10 + 1, 10);
        }
        id = this.options['id'];

        $(this.element).append('<div id="' + id + '-input" class="cascader-input" style="width:100%;height:100%;"><input/></div><div id="' + id + '" class="cascader-show"></div>');
        this.focusFunc();
        $(this.element).children('.cascader-input').off().on('mouseenter', function() {
            var $this = $(this);
            if ($this.children('input').val()) {
                $this.append('<i class="icon uf uf-close-bold"></i>')
            }
            $this.off('mouseleave').on('mouseleave', function() {
                $this.children('i').remove();
            }).children('i').on('click', function() {
                var $this_ = $(this);
                $this_.siblings('input').val('').attr('tovalue', '').end().parent().next().html('').end().end().remove();
            })
        })
    },
    triggerChange: function(value) {
        this.trigger('change', {
            value: value
        });
    },
    setData: function(data) {
        var self = this;
        self._data = data;
    },

    setValue: function(value) {
        var self = this,
            arr = [],
            names = '';
        //如果value存在的话，就通过split分割
        if(value){
            arr = value.split(',');
        }

        if (arr && arr.length > 1) {
            names = self.transName(arr, self._data);
            if (names.length > 1) {
                names = names.substring(0, names.length - 1);
                $(this.element).children('.cascader-input').children('input').val(names).attr('tovalue', value)
            }
        }else{
            $(this.element).children('.cascader-input').children('input').val('').attr('tovalue', '')
        }


    },
    //通过设置的value值能去data中查找到对应的name值
    transName: function(arr, data) {
        var names = '',
            self = this,
            flag = -1;
        for (var j = 0; j < data.length; j++) {
            if (data[j].value == arr[0]) {
                flag = j;
                names += data[j].name + ',';
            }
        }
        if (arr.length > 1) {
            data = data[flag].children;
            arr.shift();

            names += self.transName(arr, data);
        }
        return names;
    },

    //还原之前节点的位置
    transHtml: function(arr, data, index) {
        var html = "",
            self = this,
            index = index || 0,
            flag = -1;

        html += "<ul col = " + index + " >";

        for (var j = 0; j < data.length; j++) {
            if (data[j].value == arr[0]) {
                flag = j;
            }

            if (data[j].children) {
                html += "<li class='" + (flag === j ? 'active' : '') + "' row = " + j + "  value=" + data[j].value + ">" + data[j].name + "<i class='icon uf uf-arrow-right'></i></li>";
            } else {
                html += "<li class='" + (flag === j ? 'active' : '') + "' row = " + j + " value=" + data[j].value + ">" + data[j].name + "</li>";
            }
        }
        html += "</ul>";
        if (arr.length > 1) {
            data = data[flag].children;
            arr.shift();

            html += self.transHtml(arr, data, ++index);
        }

        return html;
    },
    //根据传入的data来动态的生成级联组件的列表
    formData: function(data, index, arg) {
        var self = this,
            data = data || self._data,
            html = "",
            index = index || 0, //来记录是第几个ul，方便进行查找和删除
            arr = [],
            trigger_type = self.options['trigger_type'] || 'click';
        //判断输入框中是否有数据
        if (!arg) {
            //当输入框中没有数据，就认为是第一次
            if ($('#' + self.options['id'] + '>ul').length) {
                $('#' + self.options['id'] + '>ul[col="' + (index) + '"]~').remove();
                index = $('#' + self.options['id'] + '>ul').length;
            }

            html += "<ul col = " + index + " >";

            for (var i = 0; i < data.length; i++) {
                if (data[i].children) {
                    html += "<li row = " + i + "  value=" + data[i].value + ">" + data[i].name + "<i class='icon uf uf-arrow-right'></i></li>";

                } else {
                    html += "<li row = " + i + " value=" + data[i].value + ">" + data[i].name + "</li>";

                }
            }
            html += "</ul>";
            if ($('#' + self.options['id'] + '>ul').length) {

                $('#' + self.options['id']).append(html);
            } else {
                $('#' + self.options['id']).append(html);
            }
            index++;

        } else {
            //当输入框中有数据的时候，就根据输入框的数据，来显示出相应的列表
            arr = arg.split(',');
            html = self.transHtml(arr, data);
            if ($('#' + self.options['id'] + '>ul').length) {

                $('#' + self.options['id']).append(html);
            } else {
                $('#' + self.options['id']).append(html);
            }
            index++;

        }

        if (trigger_type == "mouseenter") {
            //当触发方式是mouseenter的时候，需要额外定义点击事件。点击则将选中的数据写入input输入框
            $('#' + self.options['id'] + '>ul>li').off('click').on('click', function(e) {
                var $this = $(this),
                    $content = $('#' + self.options['id']),
                    col = $this.parent().attr('col'),
                    text = "", //最后选中之后的input输入框中的文字,如："浙江,杭州"
                    value = ""; //最后选中之后的原始序列,如："01,11"
                $.each($content.find('li.active'), function(key, val) {
                    var $val = $(val);
                    if (key < (col - (-1))) {
                        text += val.innerText + ',';
                        value += $val.attr('value') + ',';
                    }

                });
                text = text.substring(0, text.length - 1);
                value = value.substring(0, value.length - 1);

                $content.prev().children('input').val(text).attr('tovalue', value).end().end().html('');

                //触发adapter层的change事件
                self.triggerChange(value);
            });
        }

        //为级联组件的列表的每个li绑定事件
        $('#' + self.options['id'] + '>ul>li').off(trigger_type).on(trigger_type, function(e) {
            var $this = $(this),
                col = $this.parent().attr('col'),
                row = $this.attr('row'),
                data = self._data,
                $content = $('#' + self.options['id']),
                text = "", //最后选中之后的input输入框中的文字,如："浙江,杭州"
                value = ""; //最后选中之后的原始序列,如："01,11"

            $this.siblings().removeClass('active');
            $this.addClass('active');

            //把超过col+1的ul砍掉，之后的就不显示了
            self.order.length = col - (-1);
            self.order[col] = row;

            for (var i = 0; i < self.order.length; i++) {
                //判断此条数据是否还有子数据
                if (data[self.order[i]].children) {
                    data = data[self.order[i]].children;
                } else {

                    if (trigger_type != 'mouseenter') {
                        //当此条数据没有子数据时，并且是click方式触发，就将之前选择的数据展示到input框中
                        $.each($content.find('li.active'), function(key, val) {
                            var $val = $(val);
                            if (key < (col - (-1))) {
                                text += val.innerText + ',';
                                value += $val.attr('value') + ',';
                            }
                        });
                        text = text.substring(0, text.length - 1);
                        value = value.substring(0, value.length - 1);

                        $content.prev().children('input').val(text).attr('tovalue', value).end().end().html('');
                        //触发adapter层的change事件
                        self.triggerChange(value);
                    } else {
                        //当此条数据没有子数据时，如果是mouseenter触发，就只是将该条列表后面的内容删掉
                        $this.parent().nextAll().remove();
                    }
                    return;
                }
            }
            if (data) {
                self.formData(data, col);
            }
        })
        //当点击级联组件的之外的区域时，删除级联组件的显示
        var callback = function(e) {
            if (e.target === this._input || self._inputFocus == true) return;
            if (closest(e.target, 'cascader-show') === self._ul || closest(e.target, 'u-cascader')) return;
            off(document, 'click', callback);
            $('#' + self.options['id']).html('');
        }.bind(this);
        this.callback = callback;
        on(document, 'click', callback);

    },
    //当input输入框有点击事件的时候就生成级联组件的列表
    focusFunc: function() {
        var self = this;
        var caret = $(this.element).find('input')[0];
        on(caret, 'click', function(e) {
            var $this = $(this);
            if (!$('#' + self.options['id']).html()) {
                self.formData('', '', $this.attr('tovalue'));
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            } else {
                e.cancelBubble = true;
            }
        })
    }
});

if (u.compMgr)
    u.compMgr.regComp({
        comp: Cascader,
        compAsString: 'u.cascader',
        css: 'u-cascader'
    });

export {
    Cascader
};
