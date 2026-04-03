import React , {useState , useEffect} from "react";
import mqtt from "mqtt"

export default function SmartDashboard() {
    const [temp , setTemp] = useState(null);
    const [hum , setHum] = useState(null);
    const [status , setStatus] = useState("disconnected");

    useEffect(() => {
        const client = mqtt.connect(
            "wss://5426ede983894945b00674a94d201283.s1.eu.hivemq.cloud:8884/mqtt",
            {
                username : "HibaSGR",
                password : "Hiba..2005"
            }
        );

        client.on("connect" , () => {
            client.subscribe("iot/#")
        })


        client.on("message" , (topic , message) => {
            try{
                const data = JSON.parse(message.toString());
                console.log(data)
                if(data.status != undefined) {
                    setStatus(data.status)
                }
                if(data.temperature != undefined) {
                    setTemp(data.temperature);
                }
                if (data.humidity !== undefined) {
                    setHum(data.humidity);
                }
            }catch (e) {
                console.log("error : " + e);
            }
        })

        client.on("close" , () => {
            setStatus("disconnected");
        })

        return () => client.end()
    } , [])



  return (
    <div
      style={{
        padding: "25px",
        borderRadius: "12px",
        background: "#f5f7fa",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "300px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "15px", color: "#333" }}>
        🌐 Smart IoT Panel
      </h2>

      <div
        style={{
          marginBottom: "15px",
          padding: "10px",
          borderRadius: "8px",
          background: status === "connected" ? "#d4edda" : "#f8d7da",
          color: status === "connected" ? "#155724" : "#721c24",
        }}
      >
        <strong>Status:</strong> {status}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            flex: 1,
            marginRight: "10px",
            padding: "10px",
            borderRadius: "8px",
            background: "#ffffff",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, fontSize: "14px", color: "#777" }}>
            Temperature
          </p>
          <h3 style={{ margin: "5px 0" }}>
            {temp ?? "--"} °C
          </h3>
        </div>

        <div
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            background: "#ffffff",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, fontSize: "14px", color: "#777" }}>
            Humidity
          </p>
          <h3 style={{ margin: "5px 0" }}>
            {hum ?? "--"} %
          </h3>
        </div>
      </div>
    </div>
  );
}