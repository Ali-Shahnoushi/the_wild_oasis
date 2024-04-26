import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onSubmitForm }) {
  const { id: editId, ...editvalue } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editvalue : {},
  });
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();

  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isEditing || isCreating;

  function onSubmit(data) {
    const imageValue =
      typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabin: { ...data, image: imageValue }, id: editId },
        {
          onSuccess: () => {
            reset();
            onSubmitForm?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: imageValue },
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
      {isWorking && <LoadingSpinner />}
      <Form
        onSubmit={handleSubmit(onSubmit)}
        type={onSubmitForm ? "modal" : "regluar"}
      >
        <FormRow label="cabin name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            disabled={isWorking}
            {...register("name", { required: "this field is required" })}
          />
        </FormRow>

        <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
          <Input
            type="number"
            id="maxCapacity"
            disabled={isWorking}
            {...register("maxCapacity", {
              required: "this field is required",
              min: {
                value: 1,
                message: "Capacity should be at least 1",
              },
            })}
          />
        </FormRow>

        <FormRow label="Regular price" error={errors?.regularPrice?.message}>
          <Input
            type="number"
            id="regularPrice"
            disabled={isWorking}
            {...register("regularPrice", {
              required: "this field is required",
              min: {
                value: 1,
                message: "Capacity should be at least 1",
              },
            })}
          />
        </FormRow>

        <FormRow label="discount" error={errors?.discount?.message}>
          <Input
            type="number"
            id="discount"
            disabled={isWorking}
            defaultValue={0}
            {...register("discount", {
              required: "this field is required",
              validate: (value) => {
                return (
                  +value < +getValues().regularPrice ||
                  "Discount should be less than regular price"
                );
              },
            })}
          />
        </FormRow>

        <FormRow label="description" error={errors?.description?.message}>
          <Textarea
            {...register("description", { required: "this field is required" })}
            type="number"
            id="description"
            defaultValue=""
            disabled={isWorking}
          />
        </FormRow>

        <FormRow label="image" error={errors?.image?.message}>
          <FileInput
            id="image"
            accept="image/*"
            {...register("image", {
              required: isEditSession ? false : "this field is required",
            })}
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
          <Button disabled={isWorking}>
            {isEditSession ? "Edit cabin" : "Add cabin"}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateCabinForm;
