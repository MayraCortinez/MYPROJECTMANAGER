module.exports = {
    profile : async ( req, res) => {
        try {
            return res.status(201).json({
                ok: true,
                msg : 'Perfil del usuario',
                user : req.user
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || "Problemas con el perfil del Usuario"
            })
        }
    }
}