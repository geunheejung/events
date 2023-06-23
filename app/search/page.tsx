"use client";

import _debounce from "lodash/debounce";
import { useCallback, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { getItemByKeyword } from "@/services/api";
import { Board } from "@/app/page";

const SearchForm = ({ onSubmit }: { onSubmit: (keyword: string) => void }) => {
  const [keyword, setKeyword] = useState("");
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = e;

      setKeyword(value);
    },
    [keyword]
  );

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      onSubmit(keyword);
    }
  };

  return (
    <div className="search-field">
      <AiOutlineSearch style={{ width: 17, height: 17 }} />
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        onChange={handleSearch}
        onKeyDown={handleKeydown}
      />
    </div>
  );
};

const Search = () => {
  const [result, setResult] = useState<IEvent[]>([]);

  const handleSubmit = async (keyword: string) => {
    const res = await getItemByKeyword({ keyword });

    console.log("res ->", res);

    setResult(res);
  };
  return (
    <div className="search-container">
      <SearchForm onSubmit={handleSubmit} />

      {result && <Board data={result} />}
    </div>
  );
};

export default Search;
