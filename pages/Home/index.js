import { Button, Calendar, Form, Input, Modal, Select, Space } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useState } from 'react';
import dayjs from 'dayjs';

const App = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState(() => dayjs('2023-06-01'));
  const [selectedValue, setSelectedValue] = useState(() => dayjs('2023-06-01'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Custom validation rule for name field
  const validateName = (_, value) => {
    const regex = /^[A-Za-zก-๙\s]+$/; // Only English, Thai characters and spaces
    if (!value || !regex.test(value)) {
      return Promise.reject('Please enter a valid name in Thai or English.');
    }
    return Promise.resolve();
  };

  // Custom validation rule for ID card number field
  const validateIDCardNumber = (_, value) => {
    const regex = /^[0-9\-]+$/; // Only numbers and hyphen
    if (!value || !regex.test(value)) {
      return Promise.reject('Please enter a valid ID card number.');
    }
    if (value.length > 17) {
      return Promise.reject('ID card number cannot exceed 13 characters.');
    }
    return Promise.resolve();
  };

  const idCardNumberFormatter = (value) => {
    if (value) {
      const trimmedValue = value.replace(/-/g, ''); // Remove existing hyphens
      const formattedValue = trimmedValue.replace(
        /(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/,
        '$1-$2-$3-$4-$5'
      );
      return formattedValue;
    }
    return value;
  };

  const idCardNumberParser = (value) => {
    if (value) {
      return value.replace(/-/g, '');
    }
    return value;
  };

  const handleCalendarSelect = (date) => {
    setValue(date);
    setSelectedValue(date);
    form.setFieldsValue({ 'Date of birth': date });
  };

  const disabledDate = (current) => {
    // Disable dates beyond the present
    return current && current > moment().endOf('day');
  };

  const showModal = () => {
    form
      .validateFields()
      .then(() => {
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.log('Validation error:', error);
      });
  };

  const handleOk = () => {
    setIsModalOpen(false);

    form
      .validateFields()
      .then((values) => {
        const {
          name,
          'ID card number': idCardNumber,
          'Date of birth': selectedValue,
          Gender: gender,
        } = values;

        const date = new Date(selectedValue);
        const formattedDate = date.toLocaleDateString('en-GB');

        router.push({
          pathname: '/result',
          query: {
            name,
            idCardNumber,
            dateOfBirth: formattedDate,
            gender,
          },
        });
      })
      .catch((error) => {
        console.log('Validation error:', error);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleReset = () => {
    form.resetFields();
    setValue(null);
  };

  return (
    <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            validator: validateName,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="ID card number"
        label="ID card number"
        rules={[
          {
            required: true,
            validator: validateIDCardNumber,
          },
        ]}
        getValueFromEvent={(e) => e.target.value.replace(/[^\d-]/g, '')} // Allow only numbers and hyphen during input
        normalize={(value) => idCardNumberFormatter(value)} // Format the value before displaying
        parse={(value) => idCardNumberParser(value)} // Convert the formatted value back to the original format
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="Date of birth"
        label="Date of birth"
        rules={[
          {
            required: true,
            message: 'Please specify your date of birth.',
          },
        ]}
      >
        <Calendar
          onSelect={handleCalendarSelect}
          value={value}
          disabledDate={disabledDate}
          fullscreen={false}
        />
      </Form.Item>

      <Form.Item
        name="Gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: 'Please select your gender.',
          },
        ]}
      >
        <Select placeholder="Please select" allowClear>
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" onClick={showModal}>
            Submit
          </Button>
          <Modal
            title="Confirm Information"
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Check"
          >
            <p>Name: {form.getFieldValue('name')}</p>
            <p>ID Card Number: {form.getFieldValue('ID card number')}</p>
            <p>
              Date of Birth: {selectedValue?.format('DD-MM')}-
              {(selectedValue?.year() + 543).toString()}
            </p>
            <p>Gender: {form.getFieldValue('Gender')}</p>
          </Modal>
          <Button htmlType="reset" onClick={handleReset}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default App;
