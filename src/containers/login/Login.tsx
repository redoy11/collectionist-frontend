import React from 'react';
import { Form, Card, Input, Button } from 'antd';
import './Login.scss';
import { GITHUB_CLIENT_ID } from '../../configs/constants';
import { GITHUB_AUTHORIZE_ENDPOINT } from '../../configs/endpoints';
import { Store } from 'redux';
import { getSessionToken } from '../../store/ducks/session';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

/** interface to describe Login props*/
interface LoginProps {
  token: string;
}

const Login: React.FC<LoginProps> = (props: LoginProps) => {
  const { token } = props;

  /**
   * OnFinish redirects to github oauth endpoint
   * @param {any} values - the form values
   */
  const onFinish = (values: any) => {
    window.location.href = `${GITHUB_AUTHORIZE_ENDPOINT}?client_id=${GITHUB_CLIENT_ID}&login=${values.username}`;
  };

  /**
   * onFinishFailed is called when form validation fails
   * @param {any} errorInfo - containing the respective error information
   */
  const onFinishFailed = (errorInfo: any) => {
    console.error('Failed:', errorInfo);
  };

  return (
    <div className="Login-body">
      <div className="Login-content">
        {token !== '' && <Redirect to={'/'} />}
        <div className="Login-logo-container">
          <i className="fas fa-box-open"></i>
          <h4>Collectionist</h4>
        </div>
        <Form
          name="login"
          initialValues={{ remember: true }}
          validateTrigger="onBlur"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Card className="Login-card">
            <h3>SIGN IN</h3>
            <Form.Item
              className="Login-form-item"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your github username!',
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Github Username"
                prefix={<i className="fas fa-user" />}
              />
            </Form.Item>
            <Button
              className="Login-sign-in-btn"
              type="primary"
              htmlType="submit"
              size="large"
            >
              SIGN IN WITH <i className="fab fa-github"></i>
            </Button>
          </Card>
        </Form>
      </div>
    </div>
  );
};

/** connect the component to the store */

/** Interface to describe props from mapStateToProps */
interface DispatchedStateProps {
  token: string;
}

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
  const result = {
    token: getSessionToken(state),
  };
  return result;
};

/** map props to actions */
const mapDispatchToProps = {};

/** connect Login to the redux store */
const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

export default ConnectedLogin;
