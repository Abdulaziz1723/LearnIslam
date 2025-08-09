(function () {
    const ayat = [
      {
        text: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا نُودِيَ لِلصَّلَاةِ مِن يَوْمِ الْجُمُعَةِ فَاسْعَوْا إِلَىٰ ذِكْرِ اللَّهِ",
        translation: "O you who believe! When the call is made for prayer on Friday, hasten to the remembrance of Allah.",
        surah: "Surah Al-Jumu‘ah 62:9"
      },
      {
        text: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
        translation: "Indeed, Allah is with those who are patient.",
        surah: "Surah Al-Baqarah 2:153"
      },
      {
        text: "فَاذْكُرُونِي أَذْكُرْكُمْ",
        translation: "So remember Me; I will remember you.",
        surah: "Surah Al-Baqarah 2:152"
      },
      {
        text: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ",
        translation: "Allah is the Light of the heavens and the earth.",
        surah: "Surah An-Nur 24:35"
      }
    ];
  
    const today = new Date();
    const isFriday = today.getDay() === 5;
  
    const ayah = isFriday ? ayat[0] : ayat[Math.floor(Math.random() * (ayat.length - 1)) + 1];
  
    const widget = document.createElement("div");
    widget.style.cssText = `
      max-width: 400px;
      background: #fff9e6;
      border: 2px solid #ffe08a;
      border-radius: 12px;
      padding: 15px;
      font-family: sans-serif;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      margin: 10px auto;
      text-align: center;
    `;
  
    widget.innerHTML = `
      <div style="font-size: 1.1rem; margin-bottom: 10px;">${ayah.text}</div>
      <div style="color: #555; font-style: italic;">${ayah.translation}</div>
      <div style="text-align: right; color: #999; font-size: 0.9rem;">${ayah.surah}</div>
    `;
  
    const container = document.getElementById("ayah-widget");
    if (container) {
      container.appendChild(widget);
    }
  })();
  