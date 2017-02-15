# 数据统计卡片

数字统计卡片由一些[辅助类样式](http://design.yyuap.com/dist/pages/global-style/utilities.html)、[色彩](http://design.yyuap.com/dist/pages/global-style/color.html)、`u-counter`等样式实现。




## 多尺寸数据统计卡片

* `.u-counter-lg` - 大尺寸卡片
* `.u-counter-md` - 中尺寸卡片
* `.u-counter-sm` - 小尺寸卡片


<div class="example-content"><div class="u-row">

    <div class="u-col-4">
        <div class="u-counter-content padding-25 bg-blue-100">
            <div class="u-counter u-counter-lg">
                <div class="u-counter-number-group">
                    <span class="u-counter-number-related">-</span>
                    <span class="u-counter-number">60</span>
                </div>
                <div class="u-counter-label text-uppercase">points</div>
            </div>
        </div>
    </div>
    <div class="u-col-4">
        <div class="u-counter-content padding-25 bg-blue-100">
            <div class="u-counter u-counter-md">
                <div class="u-counter-number-group">
                    <span class="u-counter-number-related">-</span>
                    <span class="u-counter-number">60</span>
                </div>
                <div class="u-counter-label text-uppercase">points</div>
            </div>
        </div>
    </div>
    <div class="u-col-4">
        <div class="u-counter-content padding-25 bg-blue-100">
            <div class="u-counter u-counter-sm">
                <div class="u-counter-number-group">
                    <span class="u-counter-number-related">-</span>
                    <span class="u-counter-number">60</span>
                </div>
                <div class="u-counter-label text-uppercase">points</div>
            </div>
        </div>
    </div>
</div>
</div>
<div class="examples-code"><pre><code>&lt;div class="u-counter-content padding-25">
    &lt;div class="u-counter u-counter-lg">
        &lt;span class="u-counter-number">60&lt;/span>
        &lt;div class="u-counter-label text-uppercase">u-counters&lt;/div>
    &lt;/div>
&lt;/div></code></pre>
</div>




[试一试](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/ui/cards)