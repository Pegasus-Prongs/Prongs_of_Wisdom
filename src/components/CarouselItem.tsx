import React, { ReactNode } from 'react';

interface CarouselItemProps {
  children: ReactNode;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ children }) => {
  return (
    <div className="relative w-full h-full bg-gray-200">
      {children}
    </div>
  );
};

export default CarouselItem;
