/* eslint-disable */
// @ts-nocheck -- ported verbatim from the static site; logic kept untyped on purpose so it cannot drift.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { mount } from "./rooms";

// Stands in for the window.FarisRooms global that js/rooms.js used to set.
const FarisRooms = { mount: mount };

let experienceStarted = false;

/* Faris — page behaviour
   --------------------------------------------------------------------------
   Everything here enhances index.html, which already contains all of the
   content and (in CSS) the title's opening. Order of business:

     settings · helpers
     now    title card, the dot and its rooms, sound and touch, smooth scrolling,
            the opening scene, the dock, case studies, archive, film, contact form
     idle   scroll-linked motion for the sections below the fold

   The "idle" part is queued and run in short slices so that setting up
   animations nobody can see yet never blocks the first interaction.
   -------------------------------------------------------------------------- */
export function startExperience() {
  'use strict';

  // Runs once per page load. React StrictMode runs effects twice in development and Fast Refresh
  // re-evaluates this module, so guard both in the module and on the window.
  if (experienceStarted || window.__farisExperience) return;
  experienceStarted = true;
  window.__farisExperience = true;

  /* ------------------------------------------------------------------------
     Settings
     ------------------------------------------------------------------------ */
  var CONFIG = {
    // POST endpoint of a form backend (Formspree, Web3Forms, Basin, your own API
    // route...). When set, "Send Message" delivers in the background.
    formEndpoint: '',

    // Used while no endpoint is set: the form opens the visitor's email app with
    // the message written and addressed here. Kept in two parts so the address
    // is not sitting in the source for scrapers.
    email: ['faristpwork', 'gmail.com'],

    // Booking link for "Schedule a Call" (Cal.com, Calendly...). When empty the
    // button opens the Say Hello form with a call request already written.
    calendarUrl: '',

    // The dock shows the local time here.
    timeZone: 'Asia/Dubai',
    timeZoneLabel: 'GST',

    // Sound: a few quiet notes for presses, for dialogs, and as the dot becomes each room.
    // `sound` is whether it starts switched on; visitors can change that from the dock and their
    // choice is remembered. `volume` scales all of it (0.6 is fainter, 1.5 fuller).
    // `haptics` is the short vibration that marks the same moments on phones that can (Android).
    sound: true,
    volume: 1,
    haptics: true
  };

  /* ------------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------------ */
  window.__farisReady = true;

  var root = document.documentElement;
  var $ = function (sel, el) { return (el || document).querySelector(sel); };
  var $$ = function (sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); };

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  // gsap and ScrollTrigger are imported at the top of the module (they were window globals).
  var animated = !!(gsap && ScrollTrigger) && !reduced;

  if (gsap && ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
  }
  if (!animated) {
    root.classList.remove('motion', 'is-loading');
    root.classList.add('is-entered');
  }

  // The dot and its rooms. Mounted first: it decides whether chapter titles pin, which changes the layout.
  var rooms = (!reduced && FarisRooms) ? FarisRooms.mount($('[data-rooms]')) : null;

  root.classList.add('ready');

  // Idle queue: each task is small; a slice runs a few and yields.
  var queue = [];
  function later(fn) { queue.push(fn); }
  function drain() {
    var started = performance.now();
    while (queue.length && performance.now() - started < 10) queue.shift()();
    if (queue.length) pump();
  }
  function pump() {
    if ('requestIdleCallback' in window) window.requestIdleCallback(drain, { timeout: 400 });
    else setTimeout(drain, 30);
  }

  /* Split an element's text into word (and optionally character) spans.
     Assistive tech keeps the untouched sentence; the pieces are presentational.
     Child elements are kept, after the text. */
  function split(el, opts) {
    opts = opts || {};
    var keep = [], text = '';
    Array.prototype.forEach.call(el.childNodes, function (n) {
      if (n.nodeType === 1) keep.push(n);
      else if (n.nodeType === 3) text += n.textContent;
    });
    text = text.replace(/\s+/g, ' ').trim();

    var sr = document.createElement('span');
    var vis = document.createElement('span');
    var words = [], chars = [], wraps = [];
    sr.className = 'sr-only';
    sr.textContent = text;
    vis.setAttribute('aria-hidden', 'true');

    text.split(' ').forEach(function (word, i, all) {
      var w = document.createElement('span');
      w.className = opts.wordClass || 'w';
      if (opts.chars) {
        Array.from(word).forEach(function (c) {
          var ch = document.createElement('span');
          ch.className = 'ch';
          ch.textContent = c;
          w.appendChild(ch);
          chars.push(ch);
        });
      } else if (opts.innerClass) {
        var inner = document.createElement('span');
        inner.className = opts.innerClass;
        inner.textContent = word;
        w.appendChild(inner);
        words.push(inner);
      } else {
        w.textContent = word;
        words.push(w);
      }
      wraps.push(w);
      vis.appendChild(w);
      if (i < all.length - 1) vis.appendChild(document.createTextNode(' '));
    });

    el.textContent = '';
    el.appendChild(sr);
    el.appendChild(vis);
    keep.forEach(function (k) { el.appendChild(k); });
    return { words: words, chars: chars, wraps: wraps };
  }

  /* Letters set in separate boxes lose their kerning ("Fa" drifts apart).
     Measure the word as the font would set it and nudge each letter back. */
  function restoreKerning(wordEl) {
    var chars = $$(':scope > .ch', wordEl);
    if (chars.length < 2) return;
    chars.forEach(function (c) { c.style.marginLeft = ''; });

    var probe = document.createElement('span');
    probe.textContent = chars.map(function (c) { return c.firstChild ? c.firstChild.textContent : ''; }).join('');
    probe.style.cssText = 'position:absolute;left:0;top:0;visibility:hidden;white-space:nowrap;pointer-events:none';
    wordEl.appendChild(probe);

    var range = document.createRange();
    var node = probe.firstChild;
    var offset = 0;
    var natural = chars.map(function (c) {
      var len = c.firstChild ? c.firstChild.textContent.length : 0;
      range.setStart(node, offset);
      offset += len;
      range.setEnd(node, offset);
      return range.getBoundingClientRect().left;
    });
    var actual = chars.map(function (c) { return c.getBoundingClientRect().left; });
    var size = parseFloat(getComputedStyle(wordEl).fontSize) || 16;
    probe.remove();

    var applied = 0;
    chars.forEach(function (c, i) {
      if (!i) return;
      var delta = (natural[i] - natural[0]) - (actual[i] - actual[0]) - applied;
      if (Math.abs(delta) > 0.02) {
        c.style.marginLeft = (delta / size).toFixed(4) + 'em';
        applied += delta;
      }
    });
  }

  function fontsReady(maxWait) {
    var fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    return Promise.race([fonts, new Promise(function (r) { setTimeout(r, maxWait); })]);
  }

  function onScreen(el) {
    var r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight && r.width > 0;
  }

  /* Run `fn` the first time any of `els` comes into view, passing the ones that did.
     One-off reveals use this rather than stored scroll positions, so content can never
     stay hidden because the page changed height (archive opening, fonts, a resize). */
  function whenVisible(els, fn, margin) {
    els = [].concat(els);
    if (!('IntersectionObserver' in window)) { fn(els); return; }
    var io = new IntersectionObserver(function (entries) {
      var seen = entries.filter(function (e) { return e.isIntersecting; }).map(function (e) { return e.target; });
      if (!seen.length) return;
      seen.forEach(function (el) { io.unobserve(el); });
      fn(seen);
    }, { rootMargin: margin || '0px 0px -10% 0px', threshold: 0.01 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------------
     Feel — a few quiet sounds, and a tick under the thumb

     Nothing is loaded: the sounds are sine notes drawn with the Web Audio API, all in D major,
     each a few hundredths of full volume. One cue per gesture, and nothing on hover.

       tap     something was pressed
       open    a dialog or the archive opens (close: the same two notes, falling)
       land    the dot comes to rest in its ring
       room    the dot has become the next room. Each room has its chord, I – vi – IV – V down
               the page, so the last room is left hanging...
       done    ...until the form is sent, which brings it home
       error   the form needs another look

     On phones whose browser can vibrate (Android; Safari on iPhone cannot), the same moments
     are a few milliseconds of that. Browsers allow neither before the visitor's first click,
     tap or key press. The sound can be switched off from the dock.

     feel(name)        play a cue
     feel.after(name)  play it unless something else has just sounded (for what follows a press)
     ------------------------------------------------------------------------ */
  var feel = (function () {
    var AC = window.AudioContext || window.webkitAudioContext;
    var toggle = $('[data-sound-toggle]');
    var bars = toggle ? $$('.dock__bars i', toggle) : [];
    var volume = typeof CONFIG.volume === 'number' ? Math.max(0, Math.min(2, CONFIG.volume)) : 1;
    var canBuzz = !!CONFIG.haptics && !reduced && typeof navigator.vibrate === 'function';
    var soundOn = !!CONFIG.sound;
    try {
      var saved = localStorage.getItem('faris:sound');
      if (saved === '0' || saved === '1') soundOn = saved === '1';
    } catch (e) {}
    if (!AC) soundOn = false;

    var ctx = null, out = null;
    var pressed = false;       // the visitor has clicked, tapped or pressed a key
    var finger = false;        // the last thing they pressed with was a finger
    var lastCue = -1e4, sleepTimer = 0;
    var noop = function () {};

    function allowed() {
      var ua = navigator.userActivation;
      return ua ? ua.hasBeenActive : pressed;
    }

    // One note: a sine that comes in softly and falls away evenly. `to` bends its pitch as it goes.
    function note(t, freq, peak, attack, decay, to) {
      var osc = ctx.createOscillator(), amp = ctx.createGain();
      osc.frequency.setValueAtTime(freq, t);
      if (to) osc.frequency.exponentialRampToValueAtTime(to, t + attack + decay * 0.5);
      amp.gain.setValueAtTime(0, t);
      amp.gain.linearRampToValueAtTime(peak, t + attack);
      amp.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
      osc.connect(amp);
      amp.connect(out);
      osc.onended = function () { amp.disconnect(); };
      osc.start(t);
      osc.stop(t + attack + decay + 0.05);
    }

    var D4 = 293.66, E4 = 329.63, A4 = 440, B4 = 493.88, Cs5 = 554.37, D5 = 587.33, Fs5 = 739.99, G5 = 783.99, A5 = 880;
    // one voice moves at a time from room to room, until the last, where all three step up
    var CHORDS = [null, [D4, A4, Fs5], [D4, B4, Fs5], [D4, B4, G5], [E4, Cs5, A5]];
    var SOUNDS = {
      tap: function (t) { note(t, 600, 0.09, 0.003, 0.085, 400); },
      open: function (t) { note(t, D5, 0.05, 0.008, 0.24); note(t + 0.075, A5, 0.04, 0.008, 0.36); },
      close: function (t) { note(t, A5, 0.035, 0.008, 0.2); note(t + 0.075, D5, 0.045, 0.008, 0.28); },
      land: function (t) { note(t, A5, 0.04, 0.005, 0.6); },
      room: function (t, n) {
        (CHORDS[n] || CHORDS[1]).forEach(function (f, i) { note(t + i * 0.035, f, 0.045 - i * 0.008, 0.09, 1.8); });
      },
      done: function (t) {
        note(t, D4, 0.03, 0.02, 1.4);
        [D5, Fs5, A5].forEach(function (f, i) { note(t + i * 0.11, f, 0.05 - i * 0.005, 0.008, 0.9 + i * 0.25); });
      },
      error: function (t) { note(t, 330, 0.07, 0.004, 0.12, 262); note(t + 0.13, 330, 0.07, 0.004, 0.17, 247); }
    };
    var BUZZ = { tap: 10, open: 14, close: 10, room: 16, done: [14, 90, 22], error: [22, 70, 22] };

    // The audio engine is put to sleep after a while without sound, and behind another tab.
    function rest() {
      clearTimeout(sleepTimer);
      if (ctx && ctx.state === 'running') { var p = ctx.suspend(); if (p && p.catch) p.catch(noop); }
    }
    function wake(then) {
      clearTimeout(sleepTimer);
      sleepTimer = setTimeout(rest, 30000);
      if (ctx.state === 'running') { if (then) then(); return; }
      var p = ctx.resume();
      if (p && p.then) p.then(then || noop, noop);
    }

    function play(name, arg) {
      if (!soundOn || !SOUNDS[name] || !allowed()) return;
      if (!ctx) {
        try { ctx = new AC(); } catch (e) { soundOn = false; paint(); return; }
        out = ctx.createGain();
        out.gain.value = volume;
        out.connect(ctx.destination);
      }
      var asked = performance.now();
      wake(function () {
        if (performance.now() - asked > 500) return;     // woken too late for it to mean anything
        SOUNDS[name](ctx.currentTime + 0.01, arg);
        dance(name === 'room' || name === 'done');
      });
    }

    function buzz(name) {
      if (!canBuzz || !finger || !BUZZ[name] || !allowed()) return;
      try { navigator.vibrate(BUZZ[name]); } catch (e) {}
    }

    function cue(name, arg) {
      lastCue = performance.now();
      buzz(name);
      play(name, arg);
    }
    cue.after = function (name) { if (performance.now() - lastCue > 400) cue(name); };

    // The dock's bars stand while sound is on, lie flat while it is off, and move when something sounds.
    function paint() { if (toggle) toggle.setAttribute('aria-pressed', String(soundOn)); }
    function dance(long) {
      if (reduced || !bars.length || !bars[0].animate) return;
      bars.forEach(function (bar, i) {
        bar.animate([
          { transform: 'scaleY(' + [1, 0.4, 0.9, 0.55][i % 4] + ')', offset: 0.3 },
          { transform: 'scaleY(' + [0.3, 0.95, 0.35, 1][i % 4] + ')', offset: 0.65 }
        ], { duration: 620, iterations: long ? 2 : 1, delay: i * 40, easing: 'ease-in-out' });
      });
    }

    if (toggle && AC) {
      paint();
      toggle.hidden = false;
      toggle.addEventListener('click', function () {
        soundOn = !soundOn;
        try { localStorage.setItem('faris:sound', soundOn ? '1' : '0'); } catch (e) {}
        paint();
        if (soundOn) cue('open'); else { buzz('tap'); rest(); }
      });
    }

    // Every press of a link or button gets one cue; which one depends on what the press does.
    document.addEventListener('click', function (e) {
      pressed = true;
      var el = e.target.closest ? e.target.closest('a[href], button, summary, [role="button"]') : null;
      if (!el || el === toggle || el.type === 'submit') return;     // those two answer for themselves
      if (el.matches('[data-open-case], [data-open-hello], [data-open-menu], [data-schedule]')) cue('open');
      else if (el.matches('[data-case-close], [data-close-hello], [data-close-menu]')) cue('close');
      else if (el.hasAttribute('data-archive-toggle')) cue(el.getAttribute('aria-expanded') === 'true' ? 'open' : 'close');
      else cue('tap');
    });
    window.addEventListener('pointerdown', function (e) {
      finger = e.pointerType === 'touch';
      if (ctx && soundOn) wake();                    // so it is awake by the time the press lands
    }, { capture: true, passive: true });
    window.addEventListener('keydown', function () { pressed = true; finger = false; }, { capture: true, passive: true });
    document.addEventListener('visibilitychange', function () { if (document.hidden) rest(); });

    return cue;
  })();

  /* The scroll's own moments (rooms.js says when). They are for someone watching them happen, so
     each is only marked if, a moment later, the page is still there and no longer flying: a link
     that passes through three rooms sounds the one it stops in, and a hard fling none. */
  if (rooms) {
    (function () {
      var seenY = window.scrollY, seenAt = -1e4, speed = 0;      // px per ms, as of the last scroll event
      window.addEventListener('scroll', function () {
        var y = window.scrollY, t = performance.now();
        speed = Math.abs(y - seenY) / Math.max(8, Math.min(50, t - seenAt));
        seenY = y; seenAt = t;
      }, { passive: true });
      function calm() { return performance.now() - seenAt > 120 || speed < window.innerHeight * 0.0045; }

      var scene = $('[data-scene]');
      var landTimer = 0, landedAt = -1e4, roomTimer = 0;
      rooms.onLand = function () {
        clearTimeout(landTimer);
        landTimer = setTimeout(function () {
          var now = performance.now();
          if (now - landedAt < 1500 || !calm() || !root.classList.contains('dot-landed')) return;
          if (!scene || scene.getBoundingClientRect().bottom < window.innerHeight - 2) return;     // scrolled past it
          landedAt = now;
          feel('land');
        }, 140);
      };
      rooms.onRoom = function (n, before) {
        clearTimeout(roomTimer);
        if (n > before) roomTimer = setTimeout(function () { if (calm()) feel('room', n); }, 140);
      };
    })();
  }

  /* ------------------------------------------------------------------------
     Smooth scrolling (desktop pointers only; touch keeps its native momentum)
     ------------------------------------------------------------------------ */
  var lenis = null;
  if (animated && finePointer && Lenis) {
    lenis = new Lenis({ lerp: 0.11 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  // `target` is an element or a scroll position (both paths honour the scroll-padding set in CSS).
  // `glide` takes its time over it, for a link that is meant to be watched rather than jumped;
  // the visitor can take over at any moment.
  var glideTween = null;
  var GLIDE = 2.8;
  function stopGlide() { if (glideTween) { glideTween.kill(); glideTween = null; } }
  function scrollToTarget(target, immediate, glide) {
    stopGlide();
    glide = glide && animated && !immediate && typeof target === 'number';
    if (lenis) {
      lenis.scrollTo(target, glide
        ? { duration: GLIDE, easing: function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; } }
        : { immediate: !!immediate });
      return;
    }
    if (glide) {
      var pos = { y: window.scrollY };
      glideTween = gsap.to(pos, {
        y: target, duration: GLIDE, ease: 'power2.inOut',
        onUpdate: function () { window.scrollTo(0, pos.y); },
        onComplete: function () { glideTween = null; }
      });
      return;
    }
    var behavior = reduced || immediate ? 'auto' : 'smooth';
    if (typeof target === 'number') window.scrollTo({ top: target, behavior: behavior });
    else target.scrollIntoView({ behavior: behavior, block: 'start' });
  }
  ['wheel', 'touchstart', 'keydown'].forEach(function (type) {
    window.addEventListener(type, stopGlide, { passive: true });
  });

  // while a dialog is open the page behind it stays put
  function lockScroll(on) { if (lenis) { if (on) lenis.stop(); else lenis.start(); } }
  $$('dialog').forEach(function (d) {
    d.addEventListener('close', function () {
      if (!$('dialog[open]')) lockScroll(false);
      feel.after('close');                           // closed with Escape, or by a click outside it
    });
  });
  function showModal(dlg) { lockScroll(true); dlg.showModal(); }

  /* ------------------------------------------------------------------------
     Title card, and the opening
     ------------------------------------------------------------------------ */
  var loaderEl = $('[data-loader]');
  var loading = animated && root.classList.contains('is-loading') && !!loaderEl;

  function enterPage() {
    try { sessionStorage.setItem('faris:seen', '1'); } catch (e) {}
    root.classList.remove('is-loading');
    root.classList.add('is-entered');
    if (lenis) lenis.start();
  }

  if (loading) {
    var countEl = $('[data-loader-count]');
    var progress = { v: 0 };
    var shown = '';
    var paintProgress = function () {
      var n = String(Math.round(progress.v));
      if (n !== shown) { shown = n; countEl.textContent = n; }
      if (rooms) { rooms.state.progress = progress.v / 100; rooms.kick(4); }
    };
    if (rooms) { rooms.state.loader = 1; rooms.kick(8); }
    if (lenis) lenis.stop();
    window.scrollTo(0, 0);

    // The card is meant to be up for about a second, counted from when the page began to load:
    // on a slow connection that second has long passed by the time this runs, so it adds nothing
    // and only counts out quickly. It never holds the page for more than a few seconds.
    var age = performance.now();
    var late = age > 1600;
    var creep = gsap.to(progress, { v: 90, duration: late ? 0.45 : 1.7, ease: 'power2.out', onUpdate: paintProgress });
    var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

    Promise.race([Promise.all([fontsReady(late ? 500 : 2500), wait(Math.max(0, 1100 - age))]), wait(4000)]).then(function () {
      creep.kill();
      gsap.to(progress, {
        v: 100, duration: late ? 0.3 : 0.5, ease: 'power2.inOut', onUpdate: paintProgress,
        onComplete: function () {
          // the count drops away, the page assembles around the dot, and the dot flies to its place behind him
          var put = function () { loaderEl.classList.remove('is-leaving'); };
          loaderEl.classList.add('is-leaving');
          countEl.addEventListener('animationend', put, { once: true });
          setTimeout(put, 1500);
          enterPage();
          if (rooms) gsap.to(rooms.state, { loader: 0, duration: 1.6, ease: 'expo.inOut', onUpdate: function () { rooms.kick(4); } });
        }
      });
    });
  } else if (rooms && animated && performance.now() < 1500) {
    // no title card (a return visit): the dot grows into place as the page opens. If the scripts
    // arrived late the page has been standing for a while, and the dot is simply taken over as it is.
    gsap.fromTo(rooms.state, { intro: 0 }, { intro: 1, duration: 1.8, delay: 0.2, ease: 'expo.out', onUpdate: function () { rooms.kick(4); } });
  }

  /* ------------------------------------------------------------------------
     The opening scene — the title and 01 About, played by the scroll

     At rest: the name, him, and the dot on the i. Then, as the page scrolls and the scene is
     held on screen: the dot leaves the i for the ring behind his head, the name sinks away,
     he makes room, and the introduction is read in. If the title or the introduction would
     not fit the screen they are held on, nothing is held: the scene stays an ordinary title
     and section (the layout it has without this script), and only the reading-in is kept.
     ------------------------------------------------------------------------ */
  var sceneEl = $('[data-scene]');
  var sceneCtl = { el: sceneEl, pin: sceneEl ? $('.scene__pin', sceneEl) : null, live: false, aboutAt: 0 };

  (function () {
    if (!sceneEl || !sceneCtl.pin) return;
    var pin = sceneCtl.pin;
    var hero = $('.scene__hero', sceneEl);
    var name = $('.scene__name', sceneEl);
    var start = $('.scene__start', sceneEl);
    var intro = $('.scene__intro', sceneEl);
    var social = $('.scene__social', sceneEl);
    var caption = $('.scene__cap', sceneEl);
    var figure = $('.scene__figure', sceneEl);
    var shift = $('[data-figure-shift]', sceneEl);
    var about = $('.scene__about', sceneEl);
    var aboutIn = about && $('.about__in', about);
    var label = about && $('.sec__label', about);
    var statement = about && $('[data-scrub-words]', about);
    var lede = about && $('.about__lede', about);
    var chars = $$('.scene__word > .ch', sceneEl);
    if (!hero || !name || !figure || !shift || !aboutIn || !label || !statement || !lede) return;

    // the dot of the i sits over the middle of the i's stem, wherever the font in use puts that
    function placeDot() {
      var i = $('.scene__i', name);
      var size = parseFloat(getComputedStyle(name).fontSize);
      if (!i || !size) return;
      var box = name.getBoundingClientRect(), stem = i.getBoundingClientRect();
      name.style.setProperty('--ix', ((stem.left + stem.width / 2 - box.left) / size).toFixed(4));
      if (rooms) rooms.kick(6);
    }

    // pointing at the dot makes it swell
    if (rooms && animated && finePointer && start) {
      var hover = { v: 0 };
      var swell = function (to) {
        gsap.to(hover, { v: to, duration: 0.5, ease: 'power3.out', overwrite: true, onUpdate: function () { rooms.state.hover = hover.v; rooms.kick(3); } });
      };
      start.addEventListener('pointerenter', function () { swell(1); });
      start.addEventListener('pointerleave', function () { swell(0); });
    }

    if (!animated) { fontsReady(2500).then(placeDot); return; }

    var words = split(statement).words;
    var ctx = null;

    /* Can the scene be held? Lay it out as it would be, and see. Returns how to play it, or null.
       Everything here is read from the layout (offsets), never from where things are drawn: the
       title's opening animation may be running, and that moves what is drawn. */
    function measure() {
      root.classList.add('scene-live');
      about.classList.remove('is-swap');
      var wide = getComputedStyle(figure).position === 'absolute';
      var height = pin.offsetHeight;
      var fits = true, mode = 'stack';

      if (!wide) {
        // the title, down to its last line, above the dock
        var last = social && social.offsetParent ? social : intro;
        var floor = hero.clientHeight - parseFloat(getComputedStyle(hero).paddingBottom);
        if (last.offsetTop + last.offsetHeight > floor + 1) fits = false;
      }
      if (fits) {
        // The introduction: beside him on a wide screen, under him on a narrow one. There he is
        // owed a good part of the screen; if statement and detail together would leave him less,
        // they take turns instead, and if even one of them leaves him almost nothing, it is no scene.
        var under = height - (caption.offsetTop + caption.offsetHeight);
        var room = wide ? height : under - Math.max(240, height * 0.36);
        if (aboutIn.offsetHeight > room) {
          about.classList.add('is-swap');
          mode = 'swap';
          if (aboutIn.offsetHeight > (wide ? height : under - 170)) fits = false;
        }
      }
      if (!fits) {
        root.classList.remove('scene-live');
        about.classList.remove('is-swap');
        return null;
      }
      return { wide: wide, mode: mode };
    }

    function play(fit) {
      // On a narrow screen he moves up under the captions and fills what is left above the words.
      // (The ring rises a little above his head; it is the ring that must clear the captions.)
      var dy = 0, scale = 1;
      if (!fit.wide) {
        var box = figure.getBoundingClientRect();
        var halo = $('.scene__halo', figure);
        var over = halo ? Math.max(0, box.top - halo.getBoundingClientRect().top) : 0;
        var top = caption.getBoundingClientRect().bottom + 8;
        var bottom = label.getBoundingClientRect().top - 16;
        scale = Math.min(1.9, Math.max(0.6, (bottom - top) / (box.height + over)));
        dy = top + over * scale - box.top;
      }
      sceneCtl.aboutAt = fit.mode === 'swap' ? 0.64 : 0.86;

      // Positions and durations are fractions of the scene's scroll. Things that also have an
      // opening animation in CSS are given their starting values outright (and are not touched
      // until the scroll reaches them), so a half-finished opening can never be mistaken for rest.
      var tl = gsap.timeline({
        defaults: { ease: 'none' },
        onUpdate: function () { rooms.kick(3); },
        scrollTrigger: { trigger: sceneEl, start: 'top top', end: 'bottom bottom', scrub: 0.6 }
      });

      // the dot leaves the i for the ring behind his head (rooms.js draws the flight)
      tl.fromTo(rooms.state, { scene: 0 }, { scene: 1, duration: 0.17 }, 0);
      // the title clears: the invitation, the words, then the name, letter by letter
      if (start) tl.fromTo(start, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.025, immediateRender: false }, 0.004);
      tl.fromTo([intro, social], { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -18, duration: 0.07, ease: 'power1.in', immediateRender: false }, 0.008);
      tl.fromTo(chars, { yPercent: 0, y: 0 }, { yPercent: 118, y: 0, duration: 0.085, ease: 'power2.in', stagger: 0.011, immediateRender: false }, 0.035);
      if (!fit.wide) tl.fromTo(shift, { y: 0, scale: 1 }, { y: dy, scale: scale, duration: 0.15, ease: 'power2.inOut', immediateRender: false }, 0.03);

      // 01 About is read in. Unread words stay above 3:1 contrast (0.48 of ink on mist is 3.4:1),
      // so the sentence is legible throughout.
      tl.fromTo(about, { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.14);
      tl.set(about, { pointerEvents: 'auto' }, 0.14);
      tl.fromTo(label, { y: 14 }, { y: 0, duration: 0.05, ease: 'power2.out' }, 0.14);
      tl.fromTo(words, { opacity: 0.48 }, { opacity: 1, duration: 0.05, stagger: 0.4 / words.length }, 0.19);
      if (fit.mode === 'swap') {
        tl.to(statement, { opacity: 0, y: -24, duration: 0.07, ease: 'power1.in' }, 0.67);
        tl.fromTo(lede, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.09, ease: 'power2.out' }, 0.73);
      } else {
        tl.fromTo(lede, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 0.68);
      }
      tl.to({}, { duration: 0.01 }, 0.99);   // the last stretch is simply held
    }

    function flow() {
      var tl = gsap.timeline({ scrollTrigger: { trigger: statement, start: 'top 80%', end: 'bottom 45%', scrub: 0.5 } });
      tl.fromTo(words, { opacity: 0.48 }, { opacity: 1, ease: 'none', stagger: 0.14, duration: 0.5 }, 0);
    }

    function build() {
      if (ctx) ctx.revert();
      if (rooms) rooms.state.scene = null;
      var fit = rooms ? measure() : null;
      sceneCtl.live = !!fit;
      ctx = gsap.context(function () { if (fit) play(fit); else flow(); });
      if (rooms) rooms.kick(8);
    }

    // Built at once, so the page has its final height before anything is scrolled; and again
    // when the typeface arrives, since the text then has its real measure.
    var typeset = !document.fonts || document.fonts.status === 'loaded';
    build();
    fontsReady(2500).then(function () { placeDot(); if (!typeset) build(); });

    var seenW = window.innerWidth, seenH = window.innerHeight, resizeTimer = 0;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        var w = window.innerWidth, h = window.innerHeight;
        // a phone's toolbars sliding away change the height a little, and nothing else
        if (w === seenW && Math.abs(h - seenH) < 130) return;
        seenW = w; seenH = h;
        build();
        ScrollTrigger.refresh();
      }, 180);
    });
  })();

  /* ------------------------------------------------------------------------
     The dock — in-page links, current chapter, local time, the index on small screens
     ------------------------------------------------------------------------ */
  var menu = $('#menu');

  /* A chapter opens with a pinned title while the dot floods the screen. Arriving by link, land
     where that has finished: the room in its colour, the title set. 01 About is part of the
     opening scene, and is arrived at where its statement has been read. */
  function arrival(target) {
    if (sceneCtl.live && target.id === 'about') {
      var box = sceneEl.getBoundingClientRect();
      return Math.round(box.top + window.scrollY + (box.height - sceneCtl.pin.offsetHeight) * sceneCtl.aboutAt);
    }
    var card = rooms && target.firstElementChild;
    if (!card || !card.hasAttribute('data-flood')) return target;
    var rect = card.getBoundingClientRect();
    var run = rect.height - window.innerHeight;
    return run > 8 ? Math.round(rect.top + window.scrollY + run * 0.9) : target;
  }

  function goTo(id, push, immediate, glide) {
    var target = id === 'top' ? document.body : document.getElementById(id);
    if (!target) return;
    scrollToTarget(id === 'top' ? 0 : arrival(target), immediate, glide);
    if (push && history.pushState) history.pushState(null, '', id === 'top' ? location.pathname + location.search : '#' + id);
    if (id !== 'top') {
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!link || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var id = link.getAttribute('href').slice(1);
    if (!id || (id !== 'top' && !document.getElementById(id))) return;
    e.preventDefault();
    if (menu && menu.open) menu.close();
    goTo(id, true, false, link.hasAttribute('data-glide'));
  });

  if (rooms) {
    /* A link straight into a chapter (opened from outside, or a hash typed into the address bar):
       the browser jumps to the chapter's first line, where its room has not arrived yet. If that
       is where the page is standing, move on to where it has. A position the browser restored
       itself (back, forward, reload) is somewhere else, and is left alone. */
    var intoChapter = function () {
      var el = null;
      try { el = location.hash.length > 1 && document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch (e) {}
      if (!el) return;
      var want = arrival(el);
      if (typeof want !== 'number') return;
      if (el.id === 'about') {
        // laid over the title, it is nowhere for the browser to jump to: go, unless the page is already past it
        if (window.scrollY < want - window.innerHeight * 0.5) scrollToTarget(want, true);
        return;
      }
      var top = el.getBoundingClientRect().top;
      if (top > -6 && top < 40) scrollToTarget(want, true);
    };
    window.addEventListener('hashchange', function () { requestAnimationFrame(intoChapter); });
    if (location.hash.length > 1) {
      // the browser makes its jump once loading is done, so follow it, and check once more
      var afterLoad = function () { setTimeout(intoChapter, 90); setTimeout(intoChapter, 450); };
      if (document.readyState === 'complete') afterLoad();
      else window.addEventListener('load', afterLoad, { once: true });
    }

    // keyboard focus arriving inside a chapter title that has not opened yet: open it
    $$('[data-flood]').forEach(function (card) {
      card.addEventListener('focusin', function (e) {
        if (!e.target.matches || !e.target.matches(':focus-visible')) return;
        var rect = card.getBoundingClientRect();
        var run = rect.height - window.innerHeight;
        if (run > 8 && -rect.top < run * 0.8) scrollToTarget(Math.round(rect.top + window.scrollY + run * 0.9), true);
      });
    });
  }

  if (menu) {
    var openMenu = $('[data-open-menu]');
    var closeMenu = $('[data-close-menu]');
    if (openMenu) openMenu.addEventListener('click', function () { showModal(menu); });
    if (closeMenu) closeMenu.addEventListener('click', function () { menu.close(); });
    window.matchMedia('(min-width: 860px)').addEventListener('change', function (e) {
      if (e.matches && menu.open) menu.close();
    });
  }

  var clock = $('[data-clock]');
  if (clock && window.Intl) {
    var fmt;
    try { fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: CONFIG.timeZone }); } catch (e) { fmt = null; }
    var tick = function () { if (fmt) clock.textContent = fmt.format(new Date()) + ' ' + CONFIG.timeZoneLabel; };
    tick();
    setInterval(tick, 20000);
  }

  // Which chapter is on screen: lights its number in the dock
  later(function () {
    if (!('IntersectionObserver' in window)) return;
    var links = $$('.dock__index a');
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var marker = $('[data-spy-for]');
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var el = entry.target;
        var id = el.getAttribute('data-spy-for') || el.id;
        // While the opening scene is held, 01 About is on screen from the start: its stretch of
        // the scroll is marked by a separate element, which is the one to go by then.
        if (id === 'about' && (el === marker) !== sceneCtl.live) return;
        var link = byId[id];
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (a) { a.removeAttribute('aria-current'); });
          link.setAttribute('aria-current', 'true');
        } else if (link.getAttribute('aria-current')) {
          link.removeAttribute('aria-current');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main [data-chapter]').forEach(function (s) { spy.observe(s); });
    if (marker) spy.observe(marker);
  });

  // How far down the page: the hairline along the foot of the dock
  var progressEl = $('[data-progress]');
  if (progressEl) {
    var progressTick = false;
    var paintPageProgress = function () {
      progressTick = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      progressEl.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    };
    window.addEventListener('scroll', function () {
      if (progressTick) return;
      progressTick = true;
      requestAnimationFrame(paintPageProgress);
    }, { passive: true });
    paintPageProgress();
  }

  // The browser's own chrome takes the colour of the room at the top of the screen
  if (rooms) {
    var theme = $('meta[name="theme-color"]');
    var roomColours = ['#e3e7ec', '#1637e8', '#0b0d11', '#f3f5f7', '#1637e8'];
    var lastRoom = -1, themeTick = false;
    window.addEventListener('scroll', function () {
      if (themeTick || !theme) return;
      themeTick = true;
      requestAnimationFrame(function () {
        themeTick = false;
        var r = rooms.roomAt(window.innerWidth / 2, 4);
        if (r !== lastRoom) { lastRoom = r; theme.setAttribute('content', roomColours[r] || roomColours[0]); }
      });
    }, { passive: true });
  }

  /* ------------------------------------------------------------------------
     Pointer: a label that rides along over things that open, and buttons that lean in
     ------------------------------------------------------------------------ */
  if (animated && finePointer) {
    later(function () {
      var cursor = $('[data-cursor-el]');
      var cursorText = $('[data-cursor-text]');
      if (!cursor || !cursorText) return;
      var cx = gsap.quickTo(cursor, 'x', { duration: 0.45, ease: 'power3.out' });
      var cy = gsap.quickTo(cursor, 'y', { duration: 0.45, ease: 'power3.out' });
      window.addEventListener('pointermove', function (e) { cx(e.clientX); cy(e.clientY); }, { passive: true });
      document.addEventListener('pointerover', function (e) {
        var host = e.target.closest ? e.target.closest('[data-cursor]') : null;
        if (host) cursorText.textContent = host.getAttribute('data-cursor');
        cursor.classList.toggle('is-on', !!host);
      });
      document.addEventListener('pointerleave', function () { cursor.classList.remove('is-on'); });
    });

    later(function () {
      $$('[data-magnetic]').forEach(function (el) {
        var mx = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
        var my = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
        el.addEventListener('pointermove', function (e) {
          var r = el.getBoundingClientRect();
          mx((e.clientX - (r.left + r.width / 2)) * 0.26);
          my((e.clientY - (r.top + r.height / 2)) * 0.38);
        });
        el.addEventListener('pointerleave', function () {
          gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.45)', overwrite: true });
        });
      });
    });

    // The figure drifts a little against the pointer, the opposite way to the dot. The element
    // moved here has no positioning of its own in CSS: GSAP folds an element's `translate` into
    // the transform it writes, and a `translate` made with calc() does not survive that.
    later(function () {
      var lean = $('[data-figure-lean]');
      if (!lean || !sceneEl) return;
      var fx = gsap.quickTo(lean, 'x', { duration: 1.2, ease: 'power3.out' });
      window.addEventListener('pointermove', function (e) {
        if (e.pointerType === 'touch' || window.scrollY > sceneEl.offsetTop + sceneEl.offsetHeight) return;
        fx((e.clientX / window.innerWidth - 0.5) * -14);
      }, { passive: true });
    });
  }

  /* ------------------------------------------------------------------------
     03 Projects — case studies: the card's image grows into the dialog and back
     ------------------------------------------------------------------------ */
  var cases = {};
  $$('[data-case-dialog]').forEach(function (d) { cases[d.getAttribute('data-case-dialog')] = d; });
  var canMorph = !reduced && typeof document.startViewTransition === 'function';
  var lastOpener = null;

  function cardOf(id) { return $('.pcard[data-case="' + id + '"]'); }

  function morph(fromImg, toImg, dialogs, update) {
    dialogs.forEach(function (d) { d.classList.add('is-morphing'); });
    if (fromImg) fromImg.style.viewTransitionName = 'case-media';
    var vt = document.startViewTransition(function () {
      if (fromImg) fromImg.style.viewTransitionName = '';
      if (toImg) toImg.style.viewTransitionName = 'case-media';
      update();
    });
    // a transition the browser decides to skip (a resize mid-way, say) still applies the update
    if (vt.ready) vt.ready.catch(function () {});
    vt.finished.catch(function () {}).then(function () {
      if (toImg) toImg.style.viewTransitionName = '';
      dialogs.forEach(function (d) { d.classList.remove('is-morphing'); });
    });
  }

  function openCase(id) {
    var dlg = cases[id];
    if (!dlg || dlg.open) return;
    var card = cardOf(id);
    var cardImg = card && $('.pcard__img', card);
    var panel = $('.case__panel', dlg);
    var show = function () { showModal(dlg); if (panel) panel.scrollTop = 0; };
    if (canMorph && cardImg && onScreen(cardImg)) morph(cardImg, $('.case__img', dlg), [dlg], show);
    else show();
  }

  function closeCase(dlg) {
    if (!dlg || !dlg.open) return;
    var card = cardOf(dlg.getAttribute('data-case-dialog'));
    var cardImg = card && $('.pcard__img', card);
    var panel = $('.case__panel', dlg);
    var hide = function () {
      dlg.close();
      var back = lastOpener && card && card.contains(lastOpener) ? lastOpener : (card && $('[data-open-case]', card));
      if (back) back.focus({ preventScroll: true });
    };
    if (canMorph && cardImg && onScreen(cardImg) && (!panel || panel.scrollTop < 60)) morph($('.case__img', dlg), cardImg, [dlg], hide);
    else hide();
  }

  function swapCase(from, toId) {
    var to = cases[toId];
    if (!to || to === from) return;
    var panel = $('.case__panel', to);
    var swap = function () { from.close(); showModal(to); if (panel) panel.scrollTop = 0; };
    if (canMorph) morph(null, null, [from, to], swap);
    else swap();
  }

  // The dialog's image is lazy, so it is not fetched with the page; start it as its card comes
  // near, and it is ready for the morph by the time anyone opens the case.
  whenVisible($$('.pcard[data-case]'), function (seen) {
    seen.forEach(function (card) {
      var dlg = cases[card.getAttribute('data-case')];
      var img = dlg && $('.case__img', dlg);
      if (img) img.loading = 'eager';
    });
  }, '400px 0px 400px 0px');

  $$('[data-open-case]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('[data-case]');
      lastOpener = btn;
      if (card) openCase(card.getAttribute('data-case'));
    });
  });
  Object.keys(cases).forEach(function (id) {
    var dlg = cases[id];
    dlg.addEventListener('cancel', function (e) { e.preventDefault(); closeCase(dlg); });
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg || e.target.closest('[data-case-close]')) { closeCase(dlg); return; }
      var next = e.target.closest('[data-case-next]');
      if (next) swapCase(dlg, next.getAttribute('data-case-next'));
    });
  });

  // Archive: folds open under the cards; search filters the rows
  var archive = $('[data-archive]');
  var archiveToggle = $('[data-archive-toggle]');
  if (archive && archiveToggle) {
    var archiveLabel = $('[data-archive-toggle-label]');
    var search = $('[data-archive-search]', archive);
    var rows = $$('[data-archive-rows] tr', archive);
    var empty = $('[data-archive-empty]', archive);
    var query = $('[data-archive-query]', archive);

    var setArchive = function (open) {
      archive.classList.toggle('is-open', open);
      archive.inert = !open;
      archiveToggle.setAttribute('aria-expanded', String(open));
      if (archiveLabel) archiveLabel.textContent = open ? 'Hide Project Archive' : 'View Full Project Archive';
      if (open) setTimeout(function () { scrollToTarget(archiveToggle); }, 80);
    };
    setArchive(false);
    archiveToggle.addEventListener('click', function () { setArchive(!archive.classList.contains('is-open')); });

    if (search) {
      search.addEventListener('input', function () {
        var q = search.value.trim().toLowerCase();
        var shown = 0;
        rows.forEach(function (row) {
          var hit = !q || row.textContent.toLowerCase().indexOf(q) !== -1;
          row.hidden = !hit;
          if (hit) shown++;
        });
        if (query) query.textContent = search.value.trim();
        if (empty) empty.hidden = shown > 0;
      });
    }
  }

  // Film: loads only when it is about to be seen, and never against the visitor's wishes
  var film = $('[data-film]');
  if (film) {
    var video = $('video', film);
    var filmToggle = $('[data-film-toggle]', film);
    var filmLabel = $('[data-film-toggle-label]', film);
    var filmIcon = filmToggle ? $('use', filmToggle) : null;
    var saveData = !!(navigator.connection && navigator.connection.saveData);
    var filmLoaded = false, userPaused = reduced || saveData;

    var playFilm = function () {
      if (!filmLoaded) {
        filmLoaded = true;
        $$('source', video).forEach(function (s) { s.src = s.getAttribute('data-src'); });
        video.load();
      }
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
    };
    var syncFilm = function () {
      var playing = !video.paused;
      if (filmIcon) filmIcon.setAttribute('href', playing ? '#i-pause' : '#i-play');
      if (filmLabel) filmLabel.textContent = playing ? 'Pause film' : 'Play film';
    };

    video.addEventListener('play', syncFilm);
    video.addEventListener('pause', syncFilm);
    if (filmToggle) {
      filmToggle.hidden = false;
      filmToggle.addEventListener('click', function () {
        if (video.paused) { userPaused = false; playFilm(); }
        else { userPaused = true; video.pause(); }
      });
    }
    syncFilm();

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !userPaused) playFilm();
        else if (!video.paused) video.pause();
      }, { threshold: 0.2 }).observe(film);
    }
  }

  /* ------------------------------------------------------------------------
     06 Contact — toast, Say Hello form, Schedule a Call
     ------------------------------------------------------------------------ */
  var toastEl = $('[data-toast]');
  var toastTimer = 0;
  function toast(title, text) {
    if (!toastEl) return;
    clearTimeout(toastTimer);
    toastEl.hidden = false;
    requestAnimationFrame(function () {
      $('[data-toast-title]', toastEl).textContent = title;
      $('[data-toast-text]', toastEl).textContent = text;
      toastEl.classList.add('is-on');
    });
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('is-on');
      toastTimer = setTimeout(function () { toastEl.hidden = true; }, 700);
    }, 6500);
  }

  var hello = $('#hello');
  var form = $('[data-hello-form]');
  if (hello && form) {
    var statusEl = $('[data-hello-status]', form);
    var sendLabel = $('[data-hello-send]', form);
    var sendBtn = $('.hello__send', form);
    var fields = ['name', 'email', 'message'].map(function (n) { return form.elements[n]; });
    var rules = {
      name: function (v) { return v.trim().length >= 2 || 'Name must be at least 2 characters.'; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Please enter a valid email address.'; },
      message: function (v) { return v.trim().length >= 10 || 'Message must be at least 10 characters.'; }
    };

    var check = function (input) {
      var result = rules[input.name](input.value);
      var ok = result === true;
      var err = document.getElementById(input.getAttribute('aria-describedby'));
      if (ok) input.removeAttribute('aria-invalid'); else input.setAttribute('aria-invalid', 'true');
      if (err) err.textContent = ok ? '' : result;
      return ok;
    };
    var clear = function () {
      form.reset();
      fields.forEach(function (f) {
        f.removeAttribute('aria-invalid');
        var err = document.getElementById(f.getAttribute('aria-describedby'));
        if (err) err.textContent = '';
      });
      if (statusEl) statusEl.textContent = '';
    };
    var openHello = function (prefill) {
      if (hello.open) return;
      if (menu && menu.open) menu.close();
      if (prefill && !form.elements.message.value) form.elements.message.value = prefill;
      showModal(hello);
      if (finePointer) form.elements.name.focus();
    };
    var sending = function (on) {
      sendBtn.disabled = on;
      sendLabel.textContent = on ? 'Sending...' : 'Send Message';
    };

    $$('[data-open-hello]').forEach(function (b) { b.addEventListener('click', function () { openHello(); }); });
    $$('[data-close-hello]').forEach(function (b) { b.addEventListener('click', function () { hello.close(); }); });
    hello.addEventListener('click', function (e) { if (e.target === hello) hello.close(); });

    $$('[data-schedule]').forEach(function (b) {
      b.addEventListener('click', function () {
        if (CONFIG.calendarUrl) window.open(CONFIG.calendarUrl, '_blank', 'noopener');
        else openHello("Hi Faris, I'd like to schedule a call. A few times that work for me: ");
      });
    });

    fields.forEach(function (f) {
      f.addEventListener('input', function () { if (f.hasAttribute('aria-invalid')) check(f); });
      f.addEventListener('blur', function () { if (f.value) check(f); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (statusEl) statusEl.textContent = '';
      var invalid = fields.filter(function (f) { return !check(f); });
      if (invalid.length) { feel('error'); invalid[0].focus(); return; }
      if (form.elements.company && form.elements.company.value) { hello.close(); clear(); return; } // bots only

      var data = {
        name: form.elements.name.value.trim(),
        email: form.elements.email.value.trim(),
        message: form.elements.message.value.trim()
      };

      if (CONFIG.formEndpoint) {
        sending(true);
        fetch(CONFIG.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data)
        }).then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          feel('done');
          hello.close();
          clear();
          toast('Message Sent!', "Thanks for reaching out. I'll get back to you soon.");
        }).catch(function () {
          feel('error');
          if (statusEl) statusEl.textContent = "Your message didn't go through. Check your connection and send it again.";
        }).then(function () { sending(false); });
        return;
      }

      var to = CONFIG.email.join('@');
      var subject = 'Hello from ' + data.name;
      var body = data.message + '\n\n' + data.name + '\n' + data.email;
      feel('done');
      window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      hello.close();
      clear();
      toast('Your email app is opening', 'The message is written and addressed. Press send there to deliver it.');
    });
  }

  var year = $('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ========================================================================
     Idle — scroll-linked motion below the fold
     ======================================================================== */
  if (animated) {

    // Chapter titles: while the dot floods the screen behind them, the words rise into the new room
    $$('[data-flood]').forEach(function (card) {
      later(function () {
        if (!rooms) return;
        var title = $('[data-tcard-title]', card);
        var label = $('.sec__label', card);
        var rest = $('[data-tcard-rest]', card);
        if (!title) return;
        var parts = split(title, { wordClass: 'rw', innerClass: 'rw__i' });
        var tl = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top top', end: 'bottom bottom', scrub: 0.4 } });
        // everything is timed against the flood, which runs over the first three quarters of the pin
        // and is also what uncovers the card (rooms.js clips it to the growing dot)
        if (label) tl.fromTo(label, { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.12 }, 0.1);
        tl.fromTo(parts.words, { yPercent: 125 }, { yPercent: 0, ease: 'power3.out', duration: 0.3, stagger: 0.05 }, 0.2);
        if (rest) tl.fromTo(rest, { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.2 }, 0.52);
        tl.to({}, { duration: 0.01 }, 0.99);
      });
    });

    // Headings outside a title card: words rise out of their own baseline, once
    $$('[data-reveal]').forEach(function (h) {
      later(function () {
        if (onScreen(h)) return;
        var parts = split(h, { wordClass: 'rw', innerClass: 'rw__i' });
        gsap.set(parts.words, { yPercent: 125 });
        whenVisible(h, function () {
          gsap.to(parts.words, { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.07 });
        });
      });
    });

    // 03 Projects: finished cards sink back a little as the next one covers them;
    // renders drift against the pointer as if they had depth
    later(function () {
      var cards = $$('.pcard');
      gsap.matchMedia().add('(min-height: 700px), (min-width: 900px) and (min-height: 600px)', function () {
        cards.forEach(function (card, i) {
          var next = cards[i + 1];
          var inner = $('.pcard__inner', card);
          if (!next || !inner) return;
          gsap.fromTo(inner, { scale: 1, '--shade': 0 }, {
            scale: 0.93, '--shade': 0.6, ease: 'none',
            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 12%', scrub: true }
          });
        });
      });
    });
    if (finePointer) {
      later(function () {
        $$('.pcard__media').forEach(function (media) {
          var img = $('.pcard__img', media);
          if (!img) return;
          var xTo = gsap.quickTo(img, 'xPercent', { duration: 1, ease: 'power3.out' });
          var yTo = gsap.quickTo(img, 'yPercent', { duration: 1, ease: 'power3.out' });
          media.addEventListener('pointerenter', function () { gsap.to(img, { scale: 1.08, duration: 1.4, ease: 'expo.out', overwrite: 'auto' }); });
          media.addEventListener('pointermove', function (e) {
            var r = media.getBoundingClientRect();
            xTo(((e.clientX - r.left) / r.width - 0.5) * -2.4);
            yTo(((e.clientY - r.top) / r.height - 0.5) * -2.4);
          });
          media.addEventListener('pointerleave', function () {
            xTo(0); yTo(0);
            gsap.to(img, { scale: 1.03, duration: 1.2, ease: 'expo.out', overwrite: 'auto' });
          });
        });
      });
    }

    // 04 Experience: the line is drawn as far as you have read
    $$('[data-role]').forEach(function (role) {
      later(function () {
        gsap.fromTo(role, { '--p': 0 }, {
          '--p': 1, ease: 'none',
          scrollTrigger: { trigger: role, start: 'top 62%', end: 'bottom 62%', scrub: 0.5 }
        });
      });
    });

    // 05 Resume: the sheet is set down, and its figures count up
    later(function () {
      var sheet = $('[data-sheet]');
      if (!sheet || onScreen(sheet)) return;
      gsap.set(sheet, { y: 90, rotate: -5.5, opacity: 0 });
      whenVisible(sheet, function () {
        gsap.to(sheet, { y: 0, rotate: -1.3, opacity: 1, duration: 1.5, ease: 'expo.out', clearProps: 'transform,opacity' });
      }, '0px 0px -4% 0px');

      $$('[data-count]', sheet).forEach(function (dd) {
        var end = parseFloat(dd.getAttribute('data-count'));
        var suffix = dd.getAttribute('data-suffix') || '';
        var n = { v: 0 };
        whenVisible(dd, function () {
          gsap.to(n, { v: end, duration: 1.6, delay: 0.3, ease: 'power2.out', onUpdate: function () { dd.textContent = Math.round(n.v) + suffix; } });
        }, '0px 0px -12% 0px');
      });
    });

    // A line of type that runs with the scroll, before the last room
    later(function () {
      var band = $('[data-marquee]');
      var track = band && $('.marquee__track', band);
      var first = track && track.firstElementChild;
      if (!first) return;
      var itemW = first.getBoundingClientRect().width;
      if (!itemW) return;
      while (track.children.length * itemW < window.innerWidth * 2 + itemW) track.appendChild(first.cloneNode(true));

      var x = 0, dir = -1, boost = 0, prevY = window.scrollY, live = false;
      new IntersectionObserver(function (entries) { live = entries[0].isIntersecting; }).observe(band);
      gsap.ticker.add(function (time, dt) {
        if (!live) { prevY = window.scrollY; return; }
        var y = window.scrollY;
        var v = y - prevY;
        prevY = y;
        if (Math.abs(v) > 0.5) dir = v > 0 ? -1 : 1;
        boost += (Math.min(60, Math.abs(v)) * 0.9 - boost) * 0.12;
        x += dir * (0.045 * dt + boost);
        if (x <= -itemW) x += itemW;
        if (x > 0) x -= itemW;
        track.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
      });
    });

    // Footer: the name rises once more, and the dot on its i arrives last
    later(function () {
      var word = $('.outro__word');
      if (!word) return;
      fontsReady(2000).then(function () { restoreKerning(word); });
      var tl = gsap.timeline({ scrollTrigger: { trigger: '.outro', start: 'top 96%', end: 'bottom bottom', scrub: 0.4 } });
      tl.fromTo($$(':scope > .ch', word), { yPercent: 112 }, { yPercent: 0, ease: 'none', stagger: 0.12, duration: 0.6 }, 0)
        .fromTo('.outro__tittle', { scale: 0 }, { scale: 1, ease: 'back.out(1.6)', duration: 0.5 }, '>-0.25');
    });
  }

  // 02 Skills: the stack separates into its layers; the layer you are reading (or pointing at) lights up
  later(function () {
    var stack = $('[data-stack]');
    if (!stack) return;
    var planes = {};
    $$('[data-plane]', stack).forEach(function (p) { planes[p.getAttribute('data-plane')] = p; });
    var groups = $$('[data-group]', stack);
    var scrollLayer = null, hoverLayer = null;

    var paint = function () {
      var active = hoverLayer || scrollLayer;
      groups.forEach(function (g) { g.classList.toggle('is-active', g.getAttribute('data-group') === active); });
      Object.keys(planes).forEach(function (k) { planes[k].classList.toggle('is-active', k === active); });
    };

    groups.forEach(function (g) {
      var name = g.getAttribute('data-group');
      if (finePointer) {
        g.addEventListener('pointerenter', function () { hoverLayer = name; paint(); });
        g.addEventListener('pointerleave', function () { hoverLayer = null; paint(); });
      }
      if (gsap && ScrollTrigger) {
        ScrollTrigger.create({
          trigger: g, start: 'top 60%', end: 'bottom 60%',
          onToggle: function (self) {
            if (self.isActive) scrollLayer = name;
            else if (scrollLayer === name) scrollLayer = null;
            paint();
          }
        });
      }
    });

    if (animated && planes.frontend && planes.tools) {
      gsap.timeline({ scrollTrigger: { trigger: stack, start: 'top 82%', end: 'top 28%', scrub: 0.6 } })
        .fromTo(planes.frontend, { y: 212 }, { y: 110, ease: 'none' }, 0)
        .fromTo(planes.tools, { y: 288 }, { y: 390, ease: 'none' }, 0)
        .fromTo('.stack__guides', { opacity: 0 }, { opacity: 1, ease: 'none' }, 0.35);
    }
  });

  // Scrubbed animations store scroll positions; keep them honest when the document grows or shrinks.
  later(function () {
    if (!ScrollTrigger || !('ResizeObserver' in window)) return;
    var docHeight = document.documentElement.scrollHeight;
    var timer = 0;
    new ResizeObserver(function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        var h = document.documentElement.scrollHeight;
        if (h !== docHeight) { docHeight = h; ScrollTrigger.refresh(); if (lenis) lenis.resize(); }
      }, 200);
    }).observe(document.body);
  });

  pump();
}
