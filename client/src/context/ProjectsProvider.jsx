import React, { createContext, useState } from "react";
import {useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
import clientAxios from '../config/clientAxios';
const ProjectsContext = createContext();


const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
   });
   

export const ProjectsProvider = ({ children }) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({})
    const [project, setProject] = useState({});
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [alertModal, setAlertModal] = useState({}); 
    

const storeTask = async (task) => {
        try {
            const token = sessionStorage.getItem("token");
                if (!token) return null;
                const config = {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: token,
                        },
                };
                task.project = project._id;
                const { data } = await clientAxios.post("/tasks", task, config);

                project.tasks = [...project.tasks, data.task];

                setProject(project);

                setShowModal(false)

                Toast.fire({
                icon: "success",
                title: data.msg,
                });

            setAlert({});

        } catch (error) {
            console.log(error);
            showAlertModal(error.response ? error.response.data.msg : "Problemas cargando la tarea", false);
        }
        };

const handleShowModal = () => {
    setShowModal(!showModal)
}

const showAlertModal = (msg, time = true) => {
    setAlertModal ({
        msg
    });
    if (time) {
        setTimeout(() => {
            setAlertModal({});
        }, 3000)
    }
}

const showAlert = (msg, time = true) => {
        setAlert({
            msg,
        });
        if (time) {
            setTimeout(() => {
             setAlert({});
    }, 3000);
    }
}; 

const getProjects = async () => {

    setLoading(true);
    try {

        const token = sessionStorage.getItem("token");

        if (!token) return null;

        const { data } = await clientAxios.get("/projects", {
            headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    });

    setProjects(data.projects);

    } catch (error) {
        console.error(error);
        showAlert(error.response ? error.response.data.msg : 'Problemas al cargar los proyectos',
        false)
    } finally {
        setLoading(false)
    }
};

const getProject = async (id) => {

    setLoading(true);
    try {

        const token = sessionStorage.getItem("token");
        if (!token) return null;

        const config = {
            headers: {
            "Content-Type": "application/json",
            Authorization: token,
        }}

        const { data } = await clientAxios.get(`/projects/${id}`, config); 


    setProject(data.project);

    setAlert({})

    } catch (error) {
        console.error(error);
        showAlert(error.response ? error.response.data.msg : 'Problemas al cargar detalles del proyecto',
        false)
    } finally {
        setLoading(false)
    }
};

const storeProject = async (project) => {

    const token = sessionStorage.getItem("token");

    if (!token) return null;

    try {
        const config = {
            headers: {
            "Content-Type": "application/json",
            Authorization: token,
            },
        };

        if(project.id){

            const { data } = await clientAxios.put( `/projects/${project.id}`, project, config);
            const projectsUpdated = projects.map(projectState => {
                if(projectState._id === data.project._id){
                    return data.project
                }
                return projectState;
            })
            Toast.fire({
                icon: "success",
                title: data.msg,
                position:"top-right"
                });
            setProject(projectsUpdated)
        }else{
            const { data } = await clientAxios.post( '/projects', project, config);
            Toast.fire({
                icon: "success",
                title: data.msg,
                position:"top-right"
                });
            setProjects([...projects, data.project]); 

        }


        navigate('projects')
        

    }catch{

        console.error(error);
        const { response } = error;
        if (response?.status === 401) {
            navigate("/");

        }else{

            showAlert(
            response ? response.data.msg : "Problemas creando proyecto",
            false
    );
    }
    }
}


const deleteProject = async (id) => {
    try {
        const token = sessionStorage.getItem("token");

        if (!token) return null;
        const config = {
            headers: {
            "Content-Type": "application/json",
            Authorization: token,
            },
        };
        const { data } = await clientAxios.delete( `/projects/${id}`,config);
        const projectsFiltered = projects.filter(project => project._id !== id);

        setProjects(projectsFiltered)

        Toast.fire({
            icon: "success",
            title: data.msg,
            position:"top-center"
        });

        navigate('projects')

    } catch (error) {
        console.error(error);
        showAlert(error.response ? error.response.data.msg : 'Problemas al eliminar el proyecto', false)
    }
}

    return (
        <ProjectsContext.Provider

            value={{
                loading,
                alert,
                showAlert,
                getProjects,
                projects,
                getProject,
                project,
                storeProject,
                deleteProject,
                handleShowModal,
                setAlertModal,
                showAlertModal,
                storeTask 
                }}
                >

            {children}

        </ProjectsContext.Provider>
    );
    };
export default ProjectsContext;
