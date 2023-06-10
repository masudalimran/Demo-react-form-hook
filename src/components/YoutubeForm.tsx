import {
  useForm,
  SubmitHandler,
  useFieldArray,
  FieldErrors,
} from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Fragment, useState } from "react";
import HourglassSpinner from "../utils/HourglassSpinner";
import { GrClose } from "react-icons/gr";

interface IForm {
  name: string;
  email: string;
  age: number;
  dateOfBirth: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  hobbies: {
    title: string;
  }[];
}

const YoutubeForm: React.FC = () => {
  const [disableForm, setDisableForm] = useState(false);
  const [onFormSuccess, setOnFormSuccess] = useState(false);
  const basicEmailRegex =
    /[a-zA-Z0-9.!#$%&'*+\=?^_`{|}~-]{3,}@[a-z]{3,}.{1}[a-z]{2,}([.a-z]{0,6})$/g;
  // const strictEmailRegex =
  //   /[a-zA-Z0-9.!#$%&'*+\=?^_`{|}~-]{3,}@(gmail|hotmail|icloud|yahoo|yandex).com$/g;

  const phoneNumberRegex = /\+?[0-9]{10,}$/g;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting, isSubmitSuccessful },
  } = useForm<IForm>({
    defaultValues: {
      name: "masud",
      email: "masud@gmail.com",
      age: 28,
      dateOfBirth: new Date(
        "Thu Feb 10 2022 06:00:00 GMT+0600 (Bangladesh Standard Time)"
      )
        .toISOString()
        .substring(0, 10),
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      hobbies: [{ title: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "hobbies",
    control,
  });

  const onSubmit: SubmitHandler<IForm> = (data): void => {
    setDisableForm(true);
    setOnFormSuccess(true);
    console.log(data);
    reset();
    setTimeout(() => setDisableForm(false), 1000);
    setTimeout(() => setOnFormSuccess(false), 5000);
  };

  const onError = (errors: FieldErrors<IForm>) => {
    console.log(errors);
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <h1>Youtube Form</h1>

        <label htmlFor="name">
          Name <span>*</span>
        </label>
        <input
          {...register("name", { required: "This field is required" })}
          id="name"
          type="text"
          disabled={disableForm}
        />
        {errors.name && <p role="alert">{errors?.name?.message}</p>}

        <label htmlFor="email">
          Email <span>*</span>
        </label>
        <input
          {...register("email", {
            pattern: { value: basicEmailRegex, message: "Invalid Email" },
            required: "Email is required",
          })}
          id="email"
          type="email"
          disabled={disableForm}
        />
        {errors.email && <p role="alert">{errors?.email?.message}</p>}

        <label htmlFor="age">
          Age <span>*</span>
        </label>
        <input
          {...register("age", {
            valueAsNumber: true,
            min: { value: 0, message: "Minimum value is 0" },
            max: { value: 120, message: "Maximum value is 120" },
            required: "Age is required",
          })}
          id="age"
          type="number"
          disabled={disableForm}
        />
        {errors.age && <p role="alert">{errors?.age?.message}</p>}

        <label htmlFor="dateOfBirth">
          Date Of Birth <span>*</span>
        </label>
        <input
          {...register("dateOfBirth", {
            valueAsDate: true,
            required: "Date Of Birth is required",
          })}
          id="dateOfBirth"
          type="date"
          disabled={disableForm}
        />
        {errors.dateOfBirth && (
          <p role="alert">{errors?.dateOfBirth?.message}</p>
        )}

        <label htmlFor="channel">Channel</label>
        <input
          {...register("channel", {
            minLength: {
              value: 4,
              message: "Minimum character length is 4",
            },
          })}
          id="channel"
          type="text"
          disabled={disableForm}
        />
        {errors.channel && <p role="alert">{errors?.channel?.message}</p>}

        <label htmlFor="twitter">Twitter</label>
        <input
          {...register("social.twitter")}
          id="twitter"
          type="text"
          disabled={disableForm}
        />

        <label htmlFor="facebook">Facebook</label>
        <input
          {...register("social.facebook")}
          id="facebook"
          type="text"
          disabled={disableForm}
        />

        <label htmlFor="primary-phone">Primary Phone Number</label>
        <input
          {...register("phoneNumbers.0", {
            pattern: {
              value: phoneNumberRegex,
              message: "Invalid primary phone Number",
            },
          })}
          id="primary-phone"
          type="text"
          disabled={disableForm}
        />
        {errors.phoneNumbers && errors.phoneNumbers[0] && (
          <p role="alert">{errors?.phoneNumbers[0]?.message}</p>
        )}

        <label htmlFor="secondary-phone">Secondary Phone Number</label>
        <input
          {...register("phoneNumbers.1", {
            pattern: {
              value: phoneNumberRegex,
              message: "Invalid secondary phone Number",
            },
          })}
          id="secondary-phone"
          type="text"
          disabled={disableForm}
        />
        {errors.phoneNumbers && errors.phoneNumbers[1] && (
          <p role="alert">{errors?.phoneNumbers[1]?.message}</p>
        )}

        <label>
          List Of Hobbies <span>( At least one )</span>
        </label>
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <div id="dynamic-fields">
              <input
                {...register(`hobbies.${index}.title` as const, {
                  minLength: {
                    value: 3,
                    message: "Hobby should have at least 3 characters",
                  },
                  required: `You need to fill up your ${
                    index === 0
                      ? index + 1 + "st"
                      : index === 1
                      ? index + 1 + "nd"
                      : index === 2
                      ? index + 1 + "rd"
                      : index + 1 + "th"
                  } Hobby`,
                })}
                type="text"
                disabled={disableForm}
              />
              {fields.length > 1 && (
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => remove(index)}
                >
                  <GrClose />
                </button>
              )}
            </div>
            {errors.hobbies && errors.hobbies[index] && (
              <p role="alert">{errors?.hobbies[index]?.title?.message}</p>
            )}
          </Fragment>
        ))}

        <button
          type="button"
          className="add-btn"
          onClick={() => append({ title: "" })}
        >
          Add Hobby
        </button>

        <button type="submit" disabled={!isDirty}>
          {!isDirty ? "Submit" : !disableForm ? <HourglassSpinner /> : "Submit"}
        </button>
        <p
          role="success"
          style={onFormSuccess ? { opacity: "100%" } : { opacity: "0%" }}
        >
          Form Submitted Successfully
        </p>
      </form>

      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
