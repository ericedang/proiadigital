import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Phone, Mail, MessageSquare, X, Plus } from "lucide-react";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  
  const phoneNumber = "699323123"; 
  const fixedNumber = "699323123"; // Assuming same for now
  const email = "contact@prodigital.cm";
  const whatsappMessage = "Bonjour Pro Digital, j'aimerais en savoir plus sur vos services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const actions = [
    { 
      icon: MessageCircle, 
      label: "WhatsApp", 
      href: whatsappUrl, 
      color: "bg-[#25D366]",
      target: "_blank"
    },
    { 
      icon: Phone, 
      label: "Appel Fixe", 
      href: `tel:${fixedNumber}`, 
      color: "bg-blue-600",
      target: "_self"
    },
    { 
      icon: Mail, 
      label: "Email", 
      href: `mailto:${email}`, 
      color: "bg-red-500",
      target: "_self"
    },
    { 
      icon: MessageSquare, 
      label: "Message Site", 
      href: "#contact", 
      color: "bg-accent",
      target: "_self",
      onClick: () => {
        setIsOpen(false);
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
  ];

  return (
    <div className="fixed bottom-28 right-6 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-end gap-3 mb-2">
            {actions.map((action, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 group"
              >
                <span className="bg-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  {action.label}
                </span>
                <a
                  href={action.href}
                  target={action.target}
                  rel="noopener noreferrer"
                  onClick={action.onClick}
                  className={`${action.color} text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform`}
                >
                  <action.icon size={20} />
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4">
        {!isOpen && (
          <motion.span 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white px-4 py-2 rounded-xl shadow-xl text-xs font-black uppercase tracking-widest text-primary border border-slate-100"
          >
            Nous contacter
          </motion.span>
        )}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`${isOpen ? 'bg-primary' : 'bg-accent'} text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden group`}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {isOpen ? <X size={32} /> : <Plus size={32} />}
          </motion.div>
          
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-white/20"
            />
          )}
        </motion.button>
      </div>
    </div>
  );
}

// MJ Commit
