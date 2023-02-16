// function drawPictures() {
//     const arr = findFinger('T')
//     drawHand(hands[arr[0]], arr[1])
//     if (arr[0] === 'right') {
//         drawHand(hands['left'])
//     } else {
//         drawHand(hands['right'])
//     }
// }

function drawPictures(char) {
    if (char === undefined) {
        drawHand(hands.left)
        drawHand(hands.right)        
    } else if (char === ' ') {
        if (previousHand === 'left') {
            drawHand(hands.left)
            drawHand(hands.right, 0)
        } else {
            drawHand(hands.left, 4)
            drawHand(hands.right)            
        }
    } else {
       const arr = findFinger(char)
        previousHand = arr[0]
        drawHand(hands[previousHand], arr[1])
        if (previousHand === 'left') {
            drawHand(hands.right)            
        } else {
            drawHand(hands.left)
        }
    }
}

function drawHand(canvas, n) {
    // const canvas = document.querySelector(`.${param}-hand`) 
    // const canvas = document.querySelector('.' + param + '-hand')

    const ctx = canvas.getContext('2d')
    const gap = 10
    let x = gap
    const y = 10
    const width = 30
    const height = 200
    canvas.width = (gap + width) * 5 + gap
    canvas.height = 250

    for (let i = 0; i < 5; i++) {
        if (i === n) {
            ctx.fillStyle = 'red'
        } else {
            ctx.fillStyle = 'darkgrey'
        }
        ctx.fillRect(x, y, width, height)
        let step = gap + width
        x += step
    }
    // console.log((width + gap) * 5 + gap)

    // ctx.fillRect(10, 10, 40, 200)
    // ctx.fillRect(60, 10, 40, 200)    
    // ctx.fillRect(110, 10, 40, 200)    
    // ctx.fillRect(160, 10, 40, 200)    
    // ctx.fillRect(210, 10, 40, 200)    
    // ctx.fillStyle = 'red'    
    // ctx.fillRect(230, 230, 20, 20)
}

const fingers = {
    left: [['~', '!', '@', 'Q', 'A', 'Z'], ['#', 'W', 'S', 'X'], ['$', 'E', 'D', 'C'], ['%', 'R', 'F', 'V', '^', 'T', 'G', 'B']],
    right: [[], ['&', 'Y', 'H', 'N', 'U', 'J', 'M'], ['*', 'I', 'K', '<'], ['(', 'O', 'L', '>'], [')', '-', '+', 'P', '{', '}', ':', '"', '|', '?'],]
}

function findFinger(char) {
    char = char.toUpperCase()
    if (currentLang === 'RU') {        
        for (const [key,val] of Object.entries(langMap)) {
            if (val === char) {
                char = key
            }
        }
    }
    for (const [key,val] of Object.entries(fingers)) {
        for (let i = 0; i < val.length; i++) {
            if (val[i].includes(char)) {
                return [key, i]
            }
        }
    }
}