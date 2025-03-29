const SocialLink = require("../demo_create_mongo_db");

const createSocialLink = async (req, res) => {
    try {
        const { title, Url, isActive, icon, user_id } = req.body;

        if (!title || !Url || !user_id) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const newSocialLink = new SocialLink({ title, Url, isActive, icon, user_id });
        await newSocialLink.save();

        res.status(201).json({ message: "Social link created successfully", socialLink: newSocialLink });
    } catch (error) {
        res.status(500).json({ error: "erro do servidor!!!" });
    }
};

const getAllSocialLinks = async (req, res) => {
    try {
        const socialLinks = await SocialLink.find();
        res.json(socialLinks);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const getSocialLinksByUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const socialLinks = await SocialLink.find({ user_id });

        if (!socialLinks.length) {
            return res.status(404).json({ message: "No social links found for this user" });
        }

        res.json(socialLinks);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateSocialLink = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedSocialLink = await SocialLink.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedSocialLink) {
            return res.status(404).json({ message: "Social link not found" });
        }

        res.json({ message: "Social link updated", socialLink: updatedSocialLink });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteSocialLink = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSocialLink = await SocialLink.findByIdAndDelete(id);

        if (!deletedSocialLink) {
            return res.status(404).json({ message: "Social link not found" });
        }

        res.json({ message: "Social link deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { createSocialLink, getAllSocialLinks, getSocialLinksByUser, updateSocialLink, deleteSocialLink };