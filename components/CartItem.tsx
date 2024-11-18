import { Button } from 'components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { ImageIcon, TrashIcon } from 'lucide-react'
import { CartItem as CartItemType } from '../app/lib/types'

interface CartItemProps {
  item: CartItemType
  isEditMode: boolean
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemove: (id: number) => void
}

export function CartItem({ item, isEditMode, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="w-16 h-16 object-cover rounded-lg"
        />
      ) : (
        <ImageIcon className="w-16 h-16 text-gray-400" />
      )}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate" title={item.title}>
          {item.title}
        </h3>
        <div className="flex items-center gap-4 mt-1">
          <p className="text-[#0095FF] font-medium">${item.price.toFixed(2)}</p>
          {isEditMode ? (
            <Select
              value={item.quantity.toString()}
              onValueChange={(value) => onUpdateQuantity(item.id, parseInt(value))}
            >
              <SelectTrigger className="w-20 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <p className="text-gray-500">Quantity: {item.quantity}</p>
          )}
        </div>
      </div>
      {isEditMode && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}