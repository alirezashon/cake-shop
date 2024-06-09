
import styles from "./index.module.css"
import Payment from "./Payment"
import React, { useState } from "react"
import Information from "./Information"
import ProductShow from "./ProductShow"

interface Props {
  registered:boolean
}

const FlowChart: React.FC<Props> = ({registered}) => {

  return (
    <>
      <div style={Container} className={styles.container}>
        <div className={styles.header}></div>

        <div className={styles.stateContainer}>
         {!registered&& <Information />}
          <Payment />
          <ProductShow />
        </div>
      </div>
    </>
  )
}
export default FlowChart

const Container: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
}
const Flow: React.CSSProperties = {
  width: "90%",
  height: "13%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "2vh",
}
const FlowBase: React.CSSProperties = {
  width: "80%",
  height: "10%",
  borderRadius: "7vh",
  display: "flex",
  flexDirection: "row-reverse",
  justifyContent: "space-around",
  alignItems: "center",
}
const FlowDomain: React.CSSProperties = {
  width: "7vh",
  height: "7vh",
  borderRadius: "7vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
}
