import path from "path";
import fs from "fs/promises";
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

const Homepage = ({ product }) => {
  if (!product) return "loading...";

  const { id, title } = product;

  return (
    <QueryClientProvider client={queryClient}>
      <li key={id}>{title}</li>
    </QueryClientProvider>
  );
};

// NextJS가 각 ID에 대해 getStaticProps()를 세 번 호출한다.
export const getStaticProps = async (context) => {
  const { params } = context;
  const productId = params.pid;
  const data = await getData();
  const product = data.find((product) => product.id === productId);
  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: product,
    },
    revalidate: 10,
  };
};
export const getStaticPaths = async () => {
  const products = await getData();
  const productIds = products.map((product) => ({
    params: { pid: product.id },
  }));
  return {
    // paths는 미리 렌더링할 경로를 결정한다. 'params'로 설정하면 동적 세그먼트랑 매칭 되는듯.
    // 각 객체의 값은 params 페이지 이름에 사용된 매개변수와 일치해야 한다. -> study/[pid] -> pid: 'p1',
    // 포괄 경로일 경우 study/[...slug] -> 값을 배열로
    // 사전 렌더링은 -> 빌드타임에 생성할 수 있게 해준다.
    paths: [
      // 아래의 params값들은 동적 세그먼트 식별자에 대한 값이다. -> 아래 값에 매칭되는 페이지를 사전에 렌더링 해주는 듯.
      ...productIds,
    ],
    fallback: true,
  };
};
export default Homepage;
