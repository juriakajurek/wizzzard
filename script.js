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

function manageActivityRadio(e) {
    Array.from(e.parentNode.querySelectorAll('.card')).forEach((element) => {
        element.classList.remove('selected')
    })
    e.querySelector('.form-check-input').checked = true
    e.classList.add('selected')
}

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
    // console.log(
    //     ($('#exclusions-input')[0].parentNode.children[0].offsetWidth =
    //         $('#exclusions-input')[0].parentNode.offsetWidth)
    // )
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
            $('#exclusions-input')[0]?.parentNode.children[0].classList.add(
                'hidden'
            )
        }
    }
    if (e.target == $('#same-meals-hours')[0]) {
        $('#meal-hours-chooser').css('opacity', '0')
        $('.basic-hour-input').each((index, element) => {
            $(element).removeAttr('disabled')
        })
        setTimeout(() => {
            $('#meal-hours-chooser').css('visibility', 'hidden')
            $('#meal-hours-chooser').css('position', 'absolute')
        }, 500)
    }
    if (e.target == $('#various-meals-hours')[0]) {
        $('#meal-hours-chooser').css('visibility', 'visible')
        $('#meal-hours-chooser').css('position', 'relative')
        $('#meal-hours-chooser').css('opacity', '1')
        $('.basic-hour-input').each((index, element) => {
            $(element).attr('disabled', 'true')
        })
    }
    if (e.target == $('#patient-same-meals-hours')[0]) {
        $('#various-hours-chooser').css('opacity', '0')
        $('#various-hours-chooser').css('visibility', 'hidden')
        $('#various-hours-chooser').css('position', 'absolute')

        $('#same-hours-chooser').css('opacity', '1')
        $('#same-hours-chooser').css('visibility', 'visible')
        $('#same-hours-chooser').css('position', 'relative')
    }
    if (e.target == $('#patient-various-meals-hours')[0]) {
        $('#various-hours-chooser').css('opacity', '1')
        $('#various-hours-chooser').css('visibility', 'visible')
        $('#various-hours-chooser').css('position', 'relative')

        $('#same-hours-chooser').css('opacity', '0')
        $('#same-hours-chooser').css('visibility', 'hidden')
        $('#same-hours-chooser').css('position', 'absolute')
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
        menuItems[i].children[1].classList.remove('visible')
    }
    if (el.innerHTML.indexOf('wykluczeń') != -1) {
        //wykluczenia
        $('#exclusions-list')[0].classList.remove('hidden')
        $('#exceptions-list')[0].classList.add('hidden')
    } else if (el.innerHTML.indexOf('wyjątków') != -1) {
        //wyjątki
        $('#exclusions-list')[0].classList.add('hidden')
        $('#exceptions-list')[0].classList.remove('hidden')
    } else if (el.innerHTML.indexOf('zapotrzebowania') != -1) {
        //ustawienie zapotrzebowania
        $('#advanced-macronutrients-settings')[0].classList.add('hidden')
        $('#macronutrients-settings-card')[0].classList.remove('hidden')
    } else if (el.innerHTML.indexOf('per posiłek') != -1) {
        //Przydział wartości per posiłek
        $('#macronutrients-settings-card')[0].classList.add('hidden')
        $('#advanced-macronutrients-settings')[0].classList.remove('hidden')
    } else if (el.innerHTML.indexOf('i pomiary') != -1) {
        //Dane i pomiary
        $('#settings-card')[0].classList.add('hidden')
        $('#diet-info-card')[0].classList.add('hidden')
        $('#culinary-tastes-card')[0].classList.add('hidden')
        $('#activity-plan-card')[0].classList.add('hidden')

        $('#measurements-info-card')[0].classList.remove('hidden')
    } else if (el.innerHTML.indexOf('Ustawienia') != -1) {
        //Ustawienia
        $('#diet-info-card')[0].classList.add('hidden')
        $('#culinary-tastes-card')[0].classList.add('hidden')
        $('#activity-plan-card')[0].classList.add('hidden')
        $('#measurements-info-card')[0].classList.add('hidden')

        $('#settings-card')[0].classList.remove('hidden')
    } else if (el.innerHTML.indexOf('Dieta') != -1) {
        //Dieta
        $('#culinary-tastes-card')[0].classList.add('hidden')
        $('#activity-plan-card')[0].classList.add('hidden')
        $('#measurements-info-card')[0].classList.add('hidden')
        $('#settings-card')[0].classList.add('hidden')

        $('#diet-info-card')[0].classList.remove('hidden')
    } else if (el.innerHTML.indexOf('Upodobania kulinarne') != -1) {
        //Upodobania kulinarne
        $('#diet-info-card')[0].classList.add('hidden')
        $('#activity-plan-card')[0].classList.add('hidden')
        $('#measurements-info-card')[0].classList.add('hidden')
        $('#settings-card')[0].classList.add('hidden')

        $('#culinary-tastes-card')[0].classList.remove('hidden')
    } else if (el.innerHTML.indexOf('Plan aktywności') != -1) {
        //Plan aktywności
        $('#diet-info-card')[0].classList.add('hidden')
        $('#culinary-tastes-card')[0].classList.add('hidden')
        $('#measurements-info-card')[0].classList.add('hidden')
        $('#settings-card')[0].classList.add('hidden')

        $('#activity-plan-card')[0].classList.remove('hidden')
    }

    el.nextElementSibling.classList.add('visible')
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

//change gender name to gender icon
$(document).ready(function () {
    var fields = document.querySelectorAll('.patient-gender')
    fields.forEach((f) => {
        var img = document.createElement('img')
        if (f.innerText == 'M') {
            f.innerText = ''
            img.setAttribute('src', `./images/icons/man.svg`)
            f.appendChild(img)
        } else if (f.innerText == 'K') {
            f.innerText = ''
            img.setAttribute('src', `./images/icons/woman.svg`)
            f.appendChild(img)
        }
    })
})

$(document).ready(function () {
    $('input.timepicker')?.timepicker({
        timeFormat: 'H:mm',
        interval: 15,
    })
})

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
    if ($(window).width() < 970) {
        // alert('Less than 960')
    } else {
        $('[data-toggle="tooltip"]').tooltip()
    }
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
