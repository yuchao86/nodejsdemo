const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";

class MongoAdapter {
  constructor() {}

  // makeConnection

  get(query_id) {
    mongo.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err, client) => {
        if (err) throw err;

        var db = client.db("rawEng");
        var collection = db.collection("employees");
        collection.find({ id: Number(`${query_id}`) }).toArray((err, items) => {
          if (err) throw err;
          console.log("showing one entry");
          console.log(items);
          client.close();
        });
      }
    );
  }

  getAll() {
    mongo.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err, client) => {
        if (err) throw err;
        var db = client.db("rawEng");
        var collection = db.collection("employees");
        collection.find().toArray((err, items) => {
          if (err) throw err;
          console.log("showing all the entries");
          console.log(items);
          client.close();
        });
      }
    );
  }

  post(query_obj) {
    mongo.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err, client) => {
        if (err) throw err;
        var db = client.db("rawEng");
        var collection = db.collection("employees");
        collection.insertOne({ ...query_obj }, (err, items) => {
          if (err) throw err;
          console.log("Successfully inserted");
          client.close();
        });
      }
    );
  }

  patch(query_id, query_object) {
    mongo.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err, client) => {
        if (err) throw err;
        var db = client.db("rawEng");
        var collection = db.collection("employees");
        collection.updateOne(
          { id: query_id },
          { $set: query_object },
          (err, item) => {
            if (err) throw err;
            console.log("Sucessfully patched");
            client.close();
          }
        );
      }
    );
  }

  del(query_id) {
    mongo.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err, client) => {
        if (err) throw err;
        var db = client.db("rawEng");
        var collection = db.collection("employees");
        collection.deleteOne({ id: query_id }, (err, item) => {
          if (err) throw err;
          console.log("successfully deleted");
          client.close();
        });
      }
    );
  }

  put(query_id, query_object) {
    this.del(query_id);
    this.post({ ...query_id, ...query_object });
    console.log("successfully put");
  }
}

// adp = new MongoAdapter();
// adp.get(2);
// adp.getAll();
// // adp.post("bahu", "mahesh", "findmeifucan@gmail.com");
// adp.post({
//   id: 1,
//   first_name: "keval",
//   last_name: "shah",
//   email: "keval@gamil.com",
// });
// adp.getAll();
// adp.put(3, { first_name: "shree ram" });
// adp.del(1);

module.exports.MongoAdapter = MongoAdapter;
