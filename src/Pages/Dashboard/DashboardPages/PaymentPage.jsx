
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PaymentPage=()=> {
    const initialOptions = {
        clientId: "AeXTT-Kqfa76PTJeYpeSqbUG0PyAttpv5hU00yFhfZwtodqssYzOHBqdpt4yUxgos4ITpMvUUIyl6f2S",
    };
    const style={
        textAlign:"center",
        alignItems:"center",
        width:"fit-content",
        // background:"grey",
        padding:"15px",
        margin:"auto"
    }
    const stylePaypalBtn={
        shape: "rect",
        layout:"horizontal",
        color:"gold",
        label:"pay",
    }
    const createOrder = async () => {
        try {
            const response = await fetch("http://localhost:6300/partner/createPaypalOrder", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cart: [{ id: "87", quantity: "98" }],
                }),
            });

            const orderData = await response.json();

            if (!orderData.id) {
                const errorDetail = orderData.details[0];
                const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : "Unexpected error occurred, please try again.";

                throw new Error(errorMessage);
            }
                
            // const response1 = await fetch("http://localhost:6300/partner/confirmPaypalOrder", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({
            //         orderId:orderData.id,
            //     }),

            // });
            // const confirmOrder = await response1.json();
            console.log(orderData.id)
            return orderData.id;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const onApprove = async (data) => {
        // Capture the funds from the transaction.
        const response = await fetch("http://localhost:6300/partner/create-paypal-payment", {
            method: "POST",
            body: JSON.stringify({
                orderID: data.orderID
            })
        });

        const details = await response.json();

        // Show success message to buyer
        alert(`Transaction completed by ${details.payer.name.given_name}`);
    }
    return (
        <div className="App">
            <div style={style}>
                <h1>Choose a payment method below to continue</h1><br/><br/>
            <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    style={stylePaypalBtn}
                    />
            </PayPalScriptProvider>
            </div>
        </div>
    );
}

// Exporting the dashboard my account component 
export default PaymentPage; 
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// export default function App() {
//     const initialOptions = {
//         clientId: "AT6yNsQFQGvmokGc-CXPRPNIpPRpTSgJZ-dWElg1HfZezgqbqUi8NEw5ME9RCqmrcAZgqvEeP-xGCkYs",
//     };

//     const styles = {
//         shape: "rect",
//         layout: "vertical",
//     };

//     return (
//         <div className="App">
//             <PayPalScriptProvider options={initialOptions}>
//                 <PayPalButtons style={styles} />
//             </PayPalScriptProvider>
//         </div>
//     );
// }
