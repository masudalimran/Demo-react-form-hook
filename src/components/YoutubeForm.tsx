import { useForm, SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import HourglassSpinner from "../utils/HourglassSpinner";

interface IForm {
  name: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
}

const YoutubeForm: React.FC = () => {
  const [disableForm, setDisableForm] = useState(false);

  const basicEmailRegex =
    /[a-zA-Z0-9.!#$%&'*+\=?^_`{|}~-]{3,}@[a-z]{3,}.{1}[a-z]{2,}([.a-z]{0,6})$/g;
  const strictEmailRegex =
    /[a-zA-Z0-9.!#$%&'*+\=?^_`{|}~-]{3,}@(gmail|hotmail|icloud|yahoo|yandex).com$/g;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      name: "",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
    },
  });

  const onSubmit: SubmitHandler<IForm> = (data): void => {
    setDisableForm(true);
    console.log(data);
    setTimeout(() => setDisableForm(false), 2000);
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1>Youtube Form</h1>

        <label htmlFor="name">Name</label>
        <input
          {...register("name", { required: "This field is required" })}
          id="name"
          type="text"
          disabled={disableForm}
        />
        {errors.name && <p role="alert">{errors?.name?.message}</p>}

        <label htmlFor="email">Email</label>
        <input
          {...register("email", {
            pattern: { value: basicEmailRegex, message: "Invalid Email" },
            required: "Email is required",
            validate: {
              doesNotEndWithDotCom: (fieldValue) =>
                fieldValue.endsWith("com") || "Only .com allowed",
              strictEmailCheck: (fieldValue) =>
                strictEmailRegex.test(fieldValue) ||
                "We only support gmail, hotmail, icloud, yahoo & yandex emails",
            },
          })}
          id="email"
          type="email"
          disabled={disableForm}
        />
        {errors.email && <p role="alert">{errors?.email?.message}</p>}

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

        <button type="submit" disabled={disableForm}>
          {disableForm ? <HourglassSpinner /> : "Submit"}
        </button>
      </form>

      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
