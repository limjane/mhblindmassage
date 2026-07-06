/* site-config.js — renders data/site-config.json into the page.
   Isolation guarantee: if the config file is missing, invalid, or a field is
   empty, the static HTML defaults stay untouched — the site never breaks. */
(function () {
  'use strict';

  var ICONS = {
    tuina: '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#b3452c" stroke-width="1.8" stroke-linecap="round"><path d="M4 15c3-6 13-6 16 0M7 10c2-4 8-4 10 0"/><circle cx="12" cy="18" r="2"/></svg>',
    foot:  '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#b3452c" stroke-width="1.8" stroke-linecap="round"><path d="M7 3v8a5 5 0 0 0 10 0V3M9 21h6"/></svg>',
    neck:  '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#b3452c" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="6" r="3"/><path d="M5 21c1-6 4-9 7-9s6 3 7 9"/></svg>',
    cup:   '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#b3452c" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8" opacity=".5"/></svg>'
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  // A value still containing XX or [brackets] is an unfilled placeholder
  function isPH(v) { return !v || /XX|\[/.test(v); }
  function filled(v) { return v && !isPH(v); }

  function setDual(idEn, idZh, valEn, valZh) {
    var en = document.getElementById(idEn), zh = document.getElementById(idZh);
    if (en && valEn) { en.textContent = valEn; en.classList.toggle('placeholder', isPH(valEn)); }
    if (zh && valZh) { zh.textContent = valZh; zh.classList.toggle('placeholder', isPH(valZh)); }
  }

  function renderContact(b) {
    var ph = document.getElementById('cfgPhone');
    if (ph && b.phone) {
      ph.classList.toggle('placeholder', isPH(b.phone));
      if (filled(b.phone)) {
        ph.innerHTML = '<a href="tel:' + esc(b.phone.replace(/[^+\d]/g, '')) + '">' + esc(b.phone) + '</a>';
      } else {
        ph.textContent = b.phone;
      }
    }
    // Every Facebook link on the page follows the config
    if (b.facebook) {
      document.querySelectorAll('a[href*="facebook.com"]').forEach(function (a) { a.href = b.facebook; });
    }
    // Map + directions
    if (b.lat && b.lng) {
      var map = document.getElementById('cfgMap');
      if (map) map.src = 'https://maps.google.com/maps?q=' + b.lat + ',' + b.lng + '&z=16&output=embed';
    }
    if (b.mapsUrl) {
      var dir = document.getElementById('cfgDirections');
      if (dir) dir.href = b.mapsUrl;
    }
    // WhatsApp booking button appears in the hero once a number is configured
    if (filled(b.whatsapp)) {
      var row = document.querySelector('header .cta-row');
      if (row && !document.getElementById('waCta')) {
        var a = document.createElement('a');
        a.id = 'waCta';
        a.className = 'btn btn-primary';
        a.target = '_blank'; a.rel = 'noopener';
        a.href = 'https://wa.me/' + b.whatsapp.replace(/[^\d]/g, '');
        a.innerHTML = '<span lang-en>💬 Book on WhatsApp</span><span lang-zh>💬 WhatsApp 预约</span>';
        row.insertBefore(a, row.firstChild);
      }
    }
  }

  function renderServices(list) {
    var box = document.getElementById('serviceCards');
    if (!box || !Array.isArray(list) || !list.length) return;
    box.innerHTML = list.map(function (s) {
      return '<div class="card reveal in">' +
        '<div class="icon">' + (ICONS[s.icon] || ICONS.tuina) + '</div>' +
        '<h3><span lang-en>' + esc(s.nameEn) + '</span><span lang-zh>' + esc(s.nameZh) + '</span></h3>' +
        '<p><span lang-en>' + esc(s.descEn) + '</span><span lang-zh>' + esc(s.descZh) + '</span></p>' +
        '<div class="price"><span' + (isPH(s.price) ? ' class="placeholder"' : '') + '>' + esc(s.price) + '</span>' +
        ' <small>/ <span lang-en>' + esc(s.durationEn) + '</span><span lang-zh>' + esc(s.durationZh) + '</span></small></div>' +
        '</div>';
    }).join('');
  }

  function renderAnnouncement(a) {
    if (!a || !a.enabled || !(a.en || a.zh)) return;
    var hero = document.querySelector('.hero-inner');
    if (!hero) return;
    var bar = document.createElement('div');
    bar.className = 'announce';
    bar.innerHTML = '<span lang-en>' + esc(a.en || a.zh) + '</span><span lang-zh>' + esc(a.zh || a.en) + '</span>';
    hero.insertBefore(bar, hero.firstChild);
  }

  // Keep the structured data Google/AI reads in sync with the config
  function patchJsonLd(cfg) {
    var node = document.querySelector('script[type="application/ld+json"]');
    if (!node) return;
    try {
      var d = JSON.parse(node.textContent), b = cfg.business;
      if (filled(b.phone)) d.telephone = b.phone;
      if (b.facebook) d.sameAs = [b.facebook];
      if (filled(b.addressEn) && d.address) d.address.streetAddress = b.addressEn;
      if (cfg.hours && filled(cfg.hours.en)) d.openingHours = cfg.hours.en;
      node.textContent = JSON.stringify(d);
    } catch (e) { /* leave original JSON-LD untouched */ }
  }

  /* ---------- booking form (WhatsApp deep link) ---------- */
  var activeCfg = null;

  function populateBookingServices(list) {
    var sel = document.getElementById('bkService');
    if (!sel || !Array.isArray(list) || !list.length) return;
    sel.innerHTML = list.map(function (s) {
      var label = [s.nameEn, s.nameZh].filter(Boolean).join(' ');
      return '<option>' + esc(label) + '</option>';
    }).join('');
  }

  function bindBooking() {
    var form = document.getElementById('bkForm');
    if (!form) return;
    var dateEl = document.getElementById('bkDate');
    if (dateEl) dateEl.min = new Date().toISOString().slice(0, 10);
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var st = document.getElementById('bkStatus');
      var v = function (id) { var n = document.getElementById(id); return n ? n.value.trim() : ''; };
      if (!v('bkName') || !v('bkDate') || !v('bkTime')) {
        st.textContent = document.body.classList.contains('zh')
          ? '请填写姓名、日期与时间。' : 'Please fill in your name, date and time.';
        return;
      }
      var msg = 'Hello 巧手堂 M H Blind Massage!\nBooking request 预约:\n• ' + v('bkService') +
        '\n• ' + v('bkDate') + ' ' + v('bkTime') + '\n• Name 姓名: ' + v('bkName') +
        (v('bkNote') ? '\n• ' + v('bkNote') : '');
      var b = (activeCfg && activeCfg.business) || {};
      if (filled(b.whatsapp)) {
        window.open('https://wa.me/' + b.whatsapp.replace(/[^\d]/g, '') + '?text=' + encodeURIComponent(msg),
          '_blank', 'noopener');
        st.textContent = document.body.classList.contains('zh')
          ? '正在打开 WhatsApp——请按发送完成预约。' : 'Opening WhatsApp — press send to complete your booking.';
      } else {
        var fb = b.facebook || 'https://www.facebook.com/share/18bWiW5wuR/';
        st.innerHTML = (document.body.classList.contains('zh')
          ? 'WhatsApp 预约暂未开通，请通过 <a href="' + esc(fb) + '" target="_blank" rel="noopener">Facebook 专页</a>联系我们。'
          : 'WhatsApp booking is not set up yet — please message us on <a href="' + esc(fb) + '" target="_blank" rel="noopener">Facebook</a>.');
      }
    });
  }

  function apply(cfg) {
    if (!cfg || !cfg.business) return;
    activeCfg = cfg;
    renderContact(cfg.business);
    setDual('cfgAddrEn', 'cfgAddrZh', cfg.business.addressEn, cfg.business.addressZh);
    if (cfg.hours) setDual('cfgHoursEn', 'cfgHoursZh', cfg.hours.en, cfg.hours.zh);
    renderServices(cfg.services);
    populateBookingServices(cfg.services);
    renderAnnouncement(cfg.announcement);
    patchJsonLd(cfg);
  }

  bindBooking();

  // ?draft=1 previews unsaved edits from admin.html (stored in this browser only)
  var draft = null;
  if (new URLSearchParams(location.search).get('draft') === '1') {
    try { draft = JSON.parse(localStorage.getItem('mh-cfg-draft')); } catch (e) {}
  }
  if (draft) { apply(draft); return; }

  fetch('data/site-config.json?v=' + Date.now())
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(apply)
    .catch(function (e) { console.warn('site-config.json not loaded — using built-in defaults.', e); });
})();
