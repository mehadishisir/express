import { Router } from "express";
import { userControler } from "./user.controler";

const router = Router()
router.post('/',userControler.createUser)
router.get('/',userControler.getAllUser)
router.get('/:id',userControler.getSingleUser)
router.put("/:id",userControler.updateSingleUser);
router.delete("/:id",userControler.deleteUser);

export default router