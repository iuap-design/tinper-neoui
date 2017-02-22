# table控件

表格控件提供了丰富的表格样式，其中有常用表格（u-table）、基本表格（u-table-base）、悬浮表格、边框表格、斑马线表格

常用表格：在基本表格的基础上添加了边框、表头背景色、悬浮特效。

其余表格控件样式也都是基于基本表格来实现的。

# 示例




## 基本表格

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



<div class="ex-code-par"><button  class="u-button u-button-block u-button-accent margin-top-15 codeOptBtn" ><i class="uf uf-arrow-down"></i>查看代码</button><div class="examples-code"><pre><code>
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
</code></pre>
</div>



</div>

## 边框表格
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



<div class="ex-code-par"><button  class="u-button u-button-block u-button-accent margin-top-15 codeOptBtn" ><i class="uf uf-arrow-down"></i>查看代码</button><div class="examples-code"><pre><code>
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
</code></pre>
</div>



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



<div class="ex-code-par"><button  class="u-button u-button-block u-button-accent margin-top-15 codeOptBtn" ><i class="uf uf-arrow-down"></i>查看代码</button><div class="examples-code"><pre><code>

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
</code></pre>
</div>



</div>

## 常用table
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



<div class="ex-code-par"><button  class="u-button u-button-block u-button-accent margin-top-15 codeOptBtn" ><i class="uf uf-arrow-down"></i>查看代码</button><div class="examples-code"><pre><code>
&lt;table class="u-table">
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
&lt;/table>
</code></pre>
</div>



</div>

## 斑马线表格

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



<div class="ex-code-par"><button  class="u-button u-button-block u-button-accent margin-top-15 codeOptBtn" ><i class="uf uf-arrow-down"></i>查看代码</button><div class="examples-code"><pre><code>
&lt;div class="example table-responsive">
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



</div>