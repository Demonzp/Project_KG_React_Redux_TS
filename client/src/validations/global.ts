const numPassChars = 3;

type emailType = {email?:string};

export const emailRuls = (values:emailType)=>{
    const errors: emailType = {};

    if (!values.email) {
        errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }

    return errors;
}

type passType = {password?:string};

export const passRuls = (values:passType)=>{
    const errors: passType = {};

    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < numPassChars) {
        errors.password = `Password needs to be equal or more than ${numPassChars} characters`;
    }
    
    return errors;
}