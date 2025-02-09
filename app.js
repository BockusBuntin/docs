const express = require("express");
const app = express();
const port = 3000; 
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true })); 
const Mydata = require("./models/myDataSchema"); // Ensure the correct path and filename

mongoose
.connect("mongodb+srv://ahmedKuttab:ahmedkuttb123@cluster0.fpbig.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err); // Improved error message
  });

app.get("/", (req, res) => {
  res.sendFile("./test/index.html", { root: __dirname });
});

app.post("/", (req, res) => {
  console.log("تم استلام طلب POST إلى /");
  console.log("البيانات المستلمة:", req.body);
  const myData = new Mydata(req.body);

  console.log("محاولة حفظ البيانات...");
  myData
    .save()
    .then(() => {
      console.log("تم حفظ البيانات بنجاح!");
      res.redirect("/");
    })
    .catch((err) => {
      console.log("حدث خطأ أثناء حفظ البيانات:", err);
    });
});