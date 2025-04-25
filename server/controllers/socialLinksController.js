const socialLinks_Schema = require("../socialLink.js");

const createSocialLink = async (req, res) => {
    try {
        const { title, Url, isActive, icon, user_id } = req.body;

        const newSocialLink = new socialLinks_Schema({ title, Url, isActive, icon, user_id:req.params.user_id });
        await newSocialLink.save();

        res.status(201).json({ message: "Social link criado com sucesso!", socialLink: newSocialLink });
    } catch (error) {
        let errocod;
       errocod= console.error("Erro ao criar o Link:", error);
        res.status(500).json({ error: "erro do servidor!"+errocod });
    }
};

const getAllSocialLinks = async (req, res) => {
    try {
        const socialLinks = await socialLinks_Schema.find();
        
        const linksMapeados= socialLinks.map(link=>({
            socialLink_id: link._id.toString(),
            title: link.title,
            Url:link.Url,
            isActive:link.isActive,
            icon:link.icon,
            user_id:link.user_id
        }));

        res.json(linksMapeados);
        console.log(linksMapeados[6].socialLink_id)
        console.log("ewdew")
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const getSocialLinksByUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const socialLinks = await socialLinks_Schema.find({ user_id });
        const linksMapeados= socialLinks.map(link=>({
            socialLink_id: link._id.toString(),
            title: link.title,
            Url:link.Url,
            isActive:link.isActive,
            icon:link.icon,
            user_id:link.user_id
        }))
        if (!socialLinks.length) {
            return res.status(404).json({ message: "Social link não encontrado pra este usuário" });
        }

        res.json(linksMapeados);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateSocialLink = async (req, res) => {
    try {
        const { socialLink_id } = req.params;
        const updatedSocialLink = await socialLinks_Schema.findByIdAndUpdate(socialLink_id, req.body, { new: true });

        if (!updatedSocialLink) {
            return res.status(404).json({ message: "Social link não encontrado" });
        }

        res.json({ message: "Social link updated", socialLink: updatedSocialLink });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteSocialLink = async (req, res) => {
    try {
        const { socialLink_id } = req.params;
        const deletedSocialLink = await socialLinks_Schema.findByIdAndDelete(socialLink_id);

        if (!deletedSocialLink) {
            return res.status(404).json({ message: "Social link não encontrado" });
        }

        res.json({ message: "Social link apagado com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { createSocialLink, getAllSocialLinks, getSocialLinksByUser, updateSocialLink, deleteSocialLink };