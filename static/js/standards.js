var semantico = semantico || {};

semantico.load = semantico.load || function () {

    var toSelectorStr, titles, toc, tocList;

    toSelector = function (str) {
        str = '' + str;
        return (window.jQuery ? $.trim(str) : str.trim()).toLowerCase().replace(/\s+/g, '-');
    }

    titles = $('.intro h1:nth-child(1)');
    toc    = "";

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

    tocList = $('#toc').html(toc);

};

$(semantico.load);
