const fs = require('fs');

function logInErrors(errorMessage)
{
    fs.appendFile(
        "ERROR_LOG.txt", `${Date.now()}: ${errorMessage}:\n`, 
        (err, data)=>{
            console.log(`Error checking user: ${errorMessage}`)
        });
}

module.exports = {
    logInErrors,
}