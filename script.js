// ===================================
// 1Apportunity – Main JavaScript
// Vanilla ES6+ — no dependencies
// ===================================

// ===================================
// Mock Data
// ===================================
const mockReviews = [
  { id: 1, name: "Sarah Johnson", rating: 5, text: "1Apportunity has completely changed how I earn extra income! The tasks are simple, and the payouts are always on time. I've earned over ₹500 in just two months!", date: "2024-01-15", initials: "SJ", color: "#3b82f6" },
  { id: 2, name: "Michael Chen", rating: 5, text: "As a student, this platform has been a lifesaver. I can complete tasks during my free time and earn real money. The interface is super user-friendly!", date: "2024-01-10", initials: "MC", color: "#a855f7" },
  { id: 3, name: "Emily Rodriguez", rating: 4, text: "Great platform for passive income. I love that I can complete tasks from my phone anywhere. Would definitely recommend to anyone looking to earn extra cash!", date: "2024-01-05", initials: "ER", color: "#10b981" },
  { id: 4, name: "David Thompson", rating: 5, text: "The best part about 1Apportunity is the transparency. You always know exactly how much you'll earn for each task. Couldn't be happier!", date: "2023-12-28", initials: "DT", color: "#f59e0b" },
  { id: 5, name: "Lisa Martinez", rating: 5, text: "Simple, reliable, and actually pays! I was skeptical at first, but after my first cashout, I was convinced. This is the real deal. Highly recommended!", date: "2023-12-20", initials: "LM", color: "#ef4444" }
];

// ===================================
// Counter Animation (Stats Strip)
// ===================================
function animateCounter(element, target, prefix = '', suffix = '+') {
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  const stepDuration = duration / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = prefix + target.toLocaleString() + suffix;
      clearInterval(timer);
    } else {
      element.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
    }
  }, stepDuration);
}

