import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalConfirm from '../../components/modalConfirm/ModalConfirm';
import UserService from "../../services/UserService";
import { ERROR_MESSAGES } from "../../utils/errorMessages";
import './email.scss';

export default function CheckEmail() {

    const [email, setEmail] = useState('');
    const [formError, setFormError] = useState({});
    const [id, setId] = useState('');
    const [submit, setSubmit] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const navigate = useNavigate();

    const returnToLogin = () => {
        navigate('/piiquante/login');
    };

    const handleCheckEmail = async e => {
        e.preventDefault();
        setFormError(checkField(email));
    };

    const checkField = email => {
        const error = {};
        if (!email) {
            error.email = ERROR_MESSAGES.emailRequired;
        } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            error.email = ERROR_MESSAGES.emailInvalid;
        } else {
            setSubmit(true);
        }
        return error;
    }

    const submitForm = async () => {
        try {
            const response = await UserService.getUserId(email);
            setId(response.userId);
            setConfirm(true);
        } catch (error) {
            console.log(error);
            setFormError({ email: ERROR_MESSAGES.emailNotFound });
        }
    };

    useEffect(() => {
        if (Object.keys(formError).length === 0 && submit) {
            submitForm();
        }
    }, [formError, submit]);

    useEffect(() => {
        if (id) {
            try {
                console.log(email, id);
                UserService.sendEmail(email, id);
            } catch (error) {
                console.log(error);
            }
        }
    }, [id]);

    useEffect(() => {
        if (confirm) {
            const timer = setTimeout(() => {
                setConfirm(false);
                setEmail('');
                returnToLogin();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [confirm]);

    return (
        <div className='email'>
            {confirm && <ModalConfirm content={"Un email vous a été envoyé pour réinitialiser votre mot de passe"} />}
            <h2>Saisissez l'adresse e-mail associée à votre compte</h2>
            <form className='email_form' onSubmit={handleCheckEmail} noValidate>
                <div className='email_form_group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' value={email} onChange={e => setEmail(e.target.value)} required />
                    {formError.email && <p>{formError.email}</p>}
                </div>
                <div className='email_form_btn'>
                    <button type='button' onClick={returnToLogin}>Annuler</button>
                    <button type='submit'>Confirmer</button>
                </div>
            </form>
        </div>
    )
}