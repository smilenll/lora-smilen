import { Meal } from './Meal.enum';

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

  export   const getMenuString = (menu: Meal | undefined) => {
    switch (menu) {
      case menu = Meal.PORK:
        return "Свинско"
      case menu = Meal.FISH:
        return "Риба"
      case menu = Meal.VEGGIE:
        return "Вегетарианско"
    }
  }