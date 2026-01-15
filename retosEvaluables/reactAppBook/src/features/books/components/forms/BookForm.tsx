import type { Book } from "../../types/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../../../../shared/utils/formValidators";
import Input from "../../../../shared/ui/forms/Input";
import Select from "../../../../shared/ui/forms/Select";
import Button from "../../../../shared/ui/forms/button";
import Textarea from "../../../../shared/ui/forms/Textarea";

type BookFormProps = {
  book?: Book | undefined;
  onSave?: (
    data: Partial<Omit<Book, "id_user" | "id_book" | "rating">>
  ) => void | Promise<void>;
};

type FormData = z.infer<typeof schema>;

export default function BookForm(props: BookFormProps) {
  const { book, onSave } = props;

  // Build initial values and cast to FormData to satisfy TS without changing schema
  const initialValues = {
    title: book?.title ?? "",
    author: book?.author ?? "",
    type: book?.type ?? "",
    price: book?.price ?? undefined,
    image: book?.image ?? "",
    genre: book?.genre ?? "",
    pages: book?.pages ?? undefined,
    year: book?.year ?? undefined,
    sinopsis: book?.sinopsis ?? "",
  } as unknown as FormData;

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      touchedFields,
      isSubmitted,
      isSubmitting,
      isValidating,
      isValid,
      isDirty,
    },
  } = useForm<FormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  // habilitar/deshabilitar botón
  const submitDisabled = isSubmitting || isValidating || !isValid || !isDirty;

  const onSubmit = async (data: FormData) => {
    console.log("modificando/añadiendo libro", data);
    if (onSave) {
      const payload: Partial<Omit<Book, "id_user" | "id_book" | "rating">> = {
        title: data.title,
        author: data.author,
        ...(data.type !== "" ? { type: data.type as Book["type"] } : {}),
        price: data.price,
        image: data.image,
        genre: data.genre,
        pages: data.pages,
        year: data.year,
        sinopsis: data.sinopsis,
      };
      await onSave(payload);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("title")}
        label="Título"
        error={errors.title}
        touched={!!touchedFields.title || isSubmitted}
      />

      <Input
        {...register("author")}
        label="Autor"
        error={errors.author}
        touched={!!touchedFields.author || isSubmitted}
      />

      <Select {...register("type")} label="Tipo">
        <option className="text-dark-a0" value="">
          Selecciona un tipo
        </option>
        <option className="text-dark-a0" value="tapa dura">
          Tapa dura
        </option>
        <option className="text-dark-a0" value="tapa blanda">
          Tapa Blanda
        </option>
        <option className="text-dark-a0" value="epub">
          Epub
        </option>
      </Select>

      <Input
        type="number"
        step="0.01"
        inputMode="decimal"
        {...register("price", {
          setValueAs: (v) => {
            if (v === "" || v === undefined) return undefined;
            return parseFloat(String(v));
          },
        })}
        label="Precio"
        postIcon="€"
        error={errors.price}
        touched={!!touchedFields.price || isSubmitted}
      />

      <Input
        {...register("image")}
        label="Imagen (URL)"
        error={errors.image}
        touched={!!touchedFields.image || isSubmitted}
      />

      <Input
        {...register("genre")}
        label="Género"
        error={errors.genre}
        touched={!!touchedFields.genre || isSubmitted}
      />

      <Input
        type="number"
        step="1"
        inputMode="numeric"
        {...register("pages", {
          setValueAs: (v) => {
            if (v === "" || v === undefined) return undefined;
            return parseInt(String(v), 10);
          },
        })}
        label="Páginas"
        error={errors.pages}
        touched={!!touchedFields.pages || isSubmitted}
      />

      <Input
        type="number"
        step="1"
        inputMode="numeric"
        {...register("year", {
          setValueAs: (v) => {
            if (v === "" || v === undefined) return undefined;
            return parseInt(String(v), 10);
          },
        })}
        label="Año"
        error={errors.year}
        touched={!!touchedFields.year || isSubmitted}
      />

      <Textarea
        {...register("sinopsis")}
        label="Sinopsis"
        error={errors.sinopsis}
        touched={!!touchedFields.sinopsis || isSubmitted}
      />
      <Button
        text={`${book}` ? "Guardar Cambios" : "Guardar libro"}
        type="submit"
        size="lg"
        disabled={submitDisabled}
        aria-disabled={submitDisabled}
      />
    </form>
  );
}
