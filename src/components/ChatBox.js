// src/components/ChatBox.js
import React, { useEffect } from "react";

const ChatBox = () => {
  useEffect(() => {
    // Append the script to the document head
    const script1 = document.createElement("script");
    script1.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "I234O6GJ96ZT6cH1ZUkWM",
        domain: "www.chatbase.co"
      };
    `;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://www.chatbase.co/embed.min.js";
    script2.setAttribute("chatbotId", "I234O6GJ96ZT6cH1ZUkWM");
    script2.setAttribute("domain", "www.chatbase.co");
    script2.defer = true;
    document.head.appendChild(script2);

    return () => {
      // Clean up the scripts when the component unmounts
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return null; // No need to render anything
};

export default ChatBox;
