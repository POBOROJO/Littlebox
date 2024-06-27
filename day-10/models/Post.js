const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    summary: String,
})

module.exports = mongoose.model('Post', PostSchema);

