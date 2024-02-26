import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AUTH_FIELD_VALIDATION, ERROR_MESSAGES } from "../../utils/errorMessages";
import ModalConfirm from '../../components/modalConfirm/ModalConfirm';
import './reset.scss';
import UserService from "../../services/UserService";

export default function Password() {

    const { id } = useParams();
    const navigate = useNavigate();

    const returnToLogin = () => navigate('/piiquante/login');

    const [passwordShown, setPasswordShown] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formError, setFormError] = useState();
    const [confirm, setConfirm] = useState(false);

    const handleChangePassword = e => {
        e.preventDefault();
        if (!password || !confirmPassword) {
            setFormError(ERROR_MESSAGES.emptyFields);
        } else if (password !== confirmPassword) {
            setFormError(ERROR_MESSAGES.passwordDontMatch);
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
            setFormError(AUTH_FIELD_VALIDATION.password);
        } else{
            UserService.updatePassword(password, id);
            setFormError('');
            setConfirm(true);
        } 
    };

    useEffect(() => {
        if (confirm) {
            const timer = setTimeout(() => {
                setConfirm(false);
                returnToLogin();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [confirm]);

    return (
        <div className='reset'>
            {confirm && <ModalConfirm content={"Votre mot de passe a bien été modifié"} />}
            <h2>Renseigner un nouveau mot de passe</h2>
            <form className='reset_form' noValidate onSubmit={handleChangePassword}>
                <div className='reset_form_group'>
                    <label htmlFor='newPassword'>Nouveau mot de passe</label>
                    <input type='text' id='newPassword' name='newPassword'  value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className='reset_form_group'>
                    <label htmlFor='confirmPassword'>Confirmer le mot de passe</label>
                    <input type='text' id='confirmPassword' name='confirmPassword' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    {formError && <p>{formError}</p>}
                </div>
                <div className='reset_form_btn'>
                    <button type='button' onClick={returnToLogin}>Annuler</button>
                    <button type='submit'>Confirmer</button>
                </div>
            </form>
        </div>
    )
}
