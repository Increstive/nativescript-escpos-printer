

function table(rows) {
    const bytes = [];

    rows.forEach(row => {

    })
}

function cancelChineseCharacterCommand() {
    return [0x1c, 0x2e]
}
function setCodepageCommand(codepage) {
    return [0x1b, 0x74, codepage]
}