export const walletService = {
  /**
   * Generates a deterministic-format simulated Web3 hex address.
   */
  generateRandomWalletAddress(prefix = '0x4F2a'): string {
    const randomHex = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    )
      .join('')
      .toUpperCase();
    return `${prefix}${randomHex}92F865eE824A1054E5F36423c9E3c76`;
  },

  /**
   * Truncates a 42-character Ethereum address to 0x1234...5678 format.
   */
  formatAddress(address: string): string {
    if (!address || address.length < 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  },
};
