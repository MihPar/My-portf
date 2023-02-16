const langMap = {
    Q: 'Й',
    W: 'Ц',
    E: 'У',
    R: 'К',
    T: 'Е',
    Y: 'Н',
    U: 'Г',
    I: 'Ш',
    O: 'Щ',
    P: 'З',
    '{': 'Х',
    '}': 'Ъ',
    A: 'Ф',
    S: 'Ы',
    D: 'В',
    F: 'А',
    G: 'П',
    H: 'Р',
    J: 'О',
    K: 'Л',
    L: 'Д',
    ':': 'Ж',
    '"': 'Э',
    '|': 'Ё',
    Z: 'Я',
    X: 'Ч',
    C: 'С',
    V: 'М',
    B: 'И',
    N: 'Т',
    M: 'Ь',
    '<': 'Б',
    '>': 'Ю',
    '?': '/',
}

const uiMap = {
    'training-keyboard': {
        EN: 'Training keyboard',
        RU: 'Клавиатура'
    },
    settings: {
        EN: 'Settings',
        RU: 'Настройка'
    },
    statistics: {
        EN: 'Statistics',
        RU: 'Статистика'
    }
}

function changeLang(e) {
    if (e.target.textContent === 'EN') {
        e.target.textContent = 'RU'
        currentLang = 'RU'
        for (const elem of alpha) {
            const enLetter = elem.innerText
            const ruLetter = langMap[enLetter]
            if (enLetter in langMap) {
                elem.innerText = ruLetter
            }
        }
    } else {
        e.target.textContent = 'EN'
        currentLang = 'EN'        
        for (const elem of alpha) {
            const ruLetter = elem.innerText
            const enLetter = findKey(ruLetter)
            if (Object.values(langMap).includes(ruLetter)) {
                elem.innerText = enLetter
            }
        }
    }
    for (let key of Object.keys(uiMap)) {
        const btn = Array.from(nav.children).find((item)=>item.className === key)
        btn.textContent = uiMap[key][e.target.textContent]
    }
}
