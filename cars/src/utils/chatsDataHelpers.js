const getLastMessageTextAndName = (allUsers, chat) => {
  let otherUserName = allUsers.find(
    (user) => user.id == chat?.messages[chat?.messages?.length - 1].senderId
  ).name;
  let result =
    otherUserName + ": " + chat?.messages[chat?.messages?.length - 1].text ||
    "";
  return result;
};

const getChatName = (allUsers, chat) => {
  return (
    chat.name ||
    allUsers.find(
      (user) => user.id == chat?.messages[chat?.messages?.length - 1].senderId
    ).name
  );
};

export { getChatName, getLastMessageTextAndName };
