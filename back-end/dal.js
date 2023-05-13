const MongoClient   = require('mongodb').MongoClient;
const url           = 'mongodb://localhost:27017';
let db              = null;

// connect to mongo
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    console.log("Connected successfully to db server");

    // connect to project database
    db = client.db('badbank_capstone');
});

// create user account using the collection.insertOne function
function create(name, email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        console.log('DAL Collection value line 17: ',collection);
        const entry = {name: name, email: email, password: password, balance: 0, history: []};
        collection.insertOne(entry, {w:1}, function(err, result){
            err ? reject(err) : resolve(entry);
        });
    });
}

// find user account 
function find(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({ email: email })
            .toArray(function (err, docs) {
                err ? resolve(err) : resolve(docs);
            });
    })
}

// find user account
function findOne(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOne({ email: email })
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    })
}

// update - deposit/withdraw amount
function update(type, name, email, amount, balance, timestamp) {
    console.log("LINE 50: attempt to set history from Update call: type:",type, "name:", name, "email:", email, "amount:", amount, "balance:", balance, "timestamp:", timestamp);
    let intAmount = parseInt(amount);
    return new Promise((resolve, reject) => {
        const customers = db.collection('users')
            .findOneAndUpdate(
                { email: email },
                { $inc: { balance: intAmount } },
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );
        db.collection('users')
            .findOneAndUpdate(
                { email: email },
                {$push: { history: {
                    name: name,
                    balance: balance,
                    email: email,
                    amount: amount,
                    timestamp:timestamp,
                    type: type 
                }}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );
    });
}

// { $push: { history: {
//     name: name,
//     balance: balance,
//     email: email,
//     timestamp:timestamp,
//     type: type 
// }}                { $push: { history: {
//     name: name,
//     balance: balance,
//     email: email,
//     timestamp:timestamp,
//     type: type 
// }}


// return all users by using the collection.find method
function all() {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs){
                err ? reject(err) : resolve(docs);
        });
    });
};


module.exports = { create, findOne, find, update, all };