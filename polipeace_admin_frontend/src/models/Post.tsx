export interface Post {
  [x: string]: any;
  id: number;
  username: string,
  user_id: number;
  description: string;
  picture_url: string | null;
}
