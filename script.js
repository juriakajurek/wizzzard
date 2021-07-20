$(function () {
    $('#menu-toggle').click(function (e) {
        e.preventDefault()
        $('#wrapper').toggleClass('toggled')
        $('#slide').toggleClass('toggled')
    })
})

function makeSidebarItemSelected(el, itemName) {
    let list = el.parentNode.parentNode.children
    for (let item of list) {
        item.children[0].classList.remove('selected')
        var cls = item.children[0].classList
        switch (true) {
            case cls.contains('user'):
                item.children[0].children[0].setAttribute(
                    'src',
                    `./images/icons/user.svg`
                )
                break
            case cls.contains('cutlery'):
                item.children[0].children[0].setAttribute(
                    'src',
                    `./images/icons/cutlery.svg`
                )
                break
            case cls.contains('cherries'):
                item.children[0].children[0].setAttribute(
                    'src',
                    `./images/icons/cherries.svg`
                )
                break
            case cls.contains('pill'):
                item.children[0].children[0].setAttribute(
                    'src',
                    `./images/icons/pill.svg`
                )
                break
        }
    }
    el.children[0].setAttribute(
        'src',
        `./images/icons/${itemName}-selected.svg`
    )
    return el.classList.add('selected')
}

function toggleSelect(el) {
    return el.classList.toggle('selected')
}

document.addEventListener('DOMContentLoaded', function () {
    el_autohide = document.querySelector('.autohide')
    el_wrapper = document.getElementById('wrapper')

    if (el_autohide) {
        var last_scroll_top = 0
        window.addEventListener('scroll', function () {
            let scroll_top = window.scrollY
            if (scroll_top < last_scroll_top) {
                el_autohide.classList.remove('scrolled-down')
                el_autohide.classList.add('scrolled-up')

                el_wrapper.classList.remove('scrolled-down')
                el_wrapper.classList.add('scrolled-up')
            } else {
                el_autohide.classList.remove('scrolled-up')
                el_autohide.classList.add('scrolled-down')

                el_wrapper.classList.remove('scrolled-up')
                el_wrapper.classList.add('scrolled-down')
            }
            last_scroll_top = scroll_top
        })
    }
})
