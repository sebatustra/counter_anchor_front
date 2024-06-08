"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Initialize from '@/components/program/Initialize';
import Increment from '@/components/program/Increment';
import Decrement from '@/components/program/Decrement';
import ShowCounter from '@/components/program/ShowCounter';

const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);

export default function Home() {

    const [counter, setCounter] = useState("")

    return (
        <main className="flex flex-col items-center justify-center min-h-screen ">
            <div className="fixed top-0 right-0 p-4">
                <WalletMultiButtonDynamic />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <ShowCounter 
                            counter={counter}
                        />
                    </CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col w-full gap-y-4'>
                    <Initialize 
                        setCounter={setCounter}
                    />
                    <Increment 
                        counter={counter}
                    />
                    <Decrement 
                        counter={counter}
                    />
                </CardContent>
            </Card>
        </main>
    );
}
