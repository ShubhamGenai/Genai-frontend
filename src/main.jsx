import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { store } from "./redux/Store.jsx";
import { MainProvider } from './context/MainContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>

    
       <MainProvider>
       <App />
       </MainProvider>
       </Provider>
  
  </StrictMode>,
)
