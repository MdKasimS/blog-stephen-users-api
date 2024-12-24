const fs = require('fs');

function logReqRes(logFileName)
{
    return (req, res, next)=>{
        fs.appendFile(
            logFileName, `${new Date(Date.now())}: ${req.ip}: ${req.method}: ${req.path}\n`, 
            (err, data)=>{
                next();
            });
    }
}


module.exports = {
    logReqRes,

}