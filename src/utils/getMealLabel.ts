import { MealType } from '../constants/meeting';

export const getMealLabel = (type?: MealType) => {
  switch (type) {
    case MealType.lunch:
      return '점심';
    case MealType.dinner:
      return '저녁';
    default:
      return '';
  }
};
