import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';

// Items API
export const itemsAPI = {
  // Get all items
  getItems: async (filters = {}) => {
    try {
      let q = collection(db, 'items');
      
      if (filters.category) {
        q = query(q, where('category', '==', filters.category));
      }
      
      if (filters.status) {
        q = query(q, where('status', '==', filters.status));
      }
      
      q = query(q, orderBy('createdAt', 'desc'));
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  },

  // Get single item
  getItem: async (id) => {
    try {
      const docRef = doc(db, 'items', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Item not found');
      }
    } catch (error) {
      console.error('Error fetching item:', error);
      throw error;
    }
  },

  // Create new item
  createItem: async (itemData) => {
    try {
      const docRef = await addDoc(collection(db, 'items'), {
        ...itemData,
        createdAt: new Date().toISOString(),
        status: 'pending_approval'
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  },

  // Update item
  updateItem: async (id, updates) => {
    try {
      const docRef = doc(db, 'items', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  },

  // Delete item
  deleteItem: async (id) => {
    try {
      await deleteDoc(doc(db, 'items', id));
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  },

  // Get items by user
  getUserItems: async (userId) => {
    try {
      const q = query(
        collection(db, 'items'), 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching user items:', error);
      throw error;
    }
  }
};

// Swaps API
export const swapsAPI = {
  // Create swap request
  createSwapRequest: async (swapData) => {
    try {
      const docRef = await addDoc(collection(db, 'swaps'), {
        ...swapData,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating swap request:', error);
      throw error;
    }
  },

  // Get user swaps
  getUserSwaps: async (userId) => {
    try {
      const q = query(
        collection(db, 'swaps'),
        where('requesterId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching user swaps:', error);
      throw error;
    }
  },

  // Update swap status
  updateSwapStatus: async (swapId, status) => {
    try {
      const docRef = doc(db, 'swaps', swapId);
      await updateDoc(docRef, {
        status,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating swap status:', error);
      throw error;
    }
  }
};

// Points API
export const pointsAPI = {
  // Redeem item with points
  redeemItem: async (userId, itemId, pointsRequired) => {
    try {
      // Create redemption record
      const redemptionData = {
        userId,
        itemId,
        pointsUsed: pointsRequired,
        status: 'completed',
        createdAt: new Date().toISOString()
      };
      
      await addDoc(collection(db, 'redemptions'), redemptionData);
      
      // Update user points
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        points: firebase.firestore.FieldValue.increment(-pointsRequired)
      });
      
      return true;
    } catch (error) {
      console.error('Error redeeming item:', error);
      throw error;
    }
  }
};

// Upload image to Firebase Storage
export const uploadImage = async (file, path) => {
  try {
    const storageRef = ref(storage, `images/${path}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Real-time listeners
export const subscribeToItems = (callback) => {
  const q = query(collection(db, 'items'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (querySnapshot) => {
    const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(items);
  });
};

export const subscribeToUserSwaps = (userId, callback) => {
  const q = query(
    collection(db, 'swaps'),
    where('requesterId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, (querySnapshot) => {
    const swaps = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(swaps);
  });
};