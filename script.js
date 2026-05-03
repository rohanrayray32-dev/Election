// Complete Election Process Assistant - script.js
// Handles theme, navigation, SPA, i18n, interactions, animations

// i18n Data
const i18nData = {
  en: {
    'logo': 'CivicGuide',
    'nav-home': 'Home', 'nav-guide': 'Guide', 'nav-timeline': 'Timeline', 
    'nav-eligibility': 'Eligibility', 'nav-states': 'States', 'nav-chat': 'Chat', 
    'nav-faq': 'FAQ', 'nav-contact': 'Contact',
    'hero-title': 'Election Process Assistant',
    'hero-subtitle': 'Understand elections confidently. Complete guidance from voter registration to results',
    'hero-cta1': 'Start Guide', 'hero-cta2': 'Check Eligibility',
    'hero-badge': '🇮🇳 Trusted Civic Guide',
    'stat1': 'Registered Voters', 'stat2': 'States & UTs', 'stat3': 'Parliament Seats', 'stat4': 'Users Helped',
    'guide-title': 'Complete Election Guide', 'guide-subtitle': 'Step-by-step process from registration to results',
    'timeline-title': 'Election Timeline', 'timeline-subtitle': 'Complete election journey step-by-step',
    'eligibility-title': 'Am I Eligible?', 'eligibility-subtitle': 'Check voter eligibility in 30 seconds',
    'states-title': 'State-wise Information', 'states-subtitle': 'Election details by state',
    'chat-title': 'AI Election Assistant', 'chat-subtitle': 'Ask anything about elections',
    'faq-title': 'Frequently Asked Questions', 'faq-subtitle': 'Quick answers to common questions',
    'contact-title': 'Contact Us', 'contact-subtitle': 'Get in touch for support',
    'email': 'Email', 'phone': 'Phone', 'helpline': 'Helpline', 'website': 'Website',
    'voice-title': 'Voice Assistant', 'voice-ready': 'Tap mic to speak', 'close': 'Close',
    'age-label': 'Age', 'citizen-label': 'Citizenship', 'resident-label': 'Residency', 
    'felony-label': 'Criminal Record', 'check-btn': 'Check Eligibility',
    'flow1': '1. Register', 'flow2': '2. Get EPIC', 'flow3': '3. Find Booth', 
    'flow4': '4. Vote', 'flow5': '5. Results',
    'myth1-q': 'Myth: One vote doesn\'t matter', 'myth1-a': 'Every vote counts! Close elections decided by few votes.',
    'myth2-q': 'Myth: EPIC not compulsory', 'myth2-a': 'EPIC preferred, other photo IDs accepted.',
    'myth3-q': 'Myth: Proxy voting allowed', 'myth3-a': 'No proxy voting. Must vote personally.',
    'state-select-label': 'Select State',
    'quick1': 'How to register?', 'quick2': 'What ID needed?', 'quick3': 'Find booth?', 'quick4': 'How to vote?',
    'bot-name': 'ElectionBot', 'welcome-msg': 'Hi! Ask me anything about elections. मतदान के बारे में कोई भी प्रश्न पूछें!',
    'days': 'Days', 'hours': 'Hours', 'minutes': 'Minutes', 'seconds': 'Seconds'
  },
  hi: {
    'logo': 'नागरिक गाइड',
    'nav-home': 'होम', 'nav-guide': 'गाइड', 'nav-timeline': 'समयरेखा', 
    'nav-eligibility': 'पात्रता', 'nav-states': 'राज्य', 'nav-chat': 'चैट', 
    'nav-faq': 'FAQ', 'nav-contact': 'संपर्क',
    'hero-title': 'चुनाव प्रक्रिया सहायक',
    'hero-subtitle': 'विश्वास के साथ चुनाव समझें। मतदाता पंजीकरण से परिणाम तक पूरी मार्गदर्शिका',
    'hero-cta1': 'गाइड शुरू करें', 'hero-cta2': 'पात्रता जांचें',
    'hero-badge': '🇮🇳 विश्वसनीय नागरिक गाइड',
    'stat1': 'पंजीकृत मतदाता', 'stat2': 'राज्य और केंद्रशासित प्रदेश', 'stat3': 'लोकसभा सीटें', 'stat4': 'सहायता प्राप्त उपयोगकर्ता',
    'guide-title': 'पूर्ण चुनाव गाइड', 'guide-subtitle': 'पंजीकरण से परिणाम तक चरणबद्ध प्रक्रिया',
    'timeline-title': 'चुनाव समयरेखा', 'timeline-subtitle': 'चुनाव यात्रा चरणबद्ध',
    'eligibility-title': 'क्या मैं पात्र हूँ?', 'eligibility-subtitle': '30 सेकंड में पात्रता जांचें',
    'states-title': 'राज्यवार जानकारी', 'states-subtitle': 'राज्य के अनुसार चुनाव विवरण',
    'chat-title': 'AI चुनाव सहायक', 'chat-subtitle': 'चुनाव के बारे में कुछ भी पूछें',
    'faq-title': 'अक्सर पूछे जाने वाले प्रश्न', 'faq-subtitle': 'सामान्य प्रश्नों के त्वरित उत्तर',
    'contact-title': 'हमसे संपर्क करें', 'contact-subtitle': 'सहायता के लिए संपर्क करें',
    'email': 'ईमेल', 'phone': 'फोन', 'helpline': 'हेल्पलाइन', 'website': 'वेबसाइट',
    'voice-title': 'वॉइस सहायक', 'voice-ready': 'माइक दबाकर बोलें', 'close': 'बंद करें',
    'age-label': 'आयु', 'citizen-label': 'नागरिकता', 'resident-label': 'निवास', 
    'felony-label': 'अपराध रिकॉर्ड', 'check-btn': 'पात्रता जांचें',
    'flow1': '1. पंजीकरण', 'flow2': '2. EPIC प्राप्त करें', 'flow3': '3. बूथ खोजें', 
    'flow4': '4. वोट दें', 'flow5': '5. परिणाम',
    'myth1-q': 'मिथ: एक वोट से फर्क नहीं पड़ता', 'myth1-a': 'हर वोट मायने रखता है! करीबी चुनाव कुछ वोटों से तय होते हैं।',
    'myth2-q': 'मिथ: EPIC अनिवार्य नहीं', 'myth2-a': 'EPIC वरीयता, अन्य फोटो ID भी स्वीकार्य।',
    'myth3-q': 'मिथ: प्रॉक्सी वोटिंग की अनुमति', 'myth3-a': 'प्रॉक्सी वोटिंग नहीं। व्यक्तिगत रूप से वोट दें।',
    'state-select-label': 'राज्य चुनें',
    'quick1': 'पंजीकरण कैसे?', 'quick2': 'कौन सा ID?', 'quick3': 'बूथ ढूंढें?', 'quick4': 'वोट कैसे दें?',
    'bot-name': 'चुनावBot', 'welcome-msg': 'नमस्ते! चुनाव के बारे में कुछ भी पूछें। Ask me anything about elections!',
    'days': 'दिन', 'hours': 'घंटे', 'minutes': 'मिनट', 'seconds': 'सेकंड'
  }
};

