import React from "react";

const AyahWidget = () => {
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

  return (
    <div style={{
      minWidth: "85%",
      background: "#fff",
      border: "2px solid #000",
      borderRadius: "12px",
      padding: "15px",
      fontFamily: "sans-serif",
      boxShadow: "0 4px 5px #000",
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
