import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { googleSignIn, auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const HiddenTrigger = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { setIsAdminMode } = useSite();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'smoofikra@gmail.com' && user.emailVerified) {
        // Automatically grant admin mode if already signed in
        // setIsAdminMode(true); // Optionally auto-login
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1122') {
      setIsLoggingIn(true);
      try {
        const result = await googleSignIn();
        if (result?.user?.email === 'smoofikra@gmail.com') {
          setIsAdminMode(true);
          setShowPrompt(false);
          setPassword('');
        } else {
          alert('هذا الحساب غير مصرح له بالدخول كمسؤول.');
          await auth.signOut();
        }
      } catch (error) {
        console.error(error);
        alert('فشل تسجيل الدخول بحساب جوجل.');
      } finally {
        setIsLoggingIn(false);
      }
    } else {
      alert('كلمة المرور غير صحيحة');
    }
  };

  return (
    <>
      <div 
        className="fixed bottom-0 left-0 w-16 h-16 opacity-0 hover:opacity-[0.02] bg-white z-[90] cursor-default"
        onClick={() => setShowPrompt(true)}
      />
      
      {showPrompt && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-[var(--surface-primary)] shadow-2xl border border-[var(--border-default)] p-8 rounded-2xl w-full max-w-sm relative">
            <button 
              onClick={() => setShowPrompt(false)}
              className="absolute top-4 left-4 text-gray-500 hover:text-[var(--text-primary)]"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-6 text-center text-[var(--text-primary)]">وصول الإدارة</h3>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="كلمة المرور..."
                  className="w-full bg-[var(--surface-tertiary)] border border-[var(--border-default)] p-3 rounded-xl focus:border-[var(--color-primary)] outline-none transition-colors text-center font-english tracking-widest text-[var(--text-primary)]"
                  autoFocus
                />
              </div>
              <button 
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-[var(--color-primary)] text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isLoggingIn ? 'جاري التحقق...' : 'دخول (يستلزم حساب جوجل)'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
