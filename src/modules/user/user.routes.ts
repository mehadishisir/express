import { Router } from "express";
import { userControler } from "./user.controler";
import { auth } from "../../middleware/auth";

const router = Router()
router.post('/',userControler.createUser)
router.get('/',auth(),userControler.getAllUser)
router.get('/:id',userControler.getSingleUser)
router.put("/:id",userControler.updateSingleUser);
router.delete("/:id",userControler.deleteUser);

export default router