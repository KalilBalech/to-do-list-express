const mongoose = require("mongoose")

const TaskSchema = mongoose.Schema({
    name: { type: String, required: true },
    done: { type: Boolean, default: false },
    checklist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Checklist',
        required: true
    }
})

module.exports = TaskSchema