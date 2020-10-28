export default function checkErrorType(code) {
  const codigo = String(code);
  switch (codigo) {
    case 'auth/email-already-in-use':
      return 'La dirección de correo electrónico ya existe';
    case 'auth/network-request-failed':
      return 'Error de red, por favor verifica tu conexión';
    case 'auth/invalid-email':
      return 'Dirección de correo electrónico no válida';
    case 'auth/uid-already-exists':
      return 'El usuario ya existe';
    case 'auth/internal-error':
      return 'Error interno, estamos trabajando para solucionar el problema';
    default:
      return 'Error desconocido, inténtalo más tarde';
  }
}
