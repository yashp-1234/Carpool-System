const express = require("express")
const {makeRequest, checkRequest, getMyRequest,  updateRequest, deleteRequest, entriesRequest} = require("../controllers/requestControllers")

const router = express.Router()

router.route("/").post(makeRequest)
router.route("/check-request").get(checkRequest)
router.route("/getmyrequest").get(getMyRequest)
router.route("/update").put(updateRequest)
// router.route("/create").put(createRequest)
router.route("/delete").delete(deleteRequest)
router.route("/entries").get(entriesRequest)


module.exports = router;