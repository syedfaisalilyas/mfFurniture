import React, { createContext, useContext } from 'react';

const PromoContext = createContext(null);

const PROMO_CODES = {
  WELCOME10: { discount: 0.10, label: '10% off' },
  SAVE20: { discount: 0.20, label: '20% off' },
  FURNITURE15: { discount: 0.15, label: '15% off' },
  MF50: { discount: 0.50, label: '50% off' },
};

export function PromoProvider({ children }) {
  const applyPromo = (code) => {
    const promo = PROMO_CODES[code.toUpperCase()];
    if (!promo) throw new Error('Invalid promo code');
    return promo;
  };

  return (
    <PromoContext.Provider value={{ applyPromo }}>
      {children}
    </PromoContext.Provider>
  );
}

export const usePromo = () => useContext(PromoContext);
