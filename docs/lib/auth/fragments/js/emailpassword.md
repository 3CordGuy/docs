## Sign-up

Create a new user in the Amazon Cognito UserPool by passing the new user's email address, password, and other attributes to `Auth.signUp`.

```javascript
import { Auth } from 'aws-amplify';

try {
    const user = await Auth.signUp({
        username,
        password,
        attributes: {
            email,          // optional
            phone_number,   // optional - E.164 number convention
            // other custom attributes 
        },
        validationData: []  //optional
    });
    console.log({ user });
} catch (error) {
    console.log('error signing up:', error);
}
```

The `Auth.signUp` promise returns a data object of type [`ISignUpResult`](https://github.com/aws-amplify/amplify-js/blob/4644b4322ee260165dd756ca9faeb235445000e3/packages/amazon-cognito-identity-js/index.d.ts#L136-L139) with a [`CognitoUser`](https://github.com/aws-amplify/amplify-js/blob/4644b4322ee260165dd756ca9faeb235445000e3/packages/amazon-cognito-identity-js/index.d.ts#L48). 

```js
{
    user: CognitoUser;
    userConfirmed: boolean;
    userSub: string;
}
```

### Confirm sign up

If you enabled multi-factor auth, confirm the sign-up after retrieving a confirmation code from the user.

```js
try {
    await Auth.confirmSignUp(username, code)
} catch (error) {
    console.log('error confirming sign up', error)
}
```

## Sign-in

When signing in with user name and password, you will pass in the username and the password to the `signIn` method of the Auth class.

```javascript
import { Auth } from 'aws-amplify';

async function SignIn() {
    try {
        const user = await Auth.signIn(username, password);
    } catch (error) {
        console.log('error signing in', error)  
    }
}
```

### Re-send confirmation code

```js
import { Auth } from 'aws-amplify';

try {
    await Auth.resendSignUp(username);
    console.log('code resent succesfully')
} catch (err) {
    console.log('error resending code: ', err);
}
```

## Sign-out

```javascript
import { Auth } from 'aws-amplify';

try {
    await Auth.signOut();
} catch (error) {
    console.log('error signing out: ', error);
}
```

### Global sign-out

By doing this, you are revoking all the auth tokens (id token, access token and refresh token) which means the user is signed out from all the devices
Note: although the tokens are revoked, the AWS credentials will remain valid until they expire (which by default is 1 hour)

```js
import { Auth } from 'aws-amplify';

try {
    await Auth.signOut({ global: true });
} catch (error) {
    console.log('error signing out: ', error);
}
```
