


import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/Message";

/**
 * The data access object for messages
 */
export default class MessageDao{
  private static messageDao: MessageDao | null = null;
  public static getInstance = (): MessageDao => {
    if (MessageDao.messageDao === null) {
      MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
  }

  private constructor() {
  }

  /**
   * Creates a message
   * @param message the message to be created
   */
  messageUser = async (message: Message): Promise<any> => {
    return MessageModel.create(message);
  }


  /**
   * Deteles a message
   * @param mid the id of the message to delete
   */
  deleteMessage = async (mid: string): Promise<any> => {
    MessageModel.deleteOne({_id: mid});
  }

  /**
   * Gets all the messages a user has sent
   * @param uid the user id
   */
  messagesISent = async (uid: string): Promise<any> => {
    return MessageModel
    .find({fromUser: uid})
    .populate("toUser")
    .exec();
  }

  /**
   * Gets all the messages a user has recieved
   * @param uid the user id
   */
  messagesSentToMe = async (uid: string): Promise<any> => {
    return MessageModel
    .find({toUser: uid})
    .populate("fromUser")
    .exec();
  }

  /**
   * Deletes all the messages
   */
  deleteAllMessages = async (): Promise<any> => {
    return MessageModel
        .deleteMany({})
  }

  /**
   * Gets all the messages
   */
  getAllMessages= async (): Promise<any> => {
    return MessageModel
        .find()
        .exec();
  }
  getMsgBetweenUsers = async (uid1: string, uid2: string): Promise<any> => {
    if (uid1 === "undefined" || uid2 === "undefined") {
      return []
    }

    return MessageModel
        .find({
          $or: [
            { fromUser: uid1, toUser: uid2 },
            { fromUser: uid2, toUser: uid1 }
          ]
        })
        .exec();
  }
}