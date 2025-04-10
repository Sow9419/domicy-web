
import React from 'react';

interface PropertyDescriptionProps {
  description: string;
}

const PropertyDescription = ({ description }: PropertyDescriptionProps) => {
  return (
    <div className="mt-4">
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default PropertyDescription;
