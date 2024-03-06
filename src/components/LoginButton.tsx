import React from 'react';
import { Dispatch, SetStateAction } from 'react';


/**
 * Interface that represents the parameters needed for the login button. 
 */
interface loginProps {
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

/**
 * Function that sets up the login button and returns the correct graphical interface based on user input. 
 * @param props the isLoggedIn boolean and setter to be used on click.
 * @returns the graphically set login or signout messages. 
 */
export function LoginButton(props: loginProps) {

  /**
   * Constant to represent the authentication process.
   * @returns a new boolean value that represents the log in status. 
   */
  const authenticate = () => {
    const newValue = !props.isLoggedIn
    props.setIsLoggedIn(newValue)
    return newValue
  }

  if (props.isLoggedIn) {
    return (
      <button aria-label='Sign Out' onClick={authenticate}>Sign out</button>
    )
  } else {
    return (
      <button aria-label='Login' onClick={authenticate}>Login</button>
    )
  }
}