import { useState, useEffect, createContext, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from './Chatbot';
import WhatsAppButton from './WhatsAppButton';
import BookingModal from './BookingModal';
import PaymentModal from './PaymentModal';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, Timestamp, setDoc, doc } from 'firebase/firestore';

interface LayoutContextType {
  openBooking: () => void;
  openPayment: () => void;
  user: any;
}

export const LayoutContext = createContext<LayoutContextType>({
  openBooking: () => {},
  openPayment: () => {},
  user: null,
});

export const useLayout = () => useContext(LayoutContext);

export default function Layout() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          await setDoc(doc(db, 'users', u.uid), {
            displayName: u.displayName,
            email: u.email,
            photoURL: u.photoURL,
            lastLogin: Timestamp.now()
          }, { merge: true });

          await addDoc(collection(db, 'interactions'), {
            userId: u.uid,
            userName: u.displayName,
            action: 'Connexion au site',
            timestamp: Timestamp.now()
          });
        } catch (error) {
          console.error('Firebase tracking error:', error);
        }
      }
    });

    return () => unsub();
  }, []);

  const contextValue: LayoutContextType = {
    openBooking: () => setIsBookingOpen(true),
    openPayment: () => setIsPaymentOpen(true),
    user,
  };

  return (
    <LayoutContext.Provider value={contextValue}>
      <div className="min-h-screen selection:bg-accent selection:text-white bg-white">
        <Navbar
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenPayment={() => setIsPaymentOpen(true)}
        />

        <main>
          <Outlet />
        </main>

        <Footer />
        <Chatbot />
        <WhatsAppButton />

        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />

        <PaymentModal
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          amount={150}
          serviceName="Diagnostic Digital Premium"
        />
      </div>
    </LayoutContext.Provider>
  );
}

// MJ Commit
