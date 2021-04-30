import './App.css';
import { Part, Order, Supplier } from './models'
import { DataStore } from 'aws-amplify'
import { useCallback, useEffect, useState } from 'react';

function App() {

  const refresh = useCallback(async() => {
    setParts(await DataStore.query(Part))
    setSuppliers(await DataStore.query(Supplier))
  })

  const [parts, setParts] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState()
  const [isFiltered, setIsFiltered] = useState(false)

  useEffect(async () => {
    refresh()
  }, [setParts, setSuppliers])

  const thStyle = 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
  const tdStyle = 'px-6 py-4 whitespace-nowrap text-left'
  return (
    <div className="App">
      <div className="flex items-center p-4">
        <img src="./Artboard.png" alt="Header Logo" onClick={() => refresh()}></img>
        <h1 className="px-2 font-bold text-3xl" style={{color: '#37ACC7'}}>
          Supply Chain Browser
        </h1>
      </div>
      <div className="flex divide-x w-50 space-x-4">
      </div>
      <table className="min-w-full divide-y divide-gray-200 mx-4">
        <thead className="bg-gray-50">
          <tr>
            <th className={thStyle}>Part #</th>
            <th className={thStyle}>Part Name</th>
            <th className={thStyle}>Supplier
        {isFiltered && <button className="ml-2" onClick={async () => {
                setIsFiltered(false)
                setParts(await DataStore.query(Part))
              }}>
                Clear Filter
          </button>}</th>
            <th className={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {parts.map(p => <tr>
            <td className={tdStyle}>{p.id.slice(0, 6)}</td>
            <td className={tdStyle}>{p.name}</td>
            <td className={tdStyle}>{suppliers.find(s => s.id === p.supplierID)?.name}</td>
            <td className={`${tdStyle} space-x-4`}>
              <button onClick={async () => {
                setOrders(await DataStore.query(Order, o => o.partID('eq', p.id)))
              }}>View orders</button>
              <button onClick={async () => {
                setIsFiltered(true)
                setParts(await DataStore.query(Part, x => x.supplierID('eq', p.supplierID)))
              }}>Filter to supplier</button>
            </td>
          </tr>)}
        </tbody>
      </table>
      {orders.length !== 0 && <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div class="inline-block align-bottom relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
            <button onClick={() => setOrders([])} className="absolute right-0">X</button>

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
    </div>
  );
}

export default App;
