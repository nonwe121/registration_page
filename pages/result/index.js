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
    const currentDate = new Date();
    const [day, month, year] = dateOfBirth.split('/');

    const birthDate = new Date(`${year}-${month}-${day}`);

    const ageInMonths =
      currentDate.getMonth() -
      birthDate.getMonth() +
      12 * (currentDate.getFullYear() - birthDate.getFullYear());

    const isAgeAgree =
      (ageInMonths >= 6 && ageInMonths <= 24) || ageInMonths >= 65;

    return {
      ageStatus: isAgeAgree ? 'Allowed' : 'Not allowed',
      highlightColor: isAgeAgree ? 'green' : 'red',
    };
  };

  const { ageStatus, highlightColor } = calculateAge();

  return (
    <div>
      <h1>Result Page</h1>
      <p>Name: {name}</p>
      <p>ID Card Number: {idCardNumber}</p>
      <p>Date of Birth: {dateOfBirth}</p>
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
