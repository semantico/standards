var semantico = semantico || {};

semantico.load = semantico.load || function () {

    var toSelectorStr, getTop, titles, toc, tocList, navWrap, pageNav, origPos, posToc;

    toSelector = function (str) {
        str = '' + str;
        return ( window.jQuery ? $.trim(str) : str.trim() ).toLowerCase().replace(/\s+/g, '-');
    }

    getTop = function () {
        return window.jQuery !== undefined ? $(window).scrollTop().top : window.pageYOffset;
    };

    titles  = $('.intro h1:nth-child(1)');
    toc     = "";
    tocList = $('#toc')

    if (tocList.length == 0) return;

    titles.each(function (i, el) {
        var $this, text, id, h2s, subs;
        $this = $(el);
        text  = $this.text();
        id    = '_' + toSelector(text);
        el.id = id;
        h2s   = $('h2', $this.closest('section'));
        subs  = "";
        h2s.each(function (i, el) {
            var $this, text, id;
            $this = $(el);
            text  = $this.text();
            id    = '_' + toSelector(text);
            el.id = id;
            subs  += '<li><a class="toc-tier-2" href="#' + id + '">' + text + '</a></li>';
        });
        if (h2s.length != 0) {
           subs = '<ul class="toc-sub">' + subs + '</ul>';
        }
        toc   += '<li><a class="toc-tier-1" href="#' + id + '">' + text + '</a>' + subs + '</li>';
    });

    tocList.html(toc);

    navWrap = $('#fixed-nav');
    pageNav = $('#page-navigation');
    origPos = tocList.offset().top;

    posToc = function (e) {
        navWrap[getTop() > origPos ? 'addClass' : 'removeClass']('container-over-fixed')
        pageNav.css('max-height', $(window).height());
    };

    posToc();
    $(window).on('scroll', posToc);

};

$(semantico.load);
