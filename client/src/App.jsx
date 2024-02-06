import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { AuthLayout } from './layouts/AuthLayout'
import { ConfirmAccount } from './pages/ConfirmAccount' 
import { ForgetPassword } from './pages/ForgetPassword'
import { Login } from './pages/Login'
import { RecoverPassword } from './pages/RecoverPassword'
import { Register } from './pages/Register'
import { NotFound } from './pages/NotFound/index'
import { AuthProvider } from './context/AuthProvider'
import { ProtectedLayout } from './layouts/ProtectedLayout'
import { Projects } from './pages/Projects'
import { CreateProject } from './pages/CreateProject'
import { EditProject } from './pages/EditProject'
import { Project } from './pages/Project'
import { ProjectsProvider } from './context/ProjectsProvider'


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
      <ProjectsProvider>
          <Routes>

             {/* Rutas Públicas  */}
            <Route  path='/'  element={<AuthLayout/>} >
              <Route  index   element={<Login/>}
              />
              <Route  path='register'  element={<Register/>}
              />
              <Route  path='forget-password'  element={<ForgetPassword/>}
              />
              <Route  path='recover-password/:token'  element={<RecoverPassword/>}
              />
              <Route  path='confirm/:token'  element={<ConfirmAccount/>}
              />
              <Route  path='*'  element={<NotFound/>}
              />
            </Route>  

              {/* Rutas privadas */}
            <Route  path='/projects'  element={<ProtectedLayout/>}
            >
              <Route  index  element={<Projects/>}
              />
              <Route  path='create-project'  element={<CreateProject/>}
              />
              <Route  path='edit-project/:id' element={<EditProject/>}
              />
              <Route  path=':id'  element={<Project/>}
              />
            </Route>
          </Routes>
          </ProjectsProvider>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
