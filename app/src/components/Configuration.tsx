import React, { ChangeEvent } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Configuration = ({
  fileLoaded,
}: {
  fileLoaded: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col md={{ span: 4 }}>
        <Form.Label>{t('uploader_welcome')}</Form.Label>
        <Form.Control type="file" onChange={fileLoaded} />
      </Col>
      <Col md={{ span: 4 }}></Col>
      <Col md={{ span: 2 }}></Col>
      <Col md={{ span: 2 }}></Col>
    </Row>
  );
};

export default Configuration;
