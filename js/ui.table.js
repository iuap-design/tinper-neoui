u.Table = u.BaseComponent.extend({
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

            //if (this.element_.classList.contains(this._CssClasses.SELECTABLE)) {
            //    var th = document.createElement('th');
            //    var headerCheckbox = this._createCheckbox(null, rows);
            //    th.appendChild(headerCheckbox);
            //    firstHeader.parentElement.insertBefore(th, firstHeader);
            //
            //    for (var i = 0; i < rows.length; i++) {
            //        var firstCell = rows[i].querySelector('td');
            //        if (firstCell) {
            //            var td = document.createElement('td');
            //            if (rows[i].parentNode.nodeName.toUpperCase() === 'TBODY') {
            //                var rowCheckbox = this._createCheckbox(rows[i]);
            //                td.appendChild(rowCheckbox);
            //            }
            //            rows[i].insertBefore(td, firstCell);
            //        }
            //    }
            //    this.element_.classList.add(this._CssClasses.IS_UPGRADED);
            //}
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
        new u.Checkbox(label);
        return label;
    }

});



if (u.compMgr)
    u.compMgr.regComp({
        comp: u.Table,
        compAsString: 'u.Table',
        css: 'u-table'
    })