import { StrictMode } from 'react'
import './App.css'
import { createRoot } from 'react-dom/client'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';


const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
  <Header/>
  <Main/>
  <Footer/>
</StrictMode>
)

