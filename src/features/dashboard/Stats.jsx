import { HiOutlineBriefcase } from "react-icons/hi";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}) {
  const numBookings = bookings.length;

  const totalSales = formatCurrency(
    bookings.reduce((acc, cur) => acc + cur.totalPrice, 0)
  );

  const totalCheckins = confirmedStays.length;

  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        color="blue"
        title="Bookings"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        color="green"
        title="Sales"
        icon={<HiOutlineBanknotes />}
        value={totalSales}
      />
      <Stat
        color="indigo"
        title="Check-ins"
        icon={<HiOutlineCalendarDays />}
        value={totalCheckins}
      />
      <Stat
        color="yellow"
        title="Occupation rate  "
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}
