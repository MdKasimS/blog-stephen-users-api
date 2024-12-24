const mongoose = require('mongoose');


async function connectMongoDb(mongoDbUrl)
{
    return mongoose.connect(mongoDbUrl);
}


function connectMongoDbAtlas(atlasUrl)
{

}

module.exports = {
    connectMongoDb,
}