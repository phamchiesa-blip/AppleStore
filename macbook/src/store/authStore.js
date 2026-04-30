import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isInitialized: false,
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null });
  },
  initialize: () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        set({ user: JSON.parse(storedUser), isInitialized: true });
      } catch (error) {
        localStorage.removeItem('user');
        set({ user: null, isInitialized: true });
      }
    } else {
      set({ isInitialized: true });
    }
  }
}));

export default useAuthStore;
