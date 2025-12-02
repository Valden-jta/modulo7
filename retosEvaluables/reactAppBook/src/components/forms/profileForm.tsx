import { useForm } from "react-hook-form";
import { emailRegex, passwordRegex } from "./FormValidators";
import Input from "../ui/forms/Input";

type FormData = {
  userFullName: string;
  userNickName: string;
  userRole: string;
  email: string;
  password: string;
  repeatPassword: string;
};
export default function profileForm() {
  const { register, handleSubmit, formState } = useForm<FormData>();

  const onSubmit = (data: FormData) => console.log(data);

  return <form onSubmit={handleSubmit(onSubmit)}>
    <Input {...register("userFullName")} />
    <Input {...register("email",{required: "email obligatorio", pattern: {value:emailRegex, message:"El formato de email no es correcto"}})} />
    <Input {...register()} />
    <Input {...register()} />
    <Input {...register()} />
    <Input {...register()} />
  </form>;
}
