import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Alert } from "../components/Alert";
import { Collaborator } from "../components/Collaborator";
import { Task } from "../components/Task";
import { useProjects }from "../hooks/useProjects";


export const Project = () => {

  const navigate = useNavigate()
  const {id} = useParams();
  const { loading, alert, getProject, project, deleteProject } = useProjects();
  const { name, description, dateExpire, client, _id } = project;

  const handleDelete = () => {
    Swal.fire({
      title: '¿Deseas borrar el proyecto?',
      text: "Se eliminará definitivamente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProject(project._id)
      } navigate('projects')
    })
  }

  console.log(project);

  useEffect(() => {
    getProject(id);
  }, [id]);

  if (alert.msg) return <Alert {...alert} />;

  return (
    <>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div className='flex flex-col text-indigo-900 p-5'>
            <div className="flex justify-end gap-4">
              <Link to={`/projects/edit-project/${_id}`} className="bg-pink-200/50 rounded-lg hover:bg-white" >
                <img src="https://img.icons8.com/nolan/64/edit--v1.png" />
              </Link>
              <button className="bg-pink-200/50 rounded-lg hover:bg-red-600/50"
                onClick={handleDelete}>
                <img src="https://img.icons8.com/nolan/64/delete-forever.png" />
              </button>
            </div>
            <h1 className="text-indigo-900 text-3xl uppercase font-bold text-center">Título: {name}</h1>
            <div className=' bg-indigo-800/50 p-10 m-10 rounded-md justify-center flex flex-col text-center'>
              <p className="text-lg uppercase font-bold">Descripción: {description}</p>
              <p className="text-white font-bold text-lg">Fecha de entrega: {dateExpire && dateExpire.split('T')[0]}</p>
              <span className="text-lg uppercase font-bold">Cliente: {client}</span>
            </div>
            <div className="flex justify-between">

              <div className="">
                <p className="text-indigo-900 font-bold text-2xl mt-10 mb-5">Tareas del proyecto:</p>

                <img src="https://img.icons8.com/nolan/32/plus.png" />

                <img src="https://img.icons8.com/office/32/null/delete-property.png" />


              </div>


            </div>
          </div>

        </>
      )}
    </>
  );
};
