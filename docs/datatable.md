# datatable控件

datatable控件

# 如何使用

暂无

# 示例


##基础datatable

复原色`<div>`添加`.table-responsive`


<style>.u-table-base{
    width: 600px;
}
</style>
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
<div class="examples-code"><pre><code>.u-table-base{
    width: 600px;
}</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;table class="u-table">
    &lt;thead>
        &lt;tr>
            &lt;th>名称&lt;/th>
            &lt;th>数量&lt;/th>
            &lt;th>单价&lt;/th>
        &lt;/tr>
    &lt;/thead>
    &lt;tbody>
        &lt;tr>
            &lt;td>iphone 6&lt;/td>
            &lt;td>25&lt;/td>
            &lt;td>$2.90&lt;/td>
        &lt;/tr>
        &lt;tr class="is-selected">
            &lt;td>小米Note&lt;/td>
            &lt;td>50&lt;/td>
            &lt;td>$1.25&lt;/td>
        &lt;/tr>
        &lt;tr>
            &lt;td>华为P8&lt;/td>
            &lt;td>10&lt;/td>
            &lt;td>$2.35&lt;/td>
        &lt;/tr>
    &lt;/tbody>
&lt;/table></code></pre>
</div>

##基础datatable


父元素`<div>`上添加`.table-responsive`
`<talbe>`上添加`.u-table-hover`后鼠标经过表行 具有背景色

<style>/*#demoLeft{
	width:40%;
	border: 1px solid #EEEEEE;
	min-height: 200px;
}*/
</style>
<div class="example-content"><div class="example table-responsive">
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
</div>
<div class="examples-code"><pre><code>/*#demoLeft{
	width:40%;
	border: 1px solid #EEEEEE;
	min-height: 200px;
}*/</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;div class="example table-responsive">
    &lt;table class="u-table-base u-table-hover">
        &lt;thead>
            &lt;tr>
                &lt;th>#&lt;/th>
                &lt;th>名&lt;/th>
                &lt;th>姓氏&lt;/th>
                &lt;th>用户名&lt;/th>
                &lt;th>角色&lt;/th>
            &lt;/tr>
        &lt;/thead>
        &lt;tbody>
            &lt;tr>
                &lt;td>1&lt;/td>
                &lt;td>Teagan&lt;/td>
                &lt;td>Prohaska&lt;/td>
                &lt;td>@Elijah&lt;/td>
                &lt;td>
                    admin
                &lt;/td>
            &lt;/tr>
            &lt;tr>
                &lt;td>2&lt;/td>
                &lt;td>Andy&lt;/td>
                &lt;td>Gaylord&lt;/td>
                &lt;td>@Ramiro&lt;/td>
                &lt;td>
                    member
                &lt;/td>
            &lt;/tr>
            &lt;tr>
                &lt;td>3&lt;/td>
                &lt;td>Veronica&lt;/td>
                &lt;td>Gusikowski&lt;/td>
                &lt;td>@Maxime&lt;/td>
                &lt;td>
                    developer
                &lt;/td>
            &lt;/tr>
            &lt;tr>
                &lt;td>4&lt;/td>
                &lt;td>Bruce&lt;/td>
                &lt;td>Rogahn&lt;/td>
                &lt;td>@Maggio&lt;/td>
                &lt;td>
                   supporter
                &lt;/td>
            &lt;/tr>
            &lt;tr>
                &lt;td>5&lt;/td>
                &lt;td>Carolina&lt;/td>
                &lt;td>Hickle&lt;/td>
                &lt;td>@Hammes&lt;/td>
                &lt;td>
                    member
                &lt;/td>
            &lt;/tr>
            &lt;tr>
                &lt;td>6&lt;/td>
                &lt;td>Madaline&lt;/td>
                &lt;td>Eichmann&lt;/td>
                &lt;td>@Amaya&lt;/td>
                &lt;td>
                    supporter
                &lt;/td>
            &lt;/tr>
        &lt;/tbody>
    &lt;/table>
&lt;/div></code></pre>
</div>

