import React from 'react';
import { motion } from 'motion/react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
  language: 'en' | 'ru';
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, type, language }) => {
  if (!isOpen) return null;

  const isRu = language === 'ru';

  const content = {
    terms: {
      title: isRu ? 'Условия использования' : 'Terms of Use',
      subtitle: isRu ? 'Последнее обновление: Июль 2026' : 'Last updated: July 2026',
      sections: [
        {
          title: isRu ? '1. Принятие условий' : '1. Acceptance of Terms',
          text: isRu
            ? 'Используя данное приложение для создания и редактирования документов, вы соглашаетесь соблюдать настоящие Условия использования. Если вы не согласны с какими-либо пунктами, пожалуйста, прекратите использование приложения.'
            : 'By using this document editing application, you agree to be bound by these Terms of Use. If you do not agree to any of these terms, please stop using the application.',
        },
        {
          title: isRu ? '2. Конфиденциальность и шифрование' : '2. Encryption & Master Password',
          text: isRu
            ? 'Безопасность ваших данных — наш приоритет. Все документы шифруются на вашем устройстве с использованием выбранного вами мастер-пароля. Мы не храним ваш мастер-пароль на сервере и не имеем к нему доступа. В случае утери или забывания мастер-пароля восстановить зашифрованные документы невозможно.'
            : 'The security of your data is our priority. All documents are encrypted directly on your device using your Master Password. We do not store your Master Password on our servers, nor do we have access to it. If you lose or forget your Master Password, your encrypted documents cannot be recovered.',
        },
        {
          title: isRu ? '3. Пользовательский контент' : '3. User Content',
          text: isRu
            ? 'Вы сохраняете за собой все права на создаваемый вами контент. Приложение не претендует на владение вашими текстовыми материалами, списками или другими данными.'
            : 'You retain all intellectual property rights to the content you create. The application does not claim ownership over your text documents, lists, or other data.',
        },
        {
          title: isRu ? '4. Отказ от гарантий и ограничение ответственности' : '4. Disclaimer & Limitation of Liability',
          text: isRu
            ? 'Приложение предоставляется по принципу "как есть" (as is). Разработчики не несут ответственности за случайную утерю данных, сбои в работе браузера, очистку кэша устройства или любые другие прямые или косвенные убытки, возникшие в ходе использования.'
            : 'The application is provided "as is" without warranty of any kind. The developers shall not be liable for any accidental data loss, browser storage clearance, device malfunctions, or any direct or indirect damages resulting from the use of this software.',
        },
        {
          title: isRu ? '5. Изменение условий' : '5. Changes to Terms',
          text: isRu
            ? 'Мы оставляем за собой право обновлять данные Условия использования в любое время. Продолжение использования приложения после внесения изменений означает ваше автоматическое согласие с обновленными Условиями.'
            : 'We reserve the right to modify these Terms of Use at any time. Your continued use of the application after changes are posted constitutes your acceptance of the updated terms.',
        },
      ],
    },
    privacy: {
      title: isRu ? 'Политика конфиденциальности' : 'Privacy Policy',
      subtitle: isRu ? 'Последнее обновление: Июль 2026' : 'Last updated: July 2026',
      sections: [
        {
          title: isRu ? '1. Принцип абсолютной приватности' : '1. Absolute Privacy Principle',
          text: isRu
            ? 'Наше приложение спроектировано так, чтобы гарантировать максимальную конфиденциальность. Мы не собираем, не анализируем и не передаем третьим лицам ваши личные данные, списки задач, документы или пароли. Все операции происходят локально в вашем браузере.'
            : 'Our application is designed with a strict zero-knowledge approach. We do not collect, analyze, or share your personal data, document content, checklist items, or passwords. All cryptographic operations and document savings occur locally in your browser.',
        },
        {
          title: isRu ? '2. Локальное хранилище (Local Storage)' : '2. Local Storage',
          text: isRu
            ? 'Для сохранения документов между сессиями приложение использует защищенную область локальной памяти вашего устройства. Эти данные остаются на вашем устройстве и не отправляются на наши облачные серверы.'
            : 'To persist your documents between sessions, the app utilizes the secure local storage of your device. This data remains physically on your hardware and is never transmitted to cloud-based servers.',
        },
        {
          title: isRu ? '3. Пароли и ключи шифрования' : '3. Cryptographic Keys & Passwords',
          text: isRu
            ? 'Мастер-пароль, который вы вводите при входе, используется для генерации локального ключа шифрования. Ни пароль, ни ключ никогда не покидают ваше устройство.'
            : 'The Master Password you enter at startup is used to derive a secure cryptographic key. Neither the raw password nor the key is ever transmitted over the network or stored in plaintext.',
        },
        {
          title: isRu ? '4. Сторонние интеграции и трекеры' : '4. Third-Party Services & Trackers',
          text: isRu
            ? 'Мы не встраиваем рекламные скрипты, трекеры аналитики, социальные плагины или любые другие инструменты отслеживания активности. Приложение работает автономно.'
            : 'We do not embed advertising networks, analytics tracking scripts, social media plugins, or any telemetry services. The application operates strictly in standalone mode.',
        },
        {
          title: isRu ? '5. Контакты' : '5. Contact Information',
          text: isRu
            ? 'Если у вас возникли вопросы по поводу конфиденциальности или безопасности приложения, вы можете обратиться к нам напрямую через поддержку.'
            : 'If you have any questions regarding privacy or the application\'s security, you may reach out to us directly through support channels.',
        },
      ],
    },
  };

  const currentPolicy = content[type];

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      {/* Backdrop overlay trigger for closing */}
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative bg-white dark:bg-slate-800 w-full max-w-2xl rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100 dark:border-slate-700/60 max-h-[85vh] flex flex-col z-10"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-700/50 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-2xl ${type === 'privacy' ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-500' : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500'}`}>
              {type === 'privacy' ? <ShieldCheck className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg md:text-xl font-sans">
                {currentPolicy.title}
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                {currentPolicy.subtitle}
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

        {/* Scrollable Document Area */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          {currentPolicy.sections.map((sec, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base font-sans">
                {sec.title}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-medium">
                {sec.text}
              </p>
            </div>
          ))}
        </div>

        {/* Footer actions */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/50 flex justify-end">
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
