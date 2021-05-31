import { IinitialStateSignin } from '../types/signin';
import { emailRuls, passRuls } from './global';

export default function signinValidation(values: IinitialStateSignin) {
    return {
        ...emailRuls(values),
        ...passRuls(values)
    }
}