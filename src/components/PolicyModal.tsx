import React from 'react';
import { motion } from 'motion/react';
import { X, ShieldCheck, FileText, ExternalLink } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
  language: 'en' | 'ru';
}

const PDF_URLS = {
  terms: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663706234669/AGnaMHeKkVobgxQg.pdf',
  privacy: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663706234669/RDbCvevzPWsgdcwe.pdf'
};

export const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, type, language }) => {
  if (!isOpen) return null;

  const isRu = language === 'ru';
  const pdfUrl = PDF_URLS[type];
  const title = type === 'privacy' 
    ? (isRu ? 'Политика конфиденциальности' : 'Privacy Policy')
    : (isRu ? 'Условия использования' : 'Terms of Use');
  
  // Use Google GView to render the PDF inline inside the iframe without triggering a download
  const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      {/* Backdrop overlay trigger for closing */}
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative bg-white dark:bg-slate-800 w-full max-w-4xl rounded-3xl p-5 md:p-6 shadow-2xl border border-slate-100 dark:border-slate-700/60 h-[85vh] flex flex-col z-10"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-700/50 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-2xl ${type === 'privacy' ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-500' : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500'}`}>
              {type === 'privacy' ? <ShieldCheck className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg md:text-xl font-sans leading-tight">
                {title}
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                {isRu ? 'Официальный документ PDF' : 'Official PDF Document'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Embedded PDF Viewer Frame */}
        <div className="flex-1 w-full bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden relative flex flex-col border border-slate-100 dark:border-slate-800/80">
          <iframe 
            src={viewerUrl} 
            className="w-full h-full border-0 rounded-2xl bg-white" 
            title={title}
          />
        </div>

        {/* Footer actions */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between gap-3">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 text-xs md:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            {isRu ? 'Открыть в новой вкладке' : 'Open in a new tab'}
          </a>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-sm rounded-xl transition cursor-pointer"
          >
            {isRu ? 'Закрыть' : 'Close'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