function initializeStats() {
  const stripValues = document.querySelectorAll('.strip-value[data-target]');
  if (!stripValues.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const prefix = el.dataset.prefix || '';
        animateCounter(el, target, prefix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  stripValues.forEach(v => observer.observe(v));
}

// ===================================
// Reviews
// ===================================
function renderReviews(reviews = mockReviews) {
  const grid = document.getElementById('reviewsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  reviews.forEach(r => grid.appendChild(createReviewCard(r)));
}

function createReviewCard(review) {
  const card = document.createElement('div');
  card.className = 'review-card';

  const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
  const date = new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  card.innerHTML = `
    <div class="review-header">
      <div class="review-avatar" style="background:${review.color}">${review.initials}</div>
      <div class="review-info">
        <div class="review-name">${review.name}</div>
        <div class="review-meta">${date}</div>
      </div>
    </div>
    <div class="review-stars">${stars}</div>
    <p class="review-text">"${review.text}"</p>
  `;
  return card;
}

// ===================================
// Navbar – Scroll Shadow & Mobile Toggle
// ===================================
function initializeNavbar() {
  const nav = document.querySelector('.main-navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('primaryNav');
  if (!nav) return;

  // Shadow on scroll
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const opening = !links.classList.contains('open');
      links.classList.toggle('open', opening);
      toggle.classList.toggle('open', opening);
      toggle.setAttribute('aria-expanded', String(opening));
      document.body.style.overflow = opening ? 'hidden' : '';
    });

    // Close when a link is clicked
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (links.classList.contains('open') && !links.contains(e.target) && !toggle.contains(e.target)) {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
}

// ===================================
// Scroll Reveal Animations
// ===================================
function initializeScrollAnimations() {
  const selectors = [
    '.feature-card', '.explore-card', '.ways-card', '.benefit-row',
    '.step-item', '.feature-pill', '.highlight-card', '.contact-item',
    '.review-card', '.featured-testimonial', '.cta-card'
  ];
  const elements = document.querySelectorAll(selectors.join(','));
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal', 'visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

// ===================================
// Smooth Scroll for # links
// ===================================
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') { e.preventDefault(); return; }
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

// ===================================
// Helpers
// ===================================
function debounce(fn, wait) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
}

// ===================================
// Stats Charts (Chart.js)
// ===================================
function initializeStatCharts() {
  if (typeof Chart === 'undefined') return;

  // Shared: no legend, no tooltip title, transparent bg
  Chart.defaults.font.family = "'Inter', sans-serif";

  // ── Chart 1: Registered Users – Bar chart ──
  const usersCtx = document.getElementById('chart-users');
  if (usersCtx) {
    new Chart(usersCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          data: [1850, 3480, 3120, 1310, 2150, 2850],
          backgroundColor: [
            'rgba(15,23,42,.55)',
            'rgba(15,23,42,.7)',
            'rgba(15,23,42,.65)',
            'rgba(15,23,42,.45)',
            'rgba(15,23,42,.6)',
            'rgba(194,240,226,.9)'
          ],
          borderRadius: 6,
          borderSkipped: false,
          barPercentage: .7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,.8)',
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: ctx => ctx.parsed.y.toLocaleString() + ' users'
            }
          },
          // datalabels via plugin not needed — use custom plugin
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: 'rgba(255,255,255,.55)', font: { size: 10, weight: '500' } },
            border: { display: false }
          },
          y: {
            display: false,
            beginAtZero: true
          }
        },
        animation: { duration: 1200, easing: 'easeOutQuart' }
      },
      plugins: [{
        id: 'barTopLabels',
        afterDatasetsDraw(chart) {
          const { ctx } = chart;
          chart.getDatasetMeta(0).data.forEach((bar, i) => {
            const val = chart.data.datasets[0].data[i];
            const pct = Math.round((val / 3500) * 100);
            ctx.save();
            ctx.fillStyle = 'rgba(255,255,255,.9)';
            ctx.font = "600 10px 'Inter', sans-serif";
            ctx.textAlign = 'center';
            ctx.fillText(pct + '%', bar.x, bar.y - 6);
            ctx.restore();
          });
        }
      }]
    });
  }

  // ── Chart 2: Tasks Completed – Curved dashed line with 2024 highlight bar ──
  const tasksCtx = document.getElementById('chart-tasks');
  if (tasksCtx) {
    new Chart(tasksCtx, {
      type: 'line',
      data: {
        labels: ['2022', '2023', '2024', '2025', '2026'],
        datasets: [{
          data: [18, 42, 30, 52, 48],
          borderColor: 'rgba(255,255,255,.55)',
          borderWidth: 2.5,
          borderDash: [7, 5],
          pointBackgroundColor: ['transparent','transparent','#fff','transparent','transparent'],
          pointBorderColor: ['transparent','transparent','rgba(255,255,255,.9)','transparent','transparent'],
          pointBorderWidth: [0, 0, 2.5, 0, 0],
          pointRadius: [0, 0, 7, 0, 0],
          pointHoverRadius: [0, 0, 9, 0, 0],
          pointStyle: ['circle','circle','circle','circle','circle'],
          fill: false,
          tension: .4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        clip: false,
        layout: { padding: { bottom: 36 } },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,.8)',
            padding: 10,
            cornerRadius: 8,
            filter: (item) => item.dataIndex === 2,
            callbacks: {
              label: ctx => ctx.parsed.y.toLocaleString() + '% growth'
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: (ctx) => ctx.tick && ctx.tick.label === '2024' ? 'transparent' : 'rgba(255,255,255,.5)',
              font: { size: 11, weight: '400' },
              padding: 8,
            },
            border: { display: false }
          },
          y: { display: false, min: 0, max: 65 }
        },
        animation: { duration: 1400, easing: 'easeOutQuart' }
      },
      plugins: [{
        id: 'highlightBar2024',
        beforeDatasetsDraw(chart) {
          const { ctx, chartArea, scales: { x } } = chart;
          const idx = 2; // 2024
          const xPos = x.getPixelForTick(idx);
          const pointMeta = chart.getDatasetMeta(0).data[idx];
          const barWidth = 32;
          // Bar starts from the circle center and goes all the way past the bottom axis
          const barTop = pointMeta.y;
          const barBottom = chartArea.bottom + 32; // extend past x-axis into label area

          // Gradient: very dark at top → dark brown-gold midway → warm amber at bottom
          const grad = ctx.createLinearGradient(0, barTop, 0, barBottom);
          grad.addColorStop(0, 'rgba(20, 18, 12, .92)');
          grad.addColorStop(0.25, 'rgba(45, 38, 15, .78)');
          grad.addColorStop(0.5, 'rgba(85, 70, 20, .55)');
          grad.addColorStop(0.75, 'rgba(160, 130, 30, .35)');
          grad.addColorStop(1, 'rgba(210, 175, 50, .15)');

          ctx.save();
          // Subtle shadow behind bar
          ctx.shadowColor = 'rgba(0,0,0,.25)';
          ctx.shadowBlur = 12;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 4;

          ctx.beginPath();
          ctx.roundRect(
            xPos - barWidth / 2,
            barTop,
            barWidth,
            barBottom - barTop,
            [5, 5, 0, 0]
          );
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.restore();
        }
      }, {
        id: 'highlightLabel2024',
        afterDraw(chart) {
          const xAxis = chart.scales.x;
          const { ctx, chartArea } = chart;
          const idx = 2;
          const xPos = xAxis.getPixelForTick(idx);
          // Place the pill at the bottom of the bar (just below chart area)
          const yPos = chartArea.bottom + 18;

          // Dark pill background
          ctx.save();
          ctx.fillStyle = 'rgba(10, 10, 8, .88)';
          ctx.beginPath();
          ctx.roundRect(xPos - 24, yPos - 11, 48, 22, 5);
          ctx.fill();

          // White bold text
          ctx.fillStyle = '#fff';
          ctx.font = "700 11px 'Inter', sans-serif";
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('2024', xPos, yPos);
          ctx.restore();
        }
      }]
    });
  }

  // ── Chart 3: Total Payouts – Area chart ──
  const payCtx = document.getElementById('chart-payouts');
  if (payCtx) {
    const gradient = payCtx.getContext('2d').createLinearGradient(0, 0, 0, 160);
    gradient.addColorStop(0, 'rgba(30,41,59,.6)');
    gradient.addColorStop(1, 'rgba(30,41,59,.05)');

    new Chart(payCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
          data: [8500, 18200, 32400, 51800, 72300, 95600, 112000, 127845],
          borderColor: '#1e293b',
          borderWidth: 2.5,
          pointBackgroundColor: '#1e293b',
          pointBorderColor: '#d1d5db',
          pointBorderWidth: 2,
          pointRadius: [0, 0, 0, 0, 0, 0, 0, 5],
          pointHoverRadius: 6,
          fill: true,
          backgroundColor: gradient,
          tension: .4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,.85)',
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: ctx => '₹' + ctx.parsed.y.toLocaleString()
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: 'rgba(55,65,81,.65)', font: { size: 10, weight: '500' } },
            border: { display: false }
          },
          y: {
            display: false,
            beginAtZero: true
          }
        },
        animation: { duration: 1600, easing: 'easeOutQuart' }
      }
    });
  }
}

