import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

export default function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  //* FILTER

  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;
  if (!isLoading) {
    if (filterValue === "all") filteredCabins = cabins;
    if (filterValue === "with-discount")
      filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
    if (filterValue === "no-discount")
      filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }

  //* SORT
  const sortValue = searchParams.get("sortBy") || "created_at-asc";
  const [field, direction] = sortValue.split("-");
  let sortedCabins;
  const modifier = direction === "asc" ? 1 : -1;
  if (!isLoading) {
    sortedCabins = filteredCabins.sort(
      (a, b) => (a[field] - b[field]) * modifier
    );
  }

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resource="Cabins" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>cabin</div>
          <div>capacity</div>
          <div>price</div>
          <div>discount</div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}
