import { useState, useEffect } from "react";
import _ from "lodash";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Container } from "@mui/material";

export default function TrainingChart() {
    const [data, setData] = useState([]);
    const url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchTraining();
    }, []);

    const fetchTraining= () => {
        fetch(url + 'gettrainings')
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                throw new Error("Error in fetch:" + response.statusText);
            }
        })
        .then(data => {
            handleData(data);
        })
        .catch(err => console.error(err))
    };

    const handleData = (givenData) => {
        const groupData = _.groupBy(givenData, 'activity');
        const sumData = [];

        Object.keys(groupData).forEach((key) => {
            const sum = {};
            sum['name'] = key;
            sum['total'] = _.sumBy(groupData[key], 'duration');
            sumData.push(sum);
        });
        setData(sumData);
    };

    return(
        <Container maxWidth="lg">
            <div style={{width: '80%', height: 300}}>
                <ResponsiveContainer>
                    <BarChart width={150} height={40} data={data}>
                        <XAxis dataKey="name" stroke="#8884d8" />
                        <YAxis label={{ value: "Duration(min)", angle: -90, position: 'insideLeft'}} />
                        <Tooltip />
                        <Bar dataKey="total" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Container>
    )
}