// ===================================
// Stat Card Expand/Collapse + Detail Charts
// ===================================
const detailChartInstances = {};

function initializeCardToggles() {
  document.querySelectorAll('.stat-card-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.stat-card');
      const detailId = btn.dataset.detail;
      const detailPanel = document.getElementById(detailId);
      const isExpanding = !card.classList.contains('expanded');

      // Collapse any other expanded card first
      document.querySelectorAll('.stat-card.expanded').forEach(c => {
        if (c !== card) {
          c.classList.remove('expanded');
          // Reset drill-down state for collapsed card
          const otherId = c.querySelector('.stat-card-detail')?.id;
          if (otherId && window._drilldownResets && window._drilldownResets[otherId]) {
            window._drilldownResets[otherId]();
          }
        }
      });

      card.classList.toggle('expanded', isExpanding);

      // If collapsing, reset drill-down to yearly view
      if (!isExpanding && detailId && window._drilldownResets && window._drilldownResets[detailId]) {
        window._drilldownResets[detailId]();
      }

      if (isExpanding && detailPanel) {
        const onTransitionEnd = (e) => {
          if (e.propertyName === 'max-height') {
            detailPanel.removeEventListener('transitionend', onTransitionEnd);

            if (!detailChartInstances[detailId]) {
              // First expand: create the chart
              renderDetailChart(detailId);
            } else {
              // Re-expand: force Chart.js to recalculate layout & hit areas
              detailChartInstances[detailId].resize();
            }
          }
        };
        detailPanel.addEventListener('transitionend', onTransitionEnd);
      }
    });
  });
}

