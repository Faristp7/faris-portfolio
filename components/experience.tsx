"use client";

import { useEffect } from "react";
import { startExperience } from "@/lib/experience/main";

const SCROLL_KEY = "faris:scroll:";

/* Starts the page behaviour (ported from the static site's js/main.js + js/rooms.js).
   Statically imported rather than import()-ed: the code then ships in this component's
   client chunk, which the browser already fetches alongside the page, so it can run in the
   first effect after hydration. A dynamic import() would only begin fetching its chunk at
   that point, adding a round trip before the loader / dot / scroll scene come alive.
   Running in an effect (not at module evaluation) keeps it after the DOM is complete and
   after React has hydrated, so the text splitting and class changes cause no hydration
   mismatch. startExperience() is idempotent, so StrictMode's double effect is harmless.

   Scroll restoration: the static site's deferred scripts lay the page out (pinned scene,
   chapter heights) before the load event, which is when the browser restores the scroll
   position on a reload or back/forward. Here hydration, and so this effect, comes after
   load, so the browser restores against the script-less layout and lands about a screen and
   a half short. The position is therefore saved on pagehide and put back once the page is
   laid out, as the browser does for the static site. The jump to a #fragment on a fresh
   visit has the same problem and is repeated the same way. */
export function Experience() {
  useEffect(() => {
    const key = SCROLL_KEY + location.href;
    let saved: string | null = null;
    try {
      saved = sessionStorage.getItem(key);
      sessionStorage.removeItem(key);
    } catch {}
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;

    startExperience();

    const returning = !!nav && (nav.type === "reload" || nav.type === "back_forward");
    if (returning && saved !== null) {
      window.scrollTo(0, Number(saved));
    } else if (!returning && location.hash.length > 1) {
      // A link into a chapter: the browser made its jump to the fragment against the
      // script-less layout. Make it again now, as the static site's browser does at load;
      // main.ts then carries on from there into the chapter (its intoChapter check).
      let target: HTMLElement | null = null;
      try {
        target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      } catch {}
      if (target) target.scrollIntoView({ block: "start", behavior: "instant" });
    }

    const save = () => {
      try {
        sessionStorage.setItem(SCROLL_KEY + location.href, String(Math.round(window.scrollY)));
      } catch {}
    };
    window.addEventListener("pagehide", save);
    return () => window.removeEventListener("pagehide", save);
  }, []);
  return null;
}
