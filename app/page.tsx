import { getList } from "@/services/api";
import { headers } from "next/dist/client/components/headers";
import Link from "next/link";

export default async function Home() {
  const res = await getList();

  return (
    <div>
      {res &&
        res.data.map((row) => {
          return (
            <section key={row._id}>
              <Link href={`/${row._id}`}>
                <h3>{row.title}</h3>
                <p>{row.content}</p>
                <div>
                  <span>{row.start_date}</span>
                </div>
              </Link>
            </section>
          );
        })}
    </div>
  );
}
