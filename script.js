$(function () {
    $('#menu-toggle').click(function (e) {
        e.preventDefault()
        $('#wrapper').toggleClass('toggled')
        $('#slide').toggleClass('toggled')
    })
})

const handleConnector = () => {
    var options = document.querySelectorAll('.activity-option')
    options.forEach((element) => {
        var col = element.parentNode.parentNode.nextElementSibling

        if (
            element.parentNode.children[0].checked &&
            col?.classList.contains('activity-col') &&
            col?.children[0]?.children[0]?.checked
        ) {
            element.nextElementSibling.classList.add('visible')
        } else {
            element.nextElementSibling.classList.remove('visible')
        }
    })
}

$(function () {
    handleConnector()
})

var toggleChecked = function (col) {
    if (col?.parentNode?.children[0]) {
        col.parentNode.children[0].checked = !col.parentNode.children[0].checked
        handleConnector()
    }
}

$(function () {
    var options = document.querySelectorAll('.activity-option')
    options.forEach((element) => {
        var col = element

        const myFunction = (tooltipSpan) => {
            // console.log(e.target.tagName.toLowerCase() == 'span')
            if (tooltipSpan.tagName.toLowerCase() == 'span') {
                console.log('show')
                $('[data-toggle="tooltip"]').tooltip('hide')
                $('[data-toggle="tooltip"]').filter(tooltipSpan).tooltip('show')
            }
        }

        col.addEventListener('mouseover', function (e) {
            if (e.buttons == 1 || e.buttons == 3) {
                toggleChecked(col)
                myFunction(e.target.parentNode.parentNode.parentNode.parentNode)
            }
        })
        col.addEventListener('mousedown', function (e) {
            toggleChecked(col)
            myFunction(e.target.parentNode.parentNode.parentNode.parentNode)
        })

        col.parentNode.children[0].addEventListener('click', function (e) {
            toggleChecked(col)
            // myFunction(e.target.parentNode.parentNode.parentNode.parentNode)
        })
    })
})

$(function () {
    $('#exclusions-input').on('focusin', (event) => {
        event.target.parentNode.children[0].classList.remove('hidden')
    })
})

// $(function () {
//     $('#search-result').on('focusin', (event) => {
//         console.log(e.target.height)
//     })
// })
// $(function () {
//     $('#search-result').on('focusin', (event) => {
//         event.target.parentNode.children[0].classList.remove('hidden')
//     })
// })
document.addEventListener('click', function (e) {
    if (e.target != $('#exclusions-input')[0]) {
        let element = e.target
        let shouldClose = true
        while (element != null) {
            if (element == $('.search-results-container')[0]) {
                shouldClose = false
            }
            element = element.parentNode
        }
        if (shouldClose === true) {
            $('#exclusions-input')[0].parentNode.children[0].classList.add(
                'hidden'
            )
        }
    }
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

const binMouseEnter = (el) => {
    el.children[0].src = 'images/red-bin.svg'
}
const binMouseOut = (el) => {
    el.children[0].src = 'images/bin.svg'
}

function toggleSelect(el) {
    return el.classList.toggle('selected')
}
function toggleActive(el) {
    let menuItems = el.parentNode.parentNode.children
    for (i = 0; i < menuItems.length; i++) {
        menuItems[i].children[0].classList.remove('active')
    }
    if (el.innerHTML.indexOf('wykluczeń') != -1) {
        //wykluczenia
        $('#exclusions-list')[0].classList.remove('hidden')
        $('#exceptions-list')[0].classList.add('hidden')
    } else {
        //wyjątki
        $('#exclusions-list')[0].classList.add('hidden')
        $('#exceptions-list')[0].classList.remove('hidden')
    }
    return el.classList.add('active')
}

function remove(el) {
    return el.parentNode.removeChild(el)
}

function focusDateInput() {
    document.getElementById('datepicker').focus()
}

function addToExclusions(el) {
    var text = document.createTextNode(
        el.parentNode.children[1].children[0].textContent
    )
    var div = document.createElement('div')
    var p = document.createElement('p')
    var img = document.createElement('img')

    div.classList.add(
        'round-label',
        'd-flex',
        'justify-content-center',
        'align-items-center'
    )
    div.onclick = (el) =>
        remove(
            el.target.classList.contains('round-label')
                ? el.target
                : el.target.parentNode
        )
    img.classList.add('navbar-toggle-icon')
    img.src = 'images/x.svg'
    img.alt = 'x-icon'
    p.appendChild(text)
    div.appendChild(p)
    div.appendChild(img)

    $('#exclusions-list').append(div)

    $('#exclusions-input')[0].parentNode.children[0].classList.add('hidden')
}

function addToExceptions(el) {
    var text = document.createTextNode(
        el.parentNode.children[1].children[0].textContent
    )
    var div = document.createElement('div')
    var p = document.createElement('p')
    var img = document.createElement('img')

    div.classList.add(
        'round-label',
        'd-flex',
        'justify-content-center',
        'align-items-center'
    )
    div.onclick = (el) =>
        remove(
            el.target.classList.contains('round-label')
                ? el.target
                : el.target.parentNode
        )
    img.classList.add('navbar-toggle-icon')
    img.src = 'images/x.svg'
    img.alt = 'x-icon'
    p.appendChild(text)
    div.appendChild(p)
    div.appendChild(img)

    $('#exceptions-list').append(div)

    $('#exclusions-input')[0].parentNode.children[0].classList.add('hidden')
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
$('.datepicker').datepicker()
$(document).ready(function () {
    $.fn.datepicker.dates['en'] = {
        days: [
            'Niedziela',
            'Poniedziałek',
            'Wtorek',
            'Środa',
            'Czwartek',
            'Piątek',
            'Sobota',
        ],
        daysShort: ['Ndz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'],
        daysMin: ['N', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'S'],
        months: [
            'Styczeń',
            'Luty',
            'Marzec',
            'Kwiecień',
            'Maj',
            'Czerwiec',
            'Lipiec',
            'Sierpień',
            'Wrzesień',
            'Październik',
            'Listopad',
            'Grudzień',
        ],
        monthsShort: [
            'Sty',
            'Lut',
            'Mar',
            'Kwi',
            'Maj',
            'Cze',
            'Lip',
            'Sie',
            'Wrz',
            'Paź',
            'Lis',
            'Gru',
        ],
        today: 'Dziś',
        clear: 'Wyczyść',
        format: 'mm/dd/yyyy',
        titleFormat: 'MM yyyy' /* Leverages same syntax as 'format' */,
        weekStart: 1,
        startDate: '12-12-2021',
    }

    $('#datepicker').datepicker({
        format: 'dd-mm-yyyy',
    })
    $.fn.datepicker.defaults.startDate = '10/10/2021'

    $('#datepicker').datepicker('setDate', new Date())
})

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

$(function () {
    $('[data-toggle="tooltip"]').on('show.bs.tooltip', (e) =>
        refreshTooltip(e.target)
    )
})

function refreshTooltip(e) {
    let row = e.children[0]
    let timeLength = row.children[1].children[0].value
    let quantity = 0
    for (i = 0; i < row.children.length; i++) {
        if (row.children[i]?.children[0]?.children[0]?.checked) {
            quantity++
        }
    }
    let sum = quantity * timeLength
    e.setAttribute('data-original-title', 'suma: ' + sum + ' godz.')
}
