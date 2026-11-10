'use client';

import React from 'react';

export const WhatsAppButton: React.FC = () => {
  const phoneNumber = '554396831654';
  const message = encodeURIComponent('Olá! Vim pelo site da Terçarium e gostaria de tirar dúvidas sobre os terços.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-0 transition-all duration-300 ease-out hover:scale-105 active:scale-95 group drop-shadow-[0_6px_16px_rgba(0,0,0,0.28)] hover:drop-shadow-[0_10px_20px_rgba(37,211,102,0.45)]"
    >
      {/* Logótipo Oficial ampliado em 20% */}
      <svg
        viewBox="0 0 308 308"
        className="w-[4.2rem] h-[4.2rem] transition-transform duration-300 ease-out group-hover:-rotate-3"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#29B356" />
            <stop offset="100%" stopColor="#1EBE5D" />
          </linearGradient>
        </defs>

        {/* 1. Balão exterior branco */}
        <path
          fill="#FFFFFF"
          d="M227.904 80.096A103.58 103.58 0 0 0 154.52 49.6c-57.296 0-103.92 46.624-103.944 103.944-.008 18.32 4.784 36.2 13.888 51.968L49.6 258.4l54.12-14.192a103.624 103.624 0 0 0 50.8 13.256h.048c57.28 0 103.92-46.632 103.944-103.96a103.48 103.48 0 0 0-30.608-73.408z"
        />

        {/* 2. Círculo interior verde */}
        <circle
          cx="154.5"
          cy="153.5"
          r="92"
          fill="url(#waGreenGrad)"
        />

        {/* 3. Auscultador branco */}
        <path
          fill="#FFFFFF"
          d="M192.176 177.088c-2.312-1.16-13.688-6.752-15.808-7.528-2.12-.776-3.664-.776-5.208 1.544-1.544 2.32-5.976 7.528-7.328 9.072-1.352 1.544-2.704 1.736-5.016.576-2.312-1.16-9.76-3.6-18.592-11.472-6.872-6.128-11.512-13.704-12.864-16.024-1.352-2.32-.144-3.576 1.016-4.728 1.04-1.032 2.312-2.704 3.472-4.056 1.16-1.352 1.544-2.32 2.32-3.864.776-1.544.384-2.896-.192-4.056-.576-1.16-5.208-12.56-7.136-17.2-1.88-4.52-3.792-3.904-5.208-3.976-1.344-.072-2.888-.088-4.432-.088-1.544 0-4.056.584-6.176 2.896-2.12 2.32-8.104 7.928-8.104 19.336 0 11.408 8.304 22.44 9.464 23.984 1.16 1.544 16.344 24.96 39.592 34.992 5.528 2.392 9.84 3.824 13.208 4.888 5.552 1.768 10.608 1.52 14.608.92 4.464-.664 13.688-5.6 15.616-11.008 1.928-5.408 1.928-10.048 1.352-11.008-.576-.96-2.12-1.544-4.432-2.704z"
        />
      </svg>

      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-slate-900/95 backdrop-blur-sm text-slate-100 text-xs font-semibold py-1.5 px-3 rounded-lg shadow-lg border border-slate-800 opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap">
        Fale conosco
      </span>
    </a>
  );
};