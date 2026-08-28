import { useState, useEffect, useCallback, useRef } from 'react';
import { useCryptoStore } from '../store/useCryptoStore';

export function useTextToSpeech() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const activeMessageId = useCryptoStore((s) => s.activeSpeechMessageId);
  const setActiveSpeechMessageId = useCryptoStore((s) => s.setActiveSpeechMessageId);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = useCallback(
    (text: string, messageId: string) => {
      if (!('speechSynthesis' in window)) {
        alert('Text-to-speech is not supported in this browser.');
        return;
      }

      // If already playing this message, toggle pause/play
      if (activeMessageId === messageId && isPlaying) {
        if (isPaused) {
          window.speechSynthesis.resume();
          setIsPaused(false);
        } else {
          window.speechSynthesis.pause();
          setIsPaused(true);
        }
        return;
      }

      // Clean markdown tags for natural spoken audio
      const cleanText = text
        .replace(/```[\s\S]*?```/g, 'Code block omitted.')
        .replace(/[#*_`$]/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
        setActiveSpeechMessageId(messageId);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setActiveSpeechMessageId(null);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setActiveSpeechMessageId(null);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [activeMessageId, isPlaying, isPaused, setActiveSpeechMessageId]
  );

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setActiveSpeechMessageId(null);
  }, [setActiveSpeechMessageId]);

  return {
    speak,
    stop,
    isPlaying,
    isPaused,
    activeMessageId,
  };
}
