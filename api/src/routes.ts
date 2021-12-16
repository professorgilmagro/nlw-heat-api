import { Router } from "express";
import { AutheticateUserController } from "./controllers/AutheticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { LastMessagesController } from "./controllers/LastMessagesController";
import { UserProfileController } from "./controllers/UserProfileController";
import { AuthenticatedMiddleware } from "./middleware/AuthenticatedMiddleware";

const router = Router();

router.get("/github", (request, response) => {
    response.redirect(`${process.env.GITHUB_OAUTH_URL}/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
});

router.get("/signin/callback", (request, response) => {
    const { code } = request.query;
    return response.json(code);
})

router.post("/authenticate", new AutheticateUserController().handle)
router.post("/messages", AuthenticatedMiddleware, new CreateMessageController().handle)
router.get("/messages/last3", new LastMessagesController().handle)
router.get("/profile", AuthenticatedMiddleware, new UserProfileController().handle)

export { router };