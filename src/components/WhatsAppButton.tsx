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
      aria-label="Fale connosco pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.4)] hover:scale-110 transition-all duration-300 flex items-center justify-center cursor-pointer group"
    >
      <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448c-.63.348-1.341.62-2.115.805l-5.305 1.396zm6.314-15.021c-.247-.058-.57-.215-.818-.328-.247-.113-.393-.171-.56-.171-.167 0-.394.062-.592.278-.198.216-.763.745-.763 1.817 0 1.072.784 2.106.892 2.253.108.147 1.503 2.392 3.665 3.352 2.162.96 2.162.64 2.553.601.391-.039 1.261-.516 1.439-1.014.177-.498.177-.926.124-1.015-.053-.089-.195-.142-.407-.248s-1.261-.622-1.458-.692c-.197-.07-.34-.105-.483.105-.143.21-.555.692-.682.835-.126.143-.253.161-.5.035-.247-.126-1.043-.384-1.987-1.226-.735-.654-1.231-1.46-1.375-1.707-.143-.247-.015-.38.109-.503.111-.111.247-.287.371-.431.124-.144.165-.247.247-.412.083-.165.041-.31-.021-.435s-.56-1.378-.77-1.884c-.203-.491-.41-.424-.56-.431l-.478-.011z"/>
      </svg>
      
      {/* Tooltip opcional ao passar o rato */}
      <span className="absolute right-full mr-3 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-700">
        Fale connosco
      </span>
    </a>
  );
};