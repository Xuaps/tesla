import React, { ChangeEvent } from 'react';
import { Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Store } from '../store';

const Configuration = ({
  fileLoaded,
  updatePunta,
  updateValle,
  config,
}: {
  fileLoaded: (e: ChangeEvent<HTMLInputElement>) => void;
  updateValle: (e: ChangeEvent<HTMLInputElement>) => void;
  updatePunta: (e: ChangeEvent<HTMLInputElement>) => void;
  config: Store['config'];
}) => {
  const { t } = useTranslation();
  return (
    <Row>
      <Col md={{ span: 4 }}>
        <Form.Label>{t('uploader_welcome')}</Form.Label>
        <Form.Control type="file" onChange={fileLoaded} />
      </Col>
      <Col md={{ span: 4 }}>
        <Form.Label>{t('fare')}</Form.Label>
        <DropdownButton
          id="dropdown-2.0TD-peninsula-sinbs"
          title={t('2.0TDPeninsulaSin')}
        >
          <Dropdown.Item active>{t('2.0TDPeninsulaSin')}</Dropdown.Item>
        </DropdownButton>
      </Col>
      <Col md={{ span: 2 }}>
        <Form.Label>{t('range_punta', { val: config.punta })}</Form.Label>
        <Form.Range
          min={1.15}
          max={14.49}
          defaultValue={config.punta}
          onChange={updatePunta}
          step={0.01}
        />
      </Col>
      <Col md={{ span: 2 }}>
        <Form.Label>{t('range_valle', { val: config.valle })}</Form.Label>
        <Form.Range
          min={1.15}
          max={14.49}
          defaultValue={config.valle}
          onChange={updateValle}
          step={0.01}
        />
      </Col>
    </Row>
  );
};

export default Configuration;
