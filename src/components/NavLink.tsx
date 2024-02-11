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
      className={`rounded p-1 ${
        pathName === link.url && "bg-black text-white"
      }`}
    >
      {link.title}
    </Link>
  );
}
