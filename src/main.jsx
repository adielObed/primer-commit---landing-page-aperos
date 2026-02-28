import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css' 
// 1. Importamos tu diseño real en lugar de App
import AperosLanding from './AperosLanding.jsx' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Le decimos a React que dibuje tu diseño en la pantalla */}
    <AperosLanding />
  </StrictMode>,
)