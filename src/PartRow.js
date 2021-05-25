function PartRow(props) {
  const { part, supplierName, filterToPartSupplier, showPartOrders } = props;
  const tdStyle = 'px-6 py-4 whitespace-nowrap text-left'
  return (<tr>
    <td className={tdStyle}>{part.id.slice(0, 6)}</td>
    <td className={tdStyle}>{part.name}</td>
    <td className={tdStyle}>{supplierName}</td>
    <td className={`${tdStyle} space-x-4`}>
      <button onClick={() => showPartOrders(part.id)}>View orders</button>
      <button onClick={() => filterToPartSupplier(part.supplierID)}>Filter to supplier</button>
    </td>
  </tr>)
}

export default PartRow