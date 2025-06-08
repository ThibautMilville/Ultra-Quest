import { Mail, MessageSquare, MapPin, Phone } from 'lucide-react';
import Header from '../components/layout/Header';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../contexts/TranslationContext';

function Contact() {
  const { t } = useTranslation();
  
  // Animations au scroll
  const headerAnimation = useScrollAnimation();
  const formAnimation = useScrollAnimation();
  const infoAnimation = useScrollAnimation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <Header activeSection="nav.contact" />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div 
            ref={headerAnimation.elementRef as React.RefObject<HTMLDivElement>}
            className={`text-center mb-16 scroll-animate ${headerAnimation.isVisible ? 'visible' : ''}`}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div 
              ref={formAnimation.elementRef as React.RefObject<HTMLDivElement>}
              className={`bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 scroll-animate-left ${formAnimation.isVisible ? 'visible' : ''}`}
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <MessageSquare className="text-purple-400" />
                {t('contact.sendMessage')}
              </h2>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('contact.fullName')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder={t('contact.placeholderName')}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder={t('contact.placeholderEmail')}
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('contact.subject')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder={t('contact.placeholderSubject')}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('contact.message')}
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder={t('contact.placeholderMessage')}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  {t('contact.sendButton')}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div 
              ref={infoAnimation.elementRef as React.RefObject<HTMLDivElement>}
              className={`space-y-8 scroll-animate-right ${infoAnimation.isVisible ? 'visible' : ''}`}
            >
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {t('contact.info')}
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="text-purple-400 mt-1" size={20} />
                    <div>
                      <h3 className="text-white font-medium">{t('contact.email')}</h3>
                      <p className="text-gray-300">contact@utquest.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="text-purple-400 mt-1" size={20} />
                    <div>
                      <h3 className="text-white font-medium">{t('contact.phone')}</h3>
                      <p className="text-gray-300">+33 1 23 45 67 89</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <MapPin className="text-purple-400 mt-1" size={20} />
                    <div>
                      <h3 className="text-white font-medium">{t('contact.address')}</h3>
                      <p className="text-gray-300">
                        123 Rue de la Blockchain<br />
                        75001 Paris, France
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {t('contact.faq')}
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-white font-medium mb-2">{t('contact.faq1.question')}</h3>
                    <p className="text-gray-300 text-sm">
                      {t('contact.faq1.answer')}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-medium mb-2">{t('contact.faq2.question')}</h3>
                    <p className="text-gray-300 text-sm">
                      {t('contact.faq2.answer')}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-medium mb-2">{t('contact.faq3.question')}</h3>
                    <p className="text-gray-300 text-sm">
                      {t('contact.faq3.answer')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact; 