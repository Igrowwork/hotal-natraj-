"use client"
import React, { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
    title?: string;
    description?: string;
    jsx?: React.ReactNode
}
export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, onConfirm, loading, jsx }) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null;
    }
    return (
        <Modal title='Are you sure?' description='This actin cannot be undone' isOpen={isOpen} onClose={onClose}>
            <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                {jsx}
                <Button disabled={loading} variant={'outline'} onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={loading} variant={'destructive'} onClick={onConfirm}>
                    Continue
                </Button>
            </div>
        </Modal>
    )
}