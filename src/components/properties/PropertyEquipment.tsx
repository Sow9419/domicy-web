import React from 'react'
import { Tv, Car, Home, Wind, Snowflake, Waves, Coffee, Utensils, Wifi, Gamepad, Leaf, WashingMachine, Bed, AlertCircle, Sofa, Armchair } from 'lucide-react'

interface EquipmentProps {
  type: string
  label: string
  available: boolean
}

const Equipment = ({ type, label, available }: EquipmentProps) => {
  const getIcon = () => {
    switch (type) {
      case "tv":
        return <Tv size={20} className={available ? "text-primary" : "text-gray-400"} />
      case "garage":
        return <Car size={20} className={available ? "text-primary" : "text-gray-400"} />
      case "meuble":
        return <Sofa size={20} className={available ? "text-primary" : "text-gray-400"} />
      case "clim":
        return <Wind size={20} className={available ? "text-primary" : "text-gray-400"} />
      case "frigo":
        return <Snowflake size={20} className={available ? "text-primary" : "text-gray-400"} />
      case "piscine":
        return <Waves size={20} className={available ? "text-primary" : "text-gray-400"} />
      case "cafe":
        return <Coffee size={20} className={available ? "text-primary" : "text-gray-400"} />
      case "cuisine":
        return <Utensils size={20} className={available ? "text-primary" : "text-gray-400"} />
      case "wifi":
        return <Wifi size={20} className={available ? "text-primary" : "text-gray-400"} />
      case "jeux":
        return <Gamepad size={20} className={available ? "text-primary" : "text-gray-400"} />
      case "jardin":
        return <Leaf size={20} className={available ? "text-primary" : "text-gray-400"} />

      case "lave-linge":
        return <WashingMachine size={20} className={available ? "text-primary" : "text-gray-400"} />
      case "lit":
        return <Bed size={20} className={available ? "text-primary" : "text-gray-400"} />
      default:
        return <Home size={20} className="text-gray-500" />
    }
  }

  return (
    <div className={`flex items-center p-1 ${available ? "bg-white" : "bg-gray-100"} rounded-full shadow-md border ${available ? "border-gray-100" : "border-gray-200"}`}>
      <div className={`${available ? "bg-primary/10" : "bg-gray-200"} rounded-full p-2 mr-3 flex items-center justify-center`}>{getIcon()}</div>
      <div className="flex flex-col">
        <span className={`text-sm font-medium ${available ? "text-gray-700" : "text-gray-400 line-through"}`}>{label}</span>
        {!available && (
          <div className="flex items-center text-xs text-red-500">
            <AlertCircle size={12} className="mr-1" />
            <span>Non disponible</span>
          </div>
        )}
      </div>
    </div>
  )
}

interface PropertyEquipmentProps {
  equipments?: Array<{
    name: string
    available: boolean
    type: string
  }>
}

const PropertyEquipment = ({ equipments }: PropertyEquipmentProps) => {
  // Liste complète de tous les équipements possibles
  const allEquipments = [
    { type: "garage", name: "Voiture Garage", available: false },
    { type: "meuble", name: "Meuble Déco", available: false },
    { type: "tv", name: "TV Smart 4K", available: false },
    { type: "clim", name: "Climatisation", available: false },
    { type: "frigo", name: "Réfrigérateur", available: false },
    { type: "piscine", name: "Piscine", available: false },
    { type: "cafe", name: "Machine à Café", available: false },
    { type: "cuisine", name: "Cuisine Équipée", available: false },
    { type: "lave-linge", name: "Machine à Laver", available: false },
    { type: "jardin", name: "Jardin", available: false },
    { type: "wifi", name: "WiFi", available: false },
    { type: "lit", name: "Lit", available: false }
  ]

  // Fusionner les équipements de la propriété avec la liste complète
  const displayEquipments = allEquipments.map(defaultEquip => {
    const propertyEquip = equipments?.find(e => e.type === defaultEquip.type)
    return propertyEquip || defaultEquip
  })

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-4">Équipements</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 equipment-grid">
        {displayEquipments.map((equipment, index) => (
          <Equipment 
            key={index} 
            type={equipment.type} 
            label={equipment.name} 
            available={equipment.available} 
          />
        ))}
      </div>
    </div>
  )
}

export default PropertyEquipment
