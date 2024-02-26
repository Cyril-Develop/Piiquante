import { useContext, useEffect, useState } from "react";

export default function UptadePassword() {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    console.log(password, confirmPassword);


    return (
        <>
            <h2>Réinitialiser le mot de passe</h2>
            <form className='forgetPassword_form' noValidate>
                <div className='forgetPassword_form_group'>
                    <label htmlFor='newPassword'>Nouveau mot de passe</label>
                    <input type='newPassword' id='newPassword' name='newPassword' value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div className='forgetPassword_form_group'>
                    <label htmlFor='confirmPassword'>Confirmer le mot de passe</label>
                    <input type='confirmPassword' id='confirmPassword' name='confirmPassword' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                </div>
                <div className='forgetPassword_form_btn'>
                    {/* <button type='button' onClick={returnToLogin}>Annuler</button> */}
                    <button type='submit'>Confirmer</button>
                </div>
            </form>
        </>
    )
}
