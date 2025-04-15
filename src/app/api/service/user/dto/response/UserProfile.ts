import { User } from "../../User";

export class UserProfile {
  readonly id?: number;
  readonly nickname?: string;
  readonly role?: string;
  readonly created_at?: Date;
  readonly updated_at?: Date;

  private constructor(props: User) {
    this.id = props.id;
    this.nickname = props.nickname?.value;
    this.role = props.role;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }

  static from(props: User): UserProfile {
    return new UserProfile(props);
  }
}
