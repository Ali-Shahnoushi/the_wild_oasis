import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

export default function CabinTableOperation() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { label: "All", value: "all" },
          { label: "No discount", value: "no-discount" },
          { label: "With discount", value: "with-discount" },
        ]}
      />
      <SortBy
        options={[
          { label: "Sort by name (A-Z)", value: "name-asc" },
          { label: "Sort by name (Z-A)", value: "name-desc" },
          { label: "Sort by price (Lowest)", value: "regularPrice-asc" },
          { label: "Sort by price (Highest)", value: "regularPrice-desc" },
          { label: "Sort by capacity (Lowest)", value: "maxCapacity-asc" },
          { label: "Sort by capacity (Highest)", value: "maxCapacity-desc" },
        ]}
      />
    </TableOperations>
  );
}
