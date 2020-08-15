const colors = require('colors');
const fs = require('fs');

const handleData = (type, title) => {
    //type: number (1 - add, 2 - remove, 3 - list)
    //title: (string || null)
    const data = fs.readFileSync('datadb.json', 'utf8');
    let tasks = JSON.parse(data);
    // console.log(tasks)

    if (type === 1 || type === 2) {
        const isExisted = !!tasks.find(task => task.title === title);
        if (type === 1 && isExisted) {
            return console.log("takie zadanie już istnieje!".red);
        } else if (type === 2 && !isExisted) {
            return console.log("nie ma takiego zadania!".red)
        }
    }
    let dataJSON = "";
    switch (type) {
        case 1:
            tasks = tasks.map((task, index) => ({id: index + 1, title: task.title}));
            const id = tasks.length + 1;
            tasks.push({id, title});
            dataJSON = JSON.stringify(tasks);
            fs.writeFileSync('datadb.json', dataJSON);
            console.log(`dodano zadanie: ${title}`.black.bgMagenta);
            break;

        case 2:
            const index = tasks.findIndex(task => task.title === title);
            tasks.splice(index, 1);
            tasks = tasks.map((task, index) => ({id: index + 1, title: task.title}));
            console.log(tasks);
            dataJSON = JSON.stringify(tasks);
            fs.writeFile('datadb.json', dataJSON, 'utf8', (err) => {
                if (err) throw err;
                console.log(`zadanie ${title} zostało usunięte`.black.bgMagenta)
            });
            break;

        case 3:
            console.log(`Lista obejmuje ${tasks.length} zadań. Do zrobienia masz: `);
            if (tasks.length) {
                tasks.forEach((task, index) => {
                    if (index % 2) return console.log(task.title.rainbow);
                    return console.log(task.title.cyan);
                })
            }
            break;
    }
};

module.exports = handleData;