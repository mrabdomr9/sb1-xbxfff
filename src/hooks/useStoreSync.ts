import { useEffect } from 'react';
import { useProjectStore } from '../store/projectStore';
import { useServicesStore } from '../store/servicesStore';
import { useClientStore } from '../store/clientStore';
import { usePartnerStore } from '../store/partnerStore';

export const useStoreSync = () => {
  useEffect(() => {
    // Subscribe to project changes
    const unsubProjects = useProjectStore.subscribe(
      (state) => state.projects,
      (projects) => {
        console.log('Projects updated:', projects);
        // Trigger any necessary UI updates
      }
    );

    // Subscribe to services changes
    const unsubServices = useServicesStore.subscribe(
      (state) => state.services,
      (services) => {
        console.log('Services updated:', services);
        // Trigger any necessary UI updates
      }
    );

    // Cleanup subscriptions
    return () => {
      unsubProjects();
      unsubServices();
    };
  }, []);
};