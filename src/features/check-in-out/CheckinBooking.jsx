import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import Empty from "../../ui/Empty";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirmed, setConfirmed] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, error, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  let optionalBreakfastPrice = 0;

  const { checkin, isCheckingIn } = useCheckin();

  useEffect(() => {
    setConfirmed(booking?.isPaid ?? false);
    setConfirmed(booking?.isPaid ?? false);
  }, [booking]);

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource="Booking" />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  if (!isLoadingSettings) {
    optionalBreakfastPrice = settings.breakfastPrice * numGuests * numNights;
  }

  function handleCheckin() {
    if (!confirmed) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={addBreakfast}
          onChange={() => {
            setAddBreakfast((b) => !b);
            setConfirmed(false);
          }}
          id="breakfast"
          disabled={isCheckingIn}
        >
          Do you want to add breakfast for ${optionalBreakfastPrice} ?
        </Checkbox>
      </Box>

      <Box>
        <Checkbox
          checked={confirmed}
          onChange={() => setConfirmed((c) => !c)}
          id="confirmed"
          disabled={confirmed || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmed || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
