import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'

export default function MobileNav() {
  return (
    <Sheet>
        <SheetTrigger>
            <Menu className='text-orange-500'/>
        </SheetTrigger>
        <SheetContent className="space-y-3">
            <SheetTitle>
                <span>Welcome to MearnEats.com !</span>
            </SheetTitle>
            <SheetDescription className='flex'>
                <Button className='flex-1 flex-bold bg-orange-500'>Log In</Button>
            </SheetDescription>
        </SheetContent>
    </Sheet>
  )
}

