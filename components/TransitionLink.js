"use client";

import Link from "next/link";
import { usePageTransition } from "@/components/TransitionProvider";

export default function TransitionLink({ href, onClick, ...props }) {
  const { navigate } = usePageTransition();

  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    // Let the browser handle new-tab clicks and other modified clicks
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigate(href);
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}