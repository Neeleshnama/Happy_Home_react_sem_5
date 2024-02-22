import React, { useState } from 'react';
import { useEffect } from 'react';


let pricel=0;
const allPackagesData = {
  furnitureandrepair: [
  { name: 'Basic', description: 'Minor repairs and touch-ups', price: 300 },
  { name: 'Standard', description: 'Moderate repairs and restoration', price: 500 },
  { name: 'Premium', description: 'Extensive repairs and refurbishment', price: 1000 },
],
TherapySessions: [
  { name: 'Basic', description: '30-minute session. ', price: 300 },
  { name: 'Standard', description: '60-minute session and basic aromatherapy. ', price: 500 },
  { name: 'Premium', description: '90-minute session, aromatherapy, and hot stone massage. ', price: 1000 },
],
appliancerepair: [
  { name: 'Basic', description: 'Minor repairs such as fixing a garbage disposal or leaking pipes. ', price: 300 },
  { name: 'Standard', description: 'Moderate repairs such as repairing a water heater or dishwasher. ', price: 500 },
  { name: 'Premium', description: 'Extensive repairs such as replacing a refrigerator compressor or oven heating element. ', price: 1000 },
],
Plumbingservices: [
  { name: 'Basic', description: 'Minor repairs such as fixing leaks and clogs.', price: 200 },
  { name: 'Standard', description: 'Moderate repairs and restoration such as repairing burst pipes and clearing clogs.', price: 400 },
  { name: 'Premium', description: 'Extensive repairs and refurbishment such as water damage repair and main line water leak repair. ', price: 800 },
],
painting: [
  { name: 'Basic', description: 'Minor touch-ups and small areas such as a single room or accent wall.', price: 300 },
  { name: 'Standard', description: 'Moderate painting jobs such as a full room or exterior of a small house.', price: 500 },
  { name: 'Premium', description: 'Extensive painting jobs such as the entire interior or exterior of a large house or commercial building. ', price: 1000 },
],
menssaloon: [
  { name: 'Basic', description: 'Haircut and beard trim.', price: pricel },
  { name: 'Standard', description: 'Haircut, beard trim, and basic facial.', price: pricel*2 },
  { name: 'Premium', description: 'Haircut, beard trim, facial, and scalp massage. ', price: pricel*3 },
],
womenssaloon:[
  { name: 'Basic', description: 'Haircut and blowout. ', price: 300 },
  { name: 'Standard', description: 'Haircut, blowout, and basic manicure. ', price: 500 },
  { name: 'Premium', description: 'Haircut, blowout, manicure, and pedicure. ', price: 1000 },
],
Massageandspa: [
  { name: 'Basic', description: '30-minute massage. ', price: 300 },
  { name: 'Standard', description: '60-minute massage and basic facial.', price: 500 },
  { name: 'Premium', description: '90-minute massage, facial, and body scrub. ', price: 1000 },
],
housecleaning: [
  { name: 'Basic', description: 'Light cleaning such as dusting and vacuuming.', price: 300 },
  { name: 'Standard', description: 'Moderate cleaning such as bathrooms and kitchen.', price: 500 },
  { name: 'Premium', description: 'Deep cleaning such as baseboards, windows, and appliances.', price: 1000 },
],
unisex:[
  { name: 'Basic', description: 'Haircut', price: 400 },
  { name: 'Standard', description: 'Haircut and basic facial. ', price: 600 },
  { name: 'Premium', description: 'Haircut, facial, and scalp massage. ', price: 1000 },
],
};



const PackageTable = ({ category, onSelectPackage, price }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
 // Trim whitespace and remove single quotes from category string
  const categoryTrimmed = category.trim().replace(/\s+/g, '').replace(/'/g, ''); 
  
  //const categoryTrimmed = category.trim().replace(/\s+/g, ''); // Trim and remove spaces
  const packagesData = allPackagesData[categoryTrimmed];

  const handlePackageClick = (index) => {
    setSelectedPackage(index);
    onSelectPackage(index);
  };

  return (
    // <table style={{ borderCollapse: 'collapse', width: '100%' }}>
    //   <thead>
    //     <tr>
    //       <th style={{ border: '1px solid black', padding: '8px' }}>Package Name</th>
    //       <th style={{ border: '1px solid black', padding: '8px' }}>Description</th>
    //       <th style={{ border: '1px solid black', padding: '8px' }}>Price</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {packagesData.map((packages, index) => (
    //       <tr
    //         key={index + 1}
    //         onClick={() => handlePackageClick(index + 1)}
    //         style={{ cursor: 'pointer', backgroundColor: selectedPackage === index + 1 ? 'lightblue' : 'white' }}
    //       >
    //         <td style={{ border: '1px solid black', padding: '8px' }}>{packages.name}</td>
    //         <td style={{ border: '1px solid black', padding: '8px' }}>{packages.description}</td>
          
    //         <td style={{ border: '1px solid black', padding: '8px' }}>
    //           {price * (index + 1)}
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
    <table style={{ borderCollapse: 'collapse', width: '100%', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
  <thead>
    <tr>
      <th style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>Package Name</th>
      <th style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>Description</th>
      <th style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>Price</th>
    </tr>
  </thead>
  <tbody>
    {packagesData.map((packages, index) => (
      <tr
        key={index + 1}
        onClick={() => handlePackageClick(index + 1)}
        style={{ 
          cursor: 'pointer', 
          backgroundColor: selectedPackage === index + 1 ? '#eab676' : 'white',
          borderRadius: '8px',
          transition: 'background-color 0.3s ease',
          ':hover': { backgroundColor: 'lightgray' }
        }}
      >
        <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold', color: 'red' }}>{packages.name}</td>
        <td style={{ border: '1px solid black', padding: '8px' }}>{packages.description}</td>
        <td style={{ border: '1px solid black', padding: '8px', color: 'red', fontWeight: 'bold' }}>
          {price * (index + 1)}
        </td>
      </tr>
    ))}
  </tbody>
</table>

  );
};

export default PackageTable;
