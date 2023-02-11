import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export const ProjectPreview = ({name, _id, client}) => {

  const [project, setProject] = useState({});

  return (
<>


<table class="table-auto border-separate border-spacing-4 flex-col justify-between gap-10 text-center text-indigo-900 font-bold uppercase">
  <thead>
    <tr className='bg-white text-center'>
      <th class="border-2 border-slate-300 basis-1/3 rounded-md">Título</th>
      <th class="border border-slate-300 basis-1/3 rounded-md">Cliente</th>
      <th class="border border-slate-300 basis-1/3 rounded-md">Ver detalle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-slate-300"> {`${name}` }</td>
      <td class="border border-slate-300">  {`${client}` }</td>
      <td class="border border-violet-800">      
      <Link
              to={`/projects/${_id}`}
              className="uppercase text-sm text-violet-400 hover:text-violet-800 font-bold"
            >
              Ver detalle
            </Link></td>
    </tr>
    
  </tbody>
</table>

   
      </>
  )
}
