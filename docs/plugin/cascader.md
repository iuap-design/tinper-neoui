## 级联组件

级联组件


### 基础checkbox
在复选框中input元素添加如下属性来实现多种效果

- `checked` 选中
- `disabled` 不可用

<div class="examples-code"><pre><code>

&lt;label  class="u-checkbox">
    &lt;input type="checkbox" class="u-checkbox-input" checked>
    &lt;span class="u-checkbox-label">Checkbox&lt;/span>
&lt;/label>
&lt;label  class="u-checkbox">
    &lt;input type="checkbox" class="u-checkbox-input" >
    &lt;span class="u-checkbox-label">Checkbox&lt;/span>
&lt;/label>
&lt;label  class="u-checkbox"  >
    &lt;input type="checkbox" class="u-checkbox-input" disabled>
    &lt;span class="u-checkbox-label">Checkbox&lt;/span>
&lt;/label>
&lt;label  class="u-checkbox">
    &lt;input type="checkbox" class="u-checkbox-input" disabled checked>
    &lt;span class="u-checkbox-label">Checkbox&lt;/span>
&lt;/label>
</code></pre>
</div>





### 不同颜色的checkbox
在复选框中label里面添加如下样式来实现不同色彩的复选框

- `u-checkbox-success` 绿色
- `u-checkbox-info` 蓝色
- `u-checkbox-warning` 黄色
- `u-checkbox-danger` 红色
- `u-checkbox-dark` 灰色

<div class="examples-code"><pre><code>
&lt;label  class="u-checkbox u-checkbox-success w-xs">
    &lt;input type="checkbox" class="u-checkbox-input"  checked>
    &lt;span class="u-checkbox-label">green&lt;/span>
&lt;/label>

&lt;label  class="u-checkbox u-checkbox-info w-xs">
    &lt;input type="checkbox" class="u-checkbox-input"  checked>
    &lt;span class="u-checkbox-label">blue&lt;/span>
&lt;/label>
&lt;label  class="u-checkbox u-checkbox-warning w-xs">
    &lt;input type="checkbox" class="u-checkbox-input"  checked>
    &lt;span class="u-checkbox-label">yellow&lt;/span>
&lt;/label>
&lt;label  class="u-checkbox u-checkbox-danger w-xs">
    &lt;input type="checkbox" class="u-checkbox-input"  checked>
    &lt;span class="u-checkbox-label">red&lt;/span>
&lt;/label>
&lt;label  class="u-checkbox u-checkbox-dark w-xs">
    &lt;input type="checkbox" class="u-checkbox-input"  checked>
    &lt;span class="u-checkbox-label">grey&lt;/span>
&lt;/label></code></pre>
</div>



