import type React from "react";

export function Rooms() {
  return (
    <>
      {/* The dot. Each layer is one room's colour, cut to a circle. The circle rests wherever a
         [data-dot] anchor for that layer is, and at the start of a chapter it grows until it is the room.
         The first one begins as the dot on the i of the name.
      */}
      <div className="rooms" data-rooms="" aria-hidden="true">
        <i data-layer="1" style={{ "--c": "var(--cobalt)" } as React.CSSProperties} />
        {" "}
        <i data-layer="2" style={{ "--c": "var(--ink)" } as React.CSSProperties} />
        {" "}
        <i data-layer="3" style={{ "--c": "var(--paper)" } as React.CSSProperties} />
        {" "}
        <i data-layer="4" style={{ "--c": "var(--cobalt)" } as React.CSSProperties} />
      </div>

      <div className="grain" aria-hidden="true" />
    </>
  );
}
