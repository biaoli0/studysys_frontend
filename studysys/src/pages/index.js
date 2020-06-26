import React from "react";
import Link from "next/link";
import { Row, Col } from "antd";

function Index(props) {
  return (
    <Row justify="center">
      <Col span={8}>
        <div>
          <h1>Welcome to study system</h1>
          <Link href="user/login">
            <a>Login</a>
          </Link>
        </div>
      </Col>
    </Row>
  );
}

export default Index;
