import { Meal } from "./Meal.enum";

export function handleSubmit(
  event: any,
  callback: () => void,
  setValidated: (value: boolean) => void
) {
  const form = event.currentTarget;
  event.preventDefault();
  if (form.checkValidity() === false) {
    event.stopPropagation();
  } else {
    callback();
  }
  setValidated(true);
}

export const getMenuString = (menu: Meal | undefined) => {
  switch (menu) {
    case (Meal.PORK):
      return "Меню със свинско";
    case (Meal.FISH):
      return "Меню с риба";
    case (Meal.VEGGIE):
      return "Вегетарианско меню";
  }
};

export const registeredStyle = (reg: boolean): any => {
  if (reg) {
    return { backgroundColor: "rgb(0, 192, 1, 0.1)"};
  }
  return { backgroundColor: "rgb(230, 0, 0, 0.1)"};
};
