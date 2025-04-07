import React, { useEffect, useState } from 'react';

type IPInfo = {
  ip: string;
  city: string;
  region: string;
  country: string;
  org: string;
  loc: string;
  timezone: string;
};

const IpCommand: React.FC = () => {
  const [info, setInfo] = useState<IPInfo | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://ipinfo.io/json?token=8edba71ea9cfba') // optional token here
      .then((res) => res.json())
      .then((data) => setInfo(data))
      .catch(() => setError('Failed to fetch IP information.'));
  }, []);

  if (error) return <div>{error}</div>;
  if (!info) return <div>Loading your IP info...</div>;

  return (
    <div>
      <div><strong>IP:</strong> {info.ip}</div>
      <div><strong>City:</strong> {info.city}</div>
      <div><strong>Region:</strong> {info.region}</div>
      <div><strong>Country:</strong> {info.country}</div>
      <div><strong>Org:</strong> {info.org}</div>
      <div><strong>Location:</strong> {info.loc}</div>
      <div><strong>Timezone:</strong> {info.timezone}</div>
    </div>
  );
};

export default IpCommand;
