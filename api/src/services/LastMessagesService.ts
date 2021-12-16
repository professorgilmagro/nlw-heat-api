import MessageRepository from "../repositories/MessageRepository"

class LastMessagesService {
    repository = new MessageRepository()

    async execute() {
        const messages = await this.repository.getLastMessages(3)
        return messages;
    }
}

export default LastMessagesService