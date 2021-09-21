let fs = require('fs')

    fs.readFile('van.mp3', (err, data) => {
    
    if (err) throw err;

    fs.writeFile('van1.mp3', data, (err) => {
    
        if (err) throw err;
        console.log('yes')
    })   
})