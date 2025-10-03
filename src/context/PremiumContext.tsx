// context/PremiumContext.tsx (updated)
"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { premiumFeatures, UserSubscription, UserRole, PremiumFeature } from '@/lib/premiumConfig';
import { PremiumModal } from '@/components/PremiumModal/PremiumModal';

interface PremiumContextType {
  userSubscription: UserSubscription | null;
  hasPremiumFeature: (featureId: string) => boolean;
  isPremiumUser: boolean;
  isLoading: boolean;
  showPremiumModal: (feature: PremiumFeature) => void;
  checkPremiumAccess: (featureId: string) => boolean;
  showPremiumPopup: (featureName: string) => void;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (context === undefined) {
    throw new Error('usePremium must be used within a PremiumProvider');
  }
  return context;
};

interface PremiumProviderProps {
  children: ReactNode;
}

export const PremiumProvider: React.FC<PremiumProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalFeature, setModalFeature] = useState<PremiumFeature | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUserSubscription = async (userId: string): Promise<UserSubscription> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const defaultSubscription: UserSubscription = {
          userId,
          role: 'free',
          premiumFeatures: [],
          isActive: true
        };
        
        const premiumUsers = ['user123', 'admin456'];
        if (premiumUsers.includes(userId)) {
          resolve({
            userId,
            role: 'premium',
            premiumFeatures: ['premium_arabic', 'premium_german', 'premium_french', 'premium_turkish'],
            isActive: true
          });
        } else {
          resolve(defaultSubscription);
        }
      }, 500);
    });
  };

  // Simple popup function for basic feature names
  const showPremiumPopup = (featureName: string) => {
    // Create a temporary feature object for the popup
    const tempFeature: PremiumFeature = {
      id: `premium_${featureName.toLowerCase().replace(/\s+/g, '_')}`,
      name: featureName,
      description: `This is a premium feature. Please purchase to access ${featureName}.`,
      price: 100,
      isActive: false
    };
    
    setModalFeature(tempFeature);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      fetchUserSubscription(user.$id)
        .then(setUserSubscription)
        .finally(() => setIsLoading(false));
    } else {
      setUserSubscription(null);
      setIsLoading(false);
    }
  }, [user]);

  const hasPremiumFeature = (featureId: string): boolean => {
    if (!userSubscription) return false;
    return userSubscription.premiumFeatures.includes(featureId) || userSubscription.role === 'admin';
  };

  const isPremiumUser = userSubscription?.role === 'premium' || userSubscription?.role === 'admin';

  const showPremiumModal = (feature: PremiumFeature) => {
    setModalFeature(feature);
    setIsModalOpen(true);
  };

  const checkPremiumAccess = (featureId: string): boolean => {
    if (hasPremiumFeature(featureId)) {
      return true;
    }
    
    // Find feature and show modal
    const allFeatures = [
      ...Object.values(premiumFeatures.languages),
      ...Object.values(premiumFeatures.crudForm || {}),
      ...Object.values(premiumFeatures.invoice || {}),
      ...Object.values(premiumFeatures.sidebar || {})
    ].filter(Boolean);
    
    const feature = allFeatures.find(f => f.id === featureId);
    
    if (feature) {
      showPremiumModal(feature);
    } else {
      // If feature not found, show generic popup
      showPremiumPopup("This Feature");
    }
    
    return false;
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalFeature(null);
  };

  return (
    <PremiumContext.Provider value={{
      userSubscription,
      hasPremiumFeature,
      isPremiumUser,
      isLoading,
      showPremiumModal,
      checkPremiumAccess,
      showPremiumPopup
    }}>
      {children}
      
      {modalFeature && (
        <PremiumModal
          isOpen={isModalOpen}
          onClose={closeModal}
          featureName={modalFeature.name}
          featureDescription={modalFeature.description}
        />
      )}
    </PremiumContext.Provider>
  );
};