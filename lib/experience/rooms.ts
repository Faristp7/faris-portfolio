/* eslint-disable */
// @ts-nocheck -- ported verbatim from the static site; logic kept untyped on purpose so it cannot drift.
/* Faris — the dot and the rooms
   --------------------------------------------------------------------------
   The page is a sequence of rooms, each a flat colour. Behind the content sits
   one fixed layer per room, cut to a circle with clip-path. That circle is
   "the dot":

     - it rests wherever an element marked [data-dot="N"] is (N = the layer),
       docking to the one nearest the middle of the screen and flying to the
       next as the page scrolls;
     - the very first dot starts somewhere else: on the anchor marked
       [data-dot-pre] (the dot of the i in the name). `state.scene` says how
       far it has got from there to its first ordinary anchor;
     - the last anchor of a layer sits in a pinned chapter title
       ([data-flood="N"]). While that title is pinned the circle grows until it
       covers the screen, and the dot has become the next room. The title card
       itself is cut to the same circle, so the dot is what uncovers it.

   So the dot you follow through a chapter is always the seed of the chapter
   after it. Nothing here draws pixels itself: it only moves a few CSS shapes.

   mount(container) -> controller | null   (was window.FarisRooms.mount)
   -------------------------------------------------------------------------- */

  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function smooth(a, b, x) { var t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
  function easeInOut(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  function mount(container) {
    if (!container || !window.CSS || !CSS.supports('clip-path', 'ellipse(1px 1px at 1px 1px)')) return null;
    var root = document.documentElement;

    var layers = Array.prototype.slice.call(container.querySelectorAll('[data-layer]')).map(function (el) {
      var id = el.getAttribute('data-layer');
      return {
        el: el,
        anchors: Array.prototype.slice.call(document.querySelectorAll('[data-dot="' + id + '"]:not([data-dot-pre])')).map(function (a) {
          return { el: a, cx: 0, cy: 0, r: 0 };
        }),
        pre: document.querySelector('[data-dot="' + id + '"][data-dot-pre]'),
        landed: null,
        flood: document.querySelector('[data-flood="' + id + '"]'),
        x: 0, y: 0, rx: 0, ry: 0, p: 0, docked: null, last: '',
        fx: 0, fy: 0, near: false, clip: null,     // the flood card: its corner on screen, and the cut applied to it
        room: null, unlit: false,                  // the section this layer turns into
        arrived: false                             // the dot has grown into that room
      };
    });
    if (!layers.length) return null;
    layers.forEach(function (L) { L.room = L.flood && L.flood.closest('.room'); });

    // from here on the rooms are painted by these layers, and chapter titles pin while they flood
    root.classList.add('rooms-live');

    var state = {
      loader: 0,      // 1 = the first dot is held at the centre of the screen (title card), 0 = on the page
      progress: 0,    // loading progress while held, 0..1
      intro: 1,       // scale of the dot at its first anchor, for the opening
      scene: null,    // 0 = the first dot is on the i, 1 = it has reached its first anchor; null = follow the scroll
      hover: 0        // 1 = the dot on the i is being pointed at, and swells
    };
    var pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    var leaning = true;                            // the first dot is at its start, where it follows the pointer
    var lastY = window.scrollY, stretch = 0;
    var alive = 0, raf = 0;
    var room = null;                               // how many dots have become their rooms (null until first drawn)
    var api;

    function place(L, vw, vh, first) {
      // While the title card holds the first dot at the centre nothing on the page is showing,
      // so nothing is measured: the dot is simply drawn there, and the others are kept away.
      if (state.loader >= 0.9995) {
        L.x = vw / 2; L.y = vh / 2; L.p = 0;
        L.rx = L.ry = first ? Math.min(vw, vh) * (0.035 + 0.12 * state.progress) : 0;
        return;
      }

      var focus = vh * 0.5, at = -1, i, a, b, rect;
      for (i = 0; i < L.anchors.length; i++) {
        a = L.anchors[i];
        rect = a.el.getBoundingClientRect();
        a.cx = rect.left + rect.width / 2;
        a.cy = rect.top + rect.height / 2;
        a.r = rect.width / 2;
      }

      // The first dot sets out from the i. Until it has arrived, its first anchor is treated as
      // being wherever it has got to: it drops off the letter, swings low and grows as it lands.
      if (L.pre && L.anchors.length) {
        var s = state.scene == null ? window.scrollY / (vh * 0.5) : state.scene;
        s = clamp(s, 0, 1);
        var landed = s > 0.72;
        if (landed !== L.landed) {
          if (landed && L.landed === false && api.onLand) api.onLand();
          L.landed = landed;
          root.classList.toggle('dot-landed', landed);
        }
        if (s < 1) {
          a = L.anchors[0];
          rect = L.pre.getBoundingClientRect();
          var px = rect.left + rect.width / 2, py = rect.top + rect.height / 2, pr = rect.width / 2;
          var t = s * s * (3 - 2 * s);
          var sag = Math.min(vh * 0.16, Math.hypot(a.cx - px, a.cy - py) * 0.3) * Math.sin(Math.PI * t);
          a.cx = px + (a.cx - px) * t;
          a.cy = py + (a.cy - py) * t + sag;
          a.r = (pr + (a.r - pr) * t * t) * (1 + 0.24 * state.hover * (1 - t));
        }
      }

      for (i = 0; i < L.anchors.length; i++) if (L.anchors[i].cy <= focus) at = i;

      var x, y, r, dock = null, e = 0;
      if (at < 0 || at === L.anchors.length - 1) {
        a = L.anchors[at < 0 ? 0 : at];
        x = a.cx; y = a.cy; r = a.r; dock = a;
      } else {
        a = L.anchors[at]; b = L.anchors[at + 1];
        e = smooth(0.2, 0.8, (focus - a.cy) / Math.max(1, b.cy - a.cy));
        x = a.cx + (b.cx - a.cx) * e;
        y = a.cy + (b.cy - a.cy) * e;
        r = a.r + (b.r - a.r) * e;
        dock = e < 0.1 ? a : (e > 0.9 ? b : null);
      }

      if (first) {
        // the opening: the dot grows into place, and leans a little with the pointer
        var atStart = at <= 0 ? 1 - e : 0;
        leaning = atStart > 0.01;
        r *= 1 - (1 - state.intro) * atStart;
        x += pointer.x * 12 * atStart;
        y += pointer.y * 9 * atStart;
        // the title card holds it at the centre of the screen, growing as the page loads
        if (state.loader > 0.0005) {
          var lr = Math.min(vw, vh) * (0.035 + 0.12 * state.progress);
          x += (vw / 2 - x) * state.loader;
          y += (vh / 2 - y) * state.loader;
          r += (lr - r) * state.loader;
          dock = null;
        }
      }

      // flood: while its chapter title is pinned, the dot grows until it covers the screen
      var p = 0;
      if (L.flood) {
        rect = L.flood.getBoundingClientRect();
        var run = rect.height - vh;
        p = run > 8 ? clamp(-rect.top / run, 0, 1) : (rect.top < vh * 0.4 ? 1 : 0);
        L.fx = rect.left; L.fy = rect.top;
        L.near = rect.top < vh + 240 && rect.bottom > -240;
      }
      L.p = clamp((p - 0.05) / 0.7, 0, 1);

      var rx = r, ry = r;
      if (L.p > 0) {
        var cover = Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y)) + 6;
        rx = ry = r + (cover - r) * easeInOut(L.p);
      } else if (r < 44 && r > 0.5) {
        // a small dot stretches along its direction of travel, like a drop
        rx = r * (1 - 0.42 * stretch);
        ry = r * (1 + stretch);
      }

      if (dock !== L.docked) {
        if (L.docked) L.docked.el.classList.remove('is-docked');
        if (dock) dock.el.classList.add('is-docked');
        L.docked = dock;
      }
      L.x = x; L.y = y; L.rx = rx; L.ry = ry;
    }

    function frame() {
      raf = 0;
      var vw = window.innerWidth, vh = window.innerHeight;

      // scroll speed drives the stretch; it relaxes when the page comes to rest
      var y = window.scrollY, v = y - lastY;
      lastY = y;
      var target = clamp(Math.abs(v) / 46, 0, 0.55);
      stretch += (target - stretch) * (target > stretch ? 0.35 : 0.12);
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;

      var i, L, css, covering = -1, now = 0;
      for (i = 0; i < layers.length; i++) {
        L = layers[i];
        place(L, vw, vh, i === 0);
        if (L.p >= 1) covering = i;
        // a dot counts as having become its room a little before it covers the last corner, and
        // has to shrink a good way back before it can do so again
        if (L.p >= 0.9) L.arrived = true; else if (L.p < 0.5) L.arrived = false;
        if (L.arrived) now = i + 1;
      }
      if (now !== room) {
        if (room !== null && api.onRoom) api.onRoom(now, room);
        room = now;
      }
      for (i = 0; i < layers.length; i++) {
        L = layers[i];

        // The chapter title is written in the colours of the room to come, so it is cut to the
        // same circle: the dot uncovers it as it grows, and it is whole once the room is.
        if (L.flood && state.loader < 0.9995) {
          css = L.p >= 1 ? '' : (!L.near ? 'circle(0px at 0px 0px)' :
            'ellipse(' + Math.max(0, L.rx).toFixed(1) + 'px ' + Math.max(0, L.ry).toFixed(1) + 'px at ' +
            (L.x - L.fx).toFixed(1) + 'px ' + (L.y - L.fy).toFixed(1) + 'px)');
          if (css !== L.clip) { L.clip = css; L.flood.style.clipPath = css; }

          // Rooms carry their own colour, except the one being flooded: while its title is on
          // its way in and the dot has not covered the screen, it shows what is behind it.
          var unlit = L.near && L.p < 1;
          if (L.room && unlit !== L.unlit) { L.unlit = unlit; L.room.classList.toggle('is-unlit', unlit); }
        }

        // layers buried under a later, fully grown room need not be painted
        css = i < covering ? 'hide' : (L.x.toFixed(1) + '|' + L.y.toFixed(1) + '|' + L.rx.toFixed(1) + '|' + L.ry.toFixed(1));
        if (css === L.last) continue;
        L.last = css;
        if (css === 'hide') { L.el.style.visibility = 'hidden'; continue; }
        L.el.style.visibility = '';
        L.el.style.setProperty('--x', L.x.toFixed(1) + 'px');
        L.el.style.setProperty('--y', L.y.toFixed(1) + 'px');
        L.el.style.setProperty('--rx', Math.max(0, L.rx).toFixed(1) + 'px');
        L.el.style.setProperty('--ry', Math.max(0, L.ry).toFixed(1) + 'px');
      }

      if (alive > 0 || stretch > 0.004) { alive--; schedule(); }
    }

    function schedule() { if (!raf && !document.hidden) raf = requestAnimationFrame(frame); }
    function kick(frames) { alive = Math.max(alive, frames || 24); schedule(); }

    window.addEventListener('scroll', function () { kick(24); }, { passive: true });
    window.addEventListener('resize', function () { kick(8); });
    document.addEventListener('visibilitychange', function () { kick(4); });
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      pointer.tx = e.clientX / window.innerWidth - 0.5;
      pointer.ty = e.clientY / window.innerHeight - 0.5;
      if (leaning) kick(40);
    }, { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(function () { kick(8); }).observe(document.body);

    kick(8);

    api = {
      state: state,
      kick: kick,
      // Moments worth marking, for whoever wants to (main.js gives them a sound). Both are
      // only reported when the scroll brings them about, never for the state a page opens in.
      onLand: null,   // () the first dot has come to rest in its ring
      onRoom: null,   // (rooms, before) the number of dots that have become their rooms has changed
      // which room is showing at a point on screen (0 = the first room, n = layer n)
      roomAt: function (px, py) {
        for (var i = layers.length - 1; i >= 0; i--) {
          var L = layers[i];
          if (L.rx <= 0 || L.ry <= 0) continue;
          var dx = (px - L.x) / L.rx, dy = (py - L.y) / L.ry;
          if (dx * dx + dy * dy <= 1) return i + 1;
        }
        return 0;
      }
    };
    return api;
  }

  export { mount };
