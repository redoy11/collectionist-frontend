import React from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { Store } from 'redux';
import { getSessionToken, setSessionToken } from '../../store/ducks/session';
import './SessionAuthorize.scss';
import queryString from 'query-string';
import { axioService, POST } from '../../services/axioService';
import { SERVER_AUTHORIZE_ENDPOINT } from '../../configs/endpoints';

/** interface to describe SessionAuthorize props*/
interface SessionAuthorizeProps {
  token: string;
  setSessionTokenActionCreator: typeof setSessionToken;
}

const SessionAuthorize = (props: SessionAuthorizeProps) => {
  const { token, setSessionTokenActionCreator } = props;
  const location = useLocation();
  const history = useHistory();

  /** destroys the session token */
  React.useEffect(() => {
    const fetchToken = async () => {
      const code = (queryString.parse(location.search)['code'] as string) || '';
      const response = await axioService(
        POST,
        SERVER_AUTHORIZE_ENDPOINT,
        { code },
        false
      );
      setSessionTokenActionCreator(response.data);
      history.push('/');
    };
    fetchToken();
  }, []);

  return <div>{token !== '' && <Redirect to={'/'} />}</div>;
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
const mapDispatchToProps = {
  setSessionTokenActionCreator: setSessionToken,
};

/** connect SessionAuthorize to the redux store */
const ConnectedSessionAuthorize = connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionAuthorize);

export default ConnectedSessionAuthorize;
