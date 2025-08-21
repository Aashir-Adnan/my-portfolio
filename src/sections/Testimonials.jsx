import { useState, useEffect } from "react";
import { auth, provider, db } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { collection, addDoc, query, getDocs, orderBy } from "firebase/firestore";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

const Testimonials = () => {
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState("");
  const [pendingComments, setPendingComments] = useState([]);
  const [showPopup, setShowPopup] = useState(false);


  // Sign in with Google
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    setUser(null);
  };

  // Submit comment (pending review)
  const handleSubmit = async () => {
    if (!comment) return;
    try {
      await addDoc(collection(db, "comments"), {
        name: user.displayName,
        email: user.email,
        comment,
        approved: false, // admin must approve
        timestamp: new Date()
      });
      setComment("");
      setShowPopup(true);
      setComment(""); // reset input

      // Optional: auto-hide after 3 seconds
      setTimeout(() => setShowPopup(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch approved testimonials from Firestore
  useEffect(() => {
    const fetchComments = async () => {
      const q = query(collection(db, "comments"), orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      const approved = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(c => c.approved);
      setPendingComments(approved);
    };
    fetchComments();
  }, []);

  return (
    <section id="testimonials" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5 z-10">
        <TitleHeader title="What People Say About Me?" sub="Peer's Feedback Highlights" />

        {/* Login / Logout */}
        <div className="my-6 flex justify-center">
          {!user ? (
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
              onClick={handleLogin}
            >
              Login with Google
            </button>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <p className="text-white">Hello, {user.displayName}</p>
              <button
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Submit comment */}
        {user && (
          <div className="my-4 flex flex-col gap-2 items-center z-10">
            <textarea
              className="p-2 rounded bg-gray-800 text-white w-full max-w-md"
              placeholder="Leave your feedback"
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition w-full max-w-md"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        )}

        {/* Testimonials */}
        <div className="lg:columns-3 md:columns-2 columns-1 mt-16 z-10">
          {pendingComments.map((testimonial, index) => (
            <GlowCard card={testimonial} key={index} index={index}>
              <div className="flex items-center gap-3">
                <div>
                  <img src={testimonial.photoURL || "/images/person.png"} alt={testimonial.name} />
                </div>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-white-50">{testimonial.comment}</p>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/50"></div> {/* overlay */}
          <div className="relative bg-gray-900 text-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
            <h3 className="text-xl font-bold mb-2">Thank you!</h3>
            <p>Your comment has been submitted for review.</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
    
  );


};

export default Testimonials;
