import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortedBy = searchParams.get("sortBy") || "name-asc";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      value={sortedBy}
      options={options}
      onChange={handleChange}
      type="white"
    />
  );
}
