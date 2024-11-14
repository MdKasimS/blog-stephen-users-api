

function connectMongoDb(mongoDbUrl)
{
    const mongoose = require('mongoose');
    return mongoose.connect(mongoDbUrl);
}


function connectMongoDbAtlas(atlasUrl)
{

}

module.exports = {
    connectMongoDb,
}