import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  transferFunds,
  verifyReceiver,
  getAllTransactionsByUser,
  createCheckoutSession,
  depositFunds,
} from "../controllers/transaction.controller.js";

const router = Router();

// router.route("/register").post(registerUser);
router.route("/transfer-funds").post(verifyJWT, transferFunds);

router.route("/verify-receiver").post(verifyJWT, verifyReceiver);

router.route("/get-transactions").post(verifyJWT, getAllTransactionsByUser);

router.route("/create-checkout-session").post(verifyJWT, createCheckoutSession);

router.route("/deposit-funds").post(verifyJWT, depositFunds);

export default router;
