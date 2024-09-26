import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllUsers, updateUserVerificationStatus, getAllUsersTransactions } from "../controllers/admin.controller.js";

const router = Router();

router.route("/get-all-users").post(verifyJWT, getAllUsers);

router.route("/update-user-verification-status").post(verifyJWT, updateUserVerificationStatus);

router.route("/get-all-users-transactions").post(verifyJWT, getAllUsersTransactions);



export default router