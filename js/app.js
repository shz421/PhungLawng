const PAGE_SIZE = 18;
const STORAGE_KEYS = {
  favorites: "laymyochin:favorites",
  history: "laymyochin:history"
};

const MODULES = [
  ["Search", "Fast dictionary search across Sawlai, Burmese, and English."],
  ["Translator", "Local-first translator workspace with dictionary-backed matches."],
  ["History", "Recent browsing and saved lookups from the original app flow."],
  ["Story", "Reading content and story entry points from the app."],
  ["Setting", "Theme, behavior, and app preference surfaces."],
  ["About Us", "Version, privacy policy, and update destinations."],
  ["Notebook", "User note and memory surfaces."],
  ["Movies", "Media and video discovery cards."],
  ["Quotes", "Proverbs and quote sections."],
  ["Quizzes", "Practice content and score cards."],
  ["Teach", "Learning material and teaching-focused pages."],
  ["Website", "App website / external web routes."],
  ["Speaking", "Speech-oriented learning and playback."],
  ["Categories", "Browse content by module group."],
  ["App Drawer", "Left-side drawer titles and quick shortcuts from the Android app."],
  ["Community", "In-app social and profile areas."],
  ["Helpers", "Support and troubleshooting routes."],
  ["More App", "External app discovery."],
  ["Privacy", "Policy and trust surfaces."],
  ["Feedback", "Contact and report flows."],
  ["Converter", "Quick action hub from the drawer."],
  ["Answer", "FAQ or response guidance."],
];

const STUDY_CARDS = [
  ["Dictionary", "Core offline dataset with Sawlai, Burmese, and English fields."],
  ["Alphabet", "Character and pronunciation training with searchable letter lists."],
  ["Grammar", "Structured language rules and examples."],
  ["Lessons", "Lesson cards and teaching sequences."],
  ["Learn with Image", "Image-backed learning and vocabulary recognition."],
  ["Speaking", "TTS-enabled pronunciation support when the browser provides it."],
  ["Stories", "Reading content and long-form practice."],
  ["Proverbs", "Quotes and proverb library."],
  ["Quiz", "Assessment and self-check prompts."],
];

const CONVERSATION_CARDS = [
  {
    title: "Travel",
    label: "Dung ceh nak",
    description: "Conversation practice for going somewhere, asking directions, and planning a trip.",
  },
  {
    title: "Birthday",
    label: "Ngâ€™awi Mhnyt",
    description: "Greeting and reply lines for celebrating birthdays in a natural way.",
  },
  {
    title: "Daily greeting",
    label: "Hello / goodbye",
    description: "Short opening and closing lines for everyday study and quick repetition.",
  },
  {
    title: "Asking for help",
    label: "Polite questions",
    description: "Useful phrases for checking meaning, asking where, and getting help politely.",
  },
];

const CATEGORY_GROUPS = [
  {
    title: "Starter set",
    description: "Early category names from the app's vocabulary picker.",
    items: ["Ahlu", "Awngdui", "Buh", "Cang", "Canguii", "Cih", "Example1", "Haihuu"],
  },
  {
    title: "People and daily life",
    description: "Word-list groups that support common everyday study.",
    items: ["Hampo", "HngingNu", "Hngingpaw", "Hngumi", "Hngu", "Hngyaw", "Khalai", "Khaizoi"],
  },
  {
    title: "Study and practice",
    description: "Category labels that work well for focused repetition.",
    items: ["Khoiitui", "Koncong", "Kthiin", "Kalaw mka", "Lapphak", "Mcii", "Mka", "Mlen"],
  },
  {
    title: "Work and movement",
    description: "More category names from the LearnWords activity.",
    items: ["Munglaa", "Mpapym", "Mpaw", "Ngakca", "Ngawpek", "Ngdandeeng", "Ngmawii", "Ngrok uii"],
  },
  {
    title: "Advanced words",
    description: "Longer category names for deeper vocabulary drills.",
    items: ["Nghngawii", "Ngpyang", "Panang", "Pedong", "Pheng", "Pytika", "Sammawi", "Saw"],
  },
  {
    title: "Final set",
    description: "Remaining categories from the Android list.",
    items: ["Shamphyn", "Shipe", "Thiin", "Uin"],
  },
];

const LANGUAGES = [
  ["lm", "LaymyoChin"],
  ["my", "Burmese"],
  ["en", "English"],
  ["zh", "Chinese"],
  ["ja", "Japanese"],
  ["ko", "Korean"],
  ["th", "Thai"],
  ["vi", "Vietnamese"],
  ["ms", "Malay"],
  ["id", "Indonesian"],
  ["fr", "French"],
  ["de", "German"],
  ["es", "Spanish"],
  ["ar", "Arabic"],
  ["hi", "Hindi"],
  ["ru", "Russian"],
];