// Global State
let currentLang = 'en';

// i18n Functions
function updateLanguage(lang) {
  currentLang = lang;
  document.documentElement.setAttribute('data-lang', lang);
  localStorage.setItem('lang', lang);
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18nData[lang][key]) el.textContent = i18nData[lang][key];
  });
  
  // Update toggle button
  const toggles = document.querySelectorAll('#lang-toggle, #lang-toggle-mobile');
  toggles.forEach(toggle => {
    toggle.textContent = lang === 'en' ? 'हिं' : 'EN';
    toggle.title = lang === 'en' ? 'हिंदी' : 'English';
  });
}

// Init Language
updateLanguage(localStorage.getItem('lang') || 'en');

// Language Toggle
document.addEventListener('click', (e) => {
  if (e.target.matches('#lang-toggle, #lang-toggle-mobile')) {
    updateLanguage(currentLang === 'en' ? 'hi' : 'en');
  }
});

// Theme Toggle
const htmlElement = document.documentElement;
function setTheme(theme) {
  htmlElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}
function toggleTheme() {
  const current = htmlElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}
document.addEventListener('click', (e) => {
  if (e.target.matches('#theme-toggle, #theme-toggle-mobile')) toggleTheme();
});
setTheme(localStorage.getItem('theme') || 'dark');

