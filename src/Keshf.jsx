import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'



const root = createRoot(document.getElementById('main'));

root.render(
  <StrictMode>
          <div class="player">
        <h2>Part:1</h2>
        <audio id="audio" src="part-11.mp3"></audio>
      
        <div class="controls">
          <button id="toggleBtn">▶️</button>
          <input type="range" id="seekBar" value="0" step="1" min="0"/>
        </div>
      
        <div class="time">
          <span id="currentTime">00:00</span> / <span id="duration">00:00</span>
        </div>
      </div>
</StrictMode>
)

export default App