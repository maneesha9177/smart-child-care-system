// ============================================================
// NEW EMOTIONS PAGE FUNCTIONS
// ============================================================

const EMOTION_DATA = {
  'Happy': {
    ico: '😊',
    color: '#15803d',
    quote: '"A happy baby is a growing baby — treasure every smile!"',
    activities: [
      'Play with colorful toys or make funny faces to keep the giggles going',
      'Sing or play soft music to encourage movement and smiling',
      'Try peek-a-boo games — babies love the surprise and interaction',
      'Let baby explore safe textures and objects to maintain curiosity'
    ]
  },
  'Sad': {
    ico: '😢',
    color: '#1e40af',
    quote: '"Even small acts of comfort create lifelong bonds with your baby."',
    activities: [
      'Hold baby close and provide gentle skin-to-skin contact',
      'Try soft lullabies or calming background sounds',
      'Change the environment — move to a different room with soft lighting',
      'Check all basics: hunger, nappy, temperature, and comfort'
    ]
  },
  'Suffocated': {
    ico: '😫',
    color: '#92400e',
    quote: '"Fresh air and comfort are your baby\'s basic needs."',
    activities: [
      'Open windows or move to a well-ventilated area immediately',
      'Loosen baby\'s clothing and remove extra blankets',
      'Ensure baby can burp properly — try different holding positions',
      'Check baby\'s nose — gently clear if congested with saline drops'
    ]
  },
  'Cry': {
    ico: '😭',
    color: '#b91c1c',
    quote: '"Crying is communication — listen and respond with love."',
    activities: [
      'Check the basics first: hunger, nappy change, gas, temperature',
      'Try gentle rocking, swaddling, or white noise to soothe',
      'Walk around with baby — motion often calms crying infants',
      'If loud and arching back, consult doctor for colic assessment'
    ]
  }
};

const EMOTION_QUESTIONS = {
  'Happy': [
    { q: "Is your baby smiling and making eye contact with you?", opts: ["Yes, lots of big smiles!", "A little bit", "Not really, just calm"] },
    { q: "How active is your baby feeling right now?", opts: ["Very active and energetic", "Calm and content", "Quiet and resting"] },
    { q: "When did your baby last feed?", opts: ["Very recently (under 1 hour)", "1–2 hours ago", "More than 2 hours ago"] },
    { q: "How did your baby sleep last night?", opts: ["Slept very well", "Slept okay with some waking", "Slept poorly or cried a lot"] },
  ],
  'Sad': [
    { q: "Is your baby making soft whimpering sounds?", opts: ["Yes, continuously", "On and off", "Silent but looks sad"] },
    { q: "When was your baby's nappy last changed?", opts: ["Just changed it", "1–2 hours ago", "Not sure / it has been a while"] },
    { q: "Has your baby been fed recently?", opts: ["Yes, just fed", "About 2 hours ago", "Not fed in 3 or more hours"] },
    { q: "Is your baby reaching out to be held?", opts: ["Yes, wants to be held", "Sometimes", "Wants to be left alone"] },
  ],
  'Suffocated': [
    { q: "Is the room well ventilated or air-conditioned?", opts: ["Yes, good airflow", "A bit stuffy", "No, very closed room"] },
    { q: "How is your baby dressed right now?", opts: ["Light and loose clothing", "Somewhat bundled", "Bundled up heavily"] },
    { q: "Has your baby been burped after the last feed?", opts: ["Yes, burped well", "Not burped recently", "Baby has not fed recently"] },
    { q: "Is your baby's nose clear and breathing freely?", opts: ["Completely clear", "Slightly runny or blocked", "Noticeably congested"] },
  ],
  'Cry': [
    { q: "How intense is your baby's crying right now?", opts: ["Mild whimpering", "Moderate steady crying", "Very loud / inconsolable"] },
    { q: "Did the crying start suddenly or build up?", opts: ["Yes, out of nowhere", "Built up gradually", "On and off for a while"] },
    { q: "Have you checked nappy, hunger and temperature already?", opts: ["Checked all three, all fine", "Checked some of them", "Not checked yet"] },
    { q: "Is your baby arching their back while crying?", opts: ["Yes, back arching", "No arching", "Hard to tell"] },
  ]
};

