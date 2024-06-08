import { Button } from "../ui/button"
import { 
    useConnection,
    useAnchorWallet
} from "@solana/wallet-adapter-react"
import * as anchor from "@project-serum/anchor"
import idl from "../../../idl.json"
import { useEffect, useState } from "react"

const PROGRAM_ID = new anchor.web3.PublicKey(
    `9MFNkRz9R8x5PkN4frwchye16fUuywDAHy4Z1RAoabsJ`
)

export default function ShowCounter({
    counter
}: {
    counter: string
}) {
    
    const [program, setProgram] = useState<anchor.Program>()
    const { connection } = useConnection()
    const wallet = useAnchorWallet();
    const [currentCount, setCurrentCount] = useState(0)

    useEffect(() => {
        if(wallet) {
            let provider: anchor.Provider;
            try {
                provider = anchor.getProvider()
            } catch {
                provider = new anchor.AnchorProvider(
                    connection,
                    wallet,
                    anchor.AnchorProvider.defaultOptions()
                );
                anchor.setProvider(provider)
            }

            const programToSet = new anchor.Program(idl as anchor.Idl, PROGRAM_ID);
            setProgram(programToSet)
        }
    }, [wallet])

    const refreshCount = () => {
        const execute = async () => {
            try {
                const counterData = await program!.account.counter.fetch(counter);
                setCurrentCount(counterData.count.toNumber())
            } catch(e) {
                console.error(e)
            }
        }
        execute()
    }


    return (
        <>
            <p>Current count: {currentCount}</p>
            <Button onClick={() => refreshCount()}>
                Refresh
            </Button>
        </>
    )
}
