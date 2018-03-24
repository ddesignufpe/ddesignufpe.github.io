const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const Cadeira   = require('./cadeira');

const GradeSchema = new Schema({
    semestre: String,
    dados: {
        manha: {
            segunda: [{type: Schema.Types.ObjectId, ref: 'Cadeira'}],
            terca: [{type: Schema.Types.ObjectId, ref: 'Cadeira'}], 
            quarta: [{type: Schema.Types.ObjectId, ref: 'Cadeira'}], 
            quinta: [{type: Schema.Types.ObjectId, ref: 'Cadeira'}], 
            sexta: [{type: Schema.Types.ObjectId, ref: 'Cadeira'}] 
        },
        tarde: {
            segunda: [{type: Schema.Types.ObjectId, ref: 'Cadeira'}],
            terca: [{type: Schema.Types.ObjectId, ref: 'Cadeira'}], 
            quarta: [{type: Schema.Types.ObjectId, ref: 'Cadeira'}], 
            quinta: [{type: Schema.Types.ObjectId, ref: 'Cadeira'}], 
            sexta: [{type: Schema.Types.ObjectId, ref: 'Cadeira'}] 
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Grade', GradeSchema);