let currentEmotion = null;
let currentEmoQuestionIdx = 0;
let currentEmoAnswers = [];

function resetEmotions() {
  document.getElementById('emo-step-pick').style.display = 'block';
  document.getElementById('emo-step-questions').style.display = 'none';
  document.getElementById('emo-step-result').style.display = 'none';
  currentEmotion = null;
  currentEmoQuestionIdx = 0;
  currentEmoAnswers = [];
}

function startEmoQuestions(emotion) {
  currentEmotion = emotion;
  currentEmoQuestionIdx = 0;
  currentEmoAnswers = [];
  
  const data = EMOTION_DATA[emotion];
  document.getElementById('emo-ico').textContent = data.ico;
  document.getElementById('emo-emotion-label').textContent = emotion + ' Baby';
  document.getElementById('emo-step-pick').style.display = 'none';
  document.getElementById('emo-step-questions').style.display = 'block';
  document.getElementById('emo-step-result').style.display = 'none';
  
  displayEmoQuestion();
}

function displayEmoQuestion() {
  const questions = EMOTION_QUESTIONS[currentEmotion];
  const q = questions[currentEmoQuestionIdx];
  
  document.getElementById('emo-q-counter').textContent = `Q${currentEmoQuestionIdx + 1}/${questions.length}`;
  document.getElementById('emo-question-text').textContent = q.q;
  
  const container = document.getElementById('emo-options-container');
  container.innerHTML = '';
  
  q.opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'btn-sm';
    btn.style.cssText = 'width:100%;text-align:left;padding:12px;font-weight:700;border:2px solid #e5e7eb;background:#fff;cursor:pointer;border-radius:8px;';
    btn.textContent = opt;
    btn.onclick = () => answerEmoQuestion(opt);
    container.appendChild(btn);
  });
}

function answerEmoQuestion(opt) {
  currentEmoAnswers.push(opt);
  const questions = EMOTION_QUESTIONS[currentEmotion];
  
  if (currentEmoQuestionIdx + 1 >= questions.length) {
    showEmoResult();
  } else {
    currentEmoQuestionIdx++;
    displayEmoQuestion();
  }
}

function backEmoQuestions() {
  resetEmotions();
}

function showEmoResult() {
  const data = EMOTION_DATA[currentEmotion];
  
  document.getElementById('emo-step-questions').style.display = 'none';
  document.getElementById('emo-step-result').style.display = 'block';
  
  document.getElementById('emo-result-ico').textContent = data.ico;
  document.getElementById('emo-result-title').textContent = currentEmotion + ' Baby — Here Is What To Do';
  document.getElementById('emo-result-title').style.color = data.color;
  document.getElementById('emo-result-quote').textContent = data.quote;
  
  const activitiesHTML = data.activities.map((a, i) => `
    <div style="display:flex;gap:8px;margin-bottom:6px">
      <span style="width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;color:white;background:${data.color};flex-shrink:0">${i+1}</span>
      <span>${a}</span>
    </div>
  `).join('');
  document.getElementById('emo-result-activities').innerHTML = activitiesHTML;
  
  const insight = currentEmoAnswers.length > 0 ? 
    `Based on your answers, baby appears to be ${currentEmotion.toLowerCase()}. ${data.quote} Follow the recommended activities above and monitor closely. If concerns persist, consult your paediatrician.` :
    'Assessment complete. Follow the recommended activities and monitor your baby closely.';
  document.getElementById('emo-result-insight').textContent = insight;
  
  // Save to backend (async, doesn't block UI)
  setTimeout(() => {
    fetch('/api/emotions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emotion: currentEmotion,
        answers: currentEmoAnswers,
        recommendations: data.activities
      })
    }).catch(e => console.log('Emotion saved locally'));
  }, 100);
}

// ============================================================
// NEW SLEEP PAGE FUNCTIONS  
// ============================================================

const LULLABY_SONGS = [
  { title: "Brahms' Lullaby", emoji: "🌙", notes: "Classical", file: "brahms.wav" },
  { title: "Twinkle Twinkle Little Star", emoji: "⭐", notes: "Gentle", file: "twinkle.wav" },
  { title: "Rock-a-Bye Baby", emoji: "🌿", notes: "Soothing", file: "rock.wav" },
  { title: "Hush, Little Baby", emoji: "🤫", notes: "Warm", file: "hush.wav" },
  { title: "You Are My Sunshine", emoji: "☀️", notes: "Cheerful", file: "sunshine.wav" },
  { title: "Sleep Baby Sleep", emoji: "😴", notes: "Deep Calm", file: "sleep.wav" }
];

