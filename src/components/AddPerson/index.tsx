import React, { memo, useState } from "react";
import "./styles.css";
import useInput from "../../hooks/input";
import InputsValidationType from "../../types/InputsValidationType";
import InputMask from "react-input-mask";
import PersonType from "../../types/Person";

type Props = {
    addNewPerson: (person: PersonType) => void;
};

const AddPerson: React.FC<Props> = (props) => {
    const [modalShow, setModalShow] = useState(false);

    const closeModal = () => {
        setModalShow(false);
        id.setValue("");
        firstName.setValue("");
        lastName.setValue("");
        email.setValue("");
        phone.setValue("");
    };


    const id = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const email = useInput("");
    const phone = useInput("");


    const [inputsValidationState, setInputsValidationState] = useState<InputsValidationType>(getInputsValidationInitialState);

    function getInputsValidationInitialState() {
        return {
            id: {
                hasError: false,
            },
            firstName: {
                hasError: false,
            },
            lastName: {
                hasError: false,
            },
            email: {
                hasError: false,
            },
            phone: {
                hasError: false,
            }
        }
    }

    function resetInputsValidationInitialState() {
        setInputsValidationState(getInputsValidationInitialState());
    }


    const validateId = (id: string) => {
        id = id.trim();
        if (id === "") {
            return {
                hasError: true,
                errorText: "Необходимо заполнить поле",
            }
        }

        const idNumber = Number(id);
        if (isNaN(idNumber)) {
            return {
                hasError: true,
                errorText: "Значение должно быть числом",
            }
        }

        return {
            hasError: false
        }
    };

    const validateName = (name: string) => {
        name = name.trim();

        if (name === "") {
            return {
                hasError: true,
                errorText: "Необходимо заполнить поле",
            }
        }

        const pattern = /^[a-z]*$/i;
        if (!pattern.test(name)) {
            return {
                hasError: true,
                errorText: "Разрешены только буквы латинского алфавита",
            }
        }

        return {
            hasError: false
        }
    };

    const validateEmail = (email: string) => {
        email = email.trim();

        if (email === "") {
            return {
                hasError: true,
                errorText: "Необходимо заполнить поле",
            }
        }

        const pattern = /^([\w.-]+)@([\w-]+)((\.(\w){2,3})+)$/;
        if (!pattern.test(email)) {
            return {
                hasError: true,
                errorText: "Неправильный формат адреса",
            }
        }

        return {
            hasError: false
        }
    };

    const validatePhone = (phone: string) => {
        if (phone === "") {
            return {
                hasError: true,
                errorText: "Необходимо заполнить поле",
            }
        }

        const pattern = /^\(\d{3}\)\d{3}-\d{4}$/;
        if (!pattern.test(phone)) {
            return {
                hasError: true,
                errorText: "Укажите телефон в формате (ххх)ххх-хххх",
            }
        }

        return {
            hasError: false
        }
    };

    const handleSubmit = () => {
        const idState = validateId(id.value);
        const firstNameState = validateName(firstName.value);
        const lastNameState = validateName(lastName.value);
        const emailState = validateEmail(email.value);
        const phoneState = validatePhone(phone.value);

        if (!idState.hasError &&
            !firstNameState.hasError &&
            !lastNameState.hasError &&
            !emailState.hasError &&
            !phoneState.hasError
        ) {
            props.addNewPerson({
                id: Number(id.value),
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                phone: phone.value,
            } as PersonType);

            closeModal();

            resetInputsValidationInitialState();
        } else {
            setInputsValidationState({
                id: idState,
                firstName: firstNameState,
                lastName: lastNameState,
                email: emailState,
                phone: phoneState,
            });
        }
    };

    const isAddButtonActive = id.value && firstName.value && lastName.value && email.value && phone.value;

    return (
        <>
            <button className="btn btn-success" onClick={() => setModalShow(true)}>
                Добавить
            </button>

            <div className={`modal ${modalShow ? "modal--show" : ""}`}>
                <div className="modal__background" onClick={closeModal} />
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Добавить пользователя</h5>
                        <button type="button" className="btn-close" onClick={closeModal} />
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="id" className="form-label">ID</label>
                                <input type="text" className="form-control" id="id" {...id.bind} />
                                {inputsValidationState.id.hasError &&
                                    <div className="form-text text-danger">{inputsValidationState.id.errorText}</div>
                                }
                            </div>

                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input type="text" className="form-control" id="firstName" {...firstName.bind} />
                                {inputsValidationState.firstName.hasError &&
                                    <div className="form-text text-danger">{inputsValidationState.firstName.errorText}</div>
                                }
                            </div>

                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input type="text" className="form-control" id="lastName" {...lastName.bind} />
                                {inputsValidationState.lastName.hasError &&
                                    <div className="form-text text-danger">{inputsValidationState.lastName.errorText}</div>
                                }
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="text" className="form-control" id="email" {...email.bind} />
                                {inputsValidationState.email.hasError &&
                                    <div className="form-text text-danger">{inputsValidationState.email.errorText}</div>
                                }
                            </div>

                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <InputMask mask="(999)999-9999" id="phone" {...phone.bind}>
                                    {(inputProps: Record<string, string>) => <input type="text" className="form-control" {...inputProps} />}
                                </InputMask>
                                {inputsValidationState.phone.hasError &&
                                    <div className="form-text text-danger">{inputsValidationState.phone.errorText}</div>
                                }
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" disabled={!isAddButtonActive} onClick={handleSubmit}>
                            Сохранить
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(AddPerson);