function renderDetailChart(detailId) {
  if (typeof Chart === 'undefined') return;

  const canvasId = 'detail-chart-' + detailId.replace('detail-', '');
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const chartKey = detailId;
  const cardType = detailId.replace('detail-', '');

  /* ═══════════════════════════════════════════════════════
     DRILL-DOWN DATA STORE
     ═══════════════════════════════════════════════════════ */
  const drillData = {
    users: {
      yearly: {
        labels: ['2022','2023','2024','2025','2026'],
        data:   [2800, 5400, 12500, 28000, 48392],
        title:  'User Signups — Yearly Overview'
      },
      monthly: {
        '2022': { labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], data:[120,150,180,210,250,280,260,290,310,280,320,350], title:'User Signups — 2022 Monthly' },
        '2023': { labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], data:[320,380,410,450,480,520,490,530,560,510,570,580], title:'User Signups — 2023 Monthly' },
        '2024': { labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], data:[620,890,1150,1320,1480,1210,980,1050,1150,1080,1250,1320], title:'User Signups — 2024 Monthly' },
        '2025': { labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], data:[1850,2180,2490,2780,3120,2950,2650,2800,3050,2900,3200,3480], title:'User Signups — 2025 Monthly' },
        '2026': { labels:['Jan','Feb'], data:[3480,3650], title:'User Signups — 2026 Monthly' }
      }
    },
    tasks: {
      yearly: {
        labels: ['2022','2023','2024','2025','2026'],
        data:   [5200, 12400, 28800, 38900, 48392],
        title:  'Tasks Completed — Yearly Overview'
      },
      monthly: {
        '2022': { labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], data:[280,320,380,420,460,510,450,490,520,480,530,560], title:'Tasks Completed — 2022 Monthly' },
        '2023': { labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], data:[680,780,920,1050,1180,1280,1120,1200,1350,1250,1380,1450], title:'Tasks Completed — 2023 Monthly' },
        '2024': { labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], data:[1680,1920,2250,2480,2750,3020,2680,2850,3100,2950,3200,3420], title:'Tasks Completed — 2024 Monthly' },
        '2025': { labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], data:[2850,3100,3380,3520,3750,3920,3450,3600,3850,3700,3980,4200], title:'Tasks Completed — 2025 Monthly' },
        '2026': { labels:['Jan','Feb'], data:[4100,4350], title:'Tasks Completed — 2026 Monthly' }
      }
    },
    payouts: {
      yearly: {
        labels: ['2022','2023','2024','2025','2026'],
        data:   [18500, 42000, 95600, 167000, 208400],
        title:  'Payouts — Yearly Overview'
      },
      monthly: {
        '2022': { labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], data:[800,950,1200,1450,1680,1850,1620,1750,1900,1780,1950,2100], title:'Payouts — 2022 Monthly' },
        '2023': { labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], data:[2250,2600,3100,3500,3850,4200,3700,3950,4300,4050,4400,4700], title:'Payouts — 2023 Monthly' },
        '2024': { labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], data:[5200,6100,7400,8500,9200,10100,8800,9500,10400,9800,10600,11200], title:'Payouts — 2024 Monthly' },
        '2025': { labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], data:[11800,13200,14500,15800,16900,18100,16200,17300,18500,17800,19200,20500], title:'Payouts — 2025 Monthly' },
        '2026': { labels:['Jan','Feb'], data:[20800,22100], title:'Payouts — 2026 Monthly' }
      }
    }
  };

  // Generate weekly breakdown from a monthly total
  function genWeekly(monthTotal, weeks) {
    const parts = [];
    let remaining = monthTotal;
    for (let i = 0; i < weeks; i++) {
      if (i === weeks - 1) { parts.push(remaining); }
      else {
        const v = Math.round(remaining * (0.2 + Math.random() * 0.15));
        parts.push(v);
        remaining -= v;
      }
    }
    return parts;
  }

  /* ═══════════════════════════════════════════════════════
     DRILL-DOWN STATE
     ═══════════════════════════════════════════════════════ */
  const state = { level: 'yearly', year: null, month: null };
  const store = drillData[cardType];
  const isLight = (cardType === 'payouts');
  const titleEl  = document.getElementById('detail-title-' + cardType);
  const breadEl  = document.getElementById('breadcrumb-' + cardType);

  // ── Breadcrumb ──
  function updateBreadcrumb() {
    let html = '<button class="breadcrumb-btn' + (state.level === 'yearly' ? ' active' : '') + '" data-level="yearly">All Years</button>';
    if (state.year) {
      html += '<span class="breadcrumb-sep">\u203A</span>';
      html += '<button class="breadcrumb-btn' + (state.level === 'monthly' ? ' active' : '') + '" data-level="monthly">' + state.year + '</button>';
    }
    if (state.month) {
      html += '<span class="breadcrumb-sep">\u203A</span>';
      html += '<span class="breadcrumb-btn active">' + state.month + '</span>';
    }
    breadEl.innerHTML = html;

    breadEl.querySelectorAll('.breadcrumb-btn[data-level]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var target = btn.dataset.level;
        if (target === 'yearly' && state.level !== 'yearly') {
          state.level = 'yearly'; state.year = null; state.month = null;
          refreshChart();
        } else if (target === 'monthly' && state.level === 'weekly') {
          state.level = 'monthly'; state.month = null;
          refreshChart();
        }
      });
    });
  }

  // ── Data for current level ──
  function getChartData() {
    if (state.level === 'yearly') {
      return { labels: store.yearly.labels, data: store.yearly.data, title: store.yearly.title };
    }
    if (state.level === 'monthly') {
      var m = store.monthly[state.year];
      return { labels: m.labels, data: m.data, title: m.title };
    }
    // weekly
    var mData  = store.monthly[state.year];
    var mIdx   = mData.labels.indexOf(state.month);
    var mTotal = mData.data[mIdx];
    var weeks  = (state.month === 'May' || state.month === 'Dec') ? 5 : 4;
    var wLabels = [];
    for (var w = 1; w <= weeks; w++) wLabels.push('W' + w);
    var wData   = genWeekly(mTotal, weeks);
    var prefix  = cardType === 'users' ? 'User Signups' : cardType === 'tasks' ? 'Tasks Completed' : 'Payouts';
    return { labels: wLabels, data: wData, title: prefix + ' \u2014 ' + state.month + ' ' + state.year + ' Weekly' };
  }

  // ── Bar colors ──
  function barColors(count) {
    var out = [];
    for (var i = 0; i < count; i++) {
      if (isLight)
        out.push(i === count-1 ? 'rgba(30,41,59,.8)' : 'rgba(30,41,59,' + (.3 + (i/count)*.3).toFixed(2) + ')');
      else
        out.push(i === count-1 ? 'rgba(194,240,226,.9)' : 'rgba(15,23,42,' + (.4 + (i/count)*.3).toFixed(2) + ')');
    }
    return out;
  }

  // ── Build Chart.js config ──
  function buildConfig(d) {
    var txt    = isLight ? 'rgba(55,65,81,.7)' : 'rgba(255,255,255,.55)';
    var gridC  = isLight ? 'rgba(0,0,0,.05)' : 'rgba(255,255,255,.06)';
    var hoverC = isLight ? 'rgba(30,41,59,.85)' : 'rgba(194,240,226,.95)';

    return {
      type: 'bar',
      data: {
        labels: d.labels,
        datasets: [{
          label: cardType === 'users' ? 'Signups' : cardType === 'tasks' ? 'Tasks' : 'Payout \u20B9',
          data: d.data,
          backgroundColor: barColors(d.data.length),
          hoverBackgroundColor: hoverC,
          borderRadius: 5,
          borderSkipped: false,
          barPercentage: d.labels.length <= 5 ? .5 : .6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        onClick: function(evt, elements) {
          if (!elements.length) return;
          var idx   = elements[0].index;
          var label = d.labels[idx];
          if (state.level === 'yearly' && store.monthly[label]) {
            state.level = 'monthly'; state.year = label; refreshChart();
          } else if (state.level === 'monthly') {
            state.level = 'weekly'; state.month = label; refreshChart();
          }
        },
        onHover: function(evt, elements) {
          var el = evt.native ? evt.native.target : evt.chart.canvas;
          el.style.cursor = (state.level !== 'weekly' && elements.length) ? 'pointer' : 'default';
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,.85)', padding: 10, cornerRadius: 8,
            callbacks: {
              label: function(c) {
                var v = c.parsed.y.toLocaleString();
                return cardType === 'payouts' ? '\u20B9' + v : v + (cardType === 'users' ? ' users' : ' tasks');
              },
              afterLabel: function() { return state.level !== 'weekly' ? '  Click to drill down \u2193' : ''; }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: txt, font: { size: d.labels.length > 8 ? 9 : 11, weight: '500' } },
            border: { display: false }
          },
          y: {
            grid: { color: gridC },
            ticks: {
              color: txt, font: { size: 10 },
              callback: function(v) {
                if (cardType === 'payouts') return '\u20B9' + (v >= 1000 ? Math.round(v/1000) + 'k' : v);
                return v >= 1000 ? (v/1000) + 'k' : v;
              }
            },
            border: { display: false }
          }
        },
        animation: { duration: 600, easing: 'easeOutQuart' }
      },
      plugins: [{
        id: 'barTopLabels_' + cardType,
        afterDatasetsDraw: function(chart) {
          if (state.level === 'weekly') return;
          var ctx2 = chart.ctx;
          ctx2.save();
          ctx2.fillStyle = isLight ? 'rgba(55,65,81,.55)' : 'rgba(255,255,255,.7)';
          ctx2.font = "600 9px 'Inter', sans-serif";
          ctx2.textAlign = 'center';
          chart.getDatasetMeta(0).data.forEach(function(bar, i) {
            var val = chart.data.datasets[0].data[i];
            var disp = val >= 1000 ? Math.round(val/100)/10 + 'k' : val;
            ctx2.fillText(disp, bar.x, bar.y - 5);
          });
          ctx2.restore();
        }
      }]
    };
  }

  // ── Update stats row ──
  function updateStatsRow(d) {
    var panel    = document.getElementById(detailId);
    var statsRow = panel ? panel.querySelector('.detail-stats-row') : null;
    if (!statsRow) return;

    var total     = d.data.reduce(function(a, b) { return a + b; }, 0);
    var avg       = Math.round(total / d.data.length);
    var peak      = Math.max.apply(null, d.data);
    var peakLabel = d.labels[d.data.indexOf(peak)];
    var pre       = cardType === 'payouts' ? '\u20B9' : '';
    var fmt       = function(v) { return pre + v.toLocaleString(); };
    var perName   = state.level === 'yearly' ? '/ Year' : state.level === 'monthly' ? '/ Month' : '/ Week';

    statsRow.innerHTML =
      '<div class="detail-stat"><span class="detail-stat-value">' + fmt(total) + '</span><span class="detail-stat-label">Total</span></div>' +
      '<div class="detail-stat"><span class="detail-stat-value">' + fmt(avg) + '</span><span class="detail-stat-label">Avg ' + perName + '</span></div>' +
      '<div class="detail-stat"><span class="detail-stat-value">' + fmt(peak) + '</span><span class="detail-stat-label">Peak (' + peakLabel + ')</span></div>';
  }

  // ── Refresh (update chart in place) ──
  function refreshChart() {
    var d = getChartData();
    if (titleEl) titleEl.textContent = d.title;
    updateBreadcrumb();
    updateStatsRow(d);

    var existing = detailChartInstances[chartKey];
    if (existing) {
      var cfg = buildConfig(d);
      existing.data    = cfg.data;
      existing.options = cfg.options;
      existing.config._config.plugins = cfg.plugins;
      existing.update('active');
    }
  }

  // Expose reset so card-collapse can call it
  if (!window._drilldownResets) window._drilldownResets = {};
  window._drilldownResets[detailId] = function() {
    state.level = 'yearly'; state.year = null; state.month = null;
    refreshChart();
  };

  /* ═══════════════════════════════════════════════════════
     INITIAL RENDER
     ═══════════════════════════════════════════════════════ */
  var initData = getChartData();
  if (titleEl) titleEl.textContent = initData.title;
  updateBreadcrumb();
  updateStatsRow(initData);

  detailChartInstances[chartKey] = new Chart(canvas, buildConfig(initData));
}

// ===================================
// Init
// ===================================
function init() {
  initializeNavbar();
  initializeStats();
  initializeStatCharts();
  initializeCardToggles();
  renderReviews();
  initializeScrollAnimations();
  initializeSmoothScroll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