// Loading Screen
window.addEventListener('load', () => {
  const loader = document.getElementById('loading-screen');
  loader.style.opacity = '0';
  setTimeout(() => loader.remove(), 500);
});

// SPA Navigation
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page-section').forEach(page => page.classList.remove('active'));
  // Show target page
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

// Navbar & Mobile Menu
document.getElementById('hamburger')?.addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('hidden');
});
document.querySelectorAll('a[href^="#"], .mobile-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const pageId = link.getAttribute('href').substring(1);
    showPage(pageId);
    document.getElementById('mobile-menu')?.classList.add('hidden');
    window.location.hash = pageId;
  });
});

// Hash navigation
window.addEventListener('hashchange', () => {
  const pageId = window.location.hash.substring(1) || 'home';
  showPage(pageId);
});
window.addEventListener('load', () => {
  const pageId = window.location.hash.substring(1) || 'home';
  showPage(pageId);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
  document.getElementById('scroll-top').classList.toggle('hidden', window.scrollY < 300);
});
document.getElementById('scroll-top')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Progress Bar
window.addEventListener('scroll', () => {
  const progress = document.getElementById('progress-bar');
  const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  progress.style.transform = `scaleX(${scrolled / 100})`;
});

// Stats Animation
const observerOptions = { threshold: 0.3 };
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numbers = entry.target.querySelectorAll('.stat-number');
      numbers.forEach(number => animateNumber(number));
    }
  });
}, observerOptions);

function animateNumber(element) {
  const target = parseInt(element.dataset.target);
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 20);
}
document.querySelectorAll('.stats-grid').forEach(grid => statsObserver.observe(grid));

// Timeline
const timelineData = [
  { step: 1, title: 'Voter Registration', desc: 'Form 6 जमा करें. 18+ आयु, भारतीय नागरिक', icon: '📋' },
  { step: 2, title: 'EPIC Card', desc: 'Voter ID कार्ड प्राप्त करें', icon: '🪪' },
  { step: 3, title: 'Nomination', desc: 'उम्मीदवार नामांकन', icon: '🏷️' },
  { step: 4, title: 'Campaigning', desc: 'चुनाव प्रचार', icon: '📢' },
  { step: 5, title: 'Voting Day', desc: 'मतदान दिवस - सुबह 7 से शाम 6', icon: '🗳️' },
  { step: 6, title: 'Counting', desc: '14 मई को मतगणना', icon: '🔢' },
  { step: 7, title: 'Results', desc: 'परिणाम घोषणा', icon: '📊' }
];

function initTimeline() {
  const wrapper = document.getElementById('timeline-wrapper');
  const dots = document.getElementById('timeline-dots');
  const progress = document.getElementById('timeline-progress');
  
  timelineData.forEach((item, index) => {
    // Dot
    const dot = document.createElement('div');
    dot.className = 'timeline-dot';
    dot.dataset.index = index;
    dots.appendChild(dot);
    
    // Item
    const itemEl = document.createElement('div');
    itemEl.className = `timeline-item ${index % 2 === 0 ? 'left' : ''}`;
    itemEl.innerHTML = `
      <div class="timeline-node" data-index="${index}">${item.icon}</div>
      <div class="timeline-content">
        <div class="timeline-card" data-index="${index}">
          <div class="step-label">Step ${item.step}</div>
          <h3>${item.title}</h3>
          <div class="desc">${item.desc}</div>
        </div>
      </div>
    `;
    wrapper.appendChild(itemEl);
  });
  
  // Timeline interactions
  document.querySelectorAll('.timeline-dot, .timeline-card, .timeline-node').forEach(el => {
    el.addEventListener('click', (e) => {
      const index = parseInt(e.currentTarget.dataset.index);
      updateTimeline(index);
    });
  });
}

