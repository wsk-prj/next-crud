export class UserRequest {
  readonly nickname: string;

  private constructor(nickname: string) {
    this.nickname = nickname;
  }

  static from(props: UserRequestProps): UserRequest {
    return new UserRequest(props.nickname);
  }
}

interface UserRequestProps {
  nickname: string;
}
