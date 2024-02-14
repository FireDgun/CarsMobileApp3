const formatDate = (date) => {
  const now = new Date();
  const today = new Date(now.setHours(0, 0, 0, 0));
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const messageDate = new Date(date);
  const messageDay = new Date(messageDate);
  messageDay.setHours(0, 0, 0, 0);
  // Formatting the time as HH:MM
  const time = messageDate.toLocaleTimeString("he-IL", {
    hour: "2-digit",
    minute: "2-digit",
  });
  if (messageDay.toDateString() === today.toDateString()) {
    // If the message is from today, return only the time
    return time;
  } else if (messageDay.getTime() === yesterday.getTime()) {
    // If the message is from yesterday, return 'Yesterday'
    return "אתמול";
  } else {
    // If the message is from before yesterday, return the date in MM/DD format
    return messageDate.toLocaleDateString();
  }
};

const formatMessageTime = (messageTimestamp) => {
  let messageDate = new Date(messageTimestamp);
  return messageDate.toLocaleTimeString("he-IL", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDateTodayYesterdayDate = (date) => {
  const now = new Date();
  const today = new Date(now.setHours(0, 0, 0, 0));
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const messageDate = new Date(date);
  const messageDay = new Date(messageDate);
  messageDay.setHours(0, 0, 0, 0);
  // Formatting the time as HH:MM

  if (messageDay.toDateString() === today.toDateString()) {
    // If the message is from today, return only the time
    return "היום";
  } else if (messageDay.getTime() === yesterday.getTime()) {
    // If the message is from yesterday, return 'Yesterday'
    return "אתמול";
  } else {
    // If the message is from before yesterday, return the date in MM/DD format
    return messageDate.toLocaleDateString();
  }
};

const getLastMessageTextAndNameAndTime = (allUsers, chat, myId) => {
  let textAndName = "";
  let timeOfLastMessage = "";
  if (chat?.messages.length > 0) {
    let otherUserName = "את/ה";
    if (chat?.messages[chat?.messages?.length - 1].senderId != myId) {
      otherUserName = allUsers.find(
        (user) =>
          user.uid == chat?.messages[chat?.messages?.length - 1].senderId
      ).name;
    }
    textAndName =
      otherUserName + ": " + chat?.messages[chat?.messages?.length - 1].text ||
      "";
    timeOfLastMessage =
      +chat?.messages[chat?.messages?.length - 1].timestamp.toDate();
    timeOfLastMessage = formatDate(timeOfLastMessage);
  }
  textAndName =
    textAndName.slice(0, 30) + (textAndName.length > 30 ? "..." : "");
  return { textAndName, timeOfLastMessage };
};

const getChatName = (allUsers, chat, myId) => {
  return (
    chat.name ||
    allUsers.find(
      (user) => chat.chatParticipants.includes(user.uid) && user.uid != myId
    ).name
  );
};

const getChatImage = (allUsers, chat, myId) => {
  return (
    chat.image ||
    allUsers.find(
      (user) => chat.chatParticipants.includes(user.uid) && user.uid != myId
    ).profilePic
  );
};
const groupMessagesByDate = (messages) => {
  const groupedMessages = [];
  let lastDate = null;

  messages.forEach((message) => {
    const messageDate = message.timestamp.toDate();
    const formattedDate = formatDateTodayYesterdayDate(messageDate); // Assuming this function can return just the date

    if (formattedDate !== lastDate) {
      groupedMessages.push({ type: "date", date: formattedDate });
      lastDate = formattedDate;
    }

    groupedMessages.push({ type: "message", ...message });
  });

  return groupedMessages;
};
const getColorById = (senderId) => {
  const hash = senderId
    .split("")
    .reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  return `hsl(${hash % 360}, 60%, 50%)`; // HSL color format
};

export {
  getColorById,
  getChatName,
  getLastMessageTextAndNameAndTime,
  formatDateTodayYesterdayDate,
  getChatImage,
  formatMessageTime,
  groupMessagesByDate,
};
