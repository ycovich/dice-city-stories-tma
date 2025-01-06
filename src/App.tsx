import {
    TonConnectButton,
    useTonConnectUI,
} from '@tonconnect/ui-react';
import {useState} from 'react';
import {RECEIVER_ADDRESS, DEFAULT_AMOUNT} from './utils/constants';

function App() {
    const [tonConnectUI] = useTonConnectUI();
    const [amount, setAmount] = useState(DEFAULT_AMOUNT);
    const [comment, setComment] = useState('');

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
            <TonConnectButton/>

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
        </div>
    );
}

export default App;