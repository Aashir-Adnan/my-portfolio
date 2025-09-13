import { useRef, useState, useEffect } from "react";
import { auth, provider, db } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/models/contact/ContactExperience";

const Contact = () => {
  const formRef = useRef(null);
  const [user, setUser] = useState(auth.currentUser || null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Listen to login/logout to update form fields
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setForm((prev) => ({
          ...prev,
          name: currentUser.displayName || "",
          email: currentUser.email || "",
        }));
      } else {
        setForm((prev) => ({ ...prev, name: "", email: "" }));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setForm({
        ...form,
        name: result.user.displayName,
        email: result.user.email,
      });
      setShowLoginPrompt(false);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    if (!form.message) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "messages"), {
        name: form.name,
        email: form.email,
        message: form.message,
        timestamp: serverTimestamp(),
        approved: false,
      });
      setForm({ ...form, message: "" });
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (err) {
      console.error("Firestore error:", err);
      alert("Failed to send message. Check Firestore rules.");
    } finally {
      setLoading(false);
    }
  };

return (
  <section id="contact" className="flex-center section-padding">
    <div className="w-full h-full md:px-10 px-5 z-[1]">
      <TitleHeader
        title="Get in Touch – Let’s Connect"
        sub="💬 Have questions or ideas? Let’s talk! 🚀"
      />

      
<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16">
  
  <div className="flex-center card-border rounded-xl p-10">
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-7"
    >
      <div>
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="What’s your name?"
          required
          disabled
          className="bg-gray-700 text-gray-300 cursor-not-allowed p-2 rounded w-full"
        />
      </div>

      <div>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="What’s your email address?"
          required
          disabled
          className="bg-gray-700 text-gray-300 cursor-not-allowed p-2 rounded w-full"
        />
      </div>

      <div>
        <label htmlFor="message">Your Message</label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="How can I help you?"
          rows="5"
          required
          className="bg-gray-800 p-2 rounded w-full"
        />
      </div>

      <button type="submit">
        <div className="cta-button group">
          <div className="bg-circle" />
          <p className="text">{loading ? "Sending..." : "Send Message"}</p>
        </div>
      </button>
    </form>
  </div>

  
  <div className="min-h-96">
    <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
      <ContactExperience />
    </div>
  </div>
</div>

    </div>

    
    {showPopup && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative bg-gray-900 text-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
          <h3 className="text-xl font-bold mb-2">Thank you!</h3>
          <p>I will get back to you ASAP!</p>
          <button
            onClick={() => setShowPopup(false)}
            className="cta-button group"
          >
            Close
          </button>
        </div>
      </div>
    )}

    
    {showLoginPrompt && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative bg-gray-900 text-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
          <h3 className="text-xl font-bold mb-2">Sign in required</h3>
          <p>Please sign in with Google to send a message.</p>
          <button
            onClick={handleLogin}
            className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 w-full"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => setShowLoginPrompt(false)}
            className="mt-2 px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 w-full"
          >
            Cancel
          </button>
        </div>
      </div>
    )}
  </section>
);

};

export default Contact;
