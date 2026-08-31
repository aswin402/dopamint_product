import React from 'react';

interface TokenIconProps {
  symbol: string;
  size?: number | string;
  className?: string;
}

export const TokenIcon: React.FC<TokenIconProps> = ({
  symbol,
  size = 20,
  className = '',
}) => {
  const sym = symbol.toUpperCase();

  switch (sym) {
    case 'ETH':
    case 'ETHEREUM':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 ${className}`}
        >
          <circle cx="16" cy="16" r="16" fill="#627EEA" />
          <g transform="translate(8, 5) scale(0.02)">
            <polygon fill="#FFFFFF" fillOpacity="0.602" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54" />
            <polygon fill="#FFFFFF" points="392.07,0 0,650.54 392.07,882.29 392.07,472.33" />
            <polygon fill="#FFFFFF" fillOpacity="0.602" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89" />
            <polygon fill="#FFFFFF" points="392.07,1277.38 392.07,956.52 0,724.89" />
            <polygon fill="#FFFFFF" fillOpacity="0.2" points="392.07,882.29 784.13,650.54 392.07,472.33" />
            <polygon fill="#FFFFFF" fillOpacity="0.602" points="0,650.54 392.07,882.29 392.07,472.33" />
          </g>
        </svg>
      );

    case 'BTC':
    case 'BITCOIN':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 ${className}`}
        >
          <circle cx="16" cy="16" r="16" fill="#F7931A" />
          <path
            d="M22.2 13.7c.3-2.1-1.3-3.2-3.5-3.9l.7-2.9-1.8-.4-.7 2.8c-.5-.1-1-.2-1.5-.4l.7-2.8-1.8-.4-.7 2.9c-.4-.1-.8-.2-1.1-.3l-2.4-.6-.5 1.9s1.3.3 1.3.3c.7.2.8.7.8 1.1l-.8 3.3c0 .1.1.1.1.2h-.1l-1.2 4.7c-.1.2-.3.6-.8.4 0 0-1.3-.3-1.3-.3l-.9 2.1 2.3.6c.4.1.8.2 1.3.3l-.7 3 1.8.4.7-2.9c.5.1 1 .3 1.5.4l-.7 2.9 1.8.4.7-2.9c3 .6 5.3.3 6.3-2.4.8-2.2-.04-3.5-1.7-4.3 1.2-.3 2.1-1.1 2.3-2.7zm-4.1 5.9c-.5 2.2-4.1 1-5.3.7l.9-3.8c1.2.3 5 1 4.4 3.1zm.6-5.8c-.5 2-3.5.9-4.5.7l.9-3.4c1 .3 4.1.8 3.6 2.7z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'BASE':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 ${className}`}
        >
          <circle cx="16" cy="16" r="16" fill="#0052FF" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 7C11.0294 7 7 11.0294 7 16C7 20.9706 11.0294 25 16 25C20.6482 25 24.4716 21.4844 24.9472 17H16V15H24.9472C24.4716 10.5156 20.6482 7 16 7Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'AERO':
    case 'AERODROME':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 ${className}`}
        >
          <circle cx="16" cy="16" r="16" fill="#04297A" />
          <path
            d="M16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26C21.523 26 26 21.523 26 16C26 10.477 21.523 6 16 6ZM22.5 16C22.5 19.59 19.59 22.5 16 22.5C12.41 22.5 9.5 19.59 9.5 16C9.5 12.41 12.41 9.5 16 9.5C19.59 9.5 22.5 12.41 22.5 16Z"
            fill="#0052FF"
          />
          <path
            d="M16 10C12.686 10 10 12.686 10 16C10 19.314 12.686 22 16 22C19.314 22 22 19.314 22 16C22 12.686 19.314 10 16 10ZM16 19C14.343 19 13 17.657 13 16C13 14.343 14.343 13 16 13C17.657 13 19 14.343 19 16C19 17.657 17.657 19 16 19Z"
            fill="#00D8FF"
          />
          <circle cx="16" cy="16" r="1.75" fill="#FFFFFF" />
        </svg>
      );

    case 'DEGEN':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 ${className}`}
        >
          <circle cx="16" cy="16" r="16" fill="#A36EFD" />
          <path
            d="M10 18.5H22V20H10V18.5ZM12 14.5H20V17.5H12V14.5ZM13.5 10H18.5V13.5H13.5V10Z"
            fill="#FFFFFF"
          />
          <path
            d="M8.5 21C8.5 20.4477 8.94772 20 9.5 20H22.5C23.0523 20 23.5 20.4477 23.5 21C23.5 21.5523 23.0523 22 22.5 22H9.5C8.94772 22 8.5 21.5523 8.5 21Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'SOL':
    case 'SOLANA':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 ${className}`}
        >
          <circle cx="16" cy="16" r="16" fill="#000000" />
          <path
            d="M9.5 21.6L12 19H22.5L20 21.6H9.5ZM9.5 16L12 13.4H22.5L20 16H9.5ZM12 10.4L9.5 13H20L22.5 10.4H12Z"
            fill="url(#sol_gradient)"
          />
          <defs>
            <linearGradient id="sol_gradient" x1="9.5" y1="10.4" x2="22.5" y2="21.6" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00FFA3" />
              <stop offset="1" stopColor="#DC1FFF" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'USDC':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 ${className}`}
        >
          <circle cx="16" cy="16" r="16" fill="#2775CA" />
          <path
            d="M16 7C11.029 7 7 11.029 7 16C7 20.971 11.029 25 16 25C20.971 25 25 20.971 25 16C25 11.029 20.971 7 16 7ZM16.6 20.9C14.7 20.9 13.4 19.9 13.4 19.9L14.2 18.3C14.2 18.3 15.2 19.1 16.5 19.1C17.6 19.1 18.2 18.5 18.2 17.8C18.2 16.2 14.1 16.4 14.1 13.5C14.1 11.8 15.4 10.7 17.1 10.7C18.6 10.7 19.6 11.4 19.6 11.4L18.9 12.9C18.9 12.9 18 12.3 17.1 12.3C16.2 12.3 15.6 12.8 15.6 13.4C15.6 14.9 19.7 14.7 19.7 17.7C19.7 19.7 18.3 20.9 16.6 20.9Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    default:
      return (
        <div
          style={{ width: size, height: size }}
          className={`rounded-full bg-gradient-to-tr from-[var(--primary)] to-amber-500 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 ${className}`}
        >
          {sym.slice(0, 2)}
        </div>
      );
  }
};
