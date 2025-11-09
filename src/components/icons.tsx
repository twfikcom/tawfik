import React from 'react';

export const TwfikLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <style>
      {`
        .twfik-t-flash {
          animation: twfik-lightning-flash 3s infinite;
          transform-origin: center;
        }
        @keyframes twfik-lightning-flash {
          0%, 90%, 100% {
            filter: drop-shadow(0 0 3px rgba(59, 130, 246, 0.6));
            transform: scale(1) skewX(0deg);
            opacity: 1;
          }
          92% {
            filter: drop-shadow(0 0 12px rgba(255, 255, 255, 1)) drop-shadow(0 0 20px rgba(59, 130, 246, 1));
            transform: scale(1.05) skewX(-10deg);
            opacity: 1;
          }
          94% {
            filter: drop-shadow(0 0 3px rgba(59, 130, 246, 0.6));
            transform: scale(1) skewX(0deg);
            opacity: 0.7;
          }
        }
      `}
    </style>
    <rect width="40" height="40" rx="8" fill="#1A1A1A"/>
    <path
        className="twfik-t-flash"
        d="M13.3333 12H26.6667V15.3333H21.3333V28H18.6667V15.3333H13.3333V12Z"
        fill="currentColor"
    />
  </svg>
);

export const TIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M5 3H19V6H14V21H10V6H5V3Z" />
    </svg>
);

export const GlobeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 000-18m0 18a9 9 0 010-18M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
);

export const BrowserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 00-9-9m9 9a9 9 0 01-9 9m9-9H3m14 0a9 9 0 01-9-9" />
    </svg>
);

export const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

export const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

export const WhatsappIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.98 2.7 15.93 3.68 17.59L2.03 22.1L6.69 20.45C8.3 21.36 10.13 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 6.45 17.5 2 12.04 2M12.04 3.63C16.65 3.63 20.32 7.3 20.32 11.91C20.32 16.52 16.65 20.19 12.04 20.19C10.33 20.19 8.75 19.68 7.43 18.81L7.13 18.63L4.8 19.53L5.7 17.29L5.53 16.97C4.63 15.61 4.12 13.82 4.12 11.91C4.12 7.3 7.79 3.63 12.04 3.63M16.59 14.82C16.38 15.3 15.46 15.75 15.05 15.82C14.64 15.88 14.12 15.91 13.62 15.75C13.12 15.59 12.35 15.31 11.45 14.48C10.37 13.48 9.61 12.23 9.42 11.91C9.23 11.59 9.07 11.38 9.07 11.07C9.07 10.76 8.94 10.59 8.78 10.42C8.62 10.25 8.44 10.15 8.24 10.03C8.04 9.91 7.85 9.88 7.64 9.88C7.43 9.88 7.07 10 6.82 10.47C6.57 10.94 6.08 11.53 6.08 12.75C6.08 13.97 6.84 15.11 6.97 15.28C7.1 15.45 8.8 18.13 11.54 19.2C13.81 20.08 14.28 19.89 14.69 19.86C15.1 19.83 15.93 19.34 16.14 18.82C16.35 18.3 16.35 17.88 16.29 17.78C16.23 17.68 16.1 17.65 15.89 17.52C15.68 17.39 14.82 16.94 14.6 16.85C14.38 16.76 14.22 16.73 14.06 16.94C13.9 17.15 13.48 17.65 13.35 17.82C13.22 17.99 13.09 18.02 12.88 17.9C12.67 17.78 11.95 17.53 11.08 16.76C10.37 16.12 9.92 15.33 9.77 15.08C9.62 14.83 9.75 14.7 9.88 14.57C10 14.44 10.16 14.25 10.33 14.08C10.5 13.91 10.53 13.78 10.66 13.57C10.79 13.36 10.76 13.2 10.7 13.07C10.64 12.94 10.12 11.66 9.89 11.1C9.66 10.54 9.42 10.63 9.25 10.63C9.05 10.63 8.88 10.63 8.71 10.63C8.54 10.63 8.27 10.7 8.04 11.13C7.81 11.56 7.32 12.15 7.32 13.37C7.32 14.59 8.08 15.73 8.21 15.9C8.34 16.07 10.04 18.75 12.78 19.82C15.52 20.89 16.59 20.5 16.59 19.98C16.59 19.46 16.59 15.42 16.59 14.82Z" />
    </svg>
);

export const LightbulbIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

export const ToolsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const TwitterIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.46 6C21.71 6.33 20.91 6.55 20.07 6.66C20.94 6.14 21.63 5.35 21.95 4.42C21.15 4.9 20.27 5.26 19.34 5.45C18.59 4.65 17.5 4.12 16.31 4.12C14.04 4.12 12.18 6 12.18 8.29C12.18 8.62 12.21 8.94 12.28 9.25C8.79 9.07 5.68 7.38 3.54 4.86C3.18 5.48 2.98 6.2 2.98 6.96C2.98 8.42 3.73 9.71 4.88 10.46C4.19 10.44 3.53 10.25 2.96 9.94V10C2.96 12.08 4.41 13.84 6.42 14.24C6.07 14.33 5.7 14.37 5.32 14.37C5.06 14.37 4.8 14.34 4.54 14.29C5.08 16.03 6.63 17.29 8.47 17.32C6.99 18.49 5.15 19.16 3.16 19.16C2.82 19.16 2.48 19.14 2.15 19.1C3.99 20.29 6.16 21 8.47 21C16.3 21 20.48 14.47 20.48 8.78C20.48 8.58 20.48 8.39 20.47 8.19C21.32 7.58 22 6.84 22.46 6Z"/>
    </svg>
);

export const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 0H5C2.239 0 0 2.239 0 5V19C0 21.761 2.239 24 5 24H19C21.761 24 24 21.761 24 19V5C24 2.239 21.761 0 19 0ZM8 19H5V8H8V19ZM6.5 6.732C5.534 6.732 4.75 5.942 4.75 4.968C4.75 3.994 5.534 3.204 6.5 3.204C7.466 3.204 8.25 3.994 8.25 4.968C8.25 5.942 7.467 6.732 6.5 6.732ZM20 19H17V13.396C17 10.028 13 10.283 13 13.396V19H10V8H13V9.765C14.396 7.179 20 6.988 20 12.241V19Z"/>
    </svg>
);

export const ShoulderMeasurementIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2">
        <path d="M50 20C40 20 35 30 35 40V80H65V40C65 30 60 20 50 20Z" strokeLinejoin="round" />
        <circle cx="50" cy="15" r="5" />
        <path d="M35 40C25 40 20 50 20 55H35" />
        <path d="M65 40C75 40 80 50 80 55H65" />
        <path d="M15 55L85 55" strokeDasharray="4 4" />
        <path d="M15 50V60" />
        <path d="M85 50V60" />
    </svg>
);

export const WaistMeasurementIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2">
        <path d="M40 20L35 60C35 65 40 70 50 70C60 70 65 65 65 60L60 20" strokeLinejoin="round" />
        <ellipse cx="50" cy="65" rx="15" ry="3" />
        <path d="M30 65L70 65" strokeDasharray="4 4" />
        <path d="M30 60V70" />
        <path d="M70 60V70" />
    </svg>
);

export const ThighMeasurementIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2">
        <path d="M40 20L30 80H50L40 20Z" strokeLinejoin="round" />
        <path d="M60 20L70 80H50L60 20Z" strokeLinejoin="round" />
        <ellipse cx="35" cy="40" rx="10" ry="3" />
        <path d="M20 40H50" strokeDasharray="4 4" />
        <path d="M20 35V45" />
        <path d="M50 35V45" />
    </svg>
);