import { getList } from "@/services/api";
import { headers } from "next/dist/client/components/headers";
import Link from "next/link";
import "@/styles/post.scss";
import { AiFillHeart, AiFillRedditCircle } from "react-icons/ai";

export const Board = ({ data }: { data: IEvent[] }) => {
  if (!data) return null;

  const review = 9;
  const username = "easylogic";
  const likes = 125;

  return (
    <div className="post-list-container">
      {data.map((row) => {
        return (
          <Link href={`/${row._id}`} key={row._id}>
            <article key={row._id} className="post-item">
              <section>
                <div className="header">{row.title}</div>
                <div className="content">{row.content}</div>
                <div className="info">
                  <span className="date">2023년 6월 13일</span>
                  <span>·</span>
                  <span>{review}개의 댓글</span>
                </div>
              </section>
              <section className="footer">
                <div className="left">
                  <AiFillRedditCircle style={{ width: 24, height: 24 }} />
                  <span>by</span>
                  <strong>{username}</strong>
                </div>
                <div>
                  <AiFillHeart style={{ width: 24, height: 24 }} />
                  {likes}
                </div>
              </section>
            </article>
          </Link>
        );
      })}
    </div>
  );
};

export default async function Home() {
  const res = await getList();

  return <Board data={res.data} />;
}
