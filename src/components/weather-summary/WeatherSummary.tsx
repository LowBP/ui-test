import { Weather } from "../../store/activityStore";
import {
    ArrowUpwardOutlined,
    ArrowDownwardOutlined,
    DeviceThermostatOutlined,
    OpacityOutlined
} from '@mui/icons-material';

type Props = {
    weather: Weather;
}

function WeatherSummary(props: Props) {
    return (
        <div className="max-w-screen-xxl rounded-xl my-1 mx-1 py-2 px-12 bg-gradient-to-br from-cyan-500 to-blue-700 h-fit shadow-xl shadow-gray-300">

            <div className="flex flex-row items-center justify-between text-white py-1">
                <div className="flex flex-col items-center justify-between">
                    <img src={"https://openweathermap.org/img/w/" + props.weather.icon + ".png"} alt="#" className='w-20' />
                    <div className="flex items-center justify-center py-0 text-xl text-cyan-300">
                        <p>{props.weather.details}</p>
                    </div>
                </div>
                <div className="flex items-center justify-center my-3">
                    <p className="text-white text-3xl font-medium">{props.weather.name}</p>
                </div>
                <p className="text-xl">{props.weather.temp}°</p>
                <div className='flex flex-col space-y-2 items-stretch'>
                    <div className="flex font-light text-sm items-center justify-start">
                        <DeviceThermostatOutlined sx={{ fontSize: "18px", marginRight: "5px" }} />
                        Real feel:
                        <span className="font-medium ml-1">{props.weather.feels_like}°</span>
                    </div>
                    <div className="flex font-light text-sm items-center justify-start">
                        <OpacityOutlined sx={{ fontSize: "18px", marginRight: "5px" }} />
                        Humidity:
                        <span className="font-medium ml-1">{props.weather.humidity}°</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-1">
                <ArrowUpwardOutlined />
                <p className="font-light">
                    High:
                    <span className='font-medium ml-1'>{props.weather.temp_max}°</span>
                </p>
                <p className="font-light">|</p>

                <ArrowDownwardOutlined />
                <p className="font-light">
                    Low:
                    <span className='font-medium ml-1'>{props.weather.temp_min}°</span>
                </p>
            </div>
        </div>
    )
}

export default WeatherSummary