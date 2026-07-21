import { useState } from "react";

const faqData = [
  {
    question: "How do I register for campus events?",
    answer: "Go to the Events page, click on any event card, and hit the Register button. You'll get a confirmation with a QR pass for entry."
  },
  {
    question: "How can I join a club?",
    answer: "Visit the Clubs page, browse through available clubs, and click 'Join' on the club you're interested in. Some clubs may require a short interest form."
  },
  {
    question: "Where can I find my class timetable?",
    answer: "Your timetable is available under the Timetable section in the navbar, organized by department and year."
  },
  {
    question: "How do I contact faculty members?",
    answer: "Check the Faculty page for contact details, office hours, and department info of all teaching staff."
  },
  {
    question: "Is there an AI chatbot to help me?",
    answer: "Yes! Click the chatbot icon (bottom corner or navbar) to ask any questions about events, clubs, or campus info anytime."
  },
  {
    question: "How do I check in at an event using the QR code?",
    answer: "After registering, you'll receive a QR pass on your dashboard. Show it at the event entrance for a quick scan-based check-in."
  },
  {
    question: "Who do I contact in case of an emergency?",
    answer: "Refer to the Helpline/Emergency Contacts section for hostel warden, medical, and security numbers."
  },
  {
    question: "How do I get my student ID card?",
    answer: "Visit the Admin Block with your admission letter and a passport-size photo. ID cards are usually issued within 2-3 working days."
  },
  {
    question: "Where can I pay my college fees?",
    answer: "Fees can be paid online through the college portal or offline at the Accounts section in the Admin Block."
  },
  {
    question: "How do I get a bonafide or transfer certificate?",
    answer: "Submit a request form at the Admin Office. Processing usually takes 3-5 working days."
  },
  {
    question: "Is hostel accommodation available for freshers?",
    answer: "Yes, hostel rooms are allotted based on availability. Contact the hostel warden or check the Hostel section for application details."
  },
  {
    question: "How do I find my login credentials for the student portal?",
    answer: "Your login details are sent to your registered email after admission confirmation. Contact the Admin Block if you haven't received them."
  }
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ padding: "30px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "24px" }}>
        Frequently Asked Questions
      </h2>

      {faqData.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            marginBottom: "12px",
            overflow: "hidden",
            boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
          }}
        >
          <div
            onClick={() => toggleFAQ(index)}
            style={{
              padding: "16px 20px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: "600",
              background: openIndex === index ? "#f4a261" : "#fff",
              color: openIndex === index ? "#fff" : "#222",
              transition: "background 0.2s ease",
            }}
          >
            <span>{item.question}</span>
            <span>{openIndex === index ? "−" : "+"}</span>
          </div>

          {openIndex === index && (
            <div style={{ padding: "16px 20px", background: "#fafafa", color: "#444" }}>
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FAQ;