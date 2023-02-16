const javascript = ['function', 'for', 'let', 'const', 'switch']
const html = ['div', 'body', 'html', 'section', 'p']
const css = ['font-size', 'margin', 'color', 'background', 'padding']

function shuffleArr(arr) {
    const result = []
    const set = new Set()
    while(set.size < arr.length) {
       const randNumber = Math.floor(Math.random() * arr.length)
        set.add(randNumber)
    }
    for (let value of set) {
        result.push(arr[value])
    }
    return result.join(' ')
}
// console.log(shuffleArr(javascript))
