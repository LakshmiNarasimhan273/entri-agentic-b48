const fs = require('fs');

// writeFile - dynamic function
// it checks the file is existing or not
// if yes - it write the content
// if no - it creates a new one with the same mentioned name
// after creating that, it adds the content

// writeFile Syntax
// 3 parameters - File Name | File Content | Fallback function
fs.writeFile("live-session.txt", "Entri B48 - Live Sessions - MWF @ 20:30 - 22:00", (err) => {
    if(err){
        console.log("File Processing Failed");
        return;
    }
    console.log("File Processing Successful");
});