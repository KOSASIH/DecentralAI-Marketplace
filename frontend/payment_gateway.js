// payment_gateway.js
import { useState, useEffect } from 'react';
import Web3 from 'web3';

const PaymentGateway = () => {
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_PROJECT_ID'));

  useEffect(() => {
    const getPaymentStatus = async () => {
      const paymentTx = await web3.eth.getTransaction('0x...paymentTxHash...');
      const paymentStatus = await web3.eth.getTransactionReceipt(paymentTx.hash);
      setPaymentStatus(paymentStatus);
    };
    getPaymentStatus();
  }, []);

  const handlePayment = async () => {
    if (paymentAmount > 0) {
      const paymentTx = await web3.eth.sendTransaction({
        from: '0x...userAddress...',
        to: '0x...recipientAddress...',
        value: web3.utils.toWei(paymentAmount, 'ether'),
      });
      setPaymentStatus(paymentTx.hash);
    }
  };

  return (
    <div>
      {paymentStatus? (
        <p>Payment successful!</p>
      ) : (
        <form>
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            placeholder="Enter payment amount"
          />
          <button onClick={handlePayment}>Make Payment</button>
        </form>
      )}
    </div>
  );
};

export default PaymentGateway;
