export function getConexionBackend(service: string) {
  return `http://localhost:5000/${service}/v1`;
}
