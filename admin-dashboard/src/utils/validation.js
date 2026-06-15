export const validateName = (name) => {
    if (!name.trim()) {
        return "Name is required";
    }
    if (name.length < 20) {
        return "Name must be at least 20 characters";
    }
    if (name.length > 60) {
        return "Name must not exceed 60 characters";
    }
    return "";
};

export const validateEmail = (email) => {
    if (!email.trim()) {
        return "Email is required";
    }
    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Invalid email format";
    }
    return "";
};

export const validateAddress = (address) => {
    if (!address.trim()) {
        return "Address is required";
    }
    if (address.length > 400) {
        return "Address cannot exceed 400 characters";
    }
    return "";
};

export const validatePassword = (password) => {
    if (!password) {
        return "Password is required";
    }
    const passwordRegex =
        /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;
    if (!passwordRegex.test(password)) {
        return (
            "Password must be 8-16 characters, contain at least one uppercase letter and one special character"
        );
    }
    return "";
};

export const validateUserForm = (
    formData
) => {
    const errors = {};

    const nameError = validateName(
        formData.name
    );

    const emailError = validateEmail(
        formData.email
    );

    const addressError = validateAddress(
        formData.address
    );

    const passwordError = validatePassword(
        formData.password
    );

    if (nameError) errors.name = nameError;

    if (emailError)
        errors.email = emailError;

    if (addressError)
        errors.address = addressError;

    if (passwordError)
        errors.password = passwordError;

    return errors;
};



export const validateStoreForm = (
  formData
) => {
  const errors = {};

  const nameError = validateName(
    formData.name
  );

  const emailError = validateEmail(
    formData.email
  );

  const addressError = validateAddress(
    formData.address
  );

  if (nameError) errors.name = nameError;

  if (emailError)
    errors.email = emailError;

  if (addressError)
    errors.address = addressError;

  if (!formData.ownerId) {
    errors.ownerId =
      "Store owner is required";
  }

  return errors;
};