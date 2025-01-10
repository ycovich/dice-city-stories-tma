import {
    TonConnectButton,
    useTonConnectUI,
    useTonAddress
} from '@tonconnect/ui-react';
import {useState} from 'react';
import {RECEIVER_ADDRESS, DEFAULT_AMOUNT} from './utils/constants';

function App() {
    const [tonConnectUI] = useTonConnectUI();
    const [amount, setAmount] = useState(DEFAULT_AMOUNT);
    const [comment, setComment] = useState('');

    // get wallet address
    const userFriendlyAddress = useTonAddress();

    const handleSend = async () => {
        try {
            const transaction = {
                validUntil: Math.floor(Date.now() / 1000) + 60, // 60 seconds from now
                messages: [
                    {
                        address: RECEIVER_ADDRESS, // Address should be string
                        amount: (parseFloat(amount) * 1e9).toString(), // Amount should be string
                        payload: comment, // Comment will be attached to transaction
                    },
                ],
            };

            await tonConnectUI.sendTransaction(transaction);
            setComment('');
            setAmount(DEFAULT_AMOUNT);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="container">
            <div className='connect-btn'>
                <TonConnectButton/>
            </div>


            <span>{userFriendlyAddress}</span>

            {userFriendlyAddress ? (
                <div className="payment-form">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount in TON"
                        step="0.1"
                        min="0.1"
                    />

                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Payment comment"
                    />

                    <button onClick={handleSend}>
                        Send {amount} TON
                    </button>
                </div>
            ) : (
                <p>Please connect your wallet to send transactions.</p>
            )}
        </div>
    );
}

export default App;


//


// import {
//     TonConnectButton,
//     useTonConnectUI,
//     useTonAddress,
// } from '@tonconnect/ui-react';
// import { useEffect, useState } from 'react';
// import { RECEIVER_ADDRESS, DEFAULT_AMOUNT } from './utils/constants';
//
// function App() {
//     const [tonConnectUI] = useTonConnectUI();
//     const [amount, setAmount] = useState(DEFAULT_AMOUNT);
//     const [comment, setComment] = useState('');
//     const [userId, setUserId] = useState(null);
//     const [isButtonDisabled, setIsButtonDisabled] = useState(true);
//
//     const userFriendlyAddress = useTonAddress();
//
//     useEffect(() => {
//         const urlParams = new URLSearchParams(window.location.search);
//         const id = urlParams.get('id');
//
//         if (!id) {
//             setIsButtonDisabled(true);
//             console.error('User ID is missing in the URL');
//         } else {
//             setUserId(id);
//             setIsButtonDisabled(false);
//         }
//     }, []);
//
//     useEffect(() => {
//         if (userFriendlyAddress && userId) {
//             const postUserData = async () => {
//                 try {
//                     const response = await fetch('YOUR_ENDPOINT_URL', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify({
//                             userId,
//                             walletAddress: userFriendlyAddress,
//                         }),
//                     });
//
//                     if (!response.ok) {
//                         throw new Error('Failed to link wallet');
//                     }
//                     console.log('Wallet linked successfully');
//                 } catch (error) {
//                     console.error('Error linking wallet:', error);
//                 }
//             };
//
//             postUserData();
//         }
//     }, [userFriendlyAddress, userId]);
//
//     const handleSend = async () => {
//         try {
//             const transaction = {
//                 validUntil: Math.floor(Date.now() / 1000) + 60,
//                 messages: [
//                     {
//                         address: RECEIVER_ADDRESS,
//                         amount: (parseFloat(amount) * 1e9).toString(),
//                         payload: comment,
//                     },
//                 ],
//             };
//
//             await tonConnectUI.sendTransaction(transaction);
//             setComment('');
//             setAmount(DEFAULT_AMOUNT);
//         } catch (e) {
//             console.error(e);
//         }
//     };
//
//     return (
//         <div className="container">
//             {!userId ? (
//                 <p style={{ color: 'red' }}>
//                     Error: User ID is missing in the URL.
//                 </p>
//             ) : (
//                 <>
//                     <div className="connect-btn">
//                         {isButtonDisabled ? (
//                             <button disabled style={{ opacity: 0.5 }}>
//                                 Connect Wallet (ID Required)
//                             </button>
//                         ) : (
//                             <TonConnectButton />
//                         )}
//                     </div>
//
//                     <span>{userFriendlyAddress}</span>
//
//                     {userFriendlyAddress ? (
//                         <div className="payment-form">
//                             <input
//                                 type="number"
//                                 value={amount}
//                                 onChange={(e) => setAmount(e.target.value)}
//                                 placeholder="Amount in TON"
//                                 step="0.1"
//                                 min="0.1"
//                             />
//
//                             <input
//                                 type="text"
//                                 value={comment}
//                                 onChange={(e) => setComment(e.target.value)}
//                                 placeholder="Payment comment"
//                             />
//
//                             <button onClick={handleSend}>Send {amount} TON</button>
//                         </div>
//                     ) : (
//                         <p>Please connect your wallet to send transactions.</p>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// }
//
// export default App;
