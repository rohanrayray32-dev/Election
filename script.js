/* ============================================
   ELECTION PROCESS ASSISTANT - script.js
   ============================================ */

/* ============================================
   1. THEME TOGGLE (Dark / Light Mode)
   ============================================ */
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');

function getTheme() {
  return localStorage.getItem('theme') || 'dark';
}

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  // Update toggle button icons
  const icon = theme === 'dark' ? '☀️' : '🌙';
  if (themeToggle) themeToggle.textContent = icon;
  if (themeToggleMobile) themeToggleMobile.textContent = icon;
}

function toggleTheme() {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark');
}

// Apply saved theme on load
setTheme(getTheme());

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

if (themeToggleMobile) {
  themeToggleMobile.addEventListener('click', toggleTheme);
}


/* ============================================
   2. LOADING SCREEN
   ============================================ */
window.addEventListener('load', () => {
  const screen = document.getElementById('loading-screen');
  setTimeout(() => {
    screen.style.opacity = '0';
    setTimeout(() => { screen.style.display = 'none'; }, 500);
  }, 1200);
});


/* ============================================
   3. NAVBAR — scroll effect & hamburger
   ============================================ */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    if (mobileMenu) mobileMenu.classList.add('hidden');
  });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ============================================
   4. SCROLL PROGRESS BAR
   ============================================ */
const progressBar = document.getElementById('progress-bar');

if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    progressBar.style.transform = `scaleX(${progress})`;
  });
}


/* ============================================
   5. SCROLL TO TOP BUTTON
   ============================================ */
const scrollTopBtn = document.getElementById('scroll-top');

if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.remove('hidden');
    } else {
      scrollTopBtn.classList.add('hidden');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ============================================
   6. NOTIFICATION POPUP
   ============================================ */
setTimeout(() => {
  const notif = document.getElementById('notification');
  if (notif) notif.classList.remove('hidden');
}, 2500);

const notifCloseBtn = document.getElementById('notif-close');
if (notifCloseBtn) {
  notifCloseBtn.addEventListener('click', () => {
    const notif = document.getElementById('notification');
    if (notif) notif.classList.add('hidden');
  });
}


/* ============================================
   7. COUNTDOWN TIMER
   ============================================ */
const electionDate = new Date('2025-11-04T08:00:00').getTime();

function updateCountdown() {
  const now = Date.now();
  const diff = electionDate - now;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent = '000';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-minutes').textContent = '00';
    document.getElementById('cd-seconds').textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-days').textContent = String(days).padStart(3, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* ============================================
   8. ELECTION TIMELINE
   ============================================ */
const timelineData = [
  {
    icon: '📋',
    title: 'Voter Registration',
    desc: 'Citizens register to vote, meeting requirements such as minimum age (18+), citizenship status, and residency. Deadlines vary by state — some allow same-day registration at the polls.'
  },
  {
    icon: '🏷️',
    title: 'Candidate Nomination',
    desc: 'Political parties hold primaries or caucuses to select their candidates. Independent candidates collect signatures to appear on the ballot. Nomination papers are then filed with election authorities.'
  },
  {
    icon: '📢',
    title: 'Campaigning',
    desc: 'Candidates present their platforms, hold rallies, debate opponents, and run advertisements. Campaign finance rules limit spending and require disclosure of donors. This phase can last months.'
  },
  {
    icon: '🗳️',
    title: 'Voting Day',
    desc: 'Registered voters cast ballots at designated polling stations, or via early voting or absentee mail-in. Polls typically open at 6am and close at 8pm. You must bring valid ID in most states.'
  },
  {
    icon: '🔢',
    title: 'Vote Counting',
    desc: 'Election officials securely tally ballots — both in-person and mail-in. The process is monitored by bipartisan observers. Results are verified at multiple levels before being certified.'
  },
  {
    icon: '📊',
    title: 'Result Declaration',
    desc: 'Final tallies are certified by state authorities. Candidates may request recounts if margins are very close. Official results are announced and the winner is declared publicly.'
  },
  {
    icon: '🏛️',
    title: 'Government Formation',
    desc: 'Elected officials take their oath of office on Inauguration Day. They form the new government, appoint cabinet members, and begin drafting and implementing policy.'
  }
];

const timelineWrapper = document.getElementById('timeline-steps');
const timelineDotsContainer = document.getElementById('timeline-dots');
const timelineProgressFill = document.getElementById('timeline-progress-fill');
let activeTimelineStep = null;

// Build dots
timelineData.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'timeline-dot';
  dot.addEventListener('click', () => activateTimelineStep(i));
  timelineDotsContainer.appendChild(dot);
});

