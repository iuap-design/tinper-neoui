u.slidePanelTemplate = ['<div class="slidePanel slidePanel-right  slidePanel-show slidePanel-dragging" style="transform:translate3d(100%,0,0);">',
    '<div class="slidePanel-content site-sidebar-content"></div>',
    '<div class="slidePanel-handler"></div>',
    '</div>']


u.slidePanel = function (options) {
    var url = options['url'],
        width = options['width'] || '700px',
        callback = options['callback'] || function () {
            },
        slideDom = u.makeDOM(u.slidePanelTemplate.join('')),
        overlayDiv = u.makeModal(slideDom);
    slideDom.style.width = width;
    overlayDiv.style.opacity = 0;
    document.body.appendChild(slideDom);
    //overlayDiv.style.opacity = 0.5;
    u.ajax({
        type: 'get',
        url: url,
        success: function (data) {
            var content = slideDom.querySelector('.slidePanel-content');
            content.innerHTML = data;
            callback();
            setTimeout(function () {
                slideDom.style.transform = 'translate3d(0,0,0)';
                overlayDiv.style.opacity = 0.5;
            }, 1);
        }
    })

    u.on(overlayDiv, 'click', function () {
        u.on(slideDom, 'transitionend', function () {
            document.body.removeChild(slideDom);
            document.body.removeChild(overlayDiv);
        });
        u.on(slideDom, 'webkitTransitionEnd', function () {
            document.body.removeChild(slideDom);
            document.body.removeChild(overlayDiv);
        });
        slideDom.style.transform = 'translate3d(100%,0,0)';
        overlayDiv.style.opacity = 0;
    })

    return {
        close: function () {
            overlayDiv.click();
        }
    }

}
