"use client"
import axios from 'axios';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AlertModal } from '@/components/modals/alert-model';
import { RoomColumn } from './column';
import { useToast } from '@/components/ui/use-toast';

interface CellActionPorps {
    data: RoomColumn
}

export const CellAction: React.FC<CellActionPorps> = ({ data }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const {toast} = useToast()
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast({title:"Copyied!"})
    }
    const onDelete = async (id: string) => {
        try {
            setLoading(true);
            await axios.delete(`/api/room/${id}`);
            router.refresh()
            toast({title:"Room deleted successfully!"});
            setOpen(false);
        } catch (error) {
            toast({title:"Make sure you removed all Rooms first", variant: "destructive"})
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <AlertModal isOpen={open} onClose={() => setOpen(false)} loading={loading} onConfirm={() => onDelete(data.id)} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/admin/yourrooms/room/${data.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}