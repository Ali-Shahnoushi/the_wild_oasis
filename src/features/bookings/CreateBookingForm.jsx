import { useForm, Controller } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { useCreateBooking } from "./useCreateBooking";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import RegisterGuest from "./RegisterGuest";

function CreateCabinForm({ onSubmitForm }) {
  const [stateLevel, setStateLevel] = useState(1);
  const [guestData, setGuestData] = useState({});
  const { register, handleSubmit, reset, getValues, formState, control } =
    useForm({
      defaultValues: {},
    });
  const { errors } = formState;

  const { isCreating, createBooking } = useCreateBooking();

  function handleGusetData(data) {
    setGuestData(data);
    setStateLevel(3);
  }

  function onSubmit(data) {
    const { startDate, numNights } = data;
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + Number(numNights));

    console.log(startDate);
    console.log(endDate);
    createBooking(
      {
        ...data,
        endDate,
        isPaid: false,
        status: "unconfirmed",
        observations: "",
        cabinId: 127,
        guestId: 333,
        hasBreakfast: false,
        cabinPrice: 0,
        extrasPrice: 0,
        totalPrice: 0,
      },
      {
        onSuccess: () => {
          reset();
          onSubmitForm?.();
        },
      }
    );
  }
  // function onError(err) {
  //   // console.log(err);
  // }

  return (
    <>
      {isCreating && <LoadingSpinner />}

      {stateLevel === 3 && (
        // booking cabin
        <Form
          onSubmit={handleSubmit(onSubmit)}
          type={onSubmitForm ? "modal" : "regluar"}
        >
          <FormRow label="Number of nights" error={errors?.numNights?.message}>
            <Input
              type="number"
              id="numNights"
              disabled={isCreating}
              {...register("numNights", {
                required: "this field is required",
                min: {
                  value: 1,
                  message: "number of night should be at least 1",
                },
              })}
            />
          </FormRow>
          <FormRow label="Start date" error={errors?.startDate?.message}>
            <Controller
              control={control}
              name="startDate"
              disabled={isCreating}
              rules={{ required: "Start date is required" }}
              render={({ field }) => (
                <DatePicker
                  id="startDate"
                  enableTabLoop={false}
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  showYearDropdown
                  scrollableMonthYearDropdown
                  customInput={<Input type="text" />}
                />
              )}
            />
          </FormRow>
          <FormRow label="guests number" error={errors?.numGuests?.message}>
            <Input
              type="number"
              id="numGuests"
              disabled={isCreating}
              {...register("numGuests", {
                required: "this field is required",
              })}
            />
          </FormRow>

          <FormRow label="Cabin price" error={errors?.cabinPrice?.message}>
            <Input
              type="number"
              id="cabinPrice"
              disabled={false}
              {...register("cabinPrice", {
                required: "this field is required",
              })}
            />
          </FormRow>

          <FormRow label="Extras price" error={errors?.extrasPrice?.message}>
            <Input
              type="number"
              id="extrasPrice"
              disabled={false}
              {...register("extrasPrice", {
                required: "this field is required",
              })}
            />
          </FormRow>

          <FormRow label="Total price" error={errors?.totalPrice?.message}>
            <Input
              type="number"
              id="totalPrice"
              disabled={false}
              {...register("totalPrice", {
                required: "this field is required",
              })}
            />
          </FormRow>

          <FormRow label="Has Breakfast" error={errors?.hasBreakfast?.message}>
            <Input
              type="checkbox"
              id="hasBreakfast"
              disabled={false}
              {...register("hasBreakfast")}
            />
          </FormRow>

          <FormRow>
            <Button
              variation="secondary"
              type="reset"
              onClick={() => onSubmitForm()}
            >
              Cancel
            </Button>
            <Button disabled={isCreating}>Book the cabin</Button>
          </FormRow>
        </Form>
      )}

      {stateLevel == 1 && (
        <RegisterGuest
          onSubmitForm={() => {
            setStateLevel(2);
          }}
        />
      )}

      {stateLevel == 2 && <RegisterGuest onSubmitForm={handleGusetData} />}
    </>
  );
}

export default CreateCabinForm;
