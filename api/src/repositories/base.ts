import { PrismaClient } from ".prisma/client";
abstract class RepositoryBase{
    client:PrismaClient = new PrismaClient()
}

export default RepositoryBase ;