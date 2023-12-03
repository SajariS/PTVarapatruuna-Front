import { useState} from 'react';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab';

import CustomerList from './CustomerList';
import TrainingList from './TrainingList';
import TrainingCalendar from './TrainingCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "dayjs/locale/fi";
import TrainingChart from './TrainingChart';

function TabApp() {
    const [tab, setTab] = useState('trainings');

    const handleChange = (event, value) => {
        setTab(value);
    }

    return(
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fi">
            <Tabs value={tab} onChange={handleChange}>
                <Tab value="trainings" label="Trainings" />
                <Tab value="customers" label="Customers" />
                <Tab value="calender" label="Calender" />
                <Tab value="chart" label="Chart" />
            </Tabs>
            {tab === 'trainings' && <TrainingList />}
            {tab === 'customers' && <CustomerList />}
            {tab === 'calender' && <TrainingCalendar /> }
            {tab === 'chart' && <TrainingChart />}
        </LocalizationProvider>
    )
}

export default TabApp