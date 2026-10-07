import { useEffect, useState } from "react";

export function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && characterIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, characterIndex));
        setCharacterIndex((value) => value + 1);
      }, speed);
    } else if (!deleting) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (characterIndex >= 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, characterIndex));
        setCharacterIndex((value) => value - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIndex((value) => (value + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [characterIndex, deleting, pause, speed, wordIndex, words]);

  return display;
}