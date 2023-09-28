import  { useState, ChangeEvent, FormEvent } from 'react';
import {useForm } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message';

interface FormData {
  username: string;
  email: string;
  password:string;
}

function RegularForm() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    formState:{ isSubmitting },
    reset,
  }= useForm()

   const onSubmit = async (data:FieldValues)=>{   
    await new Promise((resolve)=> setTimeout(resolve, 2000))

    alert(JSON.stringify(data));

    reset();
   }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
        <h1>Change Me To React Hook Form</h1>
      <div>
        <input
          {...register('username',{
            required:'username is required',
            minLength:{
              value:2,
              message:'the length most be at lest  2'
            }
          })}
          type="text"
          id="username"
          name="username"
          placeholder='Enter UserName'
        />
        {errors.username && <p>{`${errors.username.message}`}</p>}
      </div>
      <div>
        <input
          {...register('email',{
            required:'emil is require',
            pattern:{
              value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
              message:'the input must be like text@text.text'
            }
          })}
          id="email"
          name="email"
          placeholder='Enter Email'
        />

        <ErrorMessage
        errors={errors}
        name="email"
        render={({ message }) => <p>{message}</p>}
      />

      </div>
      <div>
        <input 
          {...register('password',{
            required:'password is require',
            minLength:{
              value:8,
              message:'the length must be at lest 8'
            },
            maxLength:{
              value:20,
              message:'the length must be at most 20 '
            },
            pattern:{
              value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{8,}$/i,
              message:"The password must be contain at least one uppercase letter, one lowercase letter, one number, and one special character."
            }
          })}
          id="password"
          name="password"
          placeholder='Enter Password'
        />
        {errors.password && <p>{`${errors.password.message}`}</p>}
      </div>
      <button
      disabled={ isSubmitting }
       type="submit"
       >Submit</button>
    </form>
  );
}

export default RegularForm;
