const router=require("express").Router();
const productControll=require("../controllers/productControll");
const transactionControll=require("../controllers/transactionControll");
const userControll=require("../controllers/userControll");

//===========================> Product

// Add new product
router.post("/product/add",productControll.add);

// Retrieve all product list
router.get("/product/all",productControll.all);

// Delete product based on id
router.delete("/product/delete/:id",productControll.delete);

// Update product based on id
router.put("/product/update/:id",productControll.update);

//===========================> Transaction

// Add Transaction
router.post("/transaction/add",transactionControll.add);

// List History of Transaction
router.get("/transaction/all/:userId",transactionControll.all);

// Remove All Transaction Data
router.get("/transaction/purge",transactionControll.purge);

//===========================> User

// Add New User
router.post("/user/add",userControll.add);

// Login User
router.post("/user/login",userControll.login);

// Retrieve Users List
router.get("/user/all",userControll.all);

// Get user data
router.get("/user/get",userControll.get);

module.exports=router;
