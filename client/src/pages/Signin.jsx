import React from "react";
import * as apiclient from "../api-client";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../contexts/AppContexts";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate()

  const queryClient = useQueryClient()


  const mutation = useMutation(apiclient.signIn, {
    onSuccess: async () => {
      showToast({message:'Sign in Successfull!!',type:"SUCCESS"})
      await queryClient.invalidateQueries('validateToken')
      navigate('/')

    },
    onError: async (error) => {
      showToast({message:error.response.data.message,type:"ERROR"})
    },
  });

  const {showToast} = useAppContext()


  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form className="flex flex-col gap-5 " onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message:
                "Minimum password length is 8",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">Not Registered? <Link className="underline" to='/register'>Create an account here</Link> </span>
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold p-2 hover:bg-blue-400"
        >
          Sign In
        </button>
      </span>
    </form>
  );
};

export default Signin;
