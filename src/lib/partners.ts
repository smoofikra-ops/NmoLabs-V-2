import { db, OperationType, handleFirestoreError } from './firebase';
import { collection, doc, setDoc, getDocs, deleteDoc, writeBatch } from 'firebase/firestore';
import { Partner } from '../context/SiteContext';

export const savePartnersToFirestore = async (partners: Partner[]) => {
  try {
    const batch = writeBatch(db);
    
    // In a real app we might want to delete missing ones, or just overwrite the ones that exist.
    // For simplicity, let's fetch all existing ones and delete the ones that are no longer in the array, then add/update the current ones.
    
    const snapshot = await getDocs(collection(db, 'partners'));
    const existingIds = snapshot.docs.map(doc => doc.id);
    
    const currentIds = partners.map(p => p.id);
    
    const toDelete = existingIds.filter(id => !currentIds.includes(id));
    
    for (const id of toDelete) {
      batch.delete(doc(db, 'partners', id));
    }
    
    for (const partner of partners) {
      batch.set(doc(db, 'partners', partner.id), partner);
    }
    
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'partners');
  }
};

export const getPartnersFromFirestore = async (): Promise<Partner[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'partners'));
    const partners = snapshot.docs.map(doc => doc.data() as Partner);
    // Sort by order
    return partners.sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'partners');
    return [];
  }
};
