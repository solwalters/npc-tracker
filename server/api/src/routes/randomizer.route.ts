import { Router } from "express";
import { getFirstName, getLastName, getAlias, getMetatype, getOrigin, getIdentifyingFeature, getJob, getPersonalityQuirk, getRace, getAdjective, getOrganization } from "../controllers/randomizer.controller";

const randomizerRouter = Router();

// Register a new user
randomizerRouter.get("/firstName", getFirstName);
randomizerRouter.get("/lastName", getLastName);
randomizerRouter.get("/alias", getAlias);
randomizerRouter.get("/adjective", getAdjective);
randomizerRouter.get("/race", getRace);
randomizerRouter.get("/metatype", getMetatype);
randomizerRouter.get("/origin", getOrigin);
randomizerRouter.get("/identifyingFeature", getIdentifyingFeature);
randomizerRouter.get("/job", getJob);
randomizerRouter.get("/personalityQuirk", getPersonalityQuirk);
randomizerRouter.get("/organization", getOrganization);

export const randomizerRoutes = randomizerRouter