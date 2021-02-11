import * as React from 'react';
import { connect } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import { Store } from 'redux';
import { LOCAL_LOGIN_ENDPOINT } from '../../configs/endpoints';
import { isAuthenticated } from '../../store/ducks/session';

/** Account Redirect component */
const AccountRedirect = () => {
  const history = useHistory();

  React.useEffect(() => {
    history.push(LOCAL_LOGIN_ENDPOINT);
  }, []);

  return <div />;
};

/** Private route component */
const PrivateRoute: React.FC = ({
  component: Component,
  isAuthenticated,
  ...rest
}: any) => (
  <Route
    {...rest}
    render={(props: any) =>
      isAuthenticated === true ? <Component {...props} /> : <AccountRedirect />
    }
  />
);

/** connect the component to the store */

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>, parentProps: any): any => {
  const result = {
    ...parentProps,
    isAuthenticated: isAuthenticated(state),
  };
  return result;
};

/** connect SignIn to the redux store */
const ConnectedPrivateRoute = connect(mapStateToProps, {})(PrivateRoute);

export default ConnectedPrivateRoute;
