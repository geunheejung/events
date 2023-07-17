export {};

declare global {
  interface IResponse<T> {
    status: number;
    message: string;
    data: T;
  }

  interface IEvent {
    _id: ObjectId;
    title: string;
    content: string;
    start_date: string;
    end_date: string;
    reg_date: string;
  }

  interface IMember {
    _id: ObjectId;
    email: string;
    password: string;
    username: string;
    refreshToken: string;
  }

  interface IEventResponse extends IResponse<IEvent[]> {}

  type EventPayloadType = Pick<IEvent, "title" | "content" | "_id">;

  interface ISignUpPayload {
    email: string;
    password: string;
    username: string;
  }

  interface ISignInPayload {
    email: string;
    password: string;
  }

  interface ISignInResponse {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiry: number;
    user: Omit<IMember, "_id">;
  }

  interface ICheckDuplicateNamePayload {
    name: string;
  }
}
