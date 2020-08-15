const handleData = require('./handleData');

const handleCommand = ({add, remove, list}) => {
    if (add) {
        if (typeof add !== "string") {
            return console.log("wymagana wartość tekstowa!".red)
        } else if (add.length < 7) {
            return console.log("zadanie musi posiadać więcej niż 6 znaków".red)
        }
        handleData(1, add);

    } else if (remove) {
        if (typeof remove !== "string" || remove.length < 7) {
            return console.log("wymagana wartość tekstowa, posiadająca więcej niż 6 znaków".red)
        }
        handleData(2, remove);

    } else if (list || list === "") {
        handleData(3, null);

    } else {
        console.log(`nie rozumiem! użyj --add="nazwa zadania", --remove="nazwa zadania" lub --list`.red)
    }
};

module.exports = handleCommand;