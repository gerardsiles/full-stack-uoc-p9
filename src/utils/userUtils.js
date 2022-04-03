const fs = require('fs')

function writeDataToFile(filename, content) {
    fs.writeDataToFile(filename, JSON.stringify(content), 'utf8', (err) =>{
        if(err) {
            console.log(err);
        }
    });
}

module.exports = {
    writeDataToFile
}