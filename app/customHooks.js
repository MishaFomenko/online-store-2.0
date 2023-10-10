import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function useCustomRedirect(path, user) {
    const router = useRouter();
    useEffect(() => {
        user === null && router.push(path);
    });
};

export { useCustomRedirect };