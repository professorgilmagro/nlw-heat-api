import { io } from "../app";
import MessageRepository from "../repositories/MessageRepository"

class CreateMessageService {
    repository = new MessageRepository()
    
    async execute(text: string, userId: string) {
        const message = await this.repository.create(text, userId)

        const infoWS = {
            text,
            user_id: userId,
            created_at: message.created_at,
            user: {
                name: message.user.name,
                avatar_url: message.user.avatar_url
            }
        }
        
        io.emit("new_message", infoWS);

        return message;
    }
}

export default CreateMessageService