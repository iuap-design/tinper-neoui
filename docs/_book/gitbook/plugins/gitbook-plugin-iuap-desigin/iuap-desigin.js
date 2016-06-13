require(['gitbook', 'jQuery', 'lodash'], function (gitbook, $, _) {

	gitbook.events.bind('start', function () {
	});

	gitbook.events.bind('page.change', function () {

		var $body = $('body');
		var $book = $('.book');  //文档部分
		var $summary = $('.book-summary'); // 文档左侧目录
		var $bookBody = $('.book-body'); //文档右侧主体

		/* 左侧目录修改 begin */
			
		var $summaryUl = $('ul',$summary);
		var $firstLi = $('li:first',$summaryUl);
		$firstLi.remove(); //去掉介绍
		var $dividerLi = $('.divider',$summaryUl);
		var $dividerLiNext = $('.divider + li',$summaryUl);
		$dividerLi.remove(); //删除下面横线及之后的li
		$dividerLiNext.remove();

		var $summaryAB = $('a b',$summary); 
		$summaryAB.remove();// 去掉目录的编号
		/* 左侧目录修改 end */

		/* 右侧主体修改 begin */

		var $bookHeadr = $('.book-header',$bookBody);
		$bookHeadr.remove();

		// 将超链接放到page-wrapper的最后
		var $pageWrapper = $('.page-wrapper');
		var $prevA = $('.navigation-prev',$bookBody);
		var $nextA = $('.navigation-next',$bookBody);
		$pageWrapper.append($prevA);
		$pageWrapper.append($nextA);
		/* 右侧主体修改 end */


		/* 主体引入uui内容 */
		var ctx = 'http://iuap.yonyou.com/fe';
		var tpl = [
			'<link rel="stylesheet" href="'+ ctx +'/vendor/font-awesome/css/font-awesome.css">',
	       	'<link rel="stylesheet" type="text/css" href="'+ ctx +'/vendor/uui/css/u.css">',
	       	'<link rel="stylesheet" type="text/css" href="'+ ctx +'/vendor/uui/css/u-extend.css">',
		    '<link rel="stylesheet" type="text/css" href="'+ ctx +'/vendor/uui/css/tree.css">',
	        '<link rel="stylesheet" type="text/css" href="'+ ctx +'/vendor/uui/css/grid.css">',
	        '<script src="'+ ctx +'/vendor/jquery/jquery-1.11.2.js"></script>',
	    	'<script src="'+ ctx +'/vendor/knockout/knockout-3.2.0.debug.js"></script>',
	        '<script src="'+ ctx +'/vendor/uui/js/u-polyfill.js"></script>',
	        '<script src="'+ ctx +'/vendor/uui/js/u.js"></script>',
	        '<script src="'+ ctx +'/vendor/uui/js/u-tree.js"></script>',
	        '<script src="'+ ctx +'/vendor/uui/js/u-grid.js"></script>',
        ]
        var tplStr = tpl.join('\r\n');

        document.write(tplStr);
        var $html = $('html');
        $html.css('font-size','62.5%');

        /* 主体引入uui内容 */
	});
});
