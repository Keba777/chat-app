import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService) { }

    async saveMessage(userId: number, room: string, content: string) {
        return this.prisma.message.create({
            data: { userId, room, content },
            include: { user: { select: { username: true } } },
        });
    }
}