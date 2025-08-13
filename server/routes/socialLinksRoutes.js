const express=require('express');
const { 
    createSocialLink, getAllSocialLinks, getSocialLinksByUser, updateSocialLink,  deleteSocialLink,updateSocialLinkIsActive,updateSocialLinkIconAndColor
} = require("../controllers/socialLinksController");
const router = express.Router();

router.post("/social-links/:user_id", createSocialLink);
router.get("/social-links", getAllSocialLinks);
router.get("/social-links/user/:user_id", getSocialLinksByUser);
router.put("/social-links/:socialLink_id", updateSocialLink);
router.patch("/social-links/:socialLink_id/toggle", updateSocialLinkIsActive);
router.patch("/social-links/:socialLink_id/icon", updateSocialLinkIconAndColor);
router.delete("/social-links/:socialLink_id", deleteSocialLink);

module.exports = router;

