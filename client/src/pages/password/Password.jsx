
import './password.scss';

export default function Password() {





    const handleResetPassword = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            console.log('Les mots de passe ne correspondent pas !');
        } else {
            console.log('Mot de passe réinitialisé !');
        }
        // await AuthService.updatePassword(password, id);
        // navigate('/piiquante/login');
    };

    return (
        <div className='forgetPassword'>
          
            {/* <UptadePassword /> */}
        </div>
    )
}
