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

const updateUser = async (req,res)=>{
    try{
        const {user_id}= req.params;
        const updateUser=await User.findByIdAndUpdate(user_id,req.body,{new:true});

        if(!updateUser){
            return res.status(404).json({
                message:'usuário não encontrado'
            });
        }
        res.json({message:'usuário atualizado com sucesso!',user: updatedUser});
    }catch (error){
        res.status(500).json({error:'erro no servidor!'});
    }
}

module.exports = {  getUsers, deleteUser,updateUser };