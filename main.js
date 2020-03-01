const btop = $('#project').offset().top

$(window).ready(function() {
    const date = new Date().toISOString().split('T')[0].split('-')
    $('#today').html(`${date[0]}.<span class="dot7">${date[1]}.${date[2]}.</span>`)

    jQuery(function($) {
        $('#rss-feeds').rss('https://rss.blog.naver.com/kim04099',
        {
            ssl: 'true',
            support: false,
            layoutTemplate: '{entries}',
            entryTemplate: `
                <div class="sbox link" onclick="window.open('{url}', '_blank')">
                    <div style="margin:8px 0"><span class="nametag">{category}</span></div>
                    <h2>{title}</h2>
                    <p>{shortBody}...</p>
                    <h4>{date}</h4>
                </div>`,
            tokens: {
                category: function(entry) {
                    return entry.categories[0].name
                }
            },
            dateFormatFunction: function(date){
                return getTimeSince(date)
            },
            error: function(){
                $('#rss-feeds').text('오류가 발생하여 불러올 수 없습니다.')
            }
        })
    })
})

$(window).scroll(function() {
    const x = window.scrollY

    switch(true) {
        case (x >= 0 && x < 100):
            $('#social.sec-cont').css('min-height', `0vh`)
            break
        case (x >= 100 && x < btop):
            $('#social.sec-cont').css('min-height', `100vh`)
            break
    }
})

var a = 0

function getTimeSince(date) {
    var sec = Math.floor((new Date() - new Date(date)) / 1000)
    var int = Math.floor(sec / 604800)
    if (int >= 1) {
        return int + '주 전'
    }
    int = Math.floor(sec / 86400);
    if (int >= 1) {
        return int + '일 전'
    }
    return '<span style="color:red">NEW</span>'
}

function scrollAnimation() {
    $('header').css('top', -Math.min(500, $(window).scrollTop())/2 + 'px')
}

function scrollPage(somewhere) {
    var num = 0
    switch(somewhere) {
        case 0:
            num = 0
            break
        default:
            num = $(somewhere).offset().top
    }
    window.scroll({ top: num, left: 0, behavior: "smooth" })
}

setInterval(scrollAnimation, 100)
