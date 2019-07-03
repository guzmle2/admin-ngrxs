export interface IUser {
  uid: string;
  name: string;
  password?: string;
  email: string;
}


export class User implements IUser {
  email: string;
  name: string;
  password: string;
  uid: string;

  constructor(obj?: IUser) {
    if (obj && obj.email) {
      this.email = obj.email || null;
    }
    if (obj && obj.name) {
      this.name = obj.name || null;
    }
    if (obj && obj.password) {
      this.password = obj.password || null;
    }
    if (obj && obj.uid) {
      this.uid = obj.uid || null;
    }
  }
}
