import Image from 'next/image'

interface WeatherIconProps {
  icon: string;
  description: string;
  className?: string;
}

export function WeatherIcon({ icon, description, className }: WeatherIconProps) {
  return (
    <Image
      src={`http://openweathermap.org/img/w/${icon}.png`}
      alt={description}
      className={className}
      width={50}
      height={50}
    />
  );
} 