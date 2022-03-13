import React, { ChangeEvent } from 'react';
import { Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Store } from '../store';
import Slider from './Slider';

const Configuration = ({
  fileLoaded,
  updatePunta,
  updateValle,
  config,
}: {
  fileLoaded: (e: ChangeEvent<HTMLInputElement>) => void;
  updateValle: (value: number) => void;
  updatePunta: (value: number) => void;
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
        <Slider
          min={1.15}
          max={14.49}
          defaultValue={config.punta}
          onChange={updatePunta}
          step={0.01}
          labelRenderer={(value: number) => t('range_punta', { val: value })}
        />
      </Col>
      <Col md={{ span: 2 }}>
        <Slider
          min={1.15}
          max={14.49}
          defaultValue={config.valle}
          onChange={updateValle}
          step={0.01}
          labelRenderer={(value: number) => t('range_valle', { val: value })}
        />
      </Col>
    </Row>
  );
};

export default Configuration;
