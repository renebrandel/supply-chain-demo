import './App.css';
import { useCallback, useEffect, useState } from 'react';
import Orders from './Orders';
import PartRow from "./PartRow";
import { DataStore } from '@aws-amplify/datastore';
import { Part, Supplier, Order} from './models'
import { withAuthenticator } from '@aws-amplify/ui-react'

function App() {

  const refresh = useCallback(async() => {
    // Query for parts & suppliers
    setParts(await DataStore.query(Part))
    setSuppliers(await DataStore.query(Supplier))
  })

  const [parts, setParts] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [orders, setOrders] = useState([])
  const [isFiltered, setIsFiltered] = useState(false)

  const closeOrders = useCallback(() => {
    setOrders([]);
  }, setOrders)

  const showPartOrders = useCallback(async (partId) => {
    // Query for Orders from given part
    setOrders(await DataStore.query(Order, o => o.partID('eq', partId)))
  });

  const filterToPartSupplier = useCallback(async (supplierId) => {
    setIsFiltered(true)
    // Query for parts with given supplier
    setParts(await DataStore.query(Part, p => p.supplierID('eq', supplierId)))
  });

  useEffect(async () => {
    refresh()
  }, [setParts, setSuppliers])

  const thStyle = 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
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
                // Query for all parts
                // setParts(await DataStore.query(Part))
              }}>
                Clear Filter
          </button>}</th>
            <th className={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {parts.map(part =>
            <PartRow
              part={part}
              supplierName={suppliers.find(s => s.id === part.supplierID)?.name}
              filterToPartSupplier={filterToPartSupplier}
              showPartOrders={showPartOrders} />)}
        </tbody>
      </table>
      <Orders orders={orders} close={closeOrders} />
    </div>
  );
}

export default withAuthenticator(App);
