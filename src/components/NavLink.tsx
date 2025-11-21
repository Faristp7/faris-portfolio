"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  link,
}: {
  link: {
    url: string;
    title: string;
  };
}) {
  const pathName = usePathname();

  return (
    <Link
      href={link.url}
      className={`rounded-md p-1 ${
        pathName === link.url && "bg-black text-white shadow-[0_4px_30px_rgba(0,0,0,0.05)]"
      }`}
    >
      {link.title}
    </Link>
  );
}
