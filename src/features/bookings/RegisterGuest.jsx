import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { useCreateGuest } from "./useCreateGuest";

function CreateGuest({ onSubmitForm }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: {},
  });
  const { errors } = formState;

  const { isCreating, createGuest } = useCreateGuest();

  function onSubmit(data) {
    const guestData = {
      ...data,
      countryFlag: "https://flagcdn.com/ir.svg",
      nationality: "Iranian",
      nationalID: "IRI",
    };
    createGuest(guestData, {
      onSuccess: () => {
        reset();
        onSubmitForm?.(guestData);
        console.log(guestData);
      },
    });
  }

  return (
    <>
      {isCreating && <LoadingSpinner />}
      <Form onSubmit={handleSubmit(onSubmit)} type="regluar">
        <FormRow label="full name" error={errors?.fullName?.message}>
          <Input
            type="text"
            id="fullName"
            disabled={isCreating}
            {...register("fullName", { required: "this field is required" })}
          />
        </FormRow>

        <FormRow label="Email" error={errors?.email?.message}>
          <Input
            type="email"
            id="email"
            disabled={isCreating}
            {...register("email", { required: "this field is required" })}
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
          <Button disabled={isCreating}>register guest</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateGuest;