// Build vertical line
const line = document.createElement('div');
line.className = 'timeline-line';
timelineWrapper.appendChild(line);

// Build items
timelineData.forEach((step, i) => {
  const isLeft = i % 2 === 0;

  const item = document.createElement('div');
  item.className = `timeline-item${isLeft ? ' left' : ''}`;
  item.style.animationDelay = `${i * 0.1}s`;

  const node = document.createElement('div');
  node.className = 'timeline-node';
  node.textContent = step.icon;
  node.addEventListener('click', () => activateTimelineStep(i));

  const content = document.createElement('div');
  content.className = 'timeline-content';

  const card = document.createElement('div');
  card.className = 'timeline-card';
  card.innerHTML = `
    <div class="timeline-step-label">Step ${i + 1}</div>
    <div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;">
      <div class="timeline-card-title">${step.title}</div>
      <span class="timeline-card-arrow">▼</span>
    </div>
    <div class="timeline-desc">${step.desc}</div>
  `;
  card.addEventListener('click', () => activateTimelineStep(i));

  content.appendChild(card);
  item.appendChild(node);
  item.appendChild(content);
  timelineWrapper.appendChild(item);
});

function activateTimelineStep(index) {
  const cards = document.querySelectorAll('.timeline-card');
  const dots = document.querySelectorAll('.timeline-dot');
  const descs = document.querySelectorAll('.timeline-desc');

  const isSame = activeTimelineStep === index;
  activeTimelineStep = isSame ? null : index;

  cards.forEach((card, i) => {
    card.classList.toggle('active', !isSame && i === index);
  });
  descs.forEach((desc, i) => {
    desc.classList.toggle('open', !isSame && i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i <= (isSame ? -1 : index));
  });

  const fillPct = isSame ? 0 : ((index + 1) / timelineData.length) * 100;
  timelineProgressFill.style.width = `${fillPct}%`;
}

// Animate timeline items on scroll
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.timeline-item').forEach(item => {
  item.style.transform = 'translateY(20px)';
  timelineObserver.observe(item);
});


/* ============================================
   9. INFORMATION CARDS
   ============================================ */
const infoData = [
  {
    icon: '🗳️',
    title: 'How Voting Works',
    text: 'On election day, registered voters present ID at their assigned polling place, receive a ballot, and mark their choices in a private booth. Ballots are then scanned or counted by hand.',
    tags: ['Polling', 'Ballot', 'Process']
  },
  {
    icon: '✅',
    title: 'Eligibility Criteria',
    text: 'To vote in U.S. elections, you must be: a U.S. citizen, at least 18 years old on Election Day, a resident of the state where you register, and not have certain felony convictions (varies by state).',
    tags: ['Citizenship', 'Age 18+', 'Residency']
  },
  {
    icon: '🪪',
    title: 'Required Documents',
    text: 'Most states require a government-issued photo ID such as a driver\'s license, passport, or state ID. Some states also accept utility bills or bank statements as proof of address.',
    tags: ['Photo ID', 'Passport', 'State ID']
  },
  {
    icon: '🏛️',
    title: 'Types of Elections',
    text: 'General Elections choose federal/state officeholders. Primary Elections decide party nominees. Local Elections cover mayors and school boards. Referendums let voters decide specific issues directly.',
    tags: ['General', 'Primary', 'Local', 'Referendum']
  },
  {
    icon: '📬',
    title: 'Voting Methods',
    text: 'You can vote in-person on Election Day, through early in-person voting (days before the election), or by absentee/mail-in ballot. Request absentee ballots well before the deadline.',
    tags: ['In-Person', 'Early Voting', 'Absentee']
  }
];

const cardsGrid = document.getElementById('info-cards');

infoData.forEach(card => {
  const el = document.createElement('div');
  el.className = 'info-card';
  el.innerHTML = `
    <div class="info-card-icon">${card.icon}</div>
    <div class="info-card-title">${card.title}</div>
    <div class="info-card-text">${card.text}</div>
    <div class="info-card-tags">
      ${card.tags.map(t => `<span class="tag">${t}</span>`).join('')}
    </div>
  `;
  cardsGrid.appendChild(el);
});


/* ============================================
   10. SEARCH FEATURE
   ============================================ */
