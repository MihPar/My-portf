// window.addEventListener('keydown', function(event) {
//     if (event.altKey && event.metaKey && event.code === 'KeyI') {
//         event.preventDefault()
//         alert('Don\'t use DevTools on this cite!')
//     }
// })

// const key = 'V'
// const btns = document.querySelectorAll('.frame button')
// for (let btn of btns) {
//     if (btn.innerText === key) {
//         console.log(btn)
//         btn.style.backgroundColor = 'red'
//     }
// }



function initPrecisionData(str) {
    precisionData = {}
    for (let char of str) {
        if (precisionData[char]) {
            precisionData[char] += 1
        } else {
            precisionData[char] = 1
        }
    }
}

function renderData(data, container) {
    clearContainer(container)
    let keys = Object.keys(data)
    keys.sort()

    const letters = keys.filter(function(char) {
        const i = char.charCodeAt()
        return i >= 0x41 && i <= 0x5A
    })

    const punc = keys.filter(function(char) {
        const i = char.charCodeAt()
        return i < 0x41 || i > 0x5A
    })
    keys = letters.concat(punc)
    for (const key of keys) {
        let char = key
        const div = document.createElement('div')
        if (char === ' ') {
            char = 'space'
        }
        div.innerText = char + ' - ' + data[key]
        container.append(div)
    }
}

// const char = 'Ё'

// function isCapitalLetter(char) {
//     const i = char.charCodeAt()
//     if ((i >= 1040 && i < 1071) || i === 1025) {
//         return true
//     } else {
//         return false
//     }
// }
// const letter = isCapitalLetter(char)
// console.log(letter)