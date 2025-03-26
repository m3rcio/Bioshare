const User=require('./demo_create_mongo_db.js');

// const getUsers = async (req, res) => {
//     try {
//         const users = await User.find().select("-password"); 
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ error: "erro do servidor" });
//     }
// };

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.json({ message: "Usuário excluido com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "erro do servidor" });
    }
};

module.exports = {  getUsers, deleteUser };