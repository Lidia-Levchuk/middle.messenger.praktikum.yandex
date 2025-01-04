import InputField from "./inputField";

import Block from "../../core/block";

interface InputProps {
  label: string;
  labelColor?: "black";
  error?: string;
  type: string;
  placeholder?: string;
  name?: string;
  value?: string;
  className?: "profile__style" | "send-message__text";
  wrapperClass?: "input--no-events" | "input--search" | "input--message";

  onBlur?: (e: Event) => void;
  onChange?: (e: Event) => void;
}

export default class Input extends Block {
  constructor(props: InputProps) {

    super("div", {
      ...props,
      attrs: {
        class: `input ${props.className ? props.className : ""}`.trim(),
      },
      InputField: new InputField({
        type: props.type,
        placeholder: props.placeholder,
        name: props.name,
        value: props.value || "",
        className: props.className,
        onBlur: props.onBlur,
        onChange: props.onChange,
      })
    });
  }

  public value(): string {
    return (this.children.InputField as InputField).value();
  }
  public fileValue(): FileList | null {
    return (this.children.InputField as InputField).fileValue();
  }

  render(): string {
    return `
      <label class="input__container ${this.props.error ? 'input__error' : ''} ${this.props.wrapperClass ? this.props.wrapperClass : ""}`.trim() + `">
        {{{InputField}}}
        <div class="input__label ${this.props.labelColor ? 'input__label--black' : ''}`.trim() + `">{{{label}}}</div>
        <div class="input__text-error">{{{error}}}</div>
      </label>
    `;
  }
}
