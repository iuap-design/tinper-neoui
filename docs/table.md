# table控件

表格控件提供了丰富的表格样式，其中有常用表格（u-table）、基本表格（u-table-base）、悬浮表格、边框表格、斑马线表格

常用表格：在基本表格的基础上添加了边框、表头背景色、悬浮特效。

其余表格控件样式也都是基于基本表格来实现的。

# 示例


##基本表格

基本的表格没有外边框、悬浮特效、只是一个最基本的表格,需要开发者在`table`标签上添加样式`u-table-base`
<div class="example-content"><table class="u-table-base">
    <thead>
        <tr>
            <th>#</th>
            <th>名</th>
            <th>姓氏</th>
            <th>用户名</th>
            <th>角色</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Teagan</td>
            <td>Prohaska</td>
            <td>@Elijah</td>
            <td>
                admin
            </td>
        </tr>
        <tr>
            <td>2</td>
            <td>Andy</td>
            <td>Gaylord</td>
            <td>@Ramiro</td>
            <td>
                member
            </td>
        </tr>
        <tr>
            <td>3</td>
            <td>Veronica</td>
            <td>Gusikowski</td>
            <td>@Maxime</td>
            <td>
                developer
            </td>
        </tr>
        <tr>
            <td>4</td>
            <td>Bruce</td>
            <td>Rogahn</td>
            <td>@Maggio</td>
            <td>
                supporter
            </td>
        </tr>
        <tr>
            <td>5</td>
            <td>Carolina</td>
            <td>Hickle</td>
            <td>@Hammes</td>
            <td>
                member
            </td>
        </tr>
        <tr>
            <td>6</td>
            <td>Madaline</td>
            <td>Eichmann</td>
            <td>@Amaya</td>
            <td>
                supporter
            </td>
        </tr>
    </tbody>
</table>
</div>

##边框表格
含有外边框的表格，需要在`table`标签上添加样式`u-table-base u-table-bordered`
<div class="example-content"><table class="u-table-base u-table-bordered">
    <thead>
        <tr>
            <th>#</th>
            <th>名</th>
            <th>姓氏</th>
            <th>用户名</th>
            <th>角色</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Teagan</td>
            <td>Prohaska</td>
            <td>@Elijah</td>
            <td>
                admin
            </td>
        </tr>
        <tr>
            <td>2</td>
            <td>Andy</td>
            <td>Gaylord</td>
            <td>@Ramiro</td>
            <td>
                member
            </td>
        </tr>
        <tr>
            <td>3</td>
            <td>Veronica</td>
            <td>Gusikowski</td>
            <td>@Maxime</td>
            <td>
                developer
            </td>
        </tr>
        <tr>
            <td>4</td>
            <td>Bruce</td>
            <td>Rogahn</td>
            <td>@Maggio</td>
            <td>
               supporter
            </td>
        </tr>
        <tr>
            <td>5</td>
            <td>Carolina</td>
            <td>Hickle</td>
            <td>@Hammes</td>
            <td>
                member
            </td>
        </tr>
        <tr>
            <td>6</td>
            <td>Madaline</td>
            <td>Eichmann</td>
            <td>@Amaya</td>
            <td>
                supporter
            </td>
        </tr>
    </tbody>
</table>
</div>

## 悬浮表格

悬浮表格指鼠标移动到表格中的某行时，出现浅蓝色背景特效，需要开发者在`table`标签上添加样式`u-table-base u-table-hover`
<div class="example-content">
<table class="u-table-base u-table-hover">
    <thead>
        <tr>
            <th>#</th>
            <th>名</th>
            <th>姓氏</th>
            <th>用户名</th>
            <th>角色</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Teagan</td>
            <td>Prohaska</td>
            <td>@Elijah</td>
            <td>
                admin
            </td>
        </tr>
        <tr>
            <td>2</td>
            <td>Andy</td>
            <td>Gaylord</td>
            <td>@Ramiro</td>
            <td>
                member
            </td>
        </tr>
        <tr>
            <td>3</td>
            <td>Veronica</td>
            <td>Gusikowski</td>
            <td>@Maxime</td>
            <td>
                developer
            </td>
        </tr>
        <tr>
            <td>4</td>
            <td>Bruce</td>
            <td>Rogahn</td>
            <td>@Maggio</td>
            <td>
               supporter
            </td>
        </tr>
        <tr>
            <td>5</td>
            <td>Carolina</td>
            <td>Hickle</td>
            <td>@Hammes</td>
            <td>
                member
            </td>
        </tr>
        <tr>
            <td>6</td>
            <td>Madaline</td>
            <td>Eichmann</td>
            <td>@Amaya</td>
            <td>
                supporter
            </td>
        </tr>
    </tbody>
</table>
</div>

##斑马线表格

斑马线表格的奇数行和偶数行的显示效果不同，需要开发者在`table`标签上添加样式`u-table-base u-table-striped`
<div class="example-content"><div class="example table-responsive">
    <table class="u-table-base u-table-striped">
        <thead>
            <tr>
                <th>#</th>
                <th>名</th>
                <th>姓氏</th>
                <th>用户名</th>
                <th>角色</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Teagan</td>
                <td>Prohaska</td>
                <td>@Elijah</td>
                <td>
                    admin
                </td>
            </tr>
            <tr>
                <td>2</td>
                <td>Andy</td>
                <td>Gaylord</td>
                <td>@Ramiro</td>
                <td>
                    member
                </td>
            </tr>
            <tr>
                <td>3</td>
                <td>Veronica</td>
                <td>Gusikowski</td>
                <td>@Maxime</td>
                <td>
                    developer
                </td>
            </tr>
            <tr>
                <td>4</td>
                <td>Bruce</td>
                <td>Rogahn</td>
                <td>@Maggio</td>
                <td>
                   supporter
                </td>
            </tr>
            <tr>
                <td>5</td>
                <td>Carolina</td>
                <td>Hickle</td>
                <td>@Hammes</td>
                <td>
                    member
                </td>
            </tr>
            <tr>
                <td>6</td>
                <td>Madaline</td>
                <td>Eichmann</td>
                <td>@Amaya</td>
                <td>
                    supporter
                </td>
            </tr>
        </tbody>
    </table>
</div></div>

##常用table
常用表格的表头含有背景色，表格整体具有边框，悬浮到tr上会有蓝色特效。开发者需要在`table`标签上添加样式`u-table`。
<div class="example-content"><table class="u-table">
    <thead>
        <tr>
            <th>名称</th>
            <th>数量</th>
            <th>单价</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>iphone 6</td>
            <td>25</td>
            <td>$2.90</td>
        </tr>
        <tr class="is-selected">
            <td>小米Note</td>
            <td>50</td>
            <td>$1.25</td>
        </tr>
        <tr>
            <td>华为P8</td>
            <td>10</td>
            <td>$2.35</td>
        </tr>
    </tbody>
</table>
</div>


<!--### 示例1

示例1说明

### 示例2

示例2说-->
