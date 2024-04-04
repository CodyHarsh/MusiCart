import React from 'react'
import { TbFaceIdError } from "react-icons/tb";
import styles from "../css/NotFound.module.css"

const NotFound = (props) => {
  return (
    <div className={styles.invoiceNotFound}>
        <TbFaceIdError size="10em" color="blue"  alt="Face Id Error" />
        { props?.name ?  (<h4>{props.name}</h4>) : 
                    <h4>Not found</h4>
        }
    </div>
  )
}

export default NotFound
