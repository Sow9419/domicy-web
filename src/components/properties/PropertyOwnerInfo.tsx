
import React from 'react';
import { UserCheck } from 'lucide-react';

interface PropertyOwnerInfoProps {
  ownerName: string;
  ownerStatus: string;
}

const PropertyOwnerInfo = ({ ownerName, ownerStatus }: PropertyOwnerInfoProps) => {
  return (
    <div className="mt-8 pb-5 border-b md:hidden">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
          <span className="text-lg font-medium">{ownerName.charAt(0)}</span>
        </div>
        <div>
          <p className="font-medium flex items-center">
            {ownerName}
            <UserCheck size={16} className="ml-2 text-primary" />
          </p>
          <p className="text-sm text-gray-600">{ownerStatus}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyOwnerInfo;
