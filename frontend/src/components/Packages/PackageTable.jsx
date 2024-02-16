import React, { useState } from 'react';

const allPackagesData = {
    furnitureandrepair: [
    { name: 'Basic Repair', description: 'Minor repairs and touch-ups', price: '$50' },
    { name: 'Standard Repair', description: 'Moderate repairs and restoration', price: '$100' },
    { name: 'Premium Repair', description: 'Extensive repairs and refurbishment', price: '$200' },
  ],
  electronicsRepair: [
    { name: 'Bir', description: 'Minor repairs and diagnostics', price: '$80' },
    { name: 'Standard Repair', description: 'Moderate repairs and part replacements', price: '$150' },
    { name: 'Premium Repair', description: 'Extensive repairs and component upgrades', price: '$250' },
  ],
  applianceRepair: [
    { name: 'Baair', description: 'Minor repairs and maintenance', price: '$70' },
    { name: 'Standard Repair', description: 'Moderate repairs and part replacements', price: '$120' },
    { name: 'Premium Repair', description: 'Extensive repairs and warranty coverage', price: '$220' },
  ],
};

const PackageTable = ({ category,onSelectPackage }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const categoryTrimmed = category.trim().replace(/\s+/g, ''); // Trim and remove spaces
  const packagesData = allPackagesData[categoryTrimmed];

  const handlePackageClick = (index) => {
    setSelectedPackage(index);
    
    onSelectPackage(index);
  };

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid black', padding: '8px' }}>Package Name</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Description</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Price</th>
        </tr>
      </thead>
      <tbody>
        {packagesData.map((packages, index) => (
          <tr
            key={index + 1}
            onClick={() => handlePackageClick(index + 1)}
            style={{ cursor: 'pointer', backgroundColor: selectedPackage === index + 1 ? 'lightblue' : 'white' }}
          >
            <td style={{ border: '1px solid black', padding: '8px' }}>{packages.name}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{packages.description}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{packages.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PackageTable;
