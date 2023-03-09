const mongoose = require('mongoose')

/*https://www.npmjs.com/package/mongoose-schema-jsonschema
In both models, there needs to be a schema that will store our users and posts.
mongoose.Schema creates these schemas with their field names, types, and whether or not
they are required, and saves them as JSON, npmjs (2022) writes.
*/
const postSchema = mongoose.Schema({
    id: {type: String, required: true},
    postDetails: {type: String, required: true}
})

module.exports = mongoose.model('Post', postSchema)