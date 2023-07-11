import {  Conversation, Message, Student } from "@prisma/client";

export type FullMessageType = Message & {
  sender: Student, 
  seen: Student[]
};

export type FullConversationType = Conversation & { 
  students: Student[]; 
  messages: FullMessageType[]
};