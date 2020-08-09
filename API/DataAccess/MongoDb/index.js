const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const uuid = require("uuid")
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, { useNewUrlParser: true });

const collections = {
    Pages: 'Pages',
    Sections: 'Sections'
}
const dbName = 'CmsMobileApp';

client.connect(err => {
    if(err) console.log(err);

    var pagesCrud = GenerateCrud(collections.Pages);

    pagesCrud.Get().then(res => {
        if(res.success && res.data){
            var hasAbout = res.data.filter(x => x.Title === "About").length > 0;
            if(!hasAbout) pagesCrud.Create({Title: "About", versionId: uuid.v4(), details: []}).then(() => {}).catch(() => {});
            var hasHome = res.data.filter(x => x.Title === "Home").length > 0;
            if(!hasHome) pagesCrud.Create({Title: "Home", versionId: uuid.v4(), details: []}).then(() => {}).catch(() => {});
            var hasContact = res.data.filter(x => x.Title === "Contact").length > 0;
            if(!hasContact) pagesCrud.Create({Title: "Contact", versionId: uuid.v4(), details: []}).then(() => {}).catch(() => {});
        }
    }).catch(err => {

    })

});

var GenerateCrud = (collectionName) => {
    return {
        Get: (idString = undefined) => {
            return new Promise((resolve, reject) => {
                var collection = client.db(dbName).collection(collectionName);

                var searchModel = {};
                if(idString && idString.length > 0) searchModel._id = ObjectID(idString)

                collection.find(searchModel).toArray((err, data) => {
                    if(err){
                        reject(err);
                    } else{
                        data.forEach(row => {
                            row.idString = row._id.toHexString();
                        })

                        if(idString && idString.length > 0){
                            if(data.length < 1){
                                resolve({success: false, errors: [`Could Not Find ${collection}`]})
                            } else{
                                resolve({success: true, data: data[0]});
                            }
                        } else{
                            resolve({success: true, data: data});
                        }
                    }
                });
            })
        },
        Create: (inputModel) => {
            return new Promise((resolve, reject) => {
                var collection = client.db(dbName).collection(collectionName);
                collection.insertOne(inputModel).then(result => {
                    if(result && result.insertedCount === 1 && result.insertedId){
                        inputModel.idString = result.insertedId.toHexString();
                        inputModel._id = result.insertedId;
                        resolve({success: true, data: inputModel})
                    } else {
                        resolve({success: false, errors: [`Could Not Create ${collectionName}`]})
                    }
                }).catch(err => {
                    reject(err);
                });
            });
        },
        Update: (inputModel) => {
            return new Promise((resolve, reject) => {
                if(!inputModel || !inputModel._id || !inputModel.idString){
                    resolve({success: false, errors: ["Model with Id Req"]});
                } else{
                    var collection = client.db(dbName).collection(collectionName);

                    if(!inputModel._id) inputModel._id = ObjectID(inputModel.idString);

                    collection.updateOne({_id: inputModel._id}, inputModel).then(result => {
                        if(result && result.modifiedCount === 1){
                            resolve({success: true, data: inputModel});
                        } else{
                            resolve({success: false, errors: [`Could not update ${collectionName}`]})
                        }
                    }).catch(err => {
                        reject(err);
                    })
                }
            })
        },
        Delete: (idString) => {
            return new Promise((resolve, reject) => {
                if(!idString){
                    resolve({success: false, errors: ["idString Req"]});
                } else{
                    var collection = client.db(dbName).collection(collectionName);

                    collection.remove({_id: ObjectID(idString)}).then(result => {
                        if(result && result.result && result.result.ok === 1){
                            resolve({success: true})
                        } else{
                            resolve({success: false, errors: [`Could Not Delete ${collectionName}`]})
                        }
                    }).catch(err => {
                        reject(err);
                    })
                }
            })
        }
    }
}

module.exports.PagesCrud = GenerateCrud(collections.Pages);
module.exports.SectionsCrud = GenerateCrud(collections.Sections);