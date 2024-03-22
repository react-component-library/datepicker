import { useState } from 'react';
import { DatePicker, DayPicker, MonthPicker, YearPicker } from '../dist';

import DateCalendar from '../dist/components/DateCalendar/DateCalendar';

import '../dist/index.css';

function App() {
    const [date1, setDate1] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [date3, setDate3] = useState(new Date());
    const [date4, setDate4] = useState(new Date());
    const [date5, setDate5] = useState<Date>(null);

    return (
        <div className="container mx-auto py-10">
            <DayPicker value={date1} onChange={setDate1} className="w-[320px] bg-white shadow-2xl p-4 rounded-xl" />

            <div className="my-8 mx-8">
                <hr />
            </div>

            <MonthPicker value={date2} onChange={setDate2} className="w-[320px] bg-white shadow-2xl p-4 rounded-xl" />

            <div className="my-8 mx-8">
                <hr />
            </div>

            <YearPicker value={date3} onChange={setDate3} className="w-[320px] bg-white shadow-2xl p-4 rounded-xl" />

            <div className="my-8 mx-8">
                <hr />
            </div>

            <DateCalendar value={date4} onChange={setDate4} className="w-[320px] bg-white shadow-2xl p-4 rounded-xl" />

            <DateCalendar className="w-[320px] bg-white shadow-2xl p-4 rounded-xl" />

            <div className="my-8 mx-8">
                <hr />
            </div>

            <div className="h-[400px]">
                <DatePicker
                    onChange={(date) => console.log(date)}
                    inputProps={{ placeholder: 'select a date (Uncontrolled)', className: 'w-[320px]' }}
                    maxDate={new Date()}
                />

                <DatePicker
                    value={date5}
                    onChange={setDate5}
                    inputProps={{ placeholder: 'select a date (Controlled)', className: 'w-[320px]' }}
                    minDate={new Date('2024-01-29')}
                    maxDate={new Date('2024-03-01')}
                />

                <DatePicker
                    value={date5}
                    onChange={setDate5}
                    inputProps={{ placeholder: 'select a date (Controlled)', className: 'w-[320px]' }}
                    fixedRows
                    // minDate={new Date('2024-01-29')}
                    // maxDate={new Date('2024-03-01')}
                />
            </div>
        </div>
    );
}

export default App;
