import { useState } from 'react'
import {auth,provider} from './../firebase/config'
import { createUserWithEmailAndPassword, 
        sendPasswordResetEmail, 
        signInWithEmailAndPassword, 
        signInWithPopup } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const AuthPage = () => {
  const [signUp,setSignUp]=useState(false)
  const [email,setEmail]=useState('')
  const [pass,setPass]=useState('')
  const [error,setError]=useState(false)
  const navigate=useNavigate()

  const handleGoogle=()=>{
    signInWithPopup(auth,provider)
    .then(()=>navigate("/feed"))
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    if (signUp) {
        createUserWithEmailAndPassword(auth, email, pass)
          .then((res) => {
            toast.success('Hesabınız oluşturuldu');
          })
          .catch((err) => {
            toast.error(`Üzgünüz bir hata oluştu: ${err.code}`);
           console.log(email,pass)
          });
    }else{
        signInWithEmailAndPassword(auth,email,pass)
        .then((res)=>toast.success('Hesabınız Oluşturuldu'))
        .catch((err)=>{
        toast.error(`Üzgünüz bir hata oluştu:${err.code}`);
        console.log(email,pass)
        if (err.code==='auth/invalid-login-credentials'){
            setError(true)
        }
    })
    }
  }

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info(
          `${email} > malinize sıfırlama e-posta'sı gönderildi`
        );
      })
      .catch((err) => {
        const errCode = err.code;
        toast.error(`Üzgünüz bir hata oluştu: ${errCode}`);
      });
  };

    return (
    <section className='h-screen grid place-items-center'> 
        <div className='bg-black flex flex-col gap-10 py-16 px-32 rounded'>
            <div className='flex justify-center'>
                <img className="h-[60px]" src="x-logoo.webp" alt="twitter-logo" />
            </div>
            <h1 className='text-center font-bold text-xl'>Twitter'a giriş yap</h1>
            <button onClick={handleGoogle} className='flex items-center bg-white py-2 px-10 rounded-full text-black cursor-pointer gap-3 transition hover:bg-gray-300'>
                <img className='h-[20px]' src="google-logoo.svg" alt=" google-logo" />
                <span className='whitespace-nowrap'>Google İle Giriş Yap</span>
            </button>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                
                <label>Email</label>
                <input 
                onChange={(e)=>setEmail(e.target.value)}
                className='text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]' type='email' required />
                
                <label className='mt-5'>Şifre</label>
                <input 
                 onChange={(e)=>setPass(e.target.value)}
                className='text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]' type='text' required />
                
                <button className='bg-white text-black mt-10 rounded-full p-1 font-bold transition hover:bg-gray-300'>
                    {signUp ? "Kaydol" :"Giriş Yap"}
                </button>
                
                <p className='mt-5 flex gap-4'>
                    <span className='text-gray-500'>
                        {signUp ? "Hesabınız Varsa" : "Hesabınız Yoksa"}
                    </span>
                    <span className='cursor-pointer text-blue-500s' onClick={()=>setSignUp(!signUp)}>
                        {signUp ? "Giriş Yapın" : "Kaydolun"}
                    </span>
                </p>
            </form>

            {error && 
            <p onClick={resetPassword} className='text-center text-red-500 cursor-pointer'>
                Şifrenizi mi Unuttunuz?</p>}

        </div>
    </section>
  )
}
