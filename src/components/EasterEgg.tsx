"use client";

import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function EasterEgg() {
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Synthesize a subtle, harmonic chime using browser Web Audio API
  const playChime = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Note 1: 523.25 Hz (C5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(523.25, now);
      gain1.gain.setValueAtTime(0.06, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.3);

      // Note 2: 659.25 Hz (E5)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(659.25, now + 0.1);
      gain2.gain.setValueAtTime(0.06, now + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.1);
      osc2.stop(now + 0.45);
    } catch {
      // Graceful fallback if audio is not permitted by browser
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expectedKey = KONAMI_CODE[inputSequence.length].toLowerCase();

      if (key === expectedKey) {
        const nextSequence = [...inputSequence, e.key];
        if (nextSequence.length === KONAMI_CODE.length) {
          setIsUnlocked(true);
          setInputSequence([]);
          playChime();

          // Broadcast custom event so the Hero workflow interface triggers subtle visual pulse
          window.dispatchEvent(new CustomEvent("flowdesk:shortcut-unlocked"));

          setTimeout(() => {
            setIsUnlocked(false);
          }, 3500);
        } else {
          setInputSequence(nextSequence);
        }
      } else {
        if (e.key === "ArrowUp") {
          setInputSequence(["ArrowUp"]);
        } else {
          setInputSequence([]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputSequence]);

  return (
    <AnimatePresence>
      {isUnlocked && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 pointer-events-none"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#111315] text-white border border-[#26282E] shadow-[0_12px_32px_rgba(0,0,0,0.35)] font-mono text-xs">
            <div className="w-7 h-7 rounded-lg bg-[#1D212A] text-[#0B63E5] flex items-center justify-center border border-[#2E3544]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-semibold text-white">You found the shortcut.</p>
              <p className="text-[11px] text-[#858997]">
                Deterministic debug mode enabled
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