##基础datatable


父元素`<div>`上添加`.table-responsive`
`<talbe>`上`.u-table-bordered`

<style>.u-table-base{
    width: 600px;
}
</style>
<div class="example-content"><div class="example table-responsive">
    <table class="u-table-base u-table-bordered">
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
</div>
<div class="examples-code"><pre><code>.u-table-base{
    width: 600px;
}</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;div class="example table-responsive">
    &lt;table class="u-table-base u-table-bordered">
        &lt;thead>
            &lt;tr>
                &lt;th>#&lt;/th>
                &lt;th>名&lt;/th>
                &lt;th>姓氏&lt;/th>
                &lt;th>用户名&lt;/th>
                &lt;th>角色&lt;/th>
            &lt;/tr>
        &lt;/thead>
        &lt;tbody>
            &lt;tr>
                &lt;td>1&lt;/td>
                &lt;td>Teagan&lt;/td>
                &lt;td>Prohaska&lt;/td>
                &lt;td>@Elijah&lt;/td>
                &lt;td>
                    admin
                &lt;/td>
            &lt;/tr>
            &lt;tr>
                &lt;td>2&lt;/td>
                &lt;td>Andy&lt;/td>
                &lt;td>Gaylord&lt;/td>
                &lt;td>@Ramiro&lt;/td>
                &lt;td>
                    member
                &lt;/td>
            &lt;/tr>
            &lt;tr>
                &lt;td>3&lt;/td>
                &lt;td>Veronica&lt;/td>
                &lt;td>Gusikowski&lt;/td>
                &lt;td>@Maxime&lt;/td>
                &lt;td>
                    developer
                &lt;/td>
            &lt;/tr>
            &lt;tr>
                &lt;td>4&lt;/td>
                &lt;td>Bruce&lt;/td>
                &lt;td>Rogahn&lt;/td>
                &lt;td>@Maggio&lt;/td>
                &lt;td>
                   supporter
                &lt;/td>
            &lt;/tr>
            &lt;tr>
                &lt;td>5&lt;/td>
                &lt;td>Carolina&lt;/td>
                &lt;td>Hickle&lt;/td>
                &lt;td>@Hammes&lt;/td>
                &lt;td>
                    member
                &lt;/td>
            &lt;/tr>
            &lt;tr>
                &lt;td>6&lt;/td>
                &lt;td>Madaline&lt;/td>
                &lt;td>Eichmann&lt;/td>
                &lt;td>@Amaya&lt;/td>
                &lt;td>
                    supporter
                &lt;/td>
            &lt;/tr>
        &lt;/tbody>
    &lt;/table>
&lt;/div></code></pre>
</div>

##常用datatable

也是最基本的表格
表头与表体背景色区分，表体斑马背景区分。表格整体具有边框




<style>.u-table-base{
    width: 600px;
}
</style>
<div class="example-content"><div class="example table-responsive">
    <table class="u-table-base">
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
</div>
<div class="examples-code"><pre><code>.u-table-base{
    width: 600px;
}</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;div class="example table-responsive">
    &lt;table class="u-table-base">
        &lt;thead>
            &lt;tr>
                &lt;th>#&lt;/th>
                &lt;th>名&lt;/th>
                &lt;th>姓氏&lt;/th>
                &lt;th>用户名&lt;/th>
                &lt;th>角色&lt;/th>
            &lt;/tr>
        &lt;/thead>
        &lt;tbody>
            &lt;tr>
                &lt;td>1&lt;/td>
                &lt;td>Teagan&lt;/td>
                &lt;td>Prohaska&lt;/td>
                &lt;td>@Elijah&lt;/td>
                &lt;td>
                    admin
                &lt;/td>
            &lt;/tr>
            &lt;tr>
                &lt;td>2&lt;/td>
                &lt;td>Andy&lt;/td>
                &lt;td>Gaylord&lt;/td>
                &lt;td>@Ramiro&lt;/td>
                &lt;td>
                    member
                &lt;/td>
            &lt;/tr>
            &lt;tr>
                &lt;td>3&lt;/td>
                &lt;td>Veronica&lt;/td>
                &lt;td>Gusikowski&lt;/td>
                &lt;td>@Maxime&lt;/td>
                &lt;td>
                    developer
                &lt;/td>
            &lt;/tr>
            &lt;tr>
                &lt;td>4&lt;/td>
                &lt;td>Bruce&lt;/td>
                &lt;td>Rogahn&lt;/td>
                &lt;td>@Maggio&lt;/td>
                &lt;td>
                   supporter
                &lt;/td>
            &lt;/tr>
            &lt;tr>
                &lt;td>5&lt;/td>
                &lt;td>Carolina&lt;/td>
                &lt;td>Hickle&lt;/td>
                &lt;td>@Hammes&lt;/td>
                &lt;td>
                    member
                &lt;/td>
            &lt;/tr>
            &lt;tr>
                &lt;td>6&lt;/td>
                &lt;td>Madaline&lt;/td>
                &lt;td>Eichmann&lt;/td>
                &lt;td>@Amaya&lt;/td>
                &lt;td>
                    supporter
                &lt;/td>
            &lt;/tr>
        &lt;/tbody>
    &lt;/table>
