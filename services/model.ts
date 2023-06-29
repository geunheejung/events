import { ObjectId } from "mongodb";

export class Post {
  id: ObjectId;
  title: string;
  content: string;
  start_date: Date;
  end_date: Date;
  reg_date: Date;

  constructor({ _id, title, content }: EventPayloadType) {
    this.id = new ObjectId(_id);
    this.title = title;
    this.content = content;
    this.start_date = new Date();
    this.reg_date = new Date();
    this.end_date = new Date();
  }
}
