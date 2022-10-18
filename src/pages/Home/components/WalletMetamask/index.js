import { useState } from 'react';
import { ethers } from 'ethers';
import './styles.css';

const WalletMetamask = () => {
    const [account, setAccount] = useState(null);
    const [userBalance, setUserBalance] = useState({
        balance: 0,
        loading: false,
    });

    const handleConnectWallet = () => {
        if (window.ethereum) {
            console.log('MetaMask Installed');
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then((result) => {
                    handleAccountChanged(result[0]);
                });
        } else {
            console.log('Install MetaMask!!!');
        }
    };

    const handleAccountChanged = (account) => {
        setAccount(account);
        getUserBalance(account.toString());
    };

    const getUserBalance = (address) => {
        setUserBalance({ ...userBalance, loading: true });
        window.ethereum
            .request({ method: 'eth_getBalance', params: [address, 'latest'] })
            .then((balance) => {
                setUserBalance({
                    balance: ethers.utils.formatEther(balance),
                    loading: false,
                });
            });
    };

    const reloadPage = () => {
        window.location.reload();
    };
    window.ethereum.on('accountsChanged', handleAccountChanged);

    window.ethereum.on('chainChanged', reloadPage);
    return (
        <div className="wallet-container">
            <h1>Conectarse a metamask app!!!</h1>
            <button
                className="btn-connect-wallet"
                onClick={handleConnectWallet}
            >
                Connect!
            </button>
            <div>
                <h3>Address: {account}</h3>
            </div>
            <div>
                <h3>
                    Balance:{' '}
                    {userBalance.loading ? 'Loading...' : userBalance.balance}
                </h3>
            </div>
        </div>
    );
};

export default WalletMetamask;
