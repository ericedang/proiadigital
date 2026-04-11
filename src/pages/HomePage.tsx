import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Services from '../components/Services';
import Insights from '../components/Insights';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import { useLayout } from '../components/Layout';

export default function HomePage() {
  const { openBooking } = useLayout();

  return (
    <>
      <Hero onOpenBooking={openBooking} />
      <Stats />
      <Services />
      <Insights />
      <Testimonials />
      <ContactForm />
    </>
  );
}

// MJ Commit
