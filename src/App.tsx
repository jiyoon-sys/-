import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Droplets,
  LocateFixed,
  MapPin,
  Search,
  Sun,
  Sunrise,
  Sunset,
  Wind,
} from 'lucide-react';

type Location = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone?: string;
};

type WeatherData = {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    precipitation_probability_max: number[];
  };
};

const SEOUL: Location = {
  name: '서울',
  country: '대한민국',
  latitude: 37.5665,
  longitude: 126.978,
  timezone: 'Asia/Seoul',
};

function weatherInfo(code: number) {
  if (code === 0) return { label: '맑음', Icon: Sun };
  if (code <= 3) return { label: '구름 조금', Icon: Cloud };
  if (code <= 48) return { label: '안개', Icon: CloudFog };
  if (code <= 57) return { label: '이슬비', Icon: CloudDrizzle };
  if (code <= 67 || (code >= 80 && code <= 82)) return { label: '비', Icon: CloudRain };
  if (code <= 77 || (code >= 85 && code <= 86)) return { label: '눈', Icon: CloudSnow };
  return { label: '천둥번개', Icon: CloudLightning };
}

const dayFormatter = new Intl.DateTimeFormat('ko-KR', { weekday: 'short' });
const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
  month: 'long',
  day: 'numeric',
  weekday: 'long',
});

export default function App() {
  const [location, setLocation] = useState<Location>(SEOUL);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');

    const params = new URLSearchParams({
      latitude: String(location.latitude),
      longitude: String(location.longitude),
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
      hourly: 'temperature_2m,weather_code',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max',
      timezone: location.timezone || 'auto',
      forecast_days: '7',
    });

    fetch(`https://api.open-meteo.com/v1/forecast?${params}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('날씨 정보를 불러오지 못했습니다.');
        return response.json();
      })
      .then(setWeather)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [location]);

  const hourly = useMemo(() => {
    if (!weather) return [];
    const currentHour = weather.current.time.slice(0, 13);
    const start = Math.max(0, weather.hourly.time.findIndex((time) => time.startsWith(currentHour)));
    return weather.hourly.time.slice(start, start + 8).map((time, index) => ({
      time,
      temperature: weather.hourly.temperature_2m[start + index],
      code: weather.hourly.weather_code[start + index],
    }));
  }, [weather]);

  async function searchLocation(event: FormEvent) {
    event.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ name: query.trim(), count: '1', language: 'ko', format: 'json' });
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`);
      const data = await response.json();
      if (!data.results?.length) throw new Error('검색 결과가 없습니다. 다른 도시명을 입력해 주세요.');
      const result = data.results[0];
      setLocation({
        name: result.name,
        country: result.country,
        latitude: result.latitude,
        longitude: result.longitude,
        timezone: result.timezone,
      });
      setQuery('');
    } catch (searchError) {
      setError(searchError instanceof Error ? searchError.message : '도시 검색에 실패했습니다.');
      setLoading(false);
    }
  }

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setError('이 브라우저에서는 위치 기능을 사용할 수 없습니다.');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation({ name: '현재 위치', country: '내 주변', latitude: coords.latitude, longitude: coords.longitude });
      },
      () => {
        setError('위치 권한을 허용하면 현재 지역의 날씨를 볼 수 있어요.');
        setLoading(false);
      },
    );
  }

  const currentInfo = weather ? weatherInfo(weather.current.weather_code) : weatherInfo(0);

  return (
    <main className="weather-shell">
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />

      <section className="weather-app">
        <header className="topbar">
          <a className="brand" href="#top" aria-label="오늘의 하늘 홈">
            <span className="brand-mark"><Sun size={22} /></span>
            <span>오늘의 하늘</span>
          </a>
          <form className="search-box" onSubmit={searchLocation}>
            <Search size={19} aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="도시를 검색하세요"
              aria-label="도시 검색"
            />
            <button type="submit">검색</button>
          </form>
          <button className="location-button" onClick={useCurrentLocation} type="button">
            <LocateFixed size={18} />
            <span>내 위치</span>
          </button>
        </header>

        {error && <div className="error-banner">{error}</div>}

        {loading && !weather ? (
          <div className="loading-card"><span className="spinner" />날씨를 불러오는 중이에요</div>
        ) : weather ? (
          <>
            <section className="hero-card" id="top">
              <div className="hero-copy">
                <p className="location"><MapPin size={17} /> {location.name}, {location.country}</p>
                <p className="today">{dateFormatter.format(new Date(weather.current.time))}</p>
                <div className="temperature-row">
                  <strong>{Math.round(weather.current.temperature_2m)}°</strong>
                  <div>
                    <currentInfo.Icon className="current-icon" size={58} strokeWidth={1.5} />
                    <span>{currentInfo.label}</span>
                  </div>
                </div>
                <p className="feels-like">체감 온도 {Math.round(weather.current.apparent_temperature)}°</p>
              </div>

              <div className="hero-details">
                <div><Wind /><span>바람</span><strong>{Math.round(weather.current.wind_speed_10m)} km/h</strong></div>
                <div><Droplets /><span>습도</span><strong>{weather.current.relative_humidity_2m}%</strong></div>
                <div><Sunrise /><span>일출</span><strong>{weather.daily.sunrise[0].slice(11, 16)}</strong></div>
                <div><Sunset /><span>일몰</span><strong>{weather.daily.sunset[0].slice(11, 16)}</strong></div>
              </div>
            </section>

            <section className="content-grid">
              <article className="panel hourly-panel">
                <div className="section-heading">
                  <div><p>시간대별 예보</p><h2>오늘의 흐름</h2></div>
                  <span>현지 시간 기준</span>
                </div>
                <div className="hourly-list">
                  {hourly.map((item, index) => {
                    const info = weatherInfo(item.code);
                    return (
                      <div className={`hour-item ${index === 0 ? 'active' : ''}`} key={item.time}>
                        <span>{index === 0 ? '지금' : `${item.time.slice(11, 13)}시`}</span>
                        <info.Icon size={27} />
                        <strong>{Math.round(item.temperature)}°</strong>
                      </div>
                    );
                  })}
                </div>
              </article>

              <article className="panel weekly-panel">
                <div className="section-heading">
                  <div><p>주간 예보</p><h2>앞으로 7일</h2></div>
                </div>
                <div className="week-list">
                  {weather.daily.time.map((date, index) => {
                    const info = weatherInfo(weather.daily.weather_code[index]);
                    return (
                      <div className="day-row" key={date}>
                        <div><strong>{index === 0 ? '오늘' : dayFormatter.format(new Date(`${date}T12:00`))}</strong><span>{date.slice(5).replace('-', '.')}</span></div>
                        <div className="condition"><info.Icon size={23} /><span>{info.label}</span></div>
                        <div className="rain"><Droplets size={15} />{weather.daily.precipitation_probability_max[index]}%</div>
                        <div className="high-low"><strong>{Math.round(weather.daily.temperature_2m_max[index])}°</strong><span>{Math.round(weather.daily.temperature_2m_min[index])}°</span></div>
                      </div>
                    );
                  })}
                </div>
              </article>
            </section>

            <footer>날씨 데이터 제공: Open-Meteo · 마지막 업데이트 {weather.current.time.slice(11, 16)}</footer>
          </>
        ) : null}
      </section>
    </main>
  );
}
