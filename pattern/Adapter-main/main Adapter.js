const Mongo = require("./adapter/mongo adapter");
const Rest = require("./adapter/rest adapter");
const Array = require("./adapter/array adapter");

class Adapter {
  constructor(type) {
    type = type.toLowerCase();
    if (type === "array") {
      this.obj = new Array.ArrayAdapter();
      console.log("Array adapter created");
    } else if (type === "mongo") {
      this.obj = new Mongo.MongoAdapter();
      console.log("Mongodb adapter created");
    } else if (type === "rest") {
      this.obj = new Rest.RestAdapter();
      console.log("Rest adapter created");
    }
  }

  get(query_id) {
    try {
      if (typeof query_id !== "number") {
        throw new TypeError("Query ID must be a vaid number");
      }
      this.obj.get(query_id);
    } catch (e) {
      console.log(e.message);
    }
  }

  getAll() {
    this.obj.getAll();
  }

  post(query_obj) {
    try {
      if (typeof query_obj !== "object") {
        throw new TypeError("Query post must be a vaid object");
      }
      this.obj.post(query_obj);
    } catch (e) {
      console.log(e.message);
    }
  }

  put(query_id, query_obj) {
    try {
      if (typeof query_id !== "number") {
        throw new TypeError("Query ID must be a vaid number");
      }
      if (typeof query_obj !== "object") {
        throw new TypeError("Query post must be a vaid object");
      }
      this.obj.put(query_id, query_obj);
    } catch (e) {
      console.log(e.message);
    }
  }

  patch(query_id, query_obj) {
    try {
      if (typeof query_id !== "number") {
        throw new TypeError("Query ID must be a vaid number");
      }
      if (typeof query_obj !== "object") {
        throw new TypeError("Query post must be a vaid object");
      }
      this.obj.patch(query_id, query_obj);
    } catch (e) {
      console.log(e.message);
    }
  }

  del(query_id) {
    try {
      if (typeof query_id !== "number") {
        throw new TypeError("Query ID must be a vaid number");
      }
      this.obj.del(query_id);
    } catch (e) {
      console.log(e.message);
    }
  }
}

adp = new Adapter("rest");
// EXECUTE ALL ONE BY ONE

adp.getAll();
adp.post({
  id: 100,
  first_name: "keval",
  last_name: "shah",
  email: "keval@gmail.com",
});
adp.get(100);
adp.patch(100, { first_name: "amit" });
adp.getAll();
adp.put(100, { first_name: "rahul", last_name: "vijay" });
adp.getAll();
adp.del(100);
adp.getAll();

adp = new Adapter("mongo");
//EXECUTE ALL ONE BY ONE

adp.getAll();
adp.post({
  id: 100,
  first_name: "keval",
  last_name: "shah",
  email: "keval@gmail.com",
});
adp.get(100);
adp.patch(100, { first_name: "amit" });
adp.getAll();
adp.put(100, { id: 100, first_name: "rahul", last_name: "vijay" });
adp.getAll();
adp.del(100);
adp.getAll();

adp = new Adapter("array");
// IMP IMP to be executed all at once

adp.getAll();
adp.post({
  id: 100,
  first_name: "keval",
  last_name: "shah",
  email: "keval@gmail.com",
});
adp.get(100);
adp.patch(100, { first_name: "amit" });
adp.getAll();
adp.put(100, { id: 100, first_name: "rahul", last_name: "vijay" });
adp.getAll();
adp.del(100);
adp.getAll();
