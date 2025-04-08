
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ContactHistoryItem {
  id: string;
  propertyName: string;
  location: string;
  lastContact: string;
  hasUnread?: boolean;
}

interface ContactHistorySectionProps {
  contacts: ContactHistoryItem[];
}

const ContactHistorySection = ({ contacts }: ContactHistorySectionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          Historique des contacts propriétaire
          {contacts.some(c => c.hasUnread) && (
            <span className="ml-2 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Clock className="h-12 w-12 text-gray-300 mb-2" />
            <p className="text-gray-500">Vous n'avez pas encore contacté de propriétaires</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact, index) => (
              <React.Fragment key={contact.id}>
                {index > 0 && <Separator />}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">{contact.propertyName}</h3>
                      {contact.hasUnread && (
                        <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">
                          Nouveau
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm">{contact.location}</p>
                    <p className="text-gray-500 text-sm">Dernier contact: {contact.lastContact}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="icon" className="rounded-full bg-green-500 hover:bg-green-600">
                      <Phone size={16} />
                    </Button>
                    <Button size="icon" className="rounded-full bg-green-500 hover:bg-green-600">
                      <MessageCircle size={16} />
                    </Button>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactHistorySection;
