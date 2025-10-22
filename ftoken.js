// Получаем токен с вашего сервера
const resp = await fetch("https://liveki-tserver.vercel.app/api/token?room=StopAIFake", { method: "POST" });
const data = await resp.json();
const token = data.token;

const url = "wss://stopaifake-07gwd6vp.livekit.cloud";

const roomConnection = await LiveKit.connect(url, token, { 
  audio: true,
  video: false 
});

