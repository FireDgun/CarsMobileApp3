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
  let otherUserName = "את/ה";
  if (chat?.messages[chat?.messages?.length - 1].senderId == myId) {
    otherUserName = allUsers.find(
      (user) => user.id == chat?.messages[chat?.messages?.length - 1].senderId
    ).name;
  }
  let textAndName =
    otherUserName + ": " + chat?.messages[chat?.messages?.length - 1].text ||
    "";
  let timeOfLastMessage =
    +chat?.messages[chat?.messages?.length - 1].timestamp.toDate();
  timeOfLastMessage = formatDate(timeOfLastMessage);

  return { textAndName, timeOfLastMessage };
};

const getChatName = (allUsers, chat, myId) => {
  return (
    chat.name ||
    allUsers.find(
      (user) => chat.chatParticipants.includes(user.id) && user.id != myId
    ).name
  );
};

const getChatImage = (allUsers, chat, myId) => {
  return (
    chat.image ||
    allUsers.find(
      (user) => chat.chatParticipants.includes(user.id) && user.id != myId
    ).profilePic
  );
};

export {
  getChatName,
  getLastMessageTextAndNameAndTime,
  formatDateTodayYesterdayDate,
  getChatImage,
  formatMessageTime,
};