let sleepActive = false;
let sleepElapsed = 0;
let sleepTimer = null;
let sleepSessions = [];
let currentLullaby = -1;
let lullabyPlaying = false;
let currentAudio = null;
let musicDurationTimer = null;
let musicStartTime = null;
let countdownTimer = null;

function initSleepPage() {
  renderLullabyList();
  updateSleepTargetHrs();
}

function renderLullabyList() {
  const container = document.getElementById('lullaby-list');
  if (!container) return;
  
  container.innerHTML = LULLABY_SONGS.map((song, idx) => `
    <button onclick="playLullaby(${idx})" style="width:100%;text-align:left;padding:10px;background:#f5f5f5;border:1px solid #e5e7eb;border-radius:8px;cursor:pointer;display:flex;align-items:center;gap:8px;font-size:12px;font-weight:700;color:#1f2937">
      <span style="font-size:18px">${song.emoji}</span>
      <div style="flex:1">
        <div style="font-weight:900">${song.title}</div>
        <div style="font-size:10px;color:#6b7280">${song.notes}</div>
      </div>
    </button>
  `).join('');
}

function updateSleepTargetHrs() {
  const bedtimeInput = document.getElementById('bedtime');
  const waketimeInput = document.getElementById('waketime');
  if (!bedtimeInput || !waketimeInput) return;
  
  const bedtime = bedtimeInput ? bedtimeInput.value : '21:00';
  const waketime = waketimeInput ? waketimeInput.value : '07:00';
  
  let [bh, bm] = bedtime.split(':').map(Number);
  let [wh, wm] = waketime.split(':').map(Number);
  
  let bedtimeMin = bh * 60 + bm;
  let waketimeMin = wh * 60 + wm;
  
  if (waketimeMin <= bedtimeMin) {
    waketimeMin += 24 * 60;
  }
  
  const hrs = ((waketimeMin - bedtimeMin) / 60).toFixed(1);
  const targetEl = document.getElementById('sl-target');
  if (targetEl) targetEl.textContent = hrs + ' hrs';
  
  const displayEl = document.getElementById('bedtime-display');
  if (displayEl) displayEl.textContent = bedtime;
  
  const snTimeEl = document.getElementById('sn-time');
  if (snTimeEl) snTimeEl.textContent = bedtime;
}

function toggleSleepTracking() {
  const btn = document.getElementById('sleep-toggle-btn');
  if (!sleepActive) {
    sleepActive = true;
    sleepElapsed = 0;
    btn.textContent = '😴 SLEEPING... Tap to Stop';
    btn.style.background = 'linear-gradient(135deg, hsl(145 80% 70%), hsl(145 55% 60%))';
    btn.style.color = '#065f46';
    
    sleepTimer = setInterval(() => {
      sleepElapsed++;
      updateSleepDisplay();
    }, 1000);
  } else {
    sleepActive = false;
    clearInterval(sleepTimer);
    btn.textContent = '💤 OFF — Tap to Start';
    btn.style.background = 'hsl(220 10% 90%)';
    btn.style.color = '#1f2937';
    
    const hrs = +(sleepElapsed / 3600).toFixed(1);
    if (hrs > 0) {
      sleepSessions.push({ date: new Date().toLocaleDateString(), hours: hrs });
      updateTotalSleep();
      updateSleepHistory();
    }
  }
}

function updateSleepDisplay() {
  const h = Math.floor(sleepElapsed / 3600).toString().padStart(2, '0');
  const m = Math.floor((sleepElapsed % 3600) / 60).toString().padStart(2, '0');
  const s = (sleepElapsed % 60).toString().padStart(2, '0');
  
  const timerEl = document.getElementById('sleep-timer');
  if (timerEl) timerEl.textContent = `${h}:${m}:${s}`;
}

function updateTotalSleep() {
  const total = sleepSessions.reduce((sum, session) => sum + session.hours, 0);
  const totalEl = document.getElementById('sleep-total');
  if (totalEl) totalEl.textContent = total.toFixed(1) + ' hrs';
}

