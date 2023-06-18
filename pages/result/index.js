import React from 'react';
import { useRouter } from 'next/router';
import { Button } from 'antd';

const Result = () => {
  const router = useRouter();
  const { name, idCardNumber, dateOfBirth, gender } = router.query;

  const goBackToHome = () => {
    router.push({
      pathname: '/',
      query: {},
    });
  };

  const calculateAge = () => {
    const currentDate = new Date('2023-06-01'); // Assuming currentDate is 1/06/2023 for if
    const [day, month, year] = dateOfBirth.split('/');

    const birthDate = new Date(`${year}-${month}-${day}`);

    const ageInMonths =
      (currentDate.getFullYear() - birthDate.getFullYear()) * 12 +
      (currentDate.getMonth() - birthDate.getMonth());

    const isAgeAgree =
      (ageInMonths >= 6 && ageInMonths <= 24) || ageInMonths >= 780;

    return {
      ageStatus: isAgeAgree ? 'Allowed' : 'Not allowed',
      highlightColor: isAgeAgree ? 'green' : 'red',
    };
  };

  const { ageStatus, highlightColor } = calculateAge();

  const buddhistMonths = [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ];

  const day = parseInt(dateOfBirth.split('/')[0], 10);
  const monthIndex = parseInt(dateOfBirth.split('/')[1], 10) - 1;
  const buddhistYear = parseInt(dateOfBirth.split('/')[2], 10) + 543;

  const updatedDateOfBirth = `${day} ${buddhistMonths[monthIndex]} ${buddhistYear}`;

  return (
    <div>
      <h1>Result Page</h1>
      <p>Name: {name}</p>
      <p>ID Card Number: {idCardNumber}</p>
      <p>Date of Birth: {updatedDateOfBirth}</p>
      <p>Gender: {gender}</p>
      <p>
        Status: <span style={{ color: highlightColor }}>{ageStatus}</span>
      </p>

      <Button type="primary" onClick={goBackToHome}>
        Back
      </Button>
    </div>
  );
};

export default Result;
