import { useState } from 'react';

function Orders(props) {
  const { orders, close } = props;
  const [selectedOrder, setSelectedOrder] = useState();

  return (
    <>
    {orders.length !== 0 && <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div class="inline-block align-bottom relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <button onClick={close} className="absolute right-0">X</button>

          <div className="flex p-4 divide-x">
            <div className="flex flex-col px-4 space-y-4">
              <div className="font-bold">
                Order #
              </div>
              {orders.map(o => <button onClick={() => setSelectedOrder(o)}>{o.id.slice(0, 6)}</button>)}
            </div>
            {selectedOrder && <div className="flex flex-col space-y-2 pl-4">
              <div className="flex space-x-4">
                <div className="font-bold">Cost Center</div>
                <div>{selectedOrder.costCenter}</div>
              </div>
              <div className="flex space-x-4">
                <div className="font-bold">Qty</div>
                <div>{selectedOrder.quantity}</div>
              </div>
              <div className="flex space-x-4">
                <div className="font-bold">Status</div>
                <div className="rounded-full py-1 px-2 text-xs bg-green-300">{selectedOrder.status}</div>
              </div>
              <iframe
                width="600"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                allowfullscreen
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBnBEpjr6z8oAUtV0T7ErN1Vy-xKLbYqRI&zoom=6&q=${selectedOrder.location.lat},${selectedOrder.location.long}`}>
              </iframe>
            </div>
            }
          </div>
        </div>
      </div>
    </div>
    }
  </>);
}

export default Orders;