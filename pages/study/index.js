import path from "path";
import fs from "fs/promises";

const Homepage = ({ products }) => {
  return (
    <ul>
      {products &&
        products.map((row) => {
          return <li key={row.id}>{row.title}</li>;
        })}
    </ul>
  );
};

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
  };
};

export default Homepage;
