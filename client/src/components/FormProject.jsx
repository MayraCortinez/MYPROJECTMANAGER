import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { useProjects } from "../hooks/useProjects";
import { Alert } from "./Alert";


export const FormProject = () => {

  const {showAlert, alert, storeProject, project} = useProjects();

  const {id} = useParams();

  const inputName = useRef(null);
  const inputDescription = useRef(null);
  const inputDate = useRef(null);
  const inputClient = useRef(null);

 
  const {setFormValues, formValues, handleInputChange, reset} = useForm({
    name : "",
    description : "",
    dateExpire : "",
    client : ""
    });

  let {name, description, dateExpire, client} = formValues;

  useEffect(() => {

    if(id){                 //console.log(project);

      inputName.current.value = project.name;
      inputDescription.current.value = project.description;
      inputDate.current.value = project.dateExpire && project.dateExpire.split('T')[0];
      inputClient.current.value = project.client;

      setFormValues({
        name : project.name,
        description : project.description,
        dateExpire : project.dateExpire.split('T')[0],
        client : project.client
      })
      
    }
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([name, description, dateExpire, client].includes("")) {
      showAlert("No deben quedar campos vacíos",true);
      return null
     }
     storeProject({
      id : id ? id : null,
      name,
      description,
      dateExpire,
      client
     });
     reset()
    };

  return (
    <form
      className="bg-white p-5 md:w-4/4 lg:w-3/4 rounded-md border-2 m-2"
     onSubmit={handleSubmit} 
    >
            {
        alert.msg && <Alert {...alert} /> 
      }
     
      <div className="mb-5">
        <label
          htmlFor="name"
          className=" text-indigo-900 uppercase font-bold text-sm"
        >
          Nombre Proyecto
        </label>
        <input
          id="name"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del proyecto"
          value={name}
          name="name"
          onChange={handleInputChange}
          ref={inputName}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="description"
          className=" text-indigo-900 uppercase font-bold text-sm"
        >
          Descripción
        </label>
        <textarea
          id="description"
          type="text"
          style={{ resize: "none" }}
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descripción del proyecto"
          value={description}
          name="description"
          onChange={handleInputChange}
          ref={inputDescription}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="date-expire"
          className=" text-indigo-900 uppercase font-bold text-sm"
        >
          Fecha de entrega
        </label>
        <input
          id="date-expire"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={dateExpire}
          name="dateExpire"
          onChange={handleInputChange}
          ref={inputDate}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="client"
          className=" text-indigo-900 uppercase font-bold text-sm"
        >
          Nombre Cliente
        </label>
        <input
          id="client"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del cliente"
          value={client}
          name="client"
          onChange={handleInputChange}
          ref={inputClient}
        />
      </div>
      <button className={`${id ? "bg-green-600" : "bg-sky-600"} w-full p-3 uppercase font-bold text-white rounded-lg ${false ? "hover:bg-green-500/50" : "hover:bg-green-500"}  transition-colors`}>
        {id ? "Editar proyecto" : "Guardar proyecto"}
      </button>
    </form>
    );
};