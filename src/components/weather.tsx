import { Title } from "@mantine/core"
import { useEffect, useState } from "react"

function Weather() {
    //vars & func
    function api<T>(url: string): Promise<T> {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json().then(data => data as T);
            })
    }

    //get version
    const [curr_temp, setTemp] = useState(100)

    //runs only on first render
    useEffect(() => {
        
    }, []);

    //runs periodically every 50seconds (not on first render)
    useEffect(() => {
        const interval = setInterval(() => {
            //const url = 'https://www.meteoswiss.admin.ch/product/output/versions.json';

            //import * as versions from 'https://www.meteoswiss.admin.ch/product/output/versions.json';

            
        }, 300000); //every 5mins
        return () => clearInterval(interval); //unmount to prevent memory leaks.
    }, [])

    return (
        <>
        <Title>Weather</Title>
            <Title>{curr_temp}</Title>
        </>
    )
}

export default Weather