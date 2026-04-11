import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Shop from '../components/Shop';

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get('highlight');

  useEffect(() => {
    if (highlightId) {
      // Dispatch the event after a short delay so the Shop component can mount
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('open-shop', { detail: { productId: highlightId } }));
      }, 300);
    }
  }, [highlightId]);

  return <Shop isOpen={true} onClose={() => {}} fullPage={true} />;
}

// MJ Commit
