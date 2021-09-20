type InputValidationField = "id" | "firstName" | "lastName" | "email" | "phone";

type ValidationState = {
    hasError: boolean;
    errorText?: string;
}

type InputsValidationType = Record<InputValidationField, ValidationState>;

export default InputsValidationType;