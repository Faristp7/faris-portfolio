import { Experience } from "@/components/experience";
import { CaseStudies } from "@/components/site/case-studies";
import { Contact } from "@/components/site/contact";
import { Cursor } from "@/components/site/cursor";
import { Dock } from "@/components/site/dock";
import { ExperienceChapter } from "@/components/site/experience";
import { Footer } from "@/components/site/footer";
import { Hello } from "@/components/site/hello";
import { Loader } from "@/components/site/loader";
import { Menu } from "@/components/site/menu";
import { Projects } from "@/components/site/projects";
import { Resume } from "@/components/site/resume";
import { Rooms } from "@/components/site/rooms";
import { Scene } from "@/components/site/scene";
import { Skills } from "@/components/site/skills";
import { Sprite } from "@/components/site/sprite";
import { Toast } from "@/components/site/toast";

/* The whole page, server-rendered as static markup (a port of the static site's index.html body).
   Behaviour (loader, the travelling dot, scroll scenes, dialogs, form) is attached on the client by
   <Experience />, which finds these elements by their classes, ids and data-* attributes, so the
   markup in components/site must stay attribute-for-attribute in step with what it expects. */
export default function Home() {
  return (
    <>
      <Sprite />
      {" "}
      <a className="skip" href="#main">Skip to content</a>

      <Loader />

      <Rooms />

      <Dock />

      <Menu />

      <main id="main">
        <Scene />
        <Skills />
        <Projects />
        <ExperienceChapter />
        <Resume />
        <Contact />
      </main>

      <Footer />

      <CaseStudies />

      <Hello />

      <Cursor />

      <Toast />

      <Experience />
    </>
  );
}