const searchData = [
  { category: 'Registration', title: 'Online Voter Registration', text: 'Most states offer online registration at their official election website. You\'ll need a state ID or SSN to complete the process.' },
  { category: 'Registration', title: 'Registration Deadlines', text: 'Deadlines vary by state — typically 15–30 days before Election Day. Some states offer same-day registration.' },
  { category: 'Voting', title: 'Polling Place Hours', text: 'Most polling places are open from 6:00 AM to 8:00 PM on Election Day. Check your state\'s specific hours.' },
  { category: 'Voting', title: 'What to Bring to Vote', text: 'Bring a valid photo ID. In some states, a voter registration card, utility bill, or bank statement may also be accepted.' },
  { category: 'Absentee', title: 'Absentee Ballot Request', text: 'Request an absentee ballot from your local election office, usually by mail or online. Deadlines are typically 7–14 days before the election.' },
  { category: 'Absentee', title: 'Returning Your Ballot', text: 'Mail your absentee ballot early or drop it off at an official ballot drop box. It must be received by your state\'s deadline.' },
  { category: 'Eligibility', title: 'Felony Conviction Rules', text: 'Voting rights after a felony conviction vary by state. Some states restore rights after sentence completion; others have different rules.' },
  { category: 'Eligibility', title: 'Voting Age', text: 'You must be 18 years old by Election Day to vote. Some states allow 17-year-olds to vote in primaries if they\'ll be 18 by the general election.' },
  { category: 'Results', title: 'When Are Results Announced?', text: 'Unofficial results are typically reported on election night. Official certified results may take days to weeks, especially for mail-in ballots.' },
  { category: 'Results', title: 'Election Recounts', text: 'Candidates can request a recount if the margin is within a certain threshold (varies by state, usually 0.5% or less).' },
  { category: 'Process', title: 'Electoral College', text: 'In presidential elections, voters choose electors who then cast votes for president. A candidate needs 270 of 538 electoral votes to win.' },
  { category: 'Process', title: 'Primary vs. General Elections', text: 'Primaries determine each party\'s nominee. The general election is the final vote where all candidates from different parties compete.' },
  { category: 'Voting', title: 'Early Voting', text: 'Early voting allows you to cast your ballot at a polling place before Election Day — often 1–2 weeks in advance. Check if your state offers it.' },
  { category: 'Process', title: 'How Votes Are Counted', text: 'Ballots are scanned electronically or counted by hand by election officials, with bipartisan observers present to ensure accuracy.' },
  { category: 'Registration', title: 'Changing Your Address', text: 'If you move, update your voter registration before the deadline. You may need to re-register in your new county or state.' },
];

const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

function renderSearchResults(query) {
  if (!searchResults) return;
  searchResults.innerHTML = '';
  const filtered = query
    ? searchData.filter(d =>
        d.title.toLowerCase().includes(query.toLowerCase()) ||
        d.text.toLowerCase().includes(query.toLowerCase()) ||
        d.category.toLowerCase().includes(query.toLowerCase())
      )
    : searchData.slice(0, 6);

  if (filtered.length === 0) {
    searchResults.innerHTML = '<div class="no-results">No results found. Try a different search term.</div>';
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'search-result-card';
    card.innerHTML = `
      <div class="sr-tag">${item.category}</div>
      <div class="sr-title">${item.title}</div>
      <div class="sr-text">${item.text}</div>
    `;
    searchResults.appendChild(card);
  });
}

if (searchInput) {
  searchInput.addEventListener('input', (e) => renderSearchResults(e.target.value.trim()));
}
renderSearchResults(''); // show defaults


/* ============================================
   11. AI CHAT ASSISTANT
   ============================================ */
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

