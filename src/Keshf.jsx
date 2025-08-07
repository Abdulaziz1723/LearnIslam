import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'



const root = createRoot(document.getElementById('main'));

root.render(
  <StrictMode>
    <h1>hello</h1>
</StrictMode>
)