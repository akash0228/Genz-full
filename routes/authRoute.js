import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  OrderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//routing
//register
router.post("/register", registerController);

//login
router.post("/login", loginController);

//forgot password
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected  Admin route
router.get("/admin-auth", requireSignIn, isAdmin,(req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put('/profile',requireSignIn,updateProfileController);

//orders
router.get('/orders',requireSignIn, getOrdersController);

//All orders admin
router.get('/all-orders',requireSignIn, isAdmin,getAllOrdersController);

//order status update
router.put('/order-status/:orderId',requireSignIn, isAdmin,OrderStatusController);

export default router;
