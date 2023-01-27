export function handleSubmit (event: any, callback: () => void, setValidated: (value: boolean)=> void) {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      
      event.stopPropagation();
    } else {
      callback()
    }
    setValidated(true)
  };