function clearContainer(container) {
    while (container.firstChild) {
        container.firstChild.remove()
    }
}


function findKey(val) {
    for (let prop of Object.entries(langMap)) {
        if (prop[1] === val) {
            return prop[0]
        } 
    }
}