import Block from "../../core/block";

interface InputFieldProps {
  type: string;
  placeholder?: string;
  name?: string;
  value?: string;
  className?: "profile__style" | "send-message__text";

  onBlur?: (e: Event) => void;
  onChange?: (e: Event) => void;
}

export default class InputField extends Block {
  constructor(props: InputFieldProps) {

    super("input", {
      ...props,
      attrs: {
        class: `input__element ${props.className ? props.className : ""}`.trim(),
        type: props.type || "text",
        placeholder: props.placeholder || "",
        name: props.name || "",
        value: props.value,
      },
      events: {
        blur: props.onBlur,
        change: props.onChange
      },
    });
  }
  
  public value(): string {
    const inputElement = this.element as HTMLInputElement;
    return inputElement ? inputElement.value : "";
  }

  public fileValue(): FileList | null {
    const inputElement = this.element as HTMLInputElement;
    return inputElement ? inputElement.files : null;
  }
}
