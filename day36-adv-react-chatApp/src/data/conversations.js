// Static sample data. No backend needed.
// "sender" is either "user" (you) or "contact" (the other person).

const conversations = [
  {
    id: 1,
    contact: { name: "Rahul", avatar: "https://i.pravatar.cc/100?img=12" },
    status: "Online",
    messages: [
      { id: 1, sender: "contact", text: "Hey! How are you?", timestamp: "10:30 AM" },
      { id: 2, sender: "user", text: "I'm good! Just finishing some work.", timestamp: "10:32 AM" },
      { id: 3, sender: "contact", text: "Nice. Are you joining the meeting?", timestamp: "10:35 AM" },
    ],
  },
  {
    id: 2,
    contact: { name: "Priya", avatar: "https://i.pravatar.cc/100?img=47" },
    status: "Online",
    messages: [
      { id: 1, sender: "contact", text: "Did you see the new design mockups?", timestamp: "9:15 AM" },
      { id: 2, sender: "user", text: "Not yet, sharing the link?", timestamp: "9:20 AM" },
      { id: 3, sender: "contact", text: "Sure, sending it now. Let me know what you think!", timestamp: "9:22 AM" },
    ],
  },
  {
    id: 3,
    contact: { name: "Arjun", avatar: "https://i.pravatar.cc/100?img=15" },
    status: "Offline",
    messages: [
      { id: 1, sender: "user", text: "Are we still on for the game on Saturday?", timestamp: "Yesterday" },
      { id: 2, sender: "contact", text: "Yes! 6 PM at the usual ground.", timestamp: "Yesterday" },
      { id: 3, sender: "user", text: "Perfect, see you there.", timestamp: "Yesterday" },
    ],
  },
  {
    id: 4,
    contact: { name: "Sneha", avatar: "https://i.pravatar.cc/100?img=32" },
    status: "Online",
    messages: [
      { id: 1, sender: "contact", text: "Happy birthday! 🎉", timestamp: "8:00 AM" },
      { id: 2, sender: "user", text: "Thank you so much, Sneha!", timestamp: "8:05 AM" },
      { id: 3, sender: "contact", text: "Let's catch up for dinner this week.", timestamp: "8:07 AM" },
    ],
  },
  {
    id: 5,
    contact: { name: "Karthik", avatar: "https://i.pravatar.cc/100?img=53" },
    status: "Offline",
    messages: [
      { id: 1, sender: "contact", text: "Can you review my pull request today?", timestamp: "Mon" },
      { id: 2, sender: "user", text: "Sure, I'll take a look this afternoon.", timestamp: "Mon" },
    ],
  },
  {
    id: 6,
    contact: { name: "Divya", avatar: "https://i.pravatar.cc/100?img=25" },
    status: "Online",
    messages: [
      { id: 1, sender: "user", text: "Do you have the notes from yesterday's class?", timestamp: "Sun" },
      { id: 2, sender: "contact", text: "Yes, I'll send them over in a bit.", timestamp: "Sun" },
    ],
  },
];

export default conversations;
