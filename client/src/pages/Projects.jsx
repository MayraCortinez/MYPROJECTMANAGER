import React, { useEffect } from 'react'
import { Alert } from '../components/Alert'
import { ProjectPreview } from '../components/ProjectPreview'
import { useProjects } from '../hooks/useProjects'



export const Projects = () => {


  const {loading, alert, projects, getProjects} = useProjects();

  useEffect(() => {
    getProjects();
   }, []);

    
   if (alert.msg) return <Alert {...alert} />

   return (
    <>
      <h1 className='text-4xl font-violet-600 text-center text-violet-900 font-bold uppercase mb-5 mt-5'
      >
        Proyectos:
      </h1>
    <div className='flex flex-col justify-center text-center gap-10'>

      {
        loading ?
          <p>Cargando...</p> 
            :
          (
            projects.length 
            ? 
            projects.map(project => <ProjectPreview key={project._id} {...project}/>)
            :
          <p className=' text-4xl font-violet-600 text-center text-violet-900 font-bold uppercase mb-5 mt-5' >No existen proyectos guardados</p>
        )
      }
    </div>
 </>
)
}