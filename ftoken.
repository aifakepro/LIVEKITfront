const resp = await fetch("/api/token", { method: "POST" });
const data = await resp.json();
const token = data.token;

const room = "test-room";
const url = "wss://stopaifake-07gwd6vp.livekit.cloud";

const roomConnection = await LiveKit.connect(url, token, { 
  audio: true,
  video: false 
});
