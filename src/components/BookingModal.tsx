import { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { motion, AnimatePresence } from 'motion/react';
import { format, addHours, startOfToday, isBefore, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { db, auth, loginWithGoogle } from '../lib/firebase';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { X, Calendar as CalendarIcon, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICES = [
  { id: 'diag', name: 'Diagnostic Digital Gratuit', duration: 30 },
  { id: 'strat', name: 'Stratégie Digitale Premium', duration: 60 },
  { id: 'comm', name: 'Audit Communication Digitale', duration: 45 },
  { id: 'gov', name: 'Gouvernance & Organisation', duration: 90 },
];

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [reasons, setReasons] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  useEffect(() => {
    if (selectedDate) {
      fetchBookedSlots();
    }
  }, [selectedDate]);

  const fetchBookedSlots = async () => {
    if (!selectedDate) return;
    const start = new Date(selectedDate);
    start.setHours(0,0,0,0);
    const end = new Date(selectedDate);
    end.setHours(23,59,59,999);

    const q = query(
      collection(db, 'appointments'),
      where('startTime', '>=', Timestamp.fromDate(start)),
      where('startTime', '<=', Timestamp.fromDate(end)),
      where('status', '!=', 'cancelled')
    );

    const snapshot = await getDocs(q);
    const slots = snapshot.docs.map(doc => format(doc.data().startTime.toDate(), 'HH:mm'));
    setBookedSlots(slots);
  };

  const handleBooking = async () => {
    if (!auth.currentUser) {
      await loginWithGoogle();
      return;
    }

    if (!selectedDate || !selectedTime) return;

    setLoading(true);
    try {
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const startTime = new Date(selectedDate);
      startTime.setHours(hours, minutes, 0, 0);
      const endTime = addHours(startTime, selectedService.duration / 60);

      await addDoc(collection(db, 'appointments'), {
        clientId: auth.currentUser.uid,
        clientName: auth.currentUser.displayName,
        clientEmail: auth.currentUser.email,
        serviceType: selectedService.name,
        reasons: reasons,
        startTime: Timestamp.fromDate(startTime),
        endTime: Timestamp.fromDate(endTime),
        status: 'pending',
        createdAt: Timestamp.now()
      });

      setStep(3);
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
      >
        {/* Sidebar Info */}
        <div className="md:w-1/3 bg-primary p-8 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-display font-bold mb-4">Réserver votre Diagnostic</h2>
            <p className="font-medium opacity-80 mb-8">Accompagnement premium par Pro Digital.</p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CalendarIcon size={20} className="text-accent" />
                <span className="text-sm font-bold">
                  {selectedDate ? format(selectedDate, 'PPP', { locale: fr }) : 'Choisir une date'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-accent" />
                <span className="text-sm font-bold">
                  {selectedTime || 'Choisir un créneau'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10">
            <p className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2">Service sélectionné</p>
            <p className="font-bold text-accent">{selectedService.name}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto bg-white">
          <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-primary">
            <X size={24} />
          </button>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-xl font-bold mb-6 text-primary">1. Choisissez votre service</h3>
                <div className="grid gap-4 mb-8">
                  {SERVICES.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedService(s)}
                      className={cn(
                        "p-4 rounded-2xl border text-left transition-all",
                        selectedService.id === s.id 
                          ? "border-accent bg-accent/5" 
                          : "border-slate-200 hover:border-accent/30"
                      )}
                    >
                      <p className="font-bold text-primary">{s.name}</p>
                      <p className="text-xs text-slate-500">{s.duration} minutes</p>
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setStep(2)}
                  className="w-full bg-accent text-white py-4 rounded-full font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-accent/20"
                >
                  Continuer
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-8"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-4 text-primary">2. Date & Raisons</h3>
                    <div className="space-y-6">
                      <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50 overflow-hidden">
                        <DayPicker
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => isBefore(date, startOfToday())}
                          locale={fr}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Raisons du rendez-vous</label>
                        <textarea 
                          value={reasons}
                          onChange={(e) => setReasons(e.target.value)}
                          placeholder="Précisez les raisons pour lesquelles vous souhaitez un rendez-vous..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-accent text-sm min-h-[100px] resize-none"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-48">
                    <h3 className="text-xl font-bold mb-4 text-primary">3. Heure</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                      {TIME_SLOTS.map(slot => {
                        const isBooked = bookedSlots.includes(slot);
                        return (
                          <button
                            key={slot}
                            disabled={isBooked}
                            onClick={() => setSelectedTime(slot)}
                            className={cn(
                              "py-2 px-4 rounded-xl border text-sm font-bold transition-all",
                              selectedTime === slot 
                                ? "bg-accent text-white border-accent shadow-md shadow-accent/20" 
                                : isBooked 
                                  ? "opacity-20 cursor-not-allowed border-slate-100"
                                  : "border-slate-200 hover:border-accent/30 text-slate-600"
                            )}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 border border-slate-200 py-4 rounded-full font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Retour
                  </button>
                  <button 
                    disabled={!selectedDate || !selectedTime || loading}
                    onClick={handleBooking}
                    className="flex-[2] bg-accent text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : 'Confirmer le RDV'}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} className="text-accent" />
                </div>
                <h3 className="text-3xl font-display font-bold mb-4 text-primary">Demande Envoyée !</h3>
                <p className="text-slate-500 mb-8 max-w-md mx-auto">
                  Votre demande de rendez-vous pour le <strong>{format(selectedDate!, 'PPP', { locale: fr })}</strong> à <strong>{selectedTime}</strong> a été transmise à nos experts.
                </p>
                <button 
                  onClick={onClose}
                  className="bg-accent text-white px-12 py-4 rounded-full font-bold shadow-lg shadow-accent/20"
                >
                  Fermer
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

// MJ Commit
