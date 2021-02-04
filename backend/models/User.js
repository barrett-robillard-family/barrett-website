const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    pwd: {
        type: String,
        required: true
    },
    songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
    wins: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

// userSchema.pre('save', function (next) {
//     const user = this;
//     if (!user.isModified('password')) return next();
//     bcrypt.hash(user.password, SALT_ROUNDS, (err, hash) => {
//       if (err) return next(err);
//       user.password = hash;
//       next();
//     });
//   });
  
// userSchema.methods.comparePassword = function (tryPassword, cb) {
//     bcrypt.compare(tryPassword, this.password, function (err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };

module.exports = mongoose.model('User', UserSchema);