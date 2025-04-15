const User=require('../../server/socialLink');



const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "erro do servidor" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        await User.findByIdAndDelete(user_id);
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

module.exports = {  getAllUsers, deleteUser,updateUser };