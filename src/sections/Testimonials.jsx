import { useState, useEffect } from "react";
import { auth, provider, db } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { collection, addDoc, query, getDocs, orderBy } from "firebase/firestore";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

const Testimonials = () => {
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState("");
  const [approvedComments, setApprovedComments] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  // Submit comment
  const handleSubmit = async () => {
    if (!comment) return;

    if (!user) {
      // Show popup to log in
      setPopupMessage("Please log in with Google to leave a comment!");
      setShowPopup(true);
      return;
    }

    try {
      await addDoc(collection(db, "comments"), {
        name: user.displayName,
        email: user.email,
        comment,
        approved: false, // Admin review required
        timestamp: new Date(),
      });
      setComment("");
      setPopupMessage("Your comment has been submitted for review!");
      setShowPopup(true);

      setTimeout(() => setShowPopup(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch approved comments
  useEffect(() => {
    const fetchComments = async () => {
      const q = query(collection(db, "comments"), orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      const approved = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(c => c.approved);
      setApprovedComments(approved);
    };
    fetchComments();
  }, []);

  // Sign in with Google
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setShowPopup(false); // hide popup after login
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="testimonials" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5 z-10">
        <TitleHeader
          title="What People Say About Me?"
          sub="Peer's Feedback Highlights"
        />

        {/* Comment Textarea (always visible) */}
        <div className="my-4 flex flex-col gap-2 items-center z-10">
          <textarea
            className="p-2 rounded bg-gray-800 text-white w-full max-w-md"
            placeholder="Leave your feedback"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <button
            className="cta-button group"
            onClick={handleSubmit}
          >
            
            Submit
          </button>
        </div>

        {/* Testimonials */}
        <div className="lg:columns-3 md:columns-2 columns-1 mt-16 z-10">
          {approvedComments.map((testimonial, index) => (
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

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/50"></div> {/* overlay */}
          <div className="relative bg-gray-900 text-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
            <p>{popupMessage}</p>
            {!user && (
              <button
                onClick={handleLogin}
                className="cta-button group"
              >
                Sign in with Google
              </button>
            )}
            <button
              onClick={() => setShowPopup(false)}
              className="mt-2 px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 w-full"
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
