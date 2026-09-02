import type { GeneratedAiResponse, CryptoResponseOptions } from '../lib/aiResponseGenerator';
import { generateCryptoResponse } from '../lib/aiResponseGenerator';

export interface StreamChatOptions extends CryptoResponseOptions {
  onTokenChunk?: (partialContent: string) => void;
  signal?: AbortSignal;
}

export const chatService = {
  /**
   * Generates a complete AI response object for a given query.
   */
  generateResponse(
    prompt: string,
    options: CryptoResponseOptions = {}
  ): GeneratedAiResponse {
    return generateCryptoResponse(prompt, options);
  },

  /**
   * Streams the AI response token by token with micro-delays and cancellation support.
   */
  async streamResponse(
    fullText: string,
    options: {
      onChunk: (accumulated: string) => void;
      signal?: AbortSignal;
      minDelayMs?: number;
      maxDelayMs?: number;
    }
  ): Promise<string> {
    const { onChunk, signal, minDelayMs = 10, maxDelayMs = 28 } = options;
    const tokens = fullText.split(/(\s+)/);
    let accumulated = '';

    for (let i = 0; i < tokens.length; i++) {
      if (signal?.aborted) {
        throw new Error('Stream aborted');
      }

      accumulated += tokens[i];
      const delay = Math.random() * (maxDelayMs - minDelayMs) + minDelayMs;
      await new Promise((resolve) => setTimeout(resolve, delay));

      if (signal?.aborted) {
        throw new Error('Stream aborted');
      }

      onChunk(accumulated);
    }

    return fullText;
  },
};
