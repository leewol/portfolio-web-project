import React, { useState, useEffect } from 'react';
import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
import Certificate from './Certificate';
import CertificateAddForm from './CertificateAddForm';

function Certificates({ portfolioOwnerId, isEditable }) {
    const [certificates, setCertificates] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        // "certificateList/유저id"로 GET 요청
        Api.get("certificateList", portfolioOwnerId).then((res) => {
            setCertificates(res.data)
        });
    }, [portfolioOwnerId]);

    return (
        <Card className="mb-2 ms-3 mr-5" style={{ width: "72rem" }}>
            <Card.Body>
                <Card.Title>자격증</Card.Title>
                {certificates.map((certificate) => (
                    <Certificate 
                        Certificate={certificate} 
                        setCertificates={setCertificates} 
                        isEditable={isEditable} 
                    />
                ))}
                {isEditable && (
                    <Row className="mt-3 text-center text-info">
                        <Col sm={{ span: 20 }}>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => setIsAdding(true)}>
                            +
                            </Button>
                        </Col>
                    </Row>
                )}
                {isAdding && (
                    <CertificateAddForm
                        portfolioOwnerId={portfolioOwnerId}
                        setCertificates={setCertificates}
                        setIsAdding={setIsAdding}
                    />
                )}
            </Card.Body>
        </Card>
    );
}

export default Certificates;
