var semantico = window.semantico || {};

semantico.load = semantico.load || function () {

    var toSelectorStr, getTop, titles, toc, tocList, navWrap, pageNav, origPos, posToc, tocItems, code;

    toSelectorStr = function (str) {
        str = '' + str;
        return ( window.jQuery ? $.trim(str) : str.trim() ).toLowerCase().replace(/\s+/g, '-');
    };

    getTop = function (e) {
        return window.jQuery ? $(e).scrollTop().top : e.pageYOffset;
    };

    $('h1,h2,h3,h4').each(function() {
        this.id = '_' + toSelectorStr($(this).text());
    });

    titles  = $('.intro h1:nth-child(1)');
    toc     = "";
    tocList = $('#toc');

    if (tocList.length === 0) return;

    titles.each(function (i, el) {
        var $this, text, id, h2s, subs;
        $this = $(el);
        text  = $this.text();
        id    = el.id;
        h2s   = $('h2', $this.closest('section'));
        subs  = '';
        h2s.each(function (i, el) {
            var $this, text, id;
            $this = $(el);
            text  = $this.text();
            id    = el.id;
            subs  += '<li><a class="toc-tier-2" href="#' + id + '">' + text + '</a></li>';
        });
        if (h2s.length !== 0) subs = '<ul class="toc-sub">' + subs + '</ul>';
        toc += '<li><a class="toc-tier-1" href="#' + id + '">' + text + '</a>' + subs + '</li>';
    });

    tocList.html(toc);

    navWrap = $('#fixed-nav');
    pageNav = $('#page-navigation');
    origPos = tocList.offset().top;

    posToc = function (e) {
        navWrap[getTop(window) > origPos ? 'addClass' : 'removeClass']('container-over-fixed');
        pageNav.css('max-height', $(window).height() - 72);
    };

    posToc();
    $(window).on('scroll', posToc);

    tocItems = $('a', tocList);
    $(window).on('scroll.scrollto', function (e) {
        var t, l, i;
        t = getTop(window);
        l = tocItems.length;

        for (i = 0; i < l; i++) {
            
        }

    });

    code = $('pre>code');

    yepnope({
        test:     code.length > 0,
        yep:      '/standards/static/js/highlight.pack.js',
        callback: function () {
            code.each(function (i, el) {
                hljs.highlightBlock(el);
            });
        }
    });

};

$(semantico.load);
