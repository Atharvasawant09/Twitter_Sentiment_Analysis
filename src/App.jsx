import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSmile, FaMeh, FaFrown, FaRobot, FaArrowRight, FaChevronDown, FaChevronUp, FaMoon, FaSun, FaTwitter, FaGithub, FaInfoCircle } from "react-icons/fa";
import './App.css';

export default function App() {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [tweetText, setTweetText] = useState("");
  const [recentAnalyses, setRecentAnalyses] = useState([]);

  // Redirect to Gradio app
  const handleRedirect = () => {
    // Store the tweet text in local storage for the Gradio app to access
    if (tweetText.trim()) {
      localStorage.setItem("lastTweet", tweetText);
      
      // Add to recent analyses list
      const newAnalysis = {
        id: Date.now(),
        text: tweetText.length > 60 ? tweetText.substring(0, 57) + "..." : tweetText,
        date: new Date().toLocaleTimeString()
      };
      
      setRecentAnalyses(prev => [newAnalysis, ...prev.slice(0, 2)]);
    }
    
    window.open("http://127.0.0.1:7860", "_blank");
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-tr from-indigo-200 via-purple-200 to-pink-100"} transition-colors duration-300`}>
      {/* Theme Toggle */}
      <motion.button
        className={`fixed top-4 right-4 p-3 rounded-full ${darkMode ? "bg-gray-800 text-yellow-400" : "bg-white text-indigo-600"} shadow-lg z-10`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </motion.button>
      
      <div className="flex items-center justify-center px-4 py-10">
        <motion.div
          className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white/80 border-indigo-100"} shadow-2xl rounded-3xl p-6 md:p-8 max-w-3xl w-full flex flex-col items-center border transition-colors duration-300`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
        >
          {/* Hero Section */}
          <motion.div
            className="flex flex-col items-center mb-8"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.7, type: "spring" }}
          >
            <div className={`${darkMode ? "from-indigo-600 to-purple-700" : "from-indigo-400 to-purple-500"} bg-gradient-to-br rounded-full p-4 shadow-lg mb-4 relative transition-colors duration-300`}>
              <FaRobot className="text-white text-5xl" />
              <div className="absolute inset-0 bg-white opacity-10 rounded-full animate-pulse"></div>
            </div>
            <h1 className={`text-4xl md:text-5xl font-extrabold ${darkMode ? "text-white" : "text-indigo-700"} mb-3 text-center drop-shadow-lg transition-colors duration-300`}>
              Sentiment Analyzer AI
            </h1>
            <p className={`text-lg md:text-xl ${darkMode ? "text-gray-300" : "text-gray-600"} text-center font-medium max-w-xl transition-colors duration-300`}>
              Instantly analyze the sentiment of any tweet with state-of-the-art AI.<br />
              <span className="text-indigo-500">Fast, accurate, and easy to use.</span>
            </p>
            
            {/* Badge Section */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {[
                { text: "AI Powered", color: "bg-blue-100 text-blue-800" },
                { text: "NLP", color: "bg-green-100 text-green-800" },
                { text: "Real-time", color: "bg-purple-100 text-purple-800" }
              ].map((badge, i) => (
                <span key={i} className={`${badge.color} text-xs font-medium px-3 py-1 rounded-full ${darkMode ? "opacity-80" : ""}`}>
                  {badge.text}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Tweet Input Section */}
          <motion.div
            className={`w-full ${darkMode ? "bg-gray-700" : "bg-indigo-50/90"} rounded-xl p-5 mb-6 shadow-inner transition-colors duration-300`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center mb-3">
              <FaTwitter className={`${darkMode ? "text-blue-400" : "text-blue-500"} mr-2`} />
              <h2 className={`text-lg font-bold ${darkMode ? "text-white" : "text-indigo-700"} transition-colors duration-300`}>
                Enter Tweet or Text
              </h2>
            </div>
            
            <textarea
              className={`w-full p-4 rounded-lg ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-800 border-indigo-100"} border shadow-inner focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-colors duration-300`}
              rows="4"
              placeholder="Type or paste your tweet here..."
              value={tweetText}
              onChange={(e) => setTweetText(e.target.value)}
            ></textarea>
            
            <div className="flex justify-between items-center mt-3">
              <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} transition-colors duration-300`}>
                {tweetText.length} / 280 characters
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  className={`px-3 py-1 rounded ${darkMode ? "bg-gray-600 text-gray-300" : "bg-white text-gray-600"} text-sm hover:opacity-80 transition-colors duration-300`}
                  onClick={() => setTweetText("")}
                >
                  Clear
                </button>
              </div>
            </div>
          </motion.div>

          {/* Project Description */}
          <motion.div
            className={`w-full ${darkMode ? "bg-gray-700" : "bg-indigo-50/70"} rounded-xl p-5 mb-6 shadow transition-colors duration-300`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-indigo-700"} mb-3 flex items-center gap-2 transition-colors duration-300`}>
              <FaSmile className="text-green-400" /> About This Project
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <ul className={`list-none ${darkMode ? "text-gray-300" : "text-gray-700"} text-base space-y-2 transition-colors duration-300`}>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 mt-1 mr-2 flex items-center justify-center text-white text-xs">✓</div>
                  <div>
                    <b>Real-time sentiment analysis</b> for tweets using a fine-tuned DistilBERT model.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 mt-1 mr-2 flex items-center justify-center text-white text-xs">✓</div>
                  <div>
                    <b>Classifies sentiment</b> as <span className="text-red-500 font-semibold">Negative</span>, <span className="text-yellow-500 font-semibold">Neutral</span>, or <span className="text-green-600 font-semibold">Positive</span>.
                  </div>
                </li>
              </ul>
              
              <ul className={`list-none ${darkMode ? "text-gray-300" : "text-gray-700"} text-base space-y-2 transition-colors duration-300`}>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 mt-1 mr-2 flex items-center justify-center text-white text-xs">✓</div>
                  <div>
                    <b>Powered by Gradio</b> for a seamless AI demo experience.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 mt-1 mr-2 flex items-center justify-center text-white text-xs">✓</div>
                  <div>
                    <b>Cloud-deployed</b> model with secure logging and analytics.
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Technology Pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {["Python", "HuggingFace", "DistilBERT", "Gradio", "TensorFlow"].map((tech, i) => (
                <span 
                  key={i} 
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-indigo-700"
                  } transition-colors duration-300`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Recent Analyses */}
          <AnimatePresence>
            {recentAnalyses.length > 0 && (
              <motion.div
                className={`w-full ${darkMode ? "bg-gray-700" : "bg-white"} rounded-xl p-5 mb-6 shadow border ${
                  darkMode ? "border-gray-600" : "border-indigo-100"
                } transition-colors duration-300`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className={`text-lg font-bold mb-3 ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-300`}>
                  Recent Analyses
                </h3>
                
                <div className="space-y-2">
                  {recentAnalyses.map((analysis) => (
                    <div 
                      key={analysis.id}
                      className={`${darkMode ? "bg-gray-800" : "bg-gray-50"} p-3 rounded-lg flex justify-between items-center transition-colors duration-300`}
                    >
                      <div className={`${darkMode ? "text-gray-300" : "text-gray-700"} transition-colors duration-300`}>
                        "{analysis.text}"
                      </div>
                      <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} transition-colors duration-300`}>
                        {analysis.date}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* How it works (collapsible) */}
          <motion.div
            className="w-full mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button
              className={`flex items-center gap-2 ${darkMode ? "text-indigo-400" : "text-indigo-600"} w-full p-3 ${
                darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-indigo-50 hover:bg-indigo-100"
              } rounded-lg font-semibold focus:outline-none transition-colors duration-300`}
              onClick={() => setShowHowItWorks(v => !v)}
            >
              <FaInfoCircle />
              <span>How does it work?</span>
              <span className="ml-auto">
                {showHowItWorks ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            
            <AnimatePresence>
              {showHowItWorks && (
                <motion.div
                  className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white/90 border-indigo-100"} rounded-lg p-5 mt-2 shadow border transition-colors duration-300`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ol className={`list-decimal ml-5 space-y-2 ${darkMode ? "text-gray-300" : "text-gray-700"} transition-colors duration-300`}>
                    <li>Enter your tweet or text in the box above.</li>
                    <li>Click <b>Try Gradio Demo</b> to open the AI-powered sentiment analyzer.</li>
                    <li>See the predicted sentiment and probability scores instantly!</li>
                    <li>All predictions are logged securely for analytics and improvement.</li>
                  </ol>
                  
                  {/* Process Flow */}
                  <div className={`mt-4 p-4 ${darkMode ? "bg-gray-700" : "bg-indigo-50/80"} rounded-lg transition-colors duration-300`}>
                    <div className="flex justify-between items-center">
                      {["Input Text", "Processing", "Analysis", "Results"].map((step, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full ${darkMode ? "bg-indigo-600" : "bg-indigo-500"} flex items-center justify-center text-white font-bold`}>
                            {i + 1}
                          </div>
                          <div className={`text-xs mt-1 font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} transition-colors duration-300`}>
                            {step}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={`h-1 ${darkMode ? "bg-gray-600" : "bg-indigo-200"} mt-5 relative transition-colors duration-300`}>
                      <div className={`h-1 ${darkMode ? "bg-indigo-500" : "bg-indigo-600"} absolute left-0 right-0 transition-colors duration-300`}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02, boxShadow: "0 4px 32px 0 rgba(99,102,241,0.25)" }}
            className={`w-full py-5 rounded-xl ${
              darkMode 
                ? "bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800" 
                : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            } text-white font-bold text-lg shadow-lg transition relative flex items-center justify-center gap-3`}
            onClick={handleRedirect}
            disabled={!tweetText.trim()}
          >
            <span>Try</span>
            <FaArrowRight className="text-xl" />
            {/* Ripple effect */}
            <span className="absolute inset-0 rounded-xl pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 70%)" }} />
          </motion.button>
          
          {/* Button State */}
          {!tweetText.trim() && (
            <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"} text-center transition-colors duration-300`}>
              Please enter some text to analyze
            </p>
          )}
          
          {/* Footer */}
          <footer className={`mt-10 ${darkMode ? "text-gray-400 border-gray-700" : "text-gray-400 border-indigo-100"} text-xs text-center w-full border-t pt-4 transition-colors duration-300`}>
            <div className="flex justify-center gap-4 mb-3">
              <a href="#" className={`${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-indigo-600"} transition-colors duration-300`}>
                <FaTwitter />
              </a>
              <a href="#" className={`${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-indigo-600"} transition-colors duration-300`}>
                <FaGithub />
              </a>
            </div>
            <div>
              <span className="font-semibold text-indigo-500">Made with ❤️ by Your Name</span>
            </div>
            <div className="mt-1">© 2025 Sentiment AI. All rights reserved.</div>
          </footer>
        </motion.div>
      </div>
    </div>
  );
}