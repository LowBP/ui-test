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
        <div className="max-w-screen-xxl flex flex-row items-center rounded-xl my-1 mx-1 py-2 px-12 bg-gradient-to-br from-cyan-500 to-blue-700 h-fit shadow-xl shadow-gray-300">
            <div className="mx-auto flex flex-row justify-between w-full max-w-xl">
                <div className="flex flex-col justify-center text-white text-sm py-1">
                    <div className="flex flex-row">
                        <img src={"https://openweathermap.org/img/w/" + props.weather.icon + ".png"} alt="#" className="w-14" />
                    </div>
                    <div className="flex flex-row items-center justify-center py-0 text-xl text-cyan-300">
                        <p>{props.weather.details}</p>
                    </div>
                </div>
                <div className="flex flex-col justify-center text-white text-sm py-1">
                    <div className="flex flex-row">
                        <p className="text-white text-3xl font-medium">{props.weather.name}</p>
                    </div>
                    <div className="flex flex-row">
                        <p className="text-xl">{props.weather.temp}°</p>
                    </div>
                </div>

                <div className="flex flex-col justify-center text-white text-sm py-1">
                    <div className="flex flex-row">
                        <OpacityOutlined sx={{ fontSize: "18px", marginRight: "5px" }} />
                        Humidity:
                        <span className="font-medium ml-1">{props.weather.humidity}°</span>
                    </div>
                    <div className="flex flex-row">
                        <DeviceThermostatOutlined sx={{ fontSize: "18px", marginRight: "5px" }} />
                        Real feel:
                        <span className="font-medium ml-1">{props.weather.feels_like}°</span>
                    </div>
                </div>
                <div className="flex flex-col justify-center text-white text-sm py-1">
                    <div className="flex flex-row">
                        <ArrowUpwardOutlined />
                        <p className="font-light">
                            High:
                            <span className='font-medium ml-1'>{props.weather.temp_max}°</span>
                        </p>
                    </div>
                    <div className="flex flex-row">
                        <ArrowDownwardOutlined />
                        <p className="font-light">
                            Low:
                            <span className='font-medium ml-1'>{props.weather.temp_min}°</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherSummary