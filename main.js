const btop = $('#project').offset().top

$(window).ready(function() {
    const date = new Date().toISOString().split('T')[0].split('-')
    const recents = [1,2,3,4,5,6,7,8,9]
    recents.forEach((v) => {
        $(`#get-recent-since${v}`).html(getTimeSince($(`#get-recent-since${v}`).text()))
    })
    $('#today').html(`${date[0]}.<span class="dot7">${date[1]}.${date[2]}. 현재</span>`)
    const traces = [1,2,3,4,5,6,7]
    traces.forEach((v) => {
        $(`#get-time-since${v}`).html(getTimeSince($(`#get-time-since${v}`).text()))
    })
    
    /*jQuery(function($) {
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
    })*/
})

$(window).on('load', function() {
    $('.loading').hide()
    $('.loaded').css('opacity', '1')
})

var a = 0

function getTimeSince(date) {
    var sec = Math.floor((new Date() - new Date(date)) / 1000)
    var int = Math.floor(sec / 31536000)
    if (int >= 1) {
        return int + '년 전'
    }
    int = Math.floor(sec / 2628000);
    if (int >= 1) {
        return int + '개월 전'
    }
    int = Math.floor(sec / 604800);
    if (int >= 1) {
        return int + '주 전'
    }
    int = Math.floor(sec / 86400);
    if (int >= 1) {
        return int + '일 전'
    }
    return 'NEW'
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
