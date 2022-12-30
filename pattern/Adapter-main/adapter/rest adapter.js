const axios = require("axios");

class RestAdapter {
  constructor() {}
  get(query_id) {
    axios
      .get(`http://localhost:3000/employees/${query_id}`, {})
      .then((res) => {
        console.log("showing one entry");
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getAll() {
    axios
      .get("http://localhost:3000/employees", {})
      .then((res) => {
        console.log("showing all the entries");
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  post(query_obj) {
    axios
      .post("http://localhost:3000/employees", {
        ...query_obj,
      })
      .then((res) => {
        console.log("Successfully inserted");
        // console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  put(query_id, query_obj) {
    axios
      .put(`http://localhost:3000/employees/${query_id}`, {
        ...query_obj,
      })
      .then((res) => {
        console.log("successfully put");
        // console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  patch(query_id, query_obj) {
    axios
      .patch(`http://localhost:3000/employees/${query_id}`, {
        ...query_obj,
      })
      .then((res) => {
        console.log("Sucessfully patched");
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  del(query_id) {
    axios
      .delete(`http://localhost:3000/employees/${query_id}`, {})
      .then((res) => {
        console.log("successfully deleted");
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// del(2);

// adp = new RestAdapter();
// adp.get(3);
// adp.getAll();
// // adp.post("bahu", "bali", "findmeifucan@gmail.com");
// adp.post({
//   id: 1,
//   first_name: "keval",
//   last_name: "shah",
//   email: "keval@gamil.com",
// });
// adp.getAll();
// adp.put(3, { first_name: "shree ram" });
// adp.del(3);

module.exports.RestAdapter = RestAdapter;
