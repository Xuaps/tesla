import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();
  return (
    <Row>
      <Col md={{ span: 3 }}>
        <h1>{t('welcome')} </h1>
      </Col>
      <Col md={{ span: 9 }}>
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <a
              target="_blank"
              className="nav-link active"
              href="https://sede.cnmc.gob.es/listado/censo/1"
            >
              {t('nav_download')}
            </a>
          </li>
          <li className="nav-item">
            <a
              target="_blank"
              className="nav-link"
              href="https://www.youtube.com/watch?v=IbA7QL4MuJY"
            >
              {t('nav_bill')}
            </a>
          </li>
          <li className="nav-item">
            <a
              target="_blank"
              className="nav-link"
              href="https://www.youtube.com/watch?v=rRWWirKLHAU"
            >
              {t('nav_market')}
            </a>
          </li>
        </ul>
      </Col>
    </Row>
  );
};

export default Header;