function updateTimeline(activeIndex) {
  document.querySelectorAll('.timeline-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i <= activeIndex);
  });
  document.querySelectorAll('.timeline-card').forEach((card, i) => {
    card.classList.toggle('active', i === activeIndex);
  });
  document.querySelectorAll('.timeline-desc').forEach((desc, i) => {
    desc.style.maxHeight = i === activeIndex ? '200px' : '0';
  });
  document.getElementById('timeline-progress').style.width = `${((activeIndex + 1) / timelineData.length) * 100}%`;
}

// Eligibility Checker
document.getElementById('check-btn')?.addEventListener('click', () => {
  const age = document.getElementById('age').value;
  const citizen = document.getElementById('citizen').value;
  const resident = document.getElementById('resident').value;
  const felony = document.getElementById('felony').value;
  
  const eligible = age === '1' && citizen === '1' && resident === '1' && felony === '0';
  
  const result = document.getElementById('result');
  result.className = eligible ? 'result success' : 'result fail';
  result.innerHTML = `
    <div class="result-icon">${eligible ? '✅' : '❌'}</div>
    <h3>${eligible ? 'You are Eligible!' : 'Not Eligible'}</h3>
    <p>${eligible ? 'You can vote in elections' : 'Check requirements and register when eligible'}</p>
    ${!eligible ? '<div class="next-steps"><p>Minimum requirements: 18+, Indian citizen, 6+ months resident</p></div>' : ''}
  `;
  result.classList.remove('hidden');
});

// State Selector
document.getElementById('state-select')?.addEventListener('change', (e) => {
  const state = e.target.value;
  const details = document.getElementById('state-details');
  const stateData = {
    delhi: { seats: 7, voters: '1.5Cr', capital: 'New Delhi', ec: 'ceo.delhi.gov.in' },
    maharashtra: { seats: 48, voters: '9.2Cr', capital: 'Mumbai', ec: 'ceomaharashtra.nic.in' },
    tamilnadu: { seats: 39, voters: '6.2Cr', capital: 'Chennai', ec: 'elections.tn.gov.in' },
    karnataka: { seats: 28, voters: '5.2Cr', capital: 'Bengaluru', ec: 'ceokarnataka.kar.nic.in' },
    westbengal: { seats: 42, voters: '7.1Cr', capital: 'Kolkata', ec: 'ceowestbengal.nic.in' },
    uttarpradesh: { seats: 80, voters: '15.6Cr', capital: 'Lucknow', ec: 'sec.up.nic.in' }
  };
  
  if (stateData[state]) {
    details.innerHTML = `
      <div class="state-info glass-card">
        <h3>${stateData[state].capital}</h3>
        <div class="state-stats">
          <div><strong>${stateData[state].seats}</strong> Seats</div>
          <div><strong>${stateData[state].voters}</strong> Voters</div>
        </div>
        <a href="${stateData[state].ec}" target="_blank" class="btn-primary">Official Site</a>
      </div>
    `;
  } else {
    details.innerHTML = '';
  }
});

// Chat
const chatMessagesEl = document.getElementById('chat-messages');
const chatInputEl = document.getElementById('chat-input');
const chatSendEl = document.getElementById('chat-send');

const chatResponses = {
  register: 'Register at nvsp.in with Form 6. Need Aadhaar/valid ID. Takes 7 days.',
  id: 'EPIC Card, Aadhaar, Passport, Voter Slip, Driving License accepted.',
  booth: 'SMS VOTERID to 9212318281 or check nvsp.in with EPIC number.',
  vote: 'Find booth, show EPIC, get slip, vote using EVM buttons, VVPAT verification.',
  default: 'Great question! Visit eci.gov.in or nvsp.in for details. Ask something else?'
};

function addChatMessage(role, text) {
  const msg = document.createElement('div');
  msg.className = `message ${role === 'bot' ? 'bot-message' : 'user-message'}`;
  msg.innerHTML = `
    <div class="message-avatar">${role === 'bot' ? '🤖' : '👤'}</div>
    <div class="message-bubble">${text}</div>
  `;
  chatMessagesEl.appendChild(msg);
  chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
}

