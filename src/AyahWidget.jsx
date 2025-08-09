import React from "react";

const AyahWidget = () => {
  const ayat = [
    { text: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا نُودِيَ لِلصَّلَاةِ مِن يَوْمِ الْجُمُعَةِ فَاسْعَوْا إِلَىٰ ذِكْرِ اللَّهِ", translation: "O you who believe! When the call is made for prayer on Friday, hasten to the remembrance of Allah.", surah: "Al-Jumu‘ah 62:9" },
    { text: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", translation: "Indeed, Allah is with those who are patient.", surah: "Al-Baqarah 2:153" },
    { text: "فَاذْكُرُونِي أَذْكُرْكُمْ", translation: "So remember Me; I will remember you.", surah: "Al-Baqarah 2:152" },
    { text: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ", translation: "Allah is the Light of the heavens and the earth.", surah: "An-Nur 24:35" },
    { text: "وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ", translation: "My success is only by Allah.", surah: "Hud 11:88" },
    { text: "رَّبِّ زِدْنِي عِلْمًا", translation: "My Lord, increase me in knowledge.", surah: "Taha 20:114" },
    { text: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", translation: "Indeed, with hardship comes ease.", surah: "Ash-Sharh 94:6" },
    { text: "وَتَوَكَّلْ عَلَى اللَّهِ", translation: "And rely upon Allah.", surah: "Al-Ahzab 33:3" },
    { text: "لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا", translation: "Do not grieve; indeed Allah is with us.", surah: "At-Tawbah 9:40" },
    { text: "إِنَّ اللَّهَ يُحِبُّ الْمُتَوَكِّلِينَ", translation: "Indeed, Allah loves those who rely upon Him.", surah: "Aal-e-Imran 3:159" },
    { text: "وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ", translation: "Be patient, and your patience is only through Allah.", surah: "An-Nahl 16:127" },
    { text: "إِنَّ اللَّهَ غَفُورٌ رَّحِيمٌ", translation: "Indeed, Allah is Forgiving and Merciful.", surah: "An-Nisa 4:23" },
    { text: "إِنَّ اللَّهَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ", translation: "Indeed, Allah is over all things competent.", surah: "Al-Baqarah 2:20" },
    { text: "وَاللَّهُ يُحِبُّ الْمُحْسِنِينَ", translation: "And Allah loves the doers of good.", surah: "Aal-e-Imran 3:134" },
    { text: "لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ", translation: "Do not despair of the mercy of Allah.", surah: "Az-Zumar 39:53" },
    { text: "إِنَّ اللَّهَ مَعَ الْمُتَّقِينَ", translation: "Indeed, Allah is with those who fear Him.", surah: "At-Tawbah 9:36" },
    { text: "وَمَنْ يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ", translation: "And whoever relies upon Allah – then He is sufficient for him.", surah: "At-Talaq 65:3" },
    { text: "إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ", translation: "Indeed, Allah loves those who repent.", surah: "Al-Baqarah 2:222" },
    { text: "وَاللَّهُ عَلِيمٌ حَكِيمٌ", translation: "And Allah is Knowing and Wise.", surah: "An-Nisa 4:17" },
    { text: "إِنَّ اللَّهَ مَعَ الْمُحْسِنِينَ", translation: "Indeed, Allah is with the doers of good.", surah: "Al-Ankabut 29:69" }
  ];

  const today = new Date();
  const isFriday = today.getDay() === 5;
  const ayah = isFriday ? ayat[0] : ayat[Math.floor(Math.random() * (ayat.length - 1)) + 1];

  return (
    <div style={{
      minWidth: "80%",
      background: "#fff",
      border: "2px solid #000",
      borderRadius: "12px",
      padding: "15px auto",
      fontFamily: "sans-serif",
      margin: "20px auto",
      textAlign: "center"
    }}>
      <div style={{ fontSize: "1.1rem", marginBottom: "10px" }}>{ayah.text}</div>
      <div style={{ color: "#555", fontStyle: "italic" }}>{ayah.translation}</div>
      <div style={{ textAlign: "right", color: "#999", fontSize: "0.9rem" }}>{ayah.surah}</div>
    </div>
  );
};

export default AyahWidget;
