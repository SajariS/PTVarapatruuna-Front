import DialogContent from "@mui/material/DialogContent";
import TextField from '@mui/material/TextField';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';

export default function TrainingDialog({training, handleChange, handleDateChange}) {
    return(
        <DialogContent>
            <StaticDateTimePicker
            label="Date"
            value={training.date}
            onChange={handleDateChange}
            />
            <TextField
            margin="dense"
            label="Duration"
            name="duration"
            fullWidth
            variant="standard"
            type="number"
            value={training.duration}
            onChange={handleChange}
            />
            <TextField
            margin="dense"
            label="Activity"
            name="activity"
            fullWidth
            variant="standard"
            value={training.activity}
            onChange={handleChange}
            />
        </DialogContent>
    )
}