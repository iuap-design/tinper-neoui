/**
 * Module : neoui-datatable
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-02 15:23:19
 */

import {BaseComponent} from 'tinper-sparrow/js/BaseComponent';
import {on} from 'tinper-sparrow/js/event';
import {Checkbox} from './neoui-checkbox';
import {compMgr} from 'tinper-sparrow/js/compMgr';


var Table = BaseComponent.extend({
    _CssClasses: {

        SELECTABLE: 'selectable',
        SELECT_ELEMENT: 'u-table-select',
        IS_SELECTED: 'is-selected',
        IS_UPGRADED: 'is-upgraded'
    },

    init: function(){
        var self = this;
        this.element_ = this.element;
        if (this.element_) {
            var firstHeader = this.element_.querySelector('th');
            var bodyRows = Array.prototype.slice.call(this.element_.querySelectorAll('tbody tr'));
            var footRows = Array.prototype.slice.call(this.element_.querySelectorAll('tfoot tr'));
            var rows = bodyRows.concat(footRows);

        }
    },
    _selectRow: function(checkbox, row, opt_rows){
        if (row) {
            return function () {
                if (checkbox.checked) {
                    row.classList.add(this._CssClasses.IS_SELECTED);
                } else {
                    row.classList.remove(this._CssClasses.IS_SELECTED);
                }
            }.bind(this);
        }

        if (opt_rows) {
            return function () {
                var i;
                var el;
                if (checkbox.checked) {
                    for (i = 0; i < opt_rows.length; i++) {
                        el = opt_rows[i].querySelector('td').querySelector('.u-checkbox');
                        // el['MaterialCheckbox'].check();
                        opt_rows[i].classList.add(this._CssClasses.IS_SELECTED);
                    }
                } else {
                    for (i = 0; i < opt_rows.length; i++) {
                        el = opt_rows[i].querySelector('td').querySelector('.u-checkbox');
                        //el['MaterialCheckbox'].uncheck();
                        opt_rows[i].classList.remove(this._CssClasses.IS_SELECTED);
                    }
                }
            }.bind(this);
        }
    },
    _createCheckbox: function(row, opt_rows){
        var label = document.createElement('label');
        var labelClasses = [
            'u-checkbox',
            this._CssClasses.SELECT_ELEMENT
        ];
        label.className = labelClasses.join(' ');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('u-checkbox-input');

        if (row) {
            checkbox.checked = row.classList.contains(this._CssClasses.IS_SELECTED);
            checkbox.addEventListener('change', this._selectRow(checkbox, row));

        } else if (opt_rows) {
            checkbox.addEventListener('change', this._selectRow(checkbox, null, opt_rows));
        }

        label.appendChild(checkbox);
        new Checkbox(label);
        return label;
    }

});




compMgr.regComp({
    comp: Table,
    compAsString: 'u.Table',
    css: 'u-table'
});

if(document.readyState && document.readyState === 'complete') {
	compMgr.updateComp();
} else {
	on(window, 'load', function() {
		//扫描并生成控件
		compMgr.updateComp();
	});
}

export {Table};
