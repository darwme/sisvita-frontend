export function getConexionBackend(service: string) {
  const BASE_URL = `http://localhost:5000/${service}/v1`;
  return BASE_URL;
}
