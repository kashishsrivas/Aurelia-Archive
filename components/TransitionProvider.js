"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

const TransitionContext = createContext({ navigate: () => {} });

export function usePageTransition() {
  return useContext(TransitionContext);
}

export default function TransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [nav, setNav] = useState(null);
  const idRef = useRef(0);

  // The veil is shown from the click until the new page's path arrives
  const covered = nav !== null && nav.fromPath === pathname;

  const navigate = useCallback(
    (href) => {
      const targetPath = href.split("#")[0] || pathname;
      if (targetPath === pathname) {
        router.push(href);
        return;
      }
      if (covered) return;

      const id = ++idRef.current;
      setNav({ fromPath: pathname });
      setTimeout(() => router.push(href), 550);
      // Safety net so the veil can never get stuck
      setTimeout(() => {
        if (idRef.current === id) setNav(null);
      }, 6000);
    },
    [router, pathname, covered]
  );

  const value = useMemo(() => ({ navigate }), [navigate]);

  return (
    <MotionConfig reducedMotion="user">
      <TransitionContext.Provider value={value}>
        {children}

        <AnimatePresence onExitComplete={() => setNav(null)}>
          {covered && (
            <motion.div
              key="veil"
              aria-hidden
              className="fixed inset-0 z-[100] flex items-center justify-center"
              style={{
                background:
                  "radial-gradient(ellipse at center, #1a1408 0%, #060913 70%)",
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.5, ease: "easeInOut" },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.9, delay: 0.2, ease: "easeInOut" },
              }}
            >
              <motion.span
                className="text-3xl text-gold-400"
                style={{ textShadow: "0 0 18px rgba(227,185,92,0.8)" }}
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                ✦
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </TransitionContext.Provider>
    </MotionConfig>
  );
}