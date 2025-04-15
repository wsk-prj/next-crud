import { Nickname } from "./vo/Nickname";

export class User {
  id?: number;
  nickname?: Nickname;
  role?: Role;
  created_at?: Date;
  updated_at?: Date;
  is_deleted?: boolean;

  private constructor(props: UserProps) {
    this.id = props.id;
    this.nickname = props.nickname;
    this.role = props.role;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
    this.is_deleted = props.is_deleted;
  }

  static from(props: UserFactoryProps): User {
    const nickname = Nickname.of(props.nickname);
    const role = "USER";
    return new User({ ...props, nickname, role });
  }

  serialize(): object {
    return {
      id: this.id,
      nickname: this.nickname?.value,
      role: this.role,
      created_at: this.created_at,
      updated_at: this.updated_at,
      is_deleted: this.is_deleted,
    };
  }
}

type UserProps = {
  id?: number;
  nickname?: Nickname;
  role?: Role;
  created_at?: Date;
  updated_at?: Date;
  is_deleted?: boolean;
};

type UserFactoryProps = {
  id?: number;
  nickname?: string;
  role?: string;
  created_at?: Date;
  updated_at?: Date;
  is_deleted?: boolean;
};

type Role = "ADMIN" | "USER";