&lt;/div></code></pre>
</div>

##斑马datatable


表体斑马背景区分两行
`<table>`上添`.u-table-striped`

<style>.u-table-base{
    width: 600px;
}
</style>
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
</div>
</div>
<div class="examples-code"><pre><code>.u-table-base{
    width: 600px;
}</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;div class="example table-responsive">
    &lt;table class="u-table-base u-table-striped">
        &lt;thead>
            &lt;tr>
                &lt;th>#&lt;/th>
                &lt;th>名&lt;/th>
                &lt;th>姓氏&lt;/th>
                &lt;th>用户名&lt;/th>
                &lt;th>角色&lt;/th>
            &lt;/tr>
        &lt;/thead>
        &lt;tbody>
            &lt;tr>
                &lt;td>1&lt;/td>
                &lt;td>Teagan&lt;/td>
                &lt;td>Prohaska&lt;/td>
                &lt;td>@Elijah&lt;/td>
                &lt;td>
                    admin
                &lt;/td>
            &lt;/tr>
            &lt;tr>
                &lt;td>2&lt;/td>
                &lt;td>Andy&lt;/td>
                &lt;td>Gaylord&lt;/td>
                &lt;td>@Ramiro&lt;/td>
                &lt;td>
                    member
                &lt;/td>
            &lt;/tr>
            &lt;tr>
                &lt;td>3&lt;/td>
                &lt;td>Veronica&lt;/td>
                &lt;td>Gusikowski&lt;/td>
                &lt;td>@Maxime&lt;/td>
                &lt;td>
                    developer
                &lt;/td>
            &lt;/tr>
            &lt;tr>
                &lt;td>4&lt;/td>
                &lt;td>Bruce&lt;/td>
                &lt;td>Rogahn&lt;/td>
                &lt;td>@Maggio&lt;/td>
                &lt;td>
                   supporter
                &lt;/td>
            &lt;/tr>
            &lt;tr>
                &lt;td>5&lt;/td>
                &lt;td>Carolina&lt;/td>
                &lt;td>Hickle&lt;/td>
                &lt;td>@Hammes&lt;/td>
                &lt;td>
                    member
                &lt;/td>
            &lt;/tr>
            &lt;tr>
                &lt;td>6&lt;/td>
                &lt;td>Madaline&lt;/td>
                &lt;td>Eichmann&lt;/td>
                &lt;td>@Amaya&lt;/td>
                &lt;td>
                    supporter
                &lt;/td>
            &lt;/tr>
        &lt;/tbody>
    &lt;/table>
&lt;/div></code></pre>
</div>


<!--### 示例1

示例1说明

### 示例2

示例2说-->

# API

## 属性

暂无
<!--### 属性1

属性1说明

### 属性2

属性2说明-->

## 方法

暂无
<!--### 方法1

方法1说明

### 方法2

方法2说明-->
