const mongoose = require('mongoose');

const MONGOOSE_URI = process.env.MONGOOSE_URI || "mongodb://localhost/tracksaction_db";

return mongoose.connect(mongoose);
