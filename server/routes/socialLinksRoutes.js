const express=require('express');
const { 
    createSocialLink, getAllSocialLinks, getSocialLinksByUser, updateSocialLink,  deleteSocialLink 
} = require("../controllers/socialLinksController");
const router = express.Router();

router.post("/social-links", createSocialLink);
router.get("/social-links", getAllSocialLinks);
router.get("/social-links/user/:user_id", getSocialLinksByUser);
router.put("/social-links/:socialLink_id", updateSocialLink);
router.delete("/social-links/:socialLink_id", deleteSocialLink);

module.exports = router;

