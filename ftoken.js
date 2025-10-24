import { connect, createLocalAudioTrack } from 'livekit-client';

async function start() {
  // Получаем токен
  const resp = await fetch("https://liveki-tserver.vercel.app/api/token?room=StopAIFake", { method: "POST" });
  const data = await resp.json();
  const token = data.token;

  const url = "wss://stopaifake-07gwd6vp.livekit.cloud";

  // Подключаемся без автопубликации аудио, чтобы явно контролировать трек
  const room = await connect(url, token, { audio: false, video: false });

  // Явно создаём и публикуем локальный аудиотрек (микрофон)
  const localAudio = await createLocalAudioTrack();
  await room.localParticipant.publishTrack(localAudio);

  // Подписываемся на аудиотреки других участников (агента)
  room.on('trackSubscribed', (track, participant) => {
    if (track.kind === 'audio') {
      const audioEl = track.attach();
      audioEl.autoplay = true;
      audioEl.playsInline = true;
      document.body.appendChild(audioEl);
      console.log('Audio subscribed from', participant.identity);
    }
  });

  // Логирование для отладки
  room.on('participantConnected', p => console.log('Participant connected:', p.identity));
  room.on('participantDisconnected', p => console.log('Participant disconnected:', p.identity));
  room.on('disconnected', () => console.log('Disconnected from room'));
}

start().catch(e => {
  console.error('Start error', e);
  alert('Ошибка запуска: ' + e.message);
});

