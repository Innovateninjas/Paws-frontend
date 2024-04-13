// SuccessPage.js
import React,{useState} from "react";
import { Link } from "react-router-dom";
import Background from "../../../Components/backgroundComponent/Background";
import FAQ  from "../../../Components/FAQ/FAQ";


function SuccessPage() {
  const toggleFAQ = index => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };

  const[faqs, setFaqs] = useState([
    {
      question: "How many programmers does it take to screw a lightbulb?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra lorem eu dolor rhoncus, at scelerisque ligula gravida. Sed porta id mi sit amet convallis. Etiam iaculis massa sit amet lacus blandit sodales. Nulla ultrices velit a diam placerat congue. Pellentesque iaculis, ipsum quis eleifend dapibus, est dui eleifend ante, quis fermentum mi ligula quis nisl. Ut et ex dui. Integer id venenatis quam.",
      open: true
    },
    {
      question: "Who is the most awesome person?",
      answer: "You! The viewer!",
      open: false
    },
    {
      question:
        "How many questions does it take to makes a succesful FAQ Page?",
      answer: "This many!",
      open: false
    }
  ]);


  const containerStyle = {
    width: '155px',
    height: '50px',
    background: 'linear-gradient(180deg, rgba(158, 135, 250, 0.35) 0%, rgba(74, 46, 252, 0.54) 100%)',
    boxShadow: '0px 47.54999923706055px 39.68747329711914px rgba(30, 133, 228, 0.26)',
    borderRadius: '88.64px',
    backdropFilter: 'blur(79.37px)'
  };
  return (
    <div className="relative z-[3] h-fit w-full flex flex-col gap-3 justify-center items-center overflow-x-hidden">
      <Background />
      <div className="w-full h-60vh text-center mt-16 pt-[7.5rem] flex flex-col items-center gap-5 justify-center">
      <h2 className="text-purple-950 text-5xl font-normal font-['Bayon'] tracking-widest">Success</h2>
      <div className="w-354 h-354 transform p-6  text-6xl origin-top-left bg-gradient-to-b from-green-300 to-purple-500 shadow-lg rounded-full shadow-black-900/60">✓</div>
      <p p className="w-89 h-32 text-center text-indigo-950 text-opacity-90 text-2xl  font-['Bree Serif'] tracking-widest font-bold">Your report has been successfully submitted</p>
      <div className="flex flex-row items-center w-full justify-evenly">
        <Link to="/" className="w-472 h-175 bg-opacity-40 bg-white shadow-lg rounded-full border-3 p-3 backdrop-blur-2xl text-black text-xl font-normal font-bakbak-one  shadow-black-900/60 hover:shadow-indigo-500/40 ">
          Back to Home
        </Link>
        <Link to="/view-reports" style={containerStyle} className="text-black pt-3 text-xl font-normal font-bakbak-one shadow-black-900/60">
          View Reports
        </Link>
      </div>
        <div className="w-full max-w-[768px] mx-auto p-[13px]">
          {faqs.map((faq, index) => (
            <FAQ faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
          ))}
        </div>
    </div>
    </div>
  );
}

export default SuccessPage;