const botResponses = {
  register: 'You can register to vote online at your state\'s official election website, by mail, or in person at your local election office or DMV. Registration deadlines typically fall 15–30 days before Election Day.',
  id: 'Most states require a government-issued photo ID such as a driver\'s license, passport, or state ID card. Some states also accept non-photo IDs like utility bills or bank statements. Check your state\'s specific requirements.',
  absentee: 'Absentee (or mail-in) voting lets you vote without going to a polling place. Request your ballot from your local election office well in advance — usually at least 7 days before the election. Return it by mail or at an official drop box.',
  early: 'Early voting allows you to cast your ballot in person at an official location days or weeks before Election Day. Check if your state offers early voting and find your nearest early voting site.',
  count: 'Votes are counted by election officials using optical scanners and hand counts, with bipartisan observers present. Results are verified at multiple levels before certification.',
  result: 'Unofficial results are often reported on election night. Official certified results can take days to a few weeks, especially as mail-in ballots are processed.',
  polling: 'Your polling place is determined by your home address. Check your voter registration card, your state\'s election website, or call your local election office to find your assigned location.',
  candidate: 'To become a candidate, you typically need to file nomination papers with the relevant election authority and meet eligibility requirements such as age, residency, and citizenship.',
  electoral: 'The Electoral College is the system used to elect the U.S. President. Each state has a number of electors equal to its congressional representation. A candidate needs 270 of 538 electoral votes to win.',
  deadline: 'Voter registration deadlines vary by state, typically 15–30 days before Election Day. Some states offer same-day registration. Visit your state\'s official election website for exact deadlines.',
  default: 'That\'s a great question! Election rules vary by state. I recommend visiting vote.gov or your state\'s official election authority website for the most accurate and up-to-date information. Is there anything else I can help you with?'
};

function getBotResponse(msg) {
  const m = msg.toLowerCase();
  if (m.includes('register') || m.includes('registration') || m.includes('sign up')) return botResponses.register;
  if (m.includes('id') || m.includes('identification') || m.includes('document')) return botResponses.id;
  if (m.includes('absentee') || m.includes('mail') || m.includes('mail-in')) return botResponses.absentee;
  if (m.includes('early')) return botResponses.early;
  if (m.includes('count') || m.includes('tally') || m.includes('counted')) return botResponses.count;
  if (m.includes('result') || m.includes('announce') || m.includes('winner')) return botResponses.result;
  if (m.includes('polling') || m.includes('where') || m.includes('location') || m.includes('place')) return botResponses.polling;
  if (m.includes('candidate') || m.includes('run for') || m.includes('nominate')) return botResponses.candidate;
  if (m.includes('electoral') || m.includes('college') || m.includes('elector')) return botResponses.electoral;
  if (m.includes('deadline') || m.includes('when') || m.includes('date')) return botResponses.deadline;
  return botResponses.default;
}

