class ServiceError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

export default ServiceError;
