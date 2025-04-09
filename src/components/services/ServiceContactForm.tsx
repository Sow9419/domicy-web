
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from 'lucide-react';

interface ServiceContactFormProps {
  phone: string;
  setPhone: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  availability: string;
  setAvailability: (value: string) => void;
}

const ServiceContactForm: React.FC<ServiceContactFormProps> = ({
  phone,
  setPhone,
  email,
  setEmail,
  availability,
  setAvailability
}) => {
  // Pre-defined availability options
  const availabilityOptions = [
    "7j/7, 24h/24",
    "Lundi-Vendredi, 8h-18h",
    "Lundi-Samedi, 9h-20h",
    "Week-end uniquement",
    "Sur rendez-vous"
  ];

  return (
    <div className="space-y-6 p-4">
      <div className="space-y-2">
        <Label htmlFor="service-phone">Téléphone de contact</Label>
        <Input
          id="service-phone"
          placeholder="Ex: +223 76 XX XX XX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="service-email">Email de contact</Label>
        <Input
          id="service-email"
          type="email"
          placeholder="Ex: contact@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="service-availability">Disponibilité</Label>
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              <Input
                id="service-availability"
                placeholder="Votre disponibilité"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[calc(100vw-2rem)] sm:w-auto p-0">
            <div className="p-2">
              {availabilityOptions.map(option => (
                <div
                  key={option}
                  className="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => {
                    setAvailability(option);
                    document.body.click(); // Close the popover
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ServiceContactForm;
