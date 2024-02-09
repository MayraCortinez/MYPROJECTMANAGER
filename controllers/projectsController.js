const createHttpError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const Project = require("../database/models/Project");
const errorResponse = require('../helpers/errorResponse');


module.exports = {

    list : async (req, res) => {

        try {

            const user = req.user;
            const projects = await Project.find().where('createdBy').equals(user) // requiere los projectos asociados al usuario

            return res.status(200).json({
                ok: true,
                msg : 'Lista de proyectos',
                projects : projects
            })

        } catch (error) {
            errorResponse(res, error, 'List Projects')
        }
    },

    store : async (req, res) => {

        try {

            const {name, description, client} = req.body;

            if([name, description, client]. includes("") || !name || !description || !client) throw createHttpError (400, 
                "Por favor, revisa los datos ingresados")
            
            if(!req.user) throw createHttpError (401, 
                "Autenticación fallida")                      // si no pasa la autenticación del middleware checktoken 

            const project = new Project(req.body);            
          
            project.createdBy = req.user._id                    // asocio el proyecto con el usuario (id)
            //console.log(project);

            const projectStore = await project.save();           // guardo el nuevo projecto en BD

            return res.status(201).json({
                ok: true,
                msg : 'Proyecto guardado con éxito',
                project : projectStore
            })

        } catch (error) {
            console.log(error)
            errorResponse(res, error, 'Problemas en Store Projects')
        }
    },

    detail : async (req, res) => {

        try {

            const {id} = req.params;

            if(!isValidObjectId(id)) throw createHttpError(400, "Id inválido"); 

            const project = await Project.findById(id).select('-createdAt').populate('tasks');             // Busca el proyecto que tenga por id, el mismo que se recibe por parámetro.

            if(!project) throw createHttpError(404, "Proyecto no encontrado");

            if(req.user._id.toString() !== project.createdBy.toString()) throw createHttpError(404, "Acceso denegado"); 

            return res.status(200).json({
                ok: true,
                msg : 'Detalle del projecto',
                project
            })

        } catch (error) {
            console.log(error)
            return errorResponse(res, error, 'Problemas en Detail Projects');
        }
    },

    update : async (req, res) => {

        try {

            const {id} = req.params;

            if(!isValidObjectId(id)) throw createHttpError(400, "Id inválido"); 

            const project = await Project.findById(id);

            if(!project) throw createHttpError(404, "Proyecto no encontrado");

            if(req.user._id.toString() !== project.createdBy.toString()) throw createHttpError(404, "Acceso denegado");

            
            const {name, description, client, dateExpire} = req.body;
            
            project.name = name || project.name;
            project.description = name || project.description;          //si llega información, edita; sino permanece el valor original
            project.client = client || project.client;   
            project.dateExpire = dateExpire || project.dateExpire;   
            
            const projectUpdated = await project.save();

            return res.status(201).json({
                ok: true,
                msg : 'Projecto editado con éxito',
                project : projectUpdated
            })

        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || "Problemas al editar el projecto"
            })
        } 
    },

    remove : async (req, res) => {

        try {

            const {id} = req.params;

            if(!isValidObjectId(id)) throw createHttpError(400, "Id inválido"); 

            const project = await Project.findById(id);

            if(!project) throw createHttpError(404, "Proyecto no encontrado");

            if(req.user._id.toString() !== project.createdBy.toString()) throw createHttpError(404, "Acceso denegado");

            await project.deleteOne();

            return res.status(200).json({
                ok: true,
                msg : 'Projecto eliminado con éxito'
            })

        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || "Problemas al eliminar el projecto"
            })
        } 
    },
    addCollaborator : async (req, res) => {
        try {
            return res.status(201).json({
                ok: true,
                msg : 'Colaborador agregado con éxito'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || "Problemas al agregar colaborador"
            })
        } 
    },
    removeCollaborator : async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg : 'Colaborador eliminado con éxito'
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || "Problemas al eliminar colaborador"
            })
        } 
    },
    
}