function appendMessage(role, text) {
  if (!chatMessages) return;
  const msg = document.createElement('div');
  msg.className = `message ${role === 'bot' ? 'bot-message' : 'user-message'}`;
  msg.innerHTML = `
    ${role === 'bot' ? '<div class="message-avatar">🤖</div>' : ''}
    <div class="message-bubble">${text}</div>
    ${role === 'user' ? '<div class="message-avatar">👤</div>' : ''}
  `;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
  if (!chatMessages) return;
  const typing = document.createElement('div');
  typing.className = 'message bot-message';
  typing.id = 'typing-indicator';
  typing.innerHTML = `
    <div class="message-avatar">🤖</div>
    <div class="message-bubble">
      <div class="typing-bubble">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
  chatMessages.appendChild(typing);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById('typing-indicator');
  if (el) el.remove();
}

function sendMessage(text) {
  const msg = text.trim();
  if (!msg) return;
  appendMessage('user', msg);
  chatInput.value = '';
  showTyping();
  setTimeout(() => {
    removeTyping();
    appendMessage('bot', getBotResponse(msg));
  }, 1000 + Math.random() * 600);
}

if (chatSend && chatInput) {
  chatSend.addEventListener('click', () => sendMessage(chatInput.value));
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage(chatInput.value);
  });
}

// Quick question buttons
document.querySelectorAll('.quick-btn').forEach(btn => {
  btn.addEventListener('click', () => sendMessage(btn.getAttribute('data-q')));
});


/* ============================================
   12. FAQ ACCORDION
   ============================================ */
const faqData = [
  { q: 'How do I register to vote?', a: 'You can register online through your state\'s official election website, by mail using a voter registration form, or in person at your local election office, DMV, or other government agencies. Deadlines vary by state.' },
  { q: 'What ID is required to vote?', a: 'Most states require a government-issued photo ID (driver\'s license, passport, or state ID). Some accept non-photo alternatives. A few states have no ID requirement. Always check your state\'s specific rules before Election Day.' },
  { q: 'How are votes counted?', a: 'Ballots are counted using optical scan machines or hand-counted by election officials. The process is monitored by bipartisan observers and subject to multiple layers of verification before results are certified.' },
  { q: 'What is a polling place?', a: 'A polling place is a designated location — like a school, community center, or government building — where registered voters in a specific district go to cast their ballots on Election Day.' },
  { q: 'Can I vote early?', a: 'Yes, in most states! Early voting allows you to cast your ballot in person at an official location days or weeks before Election Day. Check your state\'s election website to find early voting sites and hours.' },
  { q: 'What is absentee voting?', a: 'Absentee (mail-in) voting lets you vote by mailing your ballot instead of going to a polling place. Request your absentee ballot from your local election office well before the election — deadlines vary by state.' },
  { q: 'How long does vote counting take?', a: 'For in-person ballots, results are often available on election night. However, mail-in and absentee ballots can take additional days to process. Official certified results may take 1–3 weeks after the election.' },
  { q: 'When are official results announced?', a: 'Unofficial results are typically reported on election night. Official certified results are announced after all ballots are verified and counted, usually within 2–4 weeks following Election Day.' }
];

const faqList = document.getElementById('faq-list');

faqData.forEach((item, i) => {
  const faqItem = document.createElement('div');
  faqItem.className = 'faq-item';
  faqItem.innerHTML = `
    <button class="faq-question" aria-expanded="false">
      ${item.q}
      <span class="faq-arrow">▼</span>
    </button>
    <div class="faq-answer">${item.a}</div>
  `;

  const btn = faqItem.querySelector('.faq-question');
  btn.addEventListener('click', () => {
    const isOpen = faqItem.classList.contains('open');
    // Close all others
    document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));
    document.querySelectorAll('.faq-question').forEach(el => el.setAttribute('aria-expanded', 'false'));
    // Toggle current
    if (!isOpen) {
      faqItem.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  faqList.appendChild(faqItem);
});


/* ============================================
   13. MAP / POLLING PLACE FINDER
   ============================================ */
document.getElementById('zip-search').addEventListener('click', () => {
  const zip = document.getElementById('zip-input').value.trim();
  const results = document.getElementById('map-results');
  if (zip.length >= 4) {
    results.classList.remove('hidden');
  } else {
    alert('Please enter a valid ZIP code.');
  }
});

document.getElementById('zip-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') document.getElementById('zip-search').click();
});


/* ============================================
   14. VOICE ASSISTANT MODAL
   ============================================ */
const voiceBtn = document.getElementById('voice-btn');
const voiceModal = document.getElementById('voice-modal');
const voiceClose = document.getElementById('voice-close');
const voiceMicBtn = document.getElementById('voice-mic-btn');
const voiceStatus = document.getElementById('voice-status');
const waveform = document.getElementById('waveform');
let isListening = false;

voiceBtn.addEventListener('click', () => {
  voiceModal.classList.remove('hidden');
});

voiceClose.addEventListener('click', () => {
  voiceModal.classList.add('hidden');
  stopListening();
});

voiceModal.addEventListener('click', (e) => {
  if (e.target === voiceModal) {
    voiceModal.classList.add('hidden');
    stopListening();
  }
});

voiceMicBtn.addEventListener('click', () => {
  if (isListening) {
    stopListening();
  } else {
    startListening();
  }
});

function startListening() {
  isListening = true;
  waveform.classList.add('listening');
  voiceStatus.textContent = 'Listening… speak your question now.';
  voiceMicBtn.textContent = '⏹ Stop Listening';

  // Simulate voice response after 3 seconds
  setTimeout(() => {
    stopListening();
    voiceStatus.textContent = 'Voice response: "To register to vote, visit your state\'s official election website and complete the online form."';
  }, 3000);
}

function stopListening() {
  isListening = false;
  waveform.classList.remove('listening');
  voiceMicBtn.textContent = '🎤 Start Listening';
  if (voiceStatus.textContent.startsWith('Listening')) {
    voiceStatus.textContent = 'Tap the mic to start listening…';
  }
}


/* ============================================
   15. SCROLL-TRIGGERED ANIMATIONS (IntersectionObserver)
   ============================================ */
const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

// Animate info cards
document.querySelectorAll('.info-card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(24px)';
  card.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
  animateOnScroll.observe(card);
});

// Animate FAQ items
document.querySelectorAll('.faq-item').forEach((item, i) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(16px)';
  item.style.transition = `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`;
  animateOnScroll.observe(item);
});

// Animate section headers
document.querySelectorAll('.section-header').forEach(header => {
  header.style.opacity = '0';
  header.style.transform = 'translateY(20px)';
  header.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  animateOnScroll.observe(header);
});