const ALPHABET_QUIZ = [
  { ques: "A ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "အ", b: "အာ", c: "အာ့", d: "အော", ans: "b" },
  { ques: "AW ကိုအသံ ထွက်ဆိုပါ။", a: "အေ", b: "အော", c: "အို", d: "အူး", ans: "b" },
  { ques: "P ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "ဘ", b: "ဖ", c: "ဗ", d: "ပ", ans: "d" },
  { ques: "O ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "အု", b: "အူ", c: "အို", d: "အီ", ans: "c" },
  { ques: "L ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "လာ", b: "လှ", c: "လု", d: "လ", ans: "d" },
  { ques: "M ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "မ", b: "မာ", c: "မှ", d: "မှု", ans: "a" },
  { ques: "I ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "အီး", b: "အု", c: "အိုင်", d: "အီ", ans: "d" },
  { ques: "NG ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "ငိ", b: "င", c: "ငါ", d: "ငု", ans: "b" },
  { ques: "D ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "ဒ", b: "သ", c: "တ", d: "ပ", ans: "a" },
  { ques: "YA ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "အူး", b: "အို", c: "အူိ", d: "အိုး", ans: "c" },
  { ques: "E ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "အီး", b: "အာ", c: "အေ", d: "အ", ans: "c" },
  { ques: "H ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "ဟီ", b: "ဟ", c: "ဟု", d: "ဟို", ans: "b" },
  { ques: "F ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "ပ", b: "ဗ", c: "ဖု", d: "ဖ", ans: "d" },
  { ques: "K ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "ဂ", b: "က", c: "ကာ့", d: "က", ans: "d" },
  { ques: "C ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "စ", b: "ဆ", c: "ဇ", d: "စု", ans: "a" },
  { ques: "B ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "(မ)ပ", b: "(မ)ဘ", c: "(မ)ဗ", d: "(မ)ပု", ans: "a" },
  { ques: "Y ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "အိုး", b: "အူး", c: "အို", d: "အော", ans: "b" },
  { ques: "PH ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "ပ", b: "ဖ", c: "ဗ", d: "ဘ", ans: "b" },
  { ques: "SH ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "ရှ", b: "ဆ", c: "ဆဟ့", d: "ရှာ", ans: "a" },
  { ques: "HNG ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "ငှါး", b: "ငှ", c: "င", d: "ငါ", ans: "b" },
  { ques: "CH ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "စဟ", b: "ချာ", c: "ချ", d: "ဂျာ", ans: "c" },
  { ques: "Z ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "ရ", b: "ယ", c: "ရှ", d: "ယာ", ans: "b" },
  { ques: "U ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "ယူ", b: "အု", c: "အူ", d: "အို", ans: "c" },
  { ques: "S ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "စာ", b: "ဆ", c: "ဆာ", d: "စ", ans: "b" },
  { ques: "THL ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "သဟလ", b: "ထာလ", c: "ထလ", d: "ဓါလ", ans: "c" },
  { ques: "HN ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "ဏ", b: "န", c: "နာ", d: "နူ", ans: "b" },
  { ques: "V ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "ဗ", b: "ဗာ", c: "ဗိ", d: "ဗု", ans: "a" },
  { ques: "N ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "ဏ", b: "နု", c: "န့", d: "န", ans: "d" },
  { ques: "J ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "ကျ", b: "ဂျ", c: "ကျာ", d: "ဂျာ", ans: "b" },
  { ques: "T ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "သု", b: "သာ", c: "သီ", d: "သ", ans: "d" },
  { ques: "W ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "ဝု", b: "ဝါ", c: "ဝ", d: "ဝူး", ans: "c" },
  { ques: "TH ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "သဟ", b: "သာ", c: "ထ", d: "ခ", ans: "c" },
  { ques: "HL ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "ဟလ", b: "လှ", c: "လ", d: "လာ", ans: "b" },
  { ques: "HM ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "မ", b: "မာ", c: "ဟမ", d: "မှ", ans: "d" },
  { ques: "KH ကိုအသံမည်သို့ ထွက်ဆိုသနည်း။", a: "ခါ", b: "ခဟ", c: "ကာ့", d: "ခ", ans: "d" }
];

const state = {
  entries: [],
  query: "",
  filter: "all",
  page: 1,
  selectedId: null,
  favorites: loadList(STORAGE_KEYS.favorites),
  history: loadList(STORAGE_KEYS.history),
  translation: "",
  quizMode: "alphabet",
  quizPool: [],
  quizIndex: 0,
  quizScore: 0,
  quizSelected: null,
  quizLocked: false,
  quizAnswerRevealed: false,
};

const els = {};

function $(id) {
  return document.getElementById(id);
}

function loadList(key) {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveList(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value.slice(0, 40)));
  } catch {
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalize(value) {
  return String(value || "").toLowerCase().trim();
}

function showStatus(message) {
  if (!els.statusBar) return;
  els.statusBar.textContent = message;
  els.statusBar.classList.add("show");
  clearTimeout(showStatus.timer);
  showStatus.timer = setTimeout(() => els.statusBar.classList.remove("show"), 1800);
}

function renderPoints() {
  if (!els.heroPoints) return;
  const points = [
    "Learn LaymyoChin",
    "Read history",
    "Quiz yourself",
    "Study the dialect",
  ];
  els.heroPoints.innerHTML = points.map((point) => `<span class="pill">${escapeHtml(point)}</span>`).join("");
}

function startSearchTypewriter() {
  const el = $("searchInput");
  if (!el) return;
  const phrases = [
    "Ni mbe yng sui byaih",
    "မြန်မာလို ရှာဖွေနိင်ပါသည်",
    "Search in English too",
  ];
  let index = 0;
  let charIndex = 0;
  let stopped = false;

  const stop = () => {
    stopped = true;
    el.placeholder = "Search words, phrases, or meanings";
  };
  el.addEventListener("focus", stop);
  el.addEventListener("input", stop);

  function tick() {
    if (stopped) return;
    const phrase = phrases[index];
    charIndex++;
    el.placeholder = phrase.slice(0, charIndex);
    if (charIndex >= phrase.length) {
      charIndex = 0;
      index = (index + 1) % phrases.length;
      window.setTimeout(tick, 2200);
      return;
    }
    window.setTimeout(tick, 80);
  }
  tick();
}

function startTypewriter() {
  const el = $("typewriterText");
  if (!el) return;
  const pairs = [
    ["Learn Dialect", "Read History"],
    ["Play Quiz", "Study the dialect"],
  ];
  let pairIndex = 0;
  let phraseIndex = 0;
  let charIndex = 0;

  function render() {
    const first = escapeHtml(pairs[pairIndex][0]);
    if (phraseIndex === 0) {
      el.innerHTML = first.slice(0, charIndex);
    } else {
      const second = escapeHtml(pairs[pairIndex][1]);
      el.innerHTML = first + " · " + second.slice(0, charIndex);
    }
  }

  function tick() {
    const phrase = pairs[pairIndex][phraseIndex];
    charIndex++;
    render();

    if (charIndex >= phrase.length) {
      if (phraseIndex === 0) {
        phraseIndex = 1;
        charIndex = 0;
        window.setTimeout(tick, 1000);
        return;
      }
      phraseIndex = 0;
      charIndex = 0;
      pairIndex = (pairIndex + 1) % pairs.length;
      window.setTimeout(tick, 2600);
      return;
    }
    window.setTimeout(tick, 90);
  }
  tick();
}

function setActiveNav(targetId) {
  const targetHref = targetId === "dictionary" ? "dictionary.html" : `#${targetId}`;
  document.querySelectorAll(".nav a").forEach((link) => {
    const href = link.getAttribute("href");
    const active = href === targetHref || (targetId === "dictionary" && href === "#dictionary");
    if (active) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function renderModules() {
  if (!els.moduleGrid) return;
  els.moduleGrid.innerHTML = MODULES.map(([title, desc]) => `
    <article class="module-card">
      <span class="module-tag">${escapeHtml(title)}</span>
      <strong>${escapeHtml(title)}</strong>
      <p>${escapeHtml(desc)}</p>
    </article>
  `).join("");
}

function renderStudyCards() {
  if (!els.studyGrid) return;
  els.studyGrid.innerHTML = STUDY_CARDS.map(([title, desc]) => `
    <article class="study-card card">
      <strong>${escapeHtml(title)}</strong>
      <p>${escapeHtml(desc)}</p>
    </article>
  `).join("");
}

function renderConversationCards() {
  if (!els.conversationGrid) return;
  els.conversationGrid.innerHTML = CONVERSATION_CARDS.map((item) => `
    <article class="conversation-card card">
      <div class="conversation-card-head">
        <div>
          <span class="pill">Basic conversation</span>
          <h3>${escapeHtml(item.title)}</h3>
        </div>
        <span class="conversation-label">${escapeHtml(item.label)}</span>
      </div>
      <p>${escapeHtml(item.description)}</p>
      <div class="conversation-card-actions">
        <button class="mini-button" type="button" data-conversation-action="copy" data-conversation-title="${escapeHtml(item.title)}" data-conversation-label="${escapeHtml(item.label)}" data-conversation-description="${escapeHtml(item.description)}">Copy card</button>
        <button class="mini-button" type="button" data-conversation-action="speak" data-conversation-title="${escapeHtml(item.title)}">Speak title</button>
      </div>
    </article>
  `).join("");
}

function renderCategoryGroups() {
  if (!els.categoryGrid) return;
  els.categoryGrid.innerHTML = CATEGORY_GROUPS.map((group) => `
    <article class="category-card card">
      <div class="conversation-card-head">
        <div>
          <span class="pill">Learn with categories</span>
          <h3>${escapeHtml(group.title)}</h3>
        </div>
        <span class="conversation-label">${group.items.length} items</span>
      </div>
      <p>${escapeHtml(group.description)}</p>
      <div class="category-chip-cloud">
        ${group.items.map((item) => `<span class="category-chip">${escapeHtml(item)}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

function renderLanguageOptions() {
  if (!els.fromLang || !els.toLang || !els.languageCount) return;
  const options = LANGUAGES.map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join("");
  els.fromLang.innerHTML = options;
  els.toLang.innerHTML = options;
  els.fromLang.value = "en";
  els.toLang.value = "lm";
  els.languageCount.textContent = String(LANGUAGES.length);
}

function shuffle(values) {
  const copy = [...values];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildMeaningQuiz(entries) {
  const pool = [];
  const usable = entries.filter((entry) => entry.Sawlai && entry.Us);
  const seen = new Set();
  for (const entry of usable) {
    const key = normalize(entry.Sawlai);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    pool.push(entry);
  }
  return shuffle(pool).slice(0, 24).map((entry) => {
    const distractors = shuffle(
      pool
        .filter((item) => item._id !== entry._id)
        .map((item) => item.Us)
        .filter(Boolean)
    ).filter((value) => normalize(value) !== normalize(entry.Us)).slice(0, 3);
    const answers = shuffle([entry.Us, ...distractors].slice(0, 4));
    const keys = ["a", "b", "c", "d"];
    const answerMap = Object.fromEntries(keys.map((key, idx) => [key, answers[idx] || entry.Us]));
    const ans = keys.find((key) => normalize(answerMap[key]) === normalize(entry.Us)) || "a";
    return {
      ques: `What is the meaning of "${entry.Sawlai}"?`,
      a: answerMap.a,
      b: answerMap.b,
      c: answerMap.c,
      d: answerMap.d,
      ans,
    };
  });
}

function getQuizPool(mode) {
  if (mode === "meaning") {
    return buildMeaningQuiz(state.entries);
  }
  return [...ALPHABET_QUIZ];
}

function renderQuizState() {
  if (!els.quizModeLabel || !els.quizTitle || !els.quizScore || !els.quizQuestionNo || !els.quizQuestionCount || !els.quizProgressFill || !els.quizQuestion || !els.quizOptions || !els.quizCheck || !els.quizNext || !els.quizFeedback) return;
  const total = state.quizPool.length;
  const current = state.quizPool[state.quizIndex];
  els.quizModeLabel.textContent = state.quizMode === "meaning" ? "Meaning Quiz" : "Alphabet Quiz";
  els.quizTitle.textContent = state.quizMode === "meaning" ? "Dictionary meaning challenge" : "Alphabet pronunciation challenge";
  els.quizScore.textContent = `${state.quizScore} / ${total}`;
  els.quizQuestionNo.textContent = total ? String(state.quizIndex + 1) : "0";
  els.quizQuestionCount.textContent = `${total} questions`;
  els.quizProgressFill.style.width = total ? `${((state.quizIndex + (current ? 1 : 0)) / total) * 100}%` : "0%";
  els.quizQuestion.textContent = current ? current.ques : "No quiz questions available.";
  els.quizFeedback.textContent = "";
  els.quizOptions.innerHTML = current ? ["a", "b", "c", "d"].map((key) => `
    <button class="quiz-option ${state.quizSelected === key ? "selected" : ""}" type="button" data-quiz-option="${key}">
      <strong>${key.toUpperCase()}.</strong> ${escapeHtml(current[key])}
    </button>
  `).join("") : "";
  els.quizCheck.disabled = !current || state.quizLocked;
  els.quizNext.disabled = !current;
}

function loadQuiz(mode = "alphabet") {
  state.quizMode = mode;
  state.quizPool = getQuizPool(mode);
  state.quizIndex = 0;
  state.quizScore = 0;
  state.quizSelected = null;
  state.quizLocked = false;
  state.quizAnswerRevealed = false;
  renderQuizState();
}

function showQuizFeedback(message, kind = "neutral") {
  if (!els.quizFeedback) return;
  els.quizFeedback.textContent = message;
  els.quizFeedback.dataset.kind = kind;
}

function quizAnswerKey(question) {
  return question?.ans || "a";
}

function setQuizOptionState(optionKey) {
  state.quizSelected = optionKey;
  renderQuizState();
}

function checkQuizAnswer() {
  const current = state.quizPool[state.quizIndex];
  if (!current) return;
  if (!state.quizSelected) {
    showQuizFeedback("Pick one answer first.", "neutral");
    return;
  }
  const answerKey = quizAnswerKey(current);
  const buttons = [...els.quizOptions.querySelectorAll(".quiz-option")];
  buttons.forEach((button) => {
    const key = button.dataset.quizOption;
    button.classList.toggle("correct", key === answerKey);
    button.classList.toggle("wrong", key === state.quizSelected && key !== answerKey);
  });
  state.quizLocked = true;
  els.quizCheck.disabled = true;
  if (state.quizSelected === answerKey) {
    state.quizScore += 1;
    showQuizFeedback("Correct.", "success");
  } else {
    showQuizFeedback(`Wrong. Correct answer is ${answerKey.toUpperCase()}.`, "error");
  }
  els.quizScore.textContent = `${state.quizScore} / ${state.quizPool.length}`;
}

function nextQuizQuestion() {
  if (!state.quizPool.length) return;
  if (state.quizIndex < state.quizPool.length - 1) {
    state.quizIndex += 1;
    state.quizSelected = null;
    state.quizLocked = false;
    renderQuizState();
    return;
  }
  showQuizFeedback(`Quiz finished. Score ${state.quizScore} / ${state.quizPool.length}.`, "neutral");
}

function buildEntryIndex(entries) {
  return entries.map((entry, index) => ({
    ...entry,
    _id: `${index}:${normalize(entry.Sawlai)}:${normalize(entry.Burmese)}:${normalize(entry.Us)}`,
  }));
}

function matchesFilter(entry) {
  if (state.filter === "all") return true;
  if (state.filter === "saved") return state.favorites.includes(entry._id);
  const q = normalize(state.query);
  if (!q) return true;
  if (state.filter === "sawlai") return normalize(entry.Sawlai).includes(q);
  if (state.filter === "burmese") return normalize(entry.Burmese).includes(q);
  if (state.filter === "english") return normalize(entry.Us).includes(q);
  return true;
}

function matchesQuery(entry) {
  const q = normalize(state.query);
  if (!q) return true;
  return [entry.Sawlai, entry.Burmese, entry.Us].some((value) => normalize(value).includes(q));
}

function getFilteredEntries() {
  return state.entries.filter((entry) => matchesFilter(entry) && matchesQuery(entry));
}

function getSavedEntries() {
  const saved = new Set(state.favorites);
  return state.entries.filter((entry) => saved.has(entry._id));
}

function addRecent(entry) {
  state.history = [entry._id, ...state.history.filter((id) => id !== entry._id)].slice(0, 12);
  saveList(STORAGE_KEYS.history, state.history);
}

function toggleFavorite(entry) {
  const idx = state.favorites.indexOf(entry._id);
  if (idx >= 0) {
    state.favorites.splice(idx, 1);
    showStatus("Removed from favorites");
  } else {
    state.favorites.unshift(entry._id);
    showStatus("Saved to favorites");
  }
  saveList(STORAGE_KEYS.favorites, state.favorites);
  renderStats();
  renderDictionary();
  renderSideLists();
  if (state.selectedId === entry._id) renderDetail(entry);
}

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "true");
  area.style.position = "absolute";
  area.style.left = "-9999px";
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(area);
  return ok;
}

function speak(text) {
  if (!("speechSynthesis" in window)) {
    showStatus("Speech synthesis is not supported in this browser");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find((voice) => /myanmar|burmese|english/i.test(voice.lang + " " + voice.name));
  if (preferred) utterance.voice = preferred;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  showStatus("Speaking now");
}

function renderStats() {
  if (els.wordCount) els.wordCount.textContent = String(state.entries.length);
  if (els.savedCount) els.savedCount.textContent = String(state.favorites.length);
  if (els.moduleCount) els.moduleCount.textContent = String(MODULES.length);
  if (els.languageCount) els.languageCount.textContent = String(LANGUAGES.length);
}

function renderFilters() {
  if (!els.filterChips) return;
  const chips = [
    ["all", "All"],
    ["sawlai", "Sawlai"],
    ["burmese", "Burmese"],
    ["english", "English"],
    ["saved", "Saved"],
  ];
  els.filterChips.innerHTML = chips.map(([value, label]) => `
    <button class="chip ${state.filter === value ? "active" : ""}" type="button" data-filter="${escapeHtml(value)}">
      ${escapeHtml(label)}
    </button>
  `).join("");
}

function renderDictionary() {
  if (!els.entryList || !els.resultsSummary || !els.loadMore || !els.filterChips) return;
  renderFilters();
  const filtered = getFilteredEntries();
  const visible = filtered.slice(0, state.page * PAGE_SIZE);
  els.resultsSummary.textContent = `${visible.length} shown of ${filtered.length} matched`;
  els.loadMore.hidden = visible.length >= filtered.length;

  if (!visible.length) {
    els.entryList.innerHTML = `
      <article class="entry-card">
        <div>
          <h3>No matches</h3>
          <div class="meta">Try a shorter search, a different field, or switch to Saved.</div>
        </div>
      </article>
    `;
    return;
  }

  els.entryList.innerHTML = visible.map((entry) => {
    const selected = state.selectedId === entry._id ? "is-selected" : "";
    const saved = state.favorites.includes(entry._id);
    return `
      <article class="entry-card ${selected}" data-entry-id="${escapeHtml(entry._id)}">
        <div>
          <h3>${escapeHtml(entry.Sawlai)}</h3>
          <div class="meta">${escapeHtml(entry.Burmese)}</div>
          <div class="meta">${escapeHtml(entry.Us)}</div>
        </div>
        <div class="entry-actions">
          <button class="mini-button" type="button" data-entry-action="edit">Edit</button>
          <button class="mini-button" type="button" data-entry-action="save">${saved ? "Unsave" : "Save"}</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderSideLists() {
  if (!els.favoritesList || !els.historyList) return;
  const favorites = getSavedEntries();
  const recent = state.history
    .map((id) => state.entries.find((entry) => entry._id === id))
    .filter(Boolean);

  els.favoritesList.innerHTML = favorites.length ? favorites.map((entry) => miniItem(entry)).join("") : emptyMini("No favorites yet");
  els.historyList.innerHTML = recent.length ? recent.map((entry) => miniItem(entry)).join("") : emptyMini("Your recent lookups will appear here");
}

function emptyMini(message) {
  return `<div class="mini-item"><p>${escapeHtml(message)}</p></div>`;
}

function miniItem(entry) {
  return `
    <article class="mini-item">
      <strong>${escapeHtml(entry.Sawlai)}</strong>
      <p>${escapeHtml(entry.Us)}</p>
      <button class="link-button" type="button" data-mini-entry="${escapeHtml(entry._id)}">View</button>
    </article>
  `;
}

function getRelatedEntries(entry) {
  const key = normalize(entry.Sawlai).slice(0, 1);
  const related = state.entries
    .filter((item) => item._id !== entry._id && normalize(item.Sawlai).startsWith(key))
    .slice(0, 5);
  return related.length ? related : state.entries.filter((item) => item._id !== entry._id).slice(0, 5);
}

function renderDetail(entry) {
  if (!els.detailCard) return;
  state.selectedId = entry._id;
  addRecent(entry);
  const related = getRelatedEntries(entry);
  els.detailCard.innerHTML = `
    <div class="entry-detail">
      <div class="detail-head">
        <span class="pill">Selected word</span>
        <h3>${escapeHtml(entry.Sawlai)}</h3>
        <div class="meta">${escapeHtml(entry.Us)}</div>
      </div>
      <div class="detail-grid">
        <div class="detail-field">
          <span>Sawlai</span>
          ${escapeHtml(entry.Sawlai)}
        </div>
        <div class="detail-field">
          <span>Burmese</span>
          ${escapeHtml(entry.Burmese)}
        </div>
        <div class="detail-field">
          <span>English</span>
          ${escapeHtml(entry.Us)}
        </div>
      </div>
      <div class="detail-actions">
        <button class="mini-button" type="button" data-detail-action="copy">Copy</button>
        <button class="mini-button" type="button" data-detail-action="speak">Speak</button>
        <button class="mini-button" type="button" data-detail-action="save">${state.favorites.includes(entry._id) ? "Unsave" : "Save"}</button>
        <button class="mini-button" type="button" data-detail-action="share">Share</button>
        <button class="mini-button" type="button" data-detail-action="edit">Edit</button>
      </div>
      <div class="suggestion-box">
        <div class="stack-head">
          <h3>Related</h3>
          <span class="pill">Nearby entries</span>
        </div>
        <div class="mini-list">
          ${related.map((item) => `
            <article class="mini-item">
              <strong>${escapeHtml(item.Sawlai)}</strong>
              <p>${escapeHtml(item.Us)}</p>
              <button class="link-button" type="button" data-mini-entry="${escapeHtml(item._id)}">View</button>
            </article>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

function hideDetailIfNeeded() {
  if (state.selectedId) {
    const entry = state.entries.find((item) => item._id === state.selectedId);
    if (entry) {
      renderDetail(entry);
      renderDictionary();
    }
  }
}

function replaceTerms(text, mapping) {
  let output = text;
  const terms = Object.keys(mapping).sort((a, b) => b.length - a.length);
  for (const term of terms) {
    const replacement = mapping[term];
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    output = output.replace(new RegExp(escaped, "gi"), replacement);
  }
  return output;
}

function translateLocal(text, from, to) {
  const raw = String(text || "").trim();
  if (!raw) {
    return { output: "Type text to translate.", matches: [] };
  }

  const supported = new Set(["lm", "my", "en"]);
  if (!supported.has(from) || !supported.has(to)) {
    return {
      output: "This web build keeps the full language catalog visible, but local dictionary translation is only active for LaymyoChin, Burmese, and English.",
      matches: []
    };
  }

  const fromField = from === "lm" ? "Sawlai" : from === "my" ? "Burmese" : "Us";
  const toField = to === "lm" ? "Sawlai" : to === "my" ? "Burmese" : "Us";

  const bySource = new Map();
  const exact = state.entries.filter((entry) => normalize(entry[fromField]).length);
  for (const entry of exact) {
    bySource.set(normalize(entry[fromField]), entry[toField]);
  }

  const ordered = [...bySource.entries()].sort((a, b) => b[0].length - a[0].length);
  let translated = raw;
  for (const [src, dest] of ordered) {
    const escaped = src.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    translated = translated.replace(new RegExp(escaped, "gi"), dest);
  }

  const matches = [];
  const q = normalize(raw);
  for (const entry of state.entries) {
    const haystack = [entry.Sawlai, entry.Burmese, entry.Us].map(normalize);
    if (haystack.some((value) => value.includes(q))) {
      matches.push(entry);
    }
    if (matches.length >= 6) break;
  }

  if (translated === raw) {
    translated = "No exact local match. Try the dictionary search or connect a server translation API later.";
  }
  return { output: translated, matches };
}

function renderTranslationMatches(matches) {
  if (!els.translationMatches) return;
  if (!matches.length) {
    els.translationMatches.innerHTML = emptyMini("No matches yet");
    return;
  }
  els.translationMatches.innerHTML = matches.map((entry) => `
    <article class="mini-item">
      <strong>${escapeHtml(entry.Sawlai)}</strong>
      <p>${escapeHtml(entry.Us)}</p>
      <button class="link-button" type="button" data-mini-entry="${escapeHtml(entry._id)}">View in dictionary</button>
    </article>
  `).join("");
}

function performTranslation() {
  if (!els.sourceText || !els.fromLang || !els.toLang || !els.translationOutput || !els.translationMatches) return;
  const result = translateLocal(els.sourceText.value, els.fromLang.value, els.toLang.value);
  state.translation = result.output;
  els.translationOutput.textContent = result.output;
  renderTranslationMatches(result.matches);
  showStatus("Translation updated");
}

function applyFilter(filter) {
  state.filter = filter;
  state.page = 1;
  renderDictionary();
}

function findEntryById(id) {
  return state.entries.find((entry) => entry._id === id);
}

async function handleDictionaryAction(entry, action) {
  if (action === "select") {
    state.selectedId = entry._id;
    renderDictionary();
    return;
  }
  if (action === "save") {
    toggleFavorite(entry);
    return;
  }
  if (action === "copy") {
    await copyToClipboard(`${entry.Sawlai}\n${entry.Burmese}\n${entry.Us}`);
    showStatus("Copied");
    return;
  }
}

function autoGrowTextarea(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

function openEditForm(entry) {
  if (!els.editDialog) return;
  els.editDialog.innerHTML = `
    <div class="entry-detail">
      <div class="detail-head">
        <span class="pill">${entry ? "Editing" : "Add a new word"}</span>
        <h3>${entry ? escapeHtml(entry.Sawlai) : "New word"}</h3>
        <div class="meta">${entry ? escapeHtml(entry.Us) : "Fill in the fields below"}</div>
      </div>
      <form class="edit-form" data-edit-id="${entry ? escapeHtml(entry._id) : ""}">
        <div class="detail-field edit-field">
          <span>Sawlai</span>
          <input type="text" name="sawlai" value="${entry ? escapeHtml(entry.Sawlai) : ""}" maxlength="200" required>
        </div>
        <div class="detail-field edit-field">
          <span>Burmese</span>
          <textarea name="burmese" maxlength="1000" required>${entry ? escapeHtml(entry.Burmese) : ""}</textarea>
          <small class="edit-hint">Keep the part-of-speech tag like (n) or (v) at the start.</small>
        </div>
        <div class="detail-field edit-field">
          <span>English</span>
          <textarea name="us" maxlength="1000" required>${entry ? escapeHtml(entry.Us) : ""}</textarea>
        </div>
        <p class="edit-review-note">Your changes are reviewed and approved by the team before going live.</p>
        <div class="detail-actions">
          <button class="button button-secondary" type="button" data-edit-cancel>Cancel</button>
          <button class="button button-primary" type="submit">${entry ? "Submit for review" : "Submit word for review"}</button>
        </div>
        <div class="edit-status" role="alert"></div>
      </form>
    </div>
  `;
  els.editDialog.querySelectorAll("textarea").forEach((textarea) => {
    autoGrowTextarea(textarea);
    textarea.addEventListener("input", () => autoGrowTextarea(textarea));
  });
  els.editDialog.showModal();
}

async function submitEditForm(form) {
  const statusEl = form.querySelector(".edit-status");
  const entryId = form.dataset.editId;
  const payload = {
    sawlai: form.sawlai.value.trim(),
    burmese: form.burmese.value.trim(),
    us: form.us.value.trim(),
  };
  if (!payload.sawlai || !payload.burmese || !payload.us) {
    statusEl.textContent = "All three fields are required.";
    return;
  }
  const isNew = !entryId;
  const endpoint = isNew ? "/api/entries" : `/api/entries/${encodeURIComponent(entryId)}`;
  const method = isNew ? "POST" : "PATCH";
  statusEl.textContent = "Saving…";
  try {
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      statusEl.textContent = data.error || `Save failed (${res.status})`;
      return;
    }
    if (isNew) {
      const created = { Sawlai: payload.sawlai, Burmese: payload.burmese, Us: payload.us, _id: String(data.id) };
      state.entries.unshift(created);
    } else {
      const updated = state.entries.find((item) => item._id === entryId);
      if (updated) {
        updated.Sawlai = payload.sawlai;
        updated.Burmese = payload.burmese;
        updated.Us = payload.us;
      }
    }
    if (els.editDialog && els.editDialog.open) {
      els.editDialog.close();
    }
    renderDictionary();
    showStatus(isNew ? "Word submitted for review" : "Edit submitted for review");
  } catch (error) {
    statusEl.textContent = "The editing backend is not connected yet — this works once Cloudflare is set up.";
  }
}

async function handleDetailAction(entry, action) {
  if (action === "copy") {
    await copyToClipboard(`${entry.Sawlai}\n${entry.Burmese}\n${entry.Us}`);
    showStatus("Copied detail");
    return;
  }
  if (action === "speak") {
    speak(entry.Us || entry.Sawlai);
    return;
  }
  if (action === "save") {
    toggleFavorite(entry);
    return;
  }
  if (action === "share") {
    const text = `${entry.Sawlai}\n${entry.Burmese}\n${entry.Us}`;
    if (navigator.share) {
      await navigator.share({ title: entry.Sawlai, text });
    } else {
      await copyToClipboard(text);
    }
    showStatus("Shared");
    return;
  }
  if (action === "edit") {
    openEditForm(entry);
  }
}

function wireEvents() {
  if (els.searchInput && els.filterChips && els.entryList && els.loadMore) {
    els.searchInput.addEventListener("input", () => {
      state.query = els.searchInput.value;
      state.page = 1;
      renderDictionary();
    });

    els.loadMore.addEventListener("click", () => {
      state.page += 1;
      renderDictionary();
    });

    els.filterChips.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      applyFilter(button.dataset.filter);
    });

    els.entryList.addEventListener("click", async (event) => {
      const card = event.target.closest("[data-entry-id]");
      if (!card) return;
      const entry = findEntryById(card.dataset.entryId);
      if (!entry) return;
      const actionButton = event.target.closest("[data-entry-action]");
      if (actionButton) {
        const action = actionButton.dataset.entryAction;
        if (action === "save") {
          toggleFavorite(entry);
        } else if (action === "edit") {
          openEditForm(entry);
        }
        return;
      }
      const action = event.target.closest("[data-action]")?.dataset.action || "select";
      await handleDictionaryAction(entry, action);
    });

    els.editDialog.addEventListener("click", (event) => {
      const cancelBtn = event.target.closest("[data-edit-cancel]");
      if (cancelBtn) {
        els.editDialog.close();
        return;
      }
      if (event.target === els.editDialog) els.editDialog.close();
    });
    els.editDialog.addEventListener("submit", async (event) => {
      const form = event.target.closest(".edit-form");
      if (!form) return;
      event.preventDefault();
      await submitEditForm(form);
    });

    document.addEventListener("click", async (event) => {
      const mini = event.target.closest("[data-mini-entry]");
      if (!mini) return;
      const entry = findEntryById(mini.dataset.miniEntry);
      if (!entry) return;
      renderDetail(entry);
      renderDictionary();
      showStatus("Moved to selected word");
    });
  }

  if (els.swapLang && els.fromLang && els.toLang) {
    els.swapLang.addEventListener("click", () => {
      [els.fromLang.value, els.toLang.value] = [els.toLang.value, els.fromLang.value];
      showStatus("Languages swapped");
    });
  }

  if (els.translateBtn && els.sourceText && els.translationOutput) {
    els.translateBtn.addEventListener("click", performTranslation);
  }
  if (els.copyTranslated && els.translationOutput) {
    els.copyTranslated.addEventListener("click", async () => {
      await copyToClipboard(els.translationOutput.textContent);
      showStatus("Copied result");
    });
  }
  if (els.speakSource && els.sourceText) {
    els.speakSource.addEventListener("click", () => speak(els.sourceText.value));
  }

  if (els.conversationGrid) {
    els.conversationGrid.addEventListener("click", async (event) => {
      const button = event.target.closest("[data-conversation-action]");
      if (!button) return;
      const action = button.dataset.conversationAction;
      const title = button.dataset.conversationTitle || "";
      const label = button.dataset.conversationLabel || "";
      const description = button.dataset.conversationDescription || "";
      if (action === "copy") {
        await copyToClipboard(`${title}\n${label}\n${description}`);
        showStatus("Conversation card copied");
        return;
      }
      if (action === "speak") {
        speak(title);
        return;
      }
    });
  }

  if (els.clearFavorites) els.clearFavorites.addEventListener("click", () => {
    state.favorites = [];
    saveList(STORAGE_KEYS.favorites, state.favorites);
    renderStats();
    renderDictionary();
    renderSideLists();
    hideDetailIfNeeded();
    showStatus("Favorites cleared");
  });

  if (els.clearHistory) els.clearHistory.addEventListener("click", () => {
    state.history = [];
    saveList(STORAGE_KEYS.history, state.history);
    renderSideLists();
    showStatus("History cleared");
  });

  document.addEventListener("click", (event) => {
    const modeButton = event.target.closest("[data-quiz-mode]");
    if (modeButton) {
      loadQuiz(modeButton.dataset.quizMode);
      showStatus(modeButton.dataset.quizMode === "meaning" ? "Meaning Quiz loaded" : "Alphabet Quiz loaded");
    }
  });

  if (els.quizOptions) els.quizOptions.addEventListener("click", (event) => {
    const option = event.target.closest("[data-quiz-option]");
    if (!option) return;
    if (state.quizLocked) return;
    setQuizOptionState(option.dataset.quizOption);
  });

  if (els.quizCheck) els.quizCheck.addEventListener("click", checkQuizAnswer);
  if (els.quizNext) els.quizNext.addEventListener("click", nextQuizQuestion);
  if (els.quizRestart) els.quizRestart.addEventListener("click", () => {
    loadQuiz(state.quizMode);
    showStatus("Quiz restarted");
  });

  const sections = ["dictionary", "alphabet"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) {
        setActiveNav(visible.target.id);
      }
    }, { rootMargin: "-35% 0px -55% 0px", threshold: [0.1, 0.3, 0.6] });
    sections.forEach((section) => observer.observe(section));
  } else {
    setActiveNav("dictionary");
  }
}

async function loadData() {
  if (!els.entryList) return;
  const response = await fetch("../data/laymyochin.json", { cache: "no-store" });
  const payload = await response.json();
  const entries = Array.isArray(payload.laymyochin) ? payload.laymyochin : [];
  state.entries = buildEntryIndex(entries);
  renderStats();
  renderDictionary();
  renderSideLists();
  loadQuiz("alphabet");

  if (state.entries.length) {
    const first = state.entries[0];
    state.selectedId = first._id;
    renderDetail(first);
    renderSideLists();
  }
}

function init() {
  els.heroPoints = $("heroPoints");
  els.wordCount = $("wordCount");
  els.moduleCount = $("moduleCount");
  els.languageCount = $("languageCount");
  els.savedCount = $("savedCount");
  els.moduleGrid = $("moduleGrid");
  els.studyGrid = $("studyGrid");
  els.conversationGrid = $("conversationGrid");
  els.categoryGrid = $("categoryGrid");
  els.quizModeLabel = $("quizModeLabel");
  els.quizTitle = $("quizTitle");
  els.quizScore = $("quizScore");
  els.quizQuestionNo = $("quizQuestionNo");
  els.quizQuestionCount = $("quizQuestionCount");
  els.quizProgressFill = $("quizProgressFill");
  els.quizQuestion = $("quizQuestion");
  els.quizOptions = $("quizOptions");
  els.quizCheck = $("quizCheck");
  els.quizNext = $("quizNext");
  els.quizRestart = $("quizRestart");
  els.quizFeedback = $("quizFeedback");
  els.searchInput = $("searchInput");
  els.filterChips = $("filterChips");
  els.resultsSummary = $("resultsSummary");
  els.loadMore = $("loadMore");
  els.entryList = $("entryList");
  els.editDialog = $("editDialog");
  els.favoritesList = $("favoritesList");
  els.historyList = $("historyList");
  els.fromLang = $("fromLang");
  els.toLang = $("toLang");
  els.swapLang = $("swapLang");
  els.sourceText = $("sourceText");
  els.translateBtn = $("translateBtn");
  els.copyTranslated = $("copyTranslated");
  els.speakSource = $("speakSource");
  els.translationOutput = $("translationOutput");
  els.translationMatches = $("translationMatches");
  els.clearFavorites = $("clearFavorites");
  els.clearHistory = $("clearHistory");
  els.statusBar = $("statusBar");

  renderPoints();
  startTypewriter();
  startSearchTypewriter();
  renderModules();
  renderStudyCards();
  renderConversationCards();
  renderCategoryGroups();
  renderLanguageOptions();
  if (els.entryList) {
    setActiveNav("dictionary");
    loadData().catch((error) => {
      els.entryList.innerHTML = `
        <article class="entry-card">
          <div>
            <h3>Failed to load dictionary data</h3>
            <div class="meta">${escapeHtml(error.message)}</div>
          </div>
        </article>
      `;
    });
  }
  wireEvents();
}

document.addEventListener("DOMContentLoaded", init);
