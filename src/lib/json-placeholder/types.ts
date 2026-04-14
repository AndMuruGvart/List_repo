/** Shape returned by `GET /posts` and `GET /posts/:id`. */
export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
