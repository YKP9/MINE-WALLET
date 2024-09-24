import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllRequestsByUser, sendRequest, updateRequest } from "../controllers/request.controller.js";

const router = Router();

router.route("/get-all-requests").post(verifyJWT, getAllRequestsByUser);

router.route("/send-request").post(verifyJWT, sendRequest);

router.route("/update-request-status").post(verifyJWT, updateRequest);

export default router