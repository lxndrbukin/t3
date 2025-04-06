interface CreatePopupProps {
  setIsVisible: (isVisible: boolean) => void;
}

export interface CreateTaskProps extends CreatePopupProps {}
export interface CreateCategoryProps extends CreatePopupProps {}
