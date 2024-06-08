import * as anchor from "@project-serum/anchor"
import { Button } from "../ui/button"
import {
    useConnection,
    useAnchorWallet
} from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react";
import idl from "../../../idl.json"

const PROGRAM_ID = new anchor.web3.PublicKey(
    `9MFNkRz9R8x5PkN4frwchye16fUuywDAHy4Z1RAoabsJ`
)


export default function Initialize({
    setCounter
}: {
    setCounter: Function
}) {
    const [program, setProgram] = useState<anchor.Program>()
    const { connection } = useConnection()
    const wallet = useAnchorWallet()

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
                )
                anchor.setProvider(provider)
            }
    
            const programToSet = new anchor.Program(idl as anchor.Idl, PROGRAM_ID)
            setProgram(programToSet)
        }
    }, [wallet])

    const initialize = () => {
        const execute = async () => {
            try {
                const counterPDA = anchor.web3.Keypair.generate();
    
                const tx = await program!.methods
                    .initialize()
                    .accounts({
                        counter: counterPDA.publicKey,
                    })
                    .signers([counterPDA])
                    .rpc();
    
                setCounter(counterPDA.publicKey)
                console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`)
            } catch(e) {
                console.error(e)
            }
        }

        execute()
    }

    return (
        <Button
            onClick={() => initialize()}
        >
            Initialize
        </Button>
    )
}