function updateSleepHistory() {
  const histEl = document.getElementById('sleep-history');
  if (!histEl) return;
  
  if (sleepSessions.length === 0) {
    histEl.innerHTML = '<div style="text-align:center;color:#6b7280;padding:12px;font-size:12px">No sessions yet.</div>';
    return;
  }
  
  histEl.innerHTML = sleepSessions.map(s => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:8px;border-bottom:1px solid #e5e7eb;font-size:12px">
      <span style="font-weight:700">${s.date}</span>
      <span style="color:#059669;font-weight:900">${s.hours} hrs</span>
    </div>
  `).join('');
}

function updateDurationDisplay() {
  const durationInput = document.getElementById('duration-mins');
  const statusEl = document.getElementById('duration-status');
  if (!durationInput || !statusEl) return;
  
  const mins = parseInt(durationInput.value) || 15;
  if (lullabyPlaying && musicStartTime) {
    statusEl.textContent = mins + ' min - Active';
    statusEl.style.color = 'hsl(145 80% 50%)';
  } else {
    statusEl.textContent = mins + ' min - Ready';
    statusEl.style.color = 'hsl(270 60% 60%)';
  }
}

function playLullaby(idx) {
  const song = LULLABY_SONGS[idx];
  const audioFile = song.file || 'brahms.wav';
  
  // Stop previous audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  if (musicDurationTimer) {
    clearTimeout(musicDurationTimer);
  }
  
  // Create and play new audio with looping enabled
  currentAudio = new Audio(`/static/lullabies/${audioFile}`);
  currentAudio.loop = true;  // Enable looping so music repeats
  currentAudio.volume = 0.8;  // Set volume to 80%
  currentAudio.play().catch(e => console.log('Audio play error:', e));
  
  currentLullaby = idx;
  lullabyPlaying = true;
  musicStartTime = Date.now();
  
  // Update UI
  const titleEl = document.getElementById('now-playing-title');
  if (titleEl) titleEl.textContent = `${song.emoji} ${song.title}`;
  
  const playBtn = document.getElementById('play-pause-btn');
  if (playBtn) playBtn.textContent = '⏸';
  
  const playingSection = document.getElementById('now-playing-section');
  if (playingSection) playingSection.style.display = 'block';
  
  updateDurationDisplay();
  toast(`Now playing: ${song.title}`);
  
  // Set auto-stop timer based on duration and start countdown display
  setMusicAutoStop();
  startCountdownTimer();
}

function setMusicAutoStop() {
  if (musicDurationTimer) clearTimeout(musicDurationTimer);
  if (countdownTimer) clearInterval(countdownTimer);
  
  const durationInput = document.getElementById('duration-mins');
  const durationMins = parseInt(durationInput?.value) || 15;
  const durationMs = durationMins * 60 * 1000;
  
  musicDurationTimer = setTimeout(() => {
    if (lullabyPlaying && currentAudio) {
      stopMusic();
      toast(`🛌 Music stopped after ${durationMins} minutes`);
    }
  }, durationMs);
}

function startCountdownTimer() {
  if (countdownTimer) clearInterval(countdownTimer);
  
  const durationInput = document.getElementById('duration-mins');
  const durationMins = parseInt(durationInput?.value) || 15;
  
  const updateCountdown = () => {
    if (!musicStartTime || !lullabyPlaying) return;
    
    const elapsedMs = Date.now() - musicStartTime;
    const totalMs = durationMins * 60 * 1000;
    const remainingMs = Math.max(0, totalMs - elapsedMs);
    
    const remainingMins = Math.floor(remainingMs / 60000);
    const remainingSecs = Math.floor((remainingMs % 60000) / 1000);
    
    const statusEl = document.getElementById('duration-status');
    if (statusEl) {
      statusEl.textContent = `${remainingMins}:${remainingSecs.toString().padStart(2, '0')} left`;
      statusEl.style.color = remainingMs < 60000 ? 'hsl(0 84% 60%)' : 'hsl(145 80% 50%)';
    }
  };
  
  // Update immediately
  updateCountdown();
  
  // Then update every second
  countdownTimer = setInterval(updateCountdown, 1000);
}

function stopMusic() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio.loop = false;
  }
  if (musicDurationTimer) clearTimeout(musicDurationTimer);
  if (countdownTimer) clearInterval(countdownTimer);
  
  lullabyPlaying = false;
  musicStartTime = null;
  currentLullaby = -1;
  
  const playBtn = document.getElementById('play-pause-btn');
  if (playBtn) playBtn.textContent = '▶';
  
  const statusEl = document.getElementById('duration-status');
  if (statusEl) {
    statusEl.textContent = 'Stopped';
    statusEl.style.color = 'hsl(0 84% 60%)';
  }
}

function toggleLullaby() {
  if (currentLullaby < 0) {
    playLullaby(0);
  } else if (currentAudio) {
    if (lullabyPlaying) {
      // Pause music
      currentAudio.pause();
      lullabyPlaying = false;
      if (musicDurationTimer) clearTimeout(musicDurationTimer);
      if (countdownTimer) clearInterval(countdownTimer);
      
      const statusEl = document.getElementById('duration-status');
      if (statusEl) {
        statusEl.textContent = 'Paused';
        statusEl.style.color = 'hsl(33 87% 54%)';
      }
    } else {
      // Resume music
      currentAudio.play();
      lullabyPlaying = true;
      musicStartTime = Date.now() - ((Date.now() - musicStartTime) / 1000); // Adjust for pause duration
      setMusicAutoStop();
      startCountdownTimer();
      
      updateDurationDisplay();
    }
    
    const playBtn = document.getElementById('play-pause-btn');
    if (playBtn) playBtn.textContent = lullabyPlaying ? '⏸' : '▶';
  }
}

function nextLullaby() {
  const nextIdx = (currentLullaby + 1) % LULLABY_SONGS.length;
  playLullaby(nextIdx);
}

function prevLullaby() {
  const prevIdx = currentLullaby <= 0 ? LULLABY_SONGS.length - 1 : currentLullaby - 1;
  playLullaby(prevIdx);
}

function stopAllLullabies() {
  stopMusic();
  const playingSection = document.getElementById('now-playing-section');
  if (playingSection) playingSection.style.display = 'none';
}

function saveSleepSettings() {
  updateSleepTargetHrs();
  const msg = document.getElementById('sleep-msg');
  if (msg) {
    msg.textContent = '✅ Sleep schedule saved!';
    setTimeout(() => { msg.textContent = ''; }, 3000);
  }
  
  // Save to backend asynchronously
  setTimeout(() => {
    const bedtime = document.getElementById('bedtime')?.value;
    const waketime = document.getElementById('waketime')?.value;
    if (bedtime && waketime) {
      const bed = new Date(`2024-01-01 ${bedtime}`);
      const wake = new Date(`2024-01-01 ${waketime}`);
      let totalHours = (wake - bed) / (1000 * 60 * 60);
      if (totalHours < 0) totalHours += 24;
      const quality = document.getElementById('sleepQualityInput')?.value || 'good';
      
      fetch('/api/sleep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start_time: bedtime, end_time: waketime, total_hours: totalHours.toFixed(1), quality_grade: quality })
      }).catch(e => {});
    }
  }, 100);
}

// Call init when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSleepPage);
} else {
  initSleepPage();
}

// Load sleep history from backend
function loadSleepHistory() {
  fetch('/api/sleep/history')
    .then(r => r.json())
    .then(d => {
      if (d.success && d.data) {
        sleepSessions = d.data;
        renderSleepHistory();
      }
    })
    .catch(e => console.error('Error loading sleep history:', e));
}

function renderSleepHistory() {
  const container = document.getElementById('sleep-history');
  if (!container) return;
  
  if (sleepSessions.length === 0) {
    container.innerHTML = '<div style="padding:20px;text-align:center;color:#9ca3af">No sleep records yet</div>';
    return;
  }
  
  container.innerHTML = sleepSessions.slice(0, 10).map(session => `
    <div style="padding:12px;background:#f9fafb;border-radius:6px;border-left:3px solid #3b82f6;margin-bottom:8px">
      <div style="font-weight:700;color:#1f2937">${session.start_time} - ${session.end_time}</div>
      <div style="font-size:12px;color:#6b7280">Duration: ${session.total_hours}h | Quality: ${session.quality_grade}</div>
    </div>
  `).join('');
}
