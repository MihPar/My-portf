const obj = {
    ':': 1,
    ',': 1, 
    'F': 1,
    'D': 1,
    ']': 1
}

const keys = Object.keys(obj)
keys.sort()

const letters = keys.filter(function(char) {
    const i = char.charCodeAt()
    return i >= 0x41 && i <= 0x5A
})

const punc = keys.filter(function(char) {
    const i = char.charCodeAt()
    return i < 0x41 || i > 0x5A 
})

for (const key of letters.concat(punc)) {
    console.log(key, obj[key])
}


