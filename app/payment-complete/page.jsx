'use client'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../context/userContext';
import { useCustomRedirect } from '../customHooks';

export default function PaymentComplete() {
    const router = useRouter();
    const { user } = useUserContext();

    useCustomRedirect('/signin', user);

    return (
        <div className='flex flex-col justify-center items-center w-screen h-screen'>
            <CheckCircleIcon sx={{ fontSize: 100, color: 'green' }} />
            <p className='text-2xl m-10'>Your payment is complete!</p>
            <Button variant="outlined" onClick={() => router.push('/')}>Keep shopping</Button>
        </div>
    )
}