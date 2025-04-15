export class BoardRequest {
  readonly title: string;
  readonly content: string;

  private constructor(props: BoardRequestProps) {
    this.title = props.title;
    this.content = props.content;
  }

  static from(props: BoardRequestProps): BoardRequest {
    return new BoardRequest(props);
  }
}

interface BoardRequestProps {
  title: string;
  content: string;
}
