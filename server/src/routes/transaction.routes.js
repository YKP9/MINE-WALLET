import { Router } from "express";
import { verifyJWT }  from "../middlewares/auth.middleware.js";
import { transferFunds, verifyReceiver } from "../controllers/transaction.controller.js";


const router = Router();

// router.route("/register").post(registerUser);
router.route("/transfer-funds").post(verifyJWT, transferFunds);

router.route("/verify-receiver").post(verifyJWT, verifyReceiver);


export default router;
