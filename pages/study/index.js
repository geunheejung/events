import path from "path";
import fs from "fs/promises";
import Link from "next/link";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const getData = async () => {
  const root = process.cwd();
  const filePath = path.join(root, "data", "dummy-backend.json") || "";
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data.products;
};

const queryClient = new QueryClient();

const Homepage = ({ products }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ul>
        {products &&
          products.map((row) => {
            return (
              <li key={row.id}>
                <Link href={`/study/${row.id}`}>{row.title}</Link>
              </li>
            );
          })}
      </ul>
    </QueryClientProvider>
  );
};

export const getStaticProps = async () => {
  console.log("Re-Generating...");
  const data = await getData();

  return {
    props: {
      products: data,
    },
    revalidate: 10,
  };
};

export default Homepage;
