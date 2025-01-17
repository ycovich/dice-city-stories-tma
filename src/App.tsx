import {
    TonConnectButton,
    useTonConnectUI,
    useTonAddress,
} from '@tonconnect/ui-react';
import {useEffect, useState} from 'react';
import {RECEIVER_ADDRESS, DEFAULT_AMOUNT} from './utils/constants';

function App() {
    const [tonConnectUI] = useTonConnectUI();
    const [amount, setAmount] = useState(DEFAULT_AMOUNT);
    const [userId, setUserId] = useState<number | null>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const userFriendlyAddress = useTonAddress();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('userId');

        if (!id) {
            setIsButtonDisabled(true);
            console.error('похоже, вы открыли это приложение не через телеграм бота');
        } else {
            setUserId(isNaN(Number(id)) ? 0 : Number(id));
            setIsButtonDisabled(false);
        }
    }, []);

    useEffect(() => {
        if (userFriendlyAddress && userId) {
            const postUserData = async () => {
                try {
                    const response = await fetch('https://d5daiqde8n7sohi9jsek.z7jmlavt.apigw.yandexcloud.net/dice-bot', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            tmaUserInfo: {
                                userId,
                                walletAddress: userFriendlyAddress,
                            },
                        }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to link wallet');
                    }
                    console.log('Wallet linked successfully');
                } catch (error) {
                    console.error('Error linking wallet:', error);
                }
            };

            postUserData();
        }
    }, [userFriendlyAddress, userId]);

    const handleSend = async () => {
        try {
            const preTransactionResponse = await fetch(
                'https://d5daiqde8n7sohi9jsek.z7jmlavt.apigw.yandexcloud.net/dice-bot',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        txInfo: {
                            userId,
                            amount,
                        },
                    }),
                }
            );

            if (!preTransactionResponse.ok) {
                throw new Error('Failed to send pre-transaction data');
            }
            console.log('Pre-transaction data sent successfully');

            const transaction = {
                validUntil: Math.floor(Date.now() / 1000) + 60,
                messages: [
                    {
                        address: RECEIVER_ADDRESS,
                        amount: (parseFloat(amount) * 1e9).toString(),
                    },
                ],
            };

            await tonConnectUI.sendTransaction(transaction);

            setAmount(DEFAULT_AMOUNT);
        } catch (error) {
            console.error('Error during transaction:', error);
        }
    };

    return (
        <div className="container">
            {!userId ? (
                <p style={{color: 'red'}}>
                    Seems like you opened me not from Dice Bot
                </p>
            ) : (
                <>
                    <div className="connect-btn">
                        {isButtonDisabled ? (
                            <button disabled style={{opacity: 0.5}}>
                                Connect Wallet (ID Required)
                            </button>
                        ) : (
                            <TonConnectButton/>
                        )}
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

                            <button onClick={handleSend}>Send {amount} TON</button>
                        </div>
                    ) : (
                        <p>Please connect your wallet to send transactions.</p>
                    )}
                </>
            )}
        </div>
    );
}

export default App;