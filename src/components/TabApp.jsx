import { useState} from 'react';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab';

import CustomerList from './CustomerList';
import TrainingList from './TrainingList';

function TabApp() {
    const [tab, setTab] = useState('trainings');

    const handleChange = (event, value) => {
        setTab(value);
    }

    return(
        <>
            <Tabs value={tab} onChange={handleChange}>
                <Tab value="trainings" label="Trainings" />
                <Tab value="customers" label="Customers" />
            </Tabs>
            {tab === 'trainings' && <TrainingList />}
            {tab === 'customers' && <CustomerList />}
        </>
    )
}

export default TabApp