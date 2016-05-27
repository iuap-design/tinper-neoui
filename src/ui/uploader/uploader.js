/**
 * 文件上传控件
 */
+ function($) {

	function Uploader(options) {
		this.options = options || {};

		this.init(options);
	}

	Uploader.prototype = {
		// init dom and upload
		init: function(options) {
			this.render(options.container);
			this.uploaderInit(options);
			// this.uploadBeforeSend();
			this.eventBind();
		},

		// create DOM
		render: function(dom) {
			var tpls = '<div class="picker">选择文件</div>' +
				'<button class="ctlBtn btn btn-default">开始上传</button>';

			if (!$('#thelist').length)
				$('body').append(
					'<div class="file_wrap">' +
					'<h3>正在上传：<strong id="suc">0</strong>/<strong id="count"></strong><img class="close_all" src="images/close.png" alt="关闭" /></h3>' +
					'<div id="thelist" class="uploader-list"></div>' +
					'</div>'
				);

			dom.append(tpls);
		},

		// init uploader class
		uploaderInit: function(opt) {
			this.uploader = WebUploader.create({

				// swf文件路径
				swf: './swf/Uploader.swf?v=' + Math.random(),

				// 文件接收服务端。
				server: '/upload',

				// 选择文件的按钮。可选。
				pick: '.picker',

				// 是否开启自动上传
				// auto: true,

				// 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
				// resize: false,

				// 允许的文件类型
				// accept: [
				// 	{
				//      title: 'Images',
				//      extensions: 'gif,jpg,jpeg,bmp,png',
				//      mimeTypes: 'image/*'
				//  },
				// 	{
				//      title: 'Text',
				//      extensions: 'pdf,txt',
				//      mimeTypes: 'text/*,application/*'
				//  },
				// 	{
				//      title: 'application',
				//      extensions: 'exe,zip,mp3',
				//      mimeTypes: 'audio/*,vedio/*,application/*'
				//  }

				// ],

				// 是否要分片处理大文件上传
				chunked: true,
				chunkSize: 5 * 1024 * 1024,
				// chunkRetry: 4,
				// sendAsBinary: true,
				// 允许的并发数
				threads: 20

				// dnd: '#dnd',
				// 验证文件总数量, 超出则不允许加入队列
				// fileNumLimit: 20,

				// 验证文件总大小是否超出限制,超出则不允许加入队列 5242880 = 5M
				// fileSizeLimit: 5242880,

				// 验证单个文件大小是否超出限制, 超出则不允许加入队列 5242880 = 5M
				// fileSingleSizeLimit: 1024 * 1024,
			});

			// this.addBtn(opt.btnID, opt.btnTxt);

		},

		addBtn: function(id, txt) {
			this.uploader.addButton({
				id: '#' + id,
				innerHTML: txt
			});
		},

		eventBind: function() {
			this.fileQueued();

			this.btnClick();
		},

		uploadBeforeSend: function() {
			var setHeader = function(object, data, headers) {
				headers['Access-Control-Allow-Origin'] = '*';
				headers['Access-Control-Request-Headers'] = 'content-type';
				headers['Access-Control-Request-Method'] = 'POST';
			}
			this.uploader.on('uploadBeforeSend ', setHeader);
		},

		// step 2 显示用户选择，当有文件被添加进队列的时候
		fileQueued: function() {
			var uploader = this.uploader;
			var _this = this;

			uploader.on('fileQueued', function(file) {
				var $list = $('#thelist');

				$('.file_wrap').css({
					'display': 'block'
				});

				$list.append('<div id="' + file.id + '" class="item">' +
					'<h4 class="info">' + file.name + '</h4>' +
					'<span>' + (file.size / (1024 * 1024)).toFixed(2) + 'M</span>' +
					'<p class="state">等待上传...</p>' +
					'<img class="close_item" src="images/itemcancel.png" alt="关闭" />' +
					'</div>');

				_this.closeRelative();

				$('#count').html(uploader.getFiles().length);

			});
		},

		// step 3 文件上传过程中创建进度条实时显示。
		uploadProgress: function() {
			var uploader = this.uploader;
			uploader.on('uploadProgress', function(file, percentage) {

				var $li = $('#' + file.id),
					$percent = $li.find('.progress .progress-bar');

				// 避免重复创建
				if (!$percent.length) {
					$percent = $('<div class="progress progress-striped active">' +
						'<div class="progress-bar" role="progressbar" style="width: 0%">' +
						'</div>' +
						'</div>').appendTo($li).find('.progress-bar');
				}

				$li.find('p.state').text('上传中');

				$percent.css('width', percentage * 100 + '%');
			});
		},
		sucCount: 0,
		// step 4 文件上传成功或失败的处理
		handle: function() {
			var uploader = this.uploader;
			var _this = this;

			uploader.on('uploadSuccess', function(file) {
				$('#' + file.id).find('p.state').text('已上传');
				$('#suc').html(++_this.sucCount);
			});

			uploader.on('uploadError', function(file) {
				$('#' + file.id).find('p.state').text('上传出错');
			});

			uploader.on('uploadComplete', function(file) {
				$('#' + file.id).find('.progress').fadeOut();
			});
		},

		// step 5 点击上传
		btnClick: function() {
			var _this = this;

			$('.ctlBtn').on('click', function(e) {
				_this.uploader.upload();
			});

			this.uploadProgress();
			this.handle();
		},

		closeRelative: function() {
			var close_all = $('.close_all');
			var close_item = $('.close_item');
			var file_wrap = $('.file_wrap');

			close_all.on('click', function(e) {
				file_wrap.css({
					'display': 'none'
				});
			});

			for (var i = 0; i < close_item.length; i++) {
				$(close_item[i]).on('click', function(e) {
					$(this).parent().remove();
				});
			};
		}
	};

	$.Uploader = Uploader

}($);