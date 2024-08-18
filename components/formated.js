export const formatPhoneNumber = (value) => {
    const formattedValue = value.replace(/\D/g, "");
    if (formattedValue.length <= 3) {
      return formattedValue;
    } else if (formattedValue.length <= 6) {
      return `(${formattedValue.slice(0, 3)}) ${formattedValue.slice(3)}`;
    }
    return `(${formattedValue.slice(0, 3)}) ${formattedValue.slice(3, 6)}-${formattedValue.slice(6, 10)}`;
  };
  export const formatPostalCode = (value) => {
    const formattedValue = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    if (formattedValue.length <= 3) {
      return formattedValue;
    }
    return `${formattedValue.slice(0, 3)} ${formattedValue.slice(3, 6)}`;
  };