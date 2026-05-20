import { Router } from "express";
import { profileControler } from "./profile.controler";

const routes = Router()

routes.post("/",profileControler.createProfile)

export const profileRoutes = routes