function showTyping() {
  addChatMessage('bot', '<div class="typing"><span></span><span></span><span></span></div>');
}

function sendChat() {
  const text = chatInputEl.value.trim();
  if (!text) return;
  
  addChatMessage('user', text);
  chatInputEl.value = '';
  showTyping();
  
  setTimeout(() => {
    const lastTyping = chatMessagesEl.querySelector('.typing');
    if (lastTyping) lastTyping.remove();
    const response = chatResponses[text.toLowerCase().includes('register') ? 'register' :
                     text.toLowerCase().includes('id') ? 'id' :
                     text.toLowerCase().includes('booth') ? 'booth' :
                     text.toLowerCase().includes('vote') ? 'vote' : 'default'] || chatResponses.default;
    addChatMessage('bot', response);
  }, 1500);
}

chatSendEl?.addEventListener('click', sendChat);
chatInputEl?.addEventListener('keypress', e => e.key === 'Enter' && sendChat());
document.querySelectorAll('.quick-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    chatInputEl.value = btn.dataset.query;
    sendChat();
  });
});

// FAQ
const faqData = [
  { q: 'वोटर ID कैसे बनवाएं?', a: 'nvsp.in पर Form 6 भरें। आधार/पहचान पत्र जरूरी। 7 दिन में EPIC कार्ड मिलेगा।' },
  { q: 'कहाँ वोट दूँ?', a: 'SMS "VOTERID EPICNO" 9212318281 पर भेजें या nvsp.in देखें।' },
  { q: 'EVM कैसे काम करता है?', a: 'बटन दबाकर वोट। VVPAT स्लिप देखें। Dummy वोट न दबाएं।' },
  { q: 'क्या एक से ज्यादा वोट दे सकता हूँ?', a: 'नहीं। एक EPIC = एक वोट। दोहरा वोटिंग अपराध है।' },
  { q: 'absentee voting?', a: 'नहीं। व्यक्तिगत वोटिंग अनिवार्य। बुजुर्ग/विकलांग के लिए विशेष व्यवस्था।' }
];

function initFAQ() {
  const container = document.getElementById('faq-container');
  faqData.forEach(faq => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.innerHTML = `
      <button class="faq-question" aria-expanded="false">
        <span class="faq-icon">?</span>
        ${faq.q}
        <span class="faq-arrow">▼</span>
      </button>
      <div class="faq-answer">${faq.a}</div>
    `;
    item.querySelector('.faq-question').addEventListener('click', () => {
      item.classList.toggle('open');
    });
    container.appendChild(item);
  });
}

// Myth Cards
document.querySelectorAll('.myth-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('active'));
});

// Checklist
document.querySelectorAll('.check-item input').forEach(checkbox => {
  checkbox.addEventListener('change', updateChecklist);
});

function updateChecklist() {
  const checked = document.querySelectorAll('.check-item input:checked').length;
  const total = document.querySelectorAll('.check-item input').length;
  document.getElementById('checklist-progress').style.width = `${(checked/total)*100}%`;
  document.getElementById('checklist-count').textContent = `${checked}/${total} Complete`;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  initTimeline();
  initFAQ();
  updateChecklist();
  
  // Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('animate');
    });
  });
  
  document.querySelectorAll('.stat-card, .glass-card, .myth-card').forEach(el => {
    observer.observe(el);
  });
});

// Voice Assistant
document.getElementById('voice-mic')?.addEventListener('click', () => {
  const status = document.getElementById('voice-status');
  const waveform = document.getElementById('waveform');
  const mic = document.getElementById('voice-mic');
  
  if (mic.textContent === '🎤') {
    status.textContent = 'Listening... बोलें';
    waveform.classList.add('listening');
    mic.textContent = '⏹️';
    // Simulate
    setTimeout(() => {
      status.textContent = 'You said: "How to register?"';
      setTimeout(() => {
        document.getElementById('voice-modal').classList.add('hidden');
        chatInputEl.value = 'register';
        sendChat();
      }, 1000);
    }, 2000);
  } else {
    waveform.classList.remove('listening');
    mic.textContent = '🎤';
    status.textContent = 'Tap mic to speak';
  }
});