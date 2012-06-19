var semantico = semantico || {};

semantico.load = semantico.load || function () {

    var toSelectorStr, getTop, titles, toc, tocList, pageNav, origPos, posToc;

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
            subs  += '<li><a href="#' + id + '">' + text + '</a></li>';
        });
        if (h2s.length != 0) {
           subs = '<ul>' + subs + '</ul>';
        }
        toc   += '<li><a href="#' + id + '">' + text + '</a>' + subs + '</li>';
    });

    tocList.html(toc);

    pageNav = $('#fixed-nav');
    origPos = tocList.offset().top;

    posToc = function (e) {
        if (getTop() > origPos) {
            pageNav.addClass('container-over-fixed');
            return
        }
        pageNav.removeClass('container-over-fixed');
    };

    posToc();
    $(window).on('scroll', posToc);

};

$(semantico.load);
