import React from "react";
import styles from "./FAQ.module.css";

const FAQ = ({ faq, index, toggleFAQ }) => {
    return (
        <div
            className="m-[13px] p-[15px] bg-white rounded-xl "
            style={{ boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)"}}
            key={index}
            onClick={() => toggleFAQ(index)}
        >
            <div className={" text-lg pr-20 transition-all duration-400 ease-in-out " + styles.faqQuestion+(faq.open? "mb-4" : "" )}>{faq.question}</div>
            <div className="opacity-0  max-h-0  overflow-hidden transition-all duration-400 ease-in-out" >{faq.answer}</div>
        </div>
    );
};

export default FAQ;